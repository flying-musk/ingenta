import { TargetSchoolsResponse, ImprovementPlanResponse, ScoreDistributionResponse } from "../type/type";

const domain = "https://fe-asgmt.ingenta.io/analysis";

export const getTargetSchools = async (): Promise<{ data: TargetSchoolsResponse }> => {
  const data = await fetch(`${domain}/target_schools`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if (data.error) {
    throw data.error;
  }
  return { data };
};

export const getImprovementPlans = async (): Promise<{ data: ImprovementPlanResponse }> => {
  const data = await fetch(`${domain}/imp_plans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if (data.error) {
    throw data.error;
  }
  return { data };
};

export const getScoreDistribution = async (): Promise<{ data: ScoreDistributionResponse }> => {
  const data = await fetch(`${domain}/score_dist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if (data.error) {
    throw data.error;
  }
  return { data };
};
