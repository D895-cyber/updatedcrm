import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  MapPin,
  Monitor,
  IndianRupee
} from "lucide-react";

const purchaseOrders = [
  {
    id: "PO-2024-156",
    customer: "Corporate Plaza Mall",
    site: "Sector 47, Gurgaon",
    projectors: [
      { model: "Epson EB-2250U", location: "Hall A", service: "Lamp Replacement" },
      { model: "Sony VPL-FHZ75", location: "Hall B", service: "Filter Cleaning" },
      { model: "BenQ MW632ST", location: "Meeting Room 1", service: "Preventive Maintenance" }
    ],
    totalAmount: 45000,
    status: "Approved",
    priority: "Medium",
    dateRaised: "2024-01-20",
    expectedService: "2024-01-25",
    description: "Quarterly maintenance for projectors in main halls and meeting rooms",
    contact: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul.sharma@corporateplaza.com"
    }
  },
  {
    id: "PO-2024-155",
    customer: "Metro Convention Center",
    site: "CP, New Delhi",
    projectors: [
      { model: "Panasonic PT-RZ120", location: "Auditorium", service: "Urgent Repair" },
      { model: "Epson EB-L1405U", location: "Conference Room A", service: "Calibration" }
    ],
    totalAmount: 67500,
    status: "Pending",
    priority: "High",
    dateRaised: "2024-01-18",
    expectedService: "2024-01-23",
    description: "Emergency repair for auditorium projector and routine calibration",
    contact: {
      name: "Priya Mehta",
      phone: "+91 98876 54321",
      email: "priya.mehta@metroconvention.in"
    }
  },
  {
    id: "PO-2024-154",
    customer: "Tech Hub Office Complex",
    site: "Electronic City, Bangalore",
    projectors: [
      { model: "BenQ MW632ST", location: "Meeting Room 1", service: "Filter Cleaning" },
      { model: "ViewSonic PA503W", location: "Training Room", service: "Lamp Replacement" }
    ],
    totalAmount: 32000,
    status: "In Progress",
    priority: "Medium",
    dateRaised: "2024-01-15",
    expectedService: "2024-01-22",
    description: "Routine maintenance for meeting room projectors",
    contact: {
      name: "Amit Kumar",
      phone: "+91 97654 32109",
      email: "amit.kumar@techhub.com"
    }
  },
  {
    id: "PO-2024-153",
    customer: "City Mall Multiplex",
    site: "Andheri West, Mumbai",
    projectors: [
      { model: "Sony VPL-FHZ120", location: "Screen 1", service: "Preventive Maintenance" },
      { model: "Sony VPL-FHZ120", location: "Screen 2", service: "Preventive Maintenance" },
      { model: "Barco F90-4K13", location: "Screen 3", service: "Calibration" }
    ],
    totalAmount: 89200,
    status: "Completed",
    priority: "Low",
    dateRaised: "2024-01-10",
    expectedService: "2024-01-18",
    description: "Monthly preventive maintenance for cinema projectors",
    contact: {
      name: "Sanjay Gupta",
      phone: "+91 96543 21098",
      email: "sanjay.gupta@citymall.in"
    }
  },
  {
    id: "PO-2024-152",
    customer: "Business Park Tower",
    site: "Whitefield, Bangalore",
    projectors: [
      { model: "Epson EB-2250U", location: "Conference Hall", service: "Urgent Repair" }
    ],
    totalAmount: 25000,
    status: "Rejected",
    priority: "High",
    dateRaised: "2024-01-12",
    expectedService: "2024-01-15",
    description: "Emergency repair request - projector not turning on",
    contact: {
      name: "Neha Singh",
      phone: "+91 95432 10987",
      email: "neha.singh@businesspark.com"
    }
  }
];

