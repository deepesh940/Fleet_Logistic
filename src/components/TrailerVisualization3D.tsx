import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState } from 'react';
import { ZoomIn, ZoomOut, Minimize2, Truck, Package, Info, Ruler } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import carCarrierDiagram from 'figma:asset/f98e32d18b485e1c18c610b1cbcf45a867492685.png';

interface Vehicle {
  vin: string;
  model: string;
  m3: number;
  destination?: string;
}

interface TrailerVisualization3DProps {
  upperDeck: Vehicle[];
  lowerDeck: Vehicle[];
  fleetId: string;
  fleetName: string;
}

// Automatic Vehicle Selection Logic
type LoadingVehicleType = 'OPEN_CAR_CARRIER' | 'CLOSED_CONTAINER';

interface LoadingVehicleSpec {
  type: LoadingVehicleType;
  name: string;
  capacity: number; // in meters
  height: number; // for container
  levels: number; // 1 or 2
}

function selectLoadingVehicle(upperDeck: Vehicle[], lowerDeck: Vehicle[]): LoadingVehicleSpec {
  const totalVehicles = upperDeck.length + lowerDeck.length;
  const hasMultipleLevels = upperDeck.length > 0 && lowerDeck.length > 0;
  
  // Calculate approximate total length needed (each car ~4-5m)
  const avgCarLength = 4.5; // meters
  const totalLengthNeeded = totalVehicles * avgCarLength;
  
  // Decision logic - Max 8 cars total (4 per deck for carrier, 4 for container)
  if (hasMultipleLevels || totalVehicles > 4) {
    // Use open car carrier for 2-level or more than 4 cars (max 8 total: 4 per deck)
    return {
      type: 'OPEN_CAR_CARRIER',
      name: 'Open Car Carrier Truck (4 per deck, 8 max)',
      capacity: 18, // 18m deck length
      height: 0, // open deck
      levels: 2
    };
  } else {
    // Use closed container for single level, 4 cars or fewer
    return {
      type: 'CLOSED_CONTAINER',
      name: 'Closed Container Truck (4 max)',
      capacity: 12, // 12m container
      height: 2.4, // standard container height
      levels: 1
    };
  }
}

