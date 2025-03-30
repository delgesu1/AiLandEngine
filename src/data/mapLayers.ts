export type LayerType = 'parcels' | 'zoning' | 'floodplain' | 'utilities' | 'schools' | 'topography';

export interface MapLayerItem {
  id: string;
  color: string;
  label: string;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
}

export interface MapLayer {
  id: LayerType;
  name: string;
  description: string;
  items: MapLayerItem[];
  isActive: boolean;
}

export const MAP_LAYERS: Record<LayerType, MapLayerItem[]> = {
  parcels: [
    { id: 'match', color: '#12b76a', label: 'Match' },
    { id: 'review', color: '#f79009', label: 'Review' },
    { id: 'disqualified', color: '#f04438', label: 'Disqualified' }
  ],
  zoning: [
    { id: 'residential-single', color: '#8ecae6', label: 'Single Family Residential' },
    { id: 'residential-multi', color: '#219ebc', label: 'Multi-Family Residential' },
    { id: 'commercial', color: '#fb8500', label: 'Commercial' },
    { id: 'mixed-use', color: '#ffb703', label: 'Mixed Use' },
    { id: 'industrial', color: '#8d99ae', label: 'Industrial' },
    { id: 'agricultural', color: '#90be6d', label: 'Agricultural' },
    { id: 'recreational', color: '#43aa8b', label: 'Recreational' }
  ],
  floodplain: [
    { id: 'zone-a', color: '#90e0ef', label: 'Zone A (100-year floodplain)' },
    { id: 'zone-ae', color: '#48cae4', label: 'Zone AE (100-year floodplain with BFE)' },
    { id: 'zone-x', color: '#caf0f8', label: 'Zone X (500-year floodplain)' }
  ],
  utilities: [
    { id: 'water', color: '#00b4d8', label: 'Water Line', lineStyle: 'solid' },
    { id: 'sewer', color: '#6a994e', label: 'Sewer Line', lineStyle: 'dashed' },
    { id: 'electricity', color: '#e63946', label: 'Electricity', lineStyle: 'dotted' },
    { id: 'gas', color: '#ffb703', label: 'Gas Line', lineStyle: 'dashed' }
  ],
  schools: [
    { id: 'elementary', color: '#cdb4db', label: 'Elementary School' },
    { id: 'middle', color: '#ffc8dd', label: 'Middle School' },
    { id: 'high', color: '#ffafcc', label: 'High School' }
  ],
  topography: [
    { id: 'contour-20', color: '#d8f3dc', label: '20ft Contour' },
    { id: 'contour-40', color: '#b7e4c7', label: '40ft Contour' },
    { id: 'contour-60', color: '#95d5b2', label: '60ft Contour' },
    { id: 'contour-80', color: '#74c69d', label: '80ft Contour' },
    { id: 'contour-100', color: '#52b788', label: '100ft Contour' }
  ]
};

export const AVAILABLE_LAYERS: MapLayer[] = [
  { 
    id: 'parcels', 
    name: 'Parcels',
    description: 'Property boundaries and ownership',
    items: MAP_LAYERS.parcels,
    isActive: true
  },
  { 
    id: 'zoning', 
    name: 'Zoning',
    description: 'Shows zoning designations and land use regulations',
    items: MAP_LAYERS.zoning,
    isActive: true
  },
  { 
    id: 'floodplain', 
    name: 'Floodplain',
    description: 'Shows FEMA flood hazard areas',
    items: MAP_LAYERS.floodplain,
    isActive: false
  },
  { 
    id: 'utilities', 
    name: 'Utilities',
    description: 'Shows utility lines and infrastructure',
    items: MAP_LAYERS.utilities,
    isActive: true
  },
  { 
    id: 'schools', 
    name: 'School Districts',
    description: 'Shows school district boundaries and locations',
    items: MAP_LAYERS.schools,
    isActive: false
  },
  { 
    id: 'topography', 
    name: 'Topography',
    description: 'Shows elevation contour lines',
    items: MAP_LAYERS.topography,
    isActive: false
  }
];

