"use client";

import { useState, useEffect, useRef, use } from "react";
import * as d3 from "d3";
import { ScoreDistributionResponse } from "../../type/type";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

interface SubjectData {
  subjectId: string;
  subjectName: string;
  currentScore: number;
  previousScore: number;
  importance: number;
}

interface Props {
  scoreDistribution: ScoreDistributionResponse | null;
}

export function ScoreDistribution({ scoreDistribution }: Props) {
  const [subjects, setSubjects] = useState<SubjectData[]>(scoreDistribution?.items.map(({ subject_id, subject_name, current_score, previous_score, importance }) => ({ subjectId: subject_id, subjectName: subject_name, currentScore: current_score, previousScore: previous_score, importance })) || []);
  const divRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState<number>(0);
  const margin = { top: 10, right: 30, bottom: 20, left: 30 };
  const height = 280 - margin.top - margin.bottom;

  useEffect(() => {
    if (!divRef.current) return;
    const updateDimensions = () => {
      if (divRef.current) {
        const { clientWidth } = divRef.current;
        setWidth(clientWidth - margin.left - margin.right);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    // Draw horizontal grid lines
    svg
      .selectAll("line.horizontalGrid")
      .data(yScale.ticks(10))
      .enter()
      .append("line")
      .attr("class", "horizontalGrid")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .style("stroke", "#E1E6F1")
      .style("stroke-opacity", 0.5);

    // Draw vertical grid lines
    svg
      .selectAll("line.verticalGrid")
      .data(xScale.ticks(10))
      .enter()
      .append("line")
      .attr("class", "verticalGrid")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#E1E6F1")
      .style("stroke-opacity", 0.5);

    // Draw x-axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .style("stroke-opacity", 0.5)
      .call(d3.axisBottom(xScale).ticks(10).tickSize(0).tickPadding(8))
      .selectAll(".tick text")
      .attr("font-size", "12px")
      .attr("font-family", notoSansJP.style.fontFamily)
      .attr("opacity", "40%");

    // Draw y-axis
    svg
      .append("g")
      .attr("class", "y axis")
      .style("stroke-opacity", 0.5)
      .call(d3.axisLeft(yScale).tickValues(d3.range(10, 101, 10)).tickSize(0).tickPadding(8))
      .selectAll(".tick text")
      .attr("font-size", "12px")
      .attr("font-family", notoSansJP.style.fontFamily)
      .attr("opacity", "40%");

    // Draw y-axis on the right
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)") // Move the axis to the right end
      .style("stroke-opacity", 0.5)
      .call(
        d3
          .axisRight(yScale) // Use d3.axisRight() for the right y-axis
          .tickValues(d3.range(10, 101, 10))
          .tickSize(0)
          .tickPadding(8)
      )
      .selectAll(".tick text")
      .attr("font-size", "12px")
      .attr("font-family", notoSansJP.style.fontFamily)
      .attr("opacity", "40%");

    // Append dotted line
    svg
      .append("path")
      .attr("d", "M0," + height + "L" + width + ",0") // Define the path starting from bottom left to top right
      .attr("stroke", "#B0B0B0") // Set stroke color
      .attr("stroke-width", "1px") // Set stroke width
      .attr("stroke-dasharray", "20 3");

    svg
      .selectAll(".dot-group")
      .data(subjects)
      .enter()
      .append("g")
      .attr("class", "dot-group")
      .style("transition", "opacity 400ms")
      .style("pointer-events", "bounding-box")
      .style("cursor", "default")
      .each(function (d) {
        d3.select(this).append("circle").attr("class", "dot").attr("cx", xScale(d.previousScore)).attr("cy", yScale(d.currentScore)).attr("r", 6).attr("fill", "#095EAD").attr("fill-opacity", d.importance);
        d3.select(this)
          .append("text")
          .attr("class", "dot-label")
          .attr("fill", "black")
          .attr("font-size", "12px")
          .attr("x", xScale(d.previousScore) + 10)
          .attr("y", yScale(d.currentScore) + 4.2)
          .text(d.subjectName);
      })
      .on("mouseenter", function () {
        // Handle mouse enter event for the group
        svg.selectAll(".dot-group").attr("opacity", 0.2); // Dim all other dot groups
        d3.select(this).attr("opacity", 1); // Highlight the hovered group
      })
      .on("mouseleave", function () {
        // Handle mouse leave event for the group
        svg.selectAll(".dot-group").attr("opacity", "unset"); // Reset opacity of all dot groups
      });
  }, [subjects, width]);

  return (
    <div className="basis-0 grow p-[20px] grid gap-[8px]">
      <div className="font-[700] text-[14px]">成績の分布と重要度</div>
      <div className="font-[500] text-[12px] text-[#1B262C] opacity-50">今回の偏差値</div>
      <div ref={divRef} className="flex h-[280px]">
        <svg className="grow" viewBox={`0 0 ${width + margin.left + margin.right} 280`} fill="none">
          <g ref={svgRef} transform={`translate(${margin.left},${margin.top})`}></g>
        </svg>
      </div>
      <div className="flex justify-between items-start">
        <div className="mt-[6px] flex flex-col relative">
          <div className="flex justify-between">
            {["00", "50", "100"].map((tick) => (
              <div className="flex flex-col gap-[6px] items-center" key={tick}>
                <div className="font-[500] text-[9px] text-[#1B262C]">{tick}</div>
                <div className="border-r border-[black] h-[6px]"></div>
              </div>
            ))}
          </div>
          <div className="w-[190px] h-[12px] flex">
            <svg className="grow" viewBox="0 0 189 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="12" width="12" height="189" rx="4" transform="rotate(-90 0 12)" fill="url(#paint0_linear_21_2650)" />
              <defs>
                <linearGradient id="paint0_linear_21_2650" x1="6" y1="12" x2="6" y2="201" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#0058AA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute right-[-44px] bottom-[0px] font-[500] text-[12px] text-[#000000] opacity-40">重要度</div>
        </div>
        <div className="font-[500] text-[12px] text-[#000000] opacity-40">前回の偏差値</div>
      </div>
    </div>
  );
}
