import React from 'react';
import { X, Leaf, Truck, Store, User, Calendar, MapPin, DollarSign, Package, Shield, Award } from 'lucide-react';
import { getBatch } from '../utils/blockchain';

interface BatchHistoryProps {
  batchId: string;
  onClose: () => void;
}

export function BatchHistory({ batchId, onClose }: BatchHistoryProps) {
  const batch = getBatch(batchId);

  if (!batch) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Batch Not Found</h3>
          <p className="text-gray-600 mb-6">The batch ID you scanned could not be found.</p>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'harvested': return <Leaf className="h-5 w-5 text-green-600" />;
      case 'in_transit': return <Truck className="h-5 w-5 text-blue-600" />;
      case 'at_retailer': return <Store className="h-5 w-5 text-purple-600" />;
      default: return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'harvested': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'at_retailer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 capitalize">{batch.crop}</h3>
                <p className="text-gray-600">Batch #{batch.id.slice(0, 8)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-4">Product Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Quantity</p>
                <p className="font-medium">{batch.quantity} kg</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium">₹{batch.price}/kg</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Harvest Date</p>
                <p className="font-medium">{new Date(batch.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Origin</p>
                <p className="font-medium">Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6 flex space-x-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Blockchain Verified</span>
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>Organic Certified</span>
            </span>
          </div>
        </div>

        {/* Supply Chain Journey */}
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-6">Supply Chain Journey</h4>
          
          <div className="space-y-4">
            {batch.history.map((entry, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`p-3 rounded-full ${
                    index === 0 ? 'bg-green-100' :
                    index === 1 ? 'bg-blue-100' :
                    index === 2 ? 'bg-purple-100' :
                    'bg-gray-100'
                  }`}>
                    {getStageIcon(entry.stage)}
                  </div>
                  {index < batch.history.length - 1 && (
                    <div className="w-px bg-gray-300 h-8 mt-2" />
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{entry.action}</h5>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(entry.stage)}`}>
                      {entry.stage.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{entry.owner}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    </span>
                    {entry.location && (
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{entry.location}</span>
                      </span>
                    )}
                  </div>
                  {entry.price && (
                    <p className="text-sm text-gray-600 mt-1">Price: ₹{entry.price}/kg</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Blockchain Verified</p>
                <p className="text-sm text-gray-600">Immutable record on Polygon network</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Transaction Hash</p>
              <p className="text-xs font-mono text-gray-500">0x{batch.id}...abc123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}