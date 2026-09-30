export interface User {
  id: string;
  email: string;
  role: 'researcher' | 'gov_officer' | 'domain_expert' | 'public' | 'admin';
  institution?: string;
  createdAt: Date;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  theme: 'urbanization' | 'water' | 'agriculture' | 'climate' | 'energy' | 'mining' | 'other';
  geography: string;
  timePeriod: { start: number; end: number };
  landType: string;
  potentialDrivers: string[];
  potentialIndicators: string[];
  createdBy: string;
  createdAt: Date;
  status: 'discovered' | 'published' | 'archived';
  structuredByAI: boolean;
  researchQuestions?: string[];
}

export interface Dataset {
  id: string;
  name: string;
  source: string;
  description: string;
  type: 'vector' | 'raster' | 'tabular' | 'spatial';
  coverage: string[];
  temporalRange: { start: number; end: number };
  spatialResolution: string;
  accessUrl?: string;
  license: string;
  relevantProblems: string[];
  validationStatus: 'verified' | 'under_review' | 'unverified';
  createdAt?: Date;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  objectives: string[];
  geography: string;
  datasets: string[];
  methods: string[];
  findings: string[];
  limitations: string[];
  documentUrl?: string;
  relevantProblems: string[];
  relevantDatasets: string[];
  validationStatus: 'verified' | 'under_review' | 'unverified';
  createdAt?: Date;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  geography: string;
  enactedYear: number;
  documentUrl?: string;
  type: string;
  relatedProblems?: string[];
  relatedExperiments?: string[];
  createdAt?: Date;
}

export interface KPI {
  id: string;
  name: string;
  type: 'percentage' | 'count' | 'ratio' | 'cost' | 'area' | 'time';
  target: number;
  direction: 'higher_is_better' | 'lower_is_better';
  unit?: string;
  description?: string;
}

export interface PolicyExperiment {
  id: string;
  experimentCode: string;
  problemId: string;
  proposedIntervention: string;
  geography: string;
  targetPopulation: string;
  createdBy: string;
  createdAt: Date;
  status: 'proposed' | 'designed' | 'approved' | 'active' | 'measuring' | 'evaluated' | 'completed';
  baseline: Record<string, number>;
  duration: number; // months
  kpis: KPI[];
  linkedEvidence: {
    datasetIds: string[];
    paperIds: string[];
    policyIds: string[];
  };
  notes?: string;
}

export interface KPIObservation {
  id: string;
  experimentId: string;
  kpiId: string;
  observedValue: number;
  timestamp: Date;
  dataSource: string;
  method: string;
  limitations: string[];
  confidence: number; // 0-1
  status: 'on_track' | 'at_risk' | 'off_track';
}

export interface Scenario {
  id: string;
  experimentId: string;
  scenarioName: string;
  description: string;
  assumptions: string[];
  projections: Record<string, number>;
  createdAt?: Date;
}

export interface PolicyPassport {
  id: string;
  experimentId: string;
  policyName: string;
  problem: string;
  location: string;
  evidence: Array<{ source: string; count: number }>;
  intervention: string;
  primaryKpi: string;
  outcome: string;
  whatWorked: string[];
  whatDidntWork: string[];
  limitations: string[];
  replicationConditions: string[];
  requiredDatasets: string[];
  legalRequirements: string[];
  implementationRequirements: string[];
  createdAt: Date;
  searchTags: string[];
}

export interface ResearchGap {
  id: string;
  problemId: string;
  topic: string;
  geography: string;
  timeframe: string;
  reason: string;
  suggestedResearch: string;
  dataAvailability: number; // 0-1
  coveragePercentage: number;
  createdAt: Date;
}

export interface EvidenceItem {
  id: string;
  type: 'dataset' | 'research' | 'policy' | 'case_study' | 'outcome';
  title: string;
  source: string;
  relevance: number; // 0-1
  createdAt?: Date;
}

export interface EvidenceRelationship {
  id: string;
  problemId: string;
  datasetIds: string[];
  paperIds: string[];
  policyIds: string[];
  geographies: string[];
  supportingFactor: number; // 0-1
  notes?: string;
  createdAt?: Date;
}

export interface Institution {
  id: string;
  name: string;
  type: 'government' | 'academic' | 'research' | 'ngo';
  state: string;
  department?: string;
  createdAt?: Date;
}
