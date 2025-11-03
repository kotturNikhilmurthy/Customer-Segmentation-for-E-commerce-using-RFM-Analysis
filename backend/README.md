# RFM Analytics Backend

FastAPI backend for RFM (Recency, Frequency, Monetary) customer segmentation analysis.

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Environment Variables

No environment variables required for basic operation. All data is stored in memory.

## API Endpoints

- `POST /upload` - Upload customer transaction data
- `GET /summary` - Get RFM analysis summary
- `GET /distribution` - Get segment distribution
- `GET /insights` - Get customer insights
- `GET /scatter-data` - Get scatter plot data
- `GET /export` - Export results as CSV
