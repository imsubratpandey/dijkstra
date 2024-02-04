import React from "react";

interface Props {
  xScale: any,
  height: any
}

function AxisBottom({ xScale, height }: Props) {
  const textPadding = 10;

  const axis = xScale.ticks(10).map((d: number, i: number) => (
    <g className="x-tick" key={i}>
      <line
        style={{ stroke: "#000000" }}
        y1={0}
        y2={height}
        x1={xScale(d)}
        x2={xScale(d)}
      />
      <text
        style={{ textAnchor: "middle", fontSize: 12 }}
        dy=".71em"
        x={xScale(d)}
        y={height + textPadding}
      >
        {d}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

export default AxisBottom;