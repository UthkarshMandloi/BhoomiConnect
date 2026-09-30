'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import { SIHResource, ResourceType, VerificationStatus } from '@/lib/data/sih-store';
import {
  Database,
  BookOpen,
  FileText,
  Map,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Filter,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Building,
  Calendar,
  Compass,
  Award
} from 'lucide-react';

export default function EvidenceExplorerPage() {
  const { resources, region } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<SIHResource | null>(null);

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'all' || res.type === selectedType;
    const matchesVerified = !verifiedOnly || res.verificationStatus === 'verified' || res.verificationStatus === 'verified_with_notes';

    return matchesSearch && matchesType && matchesVerified;
  });

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 size={12} /> Verified
          </span>
        );
      case 'verified_with_notes':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
            <AlertCircle size={12} /> Verified with Notes
          </span>
        );
      case 'under_review':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
            <Clock size={12} /> Under Review
          </span>
        );
      case 'submitted':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1">
            <Clock size={12} /> Submitted Draft
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
            Rejected
          </span>
        );
    }
  };

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'research': return <BookOpen size={16} className="text-blue-600" />;
      case 'dataset': return <Database size={16} className="text-emerald-600" />;
      case 'policy': return <FileText size={16} className="text-purple-600" />;
      case 'gis_layer': return <Compass size={16} className="text-cyan-600" />;
      case 'passport': return <Award size={16} className="text-amber-600" />;
      default: return <FileText size={16} className="text-slate-600" />;
    }
  };

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
              Module M1
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              PROVENANCE & INTEGRITY SYSTEM
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Database size={26} className="text-[#D97706]" />
            Land Knowledge Hub — Evidence Explorer
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Central repository of peer-reviewed research, datasets, GIS layers, statutory policies, and prior Evidence Passports with audited provenance.
          </p>
        </div>

        {/* Links to Graph & Validation */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/dashboard/graph"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-300 transition"
          >
            View Knowledge Graph
          </Link>
          <Link
            href="/dashboard/validation"
            className="px-3 py-2 bg-[#1B3A6B] hover:bg-[#122749] text-white font-semibold rounded-lg transition"
          >
            Validator Review Queue
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by keyword, author, topic, or region (e.g. Vertisols, Indore, LULC)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B]"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'research', label: 'Research' },
            { id: 'dataset', label: 'Datasets' },
            { id: 'policy', label: 'Policies' },
            { id: 'gis_layer', label: 'GIS Layers' },
            { id: 'passport', label: 'Passports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer whitespace-nowrap transition ${
                selectedType === tab.id
                  ? 'bg-[#1B3A6B] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Verified Only Toggle */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-xs whitespace-nowrap">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold select-none">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#1B3A6B] accent-[#1B3A6B]"
            />
            <span>Verified Evidence Only</span>
          </label>
        </div>
      </div>

      {/* Main Evidence Grid */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Resource Cards (8 cols or 12 cols depending on drawer) */}
        <div className={selectedResource ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700">
              Showing {filteredResources.length} verified records
            </span>
            <span className="text-[11px] text-slate-400">
              Provenance adheres to SIH Section 17 standard
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredResources.map((res) => (
              <Card
                key={res.id}
                onClick={() => setSelectedResource(res)}
                className={`p-5 rounded-xl border cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${
                  selectedResource?.id === res.id
                    ? 'border-2 border-[#1B3A6B] bg-blue-50/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-slate-600 font-mono">
                      {getTypeIcon(res.type)}
                      {res.type.replace('_', ' ')}
                    </span>
                    {getStatusBadge(res.verificationStatus)}
                  </div>

                  <h3 className="font-bold text-sm text-[#1B3A6B] line-clamp-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {res.abstract}
                  </p>

                  {/* "Why Relevant" Rationale Banner (Section 14 & 27) */}
                  {res.whyRelevant && (
                    <div className="mt-3 p-2 rounded-md bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
                      <strong className="text-amber-800">Why Relevant:</strong> {res.whyRelevant}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {res.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        #{tag}
                      </span>
                    ))}
                    {res.tags.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{res.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[180px]">{res.publisher}</span>
                  <span className="font-mono text-slate-400">{res.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Provenance Detail Inspector Drawer (5 cols) */}
        {selectedResource && (
          <div className="lg:col-span-5">
            <Card className="p-6 bg-white border border-slate-300 rounded-xl shadow-lg sticky top-28">
              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    ID: {selectedResource.id} · {selectedResource.type}
                  </span>
                  <div className="mt-1">
                    {getStatusBadge(selectedResource.verificationStatus)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <h2 className="text-base font-bold text-[#1B3A6B] mt-3 leading-snug">
                {selectedResource.title}
              </h2>

              {/* Strict Labelling Tag */}
              <div className="mt-2">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-300">
                  [{selectedResource.dataStatusLabel}]
                </span>
              </div>

              {/* Provenance Attributes Table */}
              <div className="mt-4 space-y-2.5 text-xs text-slate-700 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Author / Publisher:</span>
                  <span className="font-semibold text-right max-w-[240px]">{selectedResource.publisher}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Institutional Source:</span>
                  <span className="font-semibold text-right max-w-[240px]">{selectedResource.source}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Coverage Period:</span>
                  <span className="font-mono font-semibold">{selectedResource.coveragePeriod}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Target Geography:</span>
                  <span className="font-semibold">{selectedResource.region}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">License / Reuse Terms:</span>
                  <span className="font-mono text-emerald-700 font-semibold">{selectedResource.license}</span>
                </div>
                {selectedResource.doiOrUrl && (
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500">Citation / Traceability:</span>
                    <a
                      href={selectedResource.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      DOI / Link <ExternalLink size={10} />
                    </a>
                  </div>
                )}
              </div>

              {/* Methodology Summary */}
              {selectedResource.methodologySummary && (
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <h4 className="text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Methodology & Data Lineage
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedResource.methodologySummary}
                  </p>
                </div>
              )}

              {/* Known Limitations */}
              <div className="mt-3 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Known Limitations:</span>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {selectedResource.knownLimitations}
                </p>
              </div>

              {/* Reviewer Audit Notes */}
              {selectedResource.reviewerNotes && (
                <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <span className="font-bold flex items-center gap-1 mb-0.5">
                    <ShieldCheck size={14} className="text-emerald-700" />
                    Validator Verification Trail:
                  </span>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    {selectedResource.reviewerNotes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-200 flex gap-2">
                <Link
                  href="/dashboard/policy-lab/design"
                  className="flex-1 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg text-center shadow-xs"
                >
                  Use in Policy Lab
                </Link>
                <Link
                  href="/dashboard/graph"
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300"
                >
                  View in Graph
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
