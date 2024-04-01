import React, { useRef, useState, useEffect } from 'react';
import "../css/Home.css";
import Welcome from '../components/Welcome';
import NodesInputBox from '../components/NodesInputBox';
import NodesInputSideBar from '../components/NodesInputSideBar';
import Scatter from '../components/Scatter';
import Dijkstra from '../utils/Dijkstra';
import Map from '../components/Map';
import { Slide, ToastContainer, toast } from "react-toastify";

export default function Home() {
  const scatterBoxRef = useRef<any>(null);
  const homeRef = useRef<any>(null);
  const toastId = useRef<any>(null);
  const [isStripeVisible, setIsStripeVisible] = useState<boolean>(true);
  const [nodes, setNodes] = useState<{ x: number, y: number }[]>([]);
  const [paths, setPaths] = useState<any>([]);
  const [scatterBoxDimension, setScatterBoxDimension] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [animationBegin, setAnimationBegin] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [nodesDetailInfo, setNodesDetailInfo] = useState<any>("Loading...");
  const [shortestDistance, setShortestDistance] = useState<string>("Select a Node to See Shortest Path");
  const [algorithmResult, setAlgorithmResult] = useState<any>();
  const [selectedPositon, setSelectedPosition] = useState<any>(null);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [locate, setLocate] = useState<boolean>(false);
  const [displayScatter, setDisplayScatter] = useState<boolean>(false);
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
    setAlgorithmResult(Dijkstra(paths, nodes.length, paths.length, 0));
    setAnimationEnd(true);
  };
  return (
    <>
      <div className="messageDesktop">
        Only Desktop Are Supported
      </div>
      <div ref={homeRef} className="homeParent">
        {
          (loading === true) ?
            <>
              <div className="loadingWindow">
                <div className="containerLoadingAnimation">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <svg width="0" height="0" className="svg">
                  <defs>
                    <filter id="uib-jelly-ooze">
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="3"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="ooze"
                      />
                      <feBlend in="SourceGraphic" in2="ooze" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </>
            :
            <></>
        }
        <Map setLoading={setLoading} showMap={showMap} nodes={nodes} setNodes={setNodes} setShowMap={setShowMap} selectedPositon={selectedPositon} setSelectedPosition={setSelectedPosition} locate={locate} setLocate={setLocate} />
        <div id="homeContainer">
          <Welcome isStripeVisible={isStripeVisible} setIsStripeVisible={setIsStripeVisible} />
          <div ref={scatterBoxRef} id="homeContent">
            {
              (nodes.length >= 1) ?
                <>
                  <svg viewBox="-7.8318 13.0219 512.1486 511.7321" xmlns="http://www.w3.org/2000/svg" className={(displayScatter === false) ? "switchButton" : "switchButtonRotated"} onClick={() => { setDisplayScatter(!displayScatter); }}>
                    <path opacity="1.000000" stroke="none" d="M 258.01 524.652 C 194.201 526.301 137.349 507.985 88.028 468.144 C 38.196 427.888 7.047 376.003 -3.768 312.719 C -16.014 241.058 -0.59 175.264 42.593 116.866 C 83.005 62.215 137.244 28.338 204.442 16.834 C 318.011 -2.607 427.305 53.542 478.376 157.138 C 498.52 197.999 507.638 241.457 503.227 286.844 C 492.83 393.825 436.696 467.425 337.81 508.476 C 312.589 518.947 285.775 523.39 258.01 524.652 M 214.426 394.81 C 217.308 392.588 220.471 390.649 223.029 388.102 C 256.912 354.358 290.714 320.532 324.527 286.717 C 336.705 274.539 336.672 263.075 324.431 250.835 C 290.735 217.139 257.033 183.449 223.32 149.77 C 221.792 148.243 220.222 146.733 218.524 145.404 C 209.311 138.197 196.458 139.681 189.065 148.744 C 181.65 157.832 182.696 169.453 191.981 178.762 C 220.692 207.547 249.462 236.271 278.204 265.024 C 279.442 266.262 280.627 267.553 282.211 269.211 C 280.148 271.048 278.456 272.411 276.928 273.938 C 248.518 302.316 220.101 330.687 191.75 359.124 C 183.404 367.495 181.909 377.841 187.455 386.783 C 192.859 395.497 202.697 398.617 214.426 394.81 Z" />
                  </svg>
                </>
                :
                <>
                </>
            }
            <div className={(isStripeVisible === true) ? "nodesInputBox nodesInputBoxHidden" : `${(nodes.length >= 1) ? `${(animationEnd === true) ? "nodesInputBoxSideBarAfterAnimationEnd" : `${(displayScatter === false) ? "nodesInputBoxSideBar preventSelect" : "nodesInputBoxSideBarSmallScreenHidden"}`}` : "nodesInputBox preventSelect"}`}>
              <div className={(nodes.length >= 1) ? "nodesInputBoxCoverHidden preventSelect" : "nodesInputBoxCover preventSelect"}>
                <NodesInputBox toast={toast} toastOptions={toastOptions} nodes={nodes} setNodes={setNodes} setShowMap={setShowMap} isStripeVisible={isStripeVisible} />
              </div>
              <div className={(nodes.length >= 1) ? `${(animationBegin === true) ? "nodesInputSideBarCoverAnimationStarted preventSelect" : "nodesInputSideBarCover preventSelect"}` : "nodesInputSideBarCoverHidden preventSelect"}>
                <NodesInputSideBar toast={toast} toastOptions={toastOptions} nodes={nodes} setNodes={setNodes} setShowMap={setShowMap} isStripeVisible={isStripeVisible} animationBegin={animationBegin} setDisplayScatter={setDisplayScatter} />
              </div>
              <div className={(animationBegin === true) ? "animationContainer" : "animationContainerHidden"}>
                <div className="container">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <svg width="0" height="0" className="svg">
                  <defs>
                    <filter id="uib-jelly-ooze">
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="3"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="ooze"
                      />
                      <feBlend in="SourceGraphic" in2="ooze" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
            <div className={(nodes.length >= 1) ? `${(animationEnd === true) ? "scatterBoxAfterAnimationEnd preventSelect" : `${(displayScatter === true) ? "scatterBoxSmallScreenShow preventSelect" : "scatterBox"}`}` : "scatterBoxHidden preventSelect"}>
              <Scatter paths={paths} setPaths={setPaths} nodes={nodes} animationBegin={animationBegin} animationEnd={animationEnd} algorithmResult={algorithmResult} setShortestDistance={setShortestDistance} setNodesDetailInfo={setNodesDetailInfo} dimension={{ width: scatterBoxDimension.width, height: scatterBoxDimension.height }} setDisplayScatter={setDisplayScatter} />
              <button className={(nodes.length >= 1) ? `${(animationBegin === true) ? "afterRunButton" : "runButton preventSelect"}` : "runButton runButtonHidden preventSelect"} onClick={() => { runDijkstra(); }}>Run Algorithm 🡒</button>
              <button className={(nodes.length >= 1) ? `${(animationEnd === true) ? "afterResultButton" : "resultButton preventSelect"}` : "resultButton resultButtonHidden preventSelect"}>{shortestDistance}</button>
            </div>
            {
              (nodesDetailInfo !== "Loading...") ?
                <>
                  <button className="nodesDetail preventSelect">{nodesDetailInfo}</button>
                </>
                :
                <>
                </>
            }
          </div>
        </div>
      </div>
      <ToastContainer bodyClassName="toastBody" style={{ backgroundColor: "rgba(0, 0, 0, 0)", overflow: "hidden" }} toastStyle={{ backgroundColor: "rgba(255, 255, 126, 0.85)", color: "black" }} newestOnTop />
    </>
  )
}
