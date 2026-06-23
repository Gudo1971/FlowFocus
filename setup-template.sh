#!/bin/bash
# Template Setup Script
# Aanpassen van FocusFlow template naar je eigen project

# Prompt for project name
read -p "Enter your project name: " PROJECT_NAME
read -p "Enter your project description: " PROJECT_DESCRIPTION
read -p "Enter your brand primary color (e.g., blue, purple, green): " BRAND_COLOR

echo "🔧 Setting up $PROJECT_NAME..."

# Update package.json
sed -i "s/\"focusflow\"/\"$PROJECT_NAME\"/g" package.json
sed -i "s/focusflow/$PROJECT_NAME/g" package.json

# Update README
sed -i "s/FocusFlow/$PROJECT_NAME/g" README.md
sed -i "s/A production-ready template/$PROJECT_DESCRIPTION/g" README.md

# Update index.html
sed -i "s/<title>focusflow<\/title>/<title>$PROJECT_NAME<\/title>/g" index.html

# Update Header.tsx
sed -i "s/FocusFlow/$PROJECT_NAME/g" src/components/Header.tsx

echo "✅ Project renamed to: $PROJECT_NAME"
echo "✅ Update src/theme/index.ts with your brand colors"
echo "✅ Run: npm install && npm run dev"
