'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp, DEMO_TOUR_STEPS } from '@/lib/context/app-context';
import {
  Shield,
  Layers,
  Database,
  Share2,
  Brain,
  MapPin,
  Compass,
  FileCheck2,
  Users2,
  Sparkles,
  BarChart3,
  Award,
  BookOpen,
  Code2,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    setRole,
    region,
    setRegion,
    tourStep,
    startTour,
    nextTourStep,
    prevTourStep,
    jumpToTourStep,
    endTour
  } = useApp();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: BarChart3, badge: 'Home' },
    { label: 'M1 Knowledge Hub', href: '/dashboard/evidence', icon: Database, badge: 'Hub' },
    { label: 'M1 Knowledge Graph', href: '/dashboard/graph', icon: Share2, badge: 'Graph' },
    { label: 'M2 AI Assistant', href: '/dashboard/research', icon: Brain, badge: 'AI' },
    { label: 'M3 GIS Intelligence', href: '/dashboard/land-intelligence/gis', icon: Compass, badge: 'GIS' },
    { label: 'M4 Policy Lab', href: '/dashboard/policy-lab/design', icon: Layers, badge: 'Sim' },
    { label: 'M5 Pilot Tracker', href: '/dashboard/pilots', icon: FileCheck2, badge: 'Pilots' },
    { label: 'M5 Evidence Passports', href: '/dashboard/knowledge/passports', icon: Award, badge: 'Passports' },
    { label: 'M6 Workspaces', href: '/dashboard/workspaces', icon: Users2, badge: 'Teams' },
    { label: 'M6 Innovation Portal', href: '/dashboard/innovation', icon: Sparkles, badge: 'Grants' },
    { label: 'M7 Indicators', href: '/dashboard/evaluation/kpi-dashboard', icon: BarChart3, badge: 'KPIs' },
    { label: 'Validation Queue', href: '/dashboard/validation', icon: CheckCircle2, badge: 'Review' },
    { label: 'Admin Audit Log', href: '/dashboard/admin/audit', icon: ClipboardList, badge: 'Audit' },
    { label: 'OpenAPI Docs', href: '/dashboard/api-docs', icon: Code2, badge: 'API' },
  ];

  const currentTourStepObj = tourStep ? DEMO_TOUR_STEPS[tourStep - 1] : null;

  const handleNextTour = () => {
    if (tourStep && tourStep < DEMO_TOUR_STEPS.length) {
      const nextStepObj = DEMO_TOUR_STEPS[tourStep];
      nextTourStep();
      router.push(nextStepObj.route);
    } else {
      endTour();
    }
  };

  const handlePrevTour = () => {
    if (tourStep && tourStep > 1) {
      const prevStepObj = DEMO_TOUR_STEPS[tourStep - 2];
      prevTourStep();
      router.push(prevStepObj.route);
    }
  };

  const handleStartTour = () => {
    startTour();
    router.push(DEMO_TOUR_STEPS[0].route);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Govt of India Tricolor Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Main Official Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & National Platform Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1B3A6B] to-[#0D2447] flex items-center justify-center text-white font-bold shadow-md shadow-blue-950/20">
                <span className="text-xl">भू</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Link href="/dashboard" className="text-lg font-bold text-[#1B3A6B] hover:text-[#0F2847] tracking-tight">
                    BhoomiConnect
                  </Link>
                  <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase bg-amber-100 text-amber-900 rounded border border-amber-300">
                    SIH 26019
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                    DoLR · Min. of Rural Development
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  National Land Governance Research & Decision Intelligence Platform
                </p>
              </div>
            </div>

            {/* Region Selector, Interactive Role Switcher & Demo Tour Button */}
            <div className="flex items-center gap-3">
              {/* Region Selector */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-md">
                <MapPin size={14} className="text-[#D97706]" />
                <span className="text-slate-500">Region:</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
                >
                  <option value="Indore, Madhya Pradesh">Indore, MP (Flagship SIH Demo)</option>
                  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                  <option value="Bengaluru, Karnataka">Bengaluru, Karnataka</option>
                  <option value="All India (Aggregate)">All India (Aggregate)</option>
                </select>
              </div>

              {/* Role Switcher */}
              <div className="flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-300 px-2.5 py-1 rounded-md">
                <Shield size={14} className="text-[#1B3A6B]" />
                <span className="text-slate-500 hidden sm:inline">Role:</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="bg-transparent font-bold text-[#1B3A6B] outline-none cursor-pointer capitalize"
                >
                  <option value="policymaker">Policymaker (DoLR / Officer)</option>
                  <option value="researcher">Researcher (Academic / GIS)</option>
                  <option value="validator">Validator (Quality Reviewer)</option>
                  <option value="admin">Administrator (System / Audit)</option>
                </select>
              </div>

              {/* Link to 3-Persona Starting Page */}
              <Link
                href="/auth/signin"
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#1B3A6B] px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                title="Switch institutional persona or view demo credentials"
              >
                <Users2 size={13} className="text-[#1B3A6B]" />
                <span className="font-semibold">Personas / SSO</span>
              </Link>

              {/* 15-Step Interactive Guided Demo Tour Trigger */}
              <button
                onClick={handleStartTour}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-md text-xs font-semibold shadow transition shadow-amber-600/20"
                title="Launch 15-Step Demo matching Section 27 Indore Scenario"
              >
                <Play size={13} fill="white" />
                <span className="hidden sm:inline">SIH Walkthrough</span>
                <span className="sm:hidden">Tour</span>
              </button>

              <Link
                href="/discover"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B3A6B] hover:bg-[#122749] text-white rounded-md text-xs font-semibold shadow transition"
              >
                + New Question
              </Link>
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#1B3A6B] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#1B3A6B] hover:bg-slate-100'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Guided Tour Banner / Controller (Section 27) */}
      {tourStep !== null && currentTourStepObj && (
        <div className="bg-gradient-to-r from-[#1B3A6B] via-[#16325B] to-[#0F2847] text-white border-b-2 border-amber-400 py-3 px-4 shadow-md sticky top-[105px] z-30">
          <div className="max-w-[98rem] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow">
                {tourStep}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300 text-sm">
                    {currentTourStepObj.title}
                  </span>
                  <span className="px-2 py-0.2 text-[10px] uppercase font-bold bg-white/20 rounded">
                    Role: {currentTourStepObj.role}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Step {tourStep} of {DEMO_TOUR_STEPS.length}
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  {currentTourStepObj.description} <strong className="text-amber-200 font-medium">Instruction: {currentTourStepObj.actionInstruction}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={handlePrevTour}
                disabled={tourStep <= 1}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <button
                onClick={handleNextTour}
                className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs flex items-center gap-1 shadow cursor-pointer"
              >
                {tourStep === DEMO_TOUR_STEPS.length ? 'Finish Tour' : 'Next Step'} <ChevronRight size={14} />
              </button>
              <button
                onClick={endTour}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Exit Guided Tour"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {children}
      </main>

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-900 text-xs font-bold">भू</div>
                BhoomiConnect Platform
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Smart India Hackathon 2026 · Problem Statement 26019. Sits above DILRMP, Bhuvan, Bhu-Naksha, and VEDAS as the missing evidence-to-policy innovation layer.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Seven Core Modules</h4>
              <ul className="space-y-1 text-slate-400">
                <li>M1 Land Knowledge Hub & Graph</li>
                <li>M2 AI Research Assistant (RAG)</li>
                <li>M3 Land GIS Intelligence</li>
                <li>M4 Policy Lab (Scenario Sim)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Governance & Impact</h4>
              <ul className="space-y-1 text-slate-400">
                <li>M5 Pilot Tracker & Evidence Passport</li>
                <li>M6 Workspaces & Innovation Portal</li>
                <li>M7 National Indicator Dashboards</li>
                <li>Audit Logs & RBAC Validation Gate</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Key Integrity Principles</h4>
              <p className="text-slate-400 leading-relaxed">
                Decisions remain human. Provenance over scores. Strict 3-layer labelling everywhere: <span className="text-emerald-400 font-mono text-[10px]">[OBSERVED]</span>, <span className="text-amber-400 font-mono text-[10px]">[MODEL]</span>, <span className="text-blue-400 font-mono text-[10px]">[INTERPRETED]</span>.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[11px]">
            <p>© 2026 BhoomiConnect · Ministry of Rural Development · Department of Land Resources (DoLR)</p>
            <p>Designed for SIH 26019 · Prototype & Public Data Mode</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
