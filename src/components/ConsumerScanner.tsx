import React, { useState } from 'react';
import { Scan, QrCode, Package, Eye, Search, Truck } from 'lucide-react';

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

interface ConsumerScannerProps {
  onScanQR: (batchId: string) => void;
  batches: Batch[];
}

export function ConsumerScanner({ onScanQR, batches }: ConsumerScannerProps) {
  const [scanMode, setScanMode] = useState(false);
  const [searchId, setSearchId] = useState('');

  const handleQuickScan = (batchId: string) => {
    onScanQR(batchId);
  };

  const handleSearch = () => {
    if (searchId) {
      const batch = batches.find(b => b.id.toLowerCase().includes(searchId.toLowerCase()));
      if (batch) {
        onScanQR(batch.id);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Product Tracer</h2>
        <p className="text-gray-600 mt-2">Scan QR codes to trace your food's journey from farm to table</p>
      </div>

      {/* Scanner Interface */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {!scanMode ? (
            <div className="p-8 text-center">
              <div className="bg-purple-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                <Scan className="h-12 w-12 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan QR Code</h3>
              <p className="text-gray-600 mb-6">Point your camera at the QR code on the product package</p>
              <button
                onClick={() => setScanMode(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors w-full"
              >
                <Scan className="h-6 w-6 inline mr-3" />
                Start Scanning
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="border-4 border-dashed border-purple-300 rounded-lg p-12 text-center mb-6">
                <QrCode className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-600 font-medium">Camera scanning simulation</p>
                <p className="text-sm text-gray-500 mt-2">In production, this would access device camera</p>
              </div>
              <button
                onClick={() => setScanMode(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium w-full transition-colors"
              >
                Stop Scanning
              </button>
            </div>
          )}
        </div>

        {/* Manual Search */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Or search by Batch ID</h4>
          <div className="flex space-x-3">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter batch ID"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Demo Scans */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Demo Products - Try Scanning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.slice(0, 6).map((batch) => (
            <div 
              key={batch.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuickScan(batch.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 capitalize">{batch.crop}</h4>
                    <p className="text-sm text-gray-600">{batch.quantity} kg</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <QrCode className="h-6 w-6 text-gray-600" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">₹{batch.price}/kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    batch.status === 'harvested' ? 'text-green-600' :
                    batch.status === 'in_transit' ? 'text-blue-600' :
                    batch.status === 'at_retailer' ? 'text-purple-600' :
                    'text-gray-600'
                  }`}>
                    {batch.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Journey</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Why Trace Your Food?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                <Package className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Quality Assurance</h4>
              <p className="text-sm opacity-90">Know exactly where your food came from</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                <Eye className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Full Transparency</h4>
              <p className="text-sm opacity-90">See every step of the supply chain</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                <Truck className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Fair Trade</h4>
              <p className="text-sm opacity-90">Support farmers with fair pricing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}