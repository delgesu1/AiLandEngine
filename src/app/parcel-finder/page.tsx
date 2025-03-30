"use client";

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ParcelMap from '@/components/map/ParcelMap';
import MarketIntelligencePanel from '@/components/map/MarketIntelligencePanel';
import { ParcelData, ParcelMatchStatus } from '@/types/parcel';
import { MOCK_PARCELS } from '@/data/mockParcels';
import Link from 'next/link';
import { AVAILABLE_LAYERS, LayerType } from '@/data/mapLayers';

const STATUS_LABELS: Record<ParcelMatchStatus, { label: string, color: string }> = {
  'match': { label: 'Match', color: 'bg-[#ecfdf3] text-[#027a48]' },
  'review': { label: 'Review', color: 'bg-[#fff8eb] text-[#b54708]' },
  'disqualified': { label: 'Disqualified', color: 'bg-[#fef3f2] text-[#b42318]' }
};

export default function ParcelFinder() {
  const [selectedParcel, setSelectedParcel] = useState<ParcelData | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'buybox' | 'market' | 'utilities' | 'entitlements'>('details');
  const [assemblageParcels, setAssemblageParcels] = useState<ParcelData[]>([]);
  const [activeBuyBoxFilter, setActiveBuyBoxFilter] = useState<string | null>(null);
  const [showAssemblageModal, setShowAssemblageModal] = useState(false);
  const [showMarketDashboard, setShowMarketDashboard] = useState(false);
  const [activeLayers, setActiveLayers] = useState<LayerType[]>(
    AVAILABLE_LAYERS.filter(layer => layer.isActive).map(layer => layer.id)
  );

  // Check if we should open the market dashboard on load (when coming from the main dashboard)
  useEffect(() => {
    const shouldOpenDashboard = localStorage.getItem('openMarketDashboard');
    if (shouldOpenDashboard === 'true') {
      setShowMarketDashboard(true);
      localStorage.removeItem('openMarketDashboard');
    }
  }, []);

  const handleParcelSelect = (parcel: ParcelData | null) => {
    setSelectedParcel(parcel);
    setAssemblageParcels([]); // Clear any existing assemblage
  };

  const toggleParcelInAssemblage = (parcel: ParcelData) => {
    if (assemblageParcels.some(p => p.id === parcel.id)) {
      setAssemblageParcels(assemblageParcels.filter(p => p.id !== parcel.id));
    } else {
      setAssemblageParcels([...assemblageParcels, parcel]);
    }
  };

  const getTotalAssemblageAcreage = () => {
    return assemblageParcels.reduce((total, parcel) => total + parcel.acreage, 0).toFixed(1);
  };

  const getBuyBoxFilterClass = (key: string) => {
    if (!selectedParcel?.buyBoxCriteria) return 'bg-gray-100 text-gray-500';
    const value = selectedParcel.buyBoxCriteria[key as keyof typeof selectedParcel.buyBoxCriteria];
    if (value === true) return 'bg-[#ecfdf3] text-[#027a48]';
    if (value === false) return 'bg-[#fef3f2] text-[#b42318]';
    return 'bg-gray-100 text-gray-500';
  };

  // Filter parcels based on active Buy Box filters
  const filteredParcels = activeBuyBoxFilter ? MOCK_PARCELS.filter(parcel => {
    if (!parcel.buyBoxCriteria) return false;
    
    switch(activeBuyBoxFilter) {
      case 'acreage':
        return parcel.acreage >= 5 && parcel.acreage <= 30;
      case 'topography':
        return parcel.buyBoxCriteria.topographyCompatible;
      case 'zoning':
        return parcel.buyBoxCriteria.zoningCompatible;
      case 'utilities':
        return parcel.buyBoxCriteria.utilityAccess;
      case 'density':
        return parcel.buyBoxCriteria.densityCompatible;
      case 'income':
        return parcel.buyBoxCriteria.incomeCompatible;
      case 'floodplain':
        return parcel.buyBoxCriteria.floodplainCompatible;
      case 'environmental':
        return parcel.buyBoxCriteria.environmentalCompatible;
      case 'schools':
        return parcel.buyBoxCriteria.schoolsCompatible === true;
      case 'ownership':
        return parcel.buyBoxCriteria.ownershipDurationCompatible === true;
      case 'city':
        return parcel.buyBoxCriteria.withinCityLimits === true;
      default:
        return true;
    }
  }) : MOCK_PARCELS;
  
  // Calculate match statistics with percentage by criteria
  const matchStats = {
    total: MOCK_PARCELS.length,
    matches: MOCK_PARCELS.filter(p => p.matchStatus === 'match').length,
    review: MOCK_PARCELS.filter(p => p.matchStatus === 'review').length,
    disqualified: MOCK_PARCELS.filter(p => p.matchStatus === 'disqualified').length,
    filtered: filteredParcels.length,
    averageScore: Math.round(
      MOCK_PARCELS.reduce((sum, p) => sum + (p.matchScore || 0), 0) / 
      MOCK_PARCELS.length
    ),
    criteria: {
      acreage: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.acreage && p.acreage >= 5 && p.acreage <= 30).length / MOCK_PARCELS.length) * 100),
      topography: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.topographyCompatible).length / MOCK_PARCELS.length) * 100),
      zoning: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.zoningCompatible).length / MOCK_PARCELS.length) * 100),
      utilities: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.utilityAccess).length / MOCK_PARCELS.length) * 100),
      density: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.densityCompatible).length / MOCK_PARCELS.length) * 100),
      income: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.incomeCompatible).length / MOCK_PARCELS.length) * 100),
      floodplain: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.floodplainCompatible).length / MOCK_PARCELS.length) * 100),
      environmental: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.environmentalCompatible).length / MOCK_PARCELS.length) * 100),
      schools: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.schoolsCompatible).length / MOCK_PARCELS.length) * 100),
      ownership: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.ownershipDurationCompatible).length / MOCK_PARCELS.length) * 100),
      city: Math.round((MOCK_PARCELS.filter(p => p.buyBoxCriteria?.withinCityLimits).length / MOCK_PARCELS.length) * 100)
    }
  };

  const getAssemblageMetrics = () => {
    if (assemblageParcels.length === 0) return null;
    
    const totalAcreage = assemblageParcels.reduce((total, parcel) => total + parcel.acreage, 0);
    const totalValue = assemblageParcels.reduce((total, parcel) => {
      // Remove $ and commas from the string, then parse as float
      const value = parseFloat(parcel.marketValue?.replace(/[$,]/g, '') || '0');
      return total + value;
    }, 0);
    
    // Calculate max density from parcels with allowedDensity data
    const densities = assemblageParcels
      .map(p => p.jurisdiction?.allowedDensity || 0)
      .filter(Boolean);
    
    const maxDensity = densities.length > 0 ? Math.max(...densities) : 0;
    
    const potentialUnits = Math.floor(totalAcreage * maxDensity);
    
    const sameOwners = assemblageParcels.reduce((owners, parcel) => {
      if (!owners.includes(parcel.owner.name)) {
        owners.push(parcel.owner.name);
      }
      return owners;
    }, [] as string[]);
    
    const distinctZoning = assemblageParcels.reduce((zonings, parcel) => {
      if (!zonings.includes(parcel.zoning)) {
        zonings.push(parcel.zoning);
      }
      return zonings;
    }, [] as string[]);
    
    return {
      totalAcreage,
      totalValue,
      valuePerAcre: totalValue / totalAcreage,
      parcels: assemblageParcels.length,
      potentialUnits,
      valuePerUnit: potentialUnits > 0 ? totalValue / potentialUnits : 0,
      owners: sameOwners,
      zoning: distinctZoning,
      hasMultipleOwners: sameOwners.length > 1,
      requiresRezoning: distinctZoning.length > 1,
      maxDensity
    };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Parcel Finder</h1>
          <div className="flex gap-3">
            <button 
              className="btn btn-outline" 
              onClick={() => {
                if (selectedParcel && !assemblageParcels.some(p => p.id === selectedParcel.id)) {
                  setAssemblageParcels([...assemblageParcels, selectedParcel]);
                }
                
                if (assemblageParcels.length > 0) {
                  setShowAssemblageModal(true);
                }
              }}
              disabled={!selectedParcel && assemblageParcels.length === 0}
            >
              {assemblageParcels.length > 0 ? `Assemblage (${assemblageParcels.length})` : '+ Create Assemblage'}
            </button>
            <button className="btn btn-outline">Export Data</button>
            <button className="btn btn-primary">+ Add to Buy Box</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Import Panel */}
          <div className="card lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Import Parcel Data</h2>
              <span className="text-[#3366ff] text-sm cursor-pointer">?</span>
            </div>
            
            {/* Import Methods */}
            <div className="space-y-3 mb-6">
              <div className="border border-[#3366ff] bg-[#f0f4ff] rounded-lg p-4 cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#f0f4ff] rounded-lg flex items-center justify-center text-lg">
                    📁
                  </div>
                  <div className="font-medium">File Upload</div>
                </div>
                <div className="text-sm text-gray-600">
                  Import parcel data from CSV, GeoJSON, or Shapefile formats.
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#3366ff] hover:bg-[#f0f4ff] transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#f0f4ff] rounded-lg flex items-center justify-center text-lg">
                    🌐
                  </div>
                  <div className="font-medium">County API</div>
                </div>
                <div className="text-sm text-gray-600">
                  Connect directly to county assessor APIs for real-time data.
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#3366ff] hover:bg-[#f0f4ff] transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#f0f4ff] rounded-lg flex items-center justify-center text-lg">
                    📍
                  </div>
                  <div className="font-medium">Draw Area</div>
                </div>
                <div className="text-sm text-gray-600">
                  Draw an area on the map to import parcels within the boundary.
                </div>
              </div>
            </div>
            
            {/* Buy Box Filter */}
            <div className="pb-4 mb-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Buy Box Filters</h3>
                {activeBuyBoxFilter && (
                  <button 
                    className="text-xs text-[#3366ff]"
                    onClick={() => setActiveBuyBoxFilter(null)}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'acreage' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'acreage' ? null : 'acreage')}
                >
                  Size: 5-30 acres <span className="ml-1 opacity-70">{matchStats.criteria.acreage}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'topography' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'topography' ? null : 'topography')}
                >
                  Flat Topography <span className="ml-1 opacity-70">{matchStats.criteria.topography}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'zoning' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'zoning' ? null : 'zoning')}
                >
                  Residential Zoning <span className="ml-1 opacity-70">{matchStats.criteria.zoning}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'utilities' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'utilities' ? null : 'utilities')}
                >
                  Utility Access <span className="ml-1 opacity-70">{matchStats.criteria.utilities}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'density' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'density' ? null : 'density')}
                >
                  Min. 5 Units/Acre <span className="ml-1 opacity-70">{matchStats.criteria.density}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'income' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'income' ? null : 'income')}
                >
                  Income ≥ $85K <span className="ml-1 opacity-70">{matchStats.criteria.income}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'floodplain' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'floodplain' ? null : 'floodplain')}
                >
                  No Floodplain <span className="ml-1 opacity-70">{matchStats.criteria.floodplain}%</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'environmental' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'environmental' ? null : 'environmental')}
                >
                  No Environmental Issues <span className="ml-1 opacity-70">{matchStats.criteria.environmental}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'schools' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'schools' ? null : 'schools')}
                >
                  School Rating 6+ <span className="ml-1 opacity-70">{matchStats.criteria.schools}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'ownership' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'ownership' ? null : 'ownership')}
                >
                  3+ Years Ownership <span className="ml-1 opacity-70">{matchStats.criteria.ownership}%</span>
                </button>
                <button 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${activeBuyBoxFilter === 'city' ? 'bg-[#3366ff] text-white' : 'bg-gray-100'}`}
                  onClick={() => setActiveBuyBoxFilter(activeBuyBoxFilter === 'city' ? null : 'city')}
                >
                  Within City Limits <span className="ml-1 opacity-70">{matchStats.criteria.city}%</span>
                </button>
              </div>
              
              {activeBuyBoxFilter && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">
                      {activeBuyBoxFilter === 'acreage' && 'Acreage'}
                      {activeBuyBoxFilter === 'topography' && 'Topography'}
                      {activeBuyBoxFilter === 'zoning' && 'Zoning'}
                      {activeBuyBoxFilter === 'utilities' && 'Utility Access'}
                      {activeBuyBoxFilter === 'density' && 'Density'}
                      {activeBuyBoxFilter === 'income' && 'Median Income'}
                      {activeBuyBoxFilter === 'floodplain' && 'Floodplain Status'}
                      {activeBuyBoxFilter === 'environmental' && 'Environmental Issues'}
                      {activeBuyBoxFilter === 'schools' && 'School District'}
                      {activeBuyBoxFilter === 'ownership' && 'Ownership Duration'}
                      {activeBuyBoxFilter === 'city' && 'City Limits'}
                    </h4>
                    <span className="text-xs bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 rounded-full">
                      {filteredParcels.length} matches ({Math.round((filteredParcels.length / MOCK_PARCELS.length) * 100)}%)
                    </span>
                  </div>
                  <div className="text-sm">
                    {activeBuyBoxFilter === 'acreage' && 'Parcels between 5-30 acres (single or combined)'}
                    {activeBuyBoxFilter === 'topography' && 'Flat or gently sloped terrain (< 5% grade)'}
                    {activeBuyBoxFilter === 'zoning' && 'Zoned residential or rezonable to residential'}
                    {activeBuyBoxFilter === 'utilities' && 'Water and sewer at or near boundary'}
                    {activeBuyBoxFilter === 'density' && 'Capable of at least 5 units per acre density'}
                    {activeBuyBoxFilter === 'income' && 'Median household income within 1-mile ≥ $85,000'}
                    {activeBuyBoxFilter === 'floodplain' && 'Property outside of FEMA flood hazard areas'}
                    {activeBuyBoxFilter === 'environmental' && 'No known environmental contamination or sensitive areas'}
                    {activeBuyBoxFilter === 'schools' && 'Located in school district with GreatSchools rating of 6 or higher'}
                    {activeBuyBoxFilter === 'ownership' && 'Current owner has held property for 3+ years'}
                    {activeBuyBoxFilter === 'city' && 'Located within incorporated city limits (not unincorporated county)'}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Match</span>
                      <span>{filteredParcels.filter(p => p.matchStatus === 'match').length} parcels</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Review</span>
                      <span>{filteredParcels.filter(p => p.matchStatus === 'review').length} parcels</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disqualified</span>
                      <span>{filteredParcels.filter(p => p.matchStatus === 'disqualified').length} parcels</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Recent Imports */}
            <div>
              <h3 className="font-medium mb-3">Recent Imports</h3>
              <div className="space-y-2">
                {['Austin_Parcels_2025.geojson', 'Travis_County_Q1.csv', 'North_Austin_Development.zip'].map((file, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{file}</div>
                      <div className="text-xs text-gray-500">
                        {index === 0 ? 'March 25, 2025 • 1,245 parcels' : 
                         index === 1 ? 'March 10, 2025 • 3,782 parcels' : 
                         'February 28, 2025 • 567 parcels'}
                      </div>
                    </div>
                    <div className="text-[#3366ff] text-sm cursor-pointer">Load</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="card lg:col-span-3 flex flex-col h-[calc(100vh-180px)]">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="font-semibold">Parcel Map</h2>
              <div className="flex gap-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500 px-3 py-1 bg-gray-50 rounded-lg">
                  <span className={`px-2 py-0.5 rounded-full text-xs bg-[#ecfdf3] text-[#027a48]`}>
                    {matchStats.matches} ✅
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs bg-[#fff8eb] text-[#b54708]`}>
                    {matchStats.review} ⚠️
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs bg-[#fef3f2] text-[#b42318]`}>
                    {matchStats.disqualified} ❌
                  </span>
                  <span className="text-xs">
                    {activeBuyBoxFilter ? `${filteredParcels.length} filtered` : `Avg: ${matchStats.averageScore}%`}
                  </span>
                </div>
                <button 
                  className="btn btn-outline flex items-center gap-1"
                  onClick={() => setShowMarketDashboard(true)}
                >
                  <span>Market Analysis</span>
                </button>
                <button 
                  className="btn btn-outline flex items-center gap-1"
                >
                  <span>Filter</span>
                  {activeBuyBoxFilter && <span className="w-2 h-2 rounded-full bg-[#3366ff]"></span>}
                </button>
                <button className="btn btn-outline">Save View</button>
              </div>
            </div>
            
            <div className="flex-1 relative bg-[#e9edf5] rounded-lg mt-4">
              {/* Map Search Overlay */}
              <div className="absolute top-4 left-4 z-10 space-y-3">
                <div className="bg-white rounded-md shadow-sm flex items-center px-3 py-2 w-[300px]">
                  <span className="text-gray-400 mr-2">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search for address, owner, or parcel ID..." 
                    className="bg-transparent border-none outline-none w-full text-sm"
                  />
                </div>
                
                <div className="bg-white rounded-md shadow-sm p-3 w-[300px]">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-sm">Map Layers</div>
                    <div className="text-[#3366ff] text-xs cursor-pointer">Toggle All</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 'parcels', name: 'Parcels', color: '#3366ff', checked: true },
                      { id: 'zoning', name: 'Zoning', color: '#12b76a', checked: true },
                      { id: 'floodplain', name: 'Floodplain', color: '#48cae4', checked: false },
                      { id: 'utilities', name: 'Utilities', color: '#7a5af8', checked: true },
                      { id: 'schools', name: 'School Districts', color: '#f04438', checked: false },
                      { id: 'topography', name: 'Topography', color: '#52b788', checked: false }
                    ].map((layer, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox" defaultChecked={layer.checked} />
                        <span className="text-sm">{layer.name}</span>
                        <div 
                          className="w-3 h-3 rounded ml-auto" 
                          style={{ backgroundColor: layer.color }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Interactive Map */}
              <ParcelMap 
                onParcelSelect={handleParcelSelect} 
                filteredParcels={filteredParcels.map(p => p.id)}
              />
              
              {/* Parcel Card Viewer */}
              {selectedParcel && (
                <div className="absolute bottom-4 right-4 z-10 w-[380px] bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-[#f9fafc] border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Parcel Details</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${STATUS_LABELS[selectedParcel.matchStatus].color}`}>
                        {STATUS_LABELS[selectedParcel.matchStatus].label} {selectedParcel.matchScore ? `(${selectedParcel.matchScore}%)` : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="cursor-pointer text-gray-500 hover:text-gray-700" 
                        onClick={() => toggleParcelInAssemblage(selectedParcel)}
                        title={assemblageParcels.some(p => p.id === selectedParcel.id) 
                          ? "Remove from assemblage" 
                          : "Add to assemblage"}
                      >
                        {assemblageParcels.some(p => p.id === selectedParcel.id) ? "📄➖" : "📄➕"}
                      </span>
                      <span 
                        className="cursor-pointer" 
                        onClick={() => setSelectedParcel(null)}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold mb-1">{selectedParcel.address}</div>
                        <div className="text-xs text-gray-500">Parcel ID: {selectedParcel.id}</div>
                      </div>
                      
                      {/* Tabs */}
                      <div className="flex gap-1 border-b border-gray-200">
                        <button 
                          className={`py-2 px-3 text-sm font-medium ${activeTab === 'details' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
                          onClick={() => setActiveTab('details')}
                        >
                          Details
                        </button>
                        <button 
                          className={`py-2 px-3 text-sm font-medium ${activeTab === 'buybox' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
                          onClick={() => setActiveTab('buybox')}
                        >
                          Buy Box
                        </button>
                        <button 
                          className={`py-2 px-3 text-sm font-medium ${activeTab === 'market' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
                          onClick={() => setActiveTab('market')}
                        >
                          Market
                        </button>
                        <button 
                          className={`py-2 px-3 text-sm font-medium ${activeTab === 'utilities' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
                          onClick={() => setActiveTab('utilities')}
                        >
                          Utilities
                        </button>
                        <button 
                          className={`py-2 px-3 text-sm font-medium ${activeTab === 'entitlements' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
                          onClick={() => setActiveTab('entitlements')}
                        >
                          Entitlements
                        </button>
                      </div>
                      
                      {/* Tab Content */}
                      <div className="pt-2">
                        {/* Details Tab */}
                        {activeTab === 'details' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Size</div>
                                <div className="font-medium">{selectedParcel.size}</div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Zoning</div>
                                <div className="font-medium">{selectedParcel.zoning}</div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Assessed Value</div>
                                <div className="font-medium">{selectedParcel.assessedValue}</div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Market Value</div>
                                <div className="font-medium">{selectedParcel.marketValue || 'N/A'}</div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Last Sale Date</div>
                                <div className="font-medium">{selectedParcel.lastSaleDate}</div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Last Sale Price</div>
                                <div className="font-medium">{selectedParcel.lastSalePrice}</div>
                              </div>
                            </div>
                            
                            <div className="pt-3 border-t border-gray-200">
                              <div className="font-medium text-sm mb-2">Owner Information</div>
                              <div>
                                <div className="flex justify-between items-start">
                                  <div className="font-medium">{selectedParcel.owner.name}</div>
                                  {selectedParcel.owner.verified && (
                                    <span className="text-xs text-[#027a48] bg-[#ecfdf3] px-1.5 py-0.5 rounded" title={`Verified via ${selectedParcel.owner.verificationSource}`}>✓ Verified</span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{selectedParcel.owner.mailingAddress}</div>
                                <div className="text-xs text-gray-400 mt-1">Ownership: {selectedParcel.owner.ownershipDuration} years</div>
                              </div>
                            </div>
                            
                            <div className="pt-3 border-t border-gray-200">
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium text-sm">Property History</div>
                                <div className="text-xs text-[#3366ff] cursor-pointer">View All</div>
                              </div>
                              <div className="space-y-2">
                                {selectedParcel.history.map((item, index) => (
                                  <div key={index} className="flex gap-2 text-sm">
                                    <div className="text-gray-500 whitespace-nowrap">{item.date}</div>
                                    <div>{item.event} {item.price ? item.price : ''}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button className="btn btn-outline flex-1 text-sm">View Full Details</button>
                              <button className="btn btn-primary flex-1 text-sm">Add to Buy Box</button>
                            </div>
                          </div>
                        )}
                        
                        {/* Buy Box Tab */}
                        {activeTab === 'buybox' && (
                          <div className="space-y-3">
                            <div className="text-sm flex justify-between items-center">
                              <div className="font-medium">Buy Box Criteria</div>
                              <div className={`px-2 py-0.5 text-xs rounded-full ${STATUS_LABELS[selectedParcel.matchStatus].color}`}>
                                {STATUS_LABELS[selectedParcel.matchStatus].label}
                              </div>
                            </div>
                            
                            {selectedParcel.buyBoxCriteria && (
                              <div className="space-y-2">
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('acreage')}`}>
                                  <span>Size</span>
                                  <span>{selectedParcel.acreage} acres (Range: {selectedParcel.buyBoxCriteria.acreage[0]}-{selectedParcel.buyBoxCriteria.acreage[1]})</span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('topographyCompatible')}`}>
                                  <span>Topography</span>
                                  <span>{selectedParcel.environmental?.topographyType || 'Unknown'}</span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('zoningCompatible')}`}>
                                  <span>Zoning</span>
                                  <span>{selectedParcel.jurisdiction?.zoningDescription || selectedParcel.zoning}</span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('utilityAccess')}`}>
                                  <span>Utilities</span>
                                  <span>
                                    {selectedParcel.utilities?.filter(u => u.available).length || 0}/{selectedParcel.utilities?.length || 0} Available
                                  </span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('densityCompatible')}`}>
                                  <span>Density</span>
                                  <span>{selectedParcel.jurisdiction?.allowedDensity || 'N/A'} units/acre</span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('incomeCompatible')}`}>
                                  <span>Area Income</span>
                                  <span>${selectedParcel.marketInfo?.medianIncome?.toLocaleString() || 'N/A'}</span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('floodplainCompatible')}`}>
                                  <span>Floodplain</span>
                                  <span>{selectedParcel.environmental?.inFloodplain ? 'In Floodplain' : 'No Floodplain'}</span>
                                </div>
                                
                                <div className={`p-2 rounded-lg flex justify-between items-center text-sm ${getBuyBoxFilterClass('environmentalCompatible')}`}>
                                  <span>Environmental</span>
                                  <span>{selectedParcel.environmental?.knownIssues ? 'Has Issues' : 'No Issues'}</span>
                                </div>
                              </div>
                            )}
                            
                            {assemblageParcels.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-gray-200">
                                <div className="font-medium text-sm mb-2">Assemblage Information</div>
                                <div className="text-sm">
                                  <div className="flex justify-between mb-1">
                                    <span>Parcels</span>
                                    <span>{assemblageParcels.length}</span>
                                  </div>
                                  <div className="flex justify-between mb-1">
                                    <span>Total Acreage</span>
                                    <span>{getTotalAssemblageAcreage()} acres</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Market Tab */}
                        {activeTab === 'market' && selectedParcel.marketInfo && (
                          <MarketIntelligencePanel parcel={selectedParcel} />
                        )}
                        
                        {/* Utilities Tab */}
                        {activeTab === 'utilities' && (
                          <div className="space-y-3">
                            {selectedParcel.utilities && (
                              <div>
                                <div className="font-medium text-sm mb-2">Utility Access</div>
                                <div className="space-y-2">
                                  {selectedParcel.utilities.map((utility, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <div className="text-gray-500 capitalize">{utility.type}</div>
                                      <div className="font-medium flex items-center">
                                        {utility.available ? 
                                          <><span className="text-[#027a48] mr-2">✓</span> Available</> : 
                                          <><span className="text-[#b42318] mr-2">✕</span> Not Available</>
                                        }
                                        {utility.distance !== undefined && utility.distance > 0 && (
                                          <span className="text-xs text-gray-500 ml-2">({utility.distance} ft)</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {selectedParcel.impactFees && (
                              <div className="pt-3 border-t border-gray-200">
                                <div className="font-medium text-sm mb-2">Impact Fees</div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <div className="text-gray-500">Total</div>
                                    <div className="font-medium">${selectedParcel.impactFees.totalEstimated.toLocaleString()}</div>
                                  </div>
                                  {selectedParcel.impactFees.perUnit && (
                                    <div className="flex justify-between text-sm">
                                      <div className="text-gray-500">Per Unit</div>
                                      <div className="font-medium">${selectedParcel.impactFees.perUnit.toLocaleString()}</div>
                                    </div>
                                  )}
                                  {selectedParcel.impactFees.breakdown && Object.entries(selectedParcel.impactFees.breakdown).map(([key, value], index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <div className="text-gray-500">{key}</div>
                                      <div className="font-medium">${value.toLocaleString()}</div>
                                    </div>
                                  ))}
                                </div>
                                {selectedParcel.impactFees.lastUpdated && (
                                  <div className="text-xs text-gray-400 mt-2">Last updated: {selectedParcel.impactFees.lastUpdated}</div>
                                )}
                              </div>
                            )}
                            
                            {selectedParcel.jurisdiction && (
                              <div className="pt-3 border-t border-gray-200">
                                <div className="font-medium text-sm mb-2">Governing Jurisdictions</div>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <div className="text-gray-500">City</div>
                                    <div className="font-medium">{selectedParcel.jurisdiction.city}</div>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <div className="text-gray-500">County</div>
                                    <div className="font-medium">{selectedParcel.jurisdiction.county}</div>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <div className="text-gray-500">School District</div>
                                    <div className="font-medium">{selectedParcel.schoolDistrict?.name || 'N/A'}</div>
                                  </div>
                                  {selectedParcel.jurisdiction.governingAgencies.length > 0 && (
                                    <div className="flex justify-between text-sm">
                                      <div className="text-gray-500">Other Agencies</div>
                                      <div className="font-medium text-right">{selectedParcel.jurisdiction.governingAgencies.filter(a => 
                                        a !== selectedParcel.jurisdiction?.city && 
                                        a !== selectedParcel.jurisdiction?.county && 
                                        a !== selectedParcel.schoolDistrict?.name
                                      ).join(', ')}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Entitlements Tab */}
                        {activeTab === 'entitlements' && selectedParcel.entitlementStatus && (
                          <div className="space-y-3">
                            <div className="font-medium text-sm mb-2">Entitlement Status</div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <div className="text-gray-500">Status</div>
                                <div className="font-medium capitalize">
                                  {selectedParcel.entitlementStatus.hasEntitlements ? (
                                    selectedParcel.entitlementStatus.status?.replace('-', ' ')
                                  ) : 'None'}
                                </div>
                              </div>
                              
                              {selectedParcel.entitlementStatus.hasEntitlements && (
                                <>
                                  {selectedParcel.entitlementStatus.permitType && (
                                    <div className="flex justify-between text-sm">
                                      <div className="text-gray-500">Type</div>
                                      <div className="font-medium">{selectedParcel.entitlementStatus.permitType}</div>
                                    </div>
                                  )}
                                  
                                  {selectedParcel.entitlementStatus.approvalDate && (
                                    <div className="flex justify-between text-sm">
                                      <div className="text-gray-500">Approval Date</div>
                                      <div className="font-medium">{selectedParcel.entitlementStatus.approvalDate}</div>
                                    </div>
                                  )}
                                  
                                  {selectedParcel.entitlementStatus.expirationDate && (
                                    <div className="flex justify-between text-sm">
                                      <div className="text-gray-500">Expiration</div>
                                      <div className="font-medium">{selectedParcel.entitlementStatus.expirationDate}</div>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-between text-sm">
                                    <div className="text-gray-500">Prior Denials</div>
                                    <div className="font-medium">{selectedParcel.entitlementStatus.denialHistory ? 'Yes' : 'No'}</div>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            {selectedParcel.entitlementStatus.notes && (
                              <div className="pt-3 border-t border-gray-200">
                                <div className="font-medium text-sm mb-1">Notes</div>
                                <div className="text-sm">{selectedParcel.entitlementStatus.notes}</div>
                              </div>
                            )}
                            
                            {selectedParcel.jurisdiction?.overlayDistricts && selectedParcel.jurisdiction.overlayDistricts.length > 0 && (
                              <div className="pt-3 border-t border-gray-200">
                                <div className="font-medium text-sm mb-1">Overlay Districts</div>
                                <div className="text-sm">{selectedParcel.jurisdiction.overlayDistricts.join(', ')}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAssemblageModal && assemblageParcels.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 bg-[#f9fafc] border-b border-gray-200">
              <div className="font-medium">Assemblage Details</div>
              <div className="cursor-pointer" onClick={() => setShowAssemblageModal(false)}>✕</div>
            </div>
            
            <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(80vh - 56px)' }}>
              {(() => {
                const metrics = getAssemblageMetrics();
                if (!metrics) return <div>No assemblage data available</div>;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Assemblage Summary</h3>
                      <span className="text-xs bg-[#f0f4ff] text-[#3366ff] px-2 py-1 rounded-full">
                        {metrics.parcels} Parcels
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Total Area</div>
                        <div className="font-semibold text-lg">{metrics.totalAcreage.toFixed(1)} acres</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Total Value</div>
                        <div className="font-semibold text-lg">${metrics.totalValue.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Potential Units</div>
                        <div className="font-semibold text-lg">{metrics.potentialUnits}</div>
                        <div className="text-xs text-gray-500">
                          {metrics.maxDensity} units/acre max density
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Value per Unit</div>
                        <div className="font-semibold text-lg">
                          ${Math.round(metrics.valuePerUnit).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${Math.round(metrics.valuePerAcre).toLocaleString()}/acre
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Ownership</div>
                        {metrics.hasMultipleOwners ? (
                          <span className="text-xs bg-[#fff8eb] text-[#b54708] px-2 py-0.5 rounded-full">
                            Multiple Owners
                          </span>
                        ) : (
                          <span className="text-xs bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 rounded-full">
                            Single Owner
                          </span>
                        )}
                      </div>
                      <div className="text-sm">
                        {metrics.owners.join(', ')}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Zoning</div>
                        {metrics.requiresRezoning ? (
                          <span className="text-xs bg-[#fff8eb] text-[#b54708] px-2 py-0.5 rounded-full">
                            Requires Rezoning
                          </span>
                        ) : (
                          <span className="text-xs bg-[#ecfdf3] text-[#027a48] px-2 py-0.5 rounded-full">
                            Uniform Zoning
                          </span>
                        )}
                      </div>
                      <div className="text-sm">
                        {metrics.zoning.join(', ')}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="font-medium mb-2">Parcels in Assemblage</div>
                      <div className="space-y-2 max-h-[200px] overflow-auto">
                        {assemblageParcels.map((parcel) => (
                          <div 
                            key={parcel.id} 
                            className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <div className="font-medium text-sm">{parcel.address}</div>
                              <div className="text-xs text-gray-500">{parcel.acreage} acres • {parcel.zoning}</div>
                            </div>
                            <button 
                              className="text-xs text-gray-400 hover:text-red-500" 
                              onClick={() => setAssemblageParcels(prev => prev.filter(p => p.id !== parcel.id))}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <button 
                        className="btn btn-outline flex-1" 
                        onClick={() => setShowAssemblageModal(false)}
                      >
                        Close
                      </button>
                      <button 
                        className="btn btn-primary flex-1"
                      >
                        Add to Buy Box
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Market Intelligence Dashboard Modal */}
      {showMarketDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90vw] max-w-6xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Market Intelligence Dashboard</h2>
              <button 
                className="text-gray-400 hover:text-gray-600" 
                onClick={() => setShowMarketDashboard(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Market Overview - {selectedParcel ? selectedParcel.jurisdiction?.city : 'Austin'} Area</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Median Home Value</div>
                      <div className="text-xl font-semibold">${selectedParcel?.marketInfo?.averageHomePrice?.toLocaleString() || '480,000'}</div>
                      <div className="text-xs text-green-600 mt-1">↑ 5.2% YoY</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Median Income</div>
                      <div className="text-xl font-semibold">${selectedParcel?.marketInfo?.medianIncome?.toLocaleString() || '92,000'}</div>
                      <div className="text-xs text-green-600 mt-1">↑ 2.8% YoY</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Development Activity</div>
                      <div className="text-xl font-semibold">High</div>
                      <div className="text-xs text-gray-500 mt-1">250+ units in pipeline</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Land Value</div>
                      <div className="text-xl font-semibold">$265K/acre</div>
                      <div className="text-xs text-green-600 mt-1">↑ 8.3% YoY</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-sm mb-3">Price Trends (5 Year)</h4>
                    <div className="h-48 w-full bg-gray-100 rounded flex items-center justify-center">
                      [Price Trend Chart Placeholder]
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Market Insights</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">↑</div>
                        <div className="font-medium text-sm">High Growth Opportunity</div>
                      </div>
                      <p className="text-sm">Property values in this area have consistently appreciated above market average (5.2% vs 3.8% city-wide).</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">i</div>
                        <div className="font-medium text-sm">Development Pipeline</div>
                      </div>
                      <p className="text-sm">Three multi-family developments (250+ units) currently under construction within 2 miles.</p>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">!</div>
                        <div className="font-medium text-sm">Construction Costs</div>
                      </div>
                      <p className="text-sm">Construction costs rising faster than metro average (6.2% vs 4.1%) due to high demand.</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 py-2 text-center text-sm font-medium bg-[#3366ff] text-white rounded-lg">
                    Generate Full Market Report
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Recent Building Permits</h3>
                  <div className="space-y-2">
                    {selectedParcel?.marketInfo?.permitActivity?.recentPermits ? (
                      selectedParcel.marketInfo.permitActivity.recentPermits.map((permit, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                          <div>
                            <div className="font-medium text-sm">{permit.type}</div>
                            <div className="text-xs text-gray-500">{permit.date} • {permit.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${permit.value.toLocaleString()}</div>
                            <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                              {permit.status.replace('-', ' ')}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      [1, 2, 3, 4].map(index => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                          <div>
                            <div className="font-medium text-sm">{
                              index === 1 ? 'New Construction' :
                              index === 2 ? 'Renovation' :
                              index === 3 ? 'Addition' : 'New Construction'
                            }</div>
                            <div className="text-xs text-gray-500">{
                              index === 1 ? '2023-12-05 • Single-family home' :
                              index === 2 ? '2023-11-12 • Kitchen and bath remodel' :
                              index === 3 ? '2023-10-22 • Room addition - 500 sq ft' : '2023-09-15 • Single-family home'
                            }</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${
                              index === 1 ? '850,000' :
                              index === 2 ? '125,000' :
                              index === 3 ? '210,000' : '780,000'
                            }</div>
                            <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                              {
                                index === 1 ? 'approved' :
                                index === 2 ? 'completed' :
                                index === 3 ? 'under construction' : 'pending'
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Development Pipeline</h3>
                  <div className="space-y-2">
                    {selectedParcel?.marketInfo?.developmentPipeline ? (
                      selectedParcel.marketInfo.developmentPipeline.map((dev, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                          <div>
                            <div className="font-medium text-sm">{dev.name}</div>
                            <div className="text-xs text-gray-500">{dev.type} • {dev.distance} miles away</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{dev.units} units</div>
                            <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                              {dev.status.replace('-', ' ')}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      [1, 2, 3].map(index => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex justify-between">
                          <div>
                            <div className="font-medium text-sm">{
                              index === 1 ? 'Highland Oaks' :
                              index === 2 ? 'Parkside Commons' : 'The Residences at Main'
                            }</div>
                            <div className="text-xs text-gray-500">{
                              index === 1 ? 'Single-family • 0.8 miles away' :
                              index === 2 ? 'Mixed-use • 1.2 miles away' : 'Multifamily • 1.5 miles away'
                            }</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{
                              index === 1 ? '45' :
                              index === 2 ? '120' : '85'
                            } units</div>
                            <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                              {
                                index === 1 ? 'under construction' :
                                index === 2 ? 'approved' : 'planned'
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button className="btn btn-outline">Export Data</button>
              <button 
                className="btn btn-primary"
                onClick={() => setShowMarketDashboard(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
