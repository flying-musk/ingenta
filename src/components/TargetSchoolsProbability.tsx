import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  probability: number;
  schoolId: string;
}

export function TargetSchoolsProbability({ schoolId, probability }: Props) {
  const svgRef = useRef(null);
  let isRun = false;
  useEffect(() => {
    if (isRun) {
      return;
    }

    let percent = 65;
    let oldValue = 0;
    let ratio = percent / 100;
    let glowRadius = 25;

    let w = 50;
    let h = 50;
    let outerRadius = w / 2;
    let innerRadius = outerRadius - 6.5;

    let arc: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    let arcLine: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(glowRadius)
      .startAngle(-0.05)
      .endAngle(2 * Math.PI * probability);

    let svg = d3.select(svgRef.current);

    svg.append("path").attr("d", arc).attr("fill", "#9EC8C0").attr("opacity", 0.35);

    svg
      .append("path")
      .attr("d", arcLine)
      .attr("fill", probability > 0.6 ? "#68CFC9" : probability > 0.3 ? "#F2994A" : "#EB5757");

    svg
      .append("text")
      .datum(0)
      .text(`${probability * 100}%`)
      .attr("class", "counterText")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#000")
      .attr("font-size", "12px");

    isRun = true;
  }, [schoolId]);

  return (
    <div className="w-[50px] h-[50px] flex">
      <svg className="grow">
        <g ref={svgRef} transform="translate(25,25)"></g>
      </svg>
    </div>
  );
}
