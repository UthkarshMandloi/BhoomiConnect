'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { MOCK_RESPONSES } from '@/lib/ai/gemini';

export default function DiscoverPage() {
  const [problemText, setProblemText] = useState('');
  const [loading, setLoading] = useState(false);
  const [structured, setStructured] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai/structure-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: problemText }),
      });

      if (!response.ok) {
        // Use mock response if API fails
        setStructured({
          ...MOCK_RESPONSES.structuredProblem,
          demo: true,
        });
        return;
      }

      const data = await response.json();
      setStructured(data);
    } catch (err) {
      console.error('Error structuring problem:', err);
      // Use mock response on error
      setStructured({
        ...MOCK_RESPONSES.structuredProblem,
        demo: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleProblems = [
    'Agricultural land around cities is disappearing into built-up areas',
    'Water scarcity in urban-agricultural transition zones',
    'Rapid urbanization causing flood vulnerability',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B]">BhoomiConnect</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!structured ? (
          <>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-[#1B3A6B] mb-4">
                Discover Land Governance Problems
              </h2>
              <p className="text-lg text-gray-600">
                Describe a land-related problem you're investigating. We'll structure it into a research question, find relevant evidence, and connect you with datasets, research, and policies.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mb-12">
              <div className="gov-card">
                <label className="block mb-4">
                  <span className="block text-sm font-semibold text-[#1B3A6B] mb-2">
                    Describe your problem (natural language)
                  </span>
                  <Textarea
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                    placeholder="E.g., Agricultural land around rapidly expanding cities is being converted into built-up areas. We need to understand the rate, drivers, and impacts..."
                    rows={6}
                    className="gov-input"
                  />
                </label>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-800 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!problemText.trim() || loading}
                  className="gov-button w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Structuring Problem...
                    </>
                  ) : (
                    <>
                      Discover & Structure
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#1B3A6B] mb-4">Try an example:</h3>
              <div className="grid gap-3">
                {exampleProblems.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setProblemText(example)}
                    className="text-left p-4 bg-white border border-gray-300 rounded-lg hover:border-[#D97706] hover:bg-orange-50 transition"
                  >
                    <p className="font-medium text-gray-900">{example}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="mb-6">
              <button
                onClick={() => {
                  setStructured(null);
                  setProblemText('');
                }}
                className="text-[#1B3A6B] hover:underline flex items-center gap-1"
              >
                ← Back to Discovery
              </button>
            </div>

            <Card className="p-8 bg-white border border-gray-200">
              <h2 className="text-3xl font-bold text-[#1B3A6B] mb-6">Structured Problem Definition</h2>

              {structured.demo && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Demo Data:</strong> This is illustrative prototype data. In production, this would be AI-structured from your input.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-[#1B3A6B] mb-2">Theme</h3>
                  <p className="text-gray-700 text-lg font-medium">{structured.theme}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1B3A6B] mb-2">Geography</h3>
                  <p className="text-gray-700 text-lg font-medium">{structured.geography}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1B3A6B] mb-2">Time Period</h3>
                  <p className="text-gray-700 text-lg font-medium">
                    {structured.timePeriod.start} - {structured.timePeriod.end}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1B3A6B] mb-2">Land Type</h3>
                  <p className="text-gray-700 text-lg font-medium">{structured.landType}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-[#1B3A6B] mb-3">Potential Drivers</h3>
                <div className="flex flex-wrap gap-2">
                  {structured.potentialDrivers?.map((driver: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#D97706] text-white rounded-full text-sm"
                    >
                      {driver}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-[#1B3A6B] mb-3">Key Indicators to Track</h3>
                <div className="flex flex-wrap gap-2">
                  {structured.potentialIndicators?.map((indicator: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#1B3A6B] text-white rounded-full text-sm"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>

              {structured.researchQuestions && (
                <div className="mb-8">
                  <h3 className="font-semibold text-[#1B3A6B] mb-3">Research Questions</h3>
                  <ul className="space-y-2">
                    {structured.researchQuestions.map((q: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[#D97706] font-bold flex-shrink-0">{idx + 1}.</span>
                        <span className="text-gray-700">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-[#1B3A6B] mb-2">Next Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>View Evidence Graph with related datasets, research, and policies</li>
                  <li>Analyze Research Intelligence to see what's known and unknown</li>
                  <li>Explore GIS Evidence to visualize the problem spatially</li>
                  <li>Design policy interventions in the Policy Lab</li>
                  <li>Simulate scenarios in the Policy Sandbox</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <Button className="gov-button flex-1">
                  View Evidence Graph
                </Button>
                <Button
                  onClick={() => {
                    setStructured(null);
                    setProblemText('');
                  }}
                  className="gov-button-secondary flex-1"
                >
                  Start New Discovery
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
