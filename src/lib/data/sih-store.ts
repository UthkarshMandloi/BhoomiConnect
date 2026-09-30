// SIH 26019 - Comprehensive Seed Data & Mock Store
// Ministry of Rural Development · Department of Land Resources (DoLR)
// Follows strict 3-layer labelling: [OBSERVED DATA] / [MODEL OUTPUT] / [POLICY INTERPRETATION]

export type VerificationStatus = 'verified' | 'under_review' | 'verified_with_notes' | 'submitted' | 'rejected';
export type ResourceType = 'research' | 'dataset' | 'policy' | 'case_study' | 'gis_layer' | 'passport';
export type UserRole = 'policymaker' | 'researcher' | 'validator' | 'admin' | 'department_officer';

export interface SIHResource {
  id: string;
  type: ResourceType;
  title: string;
  abstract: string;
  source: string;
  publisher: string;
  date: string;
  coveragePeriod: string;
  region: string;
  state: string;
  district?: string;
  license: string;
  visibility: 'public' | 'registered' | 'organization' | 'workspace' | 'restricted';
  verificationStatus: VerificationStatus;
  reviewerNotes?: string;
  knownLimitations: string;
  doiOrUrl?: string;
  methodologySummary?: string;
  whyRelevant?: string;
  dataType?: 'raster' | 'vector' | 'tabular' | 'pdf' | 'spatial';
  spatialResolution?: string;
  dataStatusLabel: 'OBSERVED DATA' | 'MODEL OUTPUT' | 'POLICY INTERPRETATION';
  tags: string[];
  metrics?: Record<string, string | number>;
  linkedResourceIds?: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'problem' | 'research' | 'dataset' | 'policy' | 'gis_layer' | 'scenario' | 'pilot' | 'passport';
  status?: string;
  group: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: 'uses_dataset' | 'studies' | 'informed' | 'evaluated_by' | 'superseded_by' | 'spatially_covers' | 'replicated_in';
}

export interface ScenarioParameters {
  conversionRateHaPerYear: number;
  protectedBufferSharePct: number;
  infillPriorityPct: number;
  populationGrowthPct: number;
  timeHorizonYears: number;
}

export interface PilotKPI {
  id: string;
  name: string;
  definition: string;
  baseline: number;
  target: number;
  measured?: number;
  unit: string;
  direction: 'higher_is_better' | 'lower_is_better';
}

export interface PolicyPilot {
  id: string;
  title: string;
  problemId: string;
  region: string;
  department: string;
  durationMonths: number;
  budgetInLakhs: number;
  status: 'proposed' | 'approved' | 'active' | 'measuring' | 'evaluated' | 'completed';
  intervention: string;
  kpis: PilotKPI[];
  startDate: string;
  endDate: string;
  limitations: string;
  lessonsLearned?: string;
}

export interface EvidencePassport {
  id: string;
  passportCode: string;
  problemId: string;
  problemTitle: string;
  region: string;
  state: string;
  evidenceUsed: Array<{ id: string; title: string; type: string; status: string }>;
  methodSummary: string;
  intervention: string;
  ownerDepartment: string;
  durationMonths: number;
  costInLakhs: number;
  kpis: Array<{ name: string; baseline: number; target: number; achieved: number; unit: string }>;
  resultsSummary: string;
  limitations: string[];
  recommendation: string;
  decisionStatus: 'adopted' | 'modified' | 'not_adopted';
  transferabilityNotes: string;
  publishedAt: string;
  replicatedInRegions: string[];
}

export interface WorkspaceItem {
  id: string;
  name: string;
  problemTitle: string;
  region: string;
  leadMember: string;
  members: Array<{ name: string; role: string; avatar: string; org: string }>;
  evidenceIds: string[];
  tasks: Array<{ id: string; title: string; assignedTo: string; status: 'todo' | 'in_progress' | 'done'; dueDate: string }>;
  discussions: Array<{ id: string; author: string; role: string; time: string; text: string }>;
  status: 'active' | 'review' | 'archived';
}

export interface InnovationItem {
  id: string;
  kind: 'challenge' | 'grant' | 'pilot_call' | 'hackathon';
  title: string;
  ownerOrg: string;
  description: string;
  grantAmount?: string;
  deadline: string;
  status: 'open' | 'under_evaluation' | 'awarded';
  targetAudience: string;
  category: string;
  proposalsCount: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entityType: string;
  entityTitle: string;
  details: string;
}

