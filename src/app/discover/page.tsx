'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/lib/context/app-context';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  FileText,
  Database,
  Award,
  Loader2,
  Compass
} from 'lucide-react';

export default function DiscoverPage() {
  const router = useRouter();
  const { setRegion, addAuditLog } = useApp();

  const [questionText, setQuestionText] = useState(
    'What are the impacts of converting agricultural land for urban development around Indore, and what has worked elsewhere?'
  );
  const [loading, setLoading] = useState(false);
  const [structuredOutput, setStructuredOutput] = useState<any>(null);

  const sampleQuestions = [
    'What are the impacts of converting agricultural land for urban development around Indore, and what has worked elsewhere?',
    'How is industrial corridor development affecting groundwater recharge in Central Indian peri-urban zones?',
    'What are the measurable outcomes of transferable development rights (TDR) for protecting fertile farmland in Western India?'
  ];

  const handleStructureQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setLoading(true);

    // AI Query Understanding Simulation (Section 14 & 27)
    setTimeout(() => {
      setStructuredOutput({
        problemId: 'prob-01',
        title: 'Peri-Urban Agricultural Land Conversion & Sprawl Pressure around Indore',
        region: 'Indore District, Madhya Pradesh',
        theme: 'Agricultural Land Loss & Peri-Urban Sprawl',
        timeHorizon: '2015–2035',
        landType: 'Class I & II Vertisols (Black Cotton Soils)',
        potentialDrivers: [
          'Ring Road II & Super Corridor Expansion',
          'Speculative Peripheral Land Acquisition',
          'Fragmented Diversion under MP LRC Sec 172',
          'Industrial Logistics Park Zoning'
        ],
        keyIndicators: [
          'Annual Farmland Loss Rate (ha/yr)',
          'Impervious Surface Heat Island Delta',
          'Groundwater Table Depth (CGWB wells)',
          'Brownfield Infill Growth Ratio'
        ],
        retrievedResourceSummary: {
          researchCount: 6,
          datasetCount: 3,
          gisLayersCount: 6,
          policiesCount: 2,
          passportsCount: 1
        },
        researchQuestions: [
          'What is the observed historical rate of agricultural conversion in Indore between 2015 and 2025?',
          'Which arterial vectors (Super Corridor vs Bypass) exhibit highest speculative conversion pressure?',
          'How effective was the 4km buffer scheme in the Pune precedent passport (EP-2024-MH-003)?'
        ]
      });

      setRegion('Indore, Madhya Pradesh');
      addAuditLog(
        'PROBLEM_DISCOVERED',
        'LandProblem',
        'Peri-Urban Agricultural Land Conversion around Indore',
        'AI Query Understanding parsed natural language question and generated structured Land Problem.'
      );

      setLoading(false);
    }, 800);
  };

  const handleConfirmAndProceed = () => {
    router.push('/dashboard/evidence');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Banner */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-[#1B3A6B]">
            <div className="w-8 h-8 rounded bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-sm">
              भू
            </div>
            BhoomiConnect
          </Link>
          <div className="text-xs text-slate-500 font-medium">
            Module M2 · AI Research Assistant
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!structuredOutput ? (
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
                  Question-First Philosophy
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  AI QUERY UNDERSTANDING
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#1B3A6B]">
                Discover Land Governance Questions
              </h2>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                Enter your policy question in natural language. BhoomiConnect extracts target geography, policy drivers, and metrics, then retrieves linked research, datasets, GIS layers, and prior Evidence Passports.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleStructureQuestion} className="bg-white p-6 rounded-xl border border-slate-300 shadow-md">
              <label className="block mb-4">
                <span className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Enter your land-governance policy question:
                </span>
                <Textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={4}
                  className="w-full text-sm p-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#1B3A6B]"
                  placeholder="e.g. What are the impacts of converting agricultural land for urban development around Indore, and what has worked elsewhere?"
                />
              </label>

              <button
                type="submit"
                disabled={loading || !questionText.trim()}
                className="w-full py-3 bg-[#1B3A6B] hover:bg-[#122849] disabled:bg-slate-400 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm transition"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    AI Analyzing Query & Synthesizing Taxonomy...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Structure Question & Retrieve Multi-Source Evidence
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Example Queries */}
            <div className="mt-8">
              <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-wide">
                Or explore an official SIH 26019 demonstration query:
              </h3>
              <div className="space-y-2.5">
                {sampleQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    onClick={() => setQuestionText(q)}
                    className="p-3 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition text-xs text-slate-800 font-medium flex items-center justify-between"
                  >
                    <span>{q}</span>
                    <ArrowRight size={13} className="text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Structured Output Confirmation Screen (Stage 2 in Section 11 & 27) */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStructuredOutput(null)}
                className="text-xs font-bold text-[#1B3A6B] hover:underline"
              >
                ← Edit Policy Question
              </button>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                AI Structuring Complete
              </span>
            </div>

            <Card className="p-6 bg-white border-2 border-emerald-500 rounded-xl shadow-lg">
              <div className="pb-4 border-b border-slate-200">
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {structuredOutput.problemId} · Confirmed Land Problem Record
                </span>
                <h2 className="text-xl font-bold text-[#1B3A6B] mt-2">
                  {structuredOutput.title}
                </h2>
              </div>

              {/* Parsed Attributes Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Target Geography</span>
                  <span className="font-bold text-slate-900 mt-1 block">{structuredOutput.region}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Problem Theme</span>
                  <span className="font-bold text-slate-900 mt-1 block">{structuredOutput.theme}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Time Horizon</span>
                  <span className="font-mono font-bold text-slate-900 mt-1 block">{structuredOutput.timeHorizon}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Primary Soil Type</span>
                  <span className="font-bold text-slate-900 mt-1 block">{structuredOutput.landType}</span>
                </div>
              </div>

              {/* Key Drivers & Indicators */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Identified Conversion Drivers</h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {structuredOutput.potentialDrivers.map((d: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Key Decision Indicators</h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {structuredOutput.keyIndicators.map((i: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A6B]" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Parallel Evidence Retrieval Notification (Section 27 Step 3) */}
              <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950">
                <span className="font-bold block mb-1.5">Parallel Cross-Source Evidence Retrieved:</span>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                  <span className="px-2 py-1 rounded bg-white border border-blue-200 text-blue-900">
                    📚 6 Research Studies
                  </span>
                  <span className="px-2 py-1 rounded bg-white border border-blue-200 text-emerald-800">
                    📊 3 Ground Datasets
                  </span>
                  <span className="px-2 py-1 rounded bg-white border border-blue-200 text-cyan-800">
                    🗺️ 6 GIS Decision Layers
                  </span>
                  <span className="px-2 py-1 rounded bg-white border border-blue-200 text-purple-800">
                    📜 2 Statutory Policies
                  </span>
                  <span className="px-2 py-1 rounded bg-white border border-blue-200 text-amber-800">
                    🏆 1 Prior Evidence Passport (Pune Precedent)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setStructuredOutput(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Adjust Question
                </button>
                <button
                  onClick={handleConfirmAndProceed}
                  className="px-6 py-2.5 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  Confirm & Inspect Evidence (Stage 3) <ArrowRight size={14} />
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
