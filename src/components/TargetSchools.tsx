"use client";

import { useState } from "react";
import { TargetSchoolsResponse } from "../../type/type";
import { TargetSchoolsRanking } from "./TargetSchoolsRanking";
import { TargetSchoolsProbability } from "./TargetSchoolsProbability";

interface Props {
  targetSchools: TargetSchoolsResponse | null;
}

export function TargetSchools({ targetSchools }: Props) {
  const [schools, setSchools] = useState(
    targetSchools?.items?.map(({ school_id, school_name, ranking, prob }) => ({
      schoolId: school_id,
      schoolName: school_name,
      ranking,
      probability: prob,
    })) || []
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ranking: number) => {
    e.dataTransfer.setData("ranking", ranking.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetRanking: number) => {
    e.preventDefault();
    const droppedRanking = parseInt(e.dataTransfer.getData("ranking"));
    const updatedSchools = schools.map((school) => ({
      ...school,
      ranking: school.ranking === droppedRanking ? targetRanking : droppedRanking < targetRanking && school.ranking > droppedRanking && school.ranking <= targetRanking ? school.ranking - 1 : droppedRanking > targetRanking && school.ranking >= targetRanking && school.ranking < droppedRanking ? school.ranking + 1 : school.ranking,
    }));
    setSchools(updatedSchools.sort((a, b) => a.ranking - b.ranking));
    //should then call api to update the ranking on backend side
  };

  return (
    <div
      className="basis-0 grow p-[20px] grid gap-[8px] max-[1200px]:!bg-none max-[1200px]:border-r-[2px] max-[1200px]:border-r-[#d1d1d1] max-[860px]:border-r-0 max-[860px]:border-b-[2px] max-[860px]:border-b-[#d1d1d1]"
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"> <line x1="100%" y1="0" x2="100%" y2="100%" stroke="black" stroke-opacity="0.1" stroke-width="2" stroke-dasharray="20 6" stroke-linecap="butt"/></svg>')`,
      }}
    >
      <div className="font-[700] text-[14px]">志望校リスト</div>
      <div className="py-[5px] px-[16px] flex justify-between">
        <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">志望校</div>
        <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">合格率予測</div>
      </div>
      {schools.map(({ schoolId, schoolName, ranking, probability }) => (
        <div key={schoolId} className={`${ranking === 1 ? "bg-[#9EC8C0]/[.35]" : ""} rounded-[15px] py-[4px] px-[16px] flex items-center gap-[8px]`} draggable onDragStart={(e) => handleDragStart(e, ranking)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, ranking)}>
          <TargetSchoolsRanking ranking={ranking} />
          <div className="font-[500] text-[14px] text-[#1B262C]">{schoolName}</div>
          <div className="grow"></div>
          <TargetSchoolsProbability schoolId={schoolId} probability={probability} />
        </div>
      ))}
    </div>
  );
}
