/*import React, { useRef, useEffect, useState, useCallback } from 'react';


const DrawingBoard = ({ username }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState('2');
    const [history, setHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [tool, setTool] = useState('pencil');
    const [lineStart, setLineStart] = useState(null);
    const [brushType, setBrushType] = useState('flat');

    const colorPalette = [
        '#000000', '#FFFFFF', '#808080', '#B22222', '#A52A2A', '#006400',
        '#008000', '#008080', '#000080', '#4B0082', '#800080', '#FF0000',
        '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F', '#7FFF00', '#32CD32',
        '#00FF00', '#00FA9A', '#00FFFF', '#0000FF', '#8A2BE2', '#9370DB',
        '#FF00FF', '#1E90FF', '#ADD8E6', '#87CEEB', '#FFB6C1', '#FF69B4',
        '#FF1493',
    ];
   

    const saveToHistory = useCallback(() => {
        const canvas = canvasRef.current;
        const historyCopy = [...history];
        historyCopy.push(canvas.toDataURL());
        setHistory(historyCopy);
        setCurrentIndex(historyCopy.length - 1);
    }, [history, canvasRef]);
    //const [filling, setFilling] = useState(false);

    

    



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
                context.lineTo(x, y);
                context.stroke();
                context.beginPath();
                context.moveTo(x, y);
            }
            else if (tool === 'line' && lineStart) {
                context.putImageData(lineStart.imageData, 0, 0);
                context.beginPath();
                context.moveTo(lineStart.x, lineStart.y);
                context.lineTo(x, y);
                context.stroke();
            }
            
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
            }

            setDrawing(true);
            draw(e);
            

        }

        const endDrawing = () => {
            e.preventDefault();

            setDrawing(false);
            context.beginPath();
            setLineStart(null);
            saveToHistory();
            console.log('Sending drawing data to server', { color: color, size: size });

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
    }, [drawing, color, size, tool, brushType,lineStart, saveToHistory]);

   

    const undo = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            const image = new Image();
            image.src = history[currentIndex - 1];
            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            };
        }
    }
    

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setHistory([]);
        setCurrentIndex(-1);
    }


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
                    <input type="number" min="1" max="50" value={size} onChange={(e) => setSize(e.target.value)} />
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
                            style={{ backgroundColor: color, width: '40px', height: '25px' }}
                            onClick={() => setColor(color)}
                        />
                    ))}
                </label>
    
                <label>
                    Penselfarge:
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <button onClick={undo}>Angre</button>
                <button onClick={clearCanvas}>Rens Canvas</button>
            </div>
            <canvas ref={canvasRef} style={{ border: '1px solid black', margin: '0 auto', width: '80vw', height: '80vh' }} />

        </div>
    );   
    
  
    
}

export default DrawingBoard;*/


import React, { useRef, useEffect, useState, useCallback } from 'react';


const DrawingBoard = ({ username }) => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState('2');
    const [history, setHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [tool, setTool] = useState('pencil');
    const [lineStart, setLineStart] = useState(null);
    const [brushType, setBrushType] = useState('flat');
   
   

    const colorPalette = [
        '#000000', '#FFFFFF', '#808080', '#B22222', '#A52A2A', '#006400',
        '#008000', '#008080', '#000080', '#4B0082', '#800080', '#FF0000',
        '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F', '#7FFF00', '#32CD32',
        '#00FF00', '#00FA9A', '#00FFFF', '#0000FF', '#8A2BE2', '#9370DB',
        '#FF00FF', '#1E90FF', '#ADD8E6', '#87CEEB', '#FFB6C1', '#FF69B4',
        '#FF1493',
    ];
   

    const saveToHistory = useCallback(() => {
        const canvas = canvasRef.current;
        const historyCopy = [...history];
        historyCopy.push(canvas.toDataURL());
        setHistory(historyCopy);
        setCurrentIndex(historyCopy.length - 1);
    }, [history, canvasRef]);
    //const [filling, setFilling] = useState(false);

   

   



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
                context.lineTo(x, y);
                context.stroke();
                context.beginPath();
                context.moveTo(x, y);
            }
            else if (tool === 'line' && lineStart) {
                context.putImageData(lineStart.imageData, 0, 0);
                context.beginPath();
                context.moveTo(lineStart.x, lineStart.y);
                context.lineTo(x, y);
                context.stroke();
            }
           
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
            }

            setDrawing(true);
            draw(e);
           

        }

        const endDrawing = (e) => {
            e.preventDefault();
       
            setDrawing(false);
            context.beginPath();
            setLineStart(null);
            saveToHistory();
            console.log('Sending drawing data to server', { color: color, size: size });
       
            //socket && socket.emit('drawing', { fromX: startPos.x, fromY: startPos.y, toX: endPos.x, toY: endPos.y, color: color, size: size });
       
        }

         


        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);
        //canvas.addEventListener('click', fillArea);
        /*canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchend', endDrawing);
        canvas.addEventListener('touchmove', draw);*/
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
    }, [drawing, color, size, tool, brushType,lineStart, saveToHistory]);

   

    const undo = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            const image = new Image();
            image.src = history[currentIndex - 1];
            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            };
        }
    }
   

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setHistory([]);
        setCurrentIndex(-1);
    }


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
                    <input type="number" min="1" max="50" value={size} onChange={(e) => setSize(e.target.value)} />
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
                            style={{ backgroundColor: color, width: '40px', height: '25px' }}
                            onClick={() => setColor(color)}
                        />
                    ))}
                </label>
   
                <label>
                    Penselfarge:
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <button onClick={undo}>Angre</button>
                <button onClick={clearCanvas}>Rens Canvas</button>
            </div>
            <canvas ref={canvasRef} style={{ border: '1px solid black', margin: '0 auto', width: '80vw', height: '80vh' }} />

        </div>
    );  
   
 
   
}

export default DrawingBoard;