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

// Import LayersControl and its child component separately
const DynamicLayersControl = dynamic(
  () => import('react-leaflet').then((mod) => mod.LayersControl),
  { ssr: false }
);

// Create separate components for the overlay
const LayersControlOverlay = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { LayersControl } = mod;
    return LayersControl.Overlay;
  }),
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
}

export default function ParcelMap({ onParcelSelect, filteredParcels = [] }: ParcelMapProps) {
  const [selectedParcel, setSelectedParcel] = useState<ParcelData | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeLayers, setActiveLayers] = useState<LayerType[]>(['zoning', 'utilities']);
  
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

  const toggleLayer = (layerId: LayerType) => {
    setActiveLayers(prev => {
      if (prev.includes(layerId)) {
        return prev.filter(id => id !== layerId);
      } else {
        return [...prev, layerId];
      }
    });
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
        
        <DynamicLayersControl position="topright">
          {/* Base Parcels Layer */}
          <LayersControlOverlay checked name="Parcels">
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
          </LayersControlOverlay>
          
          {/* Zoning Layer */}
          <LayersControlOverlay checked name="Zoning">
            <FeatureGroup>
              {MOCK_PARCELS.map((parcel) => {
                const coordinates = reverseCoordinates(parcel.geometry.coordinates[0]);
                const zoningType = parcel.jurisdiction?.zoningType;
                const fillColor = getZoningColor(zoningType);
                
                return (
                  <Polygon
                    key={`zoning-${parcel.id}`}
                    positions={coordinates}
                    pathOptions={{
                      color: fillColor,
                      weight: 1,
                      fillColor: fillColor,
                      fillOpacity: 0.2,
                      dashArray: '5, 5'
                    }}
                  >
                    <Tooltip>
                      <div>
                        <div className="font-semibold">{parcel.jurisdiction?.zoningDescription}</div>
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
          </LayersControlOverlay>
          
          {/* Floodplain Layer */}
          <LayersControlOverlay name="Floodplain">
            <FeatureGroup>
              {/* Show mock floodplain areas */}
              {MOCK_FLOODPLAINS.map((floodplain) => {
                const coordinates = floodplain.boundary.map(
                  coord => [coord[1], coord[0]] as [number, number]
                );
                
                const floodType = MAP_LAYERS.floodplain.find(f => f.id === floodplain.type);
                const color = floodType?.color || '#3b82f6';
                
                return (
                  <Polygon
                    key={floodplain.id}
                    positions={coordinates}
                    pathOptions={{
                      color: color,
                      weight: 1,
                      fillColor: color,
                      fillOpacity: 0.3,
                      dashArray: '2, 5'
                    }}
                  >
                    <Tooltip>
                      <div>
                        <div className="font-semibold">Floodplain: {floodType?.label || floodplain.type}</div>
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              })}
              
              {/* Also show parcels in floodplain */}
              {MOCK_PARCELS.filter(parcel => parcel.environmental?.inFloodplain).map((parcel) => {
                const coordinates = reverseCoordinates(parcel.geometry.coordinates[0]);
                
                return (
                  <Polygon
                    key={`flood-${parcel.id}`}
                    positions={coordinates}
                    pathOptions={{
                      color: '#3b82f6',
                      weight: 1,
                      fillColor: '#3b82f6',
                      fillOpacity: 0.3,
                      dashArray: '2, 5'
                    }}
                  >
                    <Tooltip>
                      <div>
                        <div className="font-semibold">Parcel in Floodplain</div>
                        {parcel.environmental?.floodZone && (
                          <div className="text-sm">Zone: {parcel.environmental.floodZone}</div>
                        )}
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              })}
            </FeatureGroup>
          </LayersControlOverlay>
          
          {/* Utilities Layer */}
          <LayersControlOverlay checked name="Utilities">
            <FeatureGroup>
              {Object.entries(MOCK_UTILITY_LINES).map(([utilityType, lines]) => {
                const utilityInfo = MAP_LAYERS.utilities.find(u => u.id === utilityType);
                
                return lines.map((line, index) => {
                  const startPoint = reversePoint(line.start);
                  const endPoint = reversePoint(line.end);
                  
                  return (
                    <Polyline
                      key={`${utilityType}-${index}`}
                      positions={[startPoint, endPoint]}
                      pathOptions={{
                        color: utilityInfo?.color || '#3b82f6',
                        weight: 2,
                        dashArray: utilityInfo?.lineStyle === 'dashed' ? '5, 5' : 
                                  utilityInfo?.lineStyle === 'dotted' ? '1, 5' : undefined
                      }}
                    >
                      <Tooltip>
                        <div>
                          <div className="font-semibold">{utilityInfo?.label || utilityType}</div>
                        </div>
                      </Tooltip>
                    </Polyline>
                  );
                });
              }).flat()}
            </FeatureGroup>
          </LayersControlOverlay>
          
          {/* School Districts Layer */}
          <LayersControlOverlay name="School Districts">
            <FeatureGroup>
              {MOCK_SCHOOL_DISTRICTS.map((district) => {
                const coordinates = district.boundary.map(
                  coord => [coord[1], coord[0]] as [number, number]
                );
                
                const schoolInfo = MAP_LAYERS.schools.find(s => s.id === 'elementary');
                const color = schoolInfo?.color || '#cdb4db';
                
                return (
                  <Polygon
                    key={district.id}
                    positions={coordinates}
                    pathOptions={{
                      color: color,
                      weight: 2,
                      fillColor: color,
                      fillOpacity: 0.1,
                      dashArray: '3, 5'
                    }}
                  >
                    <Tooltip>
                      <div>
                        <div className="font-semibold">{district.name}</div>
                        <div className="text-sm">Rating: {district.rating}/10</div>
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              })}
            </FeatureGroup>
          </LayersControlOverlay>
          
          {/* Topography Layer */}
          <LayersControlOverlay name="Topography">
            <FeatureGroup>
              {MOCK_CONTOUR_LINES.map((contour) => {
                const coordinates = contour.path.map(
                  coord => [coord[1], coord[0]] as [number, number]
                );
                
                const contourInfo = MAP_LAYERS.topography.find(t => t.id === contour.type);
                const color = contourInfo?.color || '#a16207';
                
                return (
                  <Polyline
                    key={contour.id}
                    positions={coordinates}
                    pathOptions={{
                      color: color,
                      weight: 1.5,
                      opacity: 0.7
                    }}
                  >
                    <Tooltip>
                      <div>
                        <div className="font-semibold">Elevation: {contour.elevation} ft</div>
                      </div>
                    </Tooltip>
                  </Polyline>
                );
              })}
            </FeatureGroup>
          </LayersControlOverlay>
        </DynamicLayersControl>
        
        <SetMapView center={[30.267153, -97.743057]} />
      </MapContainer>
    </div>
  );
} 