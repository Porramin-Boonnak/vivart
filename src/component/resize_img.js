export function resizeBase64Img(base64, newWidth, newHeight) {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = base64;
        img.onload = () => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            resolve(canvas.toDataURL());
        };
    });
}
