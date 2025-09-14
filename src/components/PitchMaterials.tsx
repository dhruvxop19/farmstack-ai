import React from 'react';
import { TrendingUp, Shield, Users, Zap, Target, CheckCircle } from 'lucide-react';

export function PitchMaterials() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Problem Statement */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem Statement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lack of Transparency</h3>
            <p className="text-sm text-gray-600">Consumers can't verify food origin, quality, or authenticity</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Users className="h-8 w-8 text-orange-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Unfair Pricing</h3>
            <p className="text-sm text-gray-600">Farmers don't receive fair compensation due to middleman exploitation</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Target className="h-8 w-8 text-yellow-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Food Fraud</h3>
            <p className="text-sm text-gray-600">Easy to mislabel products, leading to consumer mistrust</p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Solution: FarmStack</h2>
        <p className="text-xl text-center mb-8 opacity-90">
          A blockchain-powered supply chain platform that ensures transparency, fair pricing, and authenticity in agriculture
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Shield className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Immutable Records</h3>
            <p className="text-sm opacity-90">Blockchain ensures data cannot be tampered with</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Zap className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-sm opacity-90">Track products from farm to consumer in real-time</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Users className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Fair Trade</h3>
            <p className="text-sm opacity-90">Direct connection between farmers and consumers</p>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <TrendingUp className="h-8 w-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Market Insights</h3>
            <p className="text-sm opacity-90">Data-driven pricing and demand forecasting</p>
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Farmer Registers</h3>
              <p className="text-sm text-gray-600">Farmer registers harvest batch on blockchain with QR code</p>
            </div>

            <div className="hidden md:block text-center">
              <div className="text-gray-400">→</div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <span className="text-2xl">🚛</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Distribution</h3>
              <p className="text-sm text-gray-600">Distributors update ownership and pricing transparently</p>
            </div>

            <div className="hidden md:block text-center">
              <div className="text-gray-400">→</div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Consumer Scans</h3>
              <p className="text-sm text-gray-600">Consumers scan QR to see complete journey and verify authenticity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Impact */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Expected Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-lg p-6 mb-4">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">30% Increase in Farmer Income</h3>
            <p className="text-gray-600">Direct market access and fair pricing transparency</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-6 mb-4">
              <Shield className="h-12 w-12 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">95% Fraud Reduction</h3>
            <p className="text-gray-600">Immutable blockchain records prevent counterfeiting</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-lg p-6 mb-4">
              <Users className="h-12 w-12 text-purple-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enhanced Consumer Trust</h3>
            <p className="text-gray-600">Complete transparency builds confidence in food safety</p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Key Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹1.2M</p>
              <p className="text-sm text-gray-600">Additional farmer revenue per year</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">50K+</p>
              <p className="text-sm text-gray-600">Products traced monthly</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-gray-600">Customer satisfaction rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">24h</p>
              <p className="text-sm text-gray-600">Average farm-to-shelf time</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}