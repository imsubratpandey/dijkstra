import React, { useRef, useEffect, useState } from 'react';
import "../css/Home.css";
import Welcome from '../components/Welcome';
import NodesInputBox from '../components/NodesInputBox';
import NodesInputSideBar from '../components/NodesInputSideBar';
import Scatter from '../components/Scatter';
import { Slide, ToastContainer, toast } from "react-toastify";

export default function Home() {
  const homeRef = useRef<any>(null);
  const toastId = useRef<any>(null);
  const scatterBoxRef = useRef<any>(null);
  const [isStripeVisible, setIsStripeVisible] = useState<boolean>(true);
  const [nodes, setNodes] = useState<{ x: number, y: number }[]>([]);
  const [paths, setPaths] = useState<any>([]);
  const [scatterBoxDimension, setScatterBoxDimension] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [animationBegin, setAnimationBegin] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [nodesDetailInfo, setNodesDetailInfo] = useState<any>("Loading...");
  const [shortestDistance, setShortestDistance] = useState<string>("Select a Node to See Shortest Path");
  const [algorithmResult, setAlgorithmResult] = useState<any>();
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
  useEffect(() => {
    setScatterBoxDimension({ width: 0.7 * scatterBoxRef.current?.offsetWidth, height: 0.9 * scatterBoxRef.current?.offsetHeight });
  }, [nodes, scatterBoxRef]);
  const runDijkstra = async () => {
    if (nodes.length < 2) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.info("Add atleast two nodes", toastOptions);
      }
      return;
    }
    setAnimationBegin(true);
    await new Promise(res => setTimeout(res, 3000));
    // Dijkstra Algorithm Call
    setAnimationEnd(true);
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
            <div className={(nodes.length >= 1) ? `${(animationEnd === true) ? "scatterBoxAfterAnimationEnd preventSelect" : `${(displayScatter === true) ? "scatterBoxSmallScreenShow preventSelect" : "scatterBox"}`}` : "scatterBoxHidden preventSelect"}>
              <Scatter paths={paths} setPaths={setPaths} nodes={nodes} animationBegin={animationBegin} animationEnd={animationEnd} algorithmResult={algorithmResult} setShortestDistance={setShortestDistance} setNodesDetailInfo={setNodesDetailInfo} dimension={{ width: scatterBoxDimension.width, height: scatterBoxDimension.height }} setDisplayScatter={setDisplayScatter} />
              <button className={(nodes.length >= 1) ? `${(animationBegin === true) ? "afterRunButton" : "runButton preventSelect"}` : "runButton runButtonHidden preventSelect"} onClick={() => { runDijkstra(); }}>Run Algorithm 🡒</button>
              <button className={(nodes.length >= 1) ? `${(animationEnd === true) ? "afterResultButton" : "resultButton preventSelect"}` : "resultButton resultButtonHidden preventSelect"}>{shortestDistance}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
