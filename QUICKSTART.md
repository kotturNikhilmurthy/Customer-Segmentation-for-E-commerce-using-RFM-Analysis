# Quick Start Guide

Get your RFM Analytics platform up and running in 5 minutes!

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Step 1: Install Backend Dependencies

Open a terminal and navigate to the backend directory:

```bash
cd backend
python -m venv venv
```

**Activate the virtual environment:**

Windows:
```bash
venv\Scripts\activate
```

macOS/Linux:
```bash
source venv/bin/activate
```

**Install Python packages:**
```bash
pip install -r requirements.txt
```

## Step 2: Install Frontend Dependencies

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
npm install
```

## Step 3: Start the Backend Server

In the backend terminal (with venv activated):

```bash
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## Step 4: Start the Frontend Server

In the frontend terminal:

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
```

## Step 5: Open the Application

Open your browser and go to:
```
http://localhost:3000
```

## Step 6: Try It Out!

1. Click **"Start Analysis"** or navigate to **Upload**
2. Upload the sample dataset from `sample_data/sample_transactions.csv`
3. Click **"Analyze Dataset"**
4. View your results in the Dashboard!

## Troubleshooting

### Port Already in Use

**Backend (Port 8000):**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found Errors

Make sure you're in the correct directory and virtual environment is activated:
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### CORS Errors

Make sure both servers are running and the frontend proxy is configured correctly in `vite.config.js`.

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out the [Documentation](http://localhost:3000/documentation) page in the app
- Explore the API docs at [http://localhost:8000/docs](http://localhost:8000/docs)

## Need Help?

- Check the main README.md for detailed information
- Review the Documentation page in the application
- Ensure all dependencies are installed correctly