// Mock utility line data (for demonstration)
export const MOCK_UTILITY_LINES = {
  water: [
    // Water main lines
    { start: [-97.743, 30.265], end: [-97.739, 30.265] },
    { start: [-97.739, 30.265], end: [-97.739, 30.262] },
    { start: [-97.743, 30.265], end: [-97.743, 30.262] },
    { start: [-97.743, 30.262], end: [-97.739, 30.262] },
    // Branch lines
    { start: [-97.741, 30.265], end: [-97.741, 30.267] },
    { start: [-97.741, 30.262], end: [-97.741, 30.260] }
  ],
  sewer: [
    // Sewer main lines
    { start: [-97.744, 30.264], end: [-97.738, 30.264] },
    { start: [-97.738, 30.264], end: [-97.738, 30.261] },
    { start: [-97.744, 30.264], end: [-97.744, 30.261] },
    { start: [-97.744, 30.261], end: [-97.738, 30.261] },
    // Branch lines
    { start: [-97.742, 30.264], end: [-97.742, 30.266] },
    { start: [-97.740, 30.261], end: [-97.740, 30.259] }
  ],
  electricity: [
    // Electricity main lines
    { start: [-97.745, 30.266], end: [-97.737, 30.266] },
    { start: [-97.745, 30.263], end: [-97.737, 30.263] },
    { start: [-97.745, 30.260], end: [-97.737, 30.260] },
    // Branch lines
    { start: [-97.743, 30.266], end: [-97.743, 30.260] },
    { start: [-97.741, 30.266], end: [-97.741, 30.260] },
    { start: [-97.739, 30.266], end: [-97.739, 30.260] }
  ],
  gas: [
    // Gas main lines
    { start: [-97.746, 30.265], end: [-97.736, 30.265] },
    { start: [-97.746, 30.262], end: [-97.736, 30.262] },
    // Branch lines
    { start: [-97.744, 30.265], end: [-97.744, 30.262] },
    { start: [-97.742, 30.265], end: [-97.742, 30.262] },
    { start: [-97.740, 30.265], end: [-97.740, 30.262] },
    { start: [-97.738, 30.265], end: [-97.738, 30.262] }
  ]
};

// Mock school district boundaries
export const MOCK_SCHOOL_DISTRICTS = [
  {
    id: 'austin-isd',
    name: 'Austin ISD',
    rating: 7,
    boundary: [
      [-97.748, 30.268],
      [-97.733, 30.268],
      [-97.733, 30.258],
      [-97.748, 30.258],
      [-97.748, 30.268]
    ]
  },
  {
    id: 'eanes-isd',
    name: 'Eanes ISD',
    rating: 9,
    boundary: [
      [-97.778, 30.278],
      [-97.748, 30.278],
      [-97.748, 30.268],
      [-97.778, 30.268],
      [-97.778, 30.278]
    ]
  },
  {
    id: 'lake-travis-isd',
    name: 'Lake Travis ISD',
    rating: 8,
    boundary: [
      [-97.748, 30.258],
      [-97.733, 30.258],
      [-97.733, 30.248],
      [-97.748, 30.248],
      [-97.748, 30.258]
    ]
  }
];

// Mock floodplain areas
export const MOCK_FLOODPLAINS = [
  {
    id: 'zone-a-1',
    type: 'zone-a',
    boundary: [
      [-97.746, 30.261],
      [-97.744, 30.261],
      [-97.743, 30.259],
      [-97.746, 30.259],
      [-97.746, 30.261]
    ]
  },
  {
    id: 'zone-ae-1',
    type: 'zone-ae',
    boundary: [
      [-97.743, 30.259],
      [-97.740, 30.259],
      [-97.738, 30.257],
      [-97.743, 30.257],
      [-97.743, 30.259]
    ]
  },
  {
    id: 'zone-x-1',
    type: 'zone-x',
    boundary: [
      [-97.738, 30.265],
      [-97.736, 30.265],
      [-97.736, 30.261],
      [-97.738, 30.261],
      [-97.738, 30.265]
    ]
  }
];

// Mock topography contour lines
export const MOCK_CONTOUR_LINES = [
  {
    id: 'contour-20-1',
    elevation: 20,
    type: 'contour-20',
    path: [
      [-97.747, 30.267],
      [-97.745, 30.265],
      [-97.742, 30.264],
      [-97.739, 30.266],
      [-97.736, 30.266]
    ]
  },
  {
    id: 'contour-40-1',
    elevation: 40,
    type: 'contour-40',
    path: [
      [-97.747, 30.265],
      [-97.744, 30.263],
      [-97.742, 30.262],
      [-97.739, 30.264],
      [-97.736, 30.264]
    ]
  },
  {
    id: 'contour-60-1',
    elevation: 60,
    type: 'contour-60',
    path: [
      [-97.747, 30.263],
      [-97.744, 30.260],
      [-97.741, 30.260],
      [-97.739, 30.262],
      [-97.736, 30.262]
    ]
  },
  {
    id: 'contour-80-1',
    elevation: 80,
    type: 'contour-80',
    path: [
      [-97.747, 30.261],
      [-97.744, 30.259],
      [-97.741, 30.258],
      [-97.739, 30.260],
      [-97.736, 30.260]
    ]
  },
  {
    id: 'contour-100-1',
    elevation: 100,
    type: 'contour-100',
    path: [
      [-97.747, 30.259],
      [-97.744, 30.257],
      [-97.741, 30.256],
      [-97.739, 30.258],
      [-97.736, 30.258]
    ]
  }
]; 