'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  Map,
  Layers,
  Info,
  Calendar,
  Compass,
  FileText,
  Database,
  ExternalLink,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface DecisionLayer {
  id: string;
  name: string;
  category: string;
  active: boolean;
  color: string;
  hex: string;
  decisionSupported: string;
  sourceStatus: 'OBSERVED DATA' | 'MODEL OUTPUT' | 'POLICY INTERPRETATION';
  linkedEvidenceIds: string[];
  opacity: number;
}

export default function GISExplorerPage() {
  const { region, resources } = useApp();
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeZone, setActiveZone] = useState<string>('Sanwer-Depalpur Corridor');
  const [selectedLayerForEvidence, setSelectedLayerForEvidence] = useState<string | null>('layer-1');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const [layers, setLayers] = useState<DecisionLayer[]>([
    {
      id: 'layer-1',
      name: '1. Land Use / Land Cover (LULC)',
      category: 'Base Land Use',
      active: true,
      color: 'bg-emerald-500',
      hex: '#10B981',
      decisionSupported: 'Quantifies agricultural vs built-up proportion and historical diversion rate.',
      sourceStatus: 'OBSERVED DATA',
      linkedEvidenceIds: ['res-data-01', 'res-paper-01'],
      opacity: 85
    },
    {
      id: 'layer-2',
      name: '2. Urban Expansion Corridors',
      category: 'Sprawl Tracking',
      active: true,
      color: 'bg-rose-500',
      hex: '#F43F5E',
      decisionSupported: 'Identifies directional vectors along Super Corridor and Ring Road II.',
      sourceStatus: 'OBSERVED DATA',
      linkedEvidenceIds: ['res-paper-01', 'res-gis-02'],
      opacity: 90
    },
    {
      id: 'layer-3',
      name: '3. Prime Farmland Buffer (Vertisols)',
      category: 'Soil Preservation',
      active: true,
      color: 'bg-amber-500',
      hex: '#F59E0B',
      decisionSupported: 'Demarcates Class I/II double-cropped soils prioritized for protection.',
      sourceStatus: 'OBSERVED DATA',
      linkedEvidenceIds: ['res-data-03', 'res-paper-06'],
      opacity: 75
    },
    {
      id: 'layer-4',
      name: '4. Climate & Heat Vulnerability',
      category: 'Ecological Risk',
      active: false,
      color: 'bg-orange-500',
      hex: '#FB923C',
      decisionSupported: 'Measures impervious surface thermal runoff and flood exposure.',
      sourceStatus: 'OBSERVED DATA',
      linkedEvidenceIds: ['res-paper-03'],
      opacity: 70
    },
    {
      id: 'layer-5',
      name: '5. Water Recharge Catchment Zones',
      category: 'Hydrological Security',
      active: false,
      color: 'bg-cyan-500',
      hex: '#06B6D4',
      decisionSupported: 'Flags critical aquifer zones where land conversion induces water table depletion.',
      sourceStatus: 'OBSERVED DATA',
      linkedEvidenceIds: ['res-data-02', 'res-paper-03'],
      opacity: 80
    },
    {
      id: 'layer-6',
      name: '6. Master Plan 2035 Infill & Transit',
      category: 'Planning Scenarios',
      active: true,
      color: 'bg-indigo-500',
      hex: '#6366F1',
      decisionSupported: 'Channels new residential growth into interior brownfield vacancies.',
      sourceStatus: 'MODEL OUTPUT',
      linkedEvidenceIds: ['res-gis-05', 'res-passport-01'],
      opacity: 70
    }
  ]);

  const toggleLayer = (id: string) => {
    setLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const selectedLayerObj = layers.find(l => l.id === selectedLayerForEvidence);
  const linkedResources = resources.filter(r =>
    selectedLayerObj?.linkedEvidenceIds.includes(r.id)
  );

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
              Module M3
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              OBSERVED DATA & DECISION LAYERS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Compass size={26} className="text-[#D97706]" />
            Land GIS Spatial Intelligence — {region}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Region-driven spatial intelligence linking geographic layers directly to research citations, dataset provenance, and Policy Lab inputs.
          </p>
        </div>

        {/* Action to transfer into Policy Lab */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/policy-lab/design"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D97706] hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition"
          >
            Send GIS Inputs to Policy Lab
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Spatial Grid */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Interactive Map Visualizer Canvas (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg min-h-[540px] flex flex-col">
            
            {/* Map Top Bar */}
            <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 z-10">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Map size={14} className="text-amber-400" />
                  Indore Metropolitan Region (22.7196° N, 75.8577° E)
                </span>
                <span className="hidden sm:inline-block text-slate-500">|</span>
                <span className="text-slate-400">Projection: EPSG:4326 (WGS84)</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-400 font-mono">
                  Resolution: 10m Multi-Temporal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer text-[11px] font-mono"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
              </div>
            </div>

            {/* Interactive SVG Cartographic Visualization */}
            <div className="relative flex-1 bg-[#0b172a] overflow-hidden flex items-center justify-center p-4">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full max-h-[480px] transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <defs>
                  {/* Agricultural Vertisol Hatch Pattern */}
                  <pattern id="agriGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#10B981" opacity="0.6" />
                    <circle cx="12" cy="12" r="1.5" fill="#059669" opacity="0.4" />
                  </pattern>

                  {/* Urban Sprawl Dot Pattern */}
                  <pattern id="urbanSprawl" width="16" height="16" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="#F43F5E" opacity="0.7" rx="1" />
                  </pattern>

                  {/* Buffer Stripe */}
                  <pattern id="bufferStripe" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#F59E0B" strokeWidth="4" opacity="0.35" />
                  </pattern>

                  {/* Water Basin Gradient */}
                  <linearGradient id="waterBasin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Base Indore District Boundary Polygon */}
                <path
                  d="M 120,80 L 480,50 L 720,120 L 750,380 L 520,460 L 220,440 L 90,260 Z"
                  fill="#172554"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />

                {/* Layer 1: Agricultural Land (Prime Vertisols Base) */}
                {layers[0].active && (
                  <path
                    d="M 150,110 L 450,85 L 680,145 L 710,360 L 500,430 L 250,410 L 120,250 Z"
                    fill="url(#agriGrid)"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    opacity={layers[0].opacity / 100}
                    onClick={() => setSelectedLayerForEvidence('layer-1')}
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                  />
                )}

                {/* Layer 4: Water Basin / Khan River Corridor */}
                {layers[3].active && (
                  <path
                    d="M 280,60 Q 360,220 400,260 T 560,450"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="14"
                    opacity={layers[3].opacity / 100}
                    strokeLinecap="round"
                    onClick={() => setSelectedLayerForEvidence('layer-4')}
                    className="cursor-pointer"
                  />
                )}

                {/* Layer 5: Aquifer Recharge Sensitive Zones */}
                {layers[4].active && (
                  <ellipse
                    cx="390"
                    cy="290"
                    rx="120"
                    ry="70"
                    fill="#06B6D4"
                    opacity={layers[4].opacity / 100 * 0.4}
                    stroke="#0891B2"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    onClick={() => setSelectedLayerForEvidence('layer-5')}
                    className="cursor-pointer"
                  />
                )}

                {/* Layer 3: Prime Farmland Protection Buffer Zone */}
                {layers[2].active && (
                  <path
                    d="M 260,140 L 540,130 L 620,250 L 580,380 L 320,380 L 220,270 Z"
                    fill="url(#bufferStripe)"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    opacity={layers[2].opacity / 100}
                    onClick={() => setSelectedLayerForEvidence('layer-3')}
                    className="cursor-pointer"
                  />
                )}

                {/* Layer 2: Built-Up Urban Core & Sprawl Corridors */}
                {layers[1].active && (
                  <g onClick={() => setSelectedLayerForEvidence('layer-2')} className="cursor-pointer">
                    {/* Core Urban Centre (Indore City) */}
                    <circle cx="400" cy="250" r="58" fill="#E11D48" opacity="0.85" stroke="#FFE4E6" strokeWidth="2" />
                    
                    {/* 2015-2020 Sprawl Clusters */}
                    <circle cx="480" cy="210" r="28" fill="#F43F5E" opacity="0.8" />
                    <circle cx="330" cy="270" r="24" fill="#F43F5E" opacity="0.8" />
                    
                    {/* Super Corridor Sprawl Vector (North-West) */}
                    <path
                      d="M 380,210 L 270,120 L 290,105 L 400,195 Z"
                      fill="#FB7185"
                      opacity={selectedYear >= 2020 ? '0.85' : '0.2'}
                    />
                    
                    {/* Bypass / Ring Road II Sprawl Vector (East & South) */}
                    <path
                      d="M 450,260 Q 560,280 620,340 L 600,360 Q 545,300 440,280 Z"
                      fill="#FB7185"
                      opacity={selectedYear >= 2025 ? '0.9' : '0.3'}
                    />
                  </g>
                )}

                {/* Layer 6: Infrastructure Corridors (Ring Road & Transit Infill) */}
                {layers[5].active && (
                  <g onClick={() => setSelectedLayerForEvidence('layer-6')} className="cursor-pointer">
                    {/* Outer Ring Road Vector */}
                    <ellipse
                      cx="400"
                      cy="250"
                      rx="160"
                      ry="110"
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="3.5"
                      strokeDasharray="8 5"
                      opacity={layers[5].opacity / 100}
                    />
                    {/* Infill Target Zone Indicators */}
                    <rect x="375" y="235" width="50" height="30" fill="#4F46E5" opacity="0.75" rx="4" />
                    <text x="400" y="254" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">INFILL</text>
                  </g>
                )}

                {/* Key Geographic Labels */}
                <text x="400" y="246" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">INDORE CITY</text>
                <text x="400" y="262" fill="#FEE2E2" fontSize="9" textAnchor="middle">Urban Core</text>

                <text x="240" y="110" fill="#FCA5A5" fontSize="11" fontWeight="600">Super Corridor Vector</text>
                <text x="610" y="325" fill="#FCA5A5" fontSize="11" fontWeight="600">Ring Road II Hub</text>

                <text x="220" y="340" fill="#86EFAC" fontSize="11" fontWeight="600">Depalpur Black Soils</text>
                <text x="530" y="110" fill="#86EFAC" fontSize="11" fontWeight="600">Sanwer Prime Farmland</text>

                <text x="360" y="445" fill="#38BDF8" fontSize="10">Kshipra Catchment Basin</text>
              </svg>

              {/* Strict Labelling Tag Floating over Map */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 p-2.5 rounded-lg text-xs space-y-1 text-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Info size={13} />
                  <span>3-Layer Integrity Standard:</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded font-mono text-[10px]">
                    [OBSERVED DATA]
                  </span>
                  <span>Sentinel-2 LULC & CGWB Baselines</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="px-1.5 py-0.2 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded font-mono text-[10px]">
                    [MODEL OUTPUT]
                  </span>
                  <span>Infill Transit Demand Projections</span>
                </div>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur border border-slate-700 p-3 rounded-lg text-xs space-y-2 text-slate-300 max-w-xs">
                <span className="font-bold text-white text-xs block border-b border-slate-800 pb-1">
                  Active Symbology
                </span>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
                    <span>Prime Agri (Vertisol)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-rose-600"></span>
                    <span>Built-Up Sprawl</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-amber-500"></span>
                    <span>Proposed 3.5km Buffer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-indigo-500"></span>
                    <span>Ring Road / Infill</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Series Slider Control */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Calendar size={16} className="text-amber-400" />
                <span className="font-semibold text-white">Temporal Observation Slider:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono">
                  {selectedYear}
                </span>
              </div>

              <div className="flex items-center gap-4 flex-1 max-w-md w-full">
                <span className="text-[11px] text-slate-400 font-mono">2015</span>
                <input
                  type="range"
                  min="2015"
                  max="2026"
                  step="1"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <span className="text-[11px] text-slate-400 font-mono">2026</span>
              </div>

              <div className="text-[11px] text-slate-400">
                {selectedYear <= 2018 ? 'Pre-Ring Road Baseline' : selectedYear <= 2022 ? 'Corridor Expansion Phase' : 'Current High Sprawl Pressure'}
              </div>
            </div>
          </Card>

          {/* Time-Series Trend Statistics Card (Observed Data) */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Prime Agricultural Area</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold">
                  OBSERVED
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">
                  {selectedYear >= 2025 ? '228,600' : selectedYear >= 2020 ? '246,800' : '268,400'} ha
                </span>
                <span className="text-xs text-rose-600 font-bold flex items-center">
                  <TrendingDown size={12} /> -14.8%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Class I Vertisols in Sanwer & Depalpur tehsils</p>
            </Card>

            <Card className="p-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Built-Up Urban Area</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 text-[10px] font-mono font-semibold">
                  OBSERVED
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">
                  {selectedYear >= 2025 ? '48,200' : selectedYear >= 2020 ? '34,100' : '22,700'} ha
                </span>
                <span className="text-xs text-rose-600 font-bold flex items-center">
                  <TrendingUp size={12} /> +112%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Sprawl concentrated along Super Corridor & Bypass</p>
            </Card>

            <Card className="p-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Groundwater Depletion</span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-50 text-cyan-700 text-[10px] font-mono font-semibold">
                  OBSERVED
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">-3.4 meters</span>
                <span className="text-xs text-rose-600 font-bold flex items-center">
                  <AlertTriangle size={12} /> Critical
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Average water table drop in peri-urban well stations</p>
            </Card>
          </div>
        </div>

        {/* Right Controls: Decision Layers & Click-to-Evidence Panel (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Decision Layers Control Card */}
          <Card className="p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-[#1B3A6B]" />
                <h3 className="font-bold text-sm text-[#1B3A6B]">Decision Layers</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">6 Layers Available</span>
            </div>

            <p className="text-[11px] text-slate-500 mt-2 mb-3">
              Every layer supports a named land-governance decision and links directly to verified citations.
            </p>

            <div className="space-y-2.5">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerForEvidence(layer.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedLayerForEvidence === layer.id
                      ? 'border-[#1B3A6B] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={layer.active}
                        onChange={() => toggleLayer(layer.id)}
                        className="w-4 h-4 rounded text-[#1B3A6B] accent-[#1B3A6B]"
                      />
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded ${layer.color} shadow-xs`}></span>
                        <span className="text-xs font-bold text-slate-900">{layer.name}</span>
                      </div>
                    </label>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold bg-slate-100 text-slate-700">
                      {layer.sourceStatus === 'OBSERVED DATA' ? 'OBSERVED' : 'MODEL'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1 pl-6 leading-tight">
                    {layer.decisionSupported}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Click-to-Evidence Linked Panel */}
          <Card className="p-5 bg-white border-2 border-amber-300 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#D97706]" />
                <h3 className="font-bold text-sm text-[#1B3A6B]">
                  Linked Evidence Panel
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                Layer Provenance
              </span>
            </div>

            {selectedLayerObj && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-900 mb-1">
                  Evidence Tied to: <span className="text-[#1B3A6B]">{selectedLayerObj.name}</span>
                </p>
                <p className="text-[11px] text-slate-500 mb-3">
                  Clicking this layer connects the map directly to institutional records and datasets:
                </p>

                <div className="space-y-3">
                  {linkedResources.map((res) => (
                    <div key={res.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900">
                          {res.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                          <ShieldCheck size={11} /> {res.verificationStatus}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{res.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{res.abstract}</p>
                      
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200">
                        <span>Source: {res.publisher}</span>
                        <Link
                          href="/dashboard/evidence"
                          className="text-[#D97706] hover:underline font-bold flex items-center gap-0.5"
                        >
                          View Provenance <ExternalLink size={10} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
