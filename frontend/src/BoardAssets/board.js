import React, {useRef, useEffect, useState} from 'react';
import "./board.css";

const DrawingArea = () => {
    const canvasRef = useRef(null);
    const linesRef = useRef([]);
    const isDrawingRef = useRef(false);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Default color is black
    const selectedColorRef = useRef(selectedColor);


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


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // Set the actual pixel size based on the desired width and height
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
        let currentLine = [];

        const startDrawing = (e) => {
            isDrawingRef.current = true;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentLine = [{x, y}];
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
        <div className="canvas-container">
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
            </div>
        </div>

    );
};

export default DrawingArea;
