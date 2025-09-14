import React, { useState } from 'react';
import { Plus, Package, QrCode, Leaf, Calendar, Weight, MapPin, ArrowRight, Truck } from 'lucide-react';
import { generateQRCode } from '../utils/qrCode';

interface Batch {
  id: string;
  crop: string;
  quantity: number;
  farmerId: string;
  currentOwner: string;
  price: number;
  status: string;
  timestamp: string;
  history: any[];
}

interface FarmerDashboardProps {
  onCreateBatch: (batchData: any) => void;
  batches: Batch[];
}

export function FarmerDashboard({ onCreateBatch, batches }: FarmerDashboardProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    farmerId: 'farmer1',
    farmerName: 'Green Valley Farm',
    location: 'Maharashtra, India',
    organicCertified: false,
    harvestDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const batchData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      timestamp: new Date().toISOString()
    };
    onCreateBatch(batchData);
    setFormData({
      crop: '',
      quantity: '',
      farmerId: 'farmer1',
      farmerName: 'Green Valley Farm',
      location: 'Maharashtra, India',
      organicCertified: false,
      harvestDate: new Date().toISOString().split('T')[0]
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h2>
          <p className="text-gray-600 mt-2">Register and track your produce on the blockchain</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>Register Batch</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Batches</p>
              <p className="text-3xl font-bold text-gray-900">{batches.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Batches</p>
              <p className="text-3xl font-bold text-gray-900">
                {batches.filter(b => b.status !== 'sold').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{batches.reduce((sum, b) => sum + (b.price * b.quantity), 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Weight className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Register New Batch</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Leaf className="h-4 w-4 inline mr-2" />
                  Crop Type
                </label>
                <select
                  value={formData.crop}
                  onChange={(e) => setFormData(prev => ({ ...prev, crop: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select crop</option>
                  <option value="tomatoes">🍅 Tomatoes</option>
                  <option value="rice">🌾 Rice</option>
                  <option value="wheat">🌾 Wheat</option>
                  <option value="potatoes">🥔 Potatoes</option>
                  <option value="onions">🧅 Onions</option>
                  <option value="mangoes">🥭 Mangoes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Weight className="h-4 w-4 inline mr-2" />
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter quantity in kg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Harvest Date
                </label>
                <input
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, harvestDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Farm Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter farm location"
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="organic"
                  checked={formData.organicCertified}
                  onChange={(e) => setFormData(prev => ({ ...prev, organicCertified: e.target.checked }))}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="organic" className="text-sm font-medium text-gray-700">
                  Organic Certified
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Register Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">{batch.crop}</h3>
                    <p className="text-sm text-gray-600">Batch #{batch.id.slice(0, 8)}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  batch.status === 'harvested' ? 'bg-green-100 text-green-800' :
                  batch.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                  batch.status === 'at_retailer' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {batch.status.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="text-sm font-medium">{batch.quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-sm font-medium">₹{batch.price}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Owner:</span>
                  <span className="text-sm font-medium">{batch.currentOwner}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="bg-gray-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                      <QrCode className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600">QR Code Generated</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-600">Ready for Transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {batches.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
            <Package className="h-12 w-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No batches registered yet</h3>
          <p className="text-gray-600 mb-6">Start by registering your first produce batch</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Register First Batch</span>
          </button>
        </div>
      )}
    </div>
  );
}