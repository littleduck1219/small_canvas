import { Canvas, Circle, Rect } from "fabric";

export default function useIcon(canvas: Canvas | null) {
    const addRectangle = () => {
        if (canvas) {
            const rect = new Rect({
                top: 100,
                left: 50,
                width: 100,
                height: 60,
                fill: "#DB4D42",
            });
            canvas.add(rect);
        }
    };

    const addCircle = () => {
        if (canvas) {
            const circle = new Circle({
                top: 150,
                left: 150,
                radius: 50,
                fill: "#DB4D42",
            });
            canvas.add(circle);
        }
    };

    return { addRectangle, addCircle };
}
