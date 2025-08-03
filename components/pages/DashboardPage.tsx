import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { 
  MapPin, 
  Monitor, 
  FileText, 
  Calendar, 
  Download, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const metrics = [
  {
    title: "Active Sites",
    value: "45",
    change: "+3",
    icon: MapPin,
    iconColor: "text-blue-400",
    isPositive: true
  },
  {
    title: "Total Projectors", 
    value: "284",
    change: "+12",
    icon: Monitor,
    iconColor: "text-green-400",
    isPositive: true
  },
  {
    title: "Pending POs",
    value: "18",
    change: "-5",
    icon: FileText,
    iconColor: "text-orange-400",
    isPositive: true
  },
  {
    title: "Services This Week",
    value: "23",
    change: "+8",
    icon: Calendar,
    iconColor: "text-purple-400",
    isPositive: true
  },
];

const serviceData = [
  { month: "Jan", completed: 45, scheduled: 52 },
  { month: "Feb", completed: 52, scheduled: 48 },
  { month: "Mar", completed: 48, scheduled: 61 },
  { month: "Apr", completed: 61, scheduled: 55 },
  { month: "May", completed: 55, scheduled: 67 },
  { month: "Jun", completed: 67, scheduled: 43 },
];

const warrantyData = [
  { name: "Active", value: 198, color: "#22C55E" },
  { name: "Expiring Soon", value: 45, color: "#F59E0B" },
  { name: "Expired", value: 41, color: "#EF4444" },
];

const recentPOs = [
  {
    id: "PO-2024-156",
    site: "Corporate Plaza Mall",
    projectors: 8,
    status: "Approved",
    amount: "₹45,000",
    date: "Jan 24"
  },
  {
    id: "PO-2024-155",
    site: "Metro Convention Center",
    projectors: 12,
    status: "Pending",
    amount: "₹67,500",
    date: "Jan 23"
  },
  {
    id: "PO-2024-154",
    site: "Tech Hub Office Complex",
    projectors: 6,
    status: "In Progress",
    amount: "₹32,000",
    date: "Jan 22"
  },
  {
    id: "PO-2024-153",
    site: "City Mall Multiplex",
    projectors: 15,
    status: "Completed",
    amount: "₹89,200",
    date: "Jan 21"
  },
];

const upcomingServices = [
  {
    site: "Corporate Plaza Mall",
    projector: "Epson EB-2250U - Hall A",
    type: "Preventive Maintenance",
    date: "Jan 25",
    technician: "Rajesh Kumar"
  },
  {
    site: "Metro Convention Center",
    projector: "Sony VPL-FHZ75 - Room 201",
    type: "Lamp Replacement",
    date: "Jan 26",
    technician: "Amit Singh"
  },
  {
    site: "Tech Hub Office Complex",
    projector: "BenQ MW632ST - Meeting Room 1",
    type: "Filter Cleaning",
    date: "Jan 27",
    technician: "Priya Sharma"
  },
];

export function DashboardPage() {
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
      default:
        return "bg-gray-600";
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-primary mb-2">Dashboard</h1>
            <p className="text-dark-secondary font-medium">Monitor your projector warranty services and operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="dark-tag">
              Live Data
            </div>
            <button className="dark-button-primary gap-2 flex items-center">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        {/* Top-level Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            
            return (
              <div key={metric.title} className="dark-card hover:dark-shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-dark-tag flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${metric.iconColor}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`} />
                    <span className={`text-sm font-bold ${metric.isPositive ? 'text-dark-positive' : 'text-dark-negative'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-dark-primary mb-2">{metric.value}</h3>
                  <p className="text-sm font-medium text-dark-secondary">{metric.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Service Trends */}
          <div className="lg:col-span-2 dark-card">
            <div className="pb-6">
              <h3 className="text-xl font-bold text-dark-primary mb-2">Service Trends</h3>
              <p className="text-dark-secondary font-medium">Monthly service completion vs scheduled</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
                      color: "#FFFFFF"
                    }}
                  />
                  <Bar dataKey="completed" fill="#22C55E" radius={[4, 4, 0, 0]} name="Completed" />
                  <Bar dataKey="scheduled" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Scheduled" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Warranty Status */}
          <div className="dark-card">
            <div className="pb-6">
              <h3 className="text-xl font-bold text-dark-primary mb-2">Warranty Status</h3>
              <p className="text-dark-secondary font-medium">Current warranty distribution</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={warrantyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {warrantyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
                      color: "#FFFFFF"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {warrantyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-dark-secondary">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-dark-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Purchase Orders */}
          <div className="dark-card">
            <div className="flex flex-row items-center justify-between pb-6">
              <div>
                <h3 className="text-xl font-bold text-dark-primary mb-2">Recent Purchase Orders</h3>
                <p className="text-dark-secondary font-medium">Latest POs and their status</p>
              </div>
              <button className="dark-button-secondary gap-2 flex items-center text-sm">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-color">
                    <th className="text-left font-semibold text-dark-primary pb-3">PO ID</th>
                    <th className="text-left font-semibold text-dark-primary pb-3">Site</th>
                    <th className="text-center font-semibold text-dark-primary pb-3">Status</th>
                    <th className="text-right font-semibold text-dark-primary pb-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPOs.map((po, index) => (
                    <tr key={index} className="border-b border-dark-color hover:bg-dark-table-hover transition-colors">
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-dark-primary">{po.id}</p>
                          <p className="text-xs text-dark-secondary">{po.date}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-dark-primary">{po.site}</p>
                          <p className="text-xs text-dark-secondary">{po.projectors} projectors</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className={`dark-tag ${getStatusColor(po.status)}`}>
                          {po.status}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="text-sm font-semibold text-dark-primary">{po.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Services */}
          <div className="dark-card">
            <div className="flex flex-row items-center justify-between pb-6">
              <div>
                <h3 className="text-xl font-bold text-dark-primary mb-2">Upcoming Services</h3>
                <p className="text-dark-secondary font-medium">Scheduled maintenance and repairs</p>
              </div>
              <button className="dark-button-secondary gap-2 flex items-center text-sm">
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
            </div>
            <div className="space-y-4">
              {upcomingServices.map((service, index) => (
                <div key={index} className="p-4 rounded-xl border border-dark-color hover:bg-dark-hover transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-dark-cta flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-dark-primary">{service.site}</h4>
                        <p className="text-xs text-dark-secondary">{service.projector}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-dark-primary">{service.date}</p>
                      <p className="text-xs text-dark-secondary">{service.technician}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="dark-tag bg-blue-600">
                      {service.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}