// -------------------------------------------------------------
// SEED RESOURCES (M1 & M2)
// -------------------------------------------------------------
export const INITIAL_RESOURCES: SIHResource[] = [
  // 1. Research Papers
  {
    id: 'res-paper-01',
    type: 'research',
    title: 'High-Resolution Satellite Assessment of Peri-Urban Agricultural Land Conversion in Indore-Ujjain Corridor (2015–2025)',
    abstract: 'Using multi-temporal Sentinel-2 imagery and Bhuvan data, this paper quantifies a 14.8% loss of prime agricultural black cotton soils (Vertisols) due to speculative urban sprawl and ring road logistics hubs.',
    source: 'Centre for Spatial Governance & IIT Indore',
    publisher: 'Journal of Indian Land Systems',
    date: '2024-03-15',
    coveragePeriod: '2015–2025',
    region: 'Indore District & Urban Fringe',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'CC-BY-4.0',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Methodology verified against Ground Truthing GCPs from MP Land Records Commissioner. Data lineage clear.',
    knownLimitations: 'Monsoon cloud cover between July-September interpolated via synthetic aperture radar (Sentinel-1).',
    doiOrUrl: 'https://doi.org/10.1016/j.ind.landsys.2024.03.012',
    methodologySummary: 'Random Forest LULC classification on 10m Sentinel-2 bands + spatial Markov chain transition matrix.',
    whyRelevant: 'Directly measures the rate and geographic vectors of agricultural conversion specifically in Indore district.',
    dataType: 'pdf',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['agricultural-conversion', 'indore', 'satellite-imagery', 'peri-urban', 'vertisols'],
    metrics: { 'Agri Loss Rate': '14.8%', 'Prime Soil Lost': '12,400 ha', 'Key Driver': 'Ring Road II Corridor' },
    linkedResourceIds: ['res-data-01', 'res-data-03', 'res-gis-01']
  },
  {
    id: 'res-paper-02',
    type: 'research',
    title: 'Socio-Economic Shockwaves: Farmer Livelihood and Debt Dynamics Post Land-Diversion in Malwa Agricultural Fringe',
    abstract: 'Field surveys of 420 agricultural households around Indore municipal boundary revealing that 68% of smallholders who liquidated fertile land faced livelihood exhaustion within 4 years due to lack of transitional skilling.',
    source: 'Institute of Rural Management Anand (IRMA)',
    publisher: 'Development Policy Review India',
    date: '2023-11-20',
    coveragePeriod: '2019–2023',
    region: 'Malwa Agro-Climatic Zone',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Open Access / CC-BY-NC',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Sample distribution statistically representative of marginal (<1 ha) and semi-medium (2-4 ha) farmers.',
    knownLimitations: 'Informal broker compensation premiums could only be self-reported by respondents.',
    doiOrUrl: 'https://doi.org/10.1111/dpr.irma.2023.11',
    methodologySummary: 'Mixed methods: Structured household interviews, cluster sampling across 18 fringe villages, econometric regression.',
    whyRelevant: 'Establishes why unguided land conversion creates acute socio-economic vulnerability beyond spatial loss.',
    dataType: 'pdf',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['farmer-livelihoods', 'compensation', 'malwa', 'social-impact'],
    metrics: { 'Surveyed Households': 420, 'Income Vulnerability': '68%', 'Avg Buffer Depletion': '3.2 years' },
    linkedResourceIds: ['res-data-04', 'res-policy-01']
  },
  {
    id: 'res-paper-03',
    type: 'research',
    title: 'Groundwater Catchment Depletion and Impervious Surface Sprawl in Khan-Saraswati River Basins',
    abstract: 'Hydrological modelling demonstrating that built-up expansion on natural recharge zones around Indore has lowered the water table by 3.4 meters while increasing municipal flash flood frequency by 2.2x.',
    source: 'National Institute of Hydrology (NIH)',
    publisher: 'Water Resources Governance Journal',
    date: '2024-01-10',
    coveragePeriod: '2016–2023',
    region: 'Indore Watershed & Catchment Area',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Government Public Record',
    visibility: 'public',
    verificationStatus: 'verified_with_notes',
    reviewerNotes: 'Verified with note: Piezometer borehole density in southern tehsils is sparse; regional interpolation used.',
    knownLimitations: 'Piezometer coverage outside municipal corporation limits has 4.2 km average inter-station spacing.',
    doiOrUrl: 'https://nih.gov.in/research/khan-basin-recharge-2024',
    methodologySummary: 'SWAT hydrological catchment simulation coupled with high-resolution land-cover imperviousness matrices.',
    whyRelevant: 'Connects land conversion to environmental risk: flood exposure and critical water table decline.',
    dataType: 'pdf',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['groundwater', 'catchment', 'flash-floods', 'hydrology', 'indore'],
    metrics: { 'Water Table Drop': '3.4m', 'Runoff Coefficient': '+42%', 'Recharge Zone Lost': '3,100 ha' },
    linkedResourceIds: ['res-data-02', 'res-gis-04']
  },
  {
    id: 'res-paper-04',
    type: 'research',
    title: 'Comparative Analysis of Agricultural Buffer Zoning: Lessons from Maharashtra and Gujarat Peri-Urban Experiments',
    abstract: 'Evaluates the success of green buffer zoning and Transferable Development Rights (TDR) in Pune and Ahmedabad, highlighting an 18% preservation of double-cropped lands when paired with infill incentives.',
    source: 'School of Planning and Architecture (SPA)',
    publisher: 'Urban Planning and Land Policy',
    date: '2022-09-05',
    coveragePeriod: '2016–2022',
    region: 'Western India Peri-Urban Zones',
    state: 'Maharashtra / Gujarat',
    license: 'CC-BY-4.0',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Rigorous comparative policy evaluation. Directly applicable as prior evidence for Indore Policy Lab.',
    knownLimitations: 'Property tax collection efficiency was higher in Ahmedabad than typical municipal corporations.',
    doiOrUrl: 'https://spa.ac.in/research/buffer-zoning-2022',
    methodologySummary: 'Synthetic control method comparing fringe wards with buffer zoning against unregulated counterpart wards.',
    whyRelevant: 'Provides the empirical baseline for Policy Lab Scenario C (Protected Buffer + Infill Incentives).',
    dataType: 'pdf',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['buffer-zoning', 'policy-experiment', 'pune', 'ahmedabad', 'tdr'],
    metrics: { 'Farmland Preserved': '18.4%', 'Infill Growth': '+24%', 'Administrative Cost': 'Moderate' },
    linkedResourceIds: ['res-passport-01', 'res-policy-02']
  },
  {
    id: 'res-paper-05',
    type: 'research',
    title: 'Machine-Learning Forecasting of Urban Edge Expansion in Tier-2 Indian Growth Corridors (Draft Study)',
    abstract: 'Cellular Automata combined with artificial neural networks (ANN-CA) simulating future built-up footprint around Central Indian tier-2 hubs. Projected land consumption by 2035.',
    source: 'Dept of Geoinformatics, Devi Ahilya Vishwavidyalaya (DAVV)',
    publisher: 'Working Paper Series #44',
    date: '2025-01-14',
    coveragePeriod: '2025–2035 (Modelled)',
    region: 'Central India Tier-2 Urban Centers',
    state: 'Madhya Pradesh',
    license: 'Academic Draft',
    visibility: 'workspace',
    verificationStatus: 'under_review',
    reviewerNotes: 'Under review: Model assumptions regarding industrial corridor highway expansions require validation from MPRDC.',
    knownLimitations: 'Draft paper. Sensitivity analysis on infrastructure road width zoning is not yet finalized.',
    whyRelevant: 'Provides comparative model outputs for Policy Lab scenario boundaries.',
    dataType: 'pdf',
    dataStatusLabel: 'MODEL OUTPUT',
    tags: ['predictive-modelling', 'cellular-automata', 'tier-2-cities', 'under-review'],
    metrics: { 'Simulated Expansion': '34,000 ha', 'Confidence Band': '72%', 'Model Type': 'ANN-CA' },
    linkedResourceIds: ['res-data-01']
  },
  {
    id: 'res-paper-06',
    type: 'research',
    title: 'Crop Diversification and Yield Sensitivity on Fragile Peri-Urban Edge Soils of Indore District',
    abstract: 'Investigation of micro-climate thermal alterations and particulate depositions on soybean-wheat double cropping rotations along major transit corridors.',
    source: 'ICAR-Indian Institute of Soybean Research (IISR), Indore',
    publisher: 'ICAR Research Bulletins',
    date: '2023-08-18',
    coveragePeriod: '2020–2023',
    region: 'Indore Agricultural Belts',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Open Access',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Verified with official ICAR agronomic yield trial datasets.',
    knownLimitations: 'Focused on soybean-wheat cycle; horticulture belts examined as secondary data.',
    whyRelevant: 'Quantifies agricultural productivity loss on lands under conversion pressure.',
    dataType: 'pdf',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['agriculture', 'soil-health', 'soybean-wheat', 'icar', 'indore'],
    metrics: { 'Yield Penalty': '-11.2%', 'Soil Organic Carbon': '-18%', 'Farms Studied': 84 },
    linkedResourceIds: ['res-data-03']
  },

  // 2. Datasets
  {
    id: 'res-data-01',
    type: 'dataset',
    title: 'Indore District Multi-Temporal Land Use Land Cover (LULC) 10m Grid (2015, 2020, 2025)',
    abstract: 'Seamless classified raster dataset identifying 6 land-use classes: Prime Agriculture, Fallow/Scrub, Built-Up Urban, Water Bodies, Forest/Vegetation, and Industrial/Infrastructure.',
    source: 'VEDAS / ISRO-SAC & State Remote Sensing Application Centre',
    publisher: 'National Natural Resources Management System (NNRMS)',
    date: '2025-02-01',
    coveragePeriod: '2015–2025',
    region: 'Indore District (3,898 km²)',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'National Geospatial Policy 2022 Open Tier',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Classification overall accuracy = 91.4%, Kappa coefficient = 0.88. Ground truthed with 520 points.',
    knownLimitations: 'Peri-urban farmhouses with high tree density occasionally misclassified as orchards.',
    doiOrUrl: 'https://vedas.sac.isro.gov.in/indore-lulc-timeseries',
    methodologySummary: 'Cloud-masked Sentinel-2 MSI surface reflectance processed via Google Earth Engine and GDAL offline pipelines.',
    whyRelevant: 'The foundational baseline spatial dataset feeding both the Land GIS Explorer and Policy Lab baseline.',
    dataType: 'raster',
    spatialResolution: '10m',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['lulc', 'remote-sensing', 'isro', 'bhuvan', 'sentinel-2', 'indore'],
    metrics: { 'Agricultural 2015': '268,400 ha', 'Agricultural 2025': '228,600 ha', 'Built-Up Change': '+112%' },
    linkedResourceIds: ['res-paper-01', 'res-gis-01', 'res-gis-02']
  },
  {
    id: 'res-data-02',
    type: 'dataset',
    title: 'Central Ground Water Board (CGWB) Indore District Aquifer Vulnerability & Water Level Observations',
    abstract: 'Biannual pre-monsoon and post-monsoon water table depth data across 48 national observation wells in Indore district, tracking recharge and stress indices.',
    source: 'Central Ground Water Board (CGWB), Ministry of Jal Shakti',
    publisher: 'India-WRIS Water Data Portal',
    date: '2024-10-12',
    coveragePeriod: '2014–2024',
    region: 'Indore Basin & Sub-basins',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Government Open Data License (GODL-India)',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Verified against State Water Resources Department telemetry stations.',
    knownLimitations: '6 observation stations were decommissioned due to highway construction in 2022.',
    whyRelevant: 'Direct evidence used in GIS water stress layer and Policy Lab environmental vulnerability flag.',
    dataType: 'tabular',
    spatialResolution: 'Observation Well Points',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['groundwater', 'cgwb', 'water-table', 'jal-shakti', 'aquifer'],
    metrics: { 'Observation Wells': 48, 'Critical Blocks': 2, 'Average Decline': '0.42 m/yr' },
    linkedResourceIds: ['res-paper-03', 'res-gis-04']
  },
  {
    id: 'res-data-03',
    type: 'dataset',
    title: 'Soil Health Card Geo-Database & Prime Farmland Demarcation — Indore Tehsils',
    abstract: 'Point soil chemistry and fertility rankings categorizing Vertisol soils (Classes I & II prime agricultural land) across Depalpur, Mhow, Sanwer, and Indore urban tehsils.',
    source: 'Dept of Farmer Welfare & Agriculture Development, GoMP',
    publisher: 'Soil Health Management Portal',
    date: '2023-12-01',
    coveragePeriod: '2019–2023',
    region: 'Indore District Tehsils',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Public Data',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Dataset cross-referenced with Bhu-Naksha cadastral boundaries.',
    knownLimitations: 'Sampling grid is 2.5 ha for irrigated and 10 ha for rainfed areas.',
    whyRelevant: 'Distinguishes prime fertile farmland that must be preserved from marginal fallow land in Policy Lab.',
    dataType: 'vector',
    spatialResolution: 'Grid Sampling (Cadastral)',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['soil-health', 'vertisols', 'cadastral', 'agriculture-department'],
    metrics: { 'Samples Analyzed': 14200, 'Prime Soil Share': '64.2%', 'High Fertility': 'Class I/II' },
    linkedResourceIds: ['res-paper-01', 'res-gis-03']
  },

  // 3. Policy Documents
  {
    id: 'res-policy-01',
    type: 'policy',
    title: 'Madhya Pradesh Land Revenue Code (Sec 172) — Rules for Diversion of Agricultural Land for Non-Agricultural Purposes',
    abstract: 'Official statutory framework governing the conversion fee, SDO approval process, compensation guidelines, and statutory penalties for unauthorized commercial diversion in MP.',
    source: 'Department of Revenue & Department of Land Resources, GoMP',
    publisher: 'Madhya Pradesh Government Gazette',
    date: '2020-08-14',
    coveragePeriod: '2020–Present',
    region: 'Statewide Madhya Pradesh',
    state: 'Madhya Pradesh',
    license: 'Government Notification',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Authentic statutory legal text. Forms the regulatory baseline for Scenario A.',
    knownLimitations: 'Does not mandate prior environmental or spatial impact assessment for parcels < 2 hectares.',
    doiOrUrl: 'https://landrecords.mp.gov.in/acts-rules/mplrc-sec172-diversion',
    whyRelevant: 'Defines the legal rules currently in place, including loopholes that allow fragmented parcel conversion.',
    dataType: 'pdf',
    dataStatusLabel: 'POLICY INTERPRETATION',
    tags: ['mplrc', 'land-revenue-code', 'diversion-rules', 'legal-framework', 'statute'],
    metrics: { 'Conversion Fee': '1.5% of guideline', 'Approval Timeline': '90 days statutory', 'Section': '172/173' },
    linkedResourceIds: ['res-paper-02', 'res-policy-02']
  },
  {
    id: 'res-policy-02',
    type: 'policy',
    title: 'Ministry of Rural Development (DoLR) Model Guidelines for Protection of Prime Agricultural Land',
    abstract: 'Central advisory guidelines issued under DILRMP urging states to define no-conversion green agricultural buffers within 5 km of urban municipal corporation edges.',
    source: 'Department of Land Resources (DoLR), Ministry of Rural Development, Govt of India',
    publisher: 'Government of India Publications',
    date: '2022-04-18',
    coveragePeriod: '2022–2027',
    region: 'National Advisory',
    state: 'All States (Union)',
    license: 'Official Union Advisory',
    visibility: 'public',
    verificationStatus: 'verified',
    reviewerNotes: 'Verified Union advisory. Cited directly in SIH 26019 Problem Statement mandate.',
    knownLimitations: 'Advisory in nature; requires state legislative adoption under Seventh Schedule land legislative powers.',
    whyRelevant: 'Provides the national policy justification for Scenario C (Protected Buffer & Smart Infill).',
    dataType: 'pdf',
    dataStatusLabel: 'POLICY INTERPRETATION',
    tags: ['dolr', 'ministry-of-rural-development', 'dilrmp', 'national-guidelines', 'buffer-zone'],
    metrics: { 'Recommended Buffer': '5.0 km', 'Target Retention': '85%', 'Advisory Code': 'DoLR-AGRI-2022' },
    linkedResourceIds: ['res-paper-04', 'res-passport-01']
  },

  // 4. GIS Decision Layers
  {
    id: 'res-gis-01',
    type: 'gis_layer',
    title: 'Indore Land Use / Land Cover (LULC 2026 Baseline & Historical)',
    abstract: 'Interactive spatial raster layer displaying 6 categories of land use across Indore District, calibrated to 2026 current baseline.',
    source: 'Bhuvan / SAC-ISRO + BhoomiConnect Pipeline',
    publisher: 'National Geospatial Ingestion Service',
    date: '2026-01-10',
    coveragePeriod: '2015–2026',
    region: 'Indore District',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Open Geospatial Tier',
    visibility: 'public',
    verificationStatus: 'verified',
    knownLimitations: '10m spatial resolution. Suitable for district and block level planning, not plot-level title dispute.',
    whyRelevant: 'Provides spatial foundation for land conversion tracking.',
    dataType: 'raster',
    spatialResolution: '10m',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['gis-layer', 'lulc', 'indore', 'baseline'],
    linkedResourceIds: ['res-data-01']
  },
  {
    id: 'res-gis-02',
    type: 'gis_layer',
    title: 'Urban Built-Up Expansion Heatmap & Corridor Vectors (2015–2026)',
    abstract: 'Derived spatial difference vector layer highlighting the primary directional expansion corridors along Bypass Road, Super Corridor, and Ring Road II.',
    source: 'Derived Spatial Analysis',
    publisher: 'BhoomiConnect Spatial Engine',
    date: '2026-02-15',
    coveragePeriod: '2015–2026',
    region: 'Indore Peri-Urban Fringe',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Platform Derived',
    visibility: 'public',
    verificationStatus: 'verified',
    knownLimitations: 'Identifies expansion clusters > 1 hectare; smaller isolated structures filtered.',
    whyRelevant: 'Maps where conversion pressure is currently concentrated.',
    dataType: 'vector',
    spatialResolution: 'Vector Polygons',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['built-up-expansion', 'corridors', 'super-corridor', 'gis-layer'],
    linkedResourceIds: ['res-data-01', 'res-paper-01']
  },
  {
    id: 'res-gis-03',
    type: 'gis_layer',
    title: 'Prime Agricultural Land & High Fertility Soil Protection Buffer',
    abstract: 'Spatial overlay of Class I Vertisols and double-cropped agricultural zones demarcating designated agricultural preservation belts.',
    source: 'ICAR / MP Dept of Agriculture',
    publisher: 'BhoomiConnect Geospatial Hub',
    date: '2025-05-10',
    coveragePeriod: 'Current',
    region: 'Indore Agro-Ecological Belt',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Public Geospatial',
    visibility: 'public',
    verificationStatus: 'verified',
    knownLimitations: 'Macro soil mapping; micro-variations within cadastral plots require Soil Health Card point checks.',
    whyRelevant: 'Used in Policy Lab to calculate retained farmland under Scenario C.',
    dataType: 'vector',
    spatialResolution: 'Vector Zones',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['prime-farmland', 'vertisols', 'protection-belt', 'gis-layer'],
    linkedResourceIds: ['res-data-03', 'res-paper-01']
  },
  {
    id: 'res-gis-04',
    type: 'gis_layer',
    title: 'Groundwater Vulnerability & Ecological Catchment Zones',
    abstract: 'Critical recharge basins and seasonal water bodies requiring mandatory buffer offsets from industrial conversion.',
    source: 'Central Ground Water Board (CGWB)',
    publisher: 'BhoomiConnect Hydrological Engine',
    date: '2025-08-20',
    coveragePeriod: '2020–2025',
    region: 'Khan & Kshipra River Basins, Indore',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Public Water Data',
    visibility: 'public',
    verificationStatus: 'verified',
    knownLimitations: 'Recharge rates modeled under average historical monsoon rainfall.',
    whyRelevant: 'Feeds climate risk indicator in Policy Lab.',
    dataType: 'vector',
    spatialResolution: 'Watershed Boundaries',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['groundwater-recharge', 'water-vulnerability', 'catchment', 'gis-layer'],
    linkedResourceIds: ['res-data-02', 'res-paper-03']
  },
  {
    id: 'res-gis-05',
    type: 'gis_layer',
    title: 'Proposed Smart Infill & Multi-Modal Transit Infrastructure Buffers',
    abstract: 'Infrastructure development zones including Metro Phase 1, Ring Road logistics corridors, and municipal vacant brownfield sites.',
    source: 'Indore Development Authority (IDA)',
    publisher: 'BhoomiConnect Spatial Registry',
    date: '2025-11-30',
    coveragePeriod: 'Master Plan 2035',
    region: 'Indore Metropolitan Region',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Public Planning Document',
    visibility: 'public',
    verificationStatus: 'verified',
    knownLimitations: 'Alignments subject to final statutory gazette notification.',
    whyRelevant: 'Defines target areas for infill priority in Policy Lab Scenario C.',
    dataType: 'vector',
    spatialResolution: 'Corridor Vectors',
    dataStatusLabel: 'MODEL OUTPUT',
    tags: ['infrastructure', 'infill', 'ida', 'master-plan-2035', 'gis-layer'],
    linkedResourceIds: ['res-paper-05']
  },
  {
    id: 'res-gis-06',
    type: 'gis_layer',
    title: 'Aggregate District Dispute & Land Litigation Density (Mock Aggregate)',
    abstract: 'District and block-level aggregate count of pending land conversion disputes, title petitions, and compensation appeals.',
    source: 'State Revenue Court Management System (RCMS)',
    publisher: 'BhoomiConnect Legal Analytics (Prototype / Mock Data)',
    date: '2026-01-05',
    coveragePeriod: '2023–2025',
    region: 'Indore District Blocks',
    state: 'Madhya Pradesh',
    district: 'Indore',
    license: 'Mock Aggregate Prototype',
    visibility: 'registered',
    verificationStatus: 'verified_with_notes',
    reviewerNotes: 'PROTOTYPE MOCK DATA: Aggregated strictly to block level. No individual survey numbers or citizen identity data included per PS Section 15 privacy guidelines.',
    knownLimitations: 'District aggregate prototype data. Illustrates governance strain without exposing sensitive personal land records.',
    whyRelevant: 'Visualizes where administrative and legal friction is highest during land diversion.',
    dataType: 'tabular',
    spatialResolution: 'Block Aggregate',
    dataStatusLabel: 'OBSERVED DATA',
    tags: ['land-disputes', 'rcms', 'aggregate-only', 'privacy-compliant', 'mock-data'],
    metrics: { 'Sanwer Block': '412 cases', 'Depalpur Block': '289 cases', 'Mhow Block': '345 cases' },
    linkedResourceIds: ['res-policy-01']
  },

  // 5. Prior Evidence Passport (Reuse Loop)
  {
    id: 'res-passport-01',
    type: 'passport',
    title: 'Evidence Passport: Peri-Urban Agricultural Buffer & Infill Incentive Scheme — Pune Fringe (2020–2023)',
    abstract: 'Institutional knowledge record capturing a 3-year pilot in Pune urban fringe that prevented 18.4% of prime farmland loss through transferable development rights (TDR) and strict buffer zoning.',
    source: 'Maharashtra Urban Development Department & YASHADA Pune',
    publisher: 'BhoomiConnect National Knowledge Vault',
    date: '2024-04-10',
    coveragePeriod: '2020–2023',
    region: 'Pune Metropolitan Fringe',
    state: 'Maharashtra',
    district: 'Pune',
    license: 'Institutional Memory Tier (Public)',
    verificationStatus: 'verified',
    reviewerNotes: 'Formally completed pilot with verified KPI achievements. Full evidence trail and methodology audited.',
    knownLimitations: 'Transferability requires functioning municipal TDR exchange platform and clear boundary demarcation.',
    doiOrUrl: 'https://bhoomiconnect.gov.in/passports/EP-2024-MH-003',
    methodologySummary: 'Dual-zone spatial mandate: 4 km green belt where conversion fee is 5x, combined with 50% fee discount for infill brownfield sites.',
    whyRelevant: 'The primary precedent passport that can be replicated and adapted for Indore in our demo scenario.',
    dataType: 'pdf',
    dataStatusLabel: 'POLICY INTERPRETATION',
    tags: ['evidence-passport', 'pune', 'tdr', 'infill', 'institutional-memory', 'replication'],
    metrics: { 'Farmland Retained': '18.4%', 'Infill Absorption': '4,200 units', 'Budget': '₹340 Lakhs', 'Decision': 'Adopted into Master Plan' },
    linkedResourceIds: ['res-paper-04', 'res-policy-02']
  }
];

