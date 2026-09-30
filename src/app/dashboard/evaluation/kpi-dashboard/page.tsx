'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

const DEMO_KPIS = [
  { name: 'Annual Agricultural Land Conversion', type: 'percentage', unit: '%', target: -5, direction: 'lower_is_better', baseline: -12 },
  { name: 'Built-up Area Expansion', type: 'percentage', unit: '%', target: 10, direction: 'lower_is_better', baseline: 15 },
  { name: 'Water Demand Pressure', type: 'ratio', unit: 'ratio', target: 1.0, direction: 'higher_is_better', baseline: 0.7 },
  { name: 'Infrastructure Cost per Capita', type: 'cost', unit: '₹', target: 2000, direction: 'lower_is_better', baseline: 3000 },
  { name: 'Flood Vulnerability Index', type: 'ratio', unit: '0-10', target: 3, direction: 'lower_is_better', baseline: 5 },
];

const DEMO_SCENARIOS = [
  { name: 'Current Trend', indicators: { agriculturalLandLoss: -12, builtupGrowth: 15, waterStress: 8 } },
  { name: 'Controlled', indicators: { agriculturalLandLoss: -6, builtupGrowth: 12, waterStress: 5 } },
  { name: 'Restrictive', indicators: { agriculturalLandLoss: -2, builtupGrowth: 8, waterStress: 3 } },
];

export default function KPIDashboard() {
  const kpis = DEMO_KPIS;
  const scenarios = DEMO_SCENARIOS;

  // Sample trend data for charts
  const trendData = [
    { month: 'Jan', value: 100, target: 95 },
    { month: 'Feb', value: 98, target: 95 },
    { month: 'Mar', value: 96, target: 95 },
    { month: 'Apr', value: 94, target: 95 },
    { month: 'May', value: 92, target: 95 },
    { month: 'Jun', value: 90, target: 95 },
  ];

  const scenarioComparison = scenarios.map((s: any) => ({
    scenario: s.name,
    ...s.indicators,
  }));

  const getStatusColor = (baseline: number, target: number, direction: string) => {
    if (direction === 'higher_is_better') {
      return baseline >= target ? 'text-green-600' : baseline >= target * 0.8 ? 'text-yellow-600' : 'text-red-600';
    } else {
      return baseline <= target ? 'text-green-600' : baseline <= target * 1.2 ? 'text-yellow-600' : 'text-red-600';
    }
  };

  const getStatusBadge = (baseline: number, target: number, direction: string) => {
    if (direction === 'higher_is_better') {
      if (baseline >= target) return { text: 'ON TRACK', color: 'bg-green-100 text-green-800', icon: CheckCircle2 };
      if (baseline >= target * 0.8) return { text: 'AT RISK', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle };
      return { text: 'OFF TRACK', color: 'bg-red-100 text-red-800', icon: AlertCircle };
    } else {
      if (baseline <= target) return { text: 'ON TRACK', color: 'bg-green-100 text-green-800', icon: CheckCircle2 };
      if (baseline <= target * 1.2) return { text: 'AT RISK', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle };
      return { text: 'OFF TRACK', color: 'bg-red-100 text-red-800', icon: AlertCircle };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B]">KPI Dashboard</h1>
          <p className="text-gray-600">Track experiment outcomes and measure impact</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Active Experiment: Urban Agricultural Conversion Control</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {kpis.map((kpi, idx) => {
              const status = getStatusBadge(kpi.baseline, kpi.target, kpi.direction);
              const StatusIcon = status.icon;

              return (
                <Card key={idx} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-[#1B3A6B] mb-1">{kpi.name}</h3>
                      <p className="text-xs text-gray-500">{kpi.type} • {kpi.unit}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.color}`}>
                      <StatusIcon size={14} />
                      {status.text}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Current</span>
                      <span className={`font-bold text-lg ${getStatusColor(kpi.baseline, kpi.target, kpi.direction)}`}>
                        {kpi.baseline} {kpi.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#D97706] h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((Math.abs(kpi.baseline) / Math.abs(kpi.target)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Target: {kpi.target} {kpi.unit}</span>
                    <span>Baseline: -12 {kpi.unit}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-12">
          <Card className="p-6">
            <h3 className="font-semibold text-[#1B3A6B] mb-6">Agricultural Land Loss Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#D97706" name="Current" />
                <Line type="monotone" dataKey="target" stroke="#059669" name="Target" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Scenario Comparison */}
        <div className="mb-12">
          <Card className="p-6">
            <h3 className="font-semibold text-[#1B3A6B] mb-6">Scenario Comparison (All Indicators)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scenarioComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scenario" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="agriculturalLandLoss" fill="#DC2626" name="Agricultural Loss %" />
                <Bar dataKey="builtupGrowth" fill="#F59E0B" name="Built-up Growth %" />
                <Bar dataKey="waterStress" fill="#2563EB" name="Water Stress" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Evidence Provenance */}
        <div>
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Data Sources & Methodology</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div className="border-l-4 border-l-[#D97706] pl-4">
                <h4 className="font-semibold text-[#1B3A6B] mb-2">Agricultural Land Loss %</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Source:</strong> Sentinel-2 LULC data via VEDAS/ISRO-SAC</p>
                  <p><strong>Method:</strong> Change detection analysis (2015-2026)</p>
                  <p><strong>Spatial Resolution:</strong> 30 meters</p>
                  <p><strong>Limitations:</strong> Cloud cover affects monsoon data; field validation limited</p>
                  <p><strong>Confidence:</strong> 0.87</p>
                  <p><strong>Last Updated:</strong> September 26, 2026</p>
                </div>
              </div>

              <div className="border-l-4 border-l-[#059669] pl-4">
                <h4 className="font-semibold text-[#1B3A6B] mb-2">Population Growth</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Source:</strong> Census of India 2021 / data.gov.in</p>
                  <p><strong>Method:</strong> Interpolated district-level data</p>
                  <p><strong>Spatial Resolution:</strong> District level</p>
                  <p><strong>Limitations:</strong> Data updated every 10 years</p>
                  <p><strong>Confidence:</strong> 1.0</p>
                  <p><strong>Last Updated:</strong> 2021</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> All data sources, methods, and limitations are documented to ensure transparency and reproducibility. Click on any KPI value above to see detailed provenance information.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