// Precise Car Silhouettes - Side Elevation View
const CarSilhouetteSideView = ({
  type,
  x,
  y,
  index,
  scale = 1
}: {
  type: string;
  x: number;
  y: number;
  index: number;
  scale?: number;
}) => {
  const getCarColor = (model: string) => {
    const colors: Record<string, { fill: string; stroke: string }> = {
      'Sedan': { fill: '#3b82f6', stroke: '#1e40af' },      // Blue
      'SUV': { fill: '#f97316', stroke: '#c2410c' },        // Orange
      'Hatchback': { fill: '#10b981', stroke: '#059669' },  // Green
      'Van Cargo': { fill: '#8b5cf6', stroke: '#6d28d9' },  // Purple
      'Truck': { fill: '#64748b', stroke: '#475569' },      // Slate
    };
    return colors[model] || colors['Sedan'];
  };

  const colors = getCarColor(type);

  // Vehicle dimensions (scaled for technical drawing) - LARGER for easy identification
  const baseWidth = 120 * scale;  // Length of car
  const baseHeight = 45 * scale; // Height of car

  if (type === 'Sedan') {
    // Sedan - Low profile, sleek (scaled up proportionally)
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx={baseWidth / 2} cy={baseHeight + 3} rx={baseWidth * 0.4} ry={6} fill="#000000" opacity="0.15" />
        
        {/* Main body - smooth sedan profile */}
        <path
          d={`
            M 15,${baseHeight}
            L 7.5,${baseHeight - 7.5}
            L 7.5,${baseHeight - 18}
            L 22.5,${baseHeight - 30}
            L 45,${baseHeight - 33}
            L 67.5,${baseHeight - 33}
            L 82.5,${baseHeight - 30}
            L 105,${baseHeight - 18}
            L 112.5,${baseHeight - 7.5}
            L 105,${baseHeight}
            Z
          `}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="3"
          opacity="0.85"
        />
        
        {/* Windows */}
        <path
          d={`M 30,${baseHeight - 31.5} L 42,${baseHeight - 31.5} L 42,${baseHeight - 22.5} L 33,${baseHeight - 22.5} Z`}
          fill="#bfdbfe"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d={`M 72,${baseHeight - 31.5} L 84,${baseHeight - 31.5} L 81,${baseHeight - 22.5} L 75,${baseHeight - 22.5} Z`}
          fill="#bfdbfe"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0.7"
        />
        
        {/* Wheels */}
        <circle cx={27} cy={baseHeight} r="9" fill="#1f2937" stroke={colors.stroke} strokeWidth="3" />
        <circle cx={27} cy={baseHeight} r="4.5" fill="#6b7280" />
        <circle cx={93} cy={baseHeight} r="9" fill="#1f2937" stroke={colors.stroke} strokeWidth="3" />
        <circle cx={93} cy={baseHeight} r="4.5" fill="#6b7280" />
        
        {/* Badge */}
        <circle cx={baseWidth / 2} cy={-12} r="14" fill={colors.stroke} stroke="#0f172a" strokeWidth="2" />
        <text x={baseWidth / 2} y={-6} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {index + 1}
        </text>
      </g>
    );
  } else if (type === 'SUV') {
    // SUV - Tall, boxy profile (scaled up proportionally)
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx={baseWidth / 2} cy={baseHeight + 3} rx={baseWidth * 0.45} ry={7.5} fill="#000000" opacity="0.15" />
        
        {/* Main body - boxy SUV shape */}
        <path
          d={`
            M 12,${baseHeight}
            L 12,${baseHeight - 15}
            L 18,${baseHeight - 42}
            L 37.5,${baseHeight - 48}
            L 82.5,${baseHeight - 48}
            L 102,${baseHeight - 42}
            L 108,${baseHeight - 15}
            L 108,${baseHeight}
            Z
          `}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="3"
          opacity="0.85"
        />
        
        {/* Windows - larger for SUV */}
        <rect
          x={27}
          y={baseHeight - 46.5}
          width={27}
          height={24}
          fill="#bfdbfe"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0.7"
          rx="3"
        />
        <rect
          x={66}
          y={baseHeight - 46.5}
          width={27}
          height={24}
          fill="#bfdbfe"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0.7"
          rx="3"
        />
        
        {/* Wheels - larger for SUV */}
        <circle cx={30} cy={baseHeight} r="10.5" fill="#1f2937" stroke={colors.stroke} strokeWidth="3" />
        <circle cx={30} cy={baseHeight} r="5.25" fill="#6b7280" />
        <circle cx={90} cy={baseHeight} r="10.5" fill="#1f2937" stroke={colors.stroke} strokeWidth="3" />
        <circle cx={90} cy={baseHeight} r="5.25" fill="#6b7280" />
        
        {/* Badge */}
        <circle cx={baseWidth / 2} cy={-15} r="14" fill={colors.stroke} stroke="#0f172a" strokeWidth="2" />
        <text x={baseWidth / 2} y={-9} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {index + 1}
        </text>
      </g>
    );
  } else if (type === 'Hatchback') {
    // Hatchback - Short, angled back (scaled up proportionally)
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Shadow */}
        <ellipse cx={baseWidth * 0.45} cy={baseHeight + 3} rx={baseWidth * 0.35} ry={6} fill="#000000" opacity="0.15" />
        
        {/* Main body - compact hatchback */}
        <path
          d={`
            M 12,${baseHeight}
            L 7.5,${baseHeight - 12}
            L 12,${baseHeight - 27}
            L 27,${baseHeight - 33}
            L 52.5,${baseHeight - 34.5}
            L 72,${baseHeight - 33}
            L 87,${baseHeight - 24}
            L 90,${baseHeight - 12}
            L 87,${baseHeight}
            Z
          `}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="3"
          opacity="0.85"
        />
        
        {/* Windows - compact */}
        <path
          d={`M 22.5,${baseHeight - 33} L 34.5,${baseHeight - 33} L 34.5,${baseHeight - 24} L 25.5,${baseHeight - 24} Z`}
          fill="#bfdbfe"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d={`M 57,${baseHeight - 33} L 75,${baseHeight - 31.5} L 75,${baseHeight - 22.5} L 60,${baseHeight - 22.5} Z`}
          fill="#bfdbfe"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0.7"
        />
        
        {/* Wheels */}
        <circle cx={22.5} cy={baseHeight} r="9" fill="#1f2937" stroke={colors.stroke} strokeWidth="3" />
        <circle cx={22.5} cy={baseHeight} r="4.5" fill="#6b7280" />
        <circle cx={75} cy={baseHeight} r="9" fill="#1f2937" stroke={colors.stroke} strokeWidth="3" />
        <circle cx={75} cy={baseHeight} r="4.5" fill="#6b7280" />
        
        {/* Badge */}
        <circle cx={baseWidth * 0.45} cy={-12} r="14" fill={colors.stroke} stroke="#0f172a" strokeWidth="2" />
        <text x={baseWidth * 0.45} y={-6} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {index + 1}
        </text>
      </g>
    );
  }

  // Fallback to Sedan
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={baseWidth} height={baseHeight} fill={colors.fill} stroke={colors.stroke} strokeWidth="2" opacity="0.7" />
    </g>
  );
};

