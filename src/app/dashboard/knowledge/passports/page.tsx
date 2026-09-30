'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  Award,
  Search,
  CheckCircle2,
  Share2,
  Building,
  Calendar,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Copy
} from 'lucide-react';

interface PassportRecord {
  id: string;
  code: string;
  problem: string;
  region: string;
  state: string;
  department: string;
  intervention: string;
  method: string;
  costInLakhs: number;
  durationMonths: number;
  decisionStatus: 'adopted' | 'modified' | 'not_adopted';
  replicationPotential: 'High' | 'Medium';
  kpis: Array<{ name: string; baseline: string; achieved: string; unit: string }>;
  limitations: string[];
  transferability: string;
  tags: string[];
}

export default function EvidencePassportsPage() {
  const { region } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPassportId, setSelectedPassportId] = useState<string>('pass-01');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const passports: PassportRecord[] = [
    {
      id: 'pass-01',
      code: 'EP-2024-MH-003',
      problem: 'Agricultural Farmland Disappearance & Fringe Speculation around Pune Metropolitan Region',
      region: 'Pune Metropolitan Fringe',
      state: 'Maharashtra',
      department: 'Maharashtra Urban Development & Town Planning Dept',
      intervention: 'Dual-Zone Statutory Regulation: 4 km green agricultural protection ring with 5x diversion charges, combined with 50% land development fee rebate for interior urban brownfield infill sites.',
      method: 'Synthetic control evaluation + GIS Sentinel-2 LULC change detection matrices (2020-2023).',
      costInLakhs: 340,
      durationMonths: 36,
      decisionStatus: 'adopted',
      replicationPotential: 'High',
      kpis: [
        { name: 'Prime Farmland Retained', baseline: '14,200 ha', achieved: '18,400 ha (+18.4%)', unit: 'ha' },
        { name: 'Brownfield Infill Growth', baseline: '16.2%', achieved: '34.8% (+114%)', unit: '%' },
        { name: 'Speculative Subdivisions', baseline: '142 cases/yr', achieved: '28 cases/yr (-80%)', unit: 'cases' }
      ],
      limitations: [
        'Requires functioning municipal TDR (Transferable Development Rights) exchange platform.',
        'Enforcement requires high cadastral boundary clarity.'
      ],
      transferability: 'Directly transferable to tier-2 cities in Maharashtra, Madhya Pradesh (Indore/Ujjain), and Gujarat facing arterial corridor highway sprawl.',
      tags: ['urbanization', 'agriculture', 'buffer-zoning', 'infill', 'pune', 'tdr']
    },
    {
      id: 'pass-02',
      code: 'EP-2025-MP-001',
      problem: 'Indore Peri-Urban Prime Vertisol Farmland Conversion & Groundwater Recharge Depletion',
      region: 'Indore District (Sanwer & Depalpur Tehsils)',
      state: 'Madhya Pradesh',
      department: 'Department of Land Resources (DoLR) & MP Revenue Dept',
      intervention: '3.5 km protected agricultural green buffer along Sanwer & Depalpur highway corridors combined with a 40% municipal fee waiver for high-density infill on interior brownfield plots.',
      method: 'Random Forest LULC classification on 10m Sentinel-2 bands + SWAT hydrological catchment simulation.',
      costInLakhs: 280,
      durationMonths: 24,
      decisionStatus: 'adopted',
      replicationPotential: 'High',
      kpis: [
        { name: 'Prime Farmland Retained', baseline: '18,200 ha', achieved: '17,850 ha (98.1%)', unit: 'ha' },
        { name: 'Urban Infill Rate', baseline: '18.5%', achieved: '38.2%', unit: '%' },
        { name: 'Speculative Diversions', baseline: '84 cases/qtr', achieved: '22 cases/qtr (-74%)', unit: 'cases' }
      ],
      limitations: [
        'Applies to Sanwer & Depalpur pilot blocks.',
        'Requires coordination with IDA Master Plan 2035.'
      ],
      transferability: 'Designed for replication across Malwa agricultural plateau (Ujjain, Dewas) and Central Indian industrial corridors.',
      tags: ['indore', 'vertisols', 'buffer-zoning', 'infill', 'groundwater', 'sih26019']
    },
    {
      id: 'pass-03',
      code: 'EP-2023-KA-007',
      problem: 'Bengaluru Peri-Urban Wetland & Lake Catchment Encroachment by Real Estate Subdivisions',
      region: 'Bengaluru Rural & Peri-Urban Lakes',
      state: 'Karnataka',
      department: 'Karnataka Revenue Dept & Lake Development Authority',
      intervention: 'Buffer Demarcation & Digital Geo-Fencing of 100m lake catchments using high-resolution drone orthophotos.',
      method: 'Drone orthomosaic cadastral overlay with Bhuvan satellite thermal water spread monitoring.',
      costInLakhs: 410,
      durationMonths: 24,
      decisionStatus: 'adopted',
      replicationPotential: 'Medium',
      kpis: [
        { name: 'Wetland Encroachments Halted', baseline: '78 sites', achieved: '69 cleared (88%)', unit: 'sites' },
        { name: 'Water Retention Volume', baseline: '2.4 MCM', achieved: '3.8 MCM (+58%)', unit: 'MCM' }
      ],
      limitations: [
        'Drone survey accuracy depends on seasonal water levels.'
      ],
      transferability: 'Applicable to peri-urban wetland systems in Hyderabad, Chennai, and Indore (Sirpur Lake).',
      tags: ['wetlands', 'geo-fencing', 'bengaluru', 'drone-survey', 'hydrology']
    }
  ];

  const filtered = passports.filter(p =>
    p.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedPassport = passports.find(p => p.id === selectedPassportId) || passports[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
              Module M5
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              STAGE 12: INSTITUTIONAL MEMORY & REUSE LOOP
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Award size={26} className="text-[#D97706]" />
            Evidence Passports — Reusable Institutional Knowledge Vault
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Structured records of completed pilots and policy experiments. Enables cross-state learning so the next department starts with what was learned instead of starting over.
          </p>
        </div>

        {/* Cross-State Precedent Reusability Callout */}
        <div className="flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-emerald-900">
          <Sparkles size={16} className="text-emerald-700" />
          <span>Cross-State Precedents Active: <strong>3 Reusable Passports</strong></span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search passports by problem, state, or tag (e.g., Pune, buffer-zoning, infill, Indore)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B]"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} verified passports
        </div>
      </div>

      {/* Main Grid: Passport Cards (4 cols) and Detailed Passport Viewer (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Passports List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {filtered.map((pass) => (
            <Card
              key={pass.id}
              onClick={() => setSelectedPassportId(pass.id)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                selectedPassport.id === pass.id
                  ? 'border-2 border-[#1B3A6B] bg-blue-50/30 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {pass.code}
                </span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                  {pass.replicationPotential} Replication
                </span>
              </div>

              <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                {pass.problem}
              </h3>

              <p className="text-[11px] text-slate-500 mt-1">
                Region: <strong>{pass.region}</strong> ({pass.state})
              </p>

              <div className="flex flex-wrap gap-1 mt-2.5">
                {pass.tags.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Structured Passport Record (8 cols) (Section 20 Layout) */}
        <div className="lg:col-span-8">
          <Card className="p-6 bg-white border border-slate-300 rounded-xl shadow-lg relative">
            
            {/* Passport Official Badge Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#1B3A6B] text-white">
                    {selectedPassport.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Decision: {selectedPassport.decisionStatus.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#1B3A6B] mt-2 leading-snug">
                  {selectedPassport.problem}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Jurisdiction: <strong>{selectedPassport.region}</strong> · Owner: <strong>{selectedPassport.department}</strong>
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <button
                  onClick={() => handleCopyCode(selectedPassport.code)}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-1 cursor-pointer border border-slate-200"
                  title="Copy Passport Code"
                >
                  <Copy size={12} /> {copiedId ? 'Copied!' : selectedPassport.code}
                </button>
                <span className="text-[11px] text-slate-400 font-mono">Cost: ₹{selectedPassport.costInLakhs}L</span>
              </div>
            </div>

            {/* 1. Policy Intervention Summary */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-1">
                1. Implemented Policy Intervention
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed">
                {selectedPassport.intervention}
              </p>
            </div>

            {/* 2. Methodology & Evidence Base */}
            <div className="mt-4 p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs">
              <span className="font-bold text-blue-950 block mb-0.5">2. Evidence & Analytical Method Used:</span>
              <p className="text-blue-900 text-[11px] leading-relaxed">
                {selectedPassport.method}
              </p>
            </div>

            {/* 3. Measured Results vs Pre-Defined Baselines */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-2.5">
                3. Measured Outcomes vs Pre-Defined Baselines
              </h4>
              <div className="grid md:grid-cols-3 gap-3">
                {selectedPassport.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white shadow-xs">
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1 block">{kpi.name}</span>
                    <div className="mt-2 text-xs">
                      <span className="text-slate-400 block text-[10px]">Pre-Pilot Baseline</span>
                      <span className="font-mono text-slate-700 font-semibold">{kpi.baseline}</span>
                    </div>
                    <div className="mt-1 pt-1 border-t border-slate-100 text-xs">
                      <span className="text-emerald-700 block text-[10px] font-bold">Achieved Outcome</span>
                      <span className="font-mono font-bold text-emerald-800 text-sm">{kpi.achieved}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Limitations & Transferability Notes (Crucial for reuse) */}
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">4. Stated Limitations:</span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800">
                  {selectedPassport.limitations.map((lim, idx) => (
                    <li key={idx}>{lim}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                <span className="font-bold block mb-1">5. Cross-State Transferability Notes:</span>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  {selectedPassport.transferability}
                </p>
              </div>
            </div>

            {/* Reuse Loop Call-to-Action */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-slate-500">
                Replicate this precedent to pre-fill Policy Lab assumptions with attribution.
              </span>
              <Link
                href="/dashboard/policy-lab/design"
                className="w-full sm:w-auto px-4 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <RotateCcw size={14} />
                Replicate for {region} in Policy Lab
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
