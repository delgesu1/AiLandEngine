"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function PropertyDetail() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/parcel-finder" className="text-[#3366ff]">
              ← Back to Parcels
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-2xl font-semibold">Property Detail</h1>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline">Export Data</button>
            <button className="btn btn-primary">Add to Buy Box</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div className="card">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">123 Main Street, Austin, TX 78701</h2>
                  <div className="text-sm text-gray-500 mt-1">Parcel ID: 12345-67890-123</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="status-badge status-match">92% Buy Box Match</div>
                  <div className="text-sm text-gray-500 mt-1">Last Updated: March 25, 2025</div>
                </div>
              </div>
            </div>
            
            {/* Property Map */}
            <div className="card">
              <h3 className="font-semibold mb-4">Property Location</h3>
              <div className="h-80 bg-[#e9edf5] rounded-lg flex items-center justify-center">
                <div className="text-gray-500">Interactive Map (Mapbox Integration)</div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <div>Map data © Mapbox | Parcel data © Travis County Assessor</div>
                <div className="flex gap-3">
                  <span className="cursor-pointer text-[#3366ff]">View Larger</span>
                  <span className="cursor-pointer text-[#3366ff]">Street View</span>
                </div>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="card">
              <h3 className="font-semibold mb-4">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: 'Size', value: '7.5 acres' },
                  { label: 'Zoning', value: 'Residential (R-1)' },
                  { label: 'Topography', value: 'Gently Sloped' },
                  { label: 'Shape', value: 'Regular (Rectangular)' },
                  { label: 'Frontage', value: '250 ft' },
                  { label: 'Depth', value: '1,320 ft' },
                  { label: 'Utilities', value: 'Water, Electricity, Gas' },
                  { label: 'Flood Zone', value: 'Zone X (Minimal Risk)' },
                  { label: 'School District', value: 'Austin ISD' },
                  { label: 'County', value: 'Travis County' },
                  { label: 'Tax Rate', value: '2.15%' },
                  { label: 'Annual Taxes', value: '$26,875' }
                ].map((detail, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                    <div className="text-gray-500">{detail.label}</div>
                    <div className="font-medium">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property History */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Property History</h3>
                <button className="text-[#3366ff] text-sm">View All Records</button>
              </div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-gray-200"></div>
                
                {/* Timeline Events */}
                <div className="space-y-6 ml-10 relative">
                  {[
                    { 
                      date: 'June 15, 2019', 
                      title: 'Property Sale', 
                      description: 'Sold for $950,000 to John Smith',
                      details: 'Transaction recorded with Travis County. Deed transfer completed on June 20, 2019.'
                    },
                    { 
                      date: 'March 10, 2019', 
                      title: 'Listed for Sale', 
                      description: 'Listed on market for $975,000',
                      details: 'Listed by ABC Realty. Property was on market for 97 days before sale.'
                    },
                    { 
                      date: 'November 5, 2018', 
                      title: 'Zoning Change', 
                      description: 'Zoning changed from Agricultural to Residential (R-1)',
                      details: 'Approved by Austin City Council. Rezoning application was submitted on August 12, 2018.'
                    },
                    { 
                      date: 'May 22, 2010', 
                      title: 'Property Sale', 
                      description: 'Sold for $425,000 to Austin Development LLC',
                      details: 'Previous owner was Smith Family Trust (owned since 1985).'
                    }
                  ].map((event, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-10 mt-1.5 w-6 h-6 bg-[#f0f4ff] border-2 border-[#3366ff] rounded-full flex items-center justify-center">
                        {index === 0 ? '💰' : index === 1 ? '🏠' : index === 2 ? '📝' : '💰'}
                      </div>
                      
                      {/* Event Content */}
                      <div>
                        <div className="text-sm text-gray-500">{event.date}</div>
                        <div className="font-medium mt-1">{event.title}</div>
                        <div className="text-sm mt-1">{event.description}</div>
                        <div className="text-sm text-gray-500 mt-1">{event.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Buy Box Match */}
            <div className="card">
              <h3 className="font-semibold mb-4">Buy Box Match</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-500 mt-1">Overall Match Score</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { category: 'Size', score: 100, color: '#12b76a' },
                  { category: 'Zoning', score: 100, color: '#12b76a' },
                  { category: 'Location', score: 85, color: '#12b76a' },
                  { category: 'Topography', score: 90, color: '#12b76a' },
                  { category: 'Price', score: 75, color: '#f79009' }
                ].map((match, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <div>{match.category}</div>
                      <div className="font-medium">{match.score}%</div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${match.score}%`, backgroundColor: match.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Match Details</div>
                <div className="text-sm">
                  This property matches your Buy Box criteria very well, particularly in size, zoning, and topography. The price is slightly above your target range, but still within acceptable parameters.
                </div>
              </div>
            </div>
            
            {/* Owner Information */}
            <div className="card">
              <h3 className="font-semibold mb-4">Owner Information</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-gray-500">Individual Owner</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-2 text-sm">
                  <div className="text-gray-500 w-20">Address:</div>
                  <div>456 Oak St, Austin, TX 78704</div>
                </div>
                <div className="flex gap-2 text-sm">
                  <div className="text-gray-500 w-20">Phone:</div>
                  <div>(512) 555-1234</div>
                </div>
                <div className="flex gap-2 text-sm">
                  <div className="text-gray-500 w-20">Email:</div>
                  <div>john.smith@example.com</div>
                </div>
                <div className="flex gap-2 text-sm">
                  <div className="text-gray-500 w-20">Ownership:</div>
                  <div>Since June 2019 (5 years, 9 months)</div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="btn btn-outline flex-1 text-sm">View Profile</button>
                <button className="btn btn-primary flex-1 text-sm">Contact Owner</button>
              </div>
            </div>
            
            {/* Similar Properties */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Similar Properties</h3>
                <button className="text-[#3366ff] text-sm">View All</button>
              </div>
              
              <div className="space-y-3">
                {[
                  { address: '456 Oak Avenue, Austin, TX 78704', size: '12.3 acres', match: 88 },
                  { address: '101 Cedar Lane, Austin, TX 78702', size: '8.7 acres', match: 90 },
                  { address: '303 Elm Street, Austin, TX 78705', size: '9.3 acres', match: 85 }
                ].map((property, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-[#3366ff] transition-colors">
                    <div className="font-medium text-sm mb-1">{property.address}</div>
                    <div className="flex justify-between text-xs">
                      <div className="text-gray-500">{property.size}</div>
                      <div className="font-medium text-green-600">{property.match}% Match</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
