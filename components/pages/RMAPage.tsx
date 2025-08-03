import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  RotateCcw, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  FileText,
  Calendar,
  User,
  Package,
  Truck,
  ClipboardCheck
} from "lucide-react";

const rmaItems = [
  {
    id: "RMA-001",
    rmaNumber: "RMA-2024-001",
    partNumber: "PT-RZ120-MB",
    partName: "Main Board for Panasonic PT-RZ120",
    brand: "Panasonic",
    projectorModel: "PT-RZ120",
    serialNumber: "PTR120MB2401",
    customerSite: "Metro Convention Center",
    issueDescription: "Logic board failure - HDMI port not responding",
    rmaReason: "Hardware malfunction",
    status: "Under Review",
    priority: "High",
    rmaDate: "2024-01-15",
    expectedResolution: "2024-01-30",
    assignedTo: "Technical Team A",
    estimatedCost: 45000,
    warrantyStatus: "In Warranty",
    serviceReport: "SRV-003",
    technician: "Priya Sharma",
    physicalCondition: "Good",
    logicalCondition: "Faulty",
    approvalStatus: "Pending Review",
    notes: "Customer reported intermittent display issues. Part physically intact but HDMI logic circuit failure confirmed."
  },
  {
    id: "RMA-002",
    rmaNumber: "RMA-2024-002",
    partNumber: "VPL-FHZ120-LD",
    partName: "Laser Diode Assembly for Sony VPL-FHZ120",
    brand: "Sony",
    projectorModel: "VPL-FHZ120",
    serialNumber: "VPL120LD2402",
    customerSite: "City Mall Multiplex",
    issueDescription: "Reduced laser output - 60% of rated power",
    rmaReason: "Performance degradation",
    status: "Replacement Approved",
    priority: "Medium",
    rmaDate: "2024-01-10",
    expectedResolution: "2024-01-25",
    assignedTo: "Technical Team B",
    estimatedCost: 125000,
    warrantyStatus: "Extended Warranty",
    serviceReport: "SRV-005",
    technician: "Vikram Singh",
    physicalCondition: "Good",
    logicalCondition: "Degraded",
    approvalStatus: "Approved",
    notes: "Laser output measured at 60% of specification. No physical damage observed. Replacement authorized under extended warranty."
  },
  {
    id: "RMA-003",
    rmaNumber: "RMA-2024-003",
    partNumber: "EB-2250U-LB",
    partName: "Lens Block Assembly for Epson EB-2250U",
    brand: "Epson",
    projectorModel: "EB-2250U",
    serialNumber: "EP2250LB2403",
    customerSite: "Corporate Plaza Mall",
    issueDescription: "Focus motor not responding, manual focus only",
    rmaReason: "Motor mechanism failure",
    status: "Repair In Progress",
    priority: "Medium",
    rmaDate: "2024-01-08",
    expectedResolution: "2024-01-22",
    assignedTo: "Technical Team C",
    estimatedCost: 28000,
    warrantyStatus: "Out of Warranty",
    serviceReport: "SRV-007",
    technician: "Rajesh Kumar",
    physicalCondition: "Good",
    logicalCondition: "Partial Failure",
    approvalStatus: "Customer Approved",
    notes: "Focus motor stepper circuit failure. Lens optics in good condition. Customer approved repair cost."
  },
  {
    id: "RMA-004",
    rmaNumber: "RMA-2024-004",
    partNumber: "MW632ST-DMD",
    partName: "DMD Chip for BenQ MW632ST",
    brand: "BenQ",
    projectorModel: "MW632ST",
    serialNumber: "BQ632DMD2404",
    customerSite: "Tech Hub Office Complex",
    issueDescription: "Pixel anomalies - dead pixels visible on projection",
    rmaReason: "DMD mirror defect",
    status: "Rejected",
    priority: "Low",
    rmaDate: "2024-01-12",
    expectedResolution: "N/A",
    assignedTo: "Technical Team A",
    estimatedCost: 0,
    warrantyStatus: "Expired",
    serviceReport: "SRV-008",
    technician: "Neha Patel",
    physicalCondition: "Good",
    logicalCondition: "Faulty",
    approvalStatus: "Rejected",
    notes: "DMD chip shows multiple dead pixels. Unit is out of warranty and repair cost exceeds 70% of replacement value. Customer advised to replace projector."
  },
  {
    id: "RMA-005",
    rmaNumber: "RMA-2024-005",
    partNumber: "PT-DZ870-CF",
    partName: "Color Filter Wheel for Panasonic PT-DZ870",
    brand: "Panasonic",
    projectorModel: "PT-DZ870",
    serialNumber: "PTD870CF2405",
    customerSite: "Business Park Tower",
    issueDescription: "Color wheel noise and irregular rotation",
    rmaReason: "Bearing wear",
    status: "Completed",
    priority: "High",
    rmaDate: "2024-01-05",
    expectedResolution: "2024-01-20",
    assignedTo: "Technical Team B",
    estimatedCost: 35000,
    warrantyStatus: "In Warranty",
    serviceReport: "SRV-009",
    technician: "Sanjay Gupta",
    physicalCondition: "Worn",
    logicalCondition: "Good",
    approvalStatus: "Completed",
    notes: "Color wheel bearing replacement completed. Unit tested and performance restored to specifications. Delivered back to customer."
  }
];

