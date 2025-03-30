import { ParcelData, ZoningType, ParcelMatchStatus } from '@/types/parcel';

// Define the initial parcels
const INITIAL_PARCELS: ParcelData[] = [
  {
    id: '12345-67890-123',
    address: '123 Main Street, Austin, TX 78701',
    coordinates: [-97.743057, 30.267153], // longitude, latitude
    size: '7.5 acres',
    acreage: 7.5,
    zoning: 'Residential (R-1)',
    assessedValue: '$1,250,000',
    marketValue: '$1,450,000',
    lastSaleDate: 'June 15, 2019',
    lastSalePrice: '$950,000',
    owner: {
      name: 'John Smith',
      mailingAddress: '456 Oak St, Austin, TX 78704',
      verified: true,
      verificationSource: 'County Assessor',
      verificationDate: '2023-12-01',
      ownershipDuration: 5,
      entityType: 'individual',
    },
    history: [
      { date: 'Jun 2019', event: 'Sold', price: '$950,000', description: 'Sold to John Smith' },
      { date: 'Mar 2019', event: 'Listed', price: '$975,000' },
      { date: 'Nov 2018', event: 'Zoning Change', description: 'Zoning changed from Agricultural to Residential' }
    ],
    matchStatus: 'match',
    matchScore: 92,
    buyBoxCriteria: {
      acreage: [5, 30],
      topographyCompatible: true,
      zoningCompatible: true,
      utilityAccess: true,
      densityCompatible: true,
      incomeCompatible: true,
      floodplainCompatible: true,
      environmentalCompatible: true,
      schoolsCompatible: true,
      ownershipDurationCompatible: true,
      streetFrontageCompatible: true,
      withinCityLimits: true
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-97.744057, 30.268153],
        [-97.742057, 30.268153],
        [-97.742057, 30.266153],
        [-97.744057, 30.266153],
        [-97.744057, 30.268153]
      ]]
    },
    utilities: [
      { type: 'water', available: true, distance: 0 },
      { type: 'sewer', available: true, distance: 0 },
      { type: 'electricity', available: true, distance: 0 },
      { type: 'gas', available: true, distance: 150 },
      { type: 'fiber', available: false, distance: 1500 }
    ],
    schoolDistrict: {
      name: 'Austin ISD',
      rating: 8,
      elementarySchool: 'Highland Park Elementary',
      middleSchool: 'Hill Country Middle School',
      highSchool: 'Westlake High School'
    },
    environmental: {
      inFloodplain: false,
      knownIssues: false,
      topographyType: 'flat',
      slopePercentage: 1.2
    },
    jurisdiction: {
      city: 'Austin',
      county: 'Travis',
      withinCityLimits: true,
      governingAgencies: ['City of Austin', 'Travis County', 'Austin Water Utility'],
      zoningCode: 'R-1',
      zoningDescription: 'Single Family Residential',
      zoningType: 'residential-single',
      allowedDensity: 5,
      generalPlanConsistent: true
    },
    marketInfo: {
      medianIncome: 98000,
      averageHomePrice: 520000,
      medianRent: 2300,
      recentSales: {
        count: 12,
        averagePrice: 495000,
        pricePerSqFt: 325,
        transactions: [
          { date: '2023-12-15', address: '125 Oak Ln', price: 510000, sqFt: 1850, bedsBaths: '4/2.5' },
          { date: '2023-11-22', address: '237 Maple Ave', price: 485000, sqFt: 1650, bedsBaths: '3/2' },
          { date: '2023-10-05', address: '415 Cedar St', price: 525000, sqFt: 1920, bedsBaths: '4/3' },
          { date: '2023-09-18', address: '328 Pine Dr', price: 472000, sqFt: 1730, bedsBaths: '3/2.5' },
          { date: '2023-08-30', address: '512 Birch Blvd', price: 495000, sqFt: 1845, bedsBaths: '3/2' }
        ]
      },
      permitActivity: {
        last12Months: 23,
        trend: 'increasing',
        recentPermits: [
          { date: '2023-12-05', type: 'New Construction', value: 850000, description: 'Single-family home', status: 'approved' },
          { date: '2023-11-12', type: 'Renovation', value: 125000, description: 'Kitchen and bath remodel', status: 'completed' },
          { date: '2023-10-22', type: 'Addition', value: 210000, description: 'Room addition - 500 sq ft', status: 'under-construction' },
          { date: '2023-09-15', type: 'New Construction', value: 780000, description: 'Single-family home', status: 'pending' }
        ]
      },
      developmentPipeline: [
        { name: 'Highland Oaks', type: 'Single-family', units: 45, status: 'under-construction', completionDate: '2024-06', distance: 0.8 },
        { name: 'Parkside Commons', type: 'Mixed-use', units: 120, status: 'approved', completionDate: '2025-01', distance: 1.2 },
        { name: 'The Residences at Main', type: 'Multifamily', units: 85, status: 'planned', completionDate: '2025-08', distance: 1.5 }
      ],
      marketTrends: {
        priceAppreciation: 4.8,
        daysOnMarket: 24,
        inventoryMonths: 2.2,
        constructionCosts: {
          perSqFt: 185,
          annualChange: 6.2
        }
      },
      insights: [
        { type: 'opportunity', text: 'Property values in this area have consistently appreciated above market average', impact: 'high' },
        { type: 'info', text: 'New retail development planned 0.5 miles away may increase property values', impact: 'medium' },
        { type: 'risk', text: 'Construction costs rising faster than metro average', impact: 'medium' }
      ]
    },
    entitlementStatus: {
      hasEntitlements: false,
      status: 'none'
    },
    impactFees: {
      totalEstimated: 125000,
      perUnit: 25000,
      breakdown: {
        'Water': 35000,
        'Sewer': 40000,
        'Roads': 30000,
        'Parks': 15000,
        'Schools': 5000
      },
      lastUpdated: '2023-01-15'
    },
    lastUpdated: '2023-12-15'
  },
  {
    id: '23456-78901-234',
    address: '456 Park Avenue, Austin, TX 78702',
    coordinates: [-97.731903, 30.263271],
    size: '5.2 acres',
    acreage: 5.2,
    zoning: 'Commercial (C-2)',
    assessedValue: '$2,100,000',
    marketValue: '$2,300,000',
    lastSaleDate: 'August 22, 2020',
    lastSalePrice: '$1,850,000',
    owner: {
      name: 'Austin Properties LLC',
      mailingAddress: '789 Business Blvd, Austin, TX 78701',
      verified: true,
      verificationSource: 'County Assessor',
      verificationDate: '2023-11-05',
      ownershipDuration: 3,
      entityType: 'company',
    },
    history: [
      { date: 'Aug 2020', event: 'Sold', price: '$1,850,000', description: 'Sold to Austin Properties LLC' },
      { date: 'May 2020', event: 'Listed', price: '$2,000,000' },
      { date: 'Dec 2019', event: 'Permit', description: 'Received permit for renovations' }
    ],
    matchStatus: 'review',
    matchScore: 78,
    buyBoxCriteria: {
      acreage: [5, 30],
      topographyCompatible: true,
      zoningCompatible: false, // Commercial zoning needs rezoning
      utilityAccess: true,
      densityCompatible: true,
      incomeCompatible: true,
      floodplainCompatible: true,
      environmentalCompatible: true,
      schoolsCompatible: true,
      ownershipDurationCompatible: true,
      streetFrontageCompatible: true,
      withinCityLimits: true
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-97.732903, 30.264271],
        [-97.730903, 30.264271],
        [-97.730903, 30.262271],
        [-97.732903, 30.262271],
        [-97.732903, 30.264271]
      ]]
    },
    utilities: [
      { type: 'water', available: true, distance: 0 },
      { type: 'sewer', available: true, distance: 0 },
      { type: 'electricity', available: true, distance: 0 },
      { type: 'gas', available: true, distance: 0 },
      { type: 'fiber', available: true, distance: 0 }
    ],
    schoolDistrict: {
      name: 'Austin ISD',
      rating: 7,
      elementarySchool: 'Blackshear Elementary',
      middleSchool: 'Kealing Middle School',
      highSchool: 'McCallum High School'
    },
    environmental: {
      inFloodplain: false,
      knownIssues: false,
      topographyType: 'gentle',
      slopePercentage: 3.5
    },
    jurisdiction: {
      city: 'Austin',
      county: 'Travis',
      withinCityLimits: true,
      governingAgencies: ['City of Austin', 'Travis County', 'Austin Water Utility'],
      zoningCode: 'C-2',
      zoningDescription: 'Commercial',
      zoningType: 'commercial',
      allowedDensity: 0, // Commercial
      generalPlanConsistent: true,
      overlayDistricts: ['East Austin Mixed Use Corridor']
    },
    marketInfo: {
      medianIncome: 86000,
      averageHomePrice: 420000,
      medianRent: 1950,
      recentSales: {
        count: 8,
        averagePrice: 410000,
        pricePerSqFt: 290
      },
      permitActivity: {
        last12Months: 15,
        trend: 'stable'
      }
    },
    entitlementStatus: {
      hasEntitlements: true,
      status: 'expired',
      permitType: 'Commercial Development',
      approvalDate: '2018-05-12',
      expirationDate: '2021-05-12',
      denialHistory: false
    },
    impactFees: {
      totalEstimated: 180000,
      perUnit: 0, // Commercial use
      breakdown: {
        'Water': 50000,
        'Sewer': 45000,
        'Roads': 70000,
        'Drainage': 15000
      },
      lastUpdated: '2023-02-10'
    },
    lastUpdated: '2023-11-10'
  },
  {
    id: '34567-89012-345',
    address: '789 Riverfront Drive, Austin, TX 78703',
    coordinates: [-97.751915, 30.275641],
    size: '12.8 acres',
    acreage: 12.8,
    zoning: 'Mixed Use (MU-3)',
    assessedValue: '$3,750,000',
    marketValue: '$4,200,000',
    lastSaleDate: 'April 10, 2021',
    lastSalePrice: '$3,200,000',
    owner: {
      name: 'River Development Corp.',
      mailingAddress: '101 Corporate Circle, Austin, TX 78705',
      verified: true,
      verificationSource: 'County Assessor',
      verificationDate: '2023-10-22',
      ownershipDuration: 2,
      entityType: 'company',
    },
    history: [
      { date: 'Apr 2021', event: 'Sold', price: '$3,200,000', description: 'Sold to River Development Corp.' },
      { date: 'Feb 2021', event: 'Listed', price: '$3,500,000' },
      { date: 'Sep 2020', event: 'Environmental', description: 'Environmental assessment completed' }
    ],
    matchStatus: 'disqualified',
    matchScore: 45,
    buyBoxCriteria: {
      acreage: [5, 30],
      topographyCompatible: false, // Steep topography
      zoningCompatible: true,
      utilityAccess: true,
      densityCompatible: true,
      incomeCompatible: true,
      floodplainCompatible: false, // Partial floodplain
      environmentalCompatible: false, // Environmental issues
      schoolsCompatible: true,
      ownershipDurationCompatible: true,
      streetFrontageCompatible: true,
      withinCityLimits: true
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-97.752915, 30.276641],
        [-97.750915, 30.276641],
        [-97.750915, 30.274641],
        [-97.752915, 30.274641],
        [-97.752915, 30.276641]
      ]]
    },
    utilities: [
      { type: 'water', available: true, distance: 0 },
      { type: 'sewer', available: true, distance: 0 },
      { type: 'electricity', available: true, distance: 0 },
      { type: 'gas', available: true, distance: 0 },
      { type: 'fiber', available: true, distance: 0 }
    ],
    schoolDistrict: {
      name: 'Austin ISD',
      rating: 9,
      elementarySchool: 'Casis Elementary',
      middleSchool: 'O. Henry Middle School',
      highSchool: 'Austin High School'
    },
    environmental: {
      inFloodplain: true,
      floodZone: 'AE',
      knownIssues: true,
      issueDetails: 'Wetland area in northwest corner, potential soil contamination from prior industrial use',
      topographyType: 'moderate',
      slopePercentage: 8.5
    },
    jurisdiction: {
      city: 'Austin',
      county: 'Travis',
      withinCityLimits: true,
      governingAgencies: ['City of Austin', 'Travis County', 'Austin Water Utility', 'LCRA'],
      zoningCode: 'MU-3',
      zoningDescription: 'Mixed Use',
      zoningType: 'mixed-use',
      allowedDensity: 25,
      generalPlanConsistent: true,
      overlayDistricts: ['Waterfront Overlay', 'Capitol View Corridor']
    },
    marketInfo: {
      medianIncome: 125000,
      averageHomePrice: 750000,
      medianRent: 2900,
      recentSales: {
        count: 6,
        averagePrice: 780000,
        pricePerSqFt: 410
      },
      permitActivity: {
        last12Months: 31,
        trend: 'increasing'
      }
    },
    entitlementStatus: {
      hasEntitlements: true,
      status: 'in-process',
      permitType: 'Mixed Use Development',
      approvalDate: '2022-08-15',
      expirationDate: '2025-08-15',
      denialHistory: true,
      notes: 'Prior entitlement application denied in 2019 due to environmental concerns'
    },
    impactFees: {
      totalEstimated: 320000,
      perUnit: 12800,
      breakdown: {
        'Water': 80000,
        'Sewer': 75000,
        'Roads': 120000,
        'Parks': 25000,
        'Schools': 20000
      },
      lastUpdated: '2023-03-05'
    },
    lastUpdated: '2023-10-30'
  }
];

