'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import { SIHResource, VerificationStatus } from '@/lib/data/sih-store';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  ExternalLink,
  Info,
  FileCheck2,
  ArrowRight,
  BookOpen,
  Database
} from 'lucide-react';

export default function ValidationQueuePage() {
  const { resources, verifyResource, role } = useApp();
  const [selectedItem, setSelectedItem] = useState<SIHResource | null>(
    resources.find(r => r.verificationStatus === 'under_review' || r.verificationStatus === 'submitted') || resources[0]
  );
  const [reviewerNote, setReviewerNote] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const pendingItems = resources.filter(
    r => r.verificationStatus === 'under_review' || r.verificationStatus === 'submitted'
  );

  const verifiedItems = resources.filter(
    r => r.verificationStatus === 'verified' || r.verificationStatus === 'verified_with_notes'
  );

  const handleAction = (status: VerificationStatus) => {
    if (!selectedItem) return;
    const note = reviewerNote.trim() || `Status updated to ${status} by ${role}. Provenance and data lineage audited.`;
    verifyResource(selectedItem.id, status, note);
    setSuccessToast(`Record "${selectedItem.title.slice(0, 35)}..." updated to ${status.toUpperCase()}`);
    setReviewerNote('');
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
              Platform Governance
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              STAGE 3: EVIDENCE VALIDATION GATE
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <ShieldCheck size={26} className="text-[#D97706]" />
            Evidence Quality & Provenance Review Queue
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Validation is a gate, not an assumption. Evidence must be audited for source authenticity, methodology, and license before being cited in policy decisions.
          </p>
        </div>

        {/* Role Notice */}
        <div className="flex items-center gap-2 text-xs bg-slate-100 p-2.5 rounded-lg border border-slate-200">
          <span className="text-slate-500">Current Role:</span>
          <span className="font-bold text-[#1B3A6B] uppercase font-mono">{role}</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">Review authority active</span>
        </div>
      </div>

      {successToast && (
        <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 size={16} />
          {successToast}
        </div>
      )}

      {/* Main Grid: Pending List (4 cols) and Inspector (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left: Pending & Verified Lists (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <Card className="p-4 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-xs uppercase text-[#1B3A6B] flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                Awaiting Verification ({pendingItems.length})
              </h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                Action Required
              </span>
            </div>

            <div className="space-y-2">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    selectedItem?.id === item.id
                      ? 'border-[#1B3A6B] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="uppercase text-slate-500 font-bold">{item.type}</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                      {item.verificationStatus}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-2">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{item.publisher}</p>
                </div>
              ))}
              {pendingItems.length === 0 && (
                <p className="text-xs text-slate-400 py-3 text-center">No pending items in queue</p>
              )}
            </div>
          </Card>

          {/* Already Verified Records */}
          <Card className="p-4 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-xs uppercase text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Audited & Approved Records ({verifiedItems.length})
              </h3>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {verifiedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition text-xs ${
                    selectedItem?.id === item.id
                      ? 'border-emerald-600 bg-emerald-50/40'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="font-semibold text-slate-800 line-clamp-1">{item.title}</h4>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{item.publisher}</span>
                    <span className="text-emerald-700 font-bold">{item.verificationStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Detailed Reviewer Audit Inspection & Actions (8 cols) */}
        <div className="lg:col-span-8">
          {selectedItem ? (
            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700">
                      Type: {selectedItem.type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-800">
                      ID: {selectedItem.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800">
                      Status: {selectedItem.verificationStatus}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#1B3A6B] mt-2">
                    {selectedItem.title}
                  </h2>
                </div>
              </div>

              {/* Provenance Fields Table */}
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <div>
                    <span className="text-slate-500 block">Institution / Author:</span>
                    <strong className="text-slate-900">{selectedItem.publisher}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Source Body:</span>
                    <span className="text-slate-800">{selectedItem.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Temporal Coverage:</span>
                    <span className="font-mono text-slate-800">{selectedItem.coveragePeriod}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <div>
                    <span className="text-slate-500 block">Geographic Scope:</span>
                    <strong className="text-slate-900">{selectedItem.region}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">License / Reuse Terms:</span>
                    <span className="font-mono text-emerald-700 font-semibold">{selectedItem.license}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Labelling Standard:</span>
                    <span className="font-mono font-bold text-slate-900">[{selectedItem.dataStatusLabel}]</span>
                  </div>
                </div>
              </div>

              {/* Abstract */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Abstract / Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {selectedItem.abstract}
                </p>
              </div>

              {/* Methodology & Lineage */}
              {selectedItem.methodologySummary && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
                    Declared Methodology & Ground Truth Lineage
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-200">
                    {selectedItem.methodologySummary}
                  </p>
                </div>
              )}

              {/* Known Limitations */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Author-Stated Limitations</h4>
                <p className="text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  {selectedItem.knownLimitations}
                </p>
              </div>

              {/* Existing Reviewer Notes */}
              {selectedItem.reviewerNotes && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-1">
                    Existing Audit Notes
                  </h4>
                  <p className="text-xs text-emerald-900 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    {selectedItem.reviewerNotes}
                  </p>
                </div>
              )}

              {/* Validator Action Decision Box */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <h4 className="text-xs font-bold text-[#1B3A6B] uppercase tracking-wide mb-2">
                  Validator Verification Gate Decision
                </h4>
                
                <textarea
                  rows={2}
                  value={reviewerNote}
                  onChange={(e) => setReviewerNote(e.target.value)}
                  placeholder="Enter formal validator audit notes, caveats, or ground truth verification details..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B] font-sans"
                />

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <button
                    onClick={() => handleAction('verified')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 size={14} /> Approve as Verified
                  </button>

                  <button
                    onClick={() => handleAction('verified_with_notes')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <AlertCircle size={14} /> Approve with Notes
                  </button>

                  <button
                    onClick={() => handleAction('rejected')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <XCircle size={14} /> Reject / Return for Correction
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center text-slate-400">
              <ShieldCheck size={48} className="mx-auto mb-3 opacity-40" />
              <p>Select a record from the left to inspect and audit its provenance</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
