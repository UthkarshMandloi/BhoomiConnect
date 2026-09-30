'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  Compass,
  Layers,
  Database,
  Share2,
  Brain,
  FileCheck2,
  Award,
  Users2,
  Sparkles,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Scale,
  Sparkle,
  BookOpen,
  GraduationCap,
  Building2
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { startTour } = useApp();

  const handleLaunchTour = () => {
    startTour();
    router.push('/dashboard');
  };

  const corePhilosophy = [
    {
      title: 'Question First, Not Repository First',
      desc: 'Policymakers start from a pressing problem, not a folder tree of uncontextualized PDFs.',
      icon: Brain
    },
    {
      title: 'Evidence Linked, Not Just Stored',
      desc: 'Every dataset, study, and policy document carries audited provenance and typed graph relations.',
      icon: Share2
    },
    {
      title: 'Strict 3-Layer Integrity Labelling',
      desc: 'The UI explicitly separates [OBSERVED DATA] vs [MODEL OUTPUT] vs [POLICY INTERPRETATION].',
      icon: Scale
    },
    {
      title: 'Institutional Memory & Reuse Loop',
      desc: 'Pilot outcomes are packaged into Evidence Passports, so the next department builds on what was learned.',
      icon: Award
    }
  ];

  const modules = [
    { code: 'M1', name: 'Land Knowledge Hub & Graph', desc: 'Consolidated records with provenance & relationship explorer' },
    { code: 'M2', name: 'AI Research Assistant', desc: 'Question-driven discovery with grounded passage citations' },
    { code: 'M3', name: 'Land GIS Spatial Intelligence', desc: 'Region-driven map layers linked directly to evidence' },
    { code: 'M4', name: 'Transparent Policy Lab', desc: 'Scenario simulation with visible, editable assumptions' },
    { code: 'M5', name: 'Pilot Tracker & Passports', desc: 'Pre-defined KPIs and reusable institutional memory records' },
    { code: 'M6', name: 'Workspaces & Innovation Portal', desc: 'Multi-disciplinary project teams and government grant calls' },
    { code: 'M7', name: 'National Indicator Dashboards', desc: 'Approved metrics across land use, research, and climate' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Govt of India Tricolor Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Main Government Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1B3A6B] to-[#0D2447] flex items-center justify-center text-white font-bold text-xl shadow-md">
              भू
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#1B3A6B] tracking-tight">BhoomiConnect</span>
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase bg-amber-100 text-amber-900 rounded border border-amber-300">
                  SIH 26019
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Ministry of Rural Development · Department of Land Resources (DoLR)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLaunchTour}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-xs cursor-pointer transition"
            >
              <Play size={13} fill="currentColor" />
              Interactive Demo (15 Steps)
            </button>
            <Link
              href="/auth/signin"
              className="px-3.5 py-2 border border-[#1B3A6B] text-[#1B3A6B] hover:bg-blue-50 font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1.5"
            >
              <Users2 size={13} />
              Sign In (3 Personas)
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white font-bold text-xs rounded-lg shadow-xs transition"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-blue-50/40 py-20 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            National Land Governance Research & Policy Innovation Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1B3A6B] tracking-tight leading-tight">
            Turn Fragmented Land Data into <br />
            <span className="bg-gradient-to-r from-[#1B3A6B] via-[#D97706] to-[#B45309] bg-clip-text text-transparent">
              Evidence-Based Decisions
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            India already has land records, GIS platforms (Bhuvan, VEDAS), and university research — but they sit in separate silos. BhoomiConnect is the <strong>integration, intelligence, and experimentation layer</strong> that connects them into a unified decision workflow.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-[#1B3A6B] hover:bg-[#122849] text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-md transition transform hover:-translate-y-0.5"
            >
              <Users2 size={16} />
              Login as 3 Personas (Demo Links)
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/discover"
              className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm rounded-lg flex items-center gap-2 shadow-xs transition transform hover:-translate-y-0.5"
            >
              Start Natural Language Discovery
            </Link>

            <button
              onClick={handleLaunchTour}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg flex items-center gap-2 shadow-md cursor-pointer transition transform hover:-translate-y-0.5"
            >
              <Play size={16} fill="currentColor" />
              Run 15-Step Tour
            </button>
          </div>

          {/* Sits Above Existing Infrastructure Banner */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-700 uppercase tracking-wide">Integrated Ecosystem:</span>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md">DILRMP Records</span>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md">Bhu-Naksha Cadastral</span>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md">ISRO Bhuvan & VEDAS</span>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md">Central Ground Water Board</span>
          </div>
        </div>
      </section>

      {/* 3-Persona Multi-Stakeholder Starting Section */}
      <section className="py-14 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase font-mono text-amber-400 tracking-wider px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Role-Based Access Control (RBAC)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Starting Portals for 3 Core Personas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Government officials, academic researchers, and department reviewers log in with distinct credentials and authorities. Instant demo links are active for immediate review.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Persona 1: Government Policymaker */}
            <div className="bg-slate-800/90 border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-400 transition shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Scale size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold uppercase">
                    Government Policymaker
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Dr. Ramesh Kumar</h3>
                <p className="text-xs text-slate-400">State Land Policy Officer & Joint Secretary</p>
                <p className="text-[11px] text-blue-300 mt-0.5">DoLR, Ministry of Rural Development</p>

                <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Email:</span>
                    <span className="text-slate-200">ramesh.kumar@dolr.gov.in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Password:</span>
                    <span className="text-amber-400 font-bold">DoLR@Gov2026!</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-xs text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-blue-400" />
                    Policy Lab Scenario Simulation
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-blue-400" />
                    Indore Peri-Urban Buffer Directives
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-blue-400" />
                    Pilot Commissioning & Approvals
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <Link
                  href="/auth/signin"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow"
                >
                  Demo Login as Policymaker
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Persona 2: Academic & Research Institution */}
            <div className="bg-slate-800/90 border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400 transition shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <GraduationCap size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                    Academic & Research
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Dr. Priya Sharma</h3>
                <p className="text-xs text-slate-400">Senior Spatial Scientist & GIS Lead</p>
                <p className="text-[11px] text-emerald-300 mt-0.5">IIT Indore & SAC-ISRO Lab</p>

                <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Email:</span>
                    <span className="text-slate-200">priya.sharma@iiti.ac.in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Password:</span>
                    <span className="text-emerald-400 font-bold">Research@IIT2026#</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-xs text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    Multi-temporal Sentinel-2 Ingestion
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    Knowledge Graph & Literature Synthesis
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    Joint Workspace Research Authoring
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <Link
                  href="/auth/signin"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow"
                >
                  Demo Login as Researcher
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Persona 3: Department Reviewer & Validator */}
            <div className="bg-slate-800/90 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400 transition shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Building2 size={20} />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase">
                    Department Reviewer
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Dr. Anita Roy</h3>
                <p className="text-xs text-slate-400">Lead Evidence Validator & Auditor</p>
                <p className="text-[11px] text-amber-300 mt-0.5">NIRDPR & Land Governance Cell</p>

                <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Email:</span>
                    <span className="text-slate-200">anita.roy@nirdpr.gov.in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[10px]">Password:</span>
                    <span className="text-amber-400 font-bold">Audit@NIRD2026$</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-xs text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-amber-400" />
                    Evidence Validation Gate Sign-offs
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-amber-400" />
                    License, Methodology & GCP Audits
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-amber-400" />
                    Cryptographic Audit Trail Logging
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <Link
                  href="/auth/signin"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow"
                >
                  Demo Login as Validator
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
            >
              Open Dedicated Single Sign-On (SSO) Portal with Pre-filled Form
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* The Evidence-to-Policy Workflow Loop (Section 11) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase font-mono text-[#D97706] tracking-wider">
              End-to-End Workflow Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3A6B] mt-1.5">
              From Policy Question to Reusable Evidence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Every stage provides transparency, provenance, and accountability before execution occurs in government departments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative">
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Stage 1 & 2
              </span>
              <h3 className="font-bold text-sm text-[#1B3A6B] mt-2">Question & Discovery</h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter policy question in natural language. AI query understanding structures topic and retrieves parallel evidence.
              </p>
            </Card>

            <Card className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative">
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Stage 3 & 4
              </span>
              <h3 className="font-bold text-sm text-[#1B3A6B] mt-2">Validate & Collaborate</h3>
              <p className="text-xs text-slate-600 mt-1">
                Audit provenance, ground GCPs, and license terms. Convene cross-disciplinary workspace with town planners.
              </p>
            </Card>

            <Card className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative">
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Stage 5 to 8
              </span>
              <h3 className="font-bold text-sm text-[#1B3A6B] mt-2">GIS & Policy Lab</h3>
              <p className="text-xs text-slate-600 mt-1">
                Explore decision layers on map. Compare Scenarios A, B, and C with visible assumptions before review gate sign-off.
              </p>
            </Card>

            <Card className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative">
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                Stage 9 to 12
              </span>
              <h3 className="font-bold text-sm text-[#1B3A6B] mt-2">Pilot & Evidence Passport</h3>
              <p className="text-xs text-slate-600 mt-1">
                Track pre-defined KPIs. Capture real-world outcomes into an Evidence Passport for cross-state replication.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase font-mono text-[#D97706] tracking-wider">
              Core Product Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3A6B] mt-1.5">
              Built with Integrity, Rigor & Honest Scope
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePhilosophy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1B3A6B] flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 Functional Modules Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase font-mono text-emerald-700 tracking-wider">
              Consolidated Functional Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3A6B] mt-1.5">
              Seven Integrated Modules (M1–M7)
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#1B3A6B] hover:shadow-sm transition">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  {m.code}
                </span>
                <h4 className="font-bold text-xs text-slate-900 mt-2">{m.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3A6B] hover:bg-[#122849] text-white font-bold text-sm rounded-lg shadow-sm transition"
            >
              Enter the Live Platform
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 BhoomiConnect · Ministry of Rural Development · Department of Land Resources (DoLR)</p>
          <p className="text-slate-500">Smart India Hackathon 2026 · PS 26019</p>
        </div>
      </footer>
    </div>
  );
}
