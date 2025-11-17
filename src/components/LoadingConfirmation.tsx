import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Package,
  Camera,
  Upload,
  CheckCircle,
  QrCode,
  Shield,
  FileText,
  AlertCircle,
  Truck,
  ChevronRight,
  ChevronLeft,
  List
} from 'lucide-react';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import loading stage images
import loadPlanningEmpty from 'figma:asset/f98e32d18b485e1c18c610b1cbcf45a867492685.png';
import car6Image from 'figma:asset/f98e32d18b485e1c18c610b1cbcf45a867492685.png';
import car5Image from 'figma:asset/6c96fca5d1ffd3cf8b50521a19a573f1a5af3529.png';
import car4Image from 'figma:asset/5a2b8b32a4ff15f3635968ea5067c28151b1d8a7.png';
import car3Image from 'figma:asset/e5ccbb0599814075fd6ed3efb12b8530f2d8ec70.png';
import car2Image from 'figma:asset/dc0bb9f61906c1a823f03efb7ddc85b4cb2eca8d.png';
import car1Image from 'figma:asset/6c96fca5d1ffd3cf8b50521a19a573f1a5af3529.png';

export function LoadingConfirmation() {
  const [scannedVINs, setScannedVINs] = useState<string[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [showManifest, setShowManifest] = useState(true); // Toggle between manifest and trailer view
  const [loadingChecks, setLoadingChecks] = useState({
    sequence: false,
    safety: false,
    vins: false,
    secured: false,
    insurance: false,
    claims: false,
  });

  const manifestVINs = [
    'VIN123456789',
    'VIN987654321',
    'VIN456789123',
    'VIN789123456',
    'VIN321654987',
    'VIN654987321',
  ];

  const checklistItems = [
    { id: 'sequence', label: 'Proper Loading Sequence Verified', icon: Package },
    { id: 'safety', label: 'Safety Protocols Followed', icon: Shield },
    { id: 'vins', label: 'VINs Match Manifest', icon: QrCode },
    { id: 'secured', label: 'Load Secured Properly', icon: Truck },
    { id: 'insurance', label: 'Insurance Process Initiated', icon: FileText },
    { id: 'claims', label: 'Claims Documentation Ready', icon: AlertCircle },
  ];

  const checkedCount = Object.values(loadingChecks).filter(Boolean).length;
  const progress = (checkedCount / Object.keys(loadingChecks).length) * 100;
  const allChecked = Object.values(loadingChecks).every(Boolean);
  const allVINsScanned = scannedVINs.length === manifestVINs.length;

  const handleScanVIN = (vin: string) => {
    if (!scannedVINs.includes(vin)) {
      setScannedVINs([...scannedVINs, vin]);
      toast.success(`VIN scanned: ${vin} - Position ${scannedVINs.length + 1}`);
    }
  };

  const handleCompleteLoading = () => {
    if (!allChecked || !allVINsScanned) {
      toast.error('Please complete all checks and scan all VINs');
      return;
    }
    setShowVideo(true);
    toast.success('Loading confirmed! Vehicle ready for dispatch');
  };

  // Get the appropriate trailer image based on scanned VINs count
  const getTrailerImage = () => {
    const count = scannedVINs.length;
    switch (count) {
      case 0:
        return loadPlanningEmpty;
      case 1:
        return car6Image;
      case 2:
        return car5Image;
      case 3:
        return car4Image;
      case 4:
        return car3Image;
      case 5:
        return car2Image;
      case 6:
        return car1Image;
      default:
        return car1Image; // Fully loaded
    }
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Loading Confirmation</h1>
        <p className="text-gray-600">Verify proper loading sequence and safety</p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 m-6 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Loading Progress</h3>
          <Badge variant={allChecked && allVINsScanned ? 'default' : 'secondary'} 
                 className={allChecked && allVINsScanned ? 'bg-green-500' : ''}>
            {allChecked && allVINsScanned ? 'Complete' : 'In Progress'}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Checklist</p>
            <p className="text-2xl font-medium">{checkedCount}/{checklistItems.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">VINs Scanned</p>
            <p className="text-2xl font-medium">{scannedVINs.length}/{manifestVINs.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Overall</p>
            <p className="text-2xl font-medium">{Math.round((progress + (scannedVINs.length / manifestVINs.length * 100)) / 2)}%</p>
          </div>
        </div>
        <Progress value={(progress + (scannedVINs.length / manifestVINs.length * 100)) / 2} className="h-2" />
      </Card>

      <div className="px-6 pb-6 bg-gray-50 space-y-6">
        {/* Main Section - VIN Scanning & Trailer Visualization Side by Side */}
        <div className="grid grid-cols-2 gap-6">
          {/* VIN Scanning Interface */}
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-red-600" />
              VIN Scanning Interface
            </h3>

            {/* Scanner Interface */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 mb-4 text-center">
              <div className="bg-white/10 border-2 border-white/30 rounded-lg p-8 mb-3">
                <QrCode className="w-12 h-12 text-white mx-auto mb-3" />
                <p className="text-white mb-1">Point camera at VIN barcode</p>
                <p className="text-white/70 text-sm">or enter manually below</p>
              </div>
              <Input 
                placeholder="Enter VIN manually..."
                className="bg-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value && manifestVINs.includes(input.value)) {
                      handleScanVIN(input.value);
                      input.value = '';
                    } else {
                      toast.error('VIN not found in manifest');
                    }
                  }
                }}
              />
            </div>

            {/* Manifest vs Scanned */}
            <div className="grid grid-cols-2 gap-3">
              {/* Manifest List */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center justify-between">
                  Load Manifest
                  <Badge variant="outline">{manifestVINs.length}</Badge>
                </h4>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {manifestVINs.map((vin) => (
                    <div 
                      key={vin}
                      className={`p-2.5 rounded border-2 transition-all ${
                        scannedVINs.includes(vin)
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer'
                      }`}
                      onClick={() => !scannedVINs.includes(vin) && handleScanVIN(vin)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono">{vin}</span>
                        {scannedVINs.includes(vin) ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-blue-100 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScanVIN(vin);
                            }}
                          >
                            <ChevronRight className="w-4 h-4 text-blue-600" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scanned List */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center justify-between">
                  Scanned VINs
                  <Badge className="bg-green-600">{scannedVINs.length}/{manifestVINs.length}</Badge>
                </h4>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {scannedVINs.map((vin, index) => (
                    <div key={vin} className="p-2.5 rounded bg-green-50 border-2 border-green-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono">{vin}</span>
                        <Badge className="bg-green-600 text-xs">#{index + 1}</Badge>
                      </div>
                    </div>
                  ))}
                  {scannedVINs.length === 0 && (
                    <div className="p-6 text-center text-gray-400 border-2 border-dashed rounded">
                      <p className="text-xs">No VINs scanned yet</p>
                      <p className="text-xs mt-1">Click arrow →</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Live Trailer Visualization */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-600" />
                Live Trailer Visualization
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowManifest(!showManifest)}
                className="flex items-center gap-2"
              >
                {showManifest ? (
                  <>
                    <Truck className="w-4 h-4" />
                    Trailer
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4" />
                    <List className="w-4 h-4" />
                    Manifest
                  </>
                )}
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Loading Progress:</span>
                <Badge className={scannedVINs.length === 6 ? 'bg-green-600' : 'bg-blue-600'}>
                  {scannedVINs.length}/6 Positions
                </Badge>
              </div>
              <Progress value={(scannedVINs.length / 6) * 100} className="h-2" />
              <div className="mt-2 text-xs text-gray-600">
                {scannedVINs.length === 0 && '⬜ Scan first VIN to begin loading'}
                {scannedVINs.length > 0 && scannedVINs.length < 6 && `✓ Position ${scannedVINs.length} loaded - Continue scanning`}
                {scannedVINs.length === 6 && '✓ Trailer fully loaded - All 6 positions filled'}
              </div>
            </div>

            {/* View Toggle Content */}
            {showManifest ? (
              // Manifest View
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 max-h-[450px] overflow-y-auto">
                <div className="flex items-center justify-center mb-3">
                  <List className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="text-center font-medium mb-3">Vehicle Manifest</h4>
                <div className="space-y-2">
                  {manifestVINs.map((vin, index) => (
                    <div 
                      key={vin}
                      className={`p-2.5 rounded-lg border-2 transition-all ${
                        scannedVINs.includes(vin)
                          ? 'bg-green-100 border-green-400'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            scannedVINs.includes(vin) ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-mono text-xs">{vin}</p>
                            <p className="text-xs text-gray-500">Position {index + 1}</p>
                          </div>
                        </div>
                        {scannedVINs.includes(vin) && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Trailer View - Dynamic Image
              <div className="bg-white rounded-lg p-3 border-2 border-gray-300">
                <div className="relative">
                  <ImageWithFallback 
                    src={getTrailerImage()}
                    alt={`Car carrier with ${scannedVINs.length} vehicles loaded`}
                    className="w-full h-auto rounded-lg"
                  />
                  {/* Loading Status Overlay */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2.5 border-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        scannedVINs.length === 0 ? 'bg-gray-400' :
                        scannedVINs.length < 6 ? 'bg-yellow-500 animate-pulse' :
                        'bg-green-500'
                      }`} />
                      <span className="text-xs font-medium">
                        {scannedVINs.length === 0 ? 'Empty' :
                         scannedVINs.length < 6 ? 'Loading...' :
                         'Complete'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div className="flex justify-between gap-2">
                        <span>Loaded:</span>
                        <span className="font-bold">{scannedVINs.length}/6</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Position Markers */}
                  {scannedVINs.length > 0 && (
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2.5 border-2 border-green-200">
                      <p className="text-xs font-medium text-green-800 mb-1">Active Positions:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map((pos) => (
                          <div 
                            key={pos}
                            className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                              pos <= scannedVINs.length
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {pos}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Legend */}
                <div className="mt-3 p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-medium text-blue-900 mb-1.5">6-Position Layout:</p>
                  <div className="grid grid-cols-3 gap-2 text-xs text-blue-800">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded" />
                      <span>Top (Pos 1)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded" />
                      <span>Mid (2-3)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded" />
                      <span>Bot (4-6)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Bottom Section - Checklist & Photo Verification */}
        <div className="grid grid-cols-3 gap-6">
          {/* Loading Checklist */}
          <div className="col-span-2">
            <Card className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-600" />
                Loading Checklist
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {checklistItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        loadingChecks[item.id as keyof typeof loadingChecks]
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id={item.id}
                          checked={loadingChecks[item.id as keyof typeof loadingChecks]}
                          onCheckedChange={(checked) =>
                            setLoadingChecks(prev => ({ ...prev, [item.id]: checked as boolean }))
                          }
                        />
                        <Label htmlFor={item.id} className="cursor-pointer flex items-center gap-2 flex-1 text-sm">
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Photo Verification */}
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-red-600" />
              Photo Verification
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="mb-2 block text-sm">Loading Sequence Photos</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">0 photos uploaded</p>
                <p className="text-xs text-gray-400 mt-1">Min. 3 photos required</p>
              </div>
            </div>
          </Card>
        </div>

        {/* YouTube Video Player */}
        {showVideo && (
          <Card className="p-6">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/_3xukmURcDM?autoplay=1&loop=1&playlist=_3xukmURcDM"
                title="Adobe Express loading car on a truck or trailer 8 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </Card>
        )}

        {/* Complete Button */}
        <Button 
          className={`w-full h-14 text-lg ${
            allChecked && allVINsScanned
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleCompleteLoading}
          disabled={!allChecked || !allVINsScanned}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Complete Loading Confirmation
        </Button>
      </div>
    </div>
  );
}