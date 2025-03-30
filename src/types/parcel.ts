export type ParcelMatchStatus = 'match' | 'review' | 'disqualified';

export type UtilityType = 'water' | 'sewer' | 'electricity' | 'gas' | 'fiber';

export type ZoningType = 
  | 'residential-single' 
  | 'residential-multi' 
  | 'commercial' 
  | 'industrial' 
  | 'mixed-use' 
  | 'agricultural' 
  | 'recreational'
  | 'other';

export interface OwnerInfo {
  name: string;
  mailingAddress: string;
  phone?: string;
  email?: string;
  verified: boolean;
  verificationSource?: string;
  verificationDate?: string;
  ownershipDuration?: number; // Years
  entityType?: 'individual' | 'company' | 'trust' | 'government' | 'non-profit';
}

export interface HistoryItem {
  date: string;
  event: string;
  price?: string;
  description?: string;
}

export interface UtilityAccess {
  type: UtilityType;
  available: boolean;
  distance?: number; // In feet
  notes?: string;
}

export interface SchoolDistrictInfo {
  name: string;
  rating?: number; // 1-10 rating
  elementarySchool?: string;
  middleSchool?: string;
  highSchool?: string;
}

export interface EnvironmentalInfo {
  inFloodplain: boolean;
  floodZone?: string;
  knownIssues: boolean;
  issueDetails?: string;
  soilType?: string;
  topographyType?: 'flat' | 'gentle' | 'moderate' | 'steep';
  slopePercentage?: number; // Average slope percentage
}

export interface JurisdictionInfo {
  city: string;
  county: string;
  withinCityLimits: boolean;
  governingAgencies: string[];
  zoningCode: string;
  zoningDescription: string;
  zoningType: ZoningType;
  allowedDensity?: number; // Units per acre
  generalPlanConsistent?: boolean;
  overlayDistricts?: string[];
}

export interface MarketInfo {
  medianIncome: number;
  averageHomePrice?: number;
  medianRent?: number;
  recentSales?: {
    count: number;
    averagePrice: number;
    pricePerSqFt: number;
    transactions?: Array<{
      date: string;
      address: string;
      price: number;
      sqFt?: number;
      bedsBaths?: string;
    }>;
  };
  permitActivity?: {
    last12Months: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    recentPermits?: Array<{
      date: string;
      type: string;
      value: number;
      description: string;
      status: 'pending' | 'approved' | 'completed' | 'under-construction';
    }>;
  };
  developmentPipeline?: Array<{
    name: string;
    type: string;
    units: number;
    status: 'planned' | 'approved' | 'under-construction' | 'completed';
    completionDate?: string;
    distance: number; // miles from property
  }>;
  marketTrends?: {
    priceAppreciation?: number; // annual percentage
    daysOnMarket?: number;
    inventoryMonths?: number;
    constructionCosts?: {
      perSqFt: number;
      annualChange: number; // percentage
    };
  };
  insights?: Array<{
    type: 'opportunity' | 'risk' | 'info';
    text: string;
    impact?: 'high' | 'medium' | 'low';
  }>;
}

export interface BuyBoxCriteria {
  acreage: [number, number]; // Min/max range
  topographyCompatible: boolean;
  zoningCompatible: boolean;
  utilityAccess: boolean;
  densityCompatible: boolean;
  incomeCompatible: boolean;
  floodplainCompatible: boolean;
  environmentalCompatible: boolean;
  schoolsCompatible?: boolean;
  ownershipDurationCompatible?: boolean;
  streetFrontageCompatible?: boolean;
  withinCityLimits?: boolean;
}

export interface EntitlementStatus {
  hasEntitlements: boolean;
  status?: 'none' | 'in-process' | 'approved' | 'denied' | 'expired';
  permitType?: string;
  approvalDate?: string;
  expirationDate?: string;
  denialHistory?: boolean;
  notes?: string;
}

export interface ImpactFeeInfo {
  totalEstimated: number;
  perUnit?: number;
  breakdown?: Record<string, number>;
  lastUpdated?: string;
}

export interface ParcelData {
  id: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  size: string;
  acreage: number;
  zoning: string;
  assessedValue: string;
  marketValue?: string;
  lastSaleDate: string;
  lastSalePrice: string;
  owner: OwnerInfo;
  history: HistoryItem[];
  matchStatus: ParcelMatchStatus;
  matchScore?: number; // 0-100
  buyBoxCriteria?: BuyBoxCriteria;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  utilities?: UtilityAccess[];
  schoolDistrict?: SchoolDistrictInfo;
  environmental?: EnvironmentalInfo;
  jurisdiction?: JurisdictionInfo;
  marketInfo?: MarketInfo;
  entitlementStatus?: EntitlementStatus;
  impactFees?: ImpactFeeInfo;
  isAssemblage?: boolean;
  assemblageParcelIds?: string[];
  notes?: string[];
  lastUpdated?: string;
} 