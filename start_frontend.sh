#!/bin/bash

echo "Starting RFM Analytics Frontend..."
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting Vite development server..."
echo "Frontend will be available at http://localhost:3000"
echo ""
npm run dev