// Open Car Carrier Truck - Technical Side Elevation
const OpenCarCarrierTruck3Level = ({
  topDeck,
  middleDeck,
  bottomDeck,
  scale = 1,
  containerNumber = 1,
  totalContainers = 1
}: {
  topDeck: Vehicle[];
  middleDeck: Vehicle[];
  bottomDeck: Vehicle[];
  scale?: number;
  containerNumber?: number;
  totalContainers?: number;
}) => {
  const truckStartX = 50;
  const truckY = 400;
  
  // Dimensions
  const cabWidth = 80;
  const cabHeight = 90;
  const trailerLength = 800;
  const deckHeight = 8;
  const levelSpacing = 80; // Spacing between levels (reduced for 3 levels)
  
  // Calculate vehicle positions with different spacing per level
  const bottomCarSpacing = 200; // 3 cars on bottom
  const middleCarSpacing = 300; // 2 cars on middle
  const topCarSpacing = 600; // 1 car on top
  const carStartX = truckStartX + cabWidth + 60;
  
  // 6-Position Layout: Bottom(3), Middle(2), Top(1)
  const bottomDeckCars = bottomDeck.slice(0, 3); // Positions 4, 5, 6
  const middleDeckCars = middleDeck.slice(0, 2); // Positions 2, 3
  const topDeckCars = topDeck.slice(0, 1); // Position 1
  
  return (
    <g>
      {/* Container Number Badge */}
      {totalContainers > 1 && (
        <g>
          <rect x={truckStartX} y={truckY - cabHeight - 60} width={140} height={35} fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="6" />
          <text x={truckStartX + 70} y={truckY - cabHeight - 35} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
            Truck {containerNumber} of {totalContainers}
          </text>
        </g>
      )}
      
      {/* Truck Cab */}
      <g>
        {/* Cab body */}
        <rect
          x={truckStartX}
          y={truckY - cabHeight}
          width={cabWidth}
          height={cabHeight}
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="3"
          rx="4"
        />
        
        {/* Cab window */}
        <rect
          x={truckStartX + 45}
          y={truckY - cabHeight + 15}
          width={28}
          height={35}
          fill="#bfdbfe"
          stroke="#1e40af"
          strokeWidth="2"
          rx="2"
          opacity="0.8"
        />
        
        {/* Cab details */}
        <rect x={truckStartX + 5} y={truckY - 30} width={15} height={8} fill="#fbbf24" rx="2" />
        
        {/* Front wheels */}
        <circle cx={truckStartX + 20} cy={truckY + 5} r="12" fill="#1f2937" stroke="#0f172a" strokeWidth="3" />
        <circle cx={truckStartX + 20} cy={truckY + 5} r="6" fill="#6b7280" />
      </g>
      
      {/* Trailer Chassis */}
      <g>
        {/* Main chassis beam */}
        <rect
          x={truckStartX + cabWidth}
          y={truckY - 15}
          width={trailerLength}
          height={15}
          fill="#4b5563"
          stroke="#1f2937"
          strokeWidth="2"
        />
        
        {/* Support beams - extended for 3 levels */}
        <rect x={truckStartX + cabWidth + 100} y={truckY - 200} width={8} height={185} fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <rect x={truckStartX + cabWidth + 300} y={truckY - 200} width={8} height={185} fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <rect x={truckStartX + cabWidth + 500} y={truckY - 200} width={8} height={185} fill="#6b7280" stroke="#374151" strokeWidth="2" />
        <rect x={truckStartX + cabWidth + 700} y={truckY - 200} width={8} height={185} fill="#6b7280" stroke="#374151" strokeWidth="2" />
        
        {/* Bottom Deck Platform (Positions 4, 5, 6) */}
        <rect
          x={carStartX - 10}
          y={truckY - 38}
          width={trailerLength - 30}
          height={deckHeight}
          fill="#9ca3af"
          stroke="#374151"
          strokeWidth="2.5"
        />
        
        {/* Middle Deck Platform (Positions 2, 3) */}
        <rect
          x={carStartX - 10}
          y={truckY - 38 - levelSpacing}
          width={trailerLength - 30}
          height={deckHeight}
          fill="#9ca3af"
          stroke="#374151"
          strokeWidth="2.5"
        />
        
        {/* Top Deck Platform (Position 1) */}
        <rect
          x={carStartX - 10}
          y={truckY - 38 - (levelSpacing * 2)}
          width={trailerLength - 30}
          height={deckHeight}
          fill="#9ca3af"
          stroke="#374151"
          strokeWidth="2.5"
        />
        
        {/* Rear wheels */}
        <circle cx={truckStartX + cabWidth + trailerLength - 100} cy={truckY + 5} r="12" fill="#1f2937" stroke="#0f172a" strokeWidth="3" />
        <circle cx={truckStartX + cabWidth + trailerLength - 100} cy={truckY + 5} r="6" fill="#6b7280" />
        <circle cx={truckStartX + cabWidth + trailerLength - 60} cy={truckY + 5} r="12" fill="#1f2937" stroke="#0f172a" strokeWidth="3" />
        <circle cx={truckStartX + cabWidth + trailerLength - 60} cy={truckY + 5} r="6" fill="#6b7280" />
      </g>
      
      {/* Bottom Deck Label */}
      <g>
        <rect x={truckStartX + cabWidth + 5} y={truckY - 60} width={30} height={50} fill="#059669" stroke="#047857" strokeWidth="2" rx="4" />
        <text x={truckStartX + cabWidth + 20} y={truckY - 30} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" transform={`rotate(-90, ${truckStartX + cabWidth + 20}, ${truckY - 35})`}>
          BOTTOM
        </text>
      </g>
      
      {/* Middle Deck Label */}
      <g>
        <rect x={truckStartX + cabWidth + 5} y={truckY - 140} width={30} height={50} fill="#3b82f6" stroke="#1e40af" strokeWidth="2" rx="4" />
        <text x={truckStartX + cabWidth + 20} y={truckY - 110} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" transform={`rotate(-90, ${truckStartX + cabWidth + 20}, ${truckY - 115})`}>
          MIDDLE
        </text>
      </g>
      
      {/* Top Deck Label */}
      <g>
        <rect x={truckStartX + cabWidth + 5} y={truckY - 220} width={30} height={50} fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="4" />
        <text x={truckStartX + cabWidth + 20} y={truckY - 190} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" transform={`rotate(-90, ${truckStartX + cabWidth + 20}, ${truckY - 195})`}>
          TOP
        </text>
      </g>
      
      {/* Bottom Deck Vehicles (Positions 4, 5, 6) - 3 cars */}
      {bottomDeckCars.map((vehicle, idx) => (
        <g key={`bottom-${idx}`}>
          <CarSilhouetteSideView
            type={vehicle.model}
            x={carStartX + idx * bottomCarSpacing}
            y={truckY - 38 - 45}
            index={3 + idx} // Positions 4, 5, 6
          />
          {/* Position number below car */}
          <circle cx={carStartX + idx * bottomCarSpacing + 60} cy={truckY - 5} r="16" fill="#059669" stroke="#047857" strokeWidth="2" />
          <text x={carStartX + idx * bottomCarSpacing + 60} y={truckY + 1} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
            {4 + idx}
          </text>
        </g>
      ))}
      
      {/* Middle Deck Vehicles (Positions 2, 3) - 2 cars */}
      {middleDeckCars.map((vehicle, idx) => (
        <g key={`middle-${idx}`}>
          <CarSilhouetteSideView
            type={vehicle.model}
            x={carStartX + 100 + idx * middleCarSpacing}
            y={truckY - 38 - levelSpacing - 45}
            index={1 + idx} // Positions 2, 3
          />
          {/* Position number below car */}
          <circle cx={carStartX + 100 + idx * middleCarSpacing + 60} cy={truckY - levelSpacing - 5} r="16" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x={carStartX + 100 + idx * middleCarSpacing + 60} y={truckY - levelSpacing + 1} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
            {2 + idx}
          </text>
        </g>
      ))}
      
      {/* Top Deck Vehicle (Position 1) - 1 car */}
      {topDeckCars.map((vehicle, idx) => (
        <g key={`top-${idx}`}>
          <CarSilhouetteSideView
            type={vehicle.model}
            x={carStartX + 250}
            y={truckY - 38 - (levelSpacing * 2) - 45}
            index={0} // Position 1
          />
          {/* Position number below car */}
          <circle cx={carStartX + 250 + 60} cy={truckY - (levelSpacing * 2) - 5} r="16" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <text x={carStartX + 250 + 60} y={truckY - (levelSpacing * 2) + 1} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
            1
          </text>
        </g>
      ))}
      
      {/* Measurement: Deck Length */}
      <g>
        {/* Measurement line */}
        <line
          x1={carStartX}
          y1={truckY + 40}
          x2={carStartX + trailerLength - 30}
          y2={truckY + 40}
          stroke="#1e40af"
          strokeWidth="2"
          markerStart="url(#arrowLeft)"
          markerEnd="url(#arrowRight)"
        />
        <text x={carStartX + (trailerLength - 30) / 2} y={truckY + 35} textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          Internal Deck Length: 18.0 m
        </text>
      </g>
      
      {/* Position Legend */}
      <g transform="translate(750, 480)">
        <rect x="0" y="0" width="200" height="50" fill="white" stroke="#1e40af" strokeWidth="2" rx="6" />
        <text x="100" y="18" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          6-POSITION LAYOUT
        </text>
        <text x="100" y="35" textAnchor="middle" fill="#374151" fontSize="9">
          Top(1) | Middle(2-3) | Bottom(4-6)
        </text>
      </g>
    </g>
  );
};

