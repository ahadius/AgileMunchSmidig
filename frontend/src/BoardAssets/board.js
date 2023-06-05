import React, {useRef, useEffect, useState} from 'react';
import "./board.css";


const DrawingArea = () => {
    const canvasRef = useRef(null);
    const linesRef = useRef([]);
    const isDrawingRef = useRef(false);
    const [selectedColor, setSelectedColor] = useState('#000000'); // default color is black
    const [tool, setTool] = useState('pencil'); // default tool is pencil
    const selectedColorRef = useRef(selectedColor);
    const toolRef = useRef(tool);
    const eraserColor = '#FFFFFF'; // The color for the eraser, assuming the canvas background is white
    const [previousColor, setPreviousColor] = useState(''); // store previous colour when switching to eraser


    const handleColorChange = (color) => {
        setSelectedColor(color);
        selectedColorRef.current = color;
    };

    const undo = () => {
        linesRef.current.pop();
        redraw();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        linesRef.current = [];
    };

    const redraw = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        linesRef.current.forEach((line) => {
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.lineWidth = 5;
            context.strokeStyle = line[0].color;
            line.forEach((point, index) => {
                if (index === 0) {
                    context.beginPath();
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                    context.stroke();
                }
            });
        });
    };


    // Update the tool in the state instead of directly modifying it
    const handleToolChange = (newTool) => {
        if (toolRef.current === 'eraser') {
            setSelectedColor(previousColor);
            selectedColorRef.current = previousColor;
        }
        toolRef.current = newTool;
        setTool(newTool);
        // If the tool is an eraser, set the color to the eraser color
        if (newTool === 'eraser') {
            setPreviousColor(selectedColorRef.current);
            setSelectedColor(eraserColor);
            selectedColorRef.current = eraserColor;
        }
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // Set the actual pixel size based on the desired width and height
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
        let currentLine = [];

        // Update the tool in the state when it changes
        const startDrawing = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (toolRef.current === 'bucket') {
            } else {
                isDrawingRef.current = true;
                currentLine = [{x, y}];
            }
        };


        const draw = (e) => {
            if (!isDrawingRef.current) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentLine.push({x, y});
            drawLine();
        };

        const stopDrawing = () => {
            if (!isDrawingRef.current) return;
            isDrawingRef.current = false;
            saveLine();
        };

        const saveLine = () => {
            const lineWithColor = [...currentLine].map((point) => ({
                x: point.x,
                y: point.y,
                color: selectedColorRef.current,
            }));
            linesRef.current.push(lineWithColor);
            currentLine = [];
        };

        const drawLine = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            redraw();
            context.strokeStyle = selectedColorRef.current;
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.lineWidth = 5;
            for (let i = 0; i < currentLine.length - 1; i++) {
                context.beginPath();
                context.moveTo(currentLine[i].x, currentLine[i].y);
                context.lineTo(currentLine[i + 1].x, currentLine[i + 1].y);
                context.stroke();
            }
        };

        const handleResize = () => {
            const {width, height} = canvas.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            redraw();
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        return () => {
            // Clean up event listeners
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseleave', stopDrawing);
        };
    }, []);

    return (
        <div
            className={`canvas-container ${tool === 'pencil' ? 'pencil-cursor' : tool === 'bucket' ? 'bucket-cursor' : 'eraser-cursor'}`}>
            <canvas
                ref={canvasRef}
                className="my-canvas"
            />
            <div className="canvas-buttons">
                <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
                <button onClick={undo}>Undo</button>
                <button onClick={clearCanvas}>Clear Canvas</button>
                <button onClick={() => handleToolChange('pencil')}>Pencil</button>
                <button onClick={() => handleToolChange('bucket')}>Bucket</button>
                <button onClick={() => handleToolChange('eraser')}>Eraser</button>
            </div>
        </div>

    );
};


export default DrawingArea