// Add this function to generate random additional parcels
const generateAdditionalParcels = (count: number, baseCoordinates: [number, number]) => {
  const parcels: ParcelData[] = [];
  const [baseLng, baseLat] = baseCoordinates;
  
  const zoningTypes: ZoningType[] = ['residential-single', 'residential-multi', 'commercial', 'industrial', 'mixed-use', 'agricultural', 'recreational'];
  const zoningDescriptions = ['Single Family Residential', 'Multi-Family Residential', 'Commercial', 'Industrial', 'Mixed Use', 'Agricultural', 'Recreational'];
  
  for (let i = 0; i < count; i++) {
    // Generate coordinates in a grid pattern
    const row = Math.floor(i / 5);
    const col = i % 5;
    const latOffset = row * 0.004; // Space vertically
    const lngOffset = col * 0.004; // Space horizontally
    
    // Alternate characteristics to create variety
    const acreage = 3 + Math.random() * 25; // 3 to 28 acres
    const zoningIndex = i % zoningTypes.length;
    const matchStatus: ParcelMatchStatus = i % 3 === 0 ? 'match' : (i % 3 === 1 ? 'review' : 'disqualified');
    const matchScore = matchStatus === 'match' ? 80 + Math.floor(Math.random() * 20) :
                      matchStatus === 'review' ? 60 + Math.floor(Math.random() * 20) :
                      30 + Math.floor(Math.random() * 30);
    
    // Generate variation in buyBoxCriteria
    const inFloodplain = i % 4 === 0;
    const hasEnvIssues = i % 5 === 0;
    const topographyType = i % 4 === 0 ? 'steep' : (i % 4 === 1 ? 'moderate' : (i % 4 === 2 ? 'gentle' : 'flat'));
    const medianIncome = 65000 + Math.floor(Math.random() * 50000);
    const withinCityLimits = i % 3 !== 0;
    const allowedDensity = zoningTypes[zoningIndex] === 'residential-single' ? 2 + Math.random() * 3 :
                          zoningTypes[zoningIndex] === 'residential-multi' ? 6 + Math.random() * 20 :
                          zoningTypes[zoningIndex] === 'mixed-use' ? 4 + Math.random() * 15 : 0;

    // Create parcel coordinates with some variation
    const coords: [number, number] = [baseLng + lngOffset + (Math.random() * 0.001), baseLat + latOffset + (Math.random() * 0.001)];
    
    const parcel: ParcelData = {
      id: `gen-${i}-${Date.now().toString(36)}`,
      address: `${1000 + i} ${['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'][i % 5]} ${['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane'][i % 5]}, Austin, TX`,
      coordinates: coords,
      size: `${acreage.toFixed(1)} acres`,
      acreage: parseFloat(acreage.toFixed(1)),
      zoning: `${zoningDescriptions[zoningIndex]} (${zoningTypes[zoningIndex].charAt(0).toUpperCase()})`,
      assessedValue: `$${(750000 + Math.random() * 2000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      marketValue: `$${(900000 + Math.random() * 2500000).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      lastSaleDate: `${['January', 'February', 'March', 'April', 'May', 'June'][i % 6]} ${1 + Math.floor(Math.random() * 28)}, ${2020 + Math.floor(Math.random() * 4)}`,
      lastSalePrice: `$${(600000 + Math.random() * 1500000).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      owner: {
        name: `${['Austin', 'Texas', 'Capital', 'Lone Star', 'Hill Country'][i % 5]} ${['Properties', 'Land Holdings', 'Investments', 'Real Estate', 'Development'][i % 5]} ${['LLC', 'Inc', 'Corp', 'Trust', ''][i % 5]}`,
        mailingAddress: `${5000 + i} ${['Business', 'Corporate', 'Commerce', 'Enterprise', 'Tech'][i % 5]} ${['Parkway', 'Circle', 'Boulevard', 'Plaza', 'Center'][i % 5]}, Austin, TX`,
        verified: i % 3 !== 0,
        verificationSource: i % 3 !== 0 ? 'County Assessor' : undefined,
        verificationDate: i % 3 !== 0 ? `2023-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}` : undefined,
        ownershipDuration: 1 + Math.floor(Math.random() * 10),
        entityType: ['company', 'trust', 'individual', 'company', 'company'][i % 5] as any,
      },
      history: [
        { date: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i % 6]} ${2022 - Math.floor(i / 10)}`, event: 'Sold', price: `$${(600000 + Math.random() * 1500000).toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { date: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i % 6]} ${2021 - Math.floor(i / 10)}`, event: 'Listed', price: `$${(650000 + Math.random() * 1600000).toLocaleString(undefined, { maximumFractionDigits: 0 })}` }
      ],
      matchStatus,
      matchScore,
      buyBoxCriteria: {
        acreage: [5, 30],
        topographyCompatible: topographyType === 'flat' || topographyType === 'gentle',
        zoningCompatible: zoningTypes[zoningIndex] === 'residential-single' || zoningTypes[zoningIndex] === 'residential-multi' || zoningTypes[zoningIndex] === 'mixed-use',
        utilityAccess: i % 3 !== 0,
        densityCompatible: allowedDensity >= 5,
        incomeCompatible: medianIncome >= 85000,
        floodplainCompatible: !inFloodplain,
        environmentalCompatible: !hasEnvIssues,
        schoolsCompatible: i % 5 !== 0,
        ownershipDurationCompatible: (1 + Math.floor(Math.random() * 10)) >= 3,
        streetFrontageCompatible: i % 4 !== 0,
        withinCityLimits
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [coords[0] - 0.001, coords[1] + 0.001],
          [coords[0] + 0.001, coords[1] + 0.001],
          [coords[0] + 0.001, coords[1] - 0.001],
          [coords[0] - 0.001, coords[1] - 0.001],
          [coords[0] - 0.001, coords[1] + 0.001]
        ]]
      },
      utilities: [
        { type: 'water', available: i % 3 !== 0, distance: i % 3 !== 0 ? 0 : 500 + Math.floor(Math.random() * 1000) },
        { type: 'sewer', available: i % 4 !== 0, distance: i % 4 !== 0 ? 0 : 500 + Math.floor(Math.random() * 1000) },
        { type: 'electricity', available: i % 2 !== 0, distance: i % 2 !== 0 ? 0 : 200 + Math.floor(Math.random() * 500) },
        { type: 'gas', available: i % 3 === 0, distance: i % 3 === 0 ? 0 : 400 + Math.floor(Math.random() * 800) },
        { type: 'fiber', available: i % 5 === 0, distance: i % 5 === 0 ? 0 : 1000 + Math.floor(Math.random() * 2000) }
      ],
      schoolDistrict: {
        name: `${['Austin', 'Eanes', 'Lake Travis', 'Round Rock', 'Leander'][i % 5]} ISD`,
        rating: 4 + Math.floor(Math.random() * 7),
        elementarySchool: `${['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'][i % 5]} Elementary`,
        middleSchool: `${['Hill', 'Creek', 'Valley', 'Ridge', 'Lake'][i % 5]} Middle`,
        highSchool: `${['Washington', 'Jefferson', 'Lincoln', 'Roosevelt', 'Kennedy'][i % 5]} High`
      },
      environmental: {
        inFloodplain,
        floodZone: inFloodplain ? ['Zone A', 'Zone AE', 'Zone X'][i % 3] : undefined,
        knownIssues: hasEnvIssues,
        issueDetails: hasEnvIssues ? ['Wetland area', 'Protected species habitat', 'Soil contamination', 'Erosion concerns'][i % 4] : undefined,
        soilType: ['Clay', 'Loam', 'Sandy', 'Silt', 'Rocky'][i % 5],
        topographyType,
        slopePercentage: topographyType === 'flat' ? 0.5 + Math.random() * 1.5 :
                         topographyType === 'gentle' ? 2 + Math.random() * 3 :
                         topographyType === 'moderate' ? 5 + Math.random() * 5 :
                         10 + Math.random() * 20
      },
      jurisdiction: {
        city: 'Austin',
        county: 'Travis',
        withinCityLimits,
        governingAgencies: ['Travis County', 'City of Austin', 'Austin Water Utility', 'Capital Metro'].filter(() => Math.random() > 0.3),
        zoningCode: `${zoningTypes[zoningIndex].charAt(0).toUpperCase()}-${1 + Math.floor(Math.random() * 3)}`,
        zoningDescription: zoningDescriptions[zoningIndex],
        zoningType: zoningTypes[zoningIndex],
        allowedDensity,
        generalPlanConsistent: i % 4 !== 0,
        overlayDistricts: i % 5 === 0 ? ['Historic District', 'Transit Corridor', 'Urban Renewal', 'Special Development'].filter(() => Math.random() > 0.5) : []
      },
      marketInfo: {
        medianIncome,
        averageHomePrice: 350000 + Math.floor(Math.random() * 300000),
        medianRent: 1500 + Math.floor(Math.random() * 1500),
        recentSales: {
          count: 5 + Math.floor(Math.random() * 20),
          averagePrice: 380000 + Math.floor(Math.random() * 320000),
          pricePerSqFt: 250 + Math.floor(Math.random() * 200)
        },
        permitActivity: {
          last12Months: 5 + Math.floor(Math.random() * 30),
          trend: ['increasing', 'stable', 'decreasing'][i % 3] as any
        }
      },
      entitlementStatus: {
        hasEntitlements: i % 4 === 0,
        status: i % 4 === 0 ? ['in-process', 'approved', 'denied', 'expired'][i % 4] as any : 'none',
        permitType: i % 4 === 0 ? ['Residential Development', 'Commercial Development', 'Mixed Use Development', 'Land Development'][i % 4] : undefined,
        approvalDate: i % 4 === 0 ? `2022-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}` : undefined,
        expirationDate: i % 4 === 0 ? `2025-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}` : undefined,
        denialHistory: i % 10 === 0
      },
      impactFees: {
        totalEstimated: 50000 + Math.floor(Math.random() * 150000),
        perUnit: 10000 + Math.floor(Math.random() * 30000),
        breakdown: {
          'Water': 15000 + Math.floor(Math.random() * 30000),
          'Sewer': 15000 + Math.floor(Math.random() * 30000),
          'Roads': 10000 + Math.floor(Math.random() * 30000),
          'Parks': 5000 + Math.floor(Math.random() * 15000),
          'Schools': 5000 + Math.floor(Math.random() * 15000)
        },
        lastUpdated: `2023-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}`
      },
      lastUpdated: `2023-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}`
    };
    
    parcels.push(parcel);
  }
  
  return parcels;
};

// Generate 20 additional parcels in the Austin area
const additionalParcels = generateAdditionalParcels(20, [-97.745, 30.263]);

// Combine and export the parcels
export const MOCK_PARCELS: ParcelData[] = [
  ...additionalParcels,
  ...INITIAL_PARCELS
]; 