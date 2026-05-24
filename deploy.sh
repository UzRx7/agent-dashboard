#!/bin/bash

# ==============================================================================
# 2U.TV AGENTIC OS - ONE-CLICK DEPLOYMENT SCRIPT (HOSTINGER VPS)
# ==============================================================================
# Make script executable: chmod +x deploy.sh
# Run command: ./deploy.sh

# Exit immediately if any command fails
set -e

echo "=================================================================="
echo "🚀 Waking Agentic OS Deployment Pipeline..."
echo "=================================================================="

# 1. Pull latest code from GitHub
echo "📥 Step 1: Pulling latest commits from remote main branch..."
git pull origin main

# 2. Install production dependencies
echo "📦 Step 2: Ingesting production dependencies..."
npm install --omit=dev

# 3. Compile Next.js bundle
echo "🏗️ Step 3: Compiling production Next.js build..."
npm run build

# 4. PM2 Reload processes
echo "🔄 Step 4: Gracefully reloading PM2 cluster containers..."
if pm2 describe agentic-os > /dev/null 2>&1; then
    echo "PM2 process 'agentic-os' found. Triggering zero-downtime reload..."
    pm2 reload ecosystem.config.js --env production
else
    echo "PM2 process not registered. Bootstrapping new process cluster..."
    pm2 start ecosystem.config.js --env production
fi

# Save current PM2 state
pm2 save

echo "=================================================================="
echo "🎉 SUCCESS: 2u.tv Agentic OS is fully compiled and online!"
echo "Visit os.2u.tv to access your dashboard command panel."
echo "=================================================================="
