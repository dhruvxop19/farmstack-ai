// QR Code utilities for generating and scanning codes

export function generateQRCode(batchId: string): string {
  // In production, this would generate an actual QR code image
  // For demo purposes, we'll return a data URL or reference
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(batchId)}`;
}

export function simulateScan(qrData: string): string | null {
  // Simulate QR code scanning
  // In production, this would use device camera and QR scanning library
  
  // Extract batch ID from QR data
  try {
    if (qrData.startsWith('BATCH_')) {
      return qrData;
    }
    // Try to extract from URL
    const url = new URL(qrData);
    const batchId = url.searchParams.get('batch') || url.pathname.split('/').pop();
    return batchId || null;
  } catch {
    // Assume direct batch ID
    return qrData.startsWith('BATCH_') ? qrData : null;
  }
}

export function createTraceabilityURL(batchId: string): string {
  return `https://agritrace.app/trace/${batchId}`;
}