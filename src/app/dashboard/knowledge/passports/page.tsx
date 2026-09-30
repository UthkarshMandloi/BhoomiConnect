'use client';

import { Card } from '@/components/ui/card';
import { Award, Search } from 'lucide-react';
import { useState } from 'react';

export default function PolicyPassportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const passports = [
    {
      id: '1',
      name: 'Agricultural Land Conversion Control - Pune',
      problem: 'Agricultural land disappearing around Pune',
      outcome: 'Reduced conversion by 12%, improved farmer incomes by 18%',
      replicationPotential: 'High',
      tags: ['urbanization', 'agriculture', 'maharashtra', 'tier-1'],
    },
    {
      id: '2',
      name: 'Water Recharge Zone Identification',
      problem: 'Groundwater depletion in urban-agricultural zones',
      outcome: 'Identified 45 suitable recharge sites, increased water table by 2m',
      replicationPotential: 'Medium',
      tags: ['water', 'geospatial', 'climate-resilience'],
    },
    {
      id: '3',
      name: 'Flood Vulnerability Mapping',
      problem: 'Increasing flood risk with urban expansion',
      outcome: 'Mapped vulnerability for 12 districts, reduced exposure risk',
      replicationPotential: 'High',
      tags: ['climate', 'urbanization', 'disaster-management'],
    },
  ];

  const filtered = passports.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some((t) => t.includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B] flex items-center gap-2">
            <Award size={28} />
            Policy Passports
          </h1>
          <p className="text-gray-600">Reusable institutional knowledge from completed experiments</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by policy name or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gov-input pl-10"
            />
          </div>
        </div>

        {/* Passports */}
        <div className="space-y-6">
          {filtered.length > 0 ? (
            filtered.map((passport) => (
              <Card key={passport.id} className="p-8 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1B3A6B] mb-2">{passport.name}</h3>
                    <p className="text-gray-600">{passport.problem}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm flex-shrink-0 ${
                    passport.replicationPotential === 'High'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {passport.replicationPotential} Replication Potential
                  </span>
                </div>

                <div className="bg-blue-50 border-l-4 border-l-[#2563EB] p-4 mb-6 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Outcome:</strong> {passport.outcome}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Related Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {passport.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs cursor-pointer hover:bg-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="text-[#1B3A6B] hover:underline font-semibold text-sm">
                    View Full Passport
                  </button>
                  <button className="text-[#D97706] hover:underline font-semibold text-sm">
                    Adapt for My Region
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <Award size={48} className="mx-auto mb-4 opacity-50" />
              <p>No policy passports match your search</p>
            </Card>
          )}
        </div>

        {/* Learning Summary */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Platform Impact Summary</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-[#D97706]">3</p>
              <p className="text-gray-600 mt-2">Completed Experiments</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-[#1B3A6B]">18</p>
              <p className="text-gray-600 mt-2">Policy Recommendations</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-[#059669]">7</p>
              <p className="text-gray-600 mt-2">Regions Ready to Replicate</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
