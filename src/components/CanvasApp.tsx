import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Square, Circle as CircleIcon } from "lucide-react";
import "./canvasApp.style.scss";
import useIcon from "../hooks/useIcon";
import Settings from "./Settings";

export default function CanvasApp() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);

    const { addRectangle, addCircle } = useIcon(canvas);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 500,
                height: 500,
            });

            initCanvas.backgroundColor = "#fff";
            initCanvas.renderAll();

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    return (
        <div>
            <div className='toolbar darkmode'>
                <button onClick={addRectangle}>
                    <Square />
                </button>
                <button onClick={addCircle}>
                    <CircleIcon />
                </button>
            </div>

            <canvas id='canvas' ref={canvasRef} />

            <Settings canvas={canvas} />
        </div>
    );
}
