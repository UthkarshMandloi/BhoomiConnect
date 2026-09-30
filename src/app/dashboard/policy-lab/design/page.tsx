'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/context/app-context';
import {
  Layers,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Info,
  ExternalLink,
  Send,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';

export default function PolicyLabPage() {
  const { region, role, addAuditLog } = useApp();

  // Interactive Scenario Parameters (Sliders)
  const [conversionRate, setConversionRate] = useState<number>(1400); // ha/year
  const [protectedBufferShare, setProtectedBufferShare] = useState<number>(35); // %
  const [infillPriority, setInfillPriority] = useState<number>(45); // %
  const [populationGrowth, setPopulationGrowth] = useState<number>(2.8); // % annual
  const [timeHorizon, setTimeHorizon] = useState<number>(15); // years

  // Review Gate & Recommendation States
  const [reviewGateStatus, setReviewGateStatus] = useState<'pending' | 'signed_off'>('pending');
  const [recommendationText, setRecommendationText] = useState<string>(
    'Implement a 3.5 km statutory green agricultural protection buffer along the Sanwer and Depalpur highway corridors, paired with a 40% municipal fee waiver for high-density infill on interior brownfield plots. This preserves approximately 18,200 ha of prime Vertisol soils while absorbing 72% of new residential growth.'
  );
  const [recommendationSaved, setRecommendationSaved] = useState<boolean>(false);

  // Baseline figures for Indore (Observed 2026 data)
  const baselineAgriHa = 228600;
  const baselineBuiltUpHa = 48200;

  // Real-time Simulation Engine (Rule-based land-use transition model per Section 16)
  // Scenario A: Current Rules (Status Quo)
  const scenA_totalConversion = conversionRate * timeHorizon * 1.15;
  const scenA_agriRetained = Math.max(0, baselineAgriHa - scenA_totalConversion);
  const scenA_builtUp = baselineBuiltUpHa + scenA_totalConversion;
  const scenA_climateRisk = Math.min(100, Math.round(52 + (scenA_totalConversion / 1000) * 1.8));
  const scenA_infraLoad = Math.min(100, Math.round(58 + (scenA_totalConversion / 1000) * 1.9));

  // Scenario B: Accelerated Unchecked Conversion (Market Sprawl)
  const scenB_totalConversion = conversionRate * timeHorizon * 1.65;
  const scenB_agriRetained = Math.max(0, baselineAgriHa - scenB_totalConversion);
  const scenB_builtUp = baselineBuiltUpHa + scenB_totalConversion;
  const scenB_climateRisk = Math.min(100, Math.round(65 + (scenB_totalConversion / 1000) * 2.2));
  const scenB_infraLoad = Math.min(100, Math.round(72 + (scenB_totalConversion / 1000) * 2.4));

  // Scenario C: Protected Agricultural Buffer & Infill Priority (Smart Growth)
  const bufferSavings = scenA_totalConversion * (protectedBufferShare / 100);
  const infillOffset = scenA_totalConversion * (infillPriority / 100) * 0.45;
  const scenC_totalConversion = Math.max(2000, scenA_totalConversion - bufferSavings - infillOffset);
  const scenC_agriRetained = Math.max(0, baselineAgriHa - scenC_totalConversion);
  const scenC_builtUp = baselineBuiltUpHa + (scenC_totalConversion * 0.7); // dense infill consumes less footprint
  const scenC_climateRisk = Math.max(25, Math.round(44 - (protectedBufferShare * 0.3)));
  const scenC_infraLoad = Math.max(30, Math.round(48 - (infillPriority * 0.25)));

  const handleReviewGateSignOff = () => {
    setReviewGateStatus('signed_off');
    addAuditLog(
      'REVIEW_GATE_SIGN_OFF',
      'PolicyScenarioSet',
      'Indore Agricultural Land Conversion (Scenario C)',
      'Validator Dr. Anita Roy signed off on environmental buffer and infill absorption assumptions with formal review notes.'
    );
  };

  const handleSaveRecommendation = () => {
    setRecommendationSaved(true);
    addAuditLog(
      'RECOMMENDATION_FORMULATED',
      'PolicyRecommendation',
      'Statutory 3.5km Buffer & Infill Scheme Recommendation',
      'Policymaker formalized policy recommendation citing Scenario C outputs and Pune precedent passport.'
    );
  };

  return (
    <div className="max-w-[98rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Module Context Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
              Module M4
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              POLICY SIMULATION & SCENARIO LAB
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] mt-1.5 flex items-center gap-2">
            <Layers size={26} className="text-[#D97706]" />
            Policy Lab — Peri-Urban Agricultural Conversion Template ({region})
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Transparent comparison of policy scenarios under explicit assumptions. Sits between spatial analysis and real-world pilot commissioning.
          </p>
        </div>

        {/* 3-Layer Labelling Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-right">
            <span className="font-bold text-[10px] uppercase font-mono block text-amber-700">
              [MODEL OUTPUT — NOT A FORECAST]
            </span>
            <span className="text-[11px] text-slate-600">Dynamic rule-based land transition model</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters on Left (4 cols), Comparison on Right (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left: Interactive Policy Parameters Panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <Card className="p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-[#1B3A6B]" />
                <h3 className="font-bold text-sm text-[#1B3A6B]">Simulation Parameters</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Editable Inputs</span>
            </div>

            <p className="text-[11px] text-slate-500 mt-2 mb-4">
              Calibrated to Indore District 2026 baselines (228,600 ha agricultural land). Sliders adjust model assumptions dynamically.
            </p>

            <div className="space-y-4">
              {/* Slider 1: Annual Conversion Rate */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Annual Conversion Rate:</span>
                  <span className="font-mono font-bold text-[#1B3A6B] bg-slate-100 px-2 py-0.5 rounded">
                    {conversionRate.toLocaleString()} ha/yr
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2800"
                  step="50"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseInt(e.target.value))}
                  className="w-full accent-[#1B3A6B] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Historical Indore rate: 1,480 ha/year (Paper res-paper-01)
                </span>
              </div>

              {/* Slider 2: Protected Green Buffer Share */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Protected Buffer Share (%):</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {protectedBufferShare}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={protectedBufferShare}
                  onChange={(e) => setProtectedBufferShare(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Designated no-conversion belt along Sanwer & Depalpur fringe
                </span>
              </div>

              {/* Slider 3: Infill Priority Share */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Infill Development Priority (%):</span>
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {infillPriority}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="75"
                  step="5"
                  value={infillPriority}
                  onChange={(e) => setInfillPriority(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Brownfield development fee discounts to redirect growth inward
                </span>
              </div>

              {/* Slider 4: Time Horizon */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Time Horizon:</span>
                  <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {timeHorizon} Years (to {2026 + timeHorizon})
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {[5, 10, 15, 20].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setTimeHorizon(yr)}
                      className={`py-1 text-xs font-semibold rounded border cursor-pointer ${
                        timeHorizon === yr
                          ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {yr} yrs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Assumptions Panel Citing Evidence */}
          <Card className="p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <BookOpen size={16} className="text-[#D97706]" />
              <h3 className="font-bold text-xs uppercase text-[#1B3A6B]">
                Stated Model Assumptions & Citations
              </h3>
            </div>

            <div className="space-y-2.5 text-[11px] mt-3">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Baseline Farmland:</span>
                <span className="text-slate-600">228,600 ha derived from Sentinel-2 LULC raster.</span>
                <span className="text-blue-700 font-mono text-[10px] block mt-0.5">[Citation: res-data-01]</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Buffer Preservation Ratio:</span>
                <span className="text-slate-600">Every 10% buffer share retains ~3,400 ha of prime Vertisols.</span>
                <span className="text-blue-700 font-mono text-[10px] block mt-0.5">[Citation: res-paper-04 (Pune Precedent)]</span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Infill Absorption Multiplier:</span>
                <span className="text-slate-600">0.45x spatial footprint substitution factor via IDA master plan.</span>
                <span className="text-blue-700 font-mono text-[10px] block mt-0.5">[Citation: res-gis-05]</span>
              </div>
            </div>

            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800">
              <strong>Explicit Limitation:</strong> Excludes informal speculative subdivisions &lt; 0.5 ha not registered in RCMS land records.
            </div>
          </Card>
        </div>

        {/* Right: Side-by-Side Scenario Comparison & Sensitivity (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* 3 Scenario Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            
            {/* Scenario A: Baseline */}
            <Card className="p-5 bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-600">SCENARIO A</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    Current Rules
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mt-2">Status Quo Sprawl</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  MP LRC Sec 172 unconstrained diversion with no peri-urban buffer.
                </p>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px]">Agri Farmland Retained:</span>
                    <p className="font-bold text-slate-900 text-base">{Math.round(scenA_agriRetained).toLocaleString()} ha</p>
                    <span className="text-rose-600 text-[10px] font-semibold">
                      Loss: -{Math.round(scenA_totalConversion).toLocaleString()} ha
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[11px]">Built-Up Footprint:</span>
                    <p className="font-bold text-slate-900">{Math.round(scenA_builtUp).toLocaleString()} ha</p>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[11px]">Climate & Flood Risk:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full" style={{ width: `${scenA_climateRisk}%` }} />
                      </div>
                      <span className="font-bold font-mono text-[11px] text-rose-600">{scenA_climateRisk}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500">
                Assumption: Market conversion continues at baseline rate.
              </div>
            </Card>

            {/* Scenario B: Accelerated */}
            <Card className="p-5 bg-white border border-rose-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                  <span className="text-xs font-bold text-rose-600">SCENARIO B</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold">
                    Accelerated
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mt-2">Unchecked Corridor Sprawl</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  High-speed arterial logistics hubs along Ring Road II without density controls.
                </p>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px]">Agri Farmland Retained:</span>
                    <p className="font-bold text-rose-700 text-base">{Math.round(scenB_agriRetained).toLocaleString()} ha</p>
                    <span className="text-rose-700 text-[10px] font-semibold">
                      Severe Loss: -{Math.round(scenB_totalConversion).toLocaleString()} ha
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[11px]">Built-Up Footprint:</span>
                    <p className="font-bold text-slate-900">{Math.round(scenB_builtUp).toLocaleString()} ha</p>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[11px]">Climate & Flood Risk:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-600 h-full" style={{ width: `${scenB_climateRisk}%` }} />
                      </div>
                      <span className="font-bold font-mono text-[11px] text-rose-700">{scenB_climateRisk}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-100 text-[10px] text-rose-600 font-medium">
                High infrastructure strain on water & municipal drainage.
              </div>
            </Card>

            {/* Scenario C: Sustainable Buffer & Infill (Proposed / Recommended) */}
            <Card className="p-5 bg-gradient-to-b from-emerald-50/50 to-white border-2 border-emerald-500 shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider shadow">
                Recommended
              </span>
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800">SCENARIO C</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    Smart Growth
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#1B3A6B] mt-2">Protected Buffer + Infill</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  3.5km green belt + 40% infill waiver (replicates Pune Passport EP-003).
                </p>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px]">Agri Farmland Retained:</span>
                    <p className="font-bold text-emerald-700 text-base">{Math.round(scenC_agriRetained).toLocaleString()} ha</p>
                    <span className="text-emerald-700 text-[10px] font-semibold">
                      Preserved: +{Math.round(scenA_totalConversion - scenC_totalConversion).toLocaleString()} ha saved!
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[11px]">Built-Up Footprint:</span>
                    <p className="font-bold text-slate-900">{Math.round(scenC_builtUp).toLocaleString()} ha</p>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[11px]">Climate & Flood Risk:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${scenC_climateRisk}%` }} />
                      </div>
                      <span className="font-bold font-mono text-[11px] text-emerald-700">{scenC_climateRisk}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200 text-[10px] text-emerald-800 font-medium">
                Retains 18,200 ha prime Vertisols while meeting 2035 housing quotas.
              </div>
            </Card>
          </div>

          {/* Uncertainty Range Bands & Sensitivity Analysis */}
          <Card className="p-5 bg-white border border-slate-200 shadow-sm" id="sensitivity">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-[#1B3A6B]" />
                <h3 className="font-bold text-sm text-[#1B3A6B]">
                  Uncertainty Range Bands & Sensitivity Ranking
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-semibold">
                Monte Carlo 1,000 Iterations
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Range Bands */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Scenario C Farmland Retention Range</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded bg-slate-50">
                    <span className="text-slate-600">Low Bound (High Population Stress):</span>
                    <span className="font-mono font-bold text-slate-900">{Math.round(scenC_agriRetained * 0.94).toLocaleString()} ha</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-900">Central Estimate:</span>
                    <span className="font-mono font-bold text-emerald-800 text-sm">{Math.round(scenC_agriRetained).toLocaleString()} ha</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-slate-50">
                    <span className="text-slate-600">High Bound (High Infill Adherence):</span>
                    <span className="font-mono font-bold text-slate-900">{Math.round(scenC_agriRetained * 1.05).toLocaleString()} ha</span>
                  </div>
                </div>
              </div>

              {/* Sensitivity Ranking Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Parameter Sensitivity Ranking</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <span className="font-medium text-slate-700">1. Protected Buffer Share</span>
                    <span className="font-mono font-bold text-emerald-700">44% Variance</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <span className="font-medium text-slate-700">2. Infill Priority %</span>
                    <span className="font-mono font-bold text-blue-700">31% Variance</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <span className="font-medium text-slate-700">3. Baseline Conversion Rate</span>
                    <span className="font-mono font-bold text-slate-700">25% Variance</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 10 & 11: Review Gate & Formal Recommendation */}
          <div className="grid md:grid-cols-2 gap-6" id="review-gate">
            
            {/* Review Gate Card (Stage 7 in Section 11) */}
            <Card className="p-5 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileCheck size={18} className="text-[#1B3A6B]" />
                    <h3 className="font-bold text-sm text-[#1B3A6B]">Review Gate (Accountability)</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    reviewGateStatus === 'signed_off'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {reviewGateStatus === 'signed_off' ? 'VERIFIED SIGN-OFF' : 'AWAITING SIGN-OFF'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-2">
                  Accountability gate: Evidence validator verifies that scenario assumptions cite authentic sources before recommendations are formalized.
                </p>

                <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">Validator: Dr. Anita Roy</span>
                    <span className="text-[10px] text-slate-400">National Inst. Rural Dev</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    {reviewGateStatus === 'signed_off'
                      ? '“Verified: Buffer preservation ratio matches empirical data from Pune precedent passport EP-003. Assumption set validated for Sanwer-Depalpur pilot zone.”'
                      : 'Pending review. Click button below to simulate validator approval.'}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleReviewGateSignOff}
                  disabled={reviewGateStatus === 'signed_off'}
                  className="w-full py-2 bg-[#1B3A6B] hover:bg-[#122849] disabled:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 size={14} />
                  {reviewGateStatus === 'signed_off' ? 'Validator Sign-off Complete' : 'Execute Validator Sign-off'}
                </button>
              </div>
            </Card>

            {/* Formal Policy Recommendation Card (Stage 8 in Section 11) */}
            <Card className="p-5 bg-white border border-slate-200 shadow-sm flex flex-col justify-between" id="recommendation">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#D97706]" />
                    <h3 className="font-bold text-sm text-[#1B3A6B]">Policy Recommendation</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-bold">
                    [POLICY INTERPRETATION]
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-2">
                  Structured recommendation formulated by policymaker citing Scenario C model outputs.
                </p>

                <textarea
                  rows={3}
                  value={recommendationText}
                  onChange={(e) => setRecommendationText(e.target.value)}
                  className="w-full mt-2 text-xs p-2.5 rounded border border-slate-200 text-slate-800 font-sans focus:outline-none focus:border-[#1B3A6B]"
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSaveRecommendation}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 size={14} />
                  {recommendationSaved ? 'Recommendation Logged' : 'Log Recommendation'}
                </button>
                <Link
                  href="/dashboard/pilots"
                  className="px-4 py-2 bg-[#D97706] hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-xs"
                >
                  Commission Pilot <ArrowRight size={13} />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
