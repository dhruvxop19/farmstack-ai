import React, { useState, useEffect } from 'react';
import { QrCode, Scan, Plus, Users, Package, Eye, ArrowRight, Leaf, Truck, Store, User, TrendingUp } from 'lucide-react';
import { generateQRCode, simulateScan } from './utils/qrCode';
import { createBatch, transferBatch, updatePrice, getBatch, getAllBatches } from './utils/blockchain';
import { FarmerDashboard } from './components/FarmerDashboard';
import { DistributorDashboard } from './components/DistributorDashboard';
import { ConsumerScanner } from './components/ConsumerScanner';
import { BatchHistory } from './components/BatchHistory';
import { PricePredictionAgent } from './components/PricePredictionAgent';
import { demoData } from './data/demoData';

type UserRole = 'farmer' | 'distributor' | 'consumer' | 'ai-predictor';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [batches, setBatches] = useState(demoData.batches);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with demo data
    demoData.batches.forEach(batch => {
      localStorage.setItem(`batch_${batch.id}`, JSON.stringify(batch));
    });
  }, []);

  const handleCreateBatch = (batchData: any) => {
    const newBatch = createBatch(batchData);
    setBatches(prev => [...prev, newBatch]);
    localStorage.setItem(`batch_${newBatch.id}`, JSON.stringify(newBatch));
  };

  const handleTransferBatch = (batchId: string, newOwner: string) => {
    const updatedBatch = transferBatch(batchId, newOwner);
    if (updatedBatch) {
      setBatches(prev => prev.map(b => b.id === batchId ? updatedBatch : b));
      localStorage.setItem(`batch_${batchId}`, JSON.stringify(updatedBatch));
    }
  };

  const handleUpdatePrice = (batchId: string, newPrice: number) => {
    const updatedBatch = updatePrice(batchId, newPrice);
    if (updatedBatch) {
      setBatches(prev => prev.map(b => b.id === batchId ? updatedBatch : b));
      localStorage.setItem(`batch_${batchId}`, JSON.stringify(updatedBatch));
    }
  };

  const handleScanQR = (batchId: string) => {
    setSelectedBatch(batchId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FarmStack</h1>
                <p className="text-sm text-gray-600">Blockchain Supply Chain</p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUserRole('farmer')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${userRole === 'farmer' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <User className="h-4 w-4" />
                <span>Farmer</span>
              </button>
              <button
                onClick={() => setUserRole('distributor')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${userRole === 'distributor' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Truck className="h-4 w-4" />
                <span>Distributor</span>
              </button>
              <button
                onClick={() => setUserRole('consumer')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${userRole === 'consumer' ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Scan className="h-4 w-4" />
                <span>Consumer</span>
              </button>
              <button
                onClick={() => setUserRole('ai-predictor')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${userRole === 'ai-predictor' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>AI Predictor</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userRole === 'farmer' && (
          <FarmerDashboard
            onCreateBatch={handleCreateBatch}
            batches={batches.filter(b => b.farmerId === 'farmer1' || b.farmerId === 'farmer2')}
          />
        )}

        {userRole === 'distributor' && (
          <DistributorDashboard
            batches={batches}
            onTransferBatch={handleTransferBatch}
            onUpdatePrice={handleUpdatePrice}
          />
        )}

        {userRole === 'consumer' && (
          <ConsumerScanner
            onScanQR={handleScanQR}
            batches={batches}
          />
        )}

        {userRole === 'ai-predictor' && (
          <PricePredictionAgent />
        )}

        {/* Batch History Modal */}
        {selectedBatch && (
          <BatchHistory
            batchId={selectedBatch}
            onClose={() => setSelectedBatch(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              FarmStack - Transparent, Traceable, Trustworthy Agriculture
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by Blockchain Technology for Supply Chain Transparency
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;