export function RMAPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [selectedRMA, setSelectedRMA] = useState<any>(null);

  const filteredRMAs = rmaItems.filter(rma => {
    const matchesSearch = rma.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rma.rmaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rma.customerSite.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || rma.status === filterStatus;
    const matchesPriority = filterPriority === "All" || rma.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-600";
      case "Replacement Approved":
        return "bg-green-600";
      case "Repair In Progress":
        return "bg-blue-600";
      case "Completed":
        return "bg-gray-600";
      case "Rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-orange-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const getWarrantyColor = (warranty: string) => {
    switch (warranty) {
      case "In Warranty":
        return "text-green-400";
      case "Extended Warranty":
        return "text-blue-400";
      case "Out of Warranty":
        return "text-orange-400";
      case "Expired":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <Clock className="w-4 h-4" />;
      case "Replacement Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Repair In Progress":
        return <AlertTriangle className="w-4 h-4" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <RotateCcw className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">RMA Management</h1>
            <p className="text-sm text-dark-secondary mt-1">Manage Return Merchandise Authorization requests</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="dark-button-secondary gap-2 flex items-center">
              <Download className="w-4 h-4" />
              Export RMA Report
            </button>
            <button className="dark-button-primary gap-2 flex items-center">
              <Plus className="w-4 h-4" />
              Create RMA
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
            <Input
              placeholder="Search RMA number, part, or site..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-card border-dark-color text-dark-primary"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-dark-color rounded-xl text-dark-primary focus:outline-none focus:ring-2 focus:ring-dark-cta"
          >
            <option value="All">All Status</option>
            <option value="Under Review">Under Review</option>
            <option value="Replacement Approved">Replacement Approved</option>
            <option value="Repair In Progress">Repair In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-dark-color rounded-xl text-dark-primary focus:outline-none focus:ring-2 focus:ring-dark-cta"
          >
            <option value="All">All Priority</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">{rmaItems.length}</h3>
            <p className="text-sm text-dark-secondary">Total RMAs</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-yellow-600 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {rmaItems.filter(r => r.status === "Under Review").length}
            </h3>
            <p className="text-sm text-dark-secondary">Under Review</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {rmaItems.filter(r => r.status === "Repair In Progress").length}
            </h3>
            <p className="text-sm text-dark-secondary">In Progress</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {rmaItems.filter(r => r.status === "Completed").length}
            </h3>
            <p className="text-sm text-dark-secondary">Completed</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {rmaItems.filter(r => r.status === "Rejected").length}
            </h3>
            <p className="text-sm text-dark-secondary">Rejected</p>
          </div>
        </div>

        {/* RMA Table */}
        <div className="dark-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-color">
                  <th className="text-left font-semibold text-dark-primary pb-4">RMA Details</th>
                  <th className="text-left font-semibold text-dark-primary pb-4">Part & Site</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Issue</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Priority</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Status</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Warranty</th>
                  <th className="text-right font-semibold text-dark-primary pb-4">Cost</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRMAs.map((rma, index) => (
                  <tr key={index} className="border-b border-dark-color hover:bg-dark-table-hover transition-colors">
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-semibold text-dark-primary">{rma.rmaNumber}</p>
                        <p className="text-xs text-dark-secondary flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          RMA Date: {rma.rmaDate}
                        </p>
                        <p className="text-xs text-dark-secondary flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Expected: {rma.expectedResolution}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-medium text-dark-primary">{rma.partName}</p>
                        <p className="text-xs text-dark-secondary">{rma.partNumber}</p>
                        <p className="text-xs text-dark-secondary mt-1">{rma.customerSite}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="max-w-xs">
                        <p className="text-xs text-dark-primary truncate">{rma.issueDescription}</p>
                        <p className="text-xs text-dark-secondary">{rma.rmaReason}</p>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`text-sm font-semibold ${getPriorityColor(rma.priority)}`}>
                        {rma.priority}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <div className={`dark-tag ${getStatusColor(rma.status)} flex items-center gap-1 justify-center`}>
                        {getStatusIcon(rma.status)}
                        {rma.status}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`text-xs font-medium ${getWarrantyColor(rma.warrantyStatus)}`}>
                        {rma.warrantyStatus}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-sm font-semibold text-dark-primary">
                        ₹{rma.estimatedCost.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
                          onClick={() => setSelectedRMA(rma)}
                        >
                          <Eye className="w-4 h-4 text-dark-secondary" />
                        </button>
                        <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-dark-secondary" />
                        </button>
                        <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                          <FileText className="w-4 h-4 text-dark-secondary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RMA Detail Modal */}
        {selectedRMA && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-dark-card rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-dark-color">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-primary">RMA Details - {selectedRMA.rmaNumber}</h2>
                <button 
                  onClick={() => setSelectedRMA(null)}
                  className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-dark-secondary" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-primary mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">RMA Number</label>
                      <p className="text-dark-primary font-semibold">{selectedRMA.rmaNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Part Name</label>
                      <p className="text-dark-primary">{selectedRMA.partName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Part Number</label>
                      <p className="text-dark-primary">{selectedRMA.partNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Serial Number</label>
                      <p className="text-dark-primary">{selectedRMA.serialNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Brand & Model</label>
                      <p className="text-dark-primary">{selectedRMA.brand} {selectedRMA.projectorModel}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Customer Site</label>
                      <p className="text-dark-primary">{selectedRMA.customerSite}</p>
                    </div>
                  </div>
                </div>

                {/* Issue & Status */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-primary mb-4">Issue & Status</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Issue Description</label>
                      <p className="text-dark-primary text-sm">{selectedRMA.issueDescription}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">RMA Reason</label>
                      <p className="text-dark-primary">{selectedRMA.rmaReason}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Current Status</label>
                      <div className={`dark-tag ${getStatusColor(selectedRMA.status)} inline-flex items-center gap-1 mt-1`}>
                        {getStatusIcon(selectedRMA.status)}
                        {selectedRMA.status}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Priority</label>
                      <span className={`font-semibold ${getPriorityColor(selectedRMA.priority)}`}>
                        {selectedRMA.priority}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Approval Status</label>
                      <p className="text-dark-primary">{selectedRMA.approvalStatus}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Assigned To</label>
                      <p className="text-dark-primary">{selectedRMA.assignedTo}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-primary mb-4">Additional Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">RMA Date</label>
                      <p className="text-dark-primary">{selectedRMA.rmaDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Expected Resolution</label>
                      <p className="text-dark-primary">{selectedRMA.expectedResolution}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Estimated Cost</label>
                      <p className="text-dark-primary font-semibold">₹{selectedRMA.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Warranty Status</label>
                      <span className={`font-semibold ${getWarrantyColor(selectedRMA.warrantyStatus)}`}>
                        {selectedRMA.warrantyStatus}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Physical Condition</label>
                      <p className="text-dark-primary">{selectedRMA.physicalCondition}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Logical Condition</label>
                      <p className="text-dark-primary">{selectedRMA.logicalCondition}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Service Report</label>
                      <p className="text-dark-primary">{selectedRMA.serviceReport}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Technician</label>
                      <p className="text-dark-primary">{selectedRMA.technician}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="text-sm font-medium text-dark-secondary">Notes</label>
                <p className="text-dark-primary mt-2 p-4 bg-dark-bg rounded-lg border border-dark-color text-sm">
                  {selectedRMA.notes}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 mt-6 border-t border-dark-color">
                {selectedRMA.status === "Under Review" && (
                  <>
                    <button className="flex-1 dark-button-primary">Approve RMA</button>
                    <button className="flex-1 dark-button-secondary">Request More Info</button>
                  </>
                )}
                {selectedRMA.status === "Replacement Approved" && (
                  <button className="flex-1 dark-button-primary">Process Replacement</button>
                )}
                {selectedRMA.status === "Repair In Progress" && (
                  <button className="flex-1 dark-button-primary">Update Progress</button>
                )}
                <button className="dark-button-secondary px-6">Download RMA Report</button>
                <button className="dark-button-secondary px-6">Print Label</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}