// Closed Container Truck - Technical Side Elevation
const ClosedContainerTruck = ({
  vehicles,
  scale = 1,
  containerNumber = 1,
  totalContainers = 1
}: {
  vehicles: Vehicle[];
  scale?: number;
  containerNumber?: number;
  totalContainers?: number;
}) => {
  const truckStartX = 50;
  const truckY = 400;
  
  // Dimensions
  const cabWidth = 80;
  const cabHeight = 90;
  const containerLength = 600;
  const containerHeight = 140;
  
  // Calculate vehicle positions
  const carSpacing = 120;  // Increased spacing for larger cars
  const carStartX = truckStartX + cabWidth + 30;
  
  // Capacity: Max 4 cars per container (matching 8 total for carrier)
  const maxCarsPerContainer = 4;
  const containerVehicles = vehicles.slice(0, maxCarsPerContainer);
  
  return (
    <g>
      {/* Container Number Badge */}
      {totalContainers > 1 && (
        <g>
          <rect x={truckStartX} y={truckY - cabHeight - 40} width={120} height={30} fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="6" />
          <text x={truckStartX + 60} y={truckY - cabHeight - 20} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            Container {containerNumber} of {totalContainers}
          </text>
        </g>
      )}
      
      {/* Truck Cab */}
      <g>
        {/* Cab body */}
        <rect
          x={truckStartX}
          y={truckY - cabHeight}
          width={cabWidth}
          height={cabHeight}
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="3"
          rx="4"
        />
        
        {/* Cab window */}
        <rect
          x={truckStartX + 45}
          y={truckY - cabHeight + 15}
          width={28}
          height={35}
          fill="#bfdbfe"
          stroke="#1e40af"
          strokeWidth="2"
          rx="2"
          opacity="0.8"
        />
        
        {/* Cab details */}
        <rect x={truckStartX + 5} y={truckY - 30} width={15} height={8} fill="#fbbf24" rx="2" />
        
        {/* Front wheels */}
        <circle cx={truckStartX + 20} cy={truckY + 5} r="12" fill="#1f2937" stroke="#0f172a" strokeWidth="3" />
        <circle cx={truckStartX + 20} cy={truckY + 5} r="6" fill="#6b7280" />
      </g>
      
      {/* Container Box */}
      <g>
        {/* Container body */}
        <rect
          x={truckStartX + cabWidth + 5}
          y={truckY - containerHeight - 15}
          width={containerLength}
          height={containerHeight}
          fill="#e5e7eb"
          stroke="#1f2937"
          strokeWidth="3"
          rx="4"
        />
        
        {/* Container ribs (corrugation) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line
            key={i}
            x1={truckStartX + cabWidth + 5 + i * 70}
            y1={truckY - containerHeight - 15}
            x2={truckStartX + cabWidth + 5 + i * 70}
            y2={truckY - 15}
            stroke="#9ca3af"
            strokeWidth="1.5"
          />
        ))}
        
        {/* Container doors */}
        <rect
          x={truckStartX + cabWidth + containerLength - 45}
          y={truckY - containerHeight - 10}
          width={40}
          height={containerHeight - 10}
          fill="none"
          stroke="#374151"
          strokeWidth="2.5"
          rx="2"
        />
        <line
          x1={truckStartX + cabWidth + containerLength - 25}
          y1={truckY - containerHeight - 10}
          x2={truckStartX + cabWidth + containerLength - 25}
          y2={truckY - 25}
          stroke="#374151"
          strokeWidth="2.5"
        />
        
        {/* Floor line */}
        <line
          x1={truckStartX + cabWidth + 15}
          y1={truckY - 20}
          x2={truckStartX + cabWidth + containerLength - 10}
          y2={truckY - 20}
          stroke="#6b7280"
          strokeWidth="3"
        />
        
        {/* Chassis */}
        <rect
          x={truckStartX + cabWidth}
          y={truckY - 15}
          width={containerLength + 10}
          height={15}
          fill="#4b5563"
          stroke="#1f2937"
          strokeWidth="2"
        />
        
        {/* Rear wheels */}
        <circle cx={truckStartX + cabWidth + containerLength - 80} cy={truckY + 5} r="12" fill="#1f2937" stroke="#0f172a" strokeWidth="3" />
        <circle cx={truckStartX + cabWidth + containerLength - 80} cy={truckY + 5} r="6" fill="#6b7280" />
        <circle cx={truckStartX + cabWidth + containerLength - 40} cy={truckY + 5} r="12" fill="#1f2937" stroke="#0f172a" strokeWidth="3" />
        <circle cx={truckStartX + cabWidth + containerLength - 40} cy={truckY + 5} r="6" fill="#6b7280" />
      </g>
      
      {/* Vehicles inside container - wheels rest ON the floor line */}
      {containerVehicles.map((vehicle, idx) => (
        <CarSilhouetteSideView
          key={`container-${idx}`}
          type={vehicle.model}
          x={carStartX + idx * carSpacing}
          y={truckY - 20 - 45}
          index={idx}
        />
      ))}
      
      
      {/* Measurement: Container Length */}
      <g>
        {/* Measurement line */}
        <line
          x1={truckStartX + cabWidth + 15}
          y1={truckY + 40}
          x2={truckStartX + cabWidth + containerLength - 10}
          y2={truckY + 40}
          stroke="#1e40af"
          strokeWidth="2"
          markerStart="url(#arrowLeft)"
          markerEnd="url(#arrowRight)"
        />
        <text x={truckStartX + cabWidth + containerLength / 2} y={truckY + 35} textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          Internal Container Length: 12.0 m
        </text>
      </g>
    </g>
  );
};

