"use client";

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function OwnerOutreach() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Owner Outreach</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track communications with property owners</p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline">Import Contacts</button>
            <button className="btn btn-primary">+ New Contact</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Owner List */}
          <div className="lg:col-span-1 card flex flex-col h-[calc(100vh-180px)]">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="font-semibold">Owner List</h2>
              <div className="text-sm text-gray-500">24 Owners</div>
            </div>
            
            {/* Search */}
            <div className="py-4">
              <div className="flex items-center bg-[#f5f7fa] rounded-lg px-3 py-2">
                <span className="text-gray-400 mr-2">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search owners..." 
                  className="bg-transparent border-none outline-none w-full text-sm"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2 pb-4">
              <button className="px-3 py-1.5 text-xs bg-[#f0f4ff] border border-[#3366ff] text-[#3366ff] rounded-md">
                All Owners
              </button>
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50">
                Contacted
              </button>
              <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-50">
                Verified
              </button>
            </div>
            
            {/* Owner List */}
            <div className="flex-1 overflow-auto">
              <div className="space-y-2">
                {[
                  { name: 'John Smith', properties: 1, status: 'Verified', selected: true },
                  { name: 'Austin Development LLC', properties: 3, status: 'Contacted' },
                  { name: 'Maria Rodriguez', properties: 1, status: 'Verified' },
                  { name: 'Acme Properties LLC', properties: 5, status: 'Not Contacted' },
                  { name: 'Robert Johnson', properties: 2, status: 'Contacted' },
                  { name: 'Sunrise Investments', properties: 4, status: 'Not Contacted' },
                  { name: 'Sarah Williams', properties: 1, status: 'Verified' },
                  { name: 'Texas Land Holdings', properties: 7, status: 'Contacted' },
                  { name: 'Michael Brown', properties: 1, status: 'Not Contacted' },
                  { name: 'Capital City Developers', properties: 3, status: 'Not Contacted' }
                ].map((owner, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg cursor-pointer ${
                      owner.selected ? 'bg-[#f0f4ff] border border-[#3366ff]' : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{owner.name}</div>
                      <div 
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          owner.status === 'Verified' ? 'bg-green-100 text-green-600' : 
                          owner.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {owner.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {owner.properties} {owner.properties === 1 ? 'property' : 'properties'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Owner Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Owner Profile */}
            <div className="card">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-semibold">John Smith</h2>
                    <div className="text-sm text-gray-500 mt-1">Individual Owner</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="status-badge status-match">Verified Owner</div>
                  <div className="text-sm text-gray-500 mt-1">Last Updated: March 25, 2025</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Contact Information</div>
                  <div className="space-y-2">
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-16">Address:</div>
                      <div>456 Oak St, Austin, TX 78704</div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-16">Phone:</div>
                      <div>(512) 555-1234</div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-16">Email:</div>
                      <div>john.smith@example.com</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Verification Status</div>
                  <div className="space-y-2">
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-24">Identity:</div>
                      <div className="flex items-center gap-1 text-green-600">
                        <span>✓</span>
                        <span>Verified</span>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-24">Ownership:</div>
                      <div className="flex items-center gap-1 text-green-600">
                        <span>✓</span>
                        <span>Verified</span>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-24">Contact Info:</div>
                      <div className="flex items-center gap-1 text-green-600">
                        <span>✓</span>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Outreach Status</div>
                  <div className="space-y-2">
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-24">First Contact:</div>
                      <div>March 15, 2025</div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-24">Last Contact:</div>
                      <div>March 22, 2025</div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="text-gray-500 w-24">Status:</div>
                      <div className="text-blue-600">In Negotiation</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button className="btn btn-outline">Edit Profile</button>
                <button className="btn btn-outline">View Properties</button>
                <button className="btn btn-primary">Contact Owner</button>
              </div>
            </div>
            
            {/* Owner Properties */}
            <div className="card">
              <h3 className="font-semibold mb-4">Owned Properties</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f9fafc] text-left">
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Address</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Size</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Zoning</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Buy Box Match</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">123 Main Street, Austin, TX 78701</td>
                    <td className="px-4 py-3 text-sm">7.5 acres</td>
                    <td className="px-4 py-3 text-sm">Residential (R-1)</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-green-600">92%</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 text-xs text-[#3366ff]">
                        <Link href="/property-detail" className="cursor-pointer">View</Link>
                        <span className="cursor-pointer">Details</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Communication History */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Communication History</h3>
                <button className="btn btn-primary text-sm">+ New Message</button>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    date: 'March 22, 2025', 
                    type: 'Phone Call', 
                    direction: 'Outgoing',
                    summary: 'Discussed potential offer for 123 Main Street property. Owner expressed interest in selling but wants to wait for a formal offer.',
                    notes: 'Owner mentioned they have received other inquiries but no formal offers yet. They are looking for a price in the $1.3-1.4M range.'
                  },
                  { 
                    date: 'March 18, 2025', 
                    type: 'Email', 
                    direction: 'Outgoing',
                    summary: 'Sent follow-up email with additional information about our company and acquisition process.',
                    notes: 'Attached company brochure and recent development portfolio. Requested a phone call to discuss further.'
                  },
                  { 
                    date: 'March 15, 2025', 
                    type: 'Phone Call', 
                    direction: 'Outgoing',
                    summary: 'Initial contact with owner. Introduced our company and expressed interest in their property.',
                    notes: 'Owner was receptive to discussion. They mentioned they have owned the property since 2019 and have been considering selling in the near future.'
                  }
                ].map((comm, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#f0f4ff] rounded-full flex items-center justify-center text-[#3366ff]">
                          {comm.type === 'Phone Call' ? '📞' : comm.type === 'Email' ? '✉️' : '💬'}
                        </div>
                        <div>
                          <div className="font-medium">{comm.type}</div>
                          <div className="text-xs text-gray-500">{comm.date} • {comm.direction}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-[#3366ff] text-sm">Edit</button>
                        <button className="text-[#3366ff] text-sm">Delete</button>
                      </div>
                    </div>
                    <div className="text-sm mb-2">{comm.summary}</div>
                    <div className="text-sm text-gray-500 bg-[#f9fafc] p-3 rounded">{comm.notes}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Plan */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Action Plan</h3>
                <button className="btn btn-outline text-sm">+ Add Task</button>
              </div>
              
              <div className="space-y-3">
                {[
                  { task: 'Prepare formal offer for 123 Main Street', due: 'March 30, 2025', priority: 'High', status: 'In Progress' },
                  { task: 'Schedule property walkthrough', due: 'April 5, 2025', priority: 'Medium', status: 'Not Started' },
                  { task: 'Request additional property documentation', due: 'April 10, 2025', priority: 'Medium', status: 'Not Started' }
                ].map((task, index) => (
                  <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <input type="checkbox" className="form-checkbox" defaultChecked={task.status === 'Completed'} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{task.task}</div>
                      <div className="text-xs text-gray-500">Due: {task.due}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                      task.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {task.priority}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {task.status}
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
