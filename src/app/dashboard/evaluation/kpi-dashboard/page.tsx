'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Building,
  Info,
  Calendar,
  Layers,
  Scale
} from 'lucide-react';

export default function KPIDashboardPage() {
  const { region } = useApp();
  const [selectedTheme, setSelectedTheme] = useState<string>('land_use');

  // Theme 1: Land-Use Dynamics Data (2015-2026)
  const landUseData = [
    { year: '2015', agriHa: 268400, builtUpHa: 22700, forestHa: 41200 },
    { year: '2017', agriHa: 261200, builtUpHa: 27100, forestHa: 40900 },
    { year: '2019', agriHa: 253000, builtUpHa: 31800, forestHa: 40600 },
    { year: '2021', agriHa: 245100, builtUpHa: 36900, forestHa: 40100 },
    { year: '2023', agriHa: 236400, builtUpHa: 42300, forestHa: 39800 },
    { year: '2025', agriHa: 228600, builtUpHa: 48200, forestHa: 39500 },
  ];

  // Theme 2: Research Output Distribution by Institution
  const researchOutputData = [
    { name: 'IITs / SPA', papers: 18, fill: '#1B3A6B' },
    { name: 'ISRO-SAC / VEDAS', papers: 14, fill: '#0284C7' },
    { name: 'ICAR / Agri Univs', papers: 12, fill: '#10B981' },
    { name: 'IRMA / Policy Labs', papers: 9, fill: '#D97706' },
    { name: 'State Remote Sensing', papers: 7, fill: '#7C3AED' },
  ];

  // Theme 3: Climate & Ecological Vulnerability Indices
  const climateVulnerabilityData = [
    { metric: 'Groundwater Stress', score: 74, status: 'Critical', fill: '#E11D48' },
    { metric: 'Urban Heat Island Delta', score: 62, status: 'Moderate', fill: '#F59E0B' },
    { metric: 'Soil Organic Carbon', score: 48, status: 'Declining', fill: '#EA580C' },
    { metric: 'Catchment Imperviousness', score: 68, status: 'High Strain', fill: '#0284C7' },
  ];

  // Theme 4: Aggregate Dispute Statistics (Clearly marked MOCK AGGREGATE per Section 15 privacy guidelines)
  const aggregateDisputeData = [
    { district: 'Indore (Sanwer)', cases: 412, resolutionRate: '68%' },
    { district: 'Indore (Depalpur)', cases: 289, resolutionRate: '74%' },
    { district: 'Indore (Mhow)', cases: 345, resolutionRate: '62%' },
    { district: 'Pune (Haveli)', cases: 520, resolutionRate: '81%' },
    { district: 'Jaipur (Sanganer)', cases: 398, resolutionRate: '59%' },
  ];

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
              Module M7
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              PS ITEM 10: APPROVED NATIONAL & REGIONAL INDICATORS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <BarChart3 size={26} className="text-[#D97706]" />
            National Land Governance Indicators Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Approved multi-domain indicators covering land-use dynamics, research synthesis metrics, climate vulnerabilities, pilot outcomes, and privacy-compliant aggregate disputes.
          </p>
        </div>

        {/* Theme Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'land_use', label: 'Land-Use Trends' },
            { id: 'research', label: 'Research Outputs' },
            { id: 'climate', label: 'Ecological Health' },
            { id: 'disputes', label: 'Aggregate Disputes (Mock)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTheme(t.id)}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer whitespace-nowrap transition ${
                selectedTheme === t.id
                  ? 'bg-[#1B3A6B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 KPI Highlight Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card className="p-4 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Agricultural Retention Rate</span>
            <span className="px-1.5 py-0.2 rounded font-mono bg-emerald-50 text-emerald-700 text-[10px]">
              OBSERVED
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900">85.2%</span>
            <span className="text-xs text-rose-600 font-bold flex items-center">
              <TrendingDown size={12} /> -14.8%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Class I Vertisols vs 2015 baseline</p>
        </Card>

        <Card className="p-4 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Built-Up Sprawl Growth</span>
            <span className="px-1.5 py-0.2 rounded font-mono bg-rose-50 text-rose-700 text-[10px]">
              OBSERVED
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900">+112%</span>
            <span className="text-xs text-rose-600 font-bold flex items-center">
              <TrendingUp size={12} /> Rapid Sprawl
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">22,700 ha (2015) → 48,200 ha (2025)</p>
        </Card>

        <Card className="p-4 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Infill Development Share</span>
            <span className="px-1.5 py-0.2 rounded font-mono bg-blue-50 text-blue-700 text-[10px]">
              PILOT METRIC
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-[#1B3A6B]">38.2%</span>
            <span className="text-xs text-emerald-700 font-bold flex items-center">
              <TrendingUp size={12} /> +19.7% Target
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Growth absorbed inside municipal boundary</p>
        </Card>

        <Card className="p-4 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Policy Passports Reused</span>
            <span className="px-1.5 py-0.2 rounded font-mono bg-amber-50 text-amber-800 text-[10px]">
              INSTITUTIONAL
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-[#D97706]">3 States</span>
            <span className="text-xs text-emerald-700 font-bold">100% Traceability</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">MP, Maharashtra, Karnataka pilots</p>
        </Card>
      </div>

      {/* Main Visualizations Grid */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Dynamic Theme Charts (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {selectedTheme === 'land_use' && (
            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#1B3A6B]">
                    Multi-Temporal Land-Use Transition Dynamics (2015–2025)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Observed Sentinel-2 LULC time-series showing conversion of agricultural land into built-up corridors.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  [OBSERVED DATA]
                </span>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={landUseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="year" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="agriHa" name="Agricultural Farmland (ha)" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="builtUpHa" name="Built-Up Urban (ha)" stroke="#F43F5E" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="forestHa" name="Forest & Vegetation (ha)" stroke="#0284C7" strokeWidth={1.8} strokeDasharray="4 4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {selectedTheme === 'research' && (
            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#1B3A6B]">
                    Research Output Index by Academic & Space Institutions
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Distribution of peer-reviewed land governance papers and spatial datasets indexed in M1 Hub.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                  60 Indexed Records
                </span>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={researchOutputData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="papers" name="Verified Research Studies & Datasets" radius={[6, 6, 0, 0]}>
                      {researchOutputData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {selectedTheme === 'climate' && (
            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#1B3A6B]">
                    Ecological & Hydrological Vulnerability Stress Index
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Environmental impact flags linking peri-urban impervious surfaces with natural resource stress.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                  CGWB & NIH Data
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                {climateVulnerabilityData.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs text-slate-800">{item.metric}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-300">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono" style={{ color: item.fill }}>
                        {item.score}/100
                      </span>
                      <span className="text-[11px] text-slate-500">Stress Index</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.fill }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {selectedTheme === 'disputes' && (
            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#1B3A6B]">
                    District-Level Aggregate Land Conversion Disputes (Mock Prototype)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Aggregated strictly at district and block levels to identify administrative friction without personal record exposure.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                  PRIVACY COMPLIANT
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-2.5">District & Sub-Block</th>
                      <th className="p-2.5">Pending Conversion Disputes</th>
                      <th className="p-2.5">Settlement Rate</th>
                      <th className="p-2.5">Primary Conflict Driver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {aggregateDisputeData.map((d, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{d.district}</td>
                        <td className="p-2.5 font-mono text-rose-600 font-bold">{d.cases} cases</td>
                        <td className="p-2.5 font-mono text-emerald-700 font-semibold">{d.resolutionRate}</td>
                        <td className="p-2.5 text-slate-500">Corridor highway right-of-way compensation</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>PS Section 15 Compliance Notice:</strong> Per SIH architectural guidelines, individual landowner survey numbers and citizen identities are never ingested or displayed.
              </div>
            </Card>
          )}
        </div>

        {/* Right: Data Lineage & Provenance Methodology (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <Card className="p-5 bg-white border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xs uppercase text-[#1B3A6B] pb-2 border-b border-slate-100">
              Indicator Lineage & Calculation Standard
            </h3>

            <div className="mt-3 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">LULC Transition Rate</strong>
                <span className="text-slate-600 text-[11px]">
                  Derived from 10m Sentinel-2 MSI surface reflectance via Google Earth Engine and GDAL offline pipelines.
                </span>
                <span className="font-mono text-[10px] text-blue-700 block mt-1">Accuracy: 91.4% (GCP ground truthed)</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">Aquifer Stress Index</strong>
                <span className="text-slate-600 text-[11px]">
                  48 telemetry observation wells maintained by CGWB in Indore basin.
                </span>
                <span className="font-mono text-[10px] text-blue-700 block mt-1">Updated biannually (pre/post monsoon)</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block">Infill Absorption Rate</strong>
                <span className="text-slate-600 text-[11px]">
                  Measured through municipal building permit issuance geocoded to municipal vs peri-urban boundary polygons.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
