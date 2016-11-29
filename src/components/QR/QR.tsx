/**
 * Created by allen on 2016/11/28.
 */
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import * as cx from 'classnames';
import './css/QR.less';
import {mergeQRWithHeadImage} from '../../utils/images';
import ReactDOM = __React.ReactDOM;
import CanvasImage from './CanvasImage';

interface IQRProps {
    qrSrc: string;
    headPhotoSrc: string;
    isLoading: boolean;
}

interface IQRStates {
}

export default class QR extends React.Component<IQRProps,IQRStates> {

    private baseCls = `qr`;
    private placeholder = require(`../../images/qr-placeholder.png`);
    private loader = require(`../../images/ic-ajax-loader.gif`);

    public constructor(props: IQRProps) {
        super(props);
        this.state = {
            src: null
        }
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

    public render() {
        const {baseCls, loader} = this;
        const isLoading = this.isLoading();
        const wrapperCls = cx(`${baseCls}-wrapper`, isLoading && `${baseCls}-loading`);
        const headPhotoSrc = this.getHeaderPhotoSrc();
        const qrSrc = this.getQrSrc();
        return (
            <div className={baseCls}>
                <div className={wrapperCls}>
                    <CanvasImage qrSrc={`https://crossorigin.me/https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEu8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzZVdzlVMy1sYmNjVS1TcjV3R0p5AAIEy60yWAMEMIUnAA==`}
                                 headPhotoSrc={`https://crossorigin.me/http://image.hao1hao1.com/group1/M00/71/B8/CgAgEVgz9tKACR5gAAFbhS3n0jE395.jpg`}
                    />
                    {/*<canvas ref="canvas" width="100%" height="100%" style={{width:`100%`,height:`100%`}}/>*/}
                    {/*<img className={`${baseCls}-img`} src={this.state.src}/>*/}
                    {/*{headPhotoSrc && <img className={`${baseCls}-head`} src={headPhotoSrc}/>}*/}
                </div>
                {/*{isLoading && <img className={`${baseCls}-spinner`} src={loader}/>}*/}
            </div>
        )
    }
}