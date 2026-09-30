'use client';

import { Card } from '@/components/ui/card';
import { Map, Layers } from 'lucide-react';

export default function GISExplorerPage() {
  const layers = [
    { name: 'Agricultural Land', active: true, color: 'bg-green-500' },
    { name: 'Built-up Area', active: true, color: 'bg-red-500' },
    { name: 'Water Bodies', active: false, color: 'bg-blue-500' },
    { name: 'Roads/Infrastructure', active: false, color: 'bg-gray-500' },
    { name: 'Population Density', active: false, color: 'bg-purple-500' },
    { name: 'Climate Vulnerability', active: false, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B] flex items-center gap-2">
            <Map size={28} />
            GIS Evidence Explorer
          </h1>
          <p className="text-gray-600">Visualize land-use changes and geospatial patterns</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Map size={48} className="mx-auto mb-4 opacity-50" />
                <p>Interactive Map Component</p>
                <p className="text-sm text-gray-400 mt-2">(Leaflet + OpenStreetMap in production)</p>
                <p className="text-xs text-gray-400 mt-4">India view - 2015-2026 land-use changes</p>
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-[#1B3A6B] mb-4 flex items-center gap-2">
                <Layers size={20} />
                Layers
              </h3>
              <div className="space-y-3">
                {layers.map((layer, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={layer.active}
                      id={`layer-${idx}`}
                      className="w-4 h-4 text-[#D97706]"
                    />
                    <label htmlFor={`layer-${idx}`} className="flex items-center gap-2 cursor-pointer flex-1">
                      <div className={`w-3 h-3 rounded ${layer.color}`}></div>
                      <span className="text-sm">{layer.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-[#1B3A6B] mb-4">Time Range</h3>
              <input
                type="range"
                min="2015"
                max="2026"
                defaultValue="2026"
                className="w-full"
              />
              <p className="text-center font-semibold text-[#1B3A6B] mt-2">2026</p>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Drag to pan</strong> | <strong>Scroll to zoom</strong> | Click region for details
              </p>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-green-600">24.5M</p>
            <p className="text-gray-600 text-sm">Agricultural Land (ha)</p>
            <p className="text-xs text-gray-500 mt-2">2026</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-red-600">8.2M</p>
            <p className="text-gray-600 text-sm">Built-up Area (ha)</p>
            <p className="text-xs text-gray-500 mt-2">+15% since 2015</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">-12%</p>
            <p className="text-gray-600 text-sm">Agricultural Loss</p>
            <p className="text-xs text-gray-500 mt-2">2015-2026</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
