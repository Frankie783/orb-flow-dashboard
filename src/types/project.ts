export interface Project {
  id: string;
  title: string;
  effort: number; // 0-10
  benefit: number; // 0-10
  discoveryAndScope: string;
  complexityFactors: string;
  blockers: string;
  needsAndDependencies: string;
  nextSteps: string;
  researchFocus: string;
  images?: string[];
  attachments?: Array<{
    name: string;
    url: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFormData {
  title: string;
  effort: number;
  benefit: number;
  discoveryAndScope: string;
  complexityFactors: string;
  blockers: string;
  needsAndDependencies: string;
  nextSteps: string;
  researchFocus: string;
  images?: string[];
  attachments?: Array<{
    name: string;
    url: string;
  }>;
}