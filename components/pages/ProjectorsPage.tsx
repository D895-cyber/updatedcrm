import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Monitor, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  User,
  Wrench,
  Package,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  History,
  Tag,
  Zap,
  Tool,
  Eye,
  Download,
  Loader2,
  RefreshCw
} from "lucide-react";
import { apiClient } from "../../utils/supabase/client";

export function ProjectorsPage() {
  const [searchSerial, setSearchSerial] = useState("");
  const [selectedProjector, setSelectedProjector] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showAllProjectors, setShowAllProjectors] = useState(true);
  const [allProjectors, setAllProjectors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize database on component mount
  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initialize schema first
      await apiClient.initializeSchema();
      console.log('Database schema initialized');
      
      // Load all projectors
      await loadAllProjectors();
      
      setIsInitialized(true);
    } catch (err) {
      console.error('Error initializing database:', err);
      setError('Failed to initialize database. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllProjectors = async () => {
    try {
      const projectors = await apiClient.getAllProjectors();
      setAllProjectors(projectors);
      console.log('Loaded projectors:', projectors.length);
    } catch (err) {
      console.error('Error loading projectors:', err);
      setError('Failed to load projectors data.');
    }
  };

  const handleSearch = async () => {
    if (!searchSerial.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const projectorData = await apiClient.getProjector(searchSerial);
      
      if (projectorData && !projectorData.error) {
        setSearchResult(projectorData);
        setSelectedProjector(projectorData);
        setShowAllProjectors(false);
        console.log('Found projector:', projectorData);
      } else {
        setSearchResult(null);
        setSelectedProjector(null);
        setError(`No projector found with serial number: ${searchSerial}`);
      }
    } catch (err) {
      console.error('Error searching for projector:', err);
      setSearchResult(null);
      setSelectedProjector(null);
      setError(`No projector found with serial number: ${searchSerial}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600";
      case "Under Service":
        return "bg-orange-600";
      case "Inactive":
        return "bg-gray-600";
      case "Needs Repair":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "text-green-400";
      case "Good":
        return "text-blue-400";
      case "Fair":
        return "text-orange-400";
      case "Needs Repair":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600";
      case "In Progress":
        return "bg-blue-600";
      case "Scheduled":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  if (!isInitialized && isLoading) {
    return (
      <>
        <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-dark-primary">Projector Management</h1>
              <p className="text-sm text-dark-secondary mt-1">Initializing database...</p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 bg-dark-bg">
          <div className="text-center py-12">
            <Loader2 className="w-16 h-16 text-dark-secondary mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-medium text-dark-primary mb-2">Initializing Database</h3>
            <p className="text-dark-secondary">Setting up projector warranty management system...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">Projector Management</h1>
            <p className="text-sm text-dark-secondary mt-1">Search by serial number for complete projector details</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                setShowAllProjectors(true);
                setSearchResult(null);
                setSelectedProjector(null);
                setSearchSerial("");
                setError(null);
                loadAllProjectors();
              }}
              className="dark-button-secondary gap-2 flex items-center"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
            <button 
              onClick={() => {
                setShowAllProjectors(true);
                setSearchResult(null);
                setSelectedProjector(null);
                setSearchSerial("");
                setError(null);
              }}
              className="dark-button-secondary"
            >
              View All Projectors
            </button>
            <button className="dark-button-primary gap-2 flex items-center">
              <Plus className="w-4 h-4" />
              Add Projector
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-600">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Serial Number Search */}
        <div className="dark-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-dark-primary mb-2">Projector Serial Number Lookup</h2>
              <p className="text-dark-secondary">Enter a projector serial number to view complete details, service history, and RMA information</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-dark-secondary">Real-time data</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-5 h-5" />
              <Input
                placeholder="Enter projector serial number..."
                value={searchSerial}
                onChange={(e) => setSearchSerial(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 h-12 bg-dark-card border-dark-color text-dark-primary text-base"
                disabled={isLoading}
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={isLoading || !searchSerial.trim()}
              className="dark-button-primary h-12 px-6 gap-2 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search
            </button>
          </div>
        </div>

        {/* Projector Details */}
        {selectedProjector && (
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 dark-card">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-dark-primary mb-2">{selectedProjector.model}</h2>
                    <p className="text-dark-secondary">Serial: {selectedProjector.serial_number}</p>
                  </div>
                  <div className={`dark-tag ${getStatusColor(selectedProjector.status)}`}>
                    {selectedProjector.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Brand</label>
                      <p className="text-dark-primary font-semibold">{selectedProjector.brand}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Site Location</label>
                      <p className="text-dark-primary flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-dark-secondary" />
                        {selectedProjector.site}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Specific Location</label>
                      <p className="text-dark-primary">{selectedProjector.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Customer</label>
                      <p className="text-dark-primary">{selectedProjector.customer}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Install Date</label>
                      <p className="text-dark-primary flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-dark-secondary" />
                        {selectedProjector.install_date}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Warranty End</label>
                      <p className="text-dark-primary">{selectedProjector.warranty_end}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Condition</label>
                      <p className={`font-semibold ${getConditionColor(selectedProjector.condition)}`}>
                        {selectedProjector.condition}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Primary Technician</label>
                      <p className="text-dark-primary flex items-center gap-2">
                        <User className="w-4 h-4 text-dark-secondary" />
                        {selectedProjector.technician}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="dark-card">
                <h3 className="text-lg font-bold text-dark-primary mb-4">Usage Statistics</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-dark-bg rounded-lg">
                    <div className="text-2xl font-bold text-dark-primary mb-1">
                      {selectedProjector.hours_used?.toLocaleString() || '0'}
                    </div>
                    <div className="text-sm text-dark-secondary">Hours Used</div>
                  </div>
                  <div className="text-center p-4 bg-dark-bg rounded-lg">
                    <div className="text-2xl font-bold text-dark-primary mb-1">
                      {selectedProjector.total_services || 0}
                    </div>
                    <div className="text-sm text-dark-secondary">Total Services</div>
                  </div>
                  <div className="text-center p-4 bg-dark-bg rounded-lg">
                    <div className="text-2xl font-bold text-dark-primary mb-1">
                      {selectedProjector.hours_used && selectedProjector.expected_life ? 
                        Math.round((selectedProjector.hours_used / selectedProjector.expected_life) * 100) : 0}%
                    </div>
                    <div className="text-sm text-dark-secondary">Life Used</div>
                  </div>
                  <div className="text-center p-4 bg-dark-bg rounded-lg">
                    <div className="text-sm text-dark-secondary mb-1">Next Service</div>
                    <div className="font-semibold text-dark-primary">
                      {selectedProjector.next_service || 'Not scheduled'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service History */}
            <div className="dark-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-dark-primary flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Service History ({selectedProjector.serviceHistory?.length || 0} services)
                </h3>
                <button className="dark-button-secondary text-sm px-4 py-2">
                  View All Services
                </button>
              </div>
              
              {selectedProjector.serviceHistory && selectedProjector.serviceHistory.length > 0 ? (
                <div className="space-y-4">
                  {selectedProjector.serviceHistory.map((service: any, index: number) => (
                    <div key={service.id} className="p-4 bg-dark-bg rounded-lg border border-dark-color">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-dark-primary">{service.type}</h4>
                            <div className={`dark-tag ${getServiceStatusColor(service.status)}`}>
                              {service.status}
                            </div>
                            {index === 0 && <div className="dark-tag bg-blue-600">Latest</div>}
                            {index === 1 && <div className="dark-tag bg-purple-600">2nd Service</div>}
                            {index === 2 && <div className="dark-tag bg-orange-600">1st Service</div>}
                          </div>
                          <p className="text-sm text-dark-secondary">{service.notes}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-dark-primary">{service.date}</p>
                          <p className="text-xs text-dark-secondary">{service.technician}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-dark-secondary">Service ID:</span>
                          <p className="text-dark-primary font-medium">{service.id}</p>
                        </div>
                        <div>
                          <span className="text-dark-secondary">Duration:</span>
                          <p className="text-dark-primary font-medium">{service.hours}h</p>
                        </div>
                        <div>
                          <span className="text-dark-secondary">Cost:</span>
                          <p className="text-dark-primary font-medium">₹{service.cost?.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-dark-secondary">Parts Used:</span>
                          <p className="text-dark-primary font-medium">
                            {service.spare_parts && service.spare_parts.length > 0 ? service.spare_parts.join(", ") : "None"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                  <p className="text-dark-secondary">No service history found</p>
                </div>
              )}
            </div>

            {/* RMA History and Spare Parts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* RMA History */}
              <div className="dark-card">
                <h3 className="text-xl font-bold text-dark-primary flex items-center gap-2 mb-6">
                  <RotateCcw className="w-5 h-5" />
                  RMA History ({selectedProjector.rmaHistory?.length || 0})
                </h3>
                
                {selectedProjector.rmaHistory && selectedProjector.rmaHistory.length > 0 ? (
                  <div className="space-y-4">
                    {selectedProjector.rmaHistory.map((rma: any, index: number) => (
                      <div key={rma.id} className="p-4 bg-dark-bg rounded-lg border border-dark-color">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-dark-primary">{rma.part_name}</h4>
                            <p className="text-sm text-dark-secondary">{rma.part_number}</p>
                          </div>
                          <div className="text-right">
                            <div className={`dark-tag ${rma.status === "Under Review" ? "bg-yellow-600" : "bg-green-600"}`}>
                              {rma.status}
                            </div>
                            <p className="text-xs text-dark-secondary mt-1">{rma.issue_date}</p>
                          </div>
                        </div>
                        <p className="text-sm text-dark-secondary mb-2">{rma.reason}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-dark-secondary">RMA #: {rma.rma_number}</span>
                          <span className="text-sm font-medium text-dark-primary">₹{rma.estimated_cost?.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <RotateCcw className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                    <p className="text-dark-secondary">No RMA history found</p>
                  </div>
                )}
              </div>

              {/* Associated Spare Parts */}
              <div className="dark-card">
                <h3 className="text-xl font-bold text-dark-primary flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5" />
                  Associated Spare Parts ({selectedProjector.spareParts?.length || 0})
                </h3>
                
                {selectedProjector.spareParts && selectedProjector.spareParts.length > 0 ? (
                  <div className="space-y-4">
                    {selectedProjector.spareParts.map((part: any, index: number) => (
                      <div key={part.id} className="p-4 bg-dark-bg rounded-lg border border-dark-color">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-dark-primary">{part.part_name}</h4>
                            <p className="text-sm text-dark-secondary">{part.part_number}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-dark-primary">₹{part.unit_price?.toLocaleString()}</span>
                            <p className="text-xs text-dark-secondary">Stock: {part.stock_quantity}</p>
                          </div>
                        </div>
                        <div className="text-sm text-dark-secondary">
                          Last Used: {part.last_updated || 'Never'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                    <p className="text-dark-secondary">No spare parts found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="dark-button-primary gap-2 flex items-center">
                <Calendar className="w-4 h-4" />
                Schedule Service
              </button>
              <button className="dark-button-secondary gap-2 flex items-center">
                <Wrench className="w-4 h-4" />
                Update Status
              </button>
              <button className="dark-button-secondary gap-2 flex items-center">
                <Package className="w-4 h-4" />
                Order Parts
              </button>
              <button className="dark-button-secondary gap-2 flex items-center">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        )}

        {/* All Projectors Grid */}
        {showAllProjectors && !selectedProjector && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-primary">All Projectors</h2>
              <p className="text-dark-secondary">{allProjectors.length} projectors in system</p>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-dark-secondary mx-auto mb-4 animate-spin" />
                <p className="text-dark-secondary">Loading projectors...</p>
              </div>
            ) : allProjectors.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {allProjectors.map((projector, index) => (
                  <div key={projector.serial_number} className="dark-card hover:dark-shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-dark-primary mb-1">{projector.model}</h3>
                        <p className="text-sm text-dark-secondary">{projector.serial_number}</p>
                      </div>
                      <div className={`dark-tag ${getStatusColor(projector.status)}`}>
                        {projector.status}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">{projector.site}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Monitor className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">{projector.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">Last Service: {projector.last_service}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                      <div>
                        <div className="text-lg font-bold text-dark-primary">{projector.total_services || 0}</div>
                        <div className="text-xs text-dark-secondary">Services</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-dark-primary">{projector.hours_used || 0}</div>
                        <div className="text-xs text-dark-secondary">Hours</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-dark-primary">0</div>
                        <div className="text-xs text-dark-secondary">RMAs</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedProjector(projector);
                        setShowAllProjectors(false);
                        setSearchSerial(projector.serial_number);
                        setError(null);
                        // Load full details for the selected projector
                        apiClient.getProjector(projector.serial_number)
                          .then(fullData => {
                            if (fullData && !fullData.error) {
                              setSelectedProjector(fullData);
                            }
                          })
                          .catch(err => console.error('Error loading projector details:', err));
                      }}
                      className="w-full dark-button-primary text-sm py-2"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Monitor className="w-16 h-16 text-dark-secondary mx-auto mb-4" />
                <h3 className="text-xl font-medium text-dark-primary mb-2">No Projectors Found</h3>
                <p className="text-dark-secondary">No projectors have been added to the system yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}