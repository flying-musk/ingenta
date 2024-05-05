import { getTargetSchools, getImprovementPlans, getScoreDistribution } from "../../api/api";
import { TargetSchools } from "../components/TargetSchools";
import { ImprovementPlans } from "../components/ImprovementPlans";
import { ScoreDistribution } from "@/components/ScoreDistribution";

export default async function Home() {
  try {
    const [{ data: targetSchoolsData }, { data: improvementPlansData }, { data: scoreDistributionData }] = await Promise.all([getTargetSchools(), getImprovementPlans(), getScoreDistribution()]);

    return (
      <div className="min-h-[100vh] px-[40px] py-[60px] bg-[#DCDCDC] flex items-start justify-center max-[860px]:px-[20px]">
        <div className="grow max-w-[1200px] rounded-[15px] bg-[#ffffff] flex items-start max-[1200px]:grid max-[1200px]:grid-cols-[4fr_5fr] max-[860px]:grid-cols-[1fr]">
          <TargetSchools targetSchools={targetSchoolsData} />
          <ImprovementPlans improvementPlans={improvementPlansData} />
          <ScoreDistribution scoreDistribution={scoreDistributionData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
