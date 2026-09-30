'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import { InnovationItem } from '@/lib/data/sih-store';
import {
  Sparkles,
  Trophy,
  DollarSign,
  Layers,
  Calendar,
  Building,
  CheckCircle2,
  FileCheck2,
  Send,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function InnovationPortalPage() {
  const { innovationItems, addAuditLog, role } = useApp();
  const [selectedKind, setSelectedKind] = useState<string>('all');
  const [activeItemForEoI, setActiveItemForEoI] = useState<InnovationItem | null>(null);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalAbstract, setProposalAbstract] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const filteredItems = selectedKind === 'all'
    ? innovationItems
    : innovationItems.filter(i => i.kind === selectedKind);

  const handleOpenEoI = (item: InnovationItem) => {
    setActiveItemForEoI(item);
    setProposalTitle('');
    setProposalAbstract('');
    setSubmissionSuccess(null);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalTitle.trim() || !activeItemForEoI) return;

    addAuditLog(
      'INNOVATION_PROPOSAL_SUBMITTED',
      'InnovationProposal',
      proposalTitle,
      `Submitted Expression of Interest for "${activeItemForEoI.title}" by ${role}.`
    );

    setSubmissionSuccess(`Proposal "${proposalTitle}" submitted successfully for review!`);
    setTimeout(() => {
      setActiveItemForEoI(null);
      setSubmissionSuccess(null);
    }, 2500);
  };

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
              Module M6
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              PS ITEM 9: INNOVATION PORTAL
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Sparkles size={26} className="text-[#D97706]" />
            National Land Innovation Portal
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Connecting government land challenges with academic research grants, pilot calls, and technology hackathons to stimulate applied innovation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Open Calls' },
            { id: 'challenge', label: 'Grand Challenges' },
            { id: 'grant', label: 'Research Grants' },
            { id: 'pilot_call', label: 'Calls for Pilots' },
            { id: 'hackathon', label: 'Hackathons' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedKind(tab.id)}
              className={`px-3 py-1.5 rounded-full font-semibold cursor-pointer whitespace-nowrap transition ${
                selectedKind === tab.id
                  ? 'bg-[#1B3A6B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {submissionSuccess && (
        <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          {submissionSuccess}
        </div>
      )}

      {/* Innovation Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                <span className="px-2 py-0.5 rounded font-bold uppercase bg-amber-100 text-amber-900 border border-amber-200">
                  {item.kind.replace('_', ' ')}
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.status.toUpperCase()}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#1B3A6B] leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Issued by: <strong>{item.ownerOrg}</strong> · Category: <strong>{item.category}</strong>
              </p>

              <p className="text-xs text-slate-700 mt-3 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Grant / Funding</span>
                  <span className="font-mono font-bold text-slate-900">{item.grantAmount || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Deadline</span>
                  <span className="font-mono font-bold text-rose-700">{item.deadline}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {item.proposalsCount} Proposals Submitted
              </span>
              <button
                onClick={() => handleOpenEoI(item)}
                className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                Submit Proposal (EoI) <ArrowRight size={13} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Proposal Submission Modal */}
      {activeItemForEoI && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                  {activeItemForEoI.kind}
                </span>
                <h3 className="font-bold text-base text-[#1B3A6B] mt-1">
                  Expression of Interest: {activeItemForEoI.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItemForEoI(null)}
                className="text-slate-400 hover:text-slate-700 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Proposal Title / Solution Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Edge AI Farmland Boundary Detection for Indore District"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Abstract & Methodology Overview
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Summarize your data sources, computational model, and alignment with DoLR policy objectives..."
                  value={proposalAbstract}
                  onChange={(e) => setProposalAbstract(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B]"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <strong>Submission Integrity:</strong> Proposals enter the Review Queue and will be audited by designated technical evaluators before pilot matching.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveItemForEoI(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Submit Expression of Interest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
