/**
 * Created by allen on 2016/11/28.
 */
import * as React from 'react';
import './css/CanvasImage.less';

interface ICanvasImageRequiredProps {
    qrSrc: string;
    headPhotoSrc: string;

}

interface ICanvasImageProps extends ICanvasImageRequiredProps {
    className?: string;
    limitDimension?: number;
    headDimensionRatio?: number;
    proxy?: {
        enable: boolean;
        proxyServer: string;
    }
}

interface ICanvasImageStates {
    src: string
}

/**
 * make use of canvas to merge qr image with head image,
 * generate a base64 string,
 * and output as a image
 */
export default class CanvasImage extends React.Component<ICanvasImageProps,ICanvasImageStates> {
    /**
     * current component css class namespace
     */
    public baseCls = `canvas-image`;

    /**
     * default component props
     */
    public static defaultProps = {
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
            proxyServer: `http://allen-io.ml:8989/`,
        }
    };

    public constructor(props: ICanvasImageProps) {
        super(props);
        this.state = {
            src: null
        }
    }

    /**
     * load image asynchronously,
     * this is a key part for image preload
     */
    private loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.crossOrigin = "*";
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (err) => {
                reject(err);
            };
            image.src = src;
        });
    }

    /**
     * get canvas dimension,
     * qr image will fill up the entire canvas,
     * thus, canvas should equals qr image dimension
     * limit max dimension defined by props
     */
    private getCanvasDimension(qrImg: HTMLImageElement) {
        const {limitDimension} = this.props;
        return {
            width: qrImg.naturalWidth > limitDimension ? limitDimension : qrImg.naturalWidth,
            height: qrImg.naturalHeight > limitDimension ? limitDimension : qrImg.naturalHeight
        };
    }

    /**
     * merge qr with head photo, and generate base64 for image element as well as caching
     */
    private mergeQRWithHeadImage(qrSrc: string, headPhotoSrc: string): Promise<string> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        return Promise.all([this.loadImage(qrSrc), this.loadImage(headPhotoSrc)]).then(([qrImg,headPhotoImg]) => {
            const {headDimensionRatio} = this.props;
            const dimension = this.getCanvasDimension(qrImg);
            const {width, height} = dimension;
            canvas.width = width;
            canvas.height = height;
            qrImg.width = width;
            qrImg.height = height;
            headPhotoImg.width = qrImg.width * headDimensionRatio;
            headPhotoImg.height = qrImg.height * headDimensionRatio;
            ctx.drawImage(qrImg, 0, 0, qrImg.width, qrImg.height);
            this.drawHeadPhoto(ctx, headPhotoImg, canvas);
            return canvas.toDataURL();
        });
    }

    private drawHeadPhotoBorder(ctx: CanvasRenderingContext2D, strokeStyle: string, lineWidth: number, startX: number, startY: number, width: number, height: number) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(startX - 1, startY - 1, width + 2, height + 2);
    }

    private drawHeadPhoto(ctx: CanvasRenderingContext2D, headPhotoImg: HTMLImageElement, canvas: HTMLCanvasElement) {
        const {width, height} = headPhotoImg;
        const headPhotoImgStartX = (canvas.width - width) / 2;
        const headPhotoImgStartY = (canvas.height - height) / 2;
        ctx.drawImage(
            headPhotoImg,
            headPhotoImgStartX, headPhotoImgStartY, width, height
        );
        this.drawHeadPhotoBorder(ctx, `#fff`, 2, headPhotoImgStartX, headPhotoImgStartY, width, height);
    }

    private tryAppendProxy(src: string) {
        const {enable, proxyServer} = this.props.proxy;
        const result = enable ? proxyServer + src : src;
        debugger;
        if (process.env != `production`) {
            console.log(JSON.stringify({
                enable,
                proxyServer,
                result
            }))
        }
        return result;
    }

    /**
     * try set state if image onloaded
     */
    private trySetState() {
        if (this.state.src) {
            return;
        }
        let {qrSrc, headPhotoSrc} = this.props;
        if (qrSrc && headPhotoSrc) {
            qrSrc = this.tryAppendProxy(qrSrc);
            headPhotoSrc = this.tryAppendProxy(headPhotoSrc);
            this.mergeQRWithHeadImage(qrSrc, headPhotoSrc).then((base64: string) => {
                this.setState({
                    src: base64
                })
            });
        }
    }

    public componentDidMount() {
        this.trySetState();
    }

    public componentWillReceiveProps(props) {
        if (this.props != props) {
            this.trySetState();
        }
    }

    public shouldComponentUpdate() {
        return !this.state.src;
    }

    public render() {
        const {baseCls} = this;
        const {src} = this.state;
        return (
            <img className={`${baseCls}-img`} src={src}/>
        )
    }
}
