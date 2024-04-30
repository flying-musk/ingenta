"use client";

import { useEffect, useState } from "react";
import { getTargetSchools, getImprovementPlans, getScoreDistribution } from "../../api/api";
import { TargetSchoolsResponse, ImprovementPlanResponse, ScoreDistributionResponse } from "../../type/type";

export default function Home() {
  const [targetSchools, setTargetSchools] = useState<TargetSchoolsResponse | null>(null);
  const [improvementPlans, setImprovementPlans] = useState<ImprovementPlanResponse | null>(null);
  const [scoreDistribution, setScoreDistribution] = useState<ScoreDistributionResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [targetSchoolsData, improvementPlansData, scoreDistributionData] = await Promise.all([getTargetSchools(), getImprovementPlans(), getScoreDistribution()]);
        setTargetSchools(targetSchoolsData.data);
        setImprovementPlans(improvementPlansData.data);
        setScoreDistribution(scoreDistributionData.data);
        console.log(targetSchoolsData);
        console.log(improvementPlansData);
        console.log(scoreDistributionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[100vh] px-[40px] py-[60px] bg-[#DCDCDC] flex items-start justify-center">
      <div className="grow max-w-[1200px] rounded-[15px] bg-[#ffffff] flex">
        <div className="border border-[blue] grow p-[20px] grid gap-[8px]">
          <div className="font-[700] text-[14px]">志望校リスト</div>
          <div className="py-[5px] px-[16px] flex justify-between">
            <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">志望校</div>
            <div className="font-[700] text-[12px] text-[#1B262C] opacity-50">合格率予測</div>
          </div>
        </div>
        <div className="grow p-[20px]">
          <div className="font-[700] text-[14px]">改善プラン</div>
        </div>
        <div className="grow p-[20px]">
          <div className="font-[700] text-[14px]">成績の分布と重要度</div>
        </div>
      </div>
    </div>
  );
}
