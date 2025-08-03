# AI8Digital Dashboard - Backend Documentation

## 🚀 **Backend Architecture**

The AI8Digital Dashboard uses **Supabase** as the backend platform with the following components:

### **Core Components**
- **Supabase Database**: PostgreSQL with real-time subscriptions
- **Edge Functions**: Deno-based serverless functions
- **KV Store**: Key-value storage for data persistence
- **Authentication**: Built-in auth with multiple providers
- **Storage**: File storage for documents and media

## 📊 **Database Schema**

### **Key-Value Store Structure**
```
kv_store_d70ff8de (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
)
```

### **Data Models**

#### **Projector Model**
```json
{
  "serial_number": "EP2250U240101",
  "model": "Epson EB-2250U",
  "brand": "Epson",
  "site": "Corporate Plaza Mall",
  "location": "Hall A - Main Screen",
  "install_date": "2023-06-15",
  "warranty_end": "2025-06-14",
  "status": "Active",
  "condition": "Good",
  "last_service": "2024-01-15",
  "next_service": "2024-04-15",
  "total_services": 3,
  "hours_used": 2150,
  "expected_life": 10000,
  "customer": "Corporate Plaza Management",
  "technician": "Rajesh Kumar",
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

#### **Service Model**
```json
{
  "id": "SRV-001",
  "projector_serial": "EP2250U240101",
  "date": "2024-01-15",
  "type": "Lamp Replacement",
  "technician": "Rajesh Kumar",
  "status": "Completed",
  "notes": "Replaced lamp ELPLP96, cleaned air filter",
  "spare_parts": ["ELPLP96"],
  "cost": 8500,
  "hours": 2,
  "created_at": "2024-01-20T10:00:00Z"
}
```

#### **RMA Model**
```json
{
  "id": "RMA-001",
  "rma_number": "RMA-2024-001",
  "projector_serial": "PTR120240202",
  "part_number": "PT-RZ120-MB",
  "part_name": "Main Board",
  "issue_date": "2024-01-15",
  "status": "Under Review",
  "reason": "Logic board failure - HDMI port not responding",
  "estimated_cost": 45000,
  "warranty_status": "In Warranty",
  "technician": "Priya Sharma",
  "physical_condition": "Good",
  "logical_condition": "Faulty",
  "created_at": "2024-01-20T10:00:00Z"
}
```

#### **Spare Part Model**
```json
{
  "id": "SP-001",
  "part_number": "ELPLP96",
  "part_name": "Replacement Lamp for Epson EB-2250U",
  "category": "Spare Parts",
  "brand": "Epson",
  "compatible_models": ["Epson EB-2250U"],
  "stock_quantity": 15,
  "min_stock": 5,
  "unit_cost": 8500,
  "supplier": "Epson India",
  "last_restocked": "2024-01-10",
  "location": "Main Warehouse",
  "status": "In Stock",
  "created_at": "2024-01-20T10:00:00Z"
}
```

## 🔌 **API Endpoints**

### **Health & System**
- `GET /health` - Health check endpoint
- `POST /init-schema` - Initialize database with sample data

### **Projectors**
- `GET /projectors` - Get all projectors
- `GET /projector/:serial` - Get specific projector with related data
- `PUT /projector/:serial` - Update projector data

### **Services**
- `GET /services` - Get all services
- `POST /service` - Add new service record
- `PUT /service/:id` - Update service record

### **Spare Parts**
- `GET /spare-parts` - Get all spare parts
- `PUT /spare-part/:id` - Update spare part
- `POST /spare-part` - Add new spare part

### **RMA Management**
- `GET /rma` - Get all RMA records
- `POST /rma` - Create new RMA
- `PUT /rma/:id` - Update RMA record

### **Analytics & Reporting**
- `GET /analytics` - Get analytics overview
- `GET /dashboard-stats` - Get dashboard statistics
- `GET /search?q=query` - Search across all data

## 🛠 **Frontend API Client**

### **Basic Operations**
```typescript
// Health check
await apiClient.healthCheck();

// Initialize database
await apiClient.initializeSchema();

// Get all projectors
const projectors = await apiClient.getAllProjectors();

// Get specific projector
const projector = await apiClient.getProjector("EP2250U240101");

// Update projector
await apiClient.updateProjector("EP2250U240101", { status: "Under Service" });
```

### **Advanced Queries**
```typescript
// Get projectors by status
const activeProjectors = await apiClient.getProjectorsByStatus("Active");