// -------------------------------------------------------------
// KNOWLEDGE GRAPH EDGES (M1)
// -------------------------------------------------------------
export const INITIAL_GRAPH_NODES: GraphNode[] = [
  { id: 'prob-01', label: 'Indore Peri-Urban Agri Land Conversion', type: 'problem', group: 'Problem' },
  { id: 'res-paper-01', label: 'Satellite Assessment of Indore Sprawl', type: 'research', status: 'verified', group: 'Research' },
  { id: 'res-paper-02', label: 'Farmer Livelihood Shockwaves', type: 'research', status: 'verified', group: 'Research' },
  { id: 'res-paper-03', label: 'Groundwater Catchment Depletion', type: 'research', status: 'verified_with_notes', group: 'Research' },
  { id: 'res-paper-04', label: 'Buffer Zoning: Pune vs Ahmedabad', type: 'research', status: 'verified', group: 'Research' },
  { id: 'res-paper-05', label: 'AI Forecasting Tier-2 Expansion', type: 'research', status: 'under_review', group: 'Research' },
  { id: 'res-data-01', label: 'Indore LULC 10m Multi-Temporal', type: 'dataset', status: 'verified', group: 'Data' },
  { id: 'res-data-02', label: 'CGWB Groundwater Observation Wells', type: 'dataset', status: 'verified', group: 'Data' },
  { id: 'res-data-03', label: 'Soil Health Card Vertisol Database', type: 'dataset', status: 'verified', group: 'Data' },
  { id: 'res-policy-01', label: 'MP Land Revenue Code Sec 172', type: 'policy', status: 'verified', group: 'Policy' },
  { id: 'res-policy-02', label: 'DoLR Model Agri Protection Advisory', type: 'policy', status: 'verified', group: 'Policy' },
  { id: 'res-gis-01', label: 'GIS Land Cover 2026 Layer', type: 'gis_layer', status: 'verified', group: 'GIS' },
  { id: 'res-gis-03', label: 'GIS Prime Soil Protection Zone', type: 'gis_layer', status: 'verified', group: 'GIS' },
  { id: 'scen-01', label: 'Scenario A: Status Quo Baseline', type: 'scenario', group: 'Scenario' },
  { id: 'scen-02', label: 'Scenario B: Accelerated Urban Expansion', type: 'scenario', group: 'Scenario' },
  { id: 'scen-03', label: 'Scenario C: Protected Buffer + Infill', type: 'scenario', group: 'Scenario' },
  { id: 'pilot-01', label: 'Pilot: Indore Protected Green Belt', type: 'pilot', status: 'active', group: 'Pilot' },
  { id: 'res-passport-01', label: 'Evidence Passport: Pune Buffer Scheme', type: 'passport', status: 'verified', group: 'Passport' }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'prob-01', target: 'res-paper-01', relation: 'studies' },
  { id: 'e2', source: 'prob-01', target: 'res-paper-02', relation: 'studies' },
  { id: 'e3', source: 'prob-01', target: 'res-data-01', relation: 'uses_dataset' },
  { id: 'e4', source: 'res-paper-01', target: 'res-data-01', relation: 'uses_dataset' },
  { id: 'e5', source: 'res-paper-01', target: 'res-gis-01', relation: 'spatially_covers' },
  { id: 'e6', source: 'res-paper-03', target: 'res-data-02', relation: 'uses_dataset' },
  { id: 'e7', source: 'res-paper-02', target: 'res-policy-01', relation: 'informed' },
  { id: 'e8', source: 'res-paper-04', target: 'res-passport-01', relation: 'evaluated_by' },
  { id: 'e9', source: 'prob-01', target: 'scen-01', relation: 'informed' },
  { id: 'e10', source: 'res-data-01', target: 'scen-01', relation: 'uses_dataset' },
  { id: 'e11', source: 'res-data-03', target: 'scen-03', relation: 'uses_dataset' },
  { id: 'e12', source: 'res-passport-01', target: 'scen-03', relation: 'informed' },
  { id: 'e13', source: 'scen-03', target: 'pilot-01', relation: 'informed' },
  { id: 'e14', source: 'res-policy-02', target: 'pilot-01', relation: 'informed' },
  { id: 'e15', source: 'res-passport-01', target: 'pilot-01', relation: 'replicated_in' }
];

