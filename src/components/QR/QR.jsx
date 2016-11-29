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
require('./css/qr.less');
var QR = (function (_super) {
    __extends(QR, _super);
    function QR(props) {
        _super.call(this, props);
        this.baseCls = "qr";
        this.placeholder = require("../../images/qr-placeholder.png");
        this.loader = require("../../images/ic-ajax-loader.gif");
    }
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
        var headPhotoSrc = this.getHeaderPhotoSrc();
        var isLoading = this.isLoading();
        var wrapperCls = cx(baseCls + "-wrapper", isLoading && baseCls + "-loading");
        var qrSrc = this.getQrSrc();
        var canvas = this.
            return(<div className={baseCls}>
                <div className={wrapperCls}>
                    <img className={baseCls + "-img"} src={qrSrc}/>
                    {headPhotoSrc && <img className={baseCls + "-head"} src={headPhotoSrc}/>}
                </div>
                {isLoading && <img className={baseCls + "-spinner"} src={loader}/>}
            </div>);
    };
    return QR;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QR;
