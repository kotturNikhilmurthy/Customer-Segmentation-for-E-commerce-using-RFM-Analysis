# RFM Analytics Platform - Project Overview

## 📁 Project Structure

```
RFM/
├── backend/                      # FastAPI Backend
│   ├── main.py                  # Main application with all endpoints
│   ├── requirements.txt         # Python dependencies
│   ├── README.md               # Backend documentation
│   └── .env.example            # Environment variables template
│
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navigation component
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx    # Home page
│   │   │   ├── UploadPage.jsx     # File upload interface
│   │   │   ├── HowItWorks.jsx     # RFM methodology explanation
│   │   │   ├── WhyRFM.jsx         # Benefits and use cases
│   │   │   ├── Dashboard.jsx      # Analytics dashboard
│   │   │   └── Documentation.jsx  # User guide
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── index.html              # HTML template
│   └── README.md               # Frontend documentation
│
├── sample_data/
│   └── sample_transactions.csv  # Sample dataset for testing
│
├── start_backend.bat           # Windows: Start backend
├── start_frontend.bat          # Windows: Start frontend
├── start_all.bat              # Windows: Start both servers
├── start_backend.sh           # Unix: Start backend
├── start_frontend.sh          # Unix: Start frontend
├── README.md                  # Main documentation
├── QUICKSTART.md             # Quick start guide
├── PROJECT_OVERVIEW.md       # This file
└── .gitignore               # Git ignore rules
```

## 🎯 Core Features

### Backend Features
1. **RFM Calculation Engine**
   - Recency: Days since last purchase
   - Frequency: Total number of purchases
   - Monetary: Total revenue per customer
   - Quantile-based scoring (1-5 scale)

2. **Customer Segmentation**
   - Champions
   - Loyal Customers
   - Promising
   - At Risk
   - Hibernating
   - Cannot Lose
   - New Customers
   - Need Attention
   - Others

3. **File Processing**
   - CSV file support
   - Excel file support (.xlsx, .xls)
   - Flexible column naming
   - Data validation

4. **REST API Endpoints**
   - POST /upload - Upload dataset
   - GET /summary - Analysis summary
   - GET /distribution - Segment distribution
   - GET /insights - Customer insights
   - GET /scatter-data - Visualization data
   - GET /export - Export results

### Frontend Features
1. **Landing Page**
   - Hero section with CTA
   - Feature highlights
   - 3-step process overview
   - Call-to-action sections

2. **Upload Interface**
   - Drag-and-drop file upload
   - File validation
   - Progress indicators
   - Error handling

3. **How It Works Page**
   - RFM metrics explanation
   - Scoring system details
   - Process flow visualization
   - Segment definitions

4. **Why RFM Page**
   - Benefits overview
   - Real-world use cases
   - Statistics and impact
   - Platform features

5. **Dashboard**
   - KPI cards (Customers, Revenue, Segments)
   - Segment distribution (Pie & Bar charts)
   - Revenue analysis (Bar chart)
   - RFM scatter plots
   - Customer insights
   - Top customers table
   - Export functionality

6. **Documentation**
   - Quick start guide
   - Data format requirements
   - API reference
   - Segment explanations
   - Best practices

## 🔧 Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.109.0 | Web framework |
| Uvicorn | 0.27.0 | ASGI server |
| Pandas | 2.1.4 | Data manipulation |
| NumPy | 1.26.3 | Numerical computing |
| OpenPyXL | 3.1.2 | Excel support |
| Scikit-learn | 1.4.0 | ML utilities |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| Vite | 5.0.8 | Build tool |
| TailwindCSS | 3.4.0 | CSS framework |
| Recharts | 2.10.3 | Charts library |
| Lucide React | 0.303.0 | Icons |
| Axios | 1.6.5 | HTTP client |
| React Router | 6.21.1 | Routing |

## 📊 RFM Calculation Logic

### 1. Data Processing
```python
# Read uploaded file (CSV or Excel)
df = pd.read_csv() or pd.read_excel()

# Calculate total amount
df['totalamount'] = df['quantity'] * df['price']

# Set reference date
current_date = df['invoicedate'].max() + 1 day
```

