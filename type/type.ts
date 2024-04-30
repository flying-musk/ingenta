interface School {
  school_id: string;
  school_name: string;
  ranking: number;
  prob: number;
}

export interface TargetSchoolsResponse {
  items: School[];
}

interface Subject {
  subject_id: string;
  subject_name: string;
  current_score: number;
  target_score: number;
}

interface ImprovementPlan {
  plan_id: string;
  plan_prob: number;
  items: Subject[];
}

export interface ImprovementPlanResponse {
  cur_prob: number;
  items: ImprovementPlan[];
}

interface ScoreDistribution {
  subject_id: string;
  subject_name: string;
  current_score: number;
  previous_score: number;
  importance: number;
}

export interface ScoreDistributionResponse {
  items: ScoreDistribution[];
}
