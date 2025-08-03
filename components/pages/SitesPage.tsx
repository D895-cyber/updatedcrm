import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  MapPin, 
  Monitor, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const sites = [
  {
    id: "SITE-001",
    name: "Corporate Plaza Mall",
    location: "Sector 47, Gurgaon",
    contact: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul.sharma@corporateplaza.com"
    },
    projectors: {
      total: 8,
      active: 7,
      maintenance: 1,
      issues: 0
    },
    lastService: "2024-01-15",
    contractEnd: "2024-12-31",
    status: "Active"
  },
  {
    id: "SITE-002",
    name: "Metro Convention Center",
    location: "CP, New Delhi",
    contact: {
      name: "Priya Mehta",
      phone: "+91 98876 54321",
      email: "priya.mehta@metroconvention.in"
    },
    projectors: {
      total: 12,
      active: 10,
      maintenance: 1,
      issues: 1
    },
    lastService: "2024-01-10",
    contractEnd: "2025-06-30",
    status: "Active"
  },
  {
    id: "SITE-003",
    name: "Tech Hub Office Complex",
    location: "Electronic City, Bangalore",
    contact: {
      name: "Amit Kumar",
      phone: "+91 97654 32109",
      email: "amit.kumar@techhub.com"
    },
    projectors: {
      total: 6,
      active: 6,
      maintenance: 0,
      issues: 0
    },
    lastService: "2024-01-20",
    contractEnd: "2024-08-15",
    status: "Expiring Soon"
  },
  {
    id: "SITE-004",
    name: "City Mall Multiplex",
    location: "Andheri West, Mumbai",
    contact: {
      name: "Sanjay Gupta",
      phone: "+91 96543 21098",
      email: "sanjay.gupta@citymall.in"
    },
    projectors: {
      total: 15,
      active: 13,
      maintenance: 2,
      issues: 0
    },
    lastService: "2024-01-22",
    contractEnd: "2025-03-31",
    status: "Active"
  },
  {
    id: "SITE-005",
    name: "Business Park Tower",
    location: "Whitefield, Bangalore",
    contact: {
      name: "Neha Singh",
      phone: "+91 95432 10987",
      email: "neha.singh@businesspark.com"
    },
    projectors: {
      total: 4,
      active: 3,
      maintenance: 0,
      issues: 1
    },
    lastService: "2024-01-08",
    contractEnd: "2024-04-30",
    status: "Expiring Soon"
  }
];

export function SitesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || site.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600";
      case "Expiring Soon":
        return "bg-orange-600";
      case "Expired":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getProjectorStatusColor = (type: string) => {
    switch (type) {
      case "active":
        return "text-green-400";
      case "maintenance":
        return "text-orange-400";
      case "issues":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">Sites</h1>
            <p className="text-sm text-dark-secondary mt-1">Manage installation sites and their projectors</p>
          </div>
          <button className="dark-button-primary gap-2 flex items-center">
            <Plus className="w-4 h-4" />
            Add New Site
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
            <Input
              placeholder="Search sites or locations..."
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
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">{sites.length}</h3>
            <p className="text-sm text-dark-secondary">Total Sites</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {sites.filter(s => s.status === "Active").length}
            </h3>
            <p className="text-sm text-dark-secondary">Active</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {sites.filter(s => s.status === "Expiring Soon").length}
            </h3>
            <p className="text-sm text-dark-secondary">Expiring Soon</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {sites.reduce((total, site) => total + site.projectors.total, 0)}
            </h3>
            <p className="text-sm text-dark-secondary">Total Projectors</p>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div key={site.id} className="dark-card hover:dark-shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-dark-primary mb-1">{site.name}</h3>
                  <p className="text-sm text-dark-secondary flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {site.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`dark-tag ${getStatusColor(site.status)}`}>
                    {site.status}
                  </div>
                  <button className="p-1 hover:bg-dark-hover rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-dark-secondary" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-dark-secondary" />
                  <span className="text-dark-primary">{site.contact.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-dark-secondary" />
                  <span className="text-dark-secondary">{site.contact.phone}</span>
                </div>
              </div>

              {/* Projector Status */}
              <div className="bg-dark-bg rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-dark-primary mb-3">Projector Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-dark-primary">{site.projectors.total}</div>
                    <div className="text-xs text-dark-secondary">Total</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getProjectorStatusColor("active")}`}>
                      {site.projectors.active}
                    </div>
                    <div className="text-xs text-dark-secondary">Active</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getProjectorStatusColor("maintenance")}`}>
                      {site.projectors.maintenance}
                    </div>
                    <div className="text-xs text-dark-secondary">Maintenance</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getProjectorStatusColor("issues")}`}>
                      {site.projectors.issues}
                    </div>
                    <div className="text-xs text-dark-secondary">Issues</div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-secondary">Last Service:</span>
                  <span className="text-dark-primary">{site.lastService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-secondary">Contract Ends:</span>
                  <span className="text-dark-primary">{site.contractEnd}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-6">
                <button className="flex-1 dark-button-secondary text-sm py-2">
                  View Details
                </button>
                <button className="flex-1 dark-button-primary text-sm py-2">
                  Schedule Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}