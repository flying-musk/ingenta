"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface Props {
  currentProbability: number;
  planProbability: number;
}

export function ImprovementPlansDonut({ currentProbability, planProbability }: Props) {
  const svgRef = useRef(null);

  let isRun = false;
  useEffect(() => {
    if (isRun) {
      return;
    }

    let glowRadius = 25;

    let w = 158;
    let h = 158;
    let outerRadius = w / 2;
    let innerRadius = outerRadius - 12;

    let arc: any = d3
      .arc()
      .innerRadius(72)
      .outerRadius(73)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    let planArcLine: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(glowRadius)
      .startAngle(Math.PI / 4)
      .endAngle(2 * Math.PI * planProbability);

    let currentArcLine: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(0)
      .startAngle(0)
      .endAngle(2 * Math.PI * currentProbability);

    let svg = d3.select(svgRef.current);

    //remove all elements in svg first
    svg.selectAll("*").remove();

    svg.append("path").attr("d", arc).attr("fill", "#E0E0E0");

    svg.append("path").attr("d", planArcLine).attr("fill", 'url("#paint1_linear_21_1645")');
    svg.append("path").attr("d", currentArcLine).attr("fill", 'url("#paint0_linear_21_1645")');

    isRun = true;
  }, [currentProbability, planProbability]);
  return (
    <svg className="grow">
      <g ref={svgRef} transform="translate(80,80)"></g>
      <defs>
        <linearGradient id="paint0_linear_21_1645" x1="151.93" y1="151.18" x2="20.2841" y2="-15.4344" gradientUnits="userSpaceOnUse">
          <stop stopColor="#379696" />
          <stop offset="1" stopColor="#9EC8C0" />
        </linearGradient>
        <linearGradient id="paint1_linear_21_1645" x1="151.93" y1="151.18" x2="20.2841" y2="-15.4344" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B507A" />
          <stop offset="1" stopColor="#9EADC8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
