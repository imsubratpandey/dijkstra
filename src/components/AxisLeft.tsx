import React from "react";

interface Props {
  yScale: any,
  width: any
}

function AxisLeft({ yScale, width }: Props) {
  const textPadding = -20

  const axis = yScale.ticks(5).map((d: number, i: number) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: "#000000" }}
        y1={yScale(d)}
        y2={yScale(d)}
        x1={0}
        x2={width}
      />
      <text
        style={{ fontSize: 12 }}
        x={textPadding}
        dy=".32em"
        y={yScale(d)}
      >
        {d}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

export default AxisLeft;