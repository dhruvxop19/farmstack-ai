import React, { useState } from 'react';
import { Truck, ArrowRight, DollarSign, Package, Clock, MapPin } from 'lucide-react';

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

interface DistributorDashboardProps {
  batches: Batch[];
  onTransferBatch: (batchId: string, newOwner: string) => void;
  onUpdatePrice: (batchId: string, newPrice: number) => void;
}

export function DistributorDashboard({ batches, onTransferBatch, onUpdatePrice }: DistributorDashboardProps) {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [transferTarget, setTransferTarget] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const availableBatches = batches.filter(b => 
    b.currentOwner === 'Green Valley Farm' || 
    b.currentOwner === 'distributor1' || 
    b.status === 'harvested'
  );

  const handleTransfer = (batchId: string) => {
    if (transferTarget) {
      onTransferBatch(batchId, transferTarget);
      setTransferTarget('');
      setSelectedBatch(null);
    }
  };

  const handlePriceUpdate = (batchId: string) => {
    if (newPrice) {
      onUpdatePrice(batchId, parseFloat(newPrice));
      setNewPrice('');
      setSelectedBatch(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Distributor Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage transfers and pricing for agricultural batches</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Batches</p>
              <p className="text-2xl font-bold text-gray-900">{availableBatches.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">
                {batches.filter(b => b.status === 'in_transit').length}
              </p>
            </div>
            <Truck className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Retailer</p>
              <p className="text-2xl font-bold text-gray-900">
                {batches.filter(b => b.status === 'at_retailer').length}
              </p>
            </div>
            <MapPin className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{availableBatches.reduce((sum, b) => sum + (b.price * b.quantity), 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Batches List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Available Batches</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {availableBatches.map((batch) => (
            <div key={batch.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 capitalize">{batch.crop}</h4>
                    <p className="text-sm text-gray-600">Batch #{batch.id.slice(0, 8)}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">{batch.quantity} kg</span>
                      <span className="text-sm text-gray-600">₹{batch.price}/kg</span>
                      <span className="text-sm text-gray-600">Owner: {batch.currentOwner}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedBatch(batch.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Truck className="h-4 w-4 inline mr-2" />
                    Transfer
                  </button>
                  <button
                    onClick={() => setSelectedBatch(batch.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <DollarSign className="h-4 w-4 inline mr-2" />
                    Price
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer/Price Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Manage Batch</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer to:</label>
                <select
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select transfer target</option>
                  <option value="FreshMart Retailer">FreshMart Retailer</option>
                  <option value="Organic Foods Co.">Organic Foods Co.</option>
                  <option value="Local Grocery Chain">Local Grocery Chain</option>
                </select>
                <button
                  onClick={() => handleTransfer(selectedBatch)}
                  disabled={!transferTarget}
                  className="w-full mt-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Transfer Batch
                </button>
              </div>

              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Price (₹/kg):</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter new price"
                />
                <button
                  onClick={() => handlePriceUpdate(selectedBatch)}
                  disabled={!newPrice}
                  className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Update Price
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedBatch(null)}
              className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}