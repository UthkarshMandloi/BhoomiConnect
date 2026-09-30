'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getAllDatasets, getAllResearchPapers } from '@/lib/firebase/db';
import { Database, BookOpen, MapPin, CheckCircle2 } from 'lucide-react';

export default function EvidenceExplorerPage() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [d, p] = await Promise.all([
          getAllDatasets(),
          getAllResearchPapers(),
        ]);
        setDatasets(d);
        setPapers(p);
      } catch (error) {
        console.error('Error fetching evidence:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B]">Evidence Explorer</h1>
          <p className="text-gray-600">Browse datasets, research papers, and policies</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Datasets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6 flex items-center gap-2">
            <Database size={28} />
            Datasets ({datasets.length})
          </h2>

          {loading ? (
            <Card className="p-8 text-center text-gray-500">Loading...</Card>
          ) : datasets.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {datasets.map((dataset) => (
                <Card key={dataset.id} className="p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-[#1B3A6B] flex-1">{dataset.name}</h3>
                    {dataset.validationStatus === 'verified' && (
                      <CheckCircle2 size={20} className="text-[#059669] flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{dataset.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {dataset.type}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {dataset.source}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {dataset.spatialResolution}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Coverage: {dataset.coverage?.join(', ') || 'N/A'}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">No datasets found</Card>
          )}
        </div>

        {/* Research Papers */}
        <div>
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6 flex items-center gap-2">
            <BookOpen size={28} />
            Research Papers ({papers.length})
          </h2>

          {loading ? (
            <Card className="p-8 text-center text-gray-500">Loading...</Card>
          ) : papers.length > 0 ? (
            <div className="space-y-4">
              {papers.map((paper) => (
                <Card key={paper.id} className="p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-[#1B3A6B] flex-1">{paper.title}</h3>
                    {paper.validationStatus === 'verified' && (
                      <CheckCircle2 size={20} className="text-[#059669] flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{paper.abstract}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {paper.year}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                      {paper.geography}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    By {paper.authors?.join(', ') || 'Unknown'}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">No research papers found</Card>
          )}
        </div>
      </div>
    </div>
  );
}
