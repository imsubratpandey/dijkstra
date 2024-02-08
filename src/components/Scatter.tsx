import React, { useRef, useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array"
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import { GetHaversineDistance } from "../utils/GetDistance";
import "../css/Scatter.css";

interface Props {
  paths: any,
  setPaths: any,
  nodes: any,
  dimension: any
  setNodesDetailInfo: any,
  animationBegin: boolean,
  algorithmResult: any,
  setShortestDistance: any,
  animationEnd: boolean,
  setDisplayScatter: any
}

export default function Scatter({ paths, setPaths, nodes, setNodesDetailInfo, animationBegin, animationEnd, algorithmResult, setShortestDistance, dimension, setDisplayScatter }: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [allPaths, setAllPaths] = useState<any[]>([]);
  const [shortestPathToShow, setshortestPathToShow] = useState<any[]>([]);
  const [showShortestPath, setShowShortestPath] = useState<boolean>(false);


  useEffect(() => {
    let i;
    let newPaths: any[] = [];
    for (i = 0; i < nodes.length; i++) {
      newPaths.push({ p1: nodes.length - 1, p2: i });
    }
    setAllPaths(allPaths => [...allPaths, ...newPaths]);
  }, [nodes, setAllPaths]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctxRef.current = ctx;
    }
  }, []);
  const [coordinate, setCoordinate] = useState({ x: "", y: "" });
  const startDrawing = (e: any) => {
    setCoordinate({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setIsDrawing(true);
  };
  const endDrawing = () => {
    if (canvasRef.current) {
      ctxRef.current.closePath();
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setIsDrawing(false);
    }
  };
  const draw = (e: any) => {
    if (!isDrawing) {
      return;
    }
    if (canvasRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(
        coordinate.x,
        coordinate.y
      );
      ctxRef.current.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      ctxRef.current.stroke();
    }
  };






  const [point, setPoint] = useState({ p1: -1, p2: -1 }),
    w = dimension.width,
    h = dimension.height,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xExtent: any = extent(nodes, (d: any) => parseInt(d.x));
  const xScale = scaleLinear()
    .domain(xExtent)
    .range([0, width]);

  const yExtent: any = extent(nodes, (d: any) => parseInt(d.y));
  const yScale = scaleLinear()
    .domain(yExtent)
    .range([height, 0]);

  const circles = nodes.map((d: { x: number, y: number }, i: number) => (
    <circle
      onMouseDown={(e: any) => {
        setPoint({ p1: i, p2: i });
        startDrawing(e);
        draw(e);
      }
      }
      onMouseUp={(e: any) => {
        if (point.p1 !== -1) {
          const p1 = point.p1;
          const p2 = i;
          setPaths([...paths, { p1: p1, p2: p2, distance: GetHaversineDistance(nodes[p1].x, nodes[p1].y, nodes[p2].x, nodes[p2].y) }]);
        }
        endDrawing();
      }
      }
      onMouseOver={(e: any) => {
        setNodesDetailInfo(`${d.x}, ${d.y}`);
      }
      }
      onMouseOut={(e: any) => {
        setNodesDetailInfo("Loading...");
      }
      }
      onClick={async (e: any) => {
        if (animationEnd === true) {
          setShowShortestPath(true);
          setshortestPathToShow([]);
          await new Promise(res => setTimeout(res, 100));
          setShortestDistance(`${(algorithmResult?.distance[i] === -1) ? "Path is not possible !" : `Path distance is ${algorithmResult?.distance[i]} metres`}`);
          setshortestPathToShow(algorithmResult?.shortestPaths[i]);
        }
      }
      }
      key={i}
      r={5}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      style={{ fill: `${(i === 0) ? "rgb(255,0,0)" : "rgb(0,0,0)"}` }}
      className="nodesCircle"
    />
  ));
  const lines = paths.map((p: any, i: any) => (
    <line
      key={i}
      x1={xScale(nodes[p.p1].x)}
      y1={yScale(nodes[p.p1].y)}
      x2={xScale(nodes[p.p2].x)}
      y2={yScale(nodes[p.p2].y)}
      style={{ stroke: "rgb(255,0,0)", strokeWidth: "2" }}
    />
  ));

  const allLines = allPaths.map((p: any, i: any) => (
    <line
      key={i}
      x1={xScale(nodes[p.p1].x)}
      y1={yScale(nodes[p.p1].y)}
      x2={xScale(nodes[p.p2].x)}
      y2={yScale(nodes[p.p2].y)}
      style={{ stroke: "rgb(0,0,0)", strokeWidth: "2" }}
      className={(showShortestPath === true) ? "animatedPathsLineGoOff" : "animatedPathsLine"}
    />
  ));

  const shortestPathLines = shortestPathToShow.map((p: any, i: any) => (
    <line
      key={i}
      x1={xScale(nodes[p.p1].x)}
      y1={yScale(nodes[p.p1].y)}
      x2={xScale(nodes[p.p2].x)}
      y2={yScale(nodes[p.p2].y)}
      style={{ stroke: "rgb(0,0,255)", strokeWidth: "2" }}
      className={(shortestPathToShow.length === 0) ? "shortestPathLineGoOff" : "shortestPathLine"}
    />
  ));


  return (
    <div className="svgContainer preventSelect" style={{ width: dimension.width, height: dimension.height }}>
      <div className="svgContentBox">
        <svg onMouseUp={() => { endDrawing(); setPoint({ p1: -1, p2: -1 }); }} onMouseMove={draw} width={w} height={h}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisLeft yScale={yScale} width={width} />
            <AxisBottom xScale={xScale} height={height} />
            {lines}
            {
              (animationBegin === true) ?
                <>
                  {allLines}
                </>
                :
                <>
                </>
            }
            {
              (showShortestPath === true) ?
                <>
                  {shortestPathLines}
                </>
                :
                <>
                </>
            }
            {circles}
          </g>
        </svg>
      </div>
      <canvas
        className="canvasElement"
        width={dimension.width} height={dimension.height}
        ref={canvasRef}>
      </canvas>
    </div>
  )
}