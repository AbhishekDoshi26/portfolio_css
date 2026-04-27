#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment for Abhishek Doshi Portfolio...${NC}"

# Exit on error
set -e

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Error: npm is not installed.${NC}"
    exit 1
fi

# 1. Build the project
echo -e "${BLUE}📦 Building the project...${NC}"
npm run build

# 2. Deploy to Firebase
echo -e "${BLUE}🔥 Deploying to Firebase Hosting...${NC}"
if command -v firebase &> /dev/null; then
    firebase deploy
else
    echo -e "${BLUE}Using npx firebase deploy...${NC}"
    npx firebase-tools deploy
fi

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${GREEN}🌐 Your site is live at: https://abhishekdoshi.dev${NC}"
