'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  Map,
  Lightbulb,
  FileText,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function DashboardHome() {
  const modules = [
    {
      title: 'Research Intelligence',
      description: 'Analyze available evidence and identify research gaps',
      icon: BarChart3,
      href: '/dashboard/research',
      color: 'text-blue-600',
    },
    {
      title: 'Evidence Explorer',
      description: 'Browse datasets, research papers, and policies',
      icon: FileText,
      href: '/dashboard/evidence',
      color: 'text-purple-600',
    },
    {
      title: 'GIS Evidence',
      description: 'Visualize land-use changes and geospatial patterns',
      icon: Map,
      href: '/dashboard/land-intelligence/gis',
      color: 'text-green-600',
    },
    {
      title: 'Policy Lab',
      description: 'Design policy interventions based on evidence',
      icon: Lightbulb,
      href: '/dashboard/policy-lab/design',
      color: 'text-orange-600',
    },
    {
      title: 'KPI Dashboard',
      description: 'Track experiment outcomes and measure impact',
      icon: TrendingUp,
      href: '/dashboard/evaluation/kpi-dashboard',
      color: 'text-red-600',
    },
    {
      title: 'Policy Passports',
      description: 'Reusable institutional knowledge from experiments',
      icon: Award,
      href: '/dashboard/knowledge/passports',
      color: 'text-amber-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1B3A6B]">Dashboard</h1>
            <p className="text-gray-600">Evidence-to-Policy Platform</p>
          </div>
          <Link href="/discover" className="gov-button">
            New Discovery
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1B3A6B] mb-8">Platform Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Link key={module.href} href={module.href}>
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#D97706] transition cursor-pointer">
                    <IconComponent size={32} className={`${module.color} mb-4`} />
                    <h3 className="font-semibold text-[#1B3A6B] mb-2">{module.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                    <div className="flex items-center text-[#D97706] font-semibold">
                      Explore
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-[#1B3A6B]">12</p>
            <p className="text-gray-600 text-sm">Problems Published</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-[#1B3A6B]">42</p>
            <p className="text-gray-600 text-sm">Evidence Items</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-[#1B3A6B]">8</p>
            <p className="text-gray-600 text-sm">Active Experiments</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-[#1B3A6B]">3</p>
            <p className="text-gray-600 text-sm">Policy Passports</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
