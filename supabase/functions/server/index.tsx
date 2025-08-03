import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { cors } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { logger } from "https://deno.land/x/hono@v3.4.1/middleware.ts";
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Logger middleware
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Health check endpoint
app.get('/make-server-d70ff8de/health', async (c) => {
  return new Response(JSON.stringify({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// Initialize database schema
app.post('/make-server-d70ff8de/init-schema', async (c) => {
  try {
    // Initialize projectors data
    const projectorsData = [
      {
        serial_number: "EP2250U240101",
        model: "Epson EB-2250U",
        brand: "Epson",
        site: "Corporate Plaza Mall",
        location: "Hall A - Main Screen",
        install_date: "2023-06-15",
        warranty_end: "2025-06-14",
        status: "Active",
        condition: "Good",
        last_service: "2024-01-15",
        next_service: "2024-04-15",
        total_services: 3,
        hours_used: 2150,
        expected_life: 10000,
        customer: "Corporate Plaza Management",
        technician: "Rajesh Kumar",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        serial_number: "PTR120240202",
        model: "Panasonic PT-RZ120",
        brand: "Panasonic",
        site: "Metro Convention Center",
        location: "Auditorium - Center Screen",
        install_date: "2023-08-22",
        warranty_end: "2025-08-21",
        status: "Under Service",
        condition: "Needs Repair",
        last_service: "2024-01-18",
        next_service: "2024-01-25",
        total_services: 2,
        hours_used: 1850,
        expected_life: 20000,
        customer: "Metro Convention Management",
        technician: "Amit Singh",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        serial_number: "VPL120240303",
        model: "Sony VPL-FHZ120",
        brand: "Sony",
        site: "City Mall Multiplex",
        location: "Screen 1 - Premium Hall",
        install_date: "2023-05-10",
        warranty_end: "2025-05-09",
        status: "Active",
        condition: "Excellent",
        last_service: "2024-01-10",
        next_service: "2024-04-10",
        total_services: 4,
        hours_used: 3200,
        expected_life: 20000,
        customer: "City Mall Entertainment",
        technician: "Vikram Singh",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        serial_number: "CP223O",
        model: "Sony VPL-FHZ120",
        brand: "Sony",
        site: "City Mall Multiplex",
        location: "Screen 1 - Premium Hall",
        install_date: "2023-05-10",
        warranty_end: "2025-05-09",
        status: "Active",
        condition: "Excellent",
        last_service: "2024-01-10",
        next_service: "2024-04-10",
        total_services: 4,
        hours_used: 3200,
        expected_life: 20000,
        customer: "City Mall Entertainment",
        technician: "Vikram Singh",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Store projectors data
    for (const projector of projectorsData) {
      await kv.set(`projector:${projector.serial_number}`, projector);
    }

    // Initialize service history
    const serviceData = [
      {
        id: "SRV-001",
        projector_serial: "EP2250U240101",
        date: "2024-01-15",
        type: "Lamp Replacement",
        technician: "Rajesh Kumar",
        status: "Completed",
        notes: "Replaced lamp ELPLP96, cleaned air filter",
        spare_parts: ["ELPLP96"],
        cost: 8500,
        hours: 2,
        created_at: new Date().toISOString()
      },
      {
        id: "SRV-002",
        projector_serial: "PTR120240202",
        date: "2024-01-18",
        type: "Urgent Repair",
        technician: "Amit Singh",
        status: "In Progress",
        notes: "Emergency repair - projector not turning on, main board issue identified",
        spare_parts: [],
        cost: 45000,
        hours: 3,
        created_at: new Date().toISOString()
      },
      {
        id: "SRV-005",
        projector_serial: "VPL120240303",
        date: "2024-01-10",
        type: "Preventive Maintenance",
        technician: "Vikram Singh",
        status: "Completed",
        notes: "Monthly cinema maintenance, laser output checked",
        spare_parts: [],
        cost: 3000,
        hours: 1.5,
        created_at: new Date().toISOString()
      }
    ];

    // Store service data
    for (const service of serviceData) {
      await kv.set(`service:${service.id}`, service);
      
      // Create index for projector services
      const existingServices = await kv.get(`projector_services:${service.projector_serial}`) || [];
      if (Array.isArray(existingServices)) {
        existingServices.push(service.id);
        await kv.set(`projector_services:${service.projector_serial}`, existingServices);
      } else {
        await kv.set(`projector_services:${service.projector_serial}`, [service.id]);
      }
    }

    // Initialize RMA data
    const rmaData = [
      {
        id: "RMA-001",
        rma_number: "RMA-2024-001",
        projector_serial: "PTR120240202",
        part_number: "PT-RZ120-MB",
        part_name: "Main Board",
        issue_date: "2024-01-15",
        status: "Under Review",
        reason: "Logic board failure - HDMI port not responding",
        estimated_cost: 45000,
        warranty_status: "In Warranty",
        technician: "Priya Sharma",
        physical_condition: "Good",
        logical_condition: "Faulty",
        created_at: new Date().toISOString()
      },
      {
        id: "RMA-002",
        rma_number: "RMA-2024-002",
        projector_serial: "VPL120240303",
        part_number: "VPL-FHZ120-LD",
        part_name: "Laser Diode Assembly",
        issue_date: "2024-01-10",
        status: "Replacement Approved",
        reason: "Reduced laser output - 60% of rated power",
        estimated_cost: 125000,
        warranty_status: "Extended Warranty",
        technician: "Vikram Singh",
        physical_condition: "Good",
        logical_condition: "Degraded",
        created_at: new Date().toISOString()
      }
    ];

    // Store RMA data
    for (const rma of rmaData) {
      await kv.set(`rma:${rma.id}`, rma);
      
      // Create index for projector RMAs
      const existingRMAs = await kv.get(`projector_rmas:${rma.projector_serial}`) || [];
      if (Array.isArray(existingRMAs)) {
        existingRMAs.push(rma.id);
        await kv.set(`projector_rmas:${rma.projector_serial}`, existingRMAs);
      } else {
        await kv.set(`projector_rmas:${rma.projector_serial}`, [rma.id]);
      }
    }

    // Initialize spare parts data
    const sparePartsData = [
      {
        id: "SP-001",
        part_number: "ELPLP96",
        part_name: "Replacement Lamp for Epson EB-2250U",
        category: "Spare Parts",
        brand: "Epson",
        compatible_models: ["Epson EB-2250U"],
        stock_quantity: 15,
        min_stock: 5,
        unit_cost: 8500,
        supplier: "Epson India",
        last_restocked: "2024-01-10",
        location: "Main Warehouse",
        status: "In Stock",
        created_at: new Date().toISOString()
      },
      {
        id: "SP-002",
        part_number: "PT-RZ120-MB",
        part_name: "Main Board for Panasonic PT-RZ120",
        category: "Electronic Components",
        brand: "Panasonic",
        compatible_models: ["Panasonic PT-RZ120"],
        stock_quantity: 2,
        min_stock: 3,
        unit_cost: 45000,
        supplier: "Panasonic Service Center",
        last_restocked: "2024-01-05",
        location: "Service Center",
        status: "Low Stock",
        created_at: new Date().toISOString()
      },
      {
        id: "SP-003",
        part_number: "VPL-FHZ120-LD",
        part_name: "Laser Diode Assembly for Sony VPL-FHZ120",
        category: "Optical Components",
        brand: "Sony",
        compatible_models: ["Sony VPL-FHZ120"],
        stock_quantity: 1,
        min_stock: 2,
        unit_cost: 125000,
        supplier: "Sony Professional",
        last_restocked: "2023-12-20",
        location: "Main Warehouse",
        status: "Critical Stock",
        created_at: new Date().toISOString()
      }
    ];

    // Store spare parts data
    for (const part of sparePartsData) {
      await kv.set(`spare_part:${part.id}`, part);
    }

    // Initialize analytics data
    const analyticsData = {
      total_projectors: 3,
      active_projectors: 2,
      under_service: 1,
      total_services: 3,
      total_rmas: 2,
      total_spare_parts: 3,
      monthly_revenue: 125000,
      pending_services: 1,
      warranty_alerts: 0,
      last_updated: new Date().toISOString()
    };

    await kv.set('analytics:overview', analyticsData);

    return new Response(JSON.stringify({ 
      message: 'Database schema initialized successfully',
      projectors_created: projectorsData.length,
      services_created: serviceData.length,
      rmas_created: rmaData.length,
      spare_parts_created: sparePartsData.length
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error initializing schema:', error);
    return new Response(JSON.stringify({ error: 'Failed to initialize schema', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get specific projector with all related data
app.get('/make-server-d70ff8de/projector/:serial', async (c) => {
  try {
    const serial = c.req.param('serial');
    
    const projector = await kv.get(`projector:${serial}`);
    if (!projector) {
      return new Response(JSON.stringify({ error: 'Projector not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get related services
    const serviceIds = await kv.get(`projector_services:${serial}`) || [];
    const services = [];
    for (const serviceId of serviceIds) {
      const service = await kv.get(`service:${serviceId}`);
      if (service) services.push(service);
    }

    // Get related RMAs
    const rmaIds = await kv.get(`projector_rmas:${serial}`) || [];
    const rmas = [];
    for (const rmaId of rmaIds) {
      const rma = await kv.get(`rma:${rmaId}`);
      if (rma) rmas.push(rma);
    }

    // Get compatible spare parts
    const allSpareParts = await kv.getByPrefix('spare_part:');
    const compatibleParts = allSpareParts.filter(part => 
      part.compatible_models && part.compatible_models.includes(projector.model)
    );

    const result = {
      ...projector,
      serviceHistory: services.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      rmaHistory: rmas.sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()),
      spareParts: compatibleParts
    };

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching projector data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projector data', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get all projectors
app.get('/make-server-d70ff8de/projectors', async (c) => {
  try {
    const projectors = await kv.getByPrefix('projector:');
    
    return new Response(JSON.stringify(projectors), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching projectors:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projectors', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Update projector data
app.put('/make-server-d70ff8de/projector/:serial', async (c) => {
  try {
    const serial = c.req.param('serial');
    const updates = await c.req.json();
    
    const existing = await kv.get(`projector:${serial}`);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Projector not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = { 
      ...existing, 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    await kv.set(`projector:${serial}`, updated);

    return new Response(JSON.stringify(updated), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error updating projector:', error);
    return new Response(JSON.stringify({ error: 'Failed to update projector', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Add new service record
app.post('/make-server-d70ff8de/service', async (c) => {
  try {
    const serviceData = await c.req.json();
    
    // Generate service ID
    const serviceId = `SRV-${Date.now()}`;
    const service = {
      id: serviceId,
      ...serviceData,
      created_at: new Date().toISOString()
    };

    await kv.set(`service:${serviceId}`, service);

    // Update projector services index
    const existingServices = await kv.get(`projector_services:${service.projector_serial}`) || [];
    if (Array.isArray(existingServices)) {
      existingServices.push(serviceId);
      await kv.set(`projector_services:${service.projector_serial}`, existingServices);
    } else {
      await kv.set(`projector_services:${service.projector_serial}`, [serviceId]);
    }

    // Update projector last service date and total services
    const projector = await kv.get(`projector:${service.projector_serial}`);
    if (projector) {
      projector.last_service = service.date;
      projector.total_services = (projector.total_services || 0) + 1;
      projector.updated_at = new Date().toISOString();
      await kv.set(`projector:${service.projector_serial}`, projector);
    }

    return new Response(JSON.stringify(service), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error adding service:', error);
    return new Response(JSON.stringify({ error: 'Failed to add service', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get all services
app.get('/make-server-d70ff8de/services', async (c) => {
  try {
    const services = await kv.getByPrefix('service:');
    
    return new Response(JSON.stringify(services), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch services', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get all spare parts
app.get('/make-server-d70ff8de/spare-parts', async (c) => {
  try {
    const spareParts = await kv.getByPrefix('spare_part:');
    
    return new Response(JSON.stringify(spareParts), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching spare parts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch spare parts', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Update spare part
app.put('/make-server-d70ff8de/spare-part/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`spare_part:${id}`);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Spare part not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = { 
      ...existing, 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    await kv.set(`spare_part:${id}`, updated);

    return new Response(JSON.stringify(updated), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error updating spare part:', error);
    return new Response(JSON.stringify({ error: 'Failed to update spare part', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get all RMA records
app.get('/make-server-d70ff8de/rma', async (c) => {
  try {
    const rmas = await kv.getByPrefix('rma:');
    
    return new Response(JSON.stringify(rmas), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching RMAs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch RMAs', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Create new RMA
app.post('/make-server-d70ff8de/rma', async (c) => {
  try {
    const rmaData = await c.req.json();
    
    // Generate RMA ID
    const rmaId = `RMA-${Date.now()}`;
    const rma = {
      id: rmaId,
      rma_number: `RMA-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      ...rmaData,
      created_at: new Date().toISOString()
    };

    await kv.set(`rma:${rmaId}`, rma);

    // Update projector RMAs index
    const existingRMAs = await kv.get(`projector_rmas:${rma.projector_serial}`) || [];
    if (Array.isArray(existingRMAs)) {
      existingRMAs.push(rmaId);
      await kv.set(`projector_rmas:${rma.projector_serial}`, existingRMAs);
    } else {
      await kv.set(`projector_rmas:${rma.projector_serial}`, [rmaId]);
    }

    return new Response(JSON.stringify(rma), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating RMA:', error);
    return new Response(JSON.stringify({ error: 'Failed to create RMA', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get analytics overview
app.get('/make-server-d70ff8de/analytics', async (c) => {
  try {
    const analytics = await kv.get('analytics:overview');
    const projectors = await kv.getByPrefix('projector:');
    const services = await kv.getByPrefix('service:');
    const rmas = await kv.getByPrefix('rma:');
    const spareParts = await kv.getByPrefix('spare_part:');

    // Calculate real-time analytics
    const realTimeAnalytics = {
      ...analytics,
      total_projectors: projectors.length,
      active_projectors: projectors.filter(p => p.status === 'Active').length,
      under_service: projectors.filter(p => p.status === 'Under Service').length,
      total_services: services.length,
      total_rmas: rmas.length,
      total_spare_parts: spareParts.length,
      low_stock_parts: spareParts.filter(p => p.stock_quantity <= p.min_stock).length,
      critical_stock_parts: spareParts.filter(p => p.status === 'Critical Stock').length,
      last_updated: new Date().toISOString()
    };

    await kv.set('analytics:overview', realTimeAnalytics);

    return new Response(JSON.stringify(realTimeAnalytics), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch analytics', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Search functionality
app.get('/make-server-d70ff8de/search', async (c) => {
  try {
    const query = c.req.query('q');
    if (!query) {
      return new Response(JSON.stringify({ error: 'Search query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const projectors = await kv.getByPrefix('projector:');
    const services = await kv.getByPrefix('service:');
    const rmas = await kv.getByPrefix('rma:');
    const spareParts = await kv.getByPrefix('spare_part:');

    const searchResults = {
      projectors: projectors.filter(p => 
        p.serial_number?.toLowerCase().includes(query.toLowerCase()) ||
        p.model?.toLowerCase().includes(query.toLowerCase()) ||
        p.site?.toLowerCase().includes(query.toLowerCase())
      ),
      services: services.filter(s => 
        s.projector_serial?.toLowerCase().includes(query.toLowerCase()) ||
        s.type?.toLowerCase().includes(query.toLowerCase()) ||
        s.technician?.toLowerCase().includes(query.toLowerCase())
      ),
      rmas: rmas.filter(r => 
        r.projector_serial?.toLowerCase().includes(query.toLowerCase()) ||
        r.part_name?.toLowerCase().includes(query.toLowerCase()) ||
        r.status?.toLowerCase().includes(query.toLowerCase())
      ),
      spareParts: spareParts.filter(sp => 
        sp.part_number?.toLowerCase().includes(query.toLowerCase()) ||
        sp.part_name?.toLowerCase().includes(query.toLowerCase()) ||
        sp.brand?.toLowerCase().includes(query.toLowerCase())
      )
    };

    return new Response(JSON.stringify(searchResults), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error searching:', error);
    return new Response(JSON.stringify({ error: 'Failed to search', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Dashboard statistics
app.get('/make-server-d70ff8de/dashboard-stats', async (c) => {
  try {
    const projectors = await kv.getByPrefix('projector:');
    const services = await kv.getByPrefix('service:');
    const rmas = await kv.getByPrefix('rma:');
    const spareParts = await kv.getByPrefix('spare_part:');

    const stats = {
      total_projectors: projectors.length,
      active_projectors: projectors.filter(p => p.status === 'Active').length,
      under_service: projectors.filter(p => p.status === 'Under Service').length,
      total_services: services.length,
      completed_services: services.filter(s => s.status === 'Completed').length,
      pending_services: services.filter(s => s.status === 'In Progress').length,
      total_rmas: rmas.length,
      pending_rmas: rmas.filter(r => r.status === 'Under Review').length,
      approved_rmas: rmas.filter(r => r.status === 'Replacement Approved').length,
      total_spare_parts: spareParts.length,
      low_stock_parts: spareParts.filter(p => p.stock_quantity <= p.min_stock).length,
      critical_stock_parts: spareParts.filter(p => p.status === 'Critical Stock').length,
      monthly_revenue: services.reduce((sum, s) => sum + (s.cost || 0), 0),
      warranty_alerts: projectors.filter(p => {
        const warrantyEnd = new Date(p.warranty_end);
        const now = new Date();
        const daysUntilWarranty = Math.ceil((warrantyEnd - now) / (1000 * 60 * 60 * 24));
        return daysUntilWarranty <= 30 && daysUntilWarranty > 0;
      }).length
    };

    return new Response(JSON.stringify(stats), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch dashboard stats', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

serve(app.fetch);