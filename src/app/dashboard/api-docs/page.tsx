'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Code2,
  Copy,
  ExternalLink,
  CheckCircle2,
  Lock,
  Layers,
  Search,
  Database,
  ArrowRight
} from 'lucide-react';

interface ApiEndpoint {
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  authRequired: boolean;
  description: string;
  sampleRequest?: string;
  sampleResponse: string;
}

export default function ApiDocsPage() {
  const [selectedEndpointIdx, setSelectedEndpointIdx] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const endpoints: ApiEndpoint[] = [
    {
      method: 'GET',
      path: '/api/v1/search',
      summary: 'Cross-Source Semantic & Keyword Evidence Retrieval',
      authRequired: false,
      description: 'Executes parallel hybrid search across peer-reviewed papers, spatial datasets, statutory policies, and prior evidence passports with "Why Relevant" generation.',
      sampleResponse: JSON.stringify({
        query: 'Indore agricultural conversion',
        results_count: 14,
        records: [
          {
            id: 'res-paper-01',
            type: 'research',
            title: 'Satellite Assessment of Peri-Urban Conversion (2015-2025)',
            verification_status: 'verified',
            why_relevant: 'Quantifies 14.8% prime farmland loss in Indore corridor.',
            provenance: {
              publisher: 'Journal of Indian Land Systems',
              license: 'CC-BY-4.0',
              coverage: 'Indore District'
            }
          }
        ]
      }, null, 2)
    },
    {
      method: 'GET',
      path: '/api/v1/records/{id}',
      summary: 'Retrieve Full Provenance & Lineage of a Resource',
      authRequired: false,
      description: 'Returns complete audited metadata for an entity including declared methodology, known limitations, DOI, reviewer audit trail, and connected graph relations.',
      sampleResponse: JSON.stringify({
        id: 'res-data-01',
        title: 'Indore District Multi-Temporal LULC 10m Grid',
        verification_status: 'verified',
        reviewer_notes: 'Classification overall accuracy = 91.4%, Kappa = 0.88. Ground truthed with 520 points.',
        data_status_label: 'OBSERVED DATA',
        spatial_resolution: '10m',
        linked_edges: ['res-paper-01', 'res-gis-01']
      }, null, 2)
    },
    {
      method: 'POST',
      path: '/api/v1/scenarios/simulate',
      summary: 'Execute Policy Lab Scenario Simulation',
      authRequired: true,
      description: 'Runs rule-based land-use transition model over user-specified parameter vectors (conversion rate, protected buffer share, infill priority, time horizon).',
      sampleRequest: JSON.stringify({
        region: 'Indore, Madhya Pradesh',
        baseline_agri_ha: 228600,
        annual_conversion_rate_ha: 1400,
        protected_buffer_share_pct: 35,
        infill_priority_pct: 45,
        time_horizon_years: 15
      }, null, 2),
      sampleResponse: JSON.stringify({
        scenario_label: 'SCENARIO C (SMART GROWTH)',
        data_status_label: 'MODEL OUTPUT — NOT A FORECAST',
        projected_farmland_retained_ha: 213800,
        retained_pct: 93.5,
        farmland_preserved_vs_baseline_ha: 14800,
        climate_risk_index: 34,
        infrastructure_load_index: 38,
        uncertainty_range: {
          low_bound_ha: 201000,
          central_estimate_ha: 213800,
          high_bound_ha: 224500
        }
      }, null, 2)
    },
    {
      method: 'GET',
      path: '/api/v1/passports/{code}',
      summary: 'Fetch Structured Evidence Passport for Knowledge Reuse',
      authRequired: false,
      description: 'Returns the completed institutional memory record of a policy pilot including pre-defined KPIs, achieved outcomes, and cross-state transferability rules.',
      sampleResponse: JSON.stringify({
        passport_code: 'EP-2024-MH-003',
        problem: 'Agricultural Farmland Disappearance around Pune',
        intervention: '4km green agricultural protection ring + 50% infill rebate',
        decision_status: 'adopted',
        kpi_outcomes: [
          { name: 'Prime Farmland Retained', baseline: '14,200 ha', achieved: '18,400 ha' }
        ],
        transferability_notes: 'Directly transferable to tier-2 cities in MP (Indore/Ujjain) facing corridor sprawl.'
      }, null, 2)
    }
  ];

  const currentEp = endpoints[selectedEndpointIdx];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-slate-200 text-slate-800 border border-slate-300">
              Platform Integration
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              PS ITEM 12: OPEN REST APIS & INTEROPERABILITY
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Code2 size={26} className="text-[#D97706]" />
            BhoomiConnect REST API & OpenAPI 3.0 Documentation
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Interoperability endpoints enabling state land record platforms (DILRMP, Bhu-Naksha), GIS portals (Bhuvan, VEDAS), and university researchers to query evidence programmatically.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
            Base URL: https://bhoomiconnect-six.vercel.app/api/v1
          </span>
        </div>
      </div>

      {/* Main Grid: Endpoint Index on Left (4 cols), Request/Response on Right (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Endpoint Selector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <Card className="p-4 bg-white border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs uppercase text-[#1B3A6B] pb-2 border-b border-slate-100 mb-3">
              Standard Endpoints ({endpoints.length})
            </h3>
            <div className="space-y-2">
              {endpoints.map((ep, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedEndpointIdx(idx)}
                  className={`p-3 rounded-lg border cursor-pointer transition text-xs ${
                    selectedEndpointIdx === idx
                      ? 'border-[#1B3A6B] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono mb-1">
                    <span className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                      ep.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-semibold text-slate-800 truncate">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{ep.summary}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Schema & Code Viewer (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <Card className="p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                    currentEp.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {currentEp.method}
                  </span>
                  <span className="font-bold text-[#1B3A6B]">{currentEp.path}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5">{currentEp.description}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                  {currentEp.authRequired ? 'Bearer Token' : 'Public Access'}
                </span>
              </div>
            </div>

            {/* Request Payload (if POST) */}
            {currentEp.sampleRequest && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase text-slate-700 font-mono">
                    Example Request Body (JSON)
                  </span>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto">
                  {currentEp.sampleRequest}
                </pre>
              </div>
            )}

            {/* Response Payload */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase text-slate-700 font-mono">
                  Example Response Payload (200 OK)
                </span>
                <button
                  onClick={() => handleCopy(currentEp.sampleResponse)}
                  className="text-xs text-[#1B3A6B] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Copy size={12} /> {copied ? 'Copied' : 'Copy JSON'}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 text-emerald-300 text-xs font-mono overflow-x-auto max-h-80">
                {currentEp.sampleResponse}
              </pre>
            </div>

            {/* cURL Example */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase font-mono block mb-1">
                cURL CLI Example
              </span>
              <pre className="p-2.5 rounded bg-slate-100 text-slate-800 text-[11px] font-mono overflow-x-auto">
                curl -X {currentEp.method} "https://bhoomiconnect-six.vercel.app{currentEp.path.replace('{id}', 'res-data-01').replace('{code}', 'EP-2024-MH-003')}" -H "Accept: application/json"
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
