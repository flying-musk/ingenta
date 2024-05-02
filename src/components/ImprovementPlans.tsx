"use client";

import { useState } from "react";
import { ImprovementPlanResponse } from "../../type/type";
import { ImprovementPlansDonut } from "./ImprovementPlansDonut";
import { ImprovementPlansProgress } from "./ImprovementPlansProgress";

interface Props {
  improvementPlans: ImprovementPlanResponse | null;
}

export function ImprovementPlans({ improvementPlans }: Props) {
  const [currentProbability, setCurrentProbability] = useState(improvementPlans?.cur_prob || 0);
  const [planProbability, setPlanProbability] = useState(improvementPlans?.items[0].plan_prob || 0);
  const [plan, setPlan] = useState(improvementPlans?.items[0].plan_id || "");
  const [subjects, setSubjects] = useState(
    improvementPlans?.items[0].items.map(({ current_score, subject_id, subject_name, target_score }) => {
      return {
        subjectId: subject_id,
        subjectName: subject_name,
        currentScore: current_score,
        targetScore: target_score,
      };
    }) || []
  );

  return (
    <div className="basis-0 grow p-[20px] grid gap-[8px]">
      <div className="font-[700] text-[14px]">改善プラン</div>
      <div className="p-[5px] rounded-[8px] bg-gradient-to-tl from-[#379696] to-[#9EC8C0] backdrop-blur-[2.5px] font-[700] text-[13px] text-[#ffffff] flex justify-center">現在選択したプラン：{plan}</div>
      <div className="p-[4px] flex justify-center">
        <div className="w-[160px] h-[160px] relative flex">
          <ImprovementPlansDonut currentProbability={currentProbability} planProbability={planProbability} />
          <div className="right-[26px] top-[50%] translate-y-[-50%] absolute font-[500] text-[16px] text-[#000000]">%</div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-[5px] items-center">
            <div className="font-[900] text-[20px] text-[#7c7da0]">{planProbability * 100}</div>
            <div className="w-[7px] h-[32px]">
              <svg className="grow" xmlns="http://www.w3.org/2000/svg" width="8" height="33" viewBox="0 0 8 33" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.80047 5.43465L4.91664 0.439707C4.6603 -0.00428767 4.01945 -0.00428768 3.76311 0.439707L0.879282 5.43465C0.622942 5.87864 0.943368 6.43363 1.45605 6.43363L3.34089 6.43363L3.34089 31.4083C3.34089 31.9601 3.78815 32.4073 4.33988 32.4073C4.8916 32.4073 5.33887 31.9601 5.33887 31.4083L5.33887 6.43363L7.22371 6.43363C7.73639 6.43363 8.05681 5.87864 7.80047 5.43465Z" fill="url(#paint0_linear_21_1649)" />
                <defs>
                  <linearGradient id="paint0_linear_21_1649" x1="4.33988" y1="32.4073" x2="4.33988" y2="0.106712" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9EC8C0" />
                    <stop offset="1" stopColor="#6C678E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="font-[900] text-[20px] text-[#9EC8C0]">{currentProbability * 100}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[20px]">
        <div className="flex gap-[8px] items-center">
          <div className="w-[30px] h-[12px] rounded-[200px] bg-[#9EC8C0]"></div>
          <div className="font-[500] text-[12px] text-[#000000]">現在</div>
        </div>
        <div className="flex gap-[8px] items-center">
          <div className="w-[30px] h-[12px] rounded-[200px] bg-gradient-to-tl from-[#5B507A] to-[#9EADC8]"></div>
          <div className="font-[500] text-[12px] text-[#000000]">要改善</div>
        </div>
      </div>
      <div className="grid gap-[5px]">
        <div className="py-[5px] px-[12px] flex justify-between">
          <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">科目</div>
          <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">成績 / 偏差値</div>
        </div>
        {subjects.map(({ subjectId, subjectName, currentScore, targetScore }) => (
          <div key={subjectId} className="p-[10px] flex gap-[10px] items-center">
            <div className="basis-[0] grow font-[500] text-[14px] text-[#000000]">{subjectName}</div>
            <div className="w-[130px] h-[12px] flex">
              <ImprovementPlansProgress currentScore={currentScore} targetScore={targetScore} />
            </div>
            <div className="font-[500] text-[12px] text-[#1B262C]">
              {currentScore}→{targetScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
