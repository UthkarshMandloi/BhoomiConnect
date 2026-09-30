export const GOV_COLORS = {
  // Official government colors
  navy: '#1B3A6B', // Primary (Navy)
  saffron: '#D97706', // Accent (Saffron)
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F3F4F6',
  mediumGray: '#D1D5DB',
  darkGray: '#6B7280',

  // Status colors
  success: '#059669', // Green
  warning: '#F59E0B', // Amber
  error: '#DC2626', // Red
  info: '#2563EB', // Blue

  // Semantic colors for evidence types
  dataset: '#3B82F6', // Blue for datasets
  research: '#8B5CF6', // Purple for research
  policy: '#EC4899', // Pink for policies
  outcome: '#10B981', // Green for outcomes
  experiment: '#F97316', // Orange for experiments
};

export const ROLES = {
  RESEARCHER: 'researcher',
  GOV_OFFICER: 'gov_officer',
  DOMAIN_EXPERT: 'domain_expert',
  PUBLIC: 'public',
  ADMIN: 'admin',
} as const;

export const EXPERIMENT_STATUSES = {
  PROPOSED: 'proposed',
  DESIGNED: 'designed',
  APPROVED: 'approved',
  ACTIVE: 'active',
  MEASURING: 'measuring',
  EVALUATED: 'evaluated',
  COMPLETED: 'completed',
} as const;

export const VALIDATION_STATUSES = {
  VERIFIED: 'verified',
  UNDER_REVIEW: 'under_review',
  UNVERIFIED: 'unverified',
} as const;

export const THEMES = {
  URBANIZATION: 'urbanization',
  WATER: 'water',
  AGRICULTURE: 'agriculture',
  CLIMATE: 'climate',
  ENERGY: 'energy',
  MINING: 'mining',
  OTHER: 'other',
} as const;

export const KPI_DIRECTIONS = {
  HIGHER_IS_BETTER: 'higher_is_better',
  LOWER_IS_BETTER: 'lower_is_better',
} as const;

export const KPI_STATUSES = {
  ON_TRACK: 'on_track',
  AT_RISK: 'at_risk',
  OFF_TRACK: 'off_track',
} as const;

export const TYPOGRAPHY = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['IBM Plex Mono', 'monospace'],
  },
};

export const DEMO_DATA_LABELS = {
  DEMO_BADGE: 'Illustrative Prototype Data',
  AI_ASSISTED: 'AI-assisted analysis (demo)',
  SIMULATED: 'Simulated for demonstration',
  MOCK_DATA: 'Mock data for prototype',
};
