"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Dashboard() {
  // Sample data for dashboard metrics
  const metrics = [
    { label: 'Properties Tracked', value: '1,245', change: '+12%', positive: true },
    { label: 'Buy Box Matches', value: '28', change: '+5', positive: true },
    { label: 'Avg. Property Value', value: '$1.65M', change: '-2.1%', positive: false },
    { label: 'Avg. Property Size', value: '8.2 acres', change: '+0.5', positive: true },
  ];

  // Sample data for recent properties
  const recentProperties = [
    { address: '123 Main Street, Austin, TX 78701', size: '7.5 acres', zoning: 'Residential', match: 92 },
    { address: '456 Oak Avenue, Austin, TX 78704', size: '12.3 acres', zoning: 'Residential', match: 88 },
    { address: '789 Pine Road, Austin, TX 78745', size: '5.2 acres', zoning: 'Mixed Use', match: 75 },
    { address: '101 Cedar Lane, Austin, TX 78702', size: '8.7 acres', zoning: 'Residential', match: 90 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex gap-3">
            <button className="btn btn-outline">Export Data</button>
            <button className="btn btn-primary">+ Add Property</button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="card">
              <div className="text-sm text-gray-500">{metric.label}</div>
              <div className="text-2xl font-semibold mt-1">{metric.value}</div>
              <div className={`text-xs mt-1 flex items-center ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? '↑' : '↓'} {metric.change} from last month
              </div>
            </div>
          ))}
        </div>

        {/* Map and Recent Properties */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 card h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Property Map</h2>
              <div className="flex gap-2">
                <button className="btn btn-outline text-xs py-1">Filter</button>
                <button className="btn btn-outline text-xs py-1">Save View</button>
              </div>
            </div>
            <div className="flex-1 bg-[#e9edf5] rounded-lg flex items-center justify-center">
              <div className="text-gray-500">Interactive Map (Mapbox Integration)</div>
            </div>
          </div>

          {/* Recent Properties */}
          <div className="card h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Recent Properties</h2>
              <Link href="/parcel-finder" className="text-[#3366ff] text-sm">View All</Link>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="space-y-3">
                {recentProperties.map((property, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-[#3366ff] transition-colors">
                    <div className="font-medium mb-1">{property.address}</div>
                    <div className="grid grid-cols-3 text-sm text-gray-500 mb-2">
                      <div>{property.size}</div>
                      <div>{property.zoning}</div>
                      <div className={`font-medium ${
                        property.match >= 80 ? 'text-green-600' : 
                        property.match >= 60 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {property.match}% Match
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 text-xs">
                      <button className="text-[#3366ff]">View</button>
                      <button className="text-[#3366ff]">Add to Buy Box</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Recent Activity</h2>
              <button className="text-[#3366ff] text-sm">View All</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex gap-3 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 bg-[#f0f4ff] rounded-full flex items-center justify-center text-[#3366ff] flex-shrink-0">
                    {index === 0 ? '📊' : index === 1 ? '🔍' : '📝'}
                  </div>
                  <div>
                    <div className="text-sm">
                      {index === 0 ? 'New property matched your Buy Box criteria' : 
                       index === 1 ? 'Property price updated for 123 Main Street' : 
                       'Owner contact information verified for Acme Properties LLC'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {index === 0 ? '2 hours ago' : index === 1 ? '5 hours ago' : 'Yesterday'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Tasks</h2>
              <button className="text-[#3366ff] text-sm">+ Add Task</button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <input type="checkbox" className="form-checkbox" />
                  <div className="flex-1">
                    <div className="text-sm">
                      {index === 0 ? 'Review new property matches' : 
                       index === 1 ? 'Contact owner of 456 Oak Avenue' : 
                       'Update Buy Box criteria for Austin market'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {index === 0 ? 'Due today' : index === 1 ? 'Due tomorrow' : 'Due in 3 days'}
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    index === 0 ? 'bg-red-100 text-red-600' : 
                    index === 1 ? 'bg-orange-100 text-orange-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
