"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { ParcelData, ParcelMatchStatus } from '@/types/parcel';
import { MOCK_PARCELS } from '@/data/mockParcels';
import { 
  AVAILABLE_LAYERS, 
  MAP_LAYERS, 
  MOCK_UTILITY_LINES, 
  MOCK_SCHOOL_DISTRICTS,
  MOCK_FLOODPLAINS,
  MOCK_CONTOUR_LINES,
  MapLayer,
  LayerType
} from '@/data/mapLayers';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import('react-leaflet').then(mod => mod.Polygon),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('react-leaflet').then(mod => mod.Tooltip),
  { ssr: false }
);
const FeatureGroup = dynamic(
  () => import('react-leaflet').then(mod => mod.FeatureGroup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
);
const Circle = dynamic(
  () => import('react-leaflet').then(mod => mod.Circle),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);

// Helper component to set the map view
const SetMapView = dynamic(
  () => import('react-leaflet').then(mod => {
    const { useMap } = mod;
    return function SetViewComponent({ center }: { center: [number, number] }) {
      const map = useMap();
      useEffect(() => {
        map.setView(center, 14);
      }, [center, map]);
      return null;
    };
  }),
  { ssr: false }
);

const getMatchStatusColor = (status: ParcelMatchStatus): string => {
  switch (status) {
    case 'match':
      return '#12b76a'; // Green
    case 'review':
      return '#f79009'; // Orange
    case 'disqualified':
      return '#f04438'; // Red
    default:
      return '#3366ff'; // Blue (default)
  }
};

const getMatchStatusLabel = (status: ParcelMatchStatus): string => {
  switch (status) {
    case 'match':
      return '✅ Match';
    case 'review':
      return '⚠️ Review';
    case 'disqualified':
      return '❌ Disqualified';
    default:
      return 'Unknown';
  }
};

const getZoningColor = (zoningType?: string): string => {
  if (!zoningType) return '#3366ff';
  
  const zoning = MAP_LAYERS.zoning.find(z => z.id === zoningType);
  return zoning?.color || '#3366ff';
};

interface ParcelMapProps {
  onParcelSelect?: (parcel: ParcelData | null) => void;
  filteredParcels?: string[];
  activeLayers: LayerType[];
}

export default function ParcelMap({ onParcelSelect, filteredParcels = [], activeLayers }: ParcelMapProps) {
  const [selectedParcel, setSelectedParcel] = useState<ParcelData | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  
  useEffect(() => {
    // Fix Leaflet icon issue when the component mounts
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    
    setMapReady(true);
  }, []);
  
  // Leaflet requires coordinates in [lat, lng] format, while our data is in [lng, lat]
  const reverseCoordinates = (coords: number[][]): [number, number][] => {
    return coords.map(coord => [coord[1], coord[0]]);
  };

  const reversePoint = (coord: number[]): [number, number] => {
    return [coord[1], coord[0]];
  };

  const handleParcelClick = (parcel: ParcelData) => {
    setSelectedParcel(parcel);
    if (onParcelSelect) {
      onParcelSelect(parcel);
    }
  };

  if (!mapReady) {
    return <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        className="w-full h-full z-0"
        center={[30.267153, -97.743057]} // Austin, TX - [lat, lng]
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map Legend */}
        {showLegend && (
          <div className="absolute bottom-6 right-6 z-[1000] bg-white rounded-lg shadow-md p-3 max-w-[280px] max-h-[350px] overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm">Map Legend</h3>
              <button 
                className="text-xs text-gray-500 hover:text-gray-800" 
                onClick={() => setShowLegend(false)}
              >
                ✕
              </button>
            </div>
            
            {/* Parcels legend */}
            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Parcels</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#12b76a', opacity: 0.7 }}></div>
                  <span className="text-xs">Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f79009', opacity: 0.7 }}></div>
                  <span className="text-xs">Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f04438', opacity: 0.7 }}></div>
                  <span className="text-xs">Disqualified</span>
                </div>
              </div>
            </div>
            
            {/* Zoning legend */}
            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Zoning</h4>
              <div className="space-y-1">
                {MAP_LAYERS.zoning.map((zone) => (
                  <div key={zone.id} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: zone.color, opacity: 0.5 }}></div>
                    <span className="text-xs">{zone.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Utilities legend */}
            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Utilities</h4>
              <div className="space-y-1">
                {MAP_LAYERS.utilities.map((utility) => (
                  <div key={utility.id} className="flex items-center gap-2">
                    <div className="h-[2px] w-8" style={{ 
                      backgroundColor: utility.color,
                      borderTop: utility.lineStyle === 'dashed' ? '2px dashed ' + utility.color : 
                                  utility.lineStyle === 'dotted' ? '2px dotted ' + utility.color : 
                                  '2px solid ' + utility.color
                    }}></div>
                    <span className="text-xs">{utility.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floodplain legend */}
            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Floodplain</h4>
              <div className="space-y-1">
                {MAP_LAYERS.floodplain.map((flood) => (
                  <div key={flood.id} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ 
                      backgroundColor: flood.color, 
                      opacity: 0.4,
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)'
                    }}></div>
                    <span className="text-xs">{flood.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* School Districts legend */}
            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">School Districts</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2" style={{ borderColor: '#059669', backgroundColor: 'transparent' }}></div>
                  <span className="text-xs">Highly Rated (8-10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2" style={{ borderColor: '#0284c7', backgroundColor: 'transparent' }}></div>
                  <span className="text-xs">Well Rated (6-7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2" style={{ borderColor: '#9333ea', backgroundColor: 'transparent' }}></div>
                  <span className="text-xs">Standard Rating (1-5)</span>
                </div>
              </div>
            </div>
            
            {/* Topography legend */}
            <div>
              <h4 className="text-xs font-medium mb-1">Topography</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-10" style={{ backgroundColor: '#52b788', height: '2.5px' }}></div>
                  <span className="text-xs">Major Contour (80-100ft)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-10" style={{ backgroundColor: '#74c69d', height: '1.5px' }}></div>
                  <span className="text-xs">Minor Contour (20-60ft)</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Legend toggle button */}
        {!showLegend && (
          <div className="absolute bottom-6 right-6 z-[1000]">
            <button 
              className="bg-white rounded-lg shadow-md p-2"
              onClick={() => setShowLegend(true)}
            >
              <span className="text-xs">Show Legend</span>
            </button>
          </div>
        )}
        
        {/* Base Parcels Layer */}
        {activeLayers.includes('parcels') && (
          <FeatureGroup>
            {MOCK_PARCELS.map((parcel) => {
              const coordinates = reverseCoordinates(parcel.geometry.coordinates[0]);
              const isSelected = selectedParcel?.id === parcel.id;
              const statusColor = getMatchStatusColor(parcel.matchStatus);
              
              return (
                <Polygon
                  key={parcel.id}
                  positions={coordinates}
                  pathOptions={{
                    color: statusColor,
                    weight: isSelected ? 3 : (filteredParcels.includes(parcel.id) ? 2 : 1.5),
                    fillColor: statusColor,
                    fillOpacity: isSelected ? 0.5 : (filteredParcels.includes(parcel.id) ? 0.6 : 0.3),
                    opacity: filteredParcels.length > 0 && !filteredParcels.includes(parcel.id) ? 0.4 : 1
                  }}
                  eventHandlers={{
                    click: () => handleParcelClick(parcel),
                    mouseover: (e) => {
                      e.target.setStyle({ 
                        fillOpacity: 0.7,
                        weight: isSelected ? 3 : (filteredParcels.includes(parcel.id) ? 2.5 : 2)
                      });
                    },
                    mouseout: (e) => {
                      e.target.setStyle({ 
                        fillOpacity: isSelected ? 0.5 : (filteredParcels.includes(parcel.id) ? 0.6 : 0.3),
                        weight: isSelected ? 3 : (filteredParcels.includes(parcel.id) ? 2 : 1.5),
                        opacity: filteredParcels.length > 0 && !filteredParcels.includes(parcel.id) ? 0.4 : 1
                      });
                    }
                  }}
                >
                  <Tooltip sticky className="parcel-tooltip">
                    <div>
                      <div className="font-semibold">{parcel.address}</div>
                      <div className="text-sm">{parcel.size} | {parcel.zoning}</div>
                      <div className={`text-sm mt-1 status-${parcel.matchStatus}`}>
                        {getMatchStatusLabel(parcel.matchStatus)} {parcel.matchScore ? `(${parcel.matchScore}%)` : ''}
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
          </FeatureGroup>
        )}
        
        {/* Zoning Layer */}
        {activeLayers.includes('zoning') && (
          <FeatureGroup>
            {MOCK_PARCELS.map((parcel) => {
              const coordinates = reverseCoordinates(parcel.geometry.coordinates[0]);
              const zoningType = parcel.jurisdiction?.zoningType;
              const fillColor = getZoningColor(zoningType);
              
              // Create a label for the zoning type
              const zoneLabel = zoningType ? 
                MAP_LAYERS.zoning.find(z => z.id === zoningType)?.label || zoningType : 
                'Unknown';
              
              return (
                <Polygon
                  key={`zoning-${parcel.id}`}
                  positions={coordinates}
                  pathOptions={{
                    color: fillColor,
                    weight: 2,
                    fillColor: fillColor,
                    fillOpacity: 0.25,
                    dashArray: '3, 5' // Dashed lines to distinguish from parcel borders
                  }}
                >
                  <Tooltip>
                    <div>
                      <div className="font-semibold">{zoneLabel}</div>
                      <div className="text-sm">Zone: {parcel.jurisdiction?.zoningCode}</div>
                      {parcel.jurisdiction?.allowedDensity ? (
                        <div className="text-sm">Max Density: {parcel.jurisdiction.allowedDensity} units/acre</div>
                      ) : null}
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
          </FeatureGroup>
        )}
        
        {/* Floodplain Layer */}
        {activeLayers.includes('floodplain') && (
          <FeatureGroup>
            {/* Show mock floodplain areas */}
            {MOCK_FLOODPLAINS.map((floodplain) => {
              const coordinates = floodplain.boundary.map(
                coord => [coord[1], coord[0]] as [number, number]
              );
              
              const floodType = MAP_LAYERS.floodplain.find(f => f.id === floodplain.type);
              const color = floodType?.color || '#3b82f6';
              const label = floodType?.label || floodplain.type;
              
              return (
                <Polygon
                  key={floodplain.id}
                  positions={coordinates}
                  pathOptions={{
                    color: color,
                    weight: 2,
                    fillColor: color,
                    fillOpacity: 0.3,
                    dashArray: '5, 10' // Distinctive pattern for flood areas
                  }}
                >
                  <Tooltip>
                    <div>
                      <div className="font-semibold">{label}</div>
                      <div className="text-sm">FEMA Designated Floodplain</div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
            
            {/* Also show parcels in floodplain with a hatched pattern effect */}
            {MOCK_PARCELS.filter(parcel => parcel.environmental?.inFloodplain).map((parcel) => {
              const coordinates = reverseCoordinates(parcel.geometry.coordinates[0]);
              const floodZone = parcel.environmental?.floodZone || 'Unknown zone';
              
              return (
                <Polygon
                  key={`flood-${parcel.id}`}
                  positions={coordinates}
                  pathOptions={{
                    color: '#3b82f6',
                    weight: 1.5,
                    fillColor: '#3b82f6',
                    fillOpacity: 0.2,
                    dashArray: '2, 5'
                  }}
                >
                  <Tooltip>
                    <div>
                      <div className="font-semibold">Parcel in Floodplain</div>
                      <div className="text-sm">Zone: {floodZone}</div>
                      <div className="text-sm text-amber-600">Flood risk present</div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
          </FeatureGroup>
        )}
        
        {/* Utilities Layer */}
        {activeLayers.includes('utilities') && (
          <FeatureGroup>
            {Object.entries(MOCK_UTILITY_LINES).map(([utilityType, lines]) => {
              const utilityInfo = MAP_LAYERS.utilities.find(u => u.id === utilityType);
              
              return lines.map((line, index) => {
                const startPoint = reversePoint(line.start);
                const endPoint = reversePoint(line.end);
                
                // Different line styles for different utility types
                let lineStyle = {};
                switch(utilityType) {
                  case 'water':
                    lineStyle = { color: '#0ea5e9', weight: 3, dashArray: undefined };
                    break;
                  case 'sewer':
                    lineStyle = { color: '#65a30d', weight: 3, dashArray: '5, 10' };
                    break;
                  case 'electricity':
                    lineStyle = { color: '#f59e0b', weight: 2, dashArray: '10, 10' };
                    break;
                  case 'gas':
                    lineStyle = { color: '#f97316', weight: 2, dashArray: '10, 5, 2, 5' };
                    break;
                  default:
                    lineStyle = { 
                      color: utilityInfo?.color || '#3b82f6',
                      weight: 2,
                      dashArray: utilityInfo?.lineStyle === 'dashed' ? '5, 5' : 
                              utilityInfo?.lineStyle === 'dotted' ? '1, 5' : undefined
                    };
                }
                
                return (
                  <Polyline
                    key={`${utilityType}-${index}`}
                    positions={[startPoint, endPoint]}
                    pathOptions={lineStyle}
                  >
                    <Tooltip>
                      <div>
                        <div className="font-semibold">{utilityInfo?.label || utilityType}</div>
                        <div className="text-sm">{utilityType === 'water' ? 'Water main' : 
                                             utilityType === 'sewer' ? 'Sewer line' : 
                                             utilityType === 'electricity' ? 'Power line' : 
                                             utilityType === 'gas' ? 'Gas line' : 'Utility line'}</div>
                      </div>
                    </Tooltip>
                  </Polyline>
                );
              });
            }).flat()}
            
            {/* Add utility access points/markers for better visualization */}
            {Object.entries(MOCK_UTILITY_LINES).map(([utilityType, lines]) => {
              return lines.map((line, index) => {
                const startPoint = reversePoint(line.start);
                const endPoint = reversePoint(line.end);
                
                // Only add markers at some junctions to avoid clutter
                if (index % 3 === 0) {
                  let markerColor;
                  switch(utilityType) {
                    case 'water': markerColor = '#0ea5e9'; break;
                    case 'sewer': markerColor = '#65a30d'; break;
                    case 'electricity': markerColor = '#f59e0b'; break;
                    case 'gas': markerColor = '#f97316'; break;
                    default: markerColor = '#3b82f6';
                  }
                  
                  return (
                    <Circle
                      key={`${utilityType}-marker-${index}`}
                      center={startPoint}
                      radius={5}
                      pathOptions={{
                        color: markerColor,
                        fillColor: markerColor,
                        fillOpacity: 0.8
                      }}
                    >
                      <Tooltip>
                        <div>
                          <div className="font-semibold">{utilityType.charAt(0).toUpperCase() + utilityType.slice(1)} Junction</div>
                        </div>
                      </Tooltip>
                    </Circle>
                  );
                }
                return null;
              }).filter(Boolean);
            }).flat()}
          </FeatureGroup>
        )}
        
        {/* School Districts Layer */}
        {activeLayers.includes('schools') && (
          <FeatureGroup>
            {MOCK_SCHOOL_DISTRICTS.map((district) => {
              const coordinates = district.boundary.map(
                coord => [coord[1], coord[0]] as [number, number]
              );
              
              // Use different colors based on school district rating
              const rating = district.rating || 5;
              let districtColor;
              
              if (rating >= 8) {
                districtColor = '#059669'; // Green for high ratings
              } else if (rating >= 6) {
                districtColor = '#0284c7'; // Blue for medium ratings
              } else {
                districtColor = '#9333ea'; // Purple for lower ratings
              }
              
              return (
                <Polygon
                  key={district.id}
                  positions={coordinates}
                  pathOptions={{
                    color: districtColor,
                    weight: 3,
                    fillColor: districtColor,
                    fillOpacity: 0.1,
                    dashArray: '5, 10'
                  }}
                >
                  <Tooltip>
                    <div>
                      <div className="font-semibold">{district.name}</div>
                      <div className="text-sm">Rating: {district.rating}/10</div>
                      <div className="text-sm">{
                        rating >= 8 ? 'Highly Rated' : 
                        rating >= 6 ? 'Well Rated' : 'Standard Rating'
                      }</div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
            
            {/* Add school location markers */}
            {MOCK_SCHOOL_DISTRICTS.map((district, idx) => {
              // Generate a position inside the district (simple approximation)
              const boundary = district.boundary;
              // Take average of first few points for a position inside the boundary
              const lat = (boundary[0][1] + boundary[1][1] + boundary[2][1]) / 3;
              const lng = (boundary[0][0] + boundary[1][0] + boundary[2][0]) / 3;
              
              return (
                <Circle
                  key={`school-${district.id}`}
                  center={[lat, lng]}
                  radius={100}
                  pathOptions={{
                    color: '#6366f1',
                    fillColor: '#6366f1',
                    fillOpacity: 0.6
                  }}
                >
                  <Tooltip>
                    <div>
                      <div className="font-semibold">{`${district.name} High School`}</div>
                      <div className="text-sm">District: {district.name}</div>
                      <div className="text-sm">Rating: {district.rating}/10</div>
                    </div>
                  </Tooltip>
                </Circle>
              );
            })}
          </FeatureGroup>
        )}
        
        {/* Topography Layer */}
        {activeLayers.includes('topography') && (
          <FeatureGroup>
            {MOCK_CONTOUR_LINES.map((contour) => {
              const coordinates = contour.path.map(
                coord => [coord[1], coord[0]] as [number, number]
              );
              
              const contourInfo = MAP_LAYERS.topography.find(t => t.id === contour.type);
              const color = contourInfo?.color || '#a16207';
              
              // Make the line weight proportional to the elevation
              // for visual distinction between major and minor contours
              const lineWeight = contour.elevation >= 80 ? 2.5 :
                                contour.elevation >= 60 ? 2 :
                                contour.elevation >= 40 ? 1.5 : 1;
              
              return (
                <Polyline
                  key={contour.id}
                  positions={coordinates}
                  pathOptions={{
                    color: color,
                    weight: lineWeight,
                    opacity: 0.8,
                    dashArray: contour.elevation % 40 === 0 ? undefined : '3, 5' // Solid lines for major contours
                  }}
                >
                  <Tooltip>
                    <div>
                      <div className="font-semibold">Elevation: {contour.elevation} ft</div>
                      <div className="text-sm">Topographic contour line</div>
                    </div>
                  </Tooltip>
                </Polyline>
              );
            })}
            
            {/* Add elevation labels at key points */}
            {MOCK_CONTOUR_LINES.filter(c => c.elevation % 40 === 0).map((contour) => {
              // Get a point in the middle of the contour path
              const midIndex = Math.floor(contour.path.length / 2);
              const midPoint = [contour.path[midIndex][1], contour.path[midIndex][0]];
              
              return (
                <Circle
                  key={`elevation-${contour.id}`}
                  center={midPoint as [number, number]}
                  radius={8}
                  pathOptions={{
                    color: '#a16207',
                    fillColor: '#a16207',
                    fillOpacity: 0.6
                  }}
                >
                  <Tooltip permanent direction="center">
                    <div className="text-xs font-medium">{contour.elevation}'</div>
                  </Tooltip>
                </Circle>
              );
            })}
          </FeatureGroup>
        )}
        
        <SetMapView center={[30.267153, -97.743057]} />
      </MapContainer>
    </div>
  );
} 