// Get services by date range
const recentServices = await apiClient.getServicesByDateRange("2024-01-01", "2024-01-31");

// Get low stock parts
const lowStockParts = await apiClient.getLowStockParts();

// Get warranty alerts
const warrantyAlerts = await apiClient.getWarrantyAlerts();
```

### **Analytics & Reporting**
```typescript
// Get analytics overview
const analytics = await apiClient.getAnalytics();

// Get dashboard statistics
const stats = await apiClient.getDashboardStats();

// Search functionality
const searchResults = await apiClient.search("Epson");
```

### **Bulk Operations**
```typescript
// Bulk update projectors
const updates = [
  { serial: "EP2250U240101", data: { status: "Active" } },
  { serial: "PTR120240202", data: { status: "Under Service" } }
];
const results = await apiClient.bulkUpdateProjectors(updates);
```

### **Export Functionality**
```typescript
// Export projectors data
const exportData = await apiClient.exportProjectors();

// Export services data
const servicesExport = await apiClient.exportServices();
```

### **Notifications**
```typescript
// Get all notifications (alerts)
const notifications = await apiClient.getNotifications();
// Returns: low stock alerts, warranty alerts, pending services
```

## 🔧 **Backend Features**

### **Real-time Analytics**
- Automatic calculation of dashboard statistics
- Real-time stock level monitoring
- Warranty expiration alerts
- Service status tracking

### **Search Functionality**
- Full-text search across all data types
- Filter by multiple criteria
- Case-insensitive matching

### **Data Validation**
- Input validation for all endpoints
- Error handling with detailed messages
- Type safety with TypeScript

### **Performance Optimizations**
- Efficient key-value storage
- Indexed queries for fast retrieval
- Pagination support for large datasets

## 🚀 **Deployment**

### **Local Development**
```bash
# Start Supabase locally
supabase start

# Deploy functions
supabase functions deploy make-server-d70ff8de

# Stop local services
supabase stop
```

### **Production Deployment**
```bash
# Link to your Supabase project
supabase link --project-ref glrhaqrcadtsgbtseyty

# Deploy to production
supabase functions deploy make-server-d70ff8de --project-ref glrhaqrcadtsgbtseyty
```

## 🔐 **Security**

### **Authentication**
- JWT-based authentication
- Role-based access control
- Secure API endpoints

### **Data Protection**
- Input sanitization
- SQL injection prevention
- CORS configuration

### **Environment Variables**
```bash
SUPABASE_URL=https://glrhaqrcadtsgbtseyty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscmhhcXJjYWR0c2didHNleXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTM3NjUsImV4cCI6MjA2OTY4OTc2NX0.5qo7mBIK3bQpVJn6o5pYdD12jLlzFTybitmWoWwuem4  
```

## 📈 **Monitoring & Logging**

### **Health Monitoring**
- Health check endpoint for uptime monitoring
- Detailed error logging
- Performance metrics

### **Error Handling**
- Comprehensive error messages
- Stack trace logging
- Graceful degradation

## 🔄 **Data Flow**

1. **Frontend Request** → API Client
2. **API Client** → Supabase Edge Function
3. **Edge Function** → KV Store (PostgreSQL)
4. **Response** → Frontend with real-time updates

## 📊 **Analytics Dashboard**

The backend provides comprehensive analytics including:
- Total projectors and their status
- Service completion rates
- Revenue tracking
- Stock level monitoring
- Warranty alerts
- Performance metrics

## 🔧 **Configuration**

### **Supabase Configuration**
- Project ID: `glrhaqrcadtsgbtseyty`
- Database: PostgreSQL 15
- Functions: Deno runtime
- Storage: File storage enabled

### **API Configuration**
- Base URL: `https://glrhaqrcadtsgbtseyty.supabase.co/functions/v1/make-server-d70ff8de`
- CORS: Enabled for all origins
- Rate Limiting: Configured
- Authentication: JWT-based

## 🎯 **Future Enhancements**

### **Planned Features**
- Real-time notifications
- Advanced reporting
- Data export (CSV, Excel)
- Email notifications
- Mobile app support
- Advanced analytics
- Machine learning integration

### **Scalability**
- Horizontal scaling support
- Database optimization
- Caching strategies
- CDN integration

---

This backend provides a robust, scalable foundation for the AI8Digital Dashboard with comprehensive data management, real-time analytics, and advanced features for projector management and service tracking. 