export function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedPO, setSelectedPO] = useState<any>(null);

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || po.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-600";
      case "Pending":
        return "bg-orange-600";
      case "In Progress":
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "In Progress":
        return <AlertCircle className="w-4 h-4" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">Purchase Orders</h1>
            <p className="text-sm text-dark-secondary mt-1">Manage service requests and purchase orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="dark-button-secondary gap-2 flex items-center">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="dark-button-primary gap-2 flex items-center">
              <Plus className="w-4 h-4" />
              Create PO
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
            <Input
              placeholder="Search PO ID or customer..."
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="dark-card text-center">
            <h3 className="text-2xl font-bold text-dark-primary mb-1">{purchaseOrders.length}</h3>
            <p className="text-sm text-dark-secondary">Total POs</p>
          </div>
          
          <div className="dark-card text-center">
            <h3 className="text-2xl font-bold text-orange-400 mb-1">
              {purchaseOrders.filter(po => po.status === "Pending").length}
            </h3>
            <p className="text-sm text-dark-secondary">Pending</p>
          </div>
          
          <div className="dark-card text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-1">
              {purchaseOrders.filter(po => po.status === "Approved").length}
            </h3>
            <p className="text-sm text-dark-secondary">Approved</p>
          </div>
          
          <div className="dark-card text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-1">
              {purchaseOrders.filter(po => po.status === "In Progress").length}
            </h3>
            <p className="text-sm text-dark-secondary">In Progress</p>
          </div>
          
          <div className="dark-card text-center">
            <h3 className="text-2xl font-bold text-gray-400 mb-1">
              {purchaseOrders.filter(po => po.status === "Completed").length}
            </h3>
            <p className="text-sm text-dark-secondary">Completed</p>
          </div>
        </div>

        {/* Purchase Orders Table */}
        <div className="dark-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-color">
                  <th className="text-left font-semibold text-dark-primary pb-4">PO Details</th>
                  <th className="text-left font-semibold text-dark-primary pb-4">Customer & Site</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Projectors</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Priority</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Status</th>
                  <th className="text-right font-semibold text-dark-primary pb-4">Amount</th>
                  <th className="text-center font-semibold text-dark-primary pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPOs.map((po, index) => (
                  <tr key={index} className="border-b border-dark-color hover:bg-dark-table-hover transition-colors">
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-semibold text-dark-primary">{po.id}</p>
                        <p className="text-xs text-dark-secondary flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          Raised: {po.dateRaised}
                        </p>
                        <p className="text-xs text-dark-secondary flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Expected: {po.expectedService}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-medium text-dark-primary">{po.customer}</p>
                        <p className="text-xs text-dark-secondary flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {po.site}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-dark-secondary mr-1" />
                        <span className="text-sm font-medium text-dark-primary">
                          {po.projectors.length}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`text-sm font-semibold ${getPriorityColor(po.priority)}`}>
                        {po.priority}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <div className={`dark-tag ${getStatusColor(po.status)} flex items-center gap-1 justify-center`}>
                        {getStatusIcon(po.status)}
                        {po.status}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end">
                        <IndianRupee className="w-4 h-4 text-dark-secondary" />
                        <span className="text-sm font-semibold text-dark-primary">
                          {po.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
                          onClick={() => setSelectedPO(po)}
                        >
                          <Eye className="w-4 h-4 text-dark-secondary" />
                        </button>
                        <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-dark-secondary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PO Detail Modal */}
        {selectedPO && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-dark-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-color">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-primary">Purchase Order Details</h2>
                <button 
                  onClick={() => setSelectedPO(null)}
                  className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-dark-secondary" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-dark-secondary">PO ID</label>
                    <p className="text-dark-primary font-semibold">{selectedPO.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-secondary">Status</label>
                    <div className={`dark-tag ${getStatusColor(selectedPO.status)} inline-flex items-center gap-1 mt-1`}>
                      {getStatusIcon(selectedPO.status)}
                      {selectedPO.status}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-secondary">Priority</label>
                    <p className={`font-semibold ${getPriorityColor(selectedPO.priority)}`}>
                      {selectedPO.priority}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-secondary">Total Amount</label>
                    <p className="text-dark-primary font-semibold">₹{selectedPO.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-primary mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Customer</label>
                      <p className="text-dark-primary">{selectedPO.customer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Site Location</label>
                      <p className="text-dark-primary">{selectedPO.site}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Contact Person</label>
                      <p className="text-dark-primary">{selectedPO.contact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-secondary">Phone</label>
                      <p className="text-dark-primary">{selectedPO.contact.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Projectors */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-primary mb-3">Projectors & Services</h3>
                  <div className="space-y-3">
                    {selectedPO.projectors.map((projector: any, idx: number) => (
                      <div key={idx} className="bg-dark-bg rounded-lg p-4 border border-dark-color">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-dark-secondary">Model</label>
                            <p className="text-dark-primary">{projector.model}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-dark-secondary">Location</label>
                            <p className="text-dark-primary">{projector.location}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-dark-secondary">Service</label>
                            <p className="text-dark-primary">{projector.service}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-dark-secondary">Description</label>
                  <p className="text-dark-primary mt-1">{selectedPO.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {selectedPO.status === "Pending" && (
                    <>
                      <button className="flex-1 dark-button-primary">Approve PO</button>
                      <button className="flex-1 dark-button-secondary">Request Changes</button>
                    </>
                  )}
                  {selectedPO.status === "Approved" && (
                    <button className="flex-1 dark-button-primary">Schedule Service</button>
                  )}
                  <button className="dark-button-secondary px-6">Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}