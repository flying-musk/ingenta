"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface Props {
  currentScore: number;
  targetScore: number;
}

export function ImprovementPlansProgress({ currentScore, targetScore }: Props) {
  const svgRef = useRef(null);

  useEffect(() => {
    const w = 130;
    const h = 12;

    const svg = d3.select(svgRef.current);

    svg.append("rect").attr("width", w).attr("height", h).attr("rx", 6).attr("fill", "#9EC8C0").attr("fill-opacity", 0.35);

    svg
      .append("rect")
      .attr("width", w * (targetScore / 100))
      .attr("height", h)
      .attr("rx", 6)
      .attr("fill", "url(#paint3_linear_21_1671)");

    svg
      .append("rect")
      .attr("width", w * (currentScore / 100))
      .attr("height", h)
      .attr("rx", 6)
      .attr("fill", "#9EC8C0");
  }, [currentScore, targetScore]);

  return (
    <svg ref={svgRef} className="grow">
      <defs xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="paint3_linear_21_1671" x1="82" y1="12" x2="79.5489" y2="-9.19807" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B507A" />
          <stop offset="1" stopColor="#9EADC8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
