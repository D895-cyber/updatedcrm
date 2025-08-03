import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// API client for server functions
class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-d70ff8de`;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    };
  }

  async get(endpoint: string) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API GET error for ${endpoint}:`, error);
      throw error;
    }
  }

  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API POST error for ${endpoint}:`, error);
      throw error;
    }
  }

  async put(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API PUT error for ${endpoint}:`, error);
      throw error;
    }
  }

  async delete(endpoint: string) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.headers,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API DELETE error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }

  // Initialize database schema
  async initializeSchema() {
    return this.post('/init-schema', {});
  }

  // Projector methods
  async getProjector(serialNumber: string) {
    return this.get(`/projector/${serialNumber}`);
  }

  async getAllProjectors() {
    return this.get('/projectors');
  }

  async updateProjector(serialNumber: string, updates: any) {
    return this.put(`/projector/${serialNumber}`, updates);
  }

  // Service methods
  async getAllServices() {
    return this.get('/services');
  }

  async addService(serviceData: any) {
    return this.post('/service', serviceData);
  }

  async updateService(serviceId: string, updates: any) {
    return this.put(`/service/${serviceId}`, updates);
  }

  // Spare parts methods
  async getAllSpareParts() {
    return this.get('/spare-parts');
  }

  async updateSparePart(partId: string, updates: any) {
    return this.put(`/spare-part/${partId}`, updates);
  }

  async addSparePart(partData: any) {
    return this.post('/spare-part', partData);
  }

  // RMA methods
  async getAllRMA() {
    return this.get('/rma');
  }

  async createRMA(rmaData: any) {
    return this.post('/rma', rmaData);
  }

  async updateRMA(rmaId: string, updates: any) {
    return this.put(`/rma/${rmaId}`, updates);
  }

  // Analytics methods
  async getAnalytics() {
    return this.get('/analytics');
  }

  async getDashboardStats() {
    return this.get('/dashboard-stats');
  }

  // Search functionality
  async search(query: string) {
    return this.get(`/search?q=${encodeURIComponent(query)}`);
  }

  // Advanced queries
  async getProjectorsByStatus(status: string) {
    const projectors = await this.getAllProjectors();
    return projectors.filter((p: any) => p.status === status);
  }

  async getServicesByDateRange(startDate: string, endDate: string) {
    const services = await this.getAllServices();
    return services.filter((s: any) => {
      const serviceDate = new Date(s.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return serviceDate >= start && serviceDate <= end;
    });
  }

  async getLowStockParts() {
    const parts = await this.getAllSpareParts();
    return parts.filter((p: any) => p.stock_quantity <= p.min_stock);
  }

  async getWarrantyAlerts() {
    const projectors = await this.getAllProjectors();
    return projectors.filter((p: any) => {
      const warrantyEnd = new Date(p.warranty_end);
      const now = new Date();
      const daysUntilWarranty = Math.ceil((warrantyEnd - now) / (1000 * 60 * 60 * 24));
      return daysUntilWarranty <= 30 && daysUntilWarranty > 0;
    });
  }

  // Bulk operations
  async bulkUpdateProjectors(updates: Array<{ serial: string; data: any }>) {
    const results = [];
    for (const update of updates) {
      try {
        const result = await this.updateProjector(update.serial, update.data);
        results.push({ success: true, serial: update.serial, data: result });
      } catch (error) {
        results.push({ success: false, serial: update.serial, error: error.message });
      }
    }
    return results;
  }

  // Export functionality
  async exportProjectors() {
    const projectors = await this.getAllProjectors();
    return {
      data: projectors,
      exportDate: new Date().toISOString(),
      format: 'json'
    };
  }

  async exportServices() {
    const services = await this.getAllServices();
    return {
      data: services,
      exportDate: new Date().toISOString(),
      format: 'json'
    };
  }

  // Notification methods
  async getNotifications() {
    const alerts = [];
    
    // Check low stock parts
    const lowStockParts = await this.getLowStockParts();
    if (lowStockParts.length > 0) {
      alerts.push({
        type: 'low_stock',
        message: `${lowStockParts.length} parts are running low on stock`,
        count: lowStockParts.length,
        items: lowStockParts
      });
    }

    // Check warranty alerts
    const warrantyAlerts = await this.getWarrantyAlerts();
    if (warrantyAlerts.length > 0) {
      alerts.push({
        type: 'warranty',
        message: `${warrantyAlerts.length} projectors have warranty expiring soon`,
        count: warrantyAlerts.length,
        items: warrantyAlerts
      });
    }

    // Check pending services
    const allServices = await this.getAllServices();
    const pendingServices = allServices.filter((s: any) => s.status === 'In Progress');
    if (pendingServices.length > 0) {
      alerts.push({
        type: 'pending_service',
        message: `${pendingServices.length} services are pending`,
        count: pendingServices.length,
        items: pendingServices
      });
    }

    return alerts;
  }
}

export const apiClient = new ApiClient();