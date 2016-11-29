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
var cx = require('classnames');
require('./css/QR.less');
var CanvasImage_1 = require('./CanvasImage');
var QR = (function (_super) {
    __extends(QR, _super);
    function QR(props) {
        _super.call(this, props);
        this.baseCls = "qr";
        this.placeholder = require("../../images/qr-placeholder.png");
        this.loader = require("../../images/ic-ajax-loader.gif");
        this.state = {
            src: null
        };
    }
    //
    // public componentDidMount() {
    //     mergeQRWithHeadImage(findDOMNode<HTMLCanvasElement>(this.refs.canvas),
    //         `https://crossorigin.me/https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEu8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzZVdzlVMy1sYmNjVS1TcjV3R0p5AAIEy60yWAMEMIUnAA==`,
    //         `https://crossorigin.me/http://image.hao1hao1.com/group1/M00/71/B8/CgAgEVgz9tKACR5gAAFbhS3n0jE395.jpg`
    //     ).then((canvas) => {
    //         const base64 = canvas.toDataURL();
    //         console.log(base64);
    //         this.setState({src: base64})
    //     });
    // }
    QR.prototype.isLoading = function () {
        return this.props.isLoading;
    };
    QR.prototype.getQrSrc = function () {
        var placeholder = this.placeholder;
        var qrSrc = this.props.qrSrc;
        return qrSrc || placeholder;
    };
    QR.prototype.getHeaderPhotoSrc = function () {
        return this.props.headPhotoSrc;
    };
    QR.prototype.render = function () {
        var _a = this, baseCls = _a.baseCls, loader = _a.loader;
        var isLoading = this.isLoading();
        var wrapperCls = cx(baseCls + "-wrapper", isLoading && baseCls + "-loading");
        var headPhotoSrc = this.getHeaderPhotoSrc();
        var qrSrc = this.getQrSrc();
        return (React.createElement("div", {className: baseCls}, 
            React.createElement("div", {className: wrapperCls}, 
                React.createElement(CanvasImage_1.default, {qrSrc: "https://crossorigin.me/https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEu8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzZVdzlVMy1sYmNjVS1TcjV3R0p5AAIEy60yWAMEMIUnAA==", headPhotoSrc: "https://crossorigin.me/http://image.hao1hao1.com/group1/M00/71/B8/CgAgEVgz9tKACR5gAAFbhS3n0jE395.jpg"})
            )
        ));
    };
    return QR;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QR;