### 2. RFM Metrics
```python
# Group by customer
rfm = df.groupby('customerid').agg({
    'invoicedate': lambda x: (current_date - x.max()).days,  # Recency
    'customerid': 'count',                                    # Frequency
    'totalamount': 'sum'                                      # Monetary
})
```

### 3. Scoring (1-5 Scale)
```python
# Recency: Lower is better (reversed)
rfm['r_score'] = pd.qcut(rfm['recency'], q=5, labels=[5,4,3,2,1])

# Frequency: Higher is better
rfm['f_score'] = pd.qcut(rfm['frequency'], q=5, labels=[1,2,3,4,5])

# Monetary: Higher is better
rfm['m_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1,2,3,4,5])
```

### 4. Segmentation
```python
# Assign segments based on RFM scores
if r >= 4 and f >= 4 and m >= 4:
    segment = 'Champions'
elif f >= 4 and m >= 3:
    segment = 'Loyal'
# ... (see main.py for complete logic)
```

## 🎨 UI Components

### Color Scheme
- **Primary**: Blue (#0ea5e9)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)
- **Purple**: (#8b5cf6)

### Key Components
1. **Navbar** - Responsive navigation with mobile menu
2. **KPI Cards** - Metric display with icons
3. **Charts** - Pie, Bar, and Scatter charts
4. **Tables** - Sortable data tables
5. **Upload Area** - Drag-and-drop zone
6. **Tabs** - Dashboard section navigation

## 🚀 Getting Started

### Quick Start (Windows)
```bash
# Double-click to start both servers
start_all.bat
```

### Manual Start
```bash
# Terminal 1: Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Unix
pip install -r requirements.txt
python main.py

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📈 Usage Flow

1. **Upload Data**
   - Navigate to Upload page
   - Select or drag CSV/Excel file
   - Click "Analyze Dataset"

2. **View Results**
   - Automatically redirected to Dashboard
   - View KPIs and charts
   - Explore different tabs

3. **Get Insights**
   - Review segment recommendations
   - Check top customers
   - Understand customer behavior

4. **Export Results**
   - Click "Export Results" button
   - Download CSV file
   - Use in CRM or marketing tools

## 🔐 Security Considerations

- File uploads limited to CSV and Excel
- Data stored in memory (not persisted)
- CORS configured for local development
- Input validation on all endpoints
- No authentication (add for production)

## 🚀 Production Deployment

### Backend
```bash
# Build
pip install -r requirements.txt

# Run with production server
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
```bash
# Build
npm run build

# Serve with nginx or any static server
# Output in: frontend/dist/
```

### Environment Variables
- Set `CORS_ORIGINS` to production domain
- Configure `DATABASE_URL` if adding persistence
- Set appropriate `MAX_UPLOAD_SIZE`

## 📝 Future Enhancements

### Potential Features
- [ ] User authentication and authorization
- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] Historical analysis and trends
- [ ] Email campaign integration
- [ ] Advanced filtering and search
- [ ] Custom segment definitions
- [ ] Scheduled analysis reports
- [ ] Multi-tenant support
- [ ] API rate limiting
- [ ] Data encryption

### Technical Improvements
- [ ] Unit tests (pytest, jest)
- [ ] Integration tests
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] Monitoring and logging
- [ ] Performance optimization
- [ ] Caching layer (Redis)

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Unix
lsof -ti:8000 | xargs kill -9
```

**Module Not Found**
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

**CORS Errors**
- Ensure backend is running on port 8000
- Check vite.config.js proxy settings
- Verify CORS middleware in main.py

**File Upload Fails**
- Check file format (CSV or Excel only)
- Verify required columns exist
- Ensure file size is reasonable

## 📞 Support

For issues or questions:
1. Check the Documentation page in the app
2. Review README.md files
3. Check API documentation at /docs
4. Review error messages carefully

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for data-driven customer insights**
