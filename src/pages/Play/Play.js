import { useEffect } from 'react';
import './Play.css';
import default_100_percent from '../../assets/default_100_percent/100-offline-sprite.png';
import default_200_percent from '../../assets/default_200_percent/200-offline-sprite.png';
import Runner from '../../utils/Runner';

function Play() {

    useEffect(() => {
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.keyCode === 32) {
                var box = document.getElementById("messageBox");
                box.style.visibility = "hidden";
            }
        };
        Runner('.interstitial-wrapper');
    }, []);

    return (
        <div className="App">
            <div id="messageBox" className="sendmessage">
                <h1 style={{ textAlign: 'center' }}>Press Space to start</h1>
                <div className="niokbutton"></div>
            </div>
            <div id="main-frame-error" className="interstitial-wrapper">
                <div id="main-content">
                    <div className="icon icon-offline" alt=""></div>
                </div>
                <div id="offline-resources">
                    <img id="offline-resources-1x" src={default_100_percent} alt="alt" />
                    <img id="offline-resources-2x" src={default_200_percent} alt="alt" />
                </div>
            </div>
        </div>
    )
}

export default Play;