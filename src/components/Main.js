require('normalize.css/normalize.css');
require('styles/App.css');

import React from "react";
import QR from "./QR/QR";
let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
    render() {
        const qrProps = {
            qrSrc: '',
            headPhotoSrc: '',
            isLoading: false
        };
        return (
            <div className="index">
                <img src={yeomanImage} alt="Yeoman Generator"/>
                <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
                <div style={{width: '256px', height: '256px', display: 'inline-block'}}><QR {...qrProps} /></div>
            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
