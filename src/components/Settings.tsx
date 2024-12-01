import React, { useEffect, useState } from "react";
import { Canvas, FabricObject } from "fabric";
import "./settings.style.scss";

export default function Settings({ canvas }: { canvas?: Canvas | null }) {
    const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
    const [width, setWidth] = useState<number | string>("");
    const [height, setHeight] = useState<number | string>("");
    const [diameter, setDiameter] = useState<string | number>("");
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:cleared", () => {
                handleObjectSelection(null);
            });

            canvas.on("object:scaling", (event) => {
                handleObjectSelection(event.target);
            });

            canvas.on("object:modified", (event) => {
                handleObjectSelection(event.target);
            });
        }
    }, [canvas]);

    const handleObjectSelection = (object: FabricObject) => {
        if (!object) return;
        setSelectedObject(object);
        if (object.type === "rect") {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        } else if (object.type === "circle") {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill);
            setWidth("");
            setHeight("");
        }
    };

    const clearSettings = () => {
        setWidth("");
        setHeight("");
        setDiameter("");
        setColor("");
    };

    const handleWidthChange = (event) => {
        const value = event.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setWidth(intValue);

        if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
            selectedObject.set({ width: intValue / selectedObject.scaleX });
            canvas?.renderAll();
        }
    };

    const handleHeightChange = (event) => {
        const value = event.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setHeight(intValue);

        if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
            selectedObject.set({ height: intValue / selectedObject.scaleY });
            canvas?.renderAll();
        }
    };

    const handleDiameterChange = (event) => {};
    const handleColorChange = (event) => {};

    return (
        <div className='settings darkmode'>
            {selectedObject && selectedObject.type === "rect" && (
                <>
                    <label>Width</label>
                    <input onChange={handleWidthChange}>{width}</input>
                    <label>Height</label>
                    <input onChange={handleHeightChange}>{height}</input>
                    <label>Color</label>
                    <input onChange={handleColorChange}>{color}</input>
                </>
            )}
        </div>
    );
}

{
    /* <label>diameter</label>
<input onChange={handleDiameterChange}>{width}</input> */
}
