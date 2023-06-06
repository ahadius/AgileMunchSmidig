


import React, { useRef, useEffect, useState } from 'react';

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
    //const [filling, setFilling] = useState(false);


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const draw = (e) => {
            if (!drawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
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
    

        const startDrawing = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

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
            setDrawing(false);
            context.beginPath();
            setLineStart(null);
            saveToHistory();
        }

          


        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);
        //canvas.addEventListener('click', fillArea);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mousemove', draw);
            //canvas.removeEventListener('click', fillArea);

        };
    }, [drawing, color, size, tool, brushType]);

    const saveToHistory = () => {
        const canvas = canvasRef.current;
        const historyCopy = [...history];
        historyCopy.push(canvas.toDataURL());
        setHistory(historyCopy);
        setCurrentIndex(historyCopy.length - 1);
    }

    const undo = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            const image = new Image();
            image.src = history[currentIndex - 1];
            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
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


    /*const fillCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
      };*/
  
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 800px 1fr', gridTemplateRows: 'auto 600px', gap: '2rem', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ gridColumn: '1 / span 3', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <label>
                    Fargepalett:
                    {colorPalette.map((color, i) => (
                        <button
                            key={i}
                            style={{ backgroundColor: color, width: '20px', height: '20px' }}
                            onClick={() => setColor(color)}
                        />
                    ))}
                </label>

                <label>
                Børstetype:
                <select value={brushType} onChange={(e) => setBrushType(e.target.value)}>
                    <option value="flat">Flat</option>
                    <option value="round">Round</option>
                    <option value="textured">Textured</option>
                </select>
            </label>  

                <label>
                    Penselfarge:
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
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
                <button onClick={undo}>Angre</button>
                <button onClick={clearCanvas}>Rens Canvas</button>

            </div>
            <canvas ref={canvasRef} width="800" height="600" style={{ border: '1px solid black', gridColumn: '2' }} />
            </div>
    );
}

export default DrawingBoard;
