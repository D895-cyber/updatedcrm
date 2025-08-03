import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Clock,
  MapPin,
  User,
  Wrench,
  Monitor,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const serviceSchedule = [
  {
    id: "SRV-001",
    poId: "PO-2024-156",
    site: "Corporate Plaza Mall",
    location: "Sector 47, Gurgaon",
    projector: "Epson EB-2250U - Hall A",
    serviceType: "Lamp Replacement",
    technician: "Rajesh Kumar",
    date: "2024-01-25",
    time: "10:00 AM",
    duration: "2 hours",
    status: "Scheduled",
    priority: "Medium",
    notes: "Bring replacement lamp model ELPLP96"
  },
  {
    id: "SRV-002",
    poId: "PO-2024-155",
    site: "Metro Convention Center",
    location: "CP, New Delhi",
    projector: "Panasonic PT-RZ120 - Auditorium",
    serviceType: "Urgent Repair",
    technician: "Amit Singh",
    date: "2024-01-25",
    time: "2:00 PM",
    duration: "3 hours",
    status: "In Progress",
    priority: "High",
    notes: "Emergency repair - projector not turning on"
  },
  {
    id: "SRV-003",
    poId: "PO-2024-154",
    site: "Tech Hub Office Complex",
    location: "Electronic City, Bangalore",
    projector: "BenQ MW632ST - Meeting Room 1",
    serviceType: "Filter Cleaning",
    technician: "Priya Sharma",
    date: "2024-01-26",
    time: "9:00 AM",
    duration: "1 hour",
    status: "Scheduled",
    priority: "Low",
    notes: "Routine maintenance visit"
  },
  {
    id: "SRV-004",
    poId: "PO-2024-156",
    site: "Corporate Plaza Mall",
    location: "Sector 47, Gurgaon",
    projector: "Sony VPL-FHZ75 - Hall B",
    serviceType: "Filter Cleaning",
    technician: "Rajesh Kumar",
    date: "2024-01-26",
    time: "11:00 AM",
    duration: "1 hour",
    status: "Scheduled",
    priority: "Medium",
    notes: "Follow-up service after lamp replacement"
  },
  {
    id: "SRV-005",
    poId: "PO-2024-157",
    site: "Business Park Tower",
    location: "Whitefield, Bangalore",
    projector: "Epson EB-2250U - Conference Hall",
    serviceType: "Preventive Maintenance",
    technician: "Neha Patel",
    date: "2024-01-27",
    time: "10:30 AM",
    duration: "2 hours",
    status: "Scheduled",
    priority: "Medium",
    notes: "Quarterly maintenance schedule"
  }
];

const technicians = [
  { id: "TECH-001", name: "Rajesh Kumar", specialization: "Epson, Sony", location: "Delhi NCR", availability: "Available" },
  { id: "TECH-002", name: "Amit Singh", specialization: "Panasonic, BenQ", location: "Delhi NCR", availability: "Busy" },
  { id: "TECH-003", name: "Priya Sharma", specialization: "BenQ, ViewSonic", location: "Bangalore", availability: "Available" },
  { id: "TECH-004", name: "Neha Patel", specialization: "Epson, Barco", location: "Bangalore", availability: "Available" },
  { id: "TECH-005", name: "Vikram Singh", specialization: "Sony, Panasonic", location: "Mumbai", availability: "Available" }
];

