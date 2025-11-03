#!/bin/bash

echo "Starting RFM Analytics Backend..."
echo ""

cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing/updating dependencies..."
pip install -r requirements.txt
echo ""

echo "Starting FastAPI server..."
echo "Backend will be available at http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo ""
python main.py
