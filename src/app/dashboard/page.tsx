'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp, DEMO_TOUR_STEPS } from '@/lib/context/app-context';
import {
  BarChart3,
  Compass,
  Layers,
  Database,
  Share2,
  Brain,
  FileCheck2,
  Award,
  Users2,
  Sparkles,
  ShieldCheck,
  ClipboardList,
  Code2,
  ArrowRight,
  Play,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Sparkle
} from 'lucide-react';

export default function DashboardHome() {
  const { region, role, startTour, resources, pilots, workspaces } = useApp();

  const modules = [
    {
      moduleCode: 'M1',
      title: 'Land Knowledge Hub & Provenance',
      description: 'Unified repository of research, datasets, policies, and case studies with audited verification status.',
      icon: Database,
      href: '/dashboard/evidence',
      color: 'text-blue-600',
      badge: 'Repository'
    },
    {
      moduleCode: 'M1',
      title: 'Policy Knowledge Graph',
      description: 'Explore typed relationships linking Problems ↔ Evidence ↔ Scenarios ↔ Pilots ↔ Passports.',
      icon: Share2,
      href: '/dashboard/graph',
      color: 'text-emerald-600',
      badge: 'Graph'
    },
    {
      moduleCode: 'M2',
      title: 'AI Research Assistant (RAG)',
      description: 'Grounded literature synthesis with per-claim passage citations and research gap detection.',
      icon: Brain,
      href: '/dashboard/research',
      color: 'text-purple-600',
      badge: 'Synthesis'
    },
    {
      moduleCode: 'M3',
      title: 'Land GIS Spatial Intelligence',
      description: '6 decision layers for Indore showcase with time-series slider and click-to-evidence panel.',
      icon: Compass,
      href: '/dashboard/land-intelligence/gis',
      color: 'text-cyan-600',
      badge: 'Spatial'
    },
    {
      moduleCode: 'M4',
      title: 'Policy Lab: Scenario Comparison',
      description: 'Transparent simulation comparing Current Rules, Market Sprawl, and Smart Buffer + Infill.',
      icon: Layers,
      href: '/dashboard/policy-lab/design',
      color: 'text-amber-600',
      badge: 'Simulation'
    },
    {
      moduleCode: 'M5',
      title: 'Pilot Tracker & Pre-KPIs',
      description: 'Monitor real-world department execution with baselines and targets locked before pilot begins.',
      icon: FileCheck2,
      href: '/dashboard/pilots',
      color: 'text-rose-600',
      badge: 'Pilots'
    },
    {
      moduleCode: 'M5',
      title: 'Evidence Passports (Vault)',
      description: 'Reusable institutional memory capturing outcomes and cross-state transferability rules.',
      icon: Award,
      href: '/dashboard/knowledge/passports',
      color: 'text-amber-700',
      badge: 'Reuse Loop'
    },
    {
      moduleCode: 'M6',
      title: 'Collaborative Workspaces',
      description: 'Multi-disciplinary project workspaces connecting Policymakers, GIS Experts, and Town Planners.',
      icon: Users2,
      href: '/dashboard/workspaces',
      color: 'text-indigo-600',
      badge: 'Teams'
    },
    {
      moduleCode: 'M6',
      title: 'National Innovation Portal',
      description: 'Government challenges, research grants, hackathons, and calls for municipal pilots.',
      icon: Sparkles,
      href: '/dashboard/innovation',
      color: 'text-fuchsia-600',
      badge: 'Grants'
    },
    {
      moduleCode: 'M7',
      title: 'Approved Indicator Dashboards',
      description: 'Multi-domain trends across land use, research index, climate metrics, and aggregate disputes.',
      icon: BarChart3,
      href: '/dashboard/evaluation/kpi-dashboard',
      color: 'text-teal-600',
      badge: 'Indicators'
    },
    {
      moduleCode: 'GATE',
      title: 'Evidence Validation Queue',
      description: 'Validator review gate auditing methodology, data authenticity, and compliance before sign-off.',
      icon: ShieldCheck,
      href: '/dashboard/validation',
      color: 'text-emerald-700',
      badge: 'Quality Gate'
    },
    {
      moduleCode: 'API',
      title: 'REST API & OpenAPI Docs',
      description: 'Documented integration endpoints for DILRMP, Bhu-Naksha, Bhuvan, and university researchers.',
      icon: Code2,
      href: '/dashboard/api-docs',
      color: 'text-slate-700',
      badge: 'OpenAPI'
    }
  ];

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Flagship Guided Walkthrough Hero Banner (Section 27) */}
      <div className="bg-gradient-to-r from-[#1B3A6B] via-[#16386B] to-[#0A1E3D] rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-10 border border-blue-950/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-amber-400 text-slate-950 shadow-xs">
              SIH 26019 National Showcase
            </span>
            <span className="text-xs text-slate-300 font-mono">
              DoLR · Ministry of Rural Development
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            National Land Governance Research & Decision Intelligence Platform
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            Connecting fragmented land records, satellite datasets, academic research, and policy experiments into an end-to-end evidence-to-policy loop: 
            <strong className="text-amber-300 font-medium"> Question → Evidence → Analysis → Scenario → Pilot → Reusable Passport.</strong>
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={startTour}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-md cursor-pointer transition transform hover:-translate-y-0.5"
            >
              <Play size={14} fill="currentColor" />
              Launch Complete 15-Step Guided Demo (Section 27)
            </button>

            <Link
              href="/discover"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              Start Natural Language Question <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Decorative Badge on Right */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
          <span className="text-[140px] font-black text-white select-none">भू</span>
        </div>
      </div>

      {/* Quick Summary KPI Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold uppercase">Verified Evidence Records</span>
          <p className="text-2xl font-bold text-[#1B3A6B] mt-1">{resources.length}</p>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
            <CheckCircle2 size={12} /> 100% Provenance Audited
          </span>
        </Card>

        <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold uppercase">Active Policy Pilots</span>
          <p className="text-2xl font-bold text-[#D97706] mt-1">{pilots.length}</p>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">
            Pre-defined baseline KPIs
          </span>
        </Card>

        <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold uppercase">Institutional Passports</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">3</p>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">
            Ready for cross-state reuse
          </span>
        </Card>

        <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-slate-500 text-xs font-semibold uppercase">Active Workspaces</span>
          <p className="text-2xl font-bold text-indigo-700 mt-1">{workspaces.length}</p>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">
            Multi-disciplinary teams
          </span>
        </Card>
      </div>

      {/* 7 Functional Modules Grid (M1 to M7) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#1B3A6B]">
              Functional Modules (M1–M7)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Consolidated architecture meeting all 12 SIH 26019 capabilities.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">12 Core Capabilities</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <Link key={idx} href={m.href}>
                <Card className="p-5 h-full rounded-xl border border-slate-200 bg-white hover:border-[#1B3A6B] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition">
                        <Icon size={20} className={`${m.color}`} />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 group-hover:bg-[#1B3A6B] group-hover:text-white transition">
                        {m.moduleCode} · {m.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#1B3A6B] transition">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#D97706] group-hover:text-[#1B3A6B] transition">
                    <span>Access Module</span>
                    <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Flagship Demonstration Box (Section 27 Indore Scenario) */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
              Flagship End-to-End Walkthrough
            </span>
            <h3 className="text-lg font-bold text-[#1B3A6B] mt-1.5">
              Indore Agricultural Land Conversion & Smart Infill Scenario
            </h3>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              Step through the exact 15-stage workflow described in Section 27: From natural language query discovery in Indore, parallel evidence validation, GIS corridor mapping, 3-scenario Policy Lab simulation, review gate, to pilot commissioning and Evidence Passport reuse!
            </p>
          </div>

          <button
            onClick={startTour}
            className="px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <Play size={13} fill="white" /> Run 15-Step Tour
          </button>
        </div>
      </Card>
    </div>
  );
}
