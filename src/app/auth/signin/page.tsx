'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import { UserRole } from '@/lib/data/sih-store';
import {
  Shield,
  GraduationCap,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  UserCheck,
  ChevronRight,
  FileCheck2,
  Scale,
  Brain
} from 'lucide-react';

interface PersonaProfile {
  id: string;
  role: UserRole;
  category: string;
  name: string;
  title: string;
  institution: string;
  email: string;
  passwordDefault: string;
  icon: any;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    btn: string;
  };
  keyResponsibilities: string[];
  demoNote: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { setRole, addAuditLog } = useApp();

  const personas: PersonaProfile[] = [
    {
      id: 'policymaker',
      role: 'policymaker',
      category: 'Government Policymaker',
      name: 'Dr. Ramesh Kumar',
      title: 'State Land Policy Officer & Joint Secretary',
      institution: 'Department of Land Resources (DoLR), MoRD',
      email: 'ramesh.kumar@dolr.gov.in',
      passwordDefault: 'DoLR@Gov2026!',
      icon: Scale,
      colorScheme: {
        bg: 'bg-blue-50/70',
        border: 'border-blue-300',
        text: 'text-[#1B3A6B]',
        badge: 'bg-[#1B3A6B] text-white',
        btn: 'bg-[#1B3A6B] hover:bg-[#122849]'
      },
      keyResponsibilities: [
        'Formulate problem questions & define land diversion parameters',
        'Compare Policy Lab scenarios (Status Quo vs Smart Buffer)',
        'Sign-off on recommendations and commission 24-month field pilots'
      ],
      demoNote: 'Pre-configures Policy Lab Scenario C & Indore pilot access.'
    },
    {
      id: 'researcher',
      role: 'researcher',
      category: 'Academic & Research Institution',
      name: 'Dr. Priya Sharma',
      title: 'Senior Spatial Scientist & GIS Lead',
      institution: 'IIT Indore & SAC-ISRO Collaborative Lab',
      email: 'priya.sharma@iiti.ac.in',
      passwordDefault: 'Research@IIT2026#',
      icon: GraduationCap,
      colorScheme: {
        bg: 'bg-emerald-50/70',
        border: 'border-emerald-300',
        text: 'text-emerald-900',
        badge: 'bg-emerald-700 text-white',
        btn: 'bg-emerald-700 hover:bg-emerald-800'
      },
      keyResponsibilities: [
        'Upload multi-temporal Sentinel-2 LULC raster rasters & GCPs',
        'Identify Tier-2 peri-urban research deficits & literature gaps',
        'Co-author evidence synthesis in collaborative project workspaces'
      ],
      demoNote: 'Grants access to Knowledge Graph, RAG synthesis & datasets.'
    },
    {
      id: 'validator',
      role: 'validator',
      category: 'Department Reviewer & Validator',
      name: 'Dr. Anita Roy',
      title: 'Lead Evidence Validator & Cadastral Auditor',
      institution: 'National Institute of Rural Development (NIRDPR)',
      email: 'anita.roy@nirdpr.gov.in',
      passwordDefault: 'Audit@NIRD2026$',
      icon: Building2,
      colorScheme: {
        bg: 'bg-amber-50/70',
        border: 'border-amber-300',
        text: 'text-amber-950',
        badge: 'bg-[#D97706] text-white',
        btn: 'bg-[#D97706] hover:bg-amber-700'
      },
      keyResponsibilities: [
        'Audit source authenticity, license compliance & methodology',
        'Execute Review Gate sign-offs on Policy Lab assumptions',
        'Inspect immutable cryptographic administrative audit trails'
      ],
      demoNote: 'Unlocks the Evidence Validation Queue & Review Gate.'
    }
  ];

  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('policymaker');
  const [emailInput, setEmailInput] = useState<string>(personas[0].email);
  const [passwordInput, setPasswordInput] = useState<string>(personas[0].passwordDefault);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activePersona = personas.find(p => p.id === selectedPersonaId) || personas[0];

  const handleSelectPersona = (p: PersonaProfile) => {
    setSelectedPersonaId(p.id);
    setEmailInput(p.email);
    setPasswordInput(p.passwordDefault);
  };

  const handleInstantDemoLogin = (p: PersonaProfile) => {
    setIsLoading(true);
    setRole(p.role);
    addAuditLog(
      'USER_AUTHENTICATED',
      'UserSession',
      `${p.name} (${p.category})`,
      `Instant demo login executed for role: ${p.role.toUpperCase()} with institution: ${p.institution}`
    );

    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  const handleStandardFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInstantDemoLogin(activePersona);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans relative overflow-x-hidden selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Govt of India Tricolor Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1B3A6B] to-[#0D2447] flex items-center justify-center text-white font-bold text-xl shadow-md border border-blue-500/20">
              भू
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white tracking-tight">BhoomiConnect</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-400 text-slate-950 rounded">
                  SIH 26019 Single Sign-On
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Department of Land Resources · Ministry of Rural Development
              </p>
            </div>
          </Link>

          <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-white transition">
            ← Back to Platform Overview
          </Link>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center">
        
        {/* Title & Scope */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold mb-3">
            <Sparkles size={14} className="text-amber-400" />
            Role-Based Access Control (RBAC) Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Authenticate by Institutional Persona
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Select your persona below to log in with dedicated credentials or click 
            <strong className="text-amber-400 font-medium"> Instant 1-Click Demo Access</strong> to explore the platform with that persona's tailored permissions.
          </p>
        </div>

        {/* 3 Persona Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {personas.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPersonaId === p.id;

            return (
              <Card
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? `${p.colorScheme.bg} ${p.colorScheme.border} shadow-xl scale-[1.02]`
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800 text-white'
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
                    Active Selection
                  </span>
                )}

                <div>
                  {/* Persona Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                      isSelected ? 'bg-white shadow-blue-950/10' : 'bg-slate-700'
                    }`}>
                      <Icon size={24} className={isSelected ? p.colorScheme.text : 'text-slate-300'} />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        isSelected ? p.colorScheme.badge : 'bg-slate-700 text-slate-300'
                      }`}>
                        {p.category}
                      </span>
                      <h3 className={`text-base font-bold mt-1 ${isSelected ? 'text-slate-900' : 'text-white'}`}>
                        {p.name}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-xs font-semibold ${isSelected ? 'text-slate-700' : 'text-slate-300'}`}>
                    {p.title}
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-500' : 'text-slate-400'}`}>
                    {p.institution}
                  </p>

                  {/* Credentials Box */}
                  <div className={`mt-4 p-3 rounded-xl border text-xs font-mono space-y-1 ${
                    isSelected ? 'bg-white/80 border-slate-200 text-slate-800' : 'bg-slate-900/60 border-slate-750 text-slate-300'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Email:</span>
                      <span className="font-semibold truncate max-w-[190px]">{p.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Password:</span>
                      <span className="text-amber-600 font-bold">{p.passwordDefault}</span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mt-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                      isSelected ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      Key Module Authorities:
                    </span>
                    <ul className={`space-y-1 text-xs ${isSelected ? 'text-slate-600' : 'text-slate-400'}`}>
                      {p.keyResponsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 size={13} className={`flex-shrink-0 mt-0.5 ${isSelected ? 'text-emerald-600' : 'text-emerald-500'}`} />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 1-Click Instant Demo Button */}
                <div className="mt-6 pt-4 border-t border-slate-200/50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInstantDemoLogin(p);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition transform hover:-translate-y-0.5 text-white ${p.colorScheme.btn}`}
                  >
                    <UserCheck size={14} />
                    1-Click Demo Login as {p.role.toUpperCase()}
                    <ArrowRight size={13} />
                  </button>
                  <p className={`text-[10px] text-center mt-1.5 ${isSelected ? 'text-slate-500' : 'text-slate-400'}`}>
                    {p.demoNote}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Standard Manual Login Form Box (Pre-filled by selection) */}
        <div className="max-w-md mx-auto w-full">
          <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#1B3A6B]">
                  Direct Credential Login
                </h3>
                <p className="text-[11px] text-slate-500">
                  Pre-filled with credentials for: <strong>{activePersona.category}</strong>
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                {activePersona.role}
              </span>
            </div>

            <form onSubmit={handleStandardFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#1B3A6B] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#1B3A6B] font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#1B3A6B] hover:bg-[#122849] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
              >
                {isLoading ? 'Authenticating Persona...' : `Sign In as ${activePersona.category}`}
                <ArrowRight size={13} />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400">
                Mock Government Auth Mode active for Smart India Hackathon evaluation.
              </span>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 BhoomiConnect · Ministry of Rural Development · Department of Land Resources (DoLR)
      </footer>
    </div>
  );
}
