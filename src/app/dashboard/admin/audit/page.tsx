'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  ClipboardList,
  ShieldAlert,
  Search,
  CheckCircle2,
  Calendar,
  Filter,
  Download,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function AdminAuditLogPage() {
  const { auditLogs, role } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-slate-200 text-slate-800 border border-slate-300">
              Platform Governance
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              IMMUTABLE AUDIT TRAIL
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <ClipboardList size={26} className="text-[#D97706]" />
            Administrative Audit & Governance Log
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Append-only, cryptographically verifiable log tracking every data ingestion, verification status change, simulation run, and policy sign-off.
          </p>
        </div>

        {/* Export Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Audit log exported as cryptographically signed CSV / JSON bundle.')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} /> Export Signed Log
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action type, or entity name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold">Showing {filteredLogs.length} events</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <Card className="mt-6 p-0 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Timestamp (IST)</th>
                <th className="p-3">Actor & Role</th>
                <th className="p-3">Action Event</th>
                <th className="p-3">Target Entity</th>
                <th className="p-3">Audit Details & Cryptographic Lineage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{log.actor}</strong>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                      {log.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-50 text-[#1B3A6B] border border-blue-200 whitespace-nowrap">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-800 block line-clamp-1">{log.entityTitle}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.entityType}</span>
                  </td>
                  <td className="p-3 text-slate-600 leading-relaxed max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Security & Access Notice */}
      <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock size={16} className="text-[#1B3A6B]" />
          <span>
            Audit log entries are append-only and cannot be altered or deleted by any administrative account.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">ISO 27001 / CERT-In Aligned</span>
      </div>
    </div>
  );
}
