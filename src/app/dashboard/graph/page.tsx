'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  INITIAL_GRAPH_NODES,
  INITIAL_GRAPH_EDGES,
  GraphNode,
  GraphEdge
} from '@/lib/data/sih-store';
import {
  Share2,
  Filter,
  Info,
  CheckCircle2,
  ExternalLink,
  Layers,
  FileText,
  Database,
  Award,
  Compass
} from 'lucide-react';

export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(INITIAL_GRAPH_NODES[0]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredNodes = activeFilter === 'all'
    ? INITIAL_GRAPH_NODES
    : INITIAL_GRAPH_NODES.filter(n => n.group.toLowerCase() === activeFilter.toLowerCase());

  const nodePositions: Record<string, { x: number; y: number }> = {
    'prob-01': { x: 400, y: 220 },
    'res-paper-01': { x: 230, y: 110 },
    'res-paper-02': { x: 190, y: 220 },
    'res-paper-03': { x: 240, y: 340 },
    'res-paper-04': { x: 150, y: 410 },
    'res-paper-05': { x: 120, y: 90 },
    'res-data-01': { x: 380, y: 70 },
    'res-data-02': { x: 380, y: 390 },
    'res-data-03': { x: 540, y: 80 },
    'res-policy-01': { x: 290, y: 270 },
    'res-policy-02': { x: 620, y: 380 },
    'res-gis-01': { x: 530, y: 150 },
    'res-gis-03': { x: 620, y: 110 },
    'scen-01': { x: 540, y: 230 },
    'scen-02': { x: 580, y: 270 },
    'scen-03': { x: 620, y: 210 },
    'pilot-01': { x: 700, y: 310 },
    'res-passport-01': { x: 670, y: 440 }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'problem': return '#D97706';
      case 'research': return '#2563EB';
      case 'dataset': return '#059669';
      case 'policy': return '#7C3AED';
      case 'gis_layer': return '#0284C7';
      case 'scenario': return '#EA580C';
      case 'pilot': return '#DC2626';
      case 'passport': return '#B45309';
      default: return '#64748B';
    }
  };

  const connectedEdges = INITIAL_GRAPH_EDGES.filter(
    e => e.source === selectedNode.id || e.target === selectedNode.id
  );

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
              Module M1
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-blue-100 text-blue-800 border border-blue-200">
              KNOWLEDGE GRAPH RELATIONSHIP LAYER
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Share2 size={26} className="text-[#D97706]" />
            Policy Knowledge Graph Explorer
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Interconnected network connecting Land Problems ↔ Verified Evidence ↔ Scenarios ↔ Pilots ↔ Evidence Passports.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <Filter size={14} className="text-slate-500 mr-1" />
          {['all', 'Problem', 'Research', 'Data', 'Policy', 'GIS', 'Scenario', 'Pilot', 'Passport'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-2.5 py-1 rounded-full font-semibold cursor-pointer whitespace-nowrap transition ${
                activeFilter === tab
                  ? 'bg-[#1B3A6B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Canvas on Left, Details Drawer on Right */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Graph Canvas (8 cols) */}
        <div className="lg:col-span-8">
          <Card className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl min-h-[560px] flex flex-col">
            
            <div className="bg-slate-900/90 backdrop-blur px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2 font-bold text-white">
                <Share2 size={14} className="text-amber-400" />
                Evidence-to-Policy Network ({filteredNodes.length} Nodes, {INITIAL_GRAPH_EDGES.length} Typed Relations)
              </span>
              <span>Click any node to inspect relationship lineage</span>
            </div>

            <div className="relative flex-1 bg-[#050c18] overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 820 500" className="w-full h-full max-h-[500px]">
                <defs>
                  {/* Arrow marker for edges */}
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="14"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#64748B" opacity="0.8" />
                  </marker>
                  <marker
                    id="arrowheadActive"
                    markerWidth="8"
                    markerHeight="6"
                    refX="14"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#F59E0B" />
                  </marker>
                </defs>

                {/* Edges */}
                {INITIAL_GRAPH_EDGES.map((edge) => {
                  const s = nodePositions[edge.source];
                  const t = nodePositions[edge.target];
                  if (!s || !t) return null;

                  const isConnected = selectedNode.id === edge.source || selectedNode.id === edge.target;

                  return (
                    <g key={edge.id}>
                      <line
                        x1={s.x}
                        y1={s.y}
                        x2={t.x}
                        y2={t.y}
                        stroke={isConnected ? '#F59E0B' : '#334155'}
                        strokeWidth={isConnected ? 2.5 : 1.2}
                        strokeDasharray={isConnected ? 'none' : '3 3'}
                        opacity={isConnected ? 0.9 : 0.4}
                        markerEnd={isConnected ? 'url(#arrowheadActive)' : 'url(#arrowhead)'}
                      />
                      {isConnected && (
                        <text
                          x={(s.x + t.x) / 2}
                          y={(s.y + t.y) / 2 - 4}
                          fill="#FDE68A"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {edge.relation}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {filteredNodes.map((node) => {
                  const pos = nodePositions[node.id];
                  if (!pos) return null;

                  const isSelected = selectedNode.id === node.id;
                  const color = getNodeColor(node.type);

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      {/* Pulse circle if selected */}
                      {isSelected && (
                        <circle r="22" fill="none" stroke="#F59E0B" strokeWidth="2.5" className="animate-ping" opacity="0.6" />
                      )}

                      <circle
                        r={node.type === 'problem' ? 18 : 13}
                        fill={color}
                        stroke={isSelected ? '#FFFFFF' : '#0F172A'}
                        strokeWidth={isSelected ? 3 : 1.5}
                        className="shadow-lg"
                      />

                      <text
                        y={node.type === 'problem' ? 30 : 24}
                        fill={isSelected ? '#FDE68A' : '#CBD5E1'}
                        fontSize={isSelected ? '11' : '9.5'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                      >
                        {node.label.length > 22 ? node.label.slice(0, 20) + '...' : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend Overlay */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-800 p-2.5 rounded-lg text-[10px] space-y-1 text-slate-300">
                <span className="font-bold text-white block mb-1">Entity Taxonomy:</span>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D97706]"></span> Problem</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> Research Paper</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#059669]"></span> Dataset</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span> Policy Record</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EA580C]"></span> Scenario</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#DC2626]"></span> Pilot Plan</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B45309]"></span> Passport</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Node Relationship Inspector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Card className="p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono">
                  {selectedNode.type}
                </span>
                <h3 className="font-bold text-base text-[#1B3A6B] mt-1.5">
                  {selectedNode.label}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">ID: {selectedNode.id}</span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Connected Relations ({connectedEdges.length})</h4>
                <div className="space-y-2 mt-2">
                  {connectedEdges.map((e) => {
                    const otherNodeId = e.source === selectedNode.id ? e.target : e.source;
                    const otherNode = INITIAL_GRAPH_NODES.find(n => n.id === otherNodeId);
                    const isOutgoing = e.source === selectedNode.id;

                    return (
                      <div
                        key={e.id}
                        onClick={() => otherNode && setSelectedNode(otherNode)}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 cursor-pointer transition text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-[#D97706]">
                            {isOutgoing ? `──(${e.relation})──►` : `◄──(${e.relation})──`}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">{otherNode?.type}</span>
                        </div>
                        <p className="font-semibold text-slate-800 mt-1 line-clamp-1">{otherNode?.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Learning Loop Callout */}
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <span className="font-bold block flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-700" />
                  Knowledge Reuse Loop Active
                </span>
                <p className="text-[11px] text-emerald-800 leading-tight">
                  This node links directly into the Evidence Passport institutional memory database, making prior intervention outcomes searchable by other districts.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
