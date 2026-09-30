'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Plus } from 'lucide-react';

export default function PolicyLabPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1B3A6B] flex items-center gap-2">
            <Lightbulb size={28} />
            Policy Lab
          </h1>
          <p className="text-gray-600">Design interventions based on evidence</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button className="gov-button flex items-center gap-2">
            <Plus size={20} />
            Create New Policy Intervention
          </Button>
        </div>

        {/* Example Policy */}
        <div>
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Active Policies</h2>

          <Card className="p-8">
            <h3 className="text-xl font-semibold text-[#1B3A6B] mb-4">Controlled Agricultural Conversion Zone</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-[#1B3A6B] mb-3">Problem Addressed</h4>
                <p className="text-gray-700">Agricultural land around rapidly expanding cities is being converted into built-up areas</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#1B3A6B] mb-3">Proposed Intervention</h4>
                <p className="text-gray-700">Create designated zones where agricultural-to-urban land conversion is allowed with compensation to farmers</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#1B3A6B] mb-3">Target Geography</h4>
                <p className="text-gray-700">Urban fringe regions, Maharashtra (Pune, Nagpur, Aurangabad)</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#1B3A6B] mb-3">Target Population</h4>
                <p className="text-gray-700">Farmers, urban developers, local authorities</p>
              </div>
            </div>

            <div className="border-t pt-8">
              <h4 className="font-semibold text-[#1B3A6B] mb-4">Supporting Evidence</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-blue-50">
                  <p className="text-sm font-semibold text-blue-900">8 Datasets</p>
                  <p className="text-xs text-blue-800">Satellite imagery, population, climate</p>
                </Card>
                <Card className="p-4 bg-purple-50">
                  <p className="text-sm font-semibold text-purple-900">14 Research Papers</p>
                  <p className="text-xs text-purple-800">Urban expansion, livelihood impacts</p>
                </Card>
                <Card className="p-4 bg-green-50">
                  <p className="text-sm font-semibold text-green-900">3 Policies</p>
                  <p className="text-xs text-green-800">Land protection regulations</p>
                </Card>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="gov-button">Simulate Scenarios</Button>
              <Button className="gov-button-secondary">Create Experiment</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