export function ServicePlanningPage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-25");
  const [viewMode, setViewMode] = useState("calendar");
  const [filterTechnician, setFilterTechnician] = useState("All");

  const getTodaysServices = () => {
    return serviceSchedule.filter(service => service.date === selectedDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-600";
      case "In Progress":
        return "bg-orange-600";
      case "Completed":
        return "bg-green-600";
      case "Cancelled":
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "text-green-400";
      case "Busy":
        return "text-red-400";
      case "On Leave":
        return "text-gray-400";
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
            <h1 className="text-2xl font-semibold text-dark-primary">Service Planning</h1>
            <p className="text-sm text-dark-secondary mt-1">Schedule and manage service visits</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "calendar" ? "bg-dark-cta text-white" : "bg-dark-card text-dark-secondary"
                }`}
              >
                Calendar
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-dark-cta text-white" : "bg-dark-card text-dark-secondary"
                }`}
              >
                List
              </button>
            </div>
            <button className="dark-button-primary gap-2 flex items-center">
              <Plus className="w-4 h-4" />
              Schedule Service
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-dark-bg">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {serviceSchedule.filter(s => s.status === "Scheduled").length}
            </h3>
            <p className="text-sm text-dark-secondary">Scheduled</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {serviceSchedule.filter(s => s.status === "In Progress").length}
            </h3>
            <p className="text-sm text-dark-secondary">In Progress</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {serviceSchedule.filter(s => s.status === "Completed").length}
            </h3>
            <p className="text-sm text-dark-secondary">Completed</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {technicians.filter(t => t.availability === "Available").length}
            </h3>
            <p className="text-sm text-dark-secondary">Available Techs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selector */}
            <div className="dark-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-dark-primary">Today's Schedule</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                    <ChevronLeft className="w-4 h-4 text-dark-secondary" />
                  </button>
                  <span className="text-sm font-medium text-dark-primary px-4">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4 text-dark-secondary" />
                  </button>
                </div>
              </div>

              {/* Today's Services */}
              <div className="space-y-4">
                {getTodaysServices().map((service, index) => (
                  <div key={index} className="bg-dark-bg rounded-xl p-4 border border-dark-color hover:bg-dark-hover transition-colors">
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
                        <div className={`dark-tag ${getStatusColor(service.status)}`}>
                          {service.status}
                        </div>
                        <p className={`text-xs font-medium mt-1 ${getPriorityColor(service.priority)}`}>
                          {service.priority} Priority
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">{service.time} ({service.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">{service.technician}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wrench className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">{service.serviceType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-dark-secondary" />
                        <span className="text-dark-primary">{service.location}</span>
                      </div>
                    </div>

                    {service.notes && (
                      <div className="mt-3 p-3 bg-dark-card rounded-lg">
                        <p className="text-xs text-dark-secondary">{service.notes}</p>
                      </div>
                    )}

                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 dark-button-secondary text-sm py-2">
                        Edit Schedule
                      </button>
                      <button className="flex-1 dark-button-primary text-sm py-2">
                        Start Service
                      </button>
                    </div>
                  </div>
                ))}

                {getTodaysServices().length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-dark-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-dark-primary mb-2">No Services Scheduled</h3>
                    <p className="text-dark-secondary">No services are scheduled for this date.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Available Technicians */}
            <div className="dark-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-dark-primary">Technicians</h3>
                <button className="dark-button-secondary text-sm px-3 py-1">
                  Manage
                </button>
              </div>
              <div className="space-y-3">
                {technicians.slice(0, 4).map((tech, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-dark-color">
                    <div>
                      <h4 className="text-sm font-medium text-dark-primary">{tech.name}</h4>
                      <p className="text-xs text-dark-secondary">{tech.specialization}</p>
                      <p className="text-xs text-dark-secondary">{tech.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium ${getAvailabilityColor(tech.availability)}`}>
                        {tech.availability}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dark-card">
              <h3 className="text-lg font-bold text-dark-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full dark-button-primary text-sm py-3 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Schedule Emergency Service
                </button>
                <button className="w-full dark-button-secondary text-sm py-3 flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  View Weekly Schedule
                </button>
                <button className="w-full dark-button-secondary text-sm py-3 flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Assign Technician
                </button>
              </div>
            </div>

            {/* Alerts */}
            <div className="dark-card">
              <h3 className="text-lg font-bold text-dark-primary mb-4">Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">Overdue Service</span>
                  </div>
                  <p className="text-xs text-dark-secondary">
                    Metro Convention Center - Service was due 2 days ago
                  </p>
                </div>
                <div className="p-3 bg-orange-900 bg-opacity-30 rounded-lg border border-orange-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-orange-400">Technician Delay</span>
                  </div>
                  <p className="text-xs text-dark-secondary">
                    Amit Singh is running 30 minutes late
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}