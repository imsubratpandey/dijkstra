import React, { useRef, useState } from 'react';
import "../css/Home.css";
import Welcome from '../components/Welcome';
import NodesInputBox from '../components/NodesInputBox';
import NodesInputSideBar from '../components/NodesInputSideBar';
import { Slide, ToastContainer, toast } from "react-toastify";

export default function Home() {
  const homeRef = useRef<any>(null);
  const scatterBoxRef = useRef<any>(null);
  const [isStripeVisible, setIsStripeVisible] = useState<boolean>(true);
  const [nodes, setNodes] = useState<{ x: number, y: number }[]>([]);
  const [animationBegin, setAnimationBegin] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [displayScatter, setDisplayScatter] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const toastOptions: any = {
    position: "bottom-left",
    autoClose: 5000,
    transition: Slide,
    hideProgressBar: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
    closeOnClick: false
  };
  return (
    <>
      <div ref={homeRef} className="homeParent">
        <div id="homeContainer">
          <Welcome isStripeVisible={isStripeVisible} setIsStripeVisible={setIsStripeVisible} />
          <div ref={scatterBoxRef} id="homeContent">
            <div className={(isStripeVisible === true) ? "nodesInputBox nodesInputBoxHidden" : `${(nodes.length >= 1) ? `${(animationEnd === true) ? "nodesInputBoxSideBarAfterAnimationEnd" : `${(displayScatter === false) ? "nodesInputBoxSideBar preventSelect" : "nodesInputBoxSideBarSmallScreenHidden"}`}` : "nodesInputBox preventSelect"}`}>
              <div className={(nodes.length >= 1) ? "nodesInputBoxCoverHidden preventSelect" : "nodesInputBoxCover preventSelect"}>
                <NodesInputBox toast={toast} toastOptions={toastOptions} nodes={nodes} setNodes={setNodes} setShowMap={setShowMap} isStripeVisible={isStripeVisible} />
              </div>
              <div className={(nodes.length >= 1) ? `${(animationBegin === true) ? "nodesInputSideBarCoverAnimationStarted preventSelect" : "nodesInputSideBarCover preventSelect"}` : "nodesInputSideBarCoverHidden preventSelect"}>
                <NodesInputSideBar toast={toast} toastOptions={toastOptions} nodes={nodes} setNodes={setNodes} setShowMap={setShowMap} isStripeVisible={isStripeVisible} animationBegin={animationBegin} setDisplayScatter={setDisplayScatter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
