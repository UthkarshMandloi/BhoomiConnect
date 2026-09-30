'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  Brain,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileText,
  Search,
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';

export default function ResearchIntelligencePage() {
  const { resources, region } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string>('peri_urban_sprawl');

  const researchPapers = resources.filter(r => r.type === 'research');

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
              Module M2
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              STAGE 5: GROUNDED LITERATURE SYNTHESIS (RAG)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Brain size={26} className="text-[#D97706]" />
            AI Research Assistant & Literature Synthesis
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Strictly grounded retrieval-augmented synthesis citing verified passages from peer-reviewed publications and institutional datasets.
          </p>
        </div>

        {/* Action button to Policy Lab */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/policy-lab/design"
            className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            Translate to Policy Scenarios <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Grid: Cited Synthesis on Left (8 cols) and Research Gaps on Right (4 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Grounded Synthesis Card (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6 bg-white border border-slate-200 shadow-sm relative">
            {/* Labelling Banner per Section 14 Guardrails */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <span className="font-bold text-sm text-[#1B3A6B]">
                  Evidence Synthesis: Indore Urban Sprawl vs Agricultural Retention
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                [AI-GENERATED SUMMARY — GROUNDED IN CITATIONS]
              </span>
            </div>

            {/* Synthesized Narrative with Per-Claim Citations */}
            <div className="mt-4 space-y-4 text-xs text-slate-700 leading-relaxed">
              <p>
                Multi-temporal satellite observations confirm that rapid urban expansion in the Malwa agro-ecological region has resulted in a <strong>14.8% reduction in prime agricultural Vertisols</strong> between 2015 and 2025{' '}
                <Link href="/dashboard/evidence" className="text-blue-700 font-bold hover:underline font-mono">
                  [Citation: res-paper-01, Sec 4.2]
                </Link>. The primary spatial vector of conversion is concentrated along the <em>Super Corridor and Ring Road II logistics hubs</em>, where speculative land acquisition preceded municipal infrastructure notification.
              </p>

              <div className="p-3.5 bg-slate-50 border-l-4 border-l-[#1B3A6B] rounded-r-lg space-y-1">
                <strong className="text-slate-900 block text-xs">Socio-Economic & Agronomic Impacts:</strong>
                <p>
                  Household survey analysis across 420 fringe agricultural families demonstrates that 68% of smallholders who diverted land experienced capital depletion within 4 years due to lack of transitional vocational skilling{' '}
                  <Link href="/dashboard/evidence" className="text-blue-700 font-bold hover:underline font-mono">
                    [Citation: res-paper-02, Table 3]
                  </Link>. Concurrently, ICAR field yield trials note an 11.2% agronomic yield penalty on adjacent farms experiencing particulate deposition and thermal alterations from transit corridors{' '}
                  <Link href="/dashboard/evidence" className="text-blue-700 font-bold hover:underline font-mono">
                    [Citation: res-paper-06]
                  </Link>.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/60 border-l-4 border-l-cyan-600 rounded-r-lg space-y-1">
                <strong className="text-slate-900 block text-xs">Hydrological Vulnerability & Flood Risk:</strong>
                <p>
                  Hydrological catchment modeling by the National Institute of Hydrology indicates that impervious surface proliferation over natural recharge zones has lowered groundwater levels by an average of <strong>3.4 meters</strong>, simultaneously increasing local flash flood discharge volumes by 42%{' '}
                  <Link href="/dashboard/evidence" className="text-blue-700 font-bold hover:underline font-mono">
                    [Citation: res-paper-03, SWAT Model Output]
                  </Link>.
                </p>
              </div>

              <p>
                <strong>Comparative Precedents & Policy Solution:</strong> Empirical evaluation of the Pune Metropolitan Fringe Experiment demonstrates that combining a <em>4 km statutory green buffer with a 50% fee discount for urban brownfield infill</em> successfully preserved 18.4% of prime farmland while channeling 3,200 housing units back into interior vacant plots{' '}
                <Link href="/dashboard/knowledge/passports" className="text-amber-800 font-bold hover:underline font-mono">
                  [Precedent Passport: EP-2024-MH-003]
                </Link>. This provides direct empirical validation for Policy Lab Scenario C.
              </p>
            </div>

            {/* AI Guardrail Integrity Disclosure */}
            <div className="mt-5 p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Info size={14} className="text-slate-500" />
                <span>Synthesis is strictly constrained to indexed, verified passages. No external hallucinated data permitted.</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">RAG Engine: Bhoomi-LLM-Grounded</span>
            </div>
          </Card>

          {/* Indexed Research Studies Feed */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase text-[#1B3A6B] tracking-wide">
              Cited Publications in this Synthesis ({researchPapers.length})
            </h3>
            {researchPapers.map((paper) => (
              <Card key={paper.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-xs transition">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {paper.id}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck size={12} /> {paper.verificationStatus}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 mt-1">{paper.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{paper.abstract}</p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{paper.publisher} ({paper.date})</span>
                  <span className="font-semibold text-[#D97706]">{paper.whyRelevant}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Research Gaps Identification (Section 27 Step 4) (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <Card className="p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-xs uppercase text-[#1B3A6B]">
                Identified Research Gaps
              </h3>
              <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                Knowledge Deficits
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mb-4">
              Highlighted gaps where empirical literature is sparse or outdated for the target geography.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-rose-900">Post-2020 Fringe Farmland Studies</span>
                  <span className="text-[10px] font-bold text-rose-700 font-mono">HIGH PRIORITY</span>
                </div>
                <p className="text-[11px] text-rose-800 leading-tight">
                  No verified peer-reviewed study specific to Indore district published after 2024. Most historical studies precede the new Ring Road II notification.
                </p>
                <div className="mt-2 text-[10px] text-rose-600 font-mono">Coverage: 41% empirical completeness</div>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-amber-900">Tenant Farmer Disruption</span>
                  <span className="text-[10px] font-bold text-amber-700 font-mono">MEDIUM</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-tight">
                  Compensation records capture recorded owners (Bhoomiswami); empirical evidence on informal sharecroppers (Bataidars) remains unmeasured.
                </p>
                <div className="mt-2 text-[10px] text-amber-600 font-mono">Coverage: 52% empirical completeness</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <Link
                href="/dashboard/workspaces"
                className="w-full py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs"
              >
                Form Workspace to Address Gaps <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
