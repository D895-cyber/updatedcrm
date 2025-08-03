// Test script for backend functionality
const { apiClient } = require('./utils/supabase/client.ts');

async function testBackend() {
  try {
    console.log('🧪 Testing AI8Digital Dashboard Backend...\n');

    // Test health check
    console.log('1. Testing health check...');
    const health = await apiClient.healthCheck();
    console.log('✅ Health check passed:', health);

    // Test analytics
    console.log('\n2. Testing analytics...');
    const analytics = await apiClient.getAnalytics();
    console.log('✅ Analytics retrieved:', analytics);

    // Test dashboard stats
    console.log('\n3. Testing dashboard stats...');
    const stats = await apiClient.getDashboardStats();
    console.log('✅ Dashboard stats retrieved:', stats);

    // Test projectors
    console.log('\n4. Testing projectors...');
    const projectors = await apiClient.getAllProjectors();
    console.log('✅ Projectors retrieved:', projectors.length, 'projectors');

    // Test services
    console.log('\n5. Testing services...');
    const services = await apiClient.getAllServices();
    console.log('✅ Services retrieved:', services.length, 'services');

    // Test spare parts
    console.log('\n6. Testing spare parts...');
    const spareParts = await apiClient.getAllSpareParts();
    console.log('✅ Spare parts retrieved:', spareParts.length, 'parts');

    // Test RMA
    console.log('\n7. Testing RMA...');
    const rmas = await apiClient.getAllRMA();
    console.log('✅ RMA records retrieved:', rmas.length, 'RMAs');

    // Test notifications
    console.log('\n8. Testing notifications...');
    const notifications = await apiClient.getNotifications();
    console.log('✅ Notifications retrieved:', notifications.length, 'alerts');

    console.log('\n🎉 All backend tests passed successfully!');
    console.log('\n📊 Backend Summary:');
    console.log(`   - Projectors: ${projectors.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Spare Parts: ${spareParts.length}`);
    console.log(`   - RMA Records: ${rmas.length}`);
    console.log(`   - Active Alerts: ${notifications.length}`);

  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
}

// Run the test
testBackend(); 