'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import { WorkspaceItem } from '@/lib/data/sih-store';
import {
  Users2,
  CheckCircle2,
  Clock,
  Plus,
  MessageSquare,
  FileText,
  Send,
  Building,
  Shield,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function WorkspacesPage() {
  const { workspaces, role, region, resources } = useApp();
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceItem>(workspaces[0]);
  const [newComment, setNewComment] = useState('');
  const [discussions, setDiscussions] = useState(selectedWorkspace.discussions);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: `c-${Date.now()}`,
      author: role === 'policymaker' ? 'Dr. Ramesh Kumar' :
              role === 'validator' ? 'Dr. Anita Roy' :
              role === 'researcher' ? 'Dr. Priya Sharma' : 'Admin Officer',
      role: role.charAt(0).toUpperCase() + role.slice(1),
      time: 'Just now',
      text: newComment.trim()
    };

    setDiscussions(prev => [commentObj, ...prev]);
    setNewComment('');
  };

  const sharedResources = resources.filter(r =>
    selectedWorkspace.evidenceIds.includes(r.id)
  );

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
              PS ITEM 3: COLLABORATIVE WORKSPACES
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Users2 size={26} className="text-[#D97706]" />
            Multi-Disciplinary Project Workspaces
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Cross-departmental collaboration connecting Policymakers, GIS Specialists, Academic Researchers, and Quality Validators in a shared decision environment.
          </p>
        </div>

        {/* Create Workspace CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/innovation"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200"
          >
            Innovation Portal
          </Link>
          <button className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer">
            <Plus size={14} /> New Workspace
          </button>
        </div>
      </div>

      {/* Main Grid: Workspaces List (4 cols) and Workspace Detail (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Workspaces List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Card className="p-4 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-xs uppercase text-[#1B3A6B]">
                Active Workspaces ({workspaces.length})
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                Multi-Agency
              </span>
            </div>

            <div className="space-y-3">
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => {
                    setSelectedWorkspace(ws);
                    setDiscussions(ws.discussions);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedWorkspace.id === ws.id
                      ? 'border-2 border-[#1B3A6B] bg-blue-50/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-slate-500 uppercase">{ws.region}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                      {ws.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 leading-snug">{ws.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{ws.problemTitle}</p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{ws.members.length} Members</span>
                    <span>{ws.tasks.length} Tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Workspace Team, Tasks, Evidence & Discussion (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6 bg-white border border-slate-200 shadow-sm">
            {/* Header info */}
            <div className="pb-4 border-b border-slate-200">
              <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                {selectedWorkspace.region}
              </span>
              <h2 className="text-lg font-bold text-[#1B3A6B] mt-1.5">
                {selectedWorkspace.name}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Mandate: {selectedWorkspace.problemTitle}
              </p>
            </div>

            {/* Team Members Chips */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-2">
                Team Members & Roles ({selectedWorkspace.members.length})
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {selectedWorkspace.members.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-xs">
                      {m.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{m.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shared Evidence Collection */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                  Shared Evidence Set ({sharedResources.length})
                </h4>
                <Link href="/dashboard/evidence" className="text-xs text-[#D97706] font-bold hover:underline">
                  Browse Hub +
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {sharedResources.map((res) => (
                  <div key={res.id} className="p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="uppercase font-mono font-bold text-slate-500">{res.type}</span>
                      <span className="text-emerald-700 font-bold">{res.verificationStatus}</span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-800 line-clamp-1">{res.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{res.publisher}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Board */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-2.5">
                Task Management Board ({selectedWorkspace.tasks.length} Tasks)
              </h4>
              <div className="space-y-2">
                {selectedWorkspace.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${
                        task.status === 'done' ? 'bg-emerald-500' :
                        task.status === 'in_progress' ? 'bg-amber-500' : 'bg-slate-300'
                      }`} />
                      <span className={`font-semibold text-slate-800 ${task.status === 'done' ? 'line-through text-slate-400' : ''}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 whitespace-nowrap">
                      <span>Assigned: <strong>{task.assignedTo}</strong></span>
                      <span className="font-mono text-slate-400">Due: {task.dueDate}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        task.status === 'done' ? 'bg-emerald-100 text-emerald-800' :
                        task.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inter-Agency Discussion Thread (Section 27 Step 6) */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-3 flex items-center gap-2">
                <MessageSquare size={16} className="text-[#D97706]" />
                Inter-Agency Deliberation Thread ({discussions.length})
              </h4>

              <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                {discussions.map((c) => (
                  <div key={c.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{c.author}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                          {c.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input Form */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contribute expert comment, spatial finding, or validation note..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#1B3A6B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#122849] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Send size={13} /> Post
                </button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
