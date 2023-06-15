import React, { useRef, useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
console.log('Connected to server');

const DrawingBoard = ({ username }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState('2');
    const [tool, setTool] = useState('pencil');
    const [lineStart, setLineStart] = useState(null);
    const [brushType, setBrushType] = useState('flat');
    const [socket, setSocket] = useState(null);
	const [normalSize, setNormalSize] = useState('4');



    const colorPalette = [
        '#000000', '#FFFFFF', '#808080', '#B22222', '#A52A2A', '#006400',
        '#008000', '#008080', '#000080', '#4B0082', '#800080', '#FF0000',
        '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F', '#7FFF00', '#32CD32',
        '#00FF00', '#00FA9A', '#00FFFF', '#0000FF', '#8A2BE2', '#9370DB',
        '#FF00FF', '#1E90FF', '#ADD8E6', '#87CEEB', '#FFB6C1', '#FF69B4',
        '#FF1493',
    ];


	


    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  
    
    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
       
        socket.emit('clear');
    }, [socket]);


    
    useEffect(() => {
        const newSocket = io.connect('http://localhost:3000');
        setSocket(newSocket);
        console.log('Connected to server');

        return () => {
            newSocket.disconnect();
        };
    }, []);


        
    useEffect(() => {
        if (socket) {
            socket.on('drawingData', data => {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.strokeStyle = data.color;
                context.lineWidth = data.size;
                context.lineJoin = 'round';
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(data.fromX, data.fromY);
                context.lineTo(data.toX, data.toY);
                context.stroke();
                context.beginPath();
                context.moveTo(data.toX, data.toY);
                
        
                socket.on('clear', () => {
                    clearCanvas();
                });


            });

        }
    }, [socket, clearCanvas]);
    
    

    



    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const resizeContext = () => {
            let temp = context.getImageData(0, 0, canvas.width, canvas.height);

            context.canvas.width = canvas.clientWidth;
            context.canvas.height = canvas.clientHeight;

            context.putImageData(temp, 0, 0);
        }



    
        resizeContext();
        window.addEventListener('resize', resizeContext);

        
       
		const drawLine = (x1, y1, x2, y2) => {
			const dx = x2 - x1;
			const dy = y2 - y1;
			const steps = Math.max(Math.abs(dx), Math.abs(dy));
			const incX = dx / steps;
			const incY = dy / steps;
			let x = x1;
			let y = y1;
			
			context.beginPath();
			context.moveTo(x1, y1);
			for(let i = 0; i <= steps; i++) {
				context.lineTo(x, y);
				context.stroke();
				x += incX;
				y += incY;
			}
			context.closePath();
		}
		
		const draw = (e) => {
            e.preventDefault();
			const rect = canvas.getBoundingClientRect();
			const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
			const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
			if (!drawing) return;
		
			context.lineWidth = size;
			context.strokeStyle = color;
		
			if (brushType === 'round') {
				context.lineJoin = 'round';
				context.lineCap = 'round';
			} else if (brushType === 'flat') {
				context.lineJoin = 'bevel';
				context.lineCap = 'square';
			} else if (brushType === 'textured') {
				context.lineJoin = 'round';
				context.lineCap = 'butt';
				context.lineWidth = size * (Math.round(Math.random()) ? 1 : 0.5);
			}
		
			if (tool === 'pencil') {
				drawLine(startPos.x, startPos.y, x, y);
			}
			else if (tool === 'line' && lineStart) {
				context.putImageData(lineStart.imageData, 0, 0);
				context.beginPath();
				context.moveTo(lineStart.x, lineStart.y);
				context.lineTo(x, y);
				context.stroke();
			}
		
			socket.emit('drawing', {
				fromX: startPos.x,
				fromY: startPos.y,
				toX: x,
				toY: y,
				color: color,
				size: size,
				tool: tool,
				brushType: brushType,
				lineStartX: lineStart ? lineStart.x : null,
				lineStartY: lineStart ? lineStart.y : null
			});
		
			setEndPos({ x, y });
			socket.emit('drawing', {
				fromX: startPos.x,
				fromY: startPos.y,
				toX: x,
				toY: y,
				color: color,
				size: size,
				tool: tool,
				brushType: brushType
			});
			setStartPos({ x, y });
		}
		


    

        const startDrawing = (e) => {  // funksjoner for å bevege både musset og touch bevegelser
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

            if (tool === 'line') {
                setLineStart({
                    x: x,
                    y: y,
                    imageData: context.getImageData(0, 0, canvas.width, canvas.height)
                });
                socket.emit('startLine', { lineStartX: x, lineStartY: y });

            }

            setDrawing(true);
            draw(e);
            setStartPos({ x, y });

        }

        /*const endDrawing = () => {
            e.preventDefault();
            setDrawing(false);
            context.beginPath();
            setLineStart(null);
            console.log('Sending drawing data to server', { fromX: startPos.x, fromY: startPos.y, toX: endPos.x, toY: endPos.y, color: color, size: size });

            socket.emit('drawing', { fromX: startPos.x, fromY: startPos.y, toX: endPos.x, toY: endPos.y, color: color, size: size, tool: tool, brushType: brushType });

        }*/

        const endDrawing = (e) => {
            e.preventDefault();
       
            setDrawing(false);
            context.beginPath();
            setLineStart(null);
           // saveToHistory();
           /* console.log('Sending drawing data to server', { color: color, size: size });*/
            console.log('Sending drawing data to server', { fromX: startPos.x, fromY: startPos.y, toX: endPos.x, toY: endPos.y, color: color, size: size });

       
            //socket && socket.emit('drawing', { fromX: startPos.x, fromY: startPos.y, toX: endPos.x, toY: endPos.y, color: color, size: size });
       
        }

        
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);
        //canvas.addEventListener('click', fillArea);
        canvas.addEventListener('touchstart', startDrawing, {passive: false});
        canvas.addEventListener('touchend', endDrawing, {passive: false});
        canvas.addEventListener('touchmove', draw, {passive: false});

        return () => {
            window.removeEventListener('resize', resizeContext);

            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mousemove', draw);
            //canvas.removeEventListener('click', fillArea);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchend', endDrawing);
            canvas.removeEventListener('touchmove', draw);


        };
    }, [drawing, color, size, tool, brushType, endPos.x, endPos.y, lineStart,  startPos.x,startPos.y, clearCanvas ]);

	return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto auto auto auto auto', gap: '1rem', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <label>
                    Børstetype:
                    <select value={brushType} onChange={(e) => setBrushType(e.target.value)}>
                        <option value="flat">Flat</option>
                        <option value="round">Round</option>
                        <option value="textured">Textured</option>
                    </select>
                </label>  

                <label>
                    Penselstørrelse:
                    <input type="number" min="1" max="50" value={size} onChange={(e) => {setNormalSize(e.target.value); setSize(e.target.value);}} />
                </label>
    
                <label>
                    Tegneverktøy:
                    <select value={tool} onChange={(e) => setTool(e.target.value)}>
                        <option value="pencil">Pensel</option>
                        <option value="line">Rett linje</option>
                    </select>
                </label>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <label>
                    Fargepalett:
                    {colorPalette.map((color, i) => (
                        <button
                            key={i}
                            style={{ backgroundColor: color, width: '37px', height: '25px' }}
                            onClick={() => { setColor(color); setSize(normalSize); }}
                        />
                    ))}
                </label>
    
                <label>
                    Penselfarge:
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <button onClick={() => { setSize('30'); setColor('#FFFFFF'); }}> viskelære</button>
                <button onClick={clearCanvas}>Rens Canvas</button>
            </div>
            <canvas ref={canvasRef} style={{ border: '1px solid black', margin: '0 auto', width: '80vw', height: '80vh' }} />
        </div>
    );
    
  
    
}

export default DrawingBoard; 
