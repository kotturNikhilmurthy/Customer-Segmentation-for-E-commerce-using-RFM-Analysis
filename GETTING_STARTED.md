# 🚀 Getting Started with RFM Analytics

Welcome! This guide will help you get the RFM Analytics platform running on your machine.

## ⚡ Quick Start (Easiest Method)

### For Windows Users:
Simply double-click the `start_all.bat` file in the project root. This will:
- Start the backend server on http://localhost:8000
- Start the frontend server on http://localhost:3000
- Open two command windows (keep them running)

### For macOS/Linux Users:
```bash
chmod +x start_backend.sh start_frontend.sh
./start_backend.sh &
./start_frontend.sh
```

Then open your browser to http://localhost:3000

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ Python 3.8 or higher ([Download](https://www.python.org/downloads/))
- ✅ Node.js 16 or higher ([Download](https://nodejs.org/))
- ✅ A text editor or IDE (VS Code recommended)

### Verify Installation:
```bash
python --version    # Should show 3.8+
node --version      # Should show 16+
npm --version       # Should be installed with Node
```

## 🔧 Manual Installation

### Step 1: Backend Setup

1. Open a terminal/command prompt
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment:
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

6. Start the backend server:
   ```bash
   python main.py
   ```

   You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000
   INFO:     Application startup complete.
   ```

### Step 2: Frontend Setup

1. Open a **NEW** terminal/command prompt
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   (This may take a few minutes)

4. Start the development server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v5.0.8  ready in XXX ms
   ➜  Local:   http://localhost:3000/
   ```

### Step 3: Open the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

## 🎯 First Analysis

Let's run your first RFM analysis!

1. **Navigate to Upload Page**
   - Click "Start Analysis" on the home page
   - Or click "Upload" in the navigation menu

2. **Upload Sample Data**
   - Use the provided sample file: `sample_data/sample_transactions.csv`
   - Drag and drop the file, or click "Browse Files"

3. **Analyze**
   - Click "Analyze Dataset"
   - Wait a few seconds for processing

4. **View Results**
   - You'll be automatically redirected to the Dashboard
   - Explore the different tabs:
     - **Segment Distribution**: See customer segments
     - **Revenue Analysis**: Revenue by segment
     - **RFM Scatter Plot**: Visual analysis
     - **Insights**: Recommendations and top customers

5. **Export Results**
   - Click "Export Results" to download CSV

## 📊 Understanding Your Data

### Required Columns

Your CSV or Excel file must have these columns:

| Column Name | Required | Description | Example |
|-------------|----------|-------------|---------|
| CustomerID | ✅ Yes | Unique customer identifier | C001, 12345 |
| InvoiceDate | ✅ Yes | Transaction date | 2024-01-15 |
| Quantity | ✅ Yes | Items purchased | 2, 5 |
| Price | ✅ Yes | Price per item | 29.99 |
| CustomerName | ❌ No | Customer name | John Smith |

### Column Name Flexibility

The system accepts various column name formats:
- `CustomerID`, `Customer_ID`, `customerid`
- `InvoiceDate`, `Invoice_Date`, `Date`, `date`
- `Quantity`, `Qty`, `quantity`
- `Price`, `UnitPrice`, `Unit_Price`, `price`

## 🎨 Application Pages

### 1. Home (Landing Page)
- Overview of the platform
- Key features
- Call-to-action buttons

### 2. Upload
- File upload interface
- Data format requirements
- Processing status

### 3. How It Works
- RFM methodology explanation
- Scoring system details
- Customer segments

### 4. Why RFM
- Benefits of RFM analysis
- Real-world use cases
- Success statistics

### 5. Dashboard
- **KPI Cards**: Total customers, revenue, segments
- **Charts**: Multiple visualization types
- **Insights**: Actionable recommendations
- **Export**: Download results

### 6. Documentation
- Complete user guide
- API reference
- Best practices

## 🔍 API Documentation

While the servers are running, you can access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These provide interactive API documentation where you can test endpoints directly.

## ❓ Troubleshooting

### Backend Won't Start

**Error: "Port 8000 is already in use"**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**Error: "Module not found"**
```bash
cd backend
pip install -r requirements.txt
```

### Frontend Won't Start

**Error: "Port 3000 is already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

**Error: "Cannot find module"**
```bash
cd frontend
rm -rf node_modules package-lock.json  # Clean install
npm install
```

### Upload Fails

**Check these:**
- ✅ File is CSV or Excel format
- ✅ Required columns exist
- ✅ Column names match (case-insensitive)
- ✅ Date format is valid
- ✅ Quantity and Price are numbers

### CORS Errors

**Ensure:**
- Backend is running on port 8000
- Frontend is running on port 3000
- Both servers are running simultaneously

## 💡 Tips for Best Results

1. **Clean Your Data**
   - Remove duplicate transactions
   - Ensure dates are valid
   - Check for negative quantities/prices

2. **Regular Analysis**
   - Run monthly or quarterly
   - Track segment changes over time

3. **Act on Insights**
   - Follow the recommendations
   - Create targeted campaigns
   - Monitor results

4. **Combine with Other Data**
   - Use alongside CRM data
   - Integrate with marketing tools
   - Track campaign performance

## 📚 Next Steps

- ✅ Read the full [README.md](README.md)
- ✅ Explore [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- ✅ Check the Documentation page in the app
- ✅ Try with your own data
- ✅ Customize segments for your business

## 🆘 Need Help?

1. **Check Documentation**: Visit http://localhost:3000/documentation
2. **API Docs**: Visit http://localhost:8000/docs
3. **Review Logs**: Check terminal output for errors
4. **Sample Data**: Use provided sample file to test

## 🎉 You're Ready!

You now have a fully functional RFM Analytics platform. Start analyzing your customer data and making data-driven decisions!

---

**Happy Analyzing! 📊**
