import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { socket } from "../room/room.js"; // Import the socket from your main App component

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
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const colorPalette = [
        '#000000', '#FFFFFF', '#808080', '#B22222', '#A52A2A', '#006400',
        '#008000', '#008080', '#000080', '#4B0082', '#800080', '#FF0000',
        '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F', '#7FFF00', '#32CD32',
        '#00FF00', '#00FA9A', '#00FFFF', '#0000FF', '#8A2BE2', '#9370DB',
        '#FF00FF', '#1E90FF', '#ADD8E6', '#87CEEB', '#FFB6C1', '#FF69B4',
        '#FF1493',
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const resizeContext = () => {
            let temp = context.getImageData(0, 0, canvas.width, canvas.height);

            context.canvas.width = canvas.clientWidth;
            context.canvas.height = canvas.clientHeight;

            context.putImageData(temp, 0, 0);
        };
        resizeContext();
        window.addEventListener('resize', resizeContext);

        const draw = (e, xValue, yValue, eventTriggered = true) => {
            const rect = canvas.getBoundingClientRect();
            const x = eventTriggered ? ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left : xValue;
            const y = eventTriggered ? ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top : yValue;

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
            } else if (tool === 'line' && lineStart) {
                context.putImageData(lineStart.imageData, 0, 0);
                context.beginPath();
                context.moveTo(lineStart.x, lineStart.y);
                context.lineTo(x, y);
                context.stroke();
            } else if (tool === 'rectangle' && lineStart) {
                context.putImageData(lineStart.imageData, 0, 0);
                context.beginPath();
                context.rect(lineStart.x, lineStart.y, x - lineStart.x, y - lineStart.y);
                context.stroke();
            } else if (tool === 'circle' && lineStart) {
                context.putImageData(lineStart.imageData, 0, 0);
                const radius = Math.sqrt(Math.pow(x - lineStart.x, 2) + Math.pow(y - lineStart.y, 2));
                context.beginPath();
                context.arc(lineStart.x, lineStart.y, radius, 0, 2 * Math.PI);
                context.stroke();
            }

            // Emit draw event to the server
            socket.emit('drawing', { type: 'draw', x, y, color, size, brushType, tool });
        };

        const startDrawing = (e) => {
            setDrawing(true);
            draw(e);
            if (tool === 'line' || tool === 'rectangle' || tool === 'circle') {
                setLineStart({
                    imageData: context.getImageData(0, 0, canvas.width, canvas.height),
                    x: ('clientX' in e ? e.clientX : e.touches[0].clientX),
                    y: ('clientY' in e ? e.clientY : e.touches[0].clientY),
                });
            }
            socket.emit('start', { x: lastX, y: lastY, color, size, tool, username });
        };

        const endDrawing = () => {
            context.beginPath();
            setDrawing(false);
            setLineStart(null);
            setHistory(prev => [...prev.slice(0, currentIndex + 1), context.getImageData(0, 0, canvas.width, canvas.height)]);
            setCurrentIndex(prev => prev + 1);
            socket.emit('drawing', { type: 'end', x: lastX, y: lastY, color, size, brushType, tool });
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('touchend', endDrawing);
        canvas.addEventListener('mouseleave', endDrawing);

        socket.on('drawing', data => {
            const { type, x, y, color, size, brushType, tool } = data;

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

            if (type === 'start') {
                startDrawing({ clientX: x, clientY: y }, false);
            } else if (type === 'draw') {
                draw({ clientX: x, clientY: y }, false);
            } else if (type === 'end') {
                endDrawing();
            }
        });

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('touchend', endDrawing);
            canvas.removeEventListener('mouseleave', endDrawing);
            window.removeEventListener('resize', resizeContext);
            socket.off('drawing');
        };
    }, [color, size, tool, brushType, drawing, history, currentIndex, lineStart, lastX, lastY, username]);

    const undo = () => {
        if (currentIndex < 0) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.putImageData(history[currentIndex], 0, 0);

        setCurrentIndex(prev => prev - 1);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setHistory([]);
        setCurrentIndex(-1);
    };

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
                        <option value="rectangle">Rektangel</option>
                        <option value="circle">Sirkel</option>
                    </select>
                </label>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <label>
                    Fargepalett:
                    {colorPalette.map((color, i) => (
                        <button
                            key={i}
                            style={{ backgroundColor: color, width: '35px', height: '25px' }}
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
                <Link to="/result"><button>submit</button></Link>
            </div>
            <canvas ref={canvasRef} style={{ border: '1px solid black', margin: '0 auto', width: '80vw', height: '80vh' }} />
        </div>
    );   
};

export default DrawingBoard;