export function TrailerVisualization3D({ upperDeck, lowerDeck, fleetId, fleetName }: TrailerVisualization3DProps) {
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom percentage
  
  // Automatic vehicle selection
  const loadingVehicle = selectLoadingVehicle(upperDeck, lowerDeck);
  
  // Calculate statistics
  const totalVehicles = upperDeck.length + lowerDeck.length;
  const allVehicles = [...upperDeck, ...lowerDeck];
  const totalM3 = allVehicles.reduce((sum, v) => sum + v.m3, 0);
  const upperDeckM3 = upperDeck.reduce((sum, v) => sum + v.m3, 0);
  const lowerDeckM3 = lowerDeck.reduce((sum, v) => sum + v.m3, 0);
  
  // Calculate vehicle type breakdown
  const typeBreakdown = allVehicles.reduce((acc, vehicle) => {
    acc[vehicle.model] = (acc[vehicle.model] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate length utilization
  const avgCarLength = 4.5; // meters
  const totalRequiredLength = totalVehicles * avgCarLength;
  const utilizationPercent = Math.round((totalRequiredLength / loadingVehicle.capacity) * 100);
  const remainingCapacity = loadingVehicle.capacity - totalRequiredLength;
  
  // Get utilization color
  const getUtilizationColor = (util: number) => {
    if (util >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (util >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (util >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-gray-50 to-white border-2 border-gray-300 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-1">
            Technical Side-Elevation: Vehicle Loading Layout
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm text-gray-600 font-medium">{fleetName}</p>
            <Badge variant="outline" className="bg-white border-2 border-gray-300">
              {fleetId}
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md">
              <Truck className="w-3 h-3 mr-1" />
              {loadingVehicle.name}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg p-1 shadow-md">
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              disabled={zoomLevel <= 50}
              className="p-2 hover:bg-gray-100 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-gray-700" />
            </button>
            <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded border border-blue-200">
              <span className="text-sm font-bold text-gray-800">{zoomLevel}%</span>
            </div>
            <button
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
              disabled={zoomLevel >= 200}
              className="p-2 hover:bg-gray-100 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-2 hover:bg-gray-100 rounded transition-colors ml-1 border-l border-gray-300"
              title="Reset Zoom"
            >
              <Minimize2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-Selection Info Banner */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-300 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-blue-900 mb-1">🤖 Automatic Fleet Planning</p>
            <p className="text-sm text-blue-800 mb-3">
              AI generated <strong>{Math.ceil((loadingVehicle.type === 'OPEN_CAR_CARRIER' ? (upperDeck.length + lowerDeck.length) : allVehicles.length) / (loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 8 : 4))} {loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 'car carrier truck(s)' : 'container(s)'}</strong> to transport {totalVehicles} vehicles • ~{totalRequiredLength.toFixed(1)}m total loading length
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded border border-blue-200">
                <div className="text-xs text-blue-700">Total Cars</div>
                <div className="font-bold text-blue-900">{totalVehicles}</div>
              </div>
              <div className="bg-white p-2 rounded border border-blue-200">
                <div className="text-xs text-blue-700">Fleet Size</div>
                <div className="font-bold text-red-600">{Math.ceil((loadingVehicle.type === 'OPEN_CAR_CARRIER' ? (upperDeck.length + lowerDeck.length) : allVehicles.length) / (loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 8 : 4))}</div>
              </div>
              <div className="bg-white p-2 rounded border border-blue-200">
                <div className="text-xs text-blue-700">Per Vehicle</div>
                <div className="font-bold text-blue-900">{loadingVehicle.type === 'OPEN_CAR_CARRIER' ? '8 max' : '4 max'}</div>
              </div>
              <div className="bg-white p-2 rounded border border-blue-200">
                <div className="text-xs text-blue-700">Capacity</div>
                <div className="font-bold text-blue-900">{loadingVehicle.capacity}m</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border-2 border-slate-200 shadow-md">
          <div className="text-xs text-slate-600 font-bold mb-2 uppercase tracking-wide">Total Vehicles</div>
          <div className="text-3xl font-black text-slate-800">{totalVehicles}</div>
          <div className="text-xs text-slate-500 mt-1">Units to Load</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200 shadow-md">
          <div className="text-xs text-red-700 font-bold mb-2 uppercase tracking-wide">Fleet Size</div>
          <div className="text-3xl font-black text-red-700">
            {Math.ceil((loadingVehicle.type === 'OPEN_CAR_CARRIER' ? (upperDeck.length + lowerDeck.length) : allVehicles.length) / (loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 8 : 4))}
          </div>
          <div className="text-xs text-red-600 mt-1">Trucks/Containers</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200 shadow-md">
          <div className="text-xs text-blue-700 font-bold mb-2 uppercase tracking-wide">Upper Deck</div>
          <div className="text-3xl font-black text-blue-700">{upperDeck.length}</div>
          <div className="text-xs text-blue-600 mt-1">{upperDeckM3.toFixed(1)} M³</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200 shadow-md">
          <div className="text-xs text-green-700 font-bold mb-2 uppercase tracking-wide">Lower Deck</div>
          <div className="text-3xl font-black text-green-700">{lowerDeck.length}</div>
          <div className="text-xs text-green-600 mt-1">{lowerDeckM3.toFixed(1)} M³</div>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="mb-6 p-4 bg-gradient-to-r from-red-50 via-orange-50 to-red-50 rounded-xl border-2 border-red-300 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-gray-800">Fleet Deployment Overview</span>
          <span className="text-xl font-black text-red-600">
            {Math.ceil((loadingVehicle.type === 'OPEN_CAR_CARRIER' ? (upperDeck.length + lowerDeck.length) : allVehicles.length) / (loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 8 : 4))} Truck{Math.ceil((loadingVehicle.type === 'OPEN_CAR_CARRIER' ? (upperDeck.length + lowerDeck.length) : allVehicles.length) / (loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 8 : 4)) > 1 ? 's' : ''}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {totalVehicles} vehicle{totalVehicles !== 1 ? 's' : ''} distributed across multiple {loadingVehicle.type === 'OPEN_CAR_CARRIER' ? 'car carriers' : 'containers'} • Max {loadingVehicle.type === 'OPEN_CAR_CARRIER' ? '8' : '4'} vehicles per unit
        </div>
      </div>

      {/* Technical Diagram */}
      <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 rounded-xl border-2 border-slate-400 p-8 overflow-auto shadow-2xl">
        <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
          {/* Car Carrier Loading Diagram */}
          <div className="flex justify-center items-center p-8 bg-white rounded-lg">
            <ImageWithFallback 
              src={carCarrierDiagram} 
              alt="6-Position Car Carrier Loading Diagram - Shows numbered positions 1-6 across 3 loading levels"
              className="max-w-full h-auto rounded-lg shadow-lg border-2 border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Zoom Info Helper */}
      {zoomLevel !== 100 && (
        <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            🔍 Currently viewing at <strong>{zoomLevel}%</strong> zoom. Use the zoom controls above or click reset to return to 100%.
          </p>
        </div>
      )}

      {/* Vehicle Type Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Color Legend */}
        <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-300 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-gray-800">Vehicle Color Code</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-blue-500 border-2 border-blue-700"></div>
              <span className="text-sm text-gray-700">Sedan (Blue)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-orange-500 border-2 border-orange-700"></div>
              <span className="text-sm text-gray-700">SUV (Orange)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-green-500 border-2 border-green-700"></div>
              <span className="text-sm text-gray-700">Hatchback (Green)</span>
            </div>
          </div>
        </div>

        {/* Type Breakdown */}
        <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-300 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-gray-800">Vehicle Distribution</p>
          </div>
          <div className="space-y-2">
            {Object.entries(typeBreakdown).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{type}</span>
                <Badge variant="outline" className="bg-blue-50 border-blue-300">
                  {count} units
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}