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
        <div key={schoolId} className={`${ranking === 1 ? "bg-[#9EC8C0]/[.35]" : ""} rounded-[15px] py-[4px] px-[16px] flex items-center gap-[8px]`}>
          <TargetSchoolsRanking ranking={ranking} />
          <div className="font-[500] text-[14px] text-[#1B262C]">{schoolName}</div>
          <div className="grow"></div>
          <TargetSchoolsProbability schoolId={schoolId} probability={probability} />
        </div>
      ))}
    </div>
  );
}
