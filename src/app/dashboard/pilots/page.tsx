'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import { PolicyPilot, PilotKPI } from '@/lib/data/sih-store';
import {
  FileCheck2,
  TrendingUp,
  Target,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function PilotTrackerPage() {
  const { pilots, region, role } = useApp();
  const [selectedPilot, setSelectedPilot] = useState<PolicyPilot>(pilots[0]);
  const [showNewKpiModal, setShowNewKpiModal] = useState(false);

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
              Module M5
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-blue-100 text-blue-800 border border-blue-200">
              STAGE 9 & 10: PILOT DESIGN & PRE-DEFINED KPIS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <FileCheck2 size={26} className="text-[#D97706]" />
            Policy Pilot Tracker & Pre-Implementation KPIs
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Department execution monitoring. KPIs and baselines are strictly defined before pilots begin to ensure rigorous, objective evaluation.
          </p>
        </div>

        {/* Action Link to Evidence Passports */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/knowledge/passports"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D97706] hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition"
          >
            <Award size={14} />
            Generate Evidence Passport
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Grid: Active Pilots on Left, KPI Tracker & Outcomes on Right */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Active Pilots List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Card className="p-4 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-xs uppercase text-[#1B3A6B]">
                Active Department Pilots ({pilots.length})
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Field Tracked
              </span>
            </div>

            <div className="space-y-3">
              {pilots.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPilot(p)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedPilot?.id === p.id
                      ? 'border-[#1B3A6B] bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {p.status}
                    </span>
                    <span className="text-slate-400">Budget: ₹{p.budgetInLakhs}L</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 leading-snug">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{p.intervention}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{p.department}</span>
                    <span className="font-mono">{p.durationMonths} Mos</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Institutional Memory Guidance Card */}
          <Card className="p-4 bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-800">
              <Sparkles size={14} />
              Sequencing Correction Principle
            </h4>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              In traditional government programs, KPIs are often created post-facto. In BhoomiConnect, baselines and targets must be locked before field implementation begins.
            </p>
          </Card>
        </div>

        {/* Right: Pilot Details & Pre-Defined KPI Dashboard (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-200 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                    Status: {selectedPilot.status}
                  </span>
                  <span className="text-xs text-slate-400">ID: {selectedPilot.id}</span>
                </div>
                <h2 className="text-lg font-bold text-[#1B3A6B] mt-1.5">
                  {selectedPilot.title}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Target Region: <strong>{selectedPilot.region}</strong> · Lead: <strong>{selectedPilot.department}</strong>
                </p>
              </div>

              <div className="text-right sm:self-center">
                <span className="text-[11px] text-slate-500 block">Execution Window</span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {selectedPilot.startDate} → {selectedPilot.endDate}
                </span>
              </div>
            </div>

            {/* Intervention Summary */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-1">
                Specified Policy Intervention
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedPilot.intervention}
              </p>
            </div>

            {/* Pre-Defined KPIs Table (Core requirement from audit) */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#1B3A6B]">
                    Pre-Defined Key Performance Indicators (Locked at Design)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Tracking real-world measured observations against pre-pilot baselines.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {selectedPilot.kpis.map((kpi) => {
                  const targetDiff = kpi.target - kpi.baseline;
                  const currentDiff = (kpi.measured ?? kpi.baseline) - kpi.baseline;
                  const progressPct = targetDiff !== 0
                    ? Math.min(100, Math.max(0, Math.round((currentDiff / targetDiff) * 100)))
                    : 100;

                  return (
                    <div key={kpi.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-xs text-slate-900 leading-snug">{kpi.name}</h4>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {kpi.direction === 'higher_is_better' ? '▲ Higher' : '▼ Lower'}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight mb-3">
                        {kpi.definition}
                      </p>

                      <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-slate-50 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Baseline</span>
                          <span className="font-mono font-bold text-slate-700">{kpi.baseline}</span>
                          <span className="text-[9px] text-slate-400 block">{kpi.unit}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Target</span>
                          <span className="font-mono font-bold text-[#1B3A6B]">{kpi.target}</span>
                          <span className="text-[9px] text-slate-400 block">{kpi.unit}</span>
                        </div>
                        <div className="bg-emerald-50 rounded p-0.5">
                          <span className="text-[10px] text-emerald-700 block font-bold">Measured</span>
                          <span className="font-mono font-bold text-emerald-800 text-sm">{kpi.measured}</span>
                          <span className="text-[9px] text-emerald-600 block">{kpi.unit}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                          <span>Target Progress</span>
                          <span className="font-bold text-emerald-700">{progressPct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${progressPct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Limitations & Lessons */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-1">Field Limitations:</span>
                <p className="text-[11px] text-amber-800 leading-relaxed">{selectedPilot.limitations}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900">
                <span className="font-bold block mb-1">Lessons Learned:</span>
                <p className="text-[11px] text-emerald-800 leading-relaxed">{selectedPilot.lessonsLearned}</p>
              </div>
            </div>

            {/* Bottom Actions: Convert into Evidence Passport */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-slate-500">
                Outcomes verified by field inspections. Ready for institutional memory packaging.
              </span>
              <Link
                href="/dashboard/knowledge/passports"
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Award size={14} />
                Generate Evidence Passport (Stage 12)
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
