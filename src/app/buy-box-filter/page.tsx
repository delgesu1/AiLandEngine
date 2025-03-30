"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function BuyBoxFilter() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Buy Box Filter</h1>
            <p className="text-sm text-gray-500 mt-1">Define your acquisition criteria and filter properties</p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline">Save Criteria</button>
            <button className="btn btn-primary">Apply Filter</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criteria Panel */}
          <div className="card flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="font-semibold">Acquisition Criteria</h2>
              <button className="btn btn-outline text-sm py-1">Load Template</button>
            </div>
            
            {/* Criteria Tabs */}
            <div className="flex border-b border-gray-200">
              {['Land', 'Zoning', 'Utilities', 'Location', 'Risk'].map((tab, index) => (
                <div 
                  key={index} 
                  className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 ${
                    index === 0 ? 'text-[#3366ff] border-[#3366ff]' : 'border-transparent hover:text-[#3366ff]'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            
            {/* Criteria Content */}
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-6">
                {/* Land Characteristics */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Land Characteristics</h3>
                    <span className="text-[#3366ff] text-sm cursor-pointer">?</span>
                  </div>
                  
                  {/* Size Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Size Range</label>
                    <div className="text-xs text-gray-500 mb-2">Set the minimum and maximum parcel size in acres</div>
                    
                    {/* Slider (simplified representation) */}
                    <div className="mb-4">
                      <div className="relative h-10">
                        <div className="absolute top-1/2 w-full h-1 bg-gray-200 rounded"></div>
                        <div className="absolute top-1/2 left-[20%] right-[20%] h-1 bg-[#3366ff] rounded"></div>
                        <div className="absolute top-1/2 left-[20%] w-4 h-4 bg-white border-2 border-[#3366ff] rounded-full transform -translate-y-1/2 cursor-pointer"></div>
                        <div className="absolute top-1/2 left-[80%] w-4 h-4 bg-white border-2 border-[#3366ff] rounded-full transform -translate-y-1/2 cursor-pointer"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0 acres</span>
                        <span>50+ acres</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input type="number" className="form-input w-full" defaultValue="5" min="0" />
                      <span>to</span>
                      <input type="number" className="form-input w-full" defaultValue="30" min="0" />
                      <span>acres</span>
                    </div>
                  </div>
                  
                  {/* Topography */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Topography</label>
                    <div className="text-xs text-gray-500 mb-2">Select acceptable topography types</div>
                    <div className="space-y-2">
                      {['Flat', 'Gently Sloped', 'Moderate Slope', 'Steep'].map((type, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="form-checkbox" 
                            defaultChecked={index < 2} 
                          />
                          <span className="text-sm">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shape Regularity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Shape Regularity</label>
                    <div className="text-xs text-gray-500 mb-2">Set preference for parcel shape</div>
                    <div className="space-y-2">
                      {[
                        'Regular (rectangular, square)', 
                        'Slightly irregular', 
                        'Highly irregular'
                      ].map((shape, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="form-checkbox" 
                            defaultChecked={index < 2} 
                          />
                          <span className="text-sm">{shape}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Frontage */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Frontage</label>
                    <div className="text-xs text-gray-500 mb-2">Minimum road frontage required</div>
                    <div className="flex items-center gap-2">
                      <input type="number" className="form-input w-full" defaultValue="100" min="0" />
                      <span>ft minimum</span>
                    </div>
                  </div>
                </div>
                
                {/* Zoning Requirements */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Zoning Requirements</h3>
                    <span className="text-[#3366ff] text-sm cursor-pointer">?</span>
                  </div>
                  
                  {/* Current Zoning */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Current Zoning</label>
                    <div className="text-xs text-gray-500 mb-2">Select acceptable current zoning types</div>
                    <div className="space-y-2">
                      {[
                        'Residential', 
                        'Agricultural (rezonable to residential)', 
                        'Commercial',
                        'Industrial',
                        'Mixed Use'
                      ].map((zoning, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="form-checkbox" 
                            defaultChecked={index < 2} 
                          />
                          <span className="text-sm">{zoning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Density */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Density</label>
                    <div className="text-xs text-gray-500 mb-2">Minimum allowable density (units per acre)</div>
                    <div className="flex items-center gap-2">
                      <input type="number" className="form-input w-full" defaultValue="5" min="0" />
                      <span>+ net units/acre</span>
                    </div>
                  </div>
                  
                  {/* Entitlement Status */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Entitlement Status</label>
                    <div className="text-xs text-gray-500 mb-2">Select acceptable entitlement statuses</div>
                    <div className="space-y-2">
                      {[
                        'Raw land (no entitlements)', 
                        'Partially entitled', 
                        'Fully entitled'
                      ].map((status, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="form-checkbox" 
                            defaultChecked 
                          />
                          <span className="text-sm">{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Criteria Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
              <div className="text-sm text-gray-500">
                <span>Criteria Completeness:</span>
                <span className="text-gray-900 font-medium ml-1">85%</span>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline text-sm">Reset</button>
                <button className="btn btn-primary text-sm">Save & Apply</button>
              </div>
            </div>
          </div>
          
          {/* Results Panel */}
          <div className="card flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="font-semibold">Filter Results</h2>
              <div className="text-sm text-gray-500">42 Properties</div>
            </div>
            
            {/* Results Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                'All Properties', 
                'Match (28)', 
                'Review (10)', 
                'Disqualified (4)'
              ].map((tab, index) => (
                <div 
                  key={index} 
                  className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 ${
                    index === 0 ? 'text-[#3366ff] border-[#3366ff]' : 'border-transparent hover:text-[#3366ff]'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            
            {/* Results Content */}
            <div className="flex-1 overflow-auto p-4">
              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Match Rate', value: '66.7%', change: '↑ 5.2% from last filter', positive: true },
                  { label: 'Average Price', value: '$1.65M', change: '↓ 2.1% from last filter', positive: false },
                  { label: 'Average Size', value: '8.2 acres', change: '↑ 0.5 acres from last filter', positive: true }
                ].map((metric, index) => (
                  <div key={index} className="bg-[#f9fafc] rounded-lg p-4">
                    <div className="text-xs text-gray-500">{metric.label}</div>
                    <div className="text-2xl font-semibold mt-1">{metric.value}</div>
                    <div className={`text-xs mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View Toggle */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  {['Table', 'Grid', 'Map'].map((view, index) => (
                    <button 
                      key={index} 
                      className={`px-3 py-1.5 text-sm border rounded-md ${
                        index === 0 
                          ? 'bg-[#f0f4ff] border-[#3366ff] text-[#3366ff]' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
                <select className="form-select text-sm">
                  <option>Sort: Match Score</option>
                  <option>Sort: Price (Low to High)</option>
                  <option>Sort: Price (High to Low)</option>
                  <option>Sort: Size (Low to High)</option>
                  <option>Sort: Size (High to Low)</option>
                </select>
              </div>
              
              {/* Results Table */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f9fafc] text-left">
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Address</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Size</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Zoning</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Match Score</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Price</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      status: 'Match', 
                      address: '123 Main Street, Austin, TX 78701', 
                      size: '7.5 acres',
                      zoning: 'Residential',
                      match: 92,
                      price: '$1,250,000'
                    },
                    { 
                      status: 'Match', 
                      address: '456 Oak Avenue, Austin, TX 78704', 
                      size: '12.3 acres',
                      zoning: 'Residential',
                      match: 88,
                      price: '$2,450,000'
                    },
                    { 
                      status: 'Review', 
                      address: '789 Pine Road, Austin, TX 78745', 
                      size: '5.2 acres',
                      zoning: 'Mixed Use',
                      match: 75,
                      price: '$980,000'
                    },
                    { 
                      status: 'Match', 
                      address: '101 Cedar Lane, Austin, TX 78702', 
                      size: '8.7 acres',
                      zoning: 'Residential',
                      match: 90,
                      price: '$1,875,000'
                    },
                    { 
                      status: 'Review', 
                      address: '202 Maple Drive, Austin, TX 78723', 
                      size: '6.1 acres',
                      zoning: 'Commercial',
                      match: 68,
                      price: '$1,350,000'
                    },
                    { 
                      status: 'Match', 
                      address: '303 Elm Street, Austin, TX 78705', 
                      size: '9.3 acres',
                      zoning: 'Residential',
                      match: 85,
                      price: '$2,100,000'
                    },
                    { 
                      status: 'Disqualified', 
                      address: '404 Birch Court, Austin, TX 78731', 
                      size: '3.8 acres',
                      zoning: 'Residential',
                      match: 45,
                      price: '$950,000'
                    }
                  ].map((property, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-2 h-2 rounded-full ${
                              property.status === 'Match' ? 'bg-green-500' : 
                              property.status === 'Review' ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                          ></div>
                          <span className="text-sm">{property.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{property.address}</td>
                      <td className="px-4 py-3 text-sm">{property.size}</td>
                      <td className="px-4 py-3 text-sm">{property.zoning}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`text-sm font-medium ${
                            property.match >= 80 ? 'text-green-600' : 
                            property.match >= 60 ? 'text-orange-600' : 'text-red-600'
                          }`}
                        >
                          {property.match}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{property.price}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 text-xs text-[#3366ff]">
                          <span className="cursor-pointer">View</span>
                          <span className="cursor-pointer">Details</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
