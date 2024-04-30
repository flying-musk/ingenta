"use client";

import { useState } from "react";
import { TargetSchoolsResponse } from "../../type/type";

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
    <div className="border border-[blue] grow p-[20px] grid gap-[8px]">
      <div className="font-[700] text-[14px]">志望校リスト</div>
      <div className="py-[5px] px-[16px] flex justify-between">
        <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">志望校</div>
        <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">合格率予測</div>
      </div>
      {schools.map(({ schoolId, schoolName, ranking, probability }) => (
        <div key={schoolId} className="border py-[4px] px-[16px] flex items-center">
          <div>{ranking}</div>
          <div>{schoolName}</div>
          <div className="grow"></div>
          <div>{probability}</div>
        </div>
      ))}
    </div>
  );
}
