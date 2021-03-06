"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by allen on 2016/11/28.
 */
var React = require('react');
require('./css/CanvasImage.less');
/**
 * make use of canvas to merge qr image with head image,
 * generate a base64 string,
 * and output as a image
 */
var CanvasImage = (function (_super) {
    __extends(CanvasImage, _super);
    function CanvasImage(props) {
        _super.call(this, props);
        /**
         * current component css class namespace
         */
        this.baseCls = "canvas-image";
        this.state = {
            src: null
        };
    }
    /**
     * load image asynchronously,
     * this is a key part for image preload
     */
    CanvasImage.prototype.loadImage = function (src) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.crossOrigin = "*";
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function (err) {
                reject(err);
            };
            image.src = src;
        });
    };
    /**
     * get canvas dimension,
     * qr image will fill up the entire canvas,
     * thus, canvas should equals qr image dimension
     * limit max dimension defined by props
     */
    CanvasImage.prototype.getCanvasDimension = function (qrImg) {
        var limitDimension = this.props.limitDimension;
        return {
            width: qrImg.naturalWidth > limitDimension ? limitDimension : qrImg.naturalWidth,
            height: qrImg.naturalHeight > limitDimension ? limitDimension : qrImg.naturalHeight
        };
    };
    /**
     * merge qr with head photo, and generate base64 for image element as well as caching
     */
    CanvasImage.prototype.mergeQRWithHeadImage = function (qrSrc, headPhotoSrc) {
        var _this = this;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        return Promise.all([this.loadImage(qrSrc), this.loadImage(headPhotoSrc)]).then(function (_a) {
            var qrImg = _a[0], headPhotoImg = _a[1];
            var headDimensionRatio = _this.props.headDimensionRatio;
            var dimension = _this.getCanvasDimension(qrImg);
            var width = dimension.width, height = dimension.height;
            canvas.width = width;
            canvas.height = height;
            qrImg.width = width;
            qrImg.height = height;
            headPhotoImg.width = qrImg.width * headDimensionRatio;
            headPhotoImg.height = qrImg.height * headDimensionRatio;
            ctx.drawImage(qrImg, 0, 0, qrImg.width, qrImg.height);
            _this.drawHeadPhoto(ctx, headPhotoImg, canvas);
            return canvas.toDataURL();
        });
    };
    CanvasImage.prototype.drawHeadPhotoBorder = function (ctx, strokeStyle, lineWidth, startX, startY, width, height) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(startX - 1, startY - 1, width + 2, height + 2);
    };
    CanvasImage.prototype.drawHeadPhoto = function (ctx, headPhotoImg, canvas) {
        var width = headPhotoImg.width, height = headPhotoImg.height;
        var headPhotoImgStartX = (canvas.width - width) / 2;
        var headPhotoImgStartY = (canvas.height - height) / 2;
        ctx.drawImage(headPhotoImg, headPhotoImgStartX, headPhotoImgStartY, width, height);
        this.drawHeadPhotoBorder(ctx, "#fff", 2, headPhotoImgStartX, headPhotoImgStartY, width, height);
    };
    CanvasImage.prototype.tryAppendProxy = function (src) {
        var _a = this.props.proxy, enable = _a.enable, proxyServer = _a.proxyServer;
        var result = enable ? proxyServer + src : src;
        debugger;
        if (process.env != "production") {
            console.log(JSON.stringify({
                enable: enable,
                proxyServer: proxyServer,
                result: result
            }));
        }
        return result;
    };
    /**
     * try set state if image onloaded
     */
    CanvasImage.prototype.trySetState = function () {
        var _this = this;
        if (this.state.src) {
            return;
        }
        var _a = this.props, qrSrc = _a.qrSrc, headPhotoSrc = _a.headPhotoSrc;
        if (qrSrc && headPhotoSrc) {
            qrSrc = this.tryAppendProxy(qrSrc);
            headPhotoSrc = this.tryAppendProxy(headPhotoSrc);
            this.mergeQRWithHeadImage(qrSrc, headPhotoSrc).then(function (base64) {
                _this.setState({
                    src: base64
                });
            });
        }
    };
    CanvasImage.prototype.componentDidMount = function () {
        this.trySetState();
    };
    CanvasImage.prototype.componentWillReceiveProps = function (props) {
        if (this.props != props) {
            this.trySetState();
        }
    };
    CanvasImage.prototype.shouldComponentUpdate = function () {
        return !this.state.src;
    };
    CanvasImage.prototype.render = function () {
        var baseCls = this.baseCls;
        var src = this.state.src;
        return (React.createElement("img", {className: baseCls + "-img", src: src}));
    };
    /**
     * default component props
     */
    CanvasImage.defaultProps = {
        /**
         * limit the generated qr image size.
         * It could effectively reduce the size of generated QR image
         * default: 256px
         */
        limitDimension: 256,
        /**
         * head photo ratio: head-dimension/qr-dimension
         */
        headDimensionRatio: 0.25,
        /**
         * it's highly recommend to enable CORS with proper concern of security issue such as CSRF.
         * since it allows this library to merge images into one as well as generate base64 image uri for caching purposes,
         * a proxy server is required to resolve CORS problem,
         * if the images by default enable CORS, set the proxy.enable = false,
         * if you find the following proxy server is unreachable, create your own proxy server,
         */
        proxy: {
            enable: true,
            proxyServer: "http://allen-io.ml:8989/",
        }
    };
    return CanvasImage;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CanvasImage;
