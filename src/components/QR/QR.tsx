/**
 * Created by allen on 2016/11/28.
 */
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import * as cx from 'classnames';
import './css/QR.less';
import ReactDOM = __React.ReactDOM;
import CanvasImage from './CanvasImage';

interface IQRProps {
    qrSrc: string;
    headPhotoSrc: string;
    isLoading: boolean;
}

interface IQRStates {
    src: string
}

export default class QR extends React.Component<IQRProps,IQRStates> {

    private baseCls = `qr`;
    private placeholder = require(`../../images/qr-placeholder.png`);
    private loader = require(`../../images/ic-ajax-loader.gif`);

    public constructor(props: IQRProps) {
        super(props);
    }

    private isLoading() {
        return this.props.isLoading;
    }

    private getQrSrc() {
        const {placeholder} = this;
        const {qrSrc} = this.props;
        return qrSrc || placeholder;
    }

    private getHeaderPhotoSrc() {
        return this.props.headPhotoSrc;
    }

    private renderQrImage() {
        const {baseCls} = this;
        const isLoading = this.isLoading();
        if (isLoading) {
            return (
                <img className={`${baseCls}-img`} src={this.placeholder}/>
            )
        } else {
            return (
                <CanvasImage
                    className={`${baseCls}-img`}
                    qrSrc={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEu8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzZVdzlVMy1sYmNjVS1TcjV3R0p5AAIEy60yWAMEMIUnAA==`}
                    headPhotoSrc={`http://image.hao1hao1.com/group1/M00/71/B8/CgAgEVgz9tKACR5gAAFbhS3n0jE395.jpg`}
                />
            )
        }
    }

    public render() {
        const {baseCls, loader} = this;
        const isLoading = this.isLoading();
        const wrapperCls = cx(`${baseCls}-wrapper`, isLoading && `${baseCls}-loading`);
        return (
            <div className={baseCls}>
                <div className={wrapperCls}>
                    {this.renderQrImage()}
                </div>
                {isLoading && <img className={`${baseCls}-spinner`} src={loader}/>}
            </div>
        )
    }
}