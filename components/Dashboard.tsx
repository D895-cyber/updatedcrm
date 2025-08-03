import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  MapPin, 
  Calendar, 
  Monitor, 
  Wrench, 
  TrendingUp, 
  Users, 
  Settings, 
  User,
  ClipboardList,
  AlertTriangle,
  Package,
  RotateCcw
} from "lucide-react";
import { Separator } from "./ui/separator";
import { DashboardPage } from "./pages/DashboardPage";
import { SitesPage } from "./pages/SitesPage";
import { ProjectorsPage } from "./pages/ProjectorsPage";
import { PurchaseOrdersPage } from "./pages/PurchaseOrdersPage";
import { ServicePlanningPage } from "./pages/ServicePlanningPage";
import { SparePartsPage } from "./pages/SparePartsPage";
import { RMAPage } from "./pages/RMAPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { SettingsPage } from "./pages/SettingsPage";

const mainNavItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: MapPin, label: "Sites" },
  { icon: Monitor, label: "Projectors" },
  { icon: FileText, label: "Purchase Orders" },
];

const operationsItems = [
  { icon: Calendar, label: "Service Planning" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Package, label: "Spare Parts" },
  { icon: RotateCcw, label: "RMA Management" },
  { icon: ClipboardList, label: "Work Orders" },
];

const analyticsItems = [
  { icon: TrendingUp, label: "Analytics" },
  { icon: AlertTriangle, label: "Warranty Alerts" },
];

const otherItems = [
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
  { icon: User, label: "Profile" },
];

export function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderNavItem = (item: any, isActive: boolean) => {
    const Icon = item.icon;
    return (
      <button
        key={item.label}
        onClick={() => setActivePage(item.label)}
        className={`dark-nav-item w-full text-left ${
          isActive ? "dark-nav-item-active" : ""
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? "text-dark-primary" : "text-dark-secondary"}`} />
        <span>{item.label}</span>
      </button>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Sites":
        return <SitesPage />;
      case "Projectors":
        return <ProjectorsPage />;
      case "Purchase Orders":
        return <PurchaseOrdersPage />;
      case "Service Planning":
        return <ServicePlanningPage />;
      case "Spare Parts":
        return <SparePartsPage />;
      case "RMA Management":
        return <RMAPage />;
      case "Analytics":
        return <AnalyticsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-72 bg-dark-bg border-r border-dark-color flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b border-dark-color">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center dark-shadow-lg relative overflow-hidden">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-primary">ProjectorCare</h1>
              <p className="text-xs text-dark-secondary font-medium">Warranty Management System</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-2">
            {mainNavItems.map((item) => renderNavItem(item, activePage === item.label))}
          </div>

          <Separator style={{ backgroundColor: '#374151' }} />

          {/* Operations Group */}
          <div className="space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-bold text-dark-secondary uppercase tracking-widest">Operations</h3>
            </div>
            <div className="space-y-2">
              {operationsItems.map((item) => renderNavItem(item, activePage === item.label))}
            </div>
          </div>

          <Separator style={{ backgroundColor: '#374151' }} />

          {/* Analytics Group */}
          <div className="space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-bold text-dark-secondary uppercase tracking-widest">Analytics</h3>
            </div>
            <div className="space-y-2">
              {analyticsItems.map((item) => renderNavItem(item, activePage === item.label))}
            </div>
          </div>

          <Separator style={{ backgroundColor: '#374151' }} />

          {/* Other */}
          <div className="space-y-4">
            <div className="px-4">
              <h3 className="text-xs font-bold text-dark-secondary uppercase tracking-widest">Other</h3>
            </div>
            <div className="space-y-2">
              {otherItems.map((item) => renderNavItem(item, activePage === item.label))}
            </div>
          </div>
        </nav>

        {/* Bottom CTA */}
        <div className="p-6 border-t border-dark-color">
          <div className="bg-dark-card rounded-xl p-4 text-center border border-dark-color">
            <h4 className="text-sm font-bold text-dark-primary mb-2">Upgrade Plan</h4>
            <p className="text-xs text-dark-secondary mb-3">Get advanced analytics & reports</p>
            <button className="dark-button-primary text-xs py-2 px-4 w-full">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}