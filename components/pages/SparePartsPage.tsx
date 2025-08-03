import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Trash2,
  Eye,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Box,
  Tag,
  Calendar,
  User,
  MapPin,
  Monitor,
  Loader2,
  RefreshCw
} from "lucide-react";
import { apiClient } from "../../utils/supabase/client";

export function SparePartsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedPart, setSelectedPart] = useState<any>(null);
  const [spareParts, setSpareParts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSpareParts();
  }, []);

  const loadSpareParts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const parts = await apiClient.getAllSpareParts();
      setSpareParts(parts);
      console.log('Loaded spare parts:', parts.length);
    } catch (err) {
      console.error('Error loading spare parts:', err);
      setError('Failed to load spare parts data.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredParts = spareParts.filter(part => {
    const matchesSearch = (part.part_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.part_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.brand?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false;
    const matchesCategory = filterCategory === "All" || part.category === filterCategory;
    const matchesStatus = filterStatus === "All" || part.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-600";
      case "Low Stock":
        return "bg-orange-600";
      case "Out of Stock":
        return "bg-red-600";
      case "RMA Pending":
        return "bg-yellow-600";
      case "RMA Approved":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Spare Parts":
        return "bg-blue-600";
      case "RMA":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="w-4 h-4" />;
      case "Low Stock":
        return <AlertTriangle className="w-4 h-4" />;
      case "Out of Stock":
        return <AlertTriangle className="w-4 h-4" />;
      case "RMA Pending":
        return <Clock className="w-4 h-4" />;
      case "RMA Approved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const updatePartStock = async (partId: string, updates: any) => {
    try {
      await apiClient.updateSparePart(partId, updates);
      await loadSpareParts(); // Reload data
      console.log('Part updated successfully');
    } catch (err) {
      console.error('Error updating part:', err);
      setError('Failed to update part.');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-dark-bg border-b border-dark-color px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-dark-primary">Spare Parts Management</h1>
            <p className="text-sm text-dark-secondary mt-1">Manage spare parts inventory and RMA items</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={loadSpareParts}
              className="dark-button-secondary gap-2 flex items-center"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="dark-button-secondary gap-2 flex items-center">
              <Download className="w-4 h-4" />
              Export Inventory
            </button>
            <button className="dark-button-primary gap-2 flex items-center">
              <Plus className="w-4 h-4" />
              Add Part
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

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-secondary w-4 h-4" />
            <Input
              placeholder="Search parts, numbers, or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-card border-dark-color text-dark-primary"
            />
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-dark-color rounded-xl text-dark-primary focus:outline-none focus:ring-2 focus:ring-dark-cta"
          >
            <option value="All">All Categories</option>
            <option value="Spare Parts">Spare Parts</option>
            <option value="RMA">RMA Items</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-dark-color rounded-xl text-dark-primary focus:outline-none focus:ring-2 focus:ring-dark-cta"
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="RMA Pending">RMA Pending</option>
            <option value="RMA Approved">RMA Approved</option>
          </select>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-dark-secondary">Real-time data</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">{spareParts.length}</h3>
            <p className="text-sm text-dark-secondary">Total Parts</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {spareParts.filter(p => p.status === "In Stock").length}
            </h3>
            <p className="text-sm text-dark-secondary">In Stock</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {spareParts.filter(p => p.status === "Low Stock").length}
            </h3>
            <p className="text-sm text-dark-secondary">Low Stock</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {spareParts.filter(p => p.category === "RMA").length}
            </h3>
            <p className="text-sm text-dark-secondary">RMA Items</p>
          </div>
          
          <div className="dark-card text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-600 flex items-center justify-center mx-auto mb-4">
              <Box className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-primary mb-1">
              {spareParts.reduce((total, part) => total + (part.stock_quantity || 0), 0)}
            </h3>
            <p className="text-sm text-dark-secondary">Total Stock</p>
          </div>
        </div>

        {/* Parts Table */}
        <div className="dark-card">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-dark-secondary mx-auto mb-4 animate-spin" />
              <p className="text-dark-secondary">Loading spare parts...</p>
            </div>
          ) : filteredParts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-color">
                    <th className="text-left font-semibold text-dark-primary pb-4">Part Details</th>
                    <th className="text-left font-semibold text-dark-primary pb-4">Brand & Model</th>
                    <th className="text-center font-semibold text-dark-primary pb-4">Category</th>
                    <th className="text-center font-semibold text-dark-primary pb-4">Stock</th>
                    <th className="text-center font-semibold text-dark-primary pb-4">Status</th>
                    <th className="text-right font-semibold text-dark-primary pb-4">Price</th>
                    <th className="text-center font-semibold text-dark-primary pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((part, index) => (
                    <tr key={part.id} className="border-b border-dark-color hover:bg-dark-table-hover transition-colors">
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-semibold text-dark-primary">{part.part_name}</p>
                          <p className="text-xs text-dark-secondary flex items-center gap-1 mt-1">
                            <Tag className="w-3 h-3" />
                            {part.part_number}
                          </p>
                          <p className="text-xs text-dark-secondary flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Updated: {part.last_updated}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-dark-primary">{part.brand}</p>
                          <p className="text-xs text-dark-secondary flex items-center gap-1 mt-1">
                            <Monitor className="w-3 h-3" />
                            {part.projector_model}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className={`dark-tag ${getCategoryColor(part.category)} flex items-center gap-1 justify-center`}>
                          {part.category === "RMA" ? <RotateCcw className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                          {part.category}
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div>
                          <span className="text-sm font-semibold text-dark-primary">{part.stock_quantity || 0}</span>
                          <p className="text-xs text-dark-secondary">Min: {part.reorder_level || 0}</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className={`dark-tag ${getStatusColor(part.status)} flex items-center gap-1 justify-center`}>
                          {getStatusIcon(part.status)}
                          {part.status}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="text-sm font-semibold text-dark-primary">
                          ₹{(part.unit_price || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
                            onClick={() => setSelectedPart(part)}
                          >
                            <Eye className="w-4 h-4 text-dark-secondary" />
                          </button>
                          <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-dark-secondary" />
                          </button>
                          {part.category === "RMA" && (
                            <button className="p-2 hover:bg-dark-hover rounded-lg transition-colors">
                              <RotateCcw className="w-4 h-4 text-blue-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-dark-secondary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-dark-primary mb-2">No Parts Found</h3>
              <p className="text-dark-secondary">
                {searchTerm || filterCategory !== "All" || filterStatus !== "All" 
                  ? "No parts match your current filters." 
                  : "No spare parts have been added to the system yet."}
              </p>
            </div>
          )}
        </div>

        {/* Part Detail Modal */}
        {selectedPart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-dark-card rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-dark-color">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-primary">Part Details</h2>
                <button 
                  onClick={() => setSelectedPart(null)}
                  className="p-2 hover:bg-dark-hover rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-dark-secondary" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-dark-primary mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Part Name</label>
                        <p className="text-dark-primary font-semibold">{selectedPart.part_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Part Number</label>
                        <p className="text-dark-primary">{selectedPart.part_number}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-dark-secondary">Brand</label>
                          <p className="text-dark-primary">{selectedPart.brand}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-dark-secondary">Model</label>
                          <p className="text-dark-primary">{selectedPart.projector_model}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Category</label>
                        <div className={`dark-tag ${getCategoryColor(selectedPart.category)} inline-flex items-center gap-1 mt-1`}>
                          {selectedPart.category === "RMA" ? <RotateCcw className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                          {selectedPart.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-dark-primary mb-4">Stock Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Current Stock</label>
                        <p className="text-dark-primary font-semibold text-xl">{selectedPart.stock_quantity || 0}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Reorder Level</label>
                        <p className="text-dark-primary font-semibold text-xl">{selectedPart.reorder_level || 0}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Unit Price</label>
                        <p className="text-dark-primary font-semibold">₹{(selectedPart.unit_price || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Status</label>
                        <div className={`dark-tag ${getStatusColor(selectedPart.status)} inline-flex items-center gap-1 mt-1`}>
                          {getStatusIcon(selectedPart.status)}
                          {selectedPart.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-dark-primary mb-4">Additional Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Supplier</label>
                        <p className="text-dark-primary">{selectedPart.supplier || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Location</label>
                        <p className="text-dark-primary flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-dark-secondary" />
                          {selectedPart.location || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-dark-secondary">Last Updated</label>
                        <p className="text-dark-primary flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-dark-secondary" />
                          {selectedPart.last_updated}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 mt-6 border-t border-dark-color">
                <button 
                  className="flex-1 dark-button-secondary"
                  onClick={() => {
                    // Example: Update stock
                    const newStock = prompt('Enter new stock quantity:', selectedPart.stock_quantity?.toString());
                    if (newStock && !isNaN(Number(newStock))) {
                      updatePartStock(selectedPart.id, { stock_quantity: Number(newStock) });
                      setSelectedPart(null);
                    }
                  }}
                >
                  Update Stock
                </button>
                {selectedPart.category === "RMA" && (
                  <button className="flex-1 dark-button-primary">Process RMA</button>
                )}
                {selectedPart.status === "Low Stock" && (
                  <button className="flex-1 dark-button-primary">Reorder Stock</button>
                )}
                <button className="dark-button-secondary px-6">Print Label</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}