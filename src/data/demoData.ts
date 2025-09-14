// Demo data for the agricultural supply chain MVP

export const demoData = {
  batches: [
    {
      id: 'BATCH_TOM001',
      crop: 'tomatoes',
      quantity: 500,
      farmerId: 'farmer1',
      farmerName: 'Green Valley Farm',
      currentOwner: 'Green Valley Farm',
      price: 45,
      status: 'harvested' as const,
      timestamp: '2025-01-08T06:00:00.000Z',
      location: 'Nashik, Maharashtra',
      organicCertified: true,
      history: [
        {
          action: 'Batch Registered',
          owner: 'Green Valley Farm',
          timestamp: '2025-01-08T06:00:00.000Z',
          stage: 'harvested',
          location: 'Nashik, Maharashtra',
          transactionHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
        }
      ]
    },
    {
      id: 'BATCH_RIC002',
      crop: 'rice',
      quantity: 1000,
      farmerId: 'farmer2',
      farmerName: 'Sunrise Agriculture',
      currentOwner: 'FreshMart Retailer',
      price: 52,
      status: 'at_retailer' as const,
      timestamp: '2025-01-07T05:30:00.000Z',
      location: 'Aurangabad, Maharashtra',
      organicCertified: false,
      history: [
        {
          action: 'Batch Registered',
          owner: 'Sunrise Agriculture',
          timestamp: '2025-01-07T05:30:00.000Z',
          stage: 'harvested',
          location: 'Aurangabad, Maharashtra',
          transactionHash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567'
        },
        {
          action: 'Transferred to Distributor',
          owner: 'Maharashtra Distribution Co.',
          timestamp: '2025-01-07T14:00:00.000Z',
          stage: 'in_transit',
          location: 'Transport Hub, Pune',
          transactionHash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678'
        },
        {
          action: 'Price Updated',
          owner: 'Maharashtra Distribution Co.',
          timestamp: '2025-01-07T16:30:00.000Z',
          stage: 'in_transit',
          price: 52,
          transactionHash: '0xd4e5f6789012345678901234567890abcdef1234567890abcdef123456789'
        },
        {
          action: 'Transferred to Retailer',
          owner: 'FreshMart Retailer',
          timestamp: '2025-01-08T09:00:00.000Z',
          stage: 'at_retailer',
          location: 'Mumbai, Maharashtra',
          transactionHash: '0xe5f6789012345678901234567890abcdef1234567890abcdef1234567890'
        }
      ]
    },
    {
      id: 'BATCH_WHE003',
      crop: 'wheat',
      quantity: 750,
      farmerId: 'farmer1',
      farmerName: 'Green Valley Farm',
      currentOwner: 'Maharashtra Distribution Co.',
      price: 38,
      status: 'in_transit' as const,
      timestamp: '2025-01-06T07:00:00.000Z',
      location: 'Nashik, Maharashtra',
      organicCertified: true,
      history: [
        {
          action: 'Batch Registered',
          owner: 'Green Valley Farm',
          timestamp: '2025-01-06T07:00:00.000Z',
          stage: 'harvested',
          location: 'Nashik, Maharashtra',
          transactionHash: '0xf6789012345678901234567890abcdef1234567890abcdef12345678901'
        },
        {
          action: 'Transferred to Distributor',
          owner: 'Maharashtra Distribution Co.',
          timestamp: '2025-01-07T11:00:00.000Z',
          stage: 'in_transit',
          location: 'Transport Hub, Pune',
          transactionHash: '0x6789012345678901234567890abcdef1234567890abcdef123456789012'
        }
      ]
    },
    {
      id: 'BATCH_POT004',
      crop: 'potatoes',
      quantity: 300,
      farmerId: 'farmer2',
      farmerName: 'Sunrise Agriculture',
      currentOwner: 'Organic Foods Co.',
      price: 25,
      status: 'at_retailer' as const,
      timestamp: '2025-01-05T06:45:00.000Z',
      location: 'Aurangabad, Maharashtra',
      organicCertified: true,
      history: [
        {
          action: 'Batch Registered',
          owner: 'Sunrise Agriculture',
          timestamp: '2025-01-05T06:45:00.000Z',
          stage: 'harvested',
          location: 'Aurangabad, Maharashtra',
          transactionHash: '0x789012345678901234567890abcdef1234567890abcdef1234567890123'
        },
        {
          action: 'Transferred to Distributor',
          owner: 'Maharashtra Distribution Co.',
          timestamp: '2025-01-06T10:30:00.000Z',
          stage: 'in_transit',
          location: 'Transport Hub, Pune',
          transactionHash: '0x89012345678901234567890abcdef1234567890abcdef12345678901234'
        },
        {
          action: 'Transferred to Retailer',
          owner: 'Organic Foods Co.',
          timestamp: '2025-01-07T15:45:00.000Z',
          stage: 'at_retailer',
          location: 'Pune, Maharashtra',
          transactionHash: '0x9012345678901234567890abcdef1234567890abcdef123456789012345'
        }
      ]
    },
    {
      id: 'BATCH_ONI005',
      crop: 'onions',
      quantity: 400,
      farmerId: 'farmer1',
      farmerName: 'Green Valley Farm',
      currentOwner: 'Local Grocery Chain',
      price: 35,
      status: 'at_retailer' as const,
      timestamp: '2025-01-04T08:15:00.000Z',
      location: 'Nashik, Maharashtra',
      organicCertified: false,
      history: [
        {
          action: 'Batch Registered',
          owner: 'Green Valley Farm',
          timestamp: '2025-01-04T08:15:00.000Z',
          stage: 'harvested',
          location: 'Nashik, Maharashtra',
          transactionHash: '0x012345678901234567890abcdef1234567890abcdef1234567890123456'
        },
        {
          action: 'Transferred to Distributor',
          owner: 'Maharashtra Distribution Co.',
          timestamp: '2025-01-05T13:20:00.000Z',
          stage: 'in_transit',
          location: 'Transport Hub, Pune',
          transactionHash: '0x12345678901234567890abcdef1234567890abcdef12345678901234567'
        },
        {
          action: 'Price Updated',
          owner: 'Maharashtra Distribution Co.',
          timestamp: '2025-01-06T09:10:00.000Z',
          stage: 'in_transit',
          price: 35,
          transactionHash: '0x2345678901234567890abcdef1234567890abcdef123456789012345678'
        },
        {
          action: 'Transferred to Retailer',
          owner: 'Local Grocery Chain',
          timestamp: '2025-01-07T12:30:00.000Z',
          stage: 'at_retailer',
          location: 'Nashik, Maharashtra',
          transactionHash: '0x345678901234567890abcdef1234567890abcdef1234567890123456789'
        }
      ]
    },
    {
      id: 'BATCH_MAN006',
      crop: 'mangoes',
      quantity: 200,
      farmerId: 'farmer2',
      farmerName: 'Sunrise Agriculture',
      currentOwner: 'Sunrise Agriculture',
      price: 80,
      status: 'harvested' as const,
      timestamp: '2025-01-08T07:30:00.000Z',
      location: 'Aurangabad, Maharashtra',
      organicCertified: true,
      history: [
        {
          action: 'Batch Registered',
          owner: 'Sunrise Agriculture',
          timestamp: '2025-01-08T07:30:00.000Z',
          stage: 'harvested',
          location: 'Aurangabad, Maharashtra',
          transactionHash: '0x45678901234567890abcdef1234567890abcdef12345678901234567890'
        }
      ]
    }
  ],

  farmers: [
    {
      id: 'farmer1',
      name: 'Green Valley Farm',
      location: 'Nashik, Maharashtra',
      contact: '+91 98765 43210',
      organicCertified: true,
      registrationDate: '2024-06-15'
    },
    {
      id: 'farmer2',
      name: 'Sunrise Agriculture',
      location: 'Aurangabad, Maharashtra',
      contact: '+91 87654 32109',
      organicCertified: true,
      registrationDate: '2024-07-22'
    }
  ],

  distributors: [
    {
      id: 'distributor1',
      name: 'Maharashtra Distribution Co.',
      location: 'Pune, Maharashtra',
      contact: '+91 76543 21098',
      licenseNumber: 'DIST-MH-2024-001'
    }
  ],

  retailers: [
    {
      id: 'retailer1',
      name: 'FreshMart Retailer',
      location: 'Mumbai, Maharashtra',
      contact: '+91 65432 10987'
    },
    {
      id: 'retailer2',
      name: 'Organic Foods Co.',
      location: 'Pune, Maharashtra',
      contact: '+91 54321 09876'
    },
    {
      id: 'retailer3',
      name: 'Local Grocery Chain',
      location: 'Nashik, Maharashtra',
      contact: '+91 43210 98765'
    }
  ]
};