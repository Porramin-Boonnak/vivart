import "../pagescss/draw.css"
import { useRef, useEffect, useState } from "react"
export default function Draw({ onSave, base64List,clearCanvas, onClear }) {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.linecap = "round";
        context.strokestyle = "#D3D3D3";
        context.lineWidth = 100;
        const img = new Image();
        img.src = base64List;
        img.onload = () => {
            const container = canvas.parentNode;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            // คำนวณ scale เพื่อรักษาสัดส่วนของรูปภาพ แต่ให้ขยายใหญ่ที่สุดเท่าที่จะเป็นไปได้
            const scale = Math.max(containerWidth / img.width, containerHeight / img.height);
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            canvas.width = newWidth;
            canvas.height = newHeight;
            context.drawImage(img, 0, 0, newWidth, newHeight); // วาดรูปให้เต็ม canvas
            setBackgroundImage(context.getImageData(0, 0, newWidth, newHeight));
            context.lineCap = "round";
            context.strokeStyle = "#D3D3D3";
            context.lineWidth = 50;
            
        };
        contextRef.current = context;
    }, [base64List])

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        const canvas = canvasRef.current;
        const base64Image = canvas.toDataURL("image/png");
        onSave(base64Image);
        setIsDrawing(false);
    };
    const clearDrawing = () => {
        if (backgroundImage) {
          contextRef.current.putImageData(backgroundImage, 0, 0);
        }
      };

      useEffect(() => {
        if (clearCanvas) {
            if (backgroundImage) {
                contextRef.current.putImageData(backgroundImage, 0, 0);
            }
            onClear(); // ✅ แจ้งว่าเคลียร์เสร็จแล้ว
        }
    }, [clearCanvas, onClear]);
    return (<>
        <div className="container-fluid bg-secondary">
            <canvas ref={canvasRef} onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
    </>)
}