// -------------------------------------------------------------
// PILOT PLANS & PRE-DEFINED KPIS (M5)
// -------------------------------------------------------------
export const INITIAL_PILOTS: PolicyPilot[] = [
  {
    id: 'pilot-01',
    title: 'Indore Peri-Urban Protected Agricultural Buffer & Infill Incentive Pilot',
    problemId: 'prob-01',
    region: 'Indore Fringe (Sanwer & Depalpur Tehsils)',
    department: 'Department of Land Resources (DoLR) & MP Revenue Dept',
    durationMonths: 24,
    budgetInLakhs: 280,
    status: 'active',
    startDate: '2025-06-01',
    endDate: '2027-05-31',
    intervention: 'Implementation of a 3.5 km protected agricultural buffer around Sanwer highway corridor combined with a 40% reduction in municipal land development charges for infill vacant parcels inside Indore Municipal Corporation.',
    limitations: 'Applies to Sanwer & Depalpur pilot blocks. Does not yet cover Mhow army cantonment perimeter.',
    lessonsLearned: 'Early farmer engagement workshops reduced speculative broker purchases by 32% within first 6 months.',
    kpis: [
      {
        id: 'kpi-01',
        name: 'Prime Agricultural Land Retained',
        definition: 'Hectares of Class I Vertisol farmland remaining in cultivation within the designated 3.5 km buffer zone.',
        baseline: 18200,
        target: 17400,
        measured: 17850,
        unit: 'ha',
        direction: 'higher_is_better'
      },
      {
        id: 'kpi-02',
        name: 'Urban Infill Brownfield Development Rate',
        definition: 'Share of new residential/commercial approvals directed to vacant interior parcels rather than agricultural fringe.',
        baseline: 18.5,
        target: 45.0,
        measured: 38.2,
        unit: '%',
        direction: 'higher_is_better'
      },
      {
        id: 'kpi-03',
        name: 'Informal / Speculative Land Diversions',
        definition: 'Unsanctioned agricultural conversion cases registered by Revenue Tehsildar squad per quarter.',
        baseline: 84,
        target: 15,
        measured: 22,
        unit: 'cases/qtr',
        direction: 'lower_is_better'
      },
      {
        id: 'kpi-04',
        name: 'Farmer Household Income Stability Index',
        definition: 'Composite index of crop earnings and value-added agri-logistics participation for fringe farmers.',
        baseline: 54.0,
        target: 75.0,
        measured: 68.4,
        unit: 'index (0-100)',
        direction: 'higher_is_better'
      }
    ]
  }
];

