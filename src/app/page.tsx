import { getTargetSchools, getImprovementPlans, getScoreDistribution } from "../../api/api";
import { TargetSchools } from "../component/TargetSchools";

export default async function Home() {
  try {
    const [{ data: targetSchoolsData }, { data: improvementPlansData }, { data: scoreDistributionData }] = await Promise.all([getTargetSchools(), getImprovementPlans(), getScoreDistribution()]);

    return (
      <div className="min-h-[100vh] px-[40px] py-[60px] bg-[#DCDCDC] flex items-start justify-center">
        <div className="grow max-w-[1200px] rounded-[15px] bg-[#ffffff] flex">
          <TargetSchools targetSchools={targetSchoolsData} />
          <div className="grow p-[20px]">
            <div className="font-[700] text-[14px]">改善プラン</div>
          </div>
          <div className="grow p-[20px]">
            <div className="font-[700] text-[14px]">成績の分布と重要度</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
