'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SIHResource,
  INITIAL_RESOURCES,
  UserRole,
  VerificationStatus,
  WorkspaceItem,
  INITIAL_WORKSPACES,
  PolicyPilot,
  INITIAL_PILOTS,
  AuditLogItem,
  INITIAL_AUDIT_LOGS,
  InnovationItem,
  INITIAL_INNOVATION_ITEMS,
  EvidencePassport
} from '../data/sih-store';

export interface DemoTourStep {
  step: number;
  title: string;
  route: string;
  role: UserRole;
  description: string;
  actionInstruction: string;
}

export const DEMO_TOUR_STEPS: DemoTourStep[] = [
  {
    step: 1,
    title: '1. Role Login & Home Intake',
    route: '/dashboard',
    role: 'policymaker',
    description: 'Logged in as State Land-Policy Officer (Policymaker). View recent workspaces and platform modules.',
    actionInstruction: 'Click "New Discovery" or navigate to Discover to formulate a policy question.'
  },
  {
    step: 2,
    title: '2. Problem Definition (AI Intake)',
    route: '/discover',
    role: 'policymaker',
    description: 'Enter natural language question: "What are the impacts of converting agricultural land for urban development around Indore, and what has worked elsewhere?" AI parses region, topic, and key drivers.',
    actionInstruction: 'Submit question or click the Indore sample to view AI query structuring.'
  },
  {
    step: 3,
    title: '3. Evidence Discovery & Provenance',
    route: '/dashboard/evidence',
    role: 'policymaker',
    description: 'Parallel retrieval across research, datasets, GIS layers, policies, and prior passports with "Why Relevant" rationales.',
    actionInstruction: 'Inspect the evidence cards and their provenance fields (institution, license, verification status).'
  },
  {
    step: 4,
    title: '4. Evidence Validation & Gap Check',
    route: '/dashboard/validation',
    role: 'validator',
    description: 'Switch to Validator view. Review submitted studies against ground GCPs and mark Verified with notes.',
    actionInstruction: 'Review pending draft research and see how provenance prevents ungrounded claims.'
  },
  {
    step: 5,
    title: '5. Grounded Literature Synthesis',
    route: '/dashboard/research',
    role: 'policymaker',
    description: 'Synthesize verified evidence with inline citations to specific passages. Labeled: AI-Generated Summary.',
    actionInstruction: 'Review synthesized findings and identified Tier-2 research gaps.'
  },
  {
    step: 6,
    title: '6. Collaborative Workspace',
    route: '/dashboard/workspaces',
    role: 'policymaker',
    description: 'Cross-functional workspace connecting Policymakers, GIS Specialists, Town Planners, and Validators.',
    actionInstruction: 'View shared evidence sets, task boards, and inter-agency discussion threads.'
  },
  {
    step: 7,
    title: '7. Land GIS Spatial Intelligence',
    route: '/dashboard/land-intelligence/gis',
    role: 'policymaker',
    description: 'Indore showcase map with 6 decision layers: LULC, Built-up expansion, Prime soils, Water stress, Infrastructure.',
    actionInstruction: 'Toggle layers and click spatial features to reveal the linked research and dataset provenance panel.'
  },
  {
    step: 8,
    title: '8. Policy Lab: Scenario Comparison',
    route: '/dashboard/policy-lab/design',
    role: 'policymaker',
    description: 'Compare Scenario A (Current Rules), B (High Conversion Sprawl), and C (Protected Buffer + Infill Incentives).',
    actionInstruction: 'Adjust sliders for conversion rate and buffer share; observe projected land distributions and range bands.'
  },
  {
    step: 9,
    title: '9. Model Output & Sensitivity Analysis',
    route: '/dashboard/policy-lab/design#sensitivity',
    role: 'policymaker',
    description: 'Labeled banner: Model Output — Not a forecast. Sensitivity ranking identifies which assumptions matter most.',
    actionInstruction: 'Inspect the 3-layer labelling and sensitivity ranking table.'
  },
  {
    step: 10,
    title: '10. Review Gate Sign-off',
    route: '/dashboard/policy-lab/design#review-gate',
    role: 'validator',
    description: 'Reviewer verifies scenario assumptions before policy recommendation can be finalized.',
    actionInstruction: 'Click "Validator Sign-off" to formally approve scenario assumptions into the audit trail.'
  },
  {
    step: 11,
    title: '11. Formulate Policy Recommendation',
    route: '/dashboard/policy-lab/design#recommendation',
    role: 'policymaker',
    description: 'Structured recommendation citing verified evidence and scenario outputs, labeled [POLICY INTERPRETATION].',
    actionInstruction: 'Generate recommendation and proceed to commission pilot.'
  },
  {
    step: 12,
    title: '12. Pilot Design & Pre-KPIs',
    route: '/dashboard/pilots',
    role: 'policymaker',
    description: 'Define pilot, baselines, and target KPIs before implementation (resolving audit sequencing flaw).',
    actionInstruction: 'Inspect the active Indore Protected Buffer Pilot and its pre-defined KPI tracking.'
  },
  {
    step: 13,
    title: '13. Outcome Capture & Evaluation',
    route: '/dashboard/evaluation/kpi-dashboard',
    role: 'policymaker',
    description: 'Track real-world measured outcomes against pre-defined baselines across national and district themes.',
    actionInstruction: 'Review indicator trends, climate metrics, and aggregate dispute statistics.'
  },
  {
    step: 14,
    title: '14. Generate Evidence Passport',
    route: '/dashboard/knowledge/passports',
    role: 'policymaker',
    description: 'Institutional memory record capturing problem, method, KPIs, results, limitations, and transferability notes.',
    actionInstruction: 'View the completed Evidence Passport ready for cross-state reuse.'
  },
  {
    step: 15,
    title: '15. Knowledge Graph & Cross-State Reuse',
    route: '/dashboard/graph',
    role: 'policymaker',
    description: 'Knowledge Graph visualizes typed links. A future officer in Rajasthan or Maharashtra reuses this passport!',
    actionInstruction: 'Explore connected nodes (Problem ↔ Evidence ↔ Scenario ↔ Pilot ↔ Passport).'
  }
];

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  region: string;
  setRegion: (region: string) => void;
  resources: SIHResource[];
  setResources: React.Dispatch<React.SetStateAction<SIHResource[]>>;
  verifyResource: (id: string, status: VerificationStatus, notes: string) => void;
  workspaces: WorkspaceItem[];
  pilots: PolicyPilot[];
  innovationItems: InnovationItem[];
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, entityType: string, entityTitle: string, details: string) => void;
  tourStep: number | null;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  jumpToTourStep: (stepNumber: number) => void;
  endTour: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('policymaker');
  const [region, setRegion] = useState<string>('Indore, Madhya Pradesh');
  const [resources, setResources] = useState<SIHResource[]>(INITIAL_RESOURCES);
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(INITIAL_WORKSPACES);
  const [pilots, setPilots] = useState<PolicyPilot[]>(INITIAL_PILOTS);
  const [innovationItems, setInnovationItems] = useState<InnovationItem[]>(INITIAL_INNOVATION_ITEMS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [tourStep, setTourStep] = useState<number | null>(null);

  const addAuditLog = (action: string, entityType: string, entityTitle: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actor: role === 'policymaker' ? 'Dr. Ramesh Kumar (Policymaker)' :
             role === 'validator' ? 'Dr. Anita Roy (Validator)' :
             role === 'researcher' ? 'Dr. Priya Sharma (Researcher)' : 'Admin User',
      role,
      action,
      entityType,
      entityTitle,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const verifyResource = (id: string, status: VerificationStatus, notes: string) => {
    setResources(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            verificationStatus: status,
            reviewerNotes: notes
          };
        }
        return item;
      })
    );
    const target = resources.find(r => r.id === id);
    addAuditLog(
      'RESOURCE_STATUS_UPDATED',
      'SIHResource',
      target?.title || id,
      `Status changed to "${status}". Reviewer note: ${notes}`
    );
  };

  const startTour = () => {
    setTourStep(1);
    setRole(DEMO_TOUR_STEPS[0].role);
  };

  const endTour = () => {
    setTourStep(null);
  };

  const nextTourStep = () => {
    if (tourStep === null) return;
    if (tourStep < DEMO_TOUR_STEPS.length) {
      const next = tourStep + 1;
      setTourStep(next);
      setRole(DEMO_TOUR_STEPS[next - 1].role);
    } else {
      endTour();
    }
  };

  const prevTourStep = () => {
    if (tourStep === null || tourStep <= 1) return;
    const prev = tourStep - 1;
    setTourStep(prev);
    setRole(DEMO_TOUR_STEPS[prev - 1].role);
  };

  const jumpToTourStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= DEMO_TOUR_STEPS.length) {
      setTourStep(stepNumber);
      setRole(DEMO_TOUR_STEPS[stepNumber - 1].role);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        region,
        setRegion,
        resources,
        setResources,
        verifyResource,
        workspaces,
        pilots,
        innovationItems,
        auditLogs,
        addAuditLog,
        tourStep,
        startTour,
        nextTourStep,
        prevTourStep,
        jumpToTourStep,
        endTour
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