// -------------------------------------------------------------
// WORKSPACES & COLLABORATION (M6)
// -------------------------------------------------------------
export const INITIAL_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'ws-01',
    name: 'Indore Peri-Urban Land Protection Taskforce',
    problemTitle: 'Impacts of Converting Agricultural Land for Urban Sprawl around Indore (SIH 26019)',
    region: 'Indore District, Madhya Pradesh',
    leadMember: 'Dr. Ramesh Kumar (DoLR State Policy Advisor)',
    members: [
      { name: 'Dr. Ramesh Kumar', role: 'Policymaker / DoLR Lead', avatar: 'RK', org: 'Dept of Land Resources' },
      { name: 'Dr. Priya Sharma', role: 'GIS & Satellite Specialist', avatar: 'PS', org: 'IIT Indore / SAC' },
      { name: 'Er. Rajesh Verma', role: 'Chief Town Planner', avatar: 'RV', org: 'Indore Development Authority' },
      { name: 'Dr. Anita Roy', role: 'Lead Evidence Validator', avatar: 'AR', org: 'National Institute of Rural Dev' }
    ],
    evidenceIds: ['res-paper-01', 'res-paper-02', 'res-data-01', 'res-data-03', 'res-policy-01', 'res-passport-01'],
    tasks: [
      { id: 't1', title: 'Verify Sentinel-2 2025 built-up raster accuracy against ground GCP points', assignedTo: 'Dr. Priya Sharma', status: 'done', dueDate: '2026-02-20' },
      { id: 't2', title: 'Calibrate Policy Lab conversion rate parameters with IDA 2035 Master Plan', assignedTo: 'Er. Rajesh Verma', status: 'done', dueDate: '2026-03-05' },
      { id: 't3', title: 'Validator sign-off on Policy Lab Scenario C environmental assumptions', assignedTo: 'Dr. Anita Roy', status: 'in_progress', dueDate: '2026-03-28' },
      { id: 't4', title: 'Draft final Evidence Passport for Sanwer-Depalpur pilot zone', assignedTo: 'Dr. Ramesh Kumar', status: 'todo', dueDate: '2026-04-15' }
    ],
    discussions: [
      {
        id: 'c1',
        author: 'Dr. Ramesh Kumar',
        role: 'Policymaker',
        time: '2 hours ago',
        text: 'The LULC difference between 2020 and 2025 confirms that the new Ring Road II has tripled speculative acquisition of prime Vertisols. We must set our Policy Lab buffer share to at least 35% in Scenario C.'
      },
      {
        id: 'c2',
        author: 'Dr. Anita Roy',
        role: 'Validator',
        time: '1 hour ago',
        text: 'I have reviewed the dataset provenance for the CGWB observation wells (res-data-02). Status upgraded to Verified with Notes. Piezometer density is adequate for the 3.5 km pilot zone.'
      },
      {
        id: 'c3',
        author: 'Er. Rajesh Verma',
        role: 'Chief Town Planner',
        time: '25 mins ago',
        text: 'IDA board has tentatively agreed to match the 40% infill development fee waiver proposed in Scenario C. This will channel approximately 3,200 residential units back into brownfield corridors.'
      }
    ],
    status: 'active'
  },
  {
    id: 'ws-02',
    name: 'National Land Digitization & Bhu-Naksha Research Working Group',
    problemTitle: 'Harmonization of High-Resolution Orthophotos with Textual RoR Records',
    region: 'Multi-State (MP, Maharashtra, Karnataka)',
    leadMember: 'Dr. Suresh Patel',
    members: [
      { name: 'Dr. Suresh Patel', role: 'Cadastral GIS Lead', avatar: 'SP', org: 'Survey of India' },
      { name: 'Sunil Menon', role: 'DILRMP Technical Advisor', avatar: 'SM', org: 'NIC Land Resources' }
    ],
    evidenceIds: ['res-data-01', 'res-policy-02'],
    tasks: [
      { id: 't201', title: 'Review drone imagery resolution standards under SVAMITVA', assignedTo: 'Dr. Suresh Patel', status: 'done', dueDate: '2026-01-15' },
      { id: 't202', title: 'Formulate cadastral edge-matching API contract', assignedTo: 'Sunil Menon', status: 'in_progress', dueDate: '2026-04-01' }
    ],
    discussions: [
      { id: 'c201', author: 'Sunil Menon', role: 'DILRMP Advisor', time: '1 day ago', text: 'Standardized metadata schema is ready for deployment across state nodes.' }
    ],
    status: 'active'
  }
];

