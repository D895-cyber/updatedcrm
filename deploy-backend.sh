#!/bin/bash

# AI8Digital Dashboard - Backend Deployment Script

echo "🚀 Deploying AI8Digital Dashboard Backend..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Current configuration:"
echo "   - Project ID: glrhaqrcadtsgbtseyty"
echo "   - Function: make-server-d70ff8de"

# Deploy the function
echo "📦 Deploying Supabase function..."
supabase functions deploy make-server-d70ff8de --project-ref glrhaqrcadtsgbtseyty

if [ $? -eq 0 ]; then
    echo "✅ Function deployed successfully!"
    
    echo "🔗 Function URL:"
    echo "   https://glrhaqrcadtsgbtseyty.supabase.co/functions/v1/make-server-d70ff8de"
    
    echo "📊 Available endpoints:"
    echo "   - GET  /health"
    echo "   - POST /init-schema"
    echo "   - GET  /projectors"
    echo "   - GET  /projector/:serial"
    echo "   - PUT  /projector/:serial"
    echo "   - GET  /services"
    echo "   - POST /service"
    echo "   - GET  /spare-parts"
    echo "   - PUT  /spare-part/:id"
    echo "   - GET  /rma"
    echo "   - POST /rma"
    echo "   - GET  /analytics"
    echo "   - GET  /dashboard-stats"
    echo "   - GET  /search?q=query"
    
    echo "🎉 Backend deployment completed successfully!"
else
    echo "❌ Function deployment failed!"
    exit 1
fi 