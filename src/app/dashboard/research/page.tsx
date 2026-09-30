'use client';

import { Card } from '@/components/ui/card';
import { getAllResearchPapers } from '@/lib/firebase/db';
import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

export default function ResearchIntelligencePage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await getAllResearchPapers();
        setPapers(data);
      } catch (error) {
        console.error('Error fetching papers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B]">Research Intelligence</h1>
          <p className="text-gray-600">Analyze available evidence and identify research gaps</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Research Papers</p>
                <p className="text-3xl font-bold text-[#1B3A6B]">{papers.length}</p>
              </div>
              <BarChart3 size={32} className="text-[#D97706]" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Research Coverage</p>
                <p className="text-3xl font-bold text-[#1B3A6B]">68%</p>
              </div>
              <TrendingUp size={32} className="text-[#059669]" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Research Gaps Identified</p>
                <p className="text-3xl font-bold text-[#1B3A6B]">4</p>
              </div>
              <AlertCircle size={32} className="text-[#DC2626]" />
            </div>
          </Card>
        </div>

        {/* Research Papers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Available Research</h2>
          {loading ? (
            <Card className="p-8 text-center text-gray-500">Loading...</Card>
          ) : papers.length > 0 ? (
            <div className="space-y-4">
              {papers.map((paper) => (
                <Card key={paper.id} className="p-6 hover:shadow-md transition">
                  <h3 className="font-semibold text-[#1B3A6B] mb-2">{paper.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{paper.abstract}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {paper.year}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {paper.geography}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    By {paper.authors?.join(', ') || 'Unknown'}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">No research papers found</Card>
          )}
        </div>

        {/* Research Gaps */}
        <div>
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Identified Research Gaps</h2>
          <Card className="p-6 mb-4 border-l-4 border-l-red-500">
            <h3 className="font-semibold text-[#1B3A6B] mb-2">Post-2020 Agricultural Conversion in Tier-2 Cities</h3>
            <p className="text-gray-600 text-sm mb-3">
              While evidence on urban agricultural land conversion is strong for major metros, studies focusing on rapidly growing Tier-2 urban regions (Pune, Nagpur, Aurangabad) post-2020 are limited.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Coverage: 41%</span>
              <span className="text-red-600 font-semibold">High Priority</span>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-yellow-500">
            <h3 className="font-semibold text-[#1B3A6B] mb-2">Farmer Livelihood Impacts (Socio-Economic)</h3>
            <p className="text-gray-600 text-sm mb-3">
              Limited research on how farmers adapt to land conversion, income changes, and social disruption in different state contexts.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Coverage: 52%</span>
              <span className="text-yellow-600 font-semibold">Medium Priority</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
