# RFM Analytics - Full-Stack Customer Segmentation Platform

A complete full-stack web application for performing RFM (Recency, Frequency, Monetary) Analysis on customer transaction data. Built with FastAPI backend and React + Vite + TailwindCSS frontend.

![RFM Analytics](https://img.shields.io/badge/RFM-Analytics-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-cyan)

## 🚀 Features

### Backend (FastAPI)
- ✅ **RFM Calculation Engine**: Automatic calculation of Recency, Frequency, and Monetary metrics
- ✅ **Customer Segmentation**: Intelligent segmentation into 9 categories (Champions, Loyal, At Risk, etc.)
- ✅ **File Upload Support**: CSV and Excel file processing
- ✅ **REST API**: Complete API endpoints for data analysis
- ✅ **Quantile-Based Scoring**: 1-5 scale scoring system for each RFM metric

### Frontend (React + Vite)
- ✅ **Landing Page**: Beautiful hero section with call-to-action
- ✅ **Upload Interface**: Drag-and-drop file upload with validation
- ✅ **Interactive Dashboard**: Real-time charts and visualizations
- ✅ **Multiple Chart Types**: Pie charts, bar charts, scatter plots using Recharts
- ✅ **Customer Insights**: Actionable recommendations for each segment
- ✅ **Export Functionality**: Download analysis results as CSV
- ✅ **Responsive Design**: Mobile-friendly UI with TailwindCSS
- ✅ **Documentation Page**: Complete user guide and API reference

### Customer Segments
1. **Champions** - Best customers (High R, F, M)
2. **Loyal** - Regular high-frequency customers
3. **Promising** - Recent customers with potential
4. **At Risk** - Good customers who haven't purchased recently
5. **Hibernating** - Inactive customers
6. **Cannot Lose** - High-value customers at risk
7. **New Customers** - Recent first-time buyers
8. **Need Attention** - Below-average customers
9. **Others** - Remaining customers

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
  ```bash
  venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
python main.py
```

The API will be available at `http://localhost:8000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## 📊 Data Format

Your CSV or Excel file should contain the following columns:

| Column | Required | Type | Description |
|--------|----------|------|-------------|
| CustomerID | Yes | String/Number | Unique customer identifier |
| InvoiceDate | Yes | Date | Transaction date |
| Quantity | Yes | Number | Number of items purchased |
| Price | Yes | Number | Price per item |
| CustomerName | No | String | Customer name (optional) |

### Example Data

```csv
CustomerID,CustomerName,InvoiceDate,Quantity,Price
C001,John Smith,2024-01-15,2,29.99
C001,John Smith,2024-02-20,1,49.99
C002,Jane Doe,2024-01-10,3,19.99
C002,Jane Doe,2024-03-05,2,39.99
C003,Bob Johnson,2024-02-01,1,99.99
```

A sample dataset is provided in `sample_data/sample_transactions.csv`

## 🔌 API Endpoints

### POST /upload
Upload and process customer transaction data
- **Request**: multipart/form-data with file
- **Response**: Processing summary

### GET /summary
Get RFM analysis summary statistics
- **Response**: Total customers, revenue, segments, averages

### GET /distribution
Get segment distribution and revenue data
- **Response**: Segment counts, percentages, revenue by segment

### GET /insights
Get customer insights and recommendations
- **Response**: Segment insights, top customers, recommendations

### GET /scatter-data
Get scatter plot data for visualization
- **Response**: RFM data points for charts

### GET /export
Export RFM results as CSV file
- **Response**: CSV file download

## 📱 Application Pages

1. **Home** - Landing page with features and benefits
2. **Upload** - File upload interface
3. **How It Works** - RFM methodology explanation
4. **Why RFM** - Benefits and use cases
5. **Dashboard** - Interactive analytics dashboard with:
   - KPI cards (Total Customers, Revenue, Segments)
   - Segment Distribution (Pie & Bar charts)
   - Revenue Analysis (Bar chart)
   - RFM Scatter Plots
   - Customer Insights & Recommendations
6. **Documentation** - Complete user guide and API reference

## 🎨 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Uvicorn** - ASGI server
- **Python-multipart** - File upload handling
- **OpenPyXL** - Excel file support

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Chart library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Router** - Client-side routing

## 📈 RFM Calculation

### Recency (R)
```
Recency = Current Date - Last Purchase Date (in days)
Score: 5 (best) to 1 (worst) - Lower days = Higher score
```

### Frequency (F)
```
Frequency = Total Number of Purchases
Score: 1 (worst) to 5 (best) - More purchases = Higher score
```

### Monetary (M)
```
Monetary = Sum of (Quantity × Price)
Score: 1 (worst) to 5 (best) - Higher spend = Higher score
```

## 🎯 Use Cases

- **E-Commerce**: Identify VIP customers and re-engage dormant shoppers
- **Subscription Services**: Predict and prevent churn
- **B2B Companies**: Prioritize high-value accounts
- **Marketing Agencies**: Demonstrate ROI with improved targeting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for data-driven customer insights

## 🙏 Acknowledgments

- FastAPI for the amazing backend framework
- React team for the powerful UI library
- TailwindCSS for beautiful styling
- Recharts for interactive visualizations
commands:
# 1. Start backend
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
source venv/bin/activate  # Unix
pip install -r requirements.txt
python main.py

# 2. Start frontend (new terminal)
cd frontend
npm install
npm run dev

# 3. Open browser
# Go to: http://localhost:3000