// -------------------------------------------------------------
// INNOVATION PORTAL (M6)
// -------------------------------------------------------------
export const INITIAL_INNOVATION_ITEMS: InnovationItem[] = [
  {
    id: 'inv-01',
    kind: 'challenge',
    title: 'SIH 2026 Grand Challenge: AI Edge Detection of Unauthorized Farmland Diversions',
    ownerOrg: 'Ministry of Rural Development / DoLR',
    description: 'Develop lightweight computer vision models operating on Bhuvan & Sentinel-2 imagery to flag early-stage unauthorized construction and boundary wall plotting on agricultural land within 72 hours of occurrence.',
    grantAmount: '₹25,00,000 + Pilot Deployment Grant',
    deadline: '2026-05-30',
    status: 'open',
    targetAudience: 'University Teams, Geospatial Startups, Research Institutes',
    category: 'Computer Vision & Satellite AI',
    proposalsCount: 28
  },
  {
    id: 'inv-02',
    kind: 'grant',
    title: 'Research Grant: Economic Impact Evaluation of Agricultural Land Conversion Protections',
    ownerOrg: 'Indian Council of Social Science Research (ICSSR) & DoLR',
    description: 'Rigorous empirical evaluations quantifying the long-term fiscal, environmental, and food security impacts of state agricultural land protection statutes across 5 agro-climatic zones.',
    grantAmount: '₹18,00,000 per project (4 Grants)',
    deadline: '2026-06-15',
    status: 'open',
    targetAudience: 'Academic Economists, Land Governance Scholars, Policy Labs',
    category: 'Applied Policy Evaluation',
    proposalsCount: 14
  },
  {
    id: 'inv-03',
    kind: 'pilot_call',
    title: 'Call for Municipal Pilot Partners: Smart Infill & Transferable Development Rights (TDR)',
    ownerOrg: 'Department of Land Resources & Town and Country Planning (TCPO)',
    description: 'Inviting tier-1 and tier-2 municipal corporations with expanding urban fringes to co-fund and execute a 24-month evidence-based peri-urban buffer zoning pilot using BhoomiConnect.',
    grantAmount: 'Technical Assistance + 50% Co-funding',
    deadline: '2026-07-01',
    status: 'open',
    targetAudience: 'Municipal Commissioners, Urban Development Authorities',
    category: 'Pilot Implementation',
    proposalsCount: 9
  },
  {
    id: 'inv-04',
    kind: 'hackathon',
    title: 'Geospatial Hackathon 2026: Open Source Decision Support for Land Conflict Resolution',
    ownerOrg: 'Department of Land Resources & ISRO-SAC',
    description: 'Building visual decision support and dispute-triage tools using aggregate spatial indicators to help district magistrates prioritize land title reconciliation.',
    grantAmount: '₹10,00,000 Prize Pool',
    deadline: '2026-08-10',
    status: 'open',
    targetAudience: 'Developers, GIS Analysts, Civic Tech Groups',
    category: 'Civic Tech & Open Data',
    proposalsCount: 42
  }
];

