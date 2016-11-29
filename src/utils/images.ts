/**
 * Created by allen on 2016/11/28.
 */

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "*";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    })
}

export function mergeQRWithHeadImage(canvas, qrSrc: string, headPhotoSrc: string) {
    // const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    return Promise.all([loadImage(qrSrc), loadImage(headPhotoSrc)]).then(([qrImg,headPhotoImg]) => {
        canvas.width = qrImg.naturalWidth > 256 ? 256 : qrImg.naturalWidth;
        canvas.height = qrImg.naturalHeight > 256 ? 256 : qrImg.naturalHeight;
        qrImg.width = canvas.width;
        qrImg.height = canvas.height;
        headPhotoImg.width = qrImg.width / 4;
        headPhotoImg.height = qrImg.height / 4;
        ctx.drawImage(qrImg, 0, 0, qrImg.width, qrImg.height);
        ctx.drawImage(headPhotoImg,
            (canvas.width - headPhotoImg.width) / 2, (canvas.height - headPhotoImg.height) / 2, headPhotoImg.width, headPhotoImg.height,
        );
        return canvas;
    });
}