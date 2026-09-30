'use client';

import Link from 'next/link';
import { MapPin, BarChart3, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#1B3A6B]">BhoomiConnect</h1>
              <p className="text-sm text-gray-600">Evidence-to-Policy Platform</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/auth/signin" className="gov-button">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0F2847] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-6">Transform Land Governance with Evidence</h2>
            <p className="text-xl mb-8 text-gray-100">
              India has vast land data, GIS systems, and research. BhoomiConnect connects them — turning fragmented information into testable policies, measurable outcomes, and reusable knowledge.
            </p>
            <div className="flex gap-4">
              <Link href="/discover" className="gov-button-secondary inline-flex items-center gap-2 px-6 py-3">
                Start Exploring
                <ArrowRight size={20} />
              </Link>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Loop */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#1B3A6B]">The Evidence-to-Policy Loop</h3>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="gov-card">
              <div className="text-3xl mb-4">🔍</div>
              <h4 className="font-semibold mb-2 text-[#1B3A6B]">DISCOVER</h4>
              <p className="text-gray-600">Enter a land problem in natural language. We structure it into a research question.</p>
            </div>

            <div className="gov-card">
              <div className="text-3xl mb-4">🔗</div>
              <h4 className="font-semibold mb-2 text-[#1B3A6B]">CONNECT</h4>
              <p className="text-gray-600">Evidence Graph shows all relevant data, research, policies, and case studies connected.</p>
            </div>

            <div className="gov-card">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="font-semibold mb-2 text-[#1B3A6B]">ANALYSE</h4>
              <p className="text-gray-600">Research Intelligence reveals what's known, what's uncertain, and what's unexplored.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="gov-card">
              <div className="text-3xl mb-4">🗺️</div>
              <h4 className="font-semibold mb-2 text-[#1B3A6B]">DESIGN</h4>
              <p className="text-gray-600">Policy Lab helps you design interventions backed by evidence.</p>
            </div>

            <div className="gov-card">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="font-semibold mb-2 text-[#1B3A6B]">SIMULATE</h4>
              <p className="text-gray-600">Policy Sandbox compares scenarios before implementation.</p>
            </div>

            <div className="gov-card">
              <div className="text-3xl mb-4">📈</div>
              <h4 className="font-semibold mb-2 text-[#1B3A6B]">MEASURE</h4>
              <p className="text-gray-600">Track KPIs, measure outcomes, create reusable institutional memory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-12 text-[#1B3A6B]">Core Innovations</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle2 className="text-[#059669] flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold mb-1 text-[#1B3A6B]">Land Evidence Graph</h4>
                <p className="text-gray-600">Connects Problems ↔ Data ↔ Research ↔ Policy ↔ Experiments ↔ Outcomes in one visual network.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="text-[#059669] flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold mb-1 text-[#1B3A6B]">Research Gap Engine</h4>
                <p className="text-gray-600">Identifies exactly what's understudied: geographies, timeframes, methodologies needing research.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="text-[#059669] flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold mb-1 text-[#1B3A6B]">Policy Sandbox</h4>
                <p className="text-gray-600">Compare policy scenarios side-by-side with evidence-based projections before deciding.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="text-[#059669] flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold mb-1 text-[#1B3A6B]">Evidence Provenance</h4>
                <p className="text-gray-600">Every number is traceable: click to see source, method, limitations, and confidence level.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="text-[#059669] flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold mb-1 text-[#1B3A6B]">Policy Passport</h4>
                <p className="text-gray-600">Convert completed experiments into reusable institutional knowledge for other departments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B3A6B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Transform Land Governance?</h3>
          <p className="text-lg mb-8 text-gray-100">
            Start by exploring a land governance problem. Let's turn fragmented data into actionable evidence.
          </p>
          <Link href="/discover" className="gov-button-secondary inline-flex items-center gap-2 px-8 py-3">
            Begin Discovery
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p>&copy; 2026 BhoomiConnect. Evidence-to-Policy Platform for Land Governance.</p>
            <p className="text-sm">Ministry of Rural Development | PS SIH26019</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