// -------------------------------------------------------------
// AUDIT LOG (PLATFORM GOVERNANCE & ADMIN)
// -------------------------------------------------------------
export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-01',
    timestamp: '2026-03-30 09:15:22 IST',
    actor: 'Dr. Ramesh Kumar',
    role: 'policymaker',
    action: 'PROBLEM_CREATED',
    entityType: 'LandProblem',
    entityTitle: 'Indore Agricultural Land Conversion & Fringe Vulnerability',
    details: 'Created structured problem definition with region=Indore District, theme=Urbanization & Land Loss.'
  },
  {
    id: 'aud-02',
    timestamp: '2026-03-30 09:42:10 IST',
    actor: 'Dr. Anita Roy',
    role: 'validator',
    action: 'RESOURCE_VERIFIED',
    entityType: 'SIHResource',
    entityTitle: 'Satellite Assessment of Peri-Urban Conversion (res-paper-01)',
    details: 'Status upgraded from Submitted to Verified. Validated methodology and ground GCP calibration accuracy (91.4%).'
  },
  {
    id: 'aud-03',
    timestamp: '2026-03-30 10:18:45 IST',
    actor: 'Dr. Ramesh Kumar',
    role: 'policymaker',
    action: 'POLICY_LAB_SCENARIO_RUN',
    entityType: 'ScenarioSet',
    entityTitle: 'Indore Agri-to-Urban Conversion Simulation (Scenarios A, B, C)',
    details: 'Simulated 3 scenario alternatives over 15-year horizon. Parameter set: buffer=35%, infill=45%, conversion=1,200 ha/yr.'
  },
  {
    id: 'aud-04',
    timestamp: '2026-03-30 11:05:12 IST',
    actor: 'Dr. Anita Roy',
    role: 'validator',
    action: 'REVIEW_GATE_SIGN_OFF',
    entityType: 'ReviewGate',
    entityTitle: 'Indore Policy Lab Scenario C Assumptions',
    details: 'Validator sign-off on environmental and transit absorption assumptions for Scenario C with formal caveat notes.'
  },
  {
    id: 'aud-05',
    timestamp: '2026-03-30 11:35:40 IST',
    actor: 'Dr. Ramesh Kumar',
    role: 'policymaker',
    action: 'PILOT_COMMISSIONED',
    entityType: 'PolicyPilot',
    entityTitle: 'Indore Protected Agricultural Buffer & Infill Incentive Pilot',
    details: 'Approved pilot plan with 4 pre-defined baseline KPIs, budget ₹280 Lakhs, duration 24 months.'
  }
];
