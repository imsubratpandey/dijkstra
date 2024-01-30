import React, { useRef } from 'react';
import "../css/Welcome.css";
import ParticleNetworkAnimation from './ParticleNetworkAnimation';

interface Props {
    isStripeVisible: boolean,
    setIsStripeVisible: any
}

export default function Welcome({ isStripeVisible, setIsStripeVisible }: Props) {
    const mouseCaptureRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <div ref={mouseCaptureRef} onTouchStart={() => { setIsStripeVisible(false); }} onClick={() => { setIsStripeVisible(false); }} id="mouseEventCapture">
            </div>
            <div id="welcomeContainer">
                <div className={(isStripeVisible === true) ? "stripe preventSelect" : "stripe stripeHidden"}>
                    <p>
                        Dijkstra
                    </p>
                </div>
                <div className={(isStripeVisible === true) ? "stripe preventSelect" : "stripe stripeHidden"}>
                    <p>
                        Dijkstra
                    </p>
                    <p>
                        Click anywhere to continue
                    </p>
                </div>
            </div>
            <ParticleNetworkAnimation mouseCaptureRef={mouseCaptureRef} />
        </>
    )
}
