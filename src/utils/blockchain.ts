// Simulated blockchain functions for demo purposes
// In production, these would interact with actual smart contracts

interface Batch {
  id: string;
  crop: string;
  quantity: number;
  farmerId: string;
  farmerName: string;
  currentOwner: string;
  price: number;
  status: 'harvested' | 'in_transit' | 'at_retailer' | 'sold';
  timestamp: string;
  location: string;
  organicCertified: boolean;
  history: HistoryEntry[];
}

interface HistoryEntry {
  action: string;
  owner: string;
  timestamp: string;
  stage: string;
  location?: string;
  price?: number;
  transactionHash: string;
}

export function createBatch(batchData: any): Batch {
  const batchId = generateBatchId();
  const batch: Batch = {
    id: batchId,
    crop: batchData.crop,
    quantity: batchData.quantity,
    farmerId: batchData.farmerId,
    farmerName: batchData.farmerName,
    currentOwner: batchData.farmerName,
    price: Math.floor(Math.random() * 50) + 20, // Random price between 20-70
    status: 'harvested',
    timestamp: batchData.timestamp,
    location: batchData.location,
    organicCertified: batchData.organicCertified,
    history: [{
      action: 'Batch Registered',
      owner: batchData.farmerName,
      timestamp: batchData.timestamp,
      stage: 'harvested',
      location: batchData.location,
      transactionHash: generateTxHash()
    }]
  };

  return batch;
}

export function transferBatch(batchId: string, newOwner: string): Batch | null {
  const batchData = localStorage.getItem(`batch_${batchId}`);
  if (!batchData) return null;

  const batch: Batch = JSON.parse(batchData);
  
  // Update batch
  batch.currentOwner = newOwner;
  batch.status = newOwner.includes('Retailer') ? 'at_retailer' : 'in_transit';
  
  // Add history entry
  batch.history.push({
    action: `Transferred to ${newOwner}`,
    owner: newOwner,
    timestamp: new Date().toISOString(),
    stage: batch.status,
    location: getLocationForOwner(newOwner),
    transactionHash: generateTxHash()
  });

  localStorage.setItem(`batch_${batchId}`, JSON.stringify(batch));
  return batch;
}

export function updatePrice(batchId: string, newPrice: number): Batch | null {
  const batchData = localStorage.getItem(`batch_${batchId}`);
  if (!batchData) return null;

  const batch: Batch = JSON.parse(batchData);
  
  // Update price
  batch.price = newPrice;
  
  // Add history entry
  batch.history.push({
    action: 'Price Updated',
    owner: batch.currentOwner,
    timestamp: new Date().toISOString(),
    stage: batch.status,
    price: newPrice,
    transactionHash: generateTxHash()
  });

  localStorage.setItem(`batch_${batchId}`, JSON.stringify(batch));
  return batch;
}

export function getBatch(batchId: string): Batch | null {
  const batchData = localStorage.getItem(`batch_${batchId}`);
  return batchData ? JSON.parse(batchData) : null;
}

export function getAllBatches(): Batch[] {
  const batches: Batch[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('batch_')) {
      const batchData = localStorage.getItem(key);
      if (batchData) {
        batches.push(JSON.parse(batchData));
      }
    }
  }
  return batches;
}

// Utility functions
function generateBatchId(): string {
  return 'BATCH_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateTxHash(): string {
  return '0x' + Math.random().toString(16).substr(2, 64);
}

function getLocationForOwner(owner: string): string {
  const locations: { [key: string]: string } = {
    'FreshMart Retailer': 'Mumbai, Maharashtra',
    'Organic Foods Co.': 'Pune, Maharashtra',
    'Local Grocery Chain': 'Nashik, Maharashtra',
    'distributor1': 'Transport Hub, Pune'
  };
  return locations[owner] || 'Unknown Location';
}