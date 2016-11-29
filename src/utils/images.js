/**
 * Created by allen on 2016/11/28.
 */
"use strict";
function loadImage(src) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.crossOrigin = "*";
        image.onload = function () { return resolve(image); };
        image.onerror = reject;
        image.src = src;
    });
}
function mergeQRWithHeadImage(canvas, qrSrc, headPhotoSrc) {
    // const canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    return Promise.all([loadImage(qrSrc), loadImage(headPhotoSrc)]).then(function (_a) {
        var qrImg = _a[0], headPhotoImg = _a[1];
        canvas.width = qrImg.naturalWidth > 256 ? 256 : qrImg.naturalWidth;
        canvas.height = qrImg.naturalHeight > 256 ? 256 : qrImg.naturalHeight;
        qrImg.width = canvas.width;
        qrImg.height = canvas.height;
        headPhotoImg.width = qrImg.width / 4;
        headPhotoImg.height = qrImg.height / 4;
        ctx.drawImage(qrImg, 0, 0, qrImg.width, qrImg.height);
        ctx.drawImage(headPhotoImg, (canvas.width - headPhotoImg.width) / 2, (canvas.height - headPhotoImg.height) / 2, headPhotoImg.width, headPhotoImg.height);
        return canvas;
    });
}
exports.mergeQRWithHeadImage = mergeQRWithHeadImage;
