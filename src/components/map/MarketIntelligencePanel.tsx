import React, { useState } from 'react';
import { ParcelData } from '@/types/parcel';

interface MarketIntelligencePanelProps {
  parcel: ParcelData;
}

type MarketTab = 'sales' | 'rental' | 'permits' | 'development' | 'insights';

const MarketIntelligencePanel: React.FC<MarketIntelligencePanelProps> = ({ parcel }) => {
  const [activeTab, setActiveTab] = useState<MarketTab>('sales');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCardExpansion = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
    }
  };

  if (!parcel.marketInfo) {
    return (
      <div className="p-4 text-center text-gray-500">
        No market data available for this parcel.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b border-gray-200">
        <button
          className={`py-2 px-3 text-sm font-medium ${activeTab === 'sales' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          Home Sales
        </button>
        <button
          className={`py-2 px-3 text-sm font-medium ${activeTab === 'rental' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('rental')}
        >
          Rental Rates
        </button>
        <button
          className={`py-2 px-3 text-sm font-medium ${activeTab === 'permits' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('permits')}
        >
          Permits
        </button>
        <button
          className={`py-2 px-3 text-sm font-medium ${activeTab === 'development' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('development')}
        >
          Pipeline
        </button>
        <button
          className={`py-2 px-3 text-sm font-medium ${activeTab === 'insights' ? 'text-[#3366ff] border-b-2 border-[#3366ff]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Avg. Home Price</div>
                <div className="text-lg font-semibold">${parcel.marketInfo.averageHomePrice?.toLocaleString() || 'N/A'}</div>
                {parcel.marketInfo.marketTrends?.priceAppreciation && (
                  <div className="text-xs mt-1 text-green-600">↑ {parcel.marketInfo.marketTrends.priceAppreciation}% annually</div>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">$/Square Foot</div>
                <div className="text-lg font-semibold">${parcel.marketInfo.recentSales?.pricePerSqFt || 'N/A'}</div>
                <div className="text-xs mt-1 text-gray-500">
                  {parcel.marketInfo.marketTrends?.daysOnMarket && `${parcel.marketInfo.marketTrends.daysOnMarket} days on market avg.`}
                </div>
              </div>
            </div>

            {parcel.marketInfo.recentSales?.transactions && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Recent Home Sales</h3>
                  <span className="text-xs text-gray-500">Within 1 mile</span>
                </div>
                <div className="space-y-2">
                  {parcel.marketInfo.recentSales.transactions.map((sale, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleCardExpansion(`sale-${index}`)}
                      >
                        <div>
                          <div className="font-medium text-sm">{sale.address}</div>
                          <div className="text-xs text-gray-500">{sale.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${sale.price.toLocaleString()}</div>
                          {sale.sqFt && <div className="text-xs text-gray-500">${Math.round(sale.price / sale.sqFt)}/ft²</div>}
                        </div>
                      </div>
                      {expandedCard === `sale-${index}` && (
                        <div className="p-3 bg-gray-50 text-sm border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-gray-500 text-xs">Size</div>
                              <div>{sale.sqFt} sq ft</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Beds/Baths</div>
                              <div>{sale.bedsBaths}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Price/SqFt</div>
                              <div>${Math.round(sale.price / (sale.sqFt || 1))}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Sold</div>
                              <div>{sale.date}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rental Tab */}
        {activeTab === 'rental' && (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Median Rent</div>
                <div className="text-lg font-semibold">${parcel.marketInfo.medianRent?.toLocaleString() || 'N/A'}/mo</div>
                <div className="text-xs mt-1 text-gray-500">Area average</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Rent/Sq. Ft.</div>
                <div className="text-lg font-semibold">$1.68/ft²</div>
                <div className="text-xs mt-1 text-gray-500">Monthly</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
              <h3 className="font-medium text-sm mb-2">Rental Market Overview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Occupancy Rate</span>
                  <span>96.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Annual Rent Growth</span>
                  <span>3.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">New Apartment Units (1yr)</span>
                  <span>425 units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Renter Household Income</span>
                  <span>${(parcel.marketInfo.medianIncome * 0.85).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b border-gray-200">
                <h3 className="font-medium text-sm">Rental Property Comparables</h3>
              </div>
              <div className="p-3">
                <div className="text-center text-sm text-gray-500 p-4">
                  No rental comparables data available for this area.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Permits Tab */}
        {activeTab === 'permits' && (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Permits (12mo)</div>
                <div className="text-lg font-semibold">{parcel.marketInfo.permitActivity?.last12Months || 'N/A'}</div>
                <div className="text-xs mt-1 text-gray-500 capitalize">
                  Trend: {parcel.marketInfo.permitActivity?.trend || 'N/A'}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Construction Costs</div>
                <div className="text-lg font-semibold">
                  ${parcel.marketInfo.marketTrends?.constructionCosts?.perSqFt || 'N/A'}/ft²
                </div>
                {parcel.marketInfo.marketTrends?.constructionCosts?.annualChange && (
                  <div className="text-xs mt-1 text-amber-600">
                    ↑ {parcel.marketInfo.marketTrends.constructionCosts.annualChange}% annually
                  </div>
                )}
              </div>
            </div>

            {parcel.marketInfo.permitActivity?.recentPermits && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Recent Permits</h3>
                  <span className="text-xs text-gray-500">Within 1 mile</span>
                </div>
                <div className="space-y-2">
                  {parcel.marketInfo.permitActivity.recentPermits.map((permit, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleCardExpansion(`permit-${index}`)}
                      >
                        <div>
                          <div className="font-medium text-sm">{permit.type}</div>
                          <div className="text-xs text-gray-500">{permit.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${permit.value.toLocaleString()}</div>
                          <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                            {permit.status.replace('-', ' ')}
                          </div>
                        </div>
                      </div>
                      {expandedCard === `permit-${index}` && (
                        <div className="p-3 bg-gray-50 text-sm border-t border-gray-200">
                          <div className="mb-2">
                            <div className="text-gray-500 text-xs">Description</div>
                            <div>{permit.description}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-gray-500 text-xs">Status</div>
                              <div className="capitalize">{permit.status.replace('-', ' ')}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Value</div>
                              <div>${permit.value.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Date</div>
                              <div>{permit.date}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Development Pipeline Tab */}
        {activeTab === 'development' && (
          <div>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium">Development Activity</div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Active</div>
              </div>
              <div className="text-2xl font-bold mb-1">
                {parcel.marketInfo.developmentPipeline?.reduce((total, dev) => total + dev.units, 0) || 0}
              </div>
              <div className="text-xs text-gray-500">New units in pipeline</div>
            </div>

            {parcel.marketInfo.developmentPipeline && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Nearby Developments</h3>
                  <span className="text-xs text-gray-500">Within 2 miles</span>
                </div>
                <div className="space-y-2">
                  {parcel.marketInfo.developmentPipeline.map((development, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleCardExpansion(`dev-${index}`)}
                      >
                        <div>
                          <div className="font-medium text-sm">{development.name}</div>
                          <div className="text-xs text-gray-500">{development.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{development.units} units</div>
                          <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                            {development.status.replace('-', ' ')}
                          </div>
                        </div>
                      </div>
                      {expandedCard === `dev-${index}` && (
                        <div className="p-3 bg-gray-50 text-sm border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-gray-500 text-xs">Type</div>
                              <div>{development.type}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Units</div>
                              <div>{development.units}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Status</div>
                              <div className="capitalize">{development.status.replace('-', ' ')}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Completion</div>
                              <div>{development.completionDate || 'TBD'}</div>
                            </div>
                            <div>
                              <div className="text-gray-500 text-xs">Distance</div>
                              <div>{development.distance} miles</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Market Analysis Dashboard</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Market Strength</div>
                  <div className="text-lg font-semibold">Strong</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Risk Level</div>
                  <div className="text-lg font-semibold">Low</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Land Value Trend</span>
                  <span className="text-green-600">+5.2% annually</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Absorption Rate</span>
                  <span>3.1 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cost-to-Build</span>
                  <span>${parcel.marketInfo.marketTrends?.constructionCosts?.perSqFt || 'N/A'}/sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Comparable Land Sales</span>
                  <span>$265,000/acre</span>
                </div>
              </div>
            </div>

            {parcel.marketInfo.insights && (
              <div>
                <h3 className="font-medium text-sm mb-2">Actionable Insights</h3>
                <div className="space-y-2">
                  {parcel.marketInfo.insights.map((insight, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      insight.type === 'opportunity' ? 'border-green-200 bg-green-50' :
                      insight.type === 'risk' ? 'border-red-200 bg-red-50' :
                      'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex items-start gap-2">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                          insight.type === 'opportunity' ? 'bg-green-100 text-green-700' :
                          insight.type === 'risk' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {insight.type === 'opportunity' ? '↑' : insight.type === 'risk' ? '!' : 'i'}
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1 capitalize">
                            {insight.type} 
                            {insight.impact && <span className="ml-1 text-xs">• {insight.impact} impact</span>}
                          </div>
                          <div className="text-sm">{insight.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketIntelligencePanel; 