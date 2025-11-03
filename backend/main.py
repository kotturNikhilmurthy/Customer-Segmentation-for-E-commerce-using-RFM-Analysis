from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import io
import os
from typing import Dict, Any
import json

app = FastAPI(title="RFM Analytics API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global storage for uploaded data
uploaded_data = {
    "df": None,
    "rfm_df": None,
    "current_date": None
}

def calculate_rfm(df: pd.DataFrame) -> pd.DataFrame:
    """Calculate RFM scores for customer data"""
    
    # Ensure proper column names (case-insensitive)
    df.columns = df.columns.str.strip().str.lower()
    
    # Map common column name variations
    column_mapping = {
        'customerid': 'customerid',
        'customer_id': 'customerid',
        'customername': 'customername',
        'customer_name': 'customername',
        'invoicedate': 'invoicedate',
        'invoice_date': 'invoicedate',
        'date': 'invoicedate',
        'quantity': 'quantity',
        'qty': 'quantity',
        'price': 'price',
        'unitprice': 'price',
        'unit_price': 'price'
    }
    
    df.rename(columns=column_mapping, inplace=True)
    
    # Validate required columns
    required_cols = ['customerid', 'invoicedate', 'quantity', 'price']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns: {missing_cols}")
    
    # Convert types
    # Convert date column to datetime
    df['invoicedate'] = pd.to_datetime(df['invoicedate'], errors='coerce')
    df = df.dropna(subset=['invoicedate'])
    # Ensure numeric quantity/price
    df['quantity'] = pd.to_numeric(df['quantity'], errors='coerce')
    df['price'] = pd.to_numeric(df['price'], errors='coerce')
    df = df.dropna(subset=['quantity', 'price'])
    
    # Calculate total amount and convert to INR (1 USD = 88 INR)
    df['totalamount'] = df['quantity'] * df['price'] * 88
    
    # Get current date (use max date in dataset + 1 day as reference)
    current_date = df['invoicedate'].max() + timedelta(days=1)
    uploaded_data['current_date'] = current_date
    
    # Calculate RFM metrics using named aggregation to avoid column collisions
    rfm = (
        df.groupby('customerid')
          .agg(
              recency=('invoicedate', lambda x: (current_date - x.max()).days),
              frequency=('invoicedate', 'count'),  # number of transactions/rows
              monetary=('totalamount', 'sum')
          )
          .reset_index()
    )
    
    # Add customer name if available
    if 'customername' in df.columns:
        customer_names = df.groupby('customerid')['customername'].first().reset_index()
        rfm = rfm.merge(customer_names, on='customerid', how='left')
    
    # Calculate RFM scores (1-5, where 5 is best)
    # For Recency: lower is better, so we reverse the quantile
    rfm['r_score'] = pd.qcut(rfm['recency'], q=5, labels=[5, 4, 3, 2, 1], duplicates='drop')
    rfm['f_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5], duplicates='drop')
    rfm['m_score'] = pd.qcut(rfm['monetary'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5], duplicates='drop')
    
    # Convert to numeric
    rfm['r_score'] = rfm['r_score'].astype(int)
    rfm['f_score'] = rfm['f_score'].astype(int)
    rfm['m_score'] = rfm['m_score'].astype(int)
    
    # Calculate RFM score
    rfm['rfm_score'] = rfm['r_score'].astype(str) + rfm['f_score'].astype(str) + rfm['m_score'].astype(str)
    rfm['rfm_score_numeric'] = rfm['r_score'] + rfm['f_score'] + rfm['m_score']
    
    # Assign segments
    rfm['segment'] = rfm.apply(assign_segment, axis=1)
    
    return rfm

def assign_segment(row) -> str:
    """Assign customer segment based on RFM scores"""
    r, f, m = row['r_score'], row['f_score'], row['m_score']
    
    # Champions: High R, F, M
    if r >= 4 and f >= 4 and m >= 4:
        return 'Champions'
    
    # Loyal Customers: High F
    elif f >= 4 and m >= 3:
        return 'Loyal'
    
    # Potential Loyalists: Recent customers with average frequency
    elif r >= 4 and f >= 2 and f <= 3:
        return 'Promising'
    
    # At Risk: Used to be good customers
    elif r <= 2 and f >= 3 and m >= 3:
        return 'At Risk'
    
    # Hibernating: Low R, F, M
    elif r <= 2 and f <= 2:
        return 'Hibernating'
    
    # Can't Lose Them: High spenders who haven't purchased recently
    elif r <= 2 and f >= 4 and m >= 4:
        return 'Cannot Lose'
    
    # New Customers: Recent but low frequency
    elif r >= 4 and f <= 2:
        return 'New Customers'
    
    # Need Attention: Below average recency, frequency & monetary
    elif r >= 3 and f >= 2 and m >= 2:
        return 'Need Attention'
    
    else:
        return 'Others'

@app.get("/")
async def root():
    return {"message": "RFM Analytics API", "version": "1.0.0"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload and process customer transaction data"""
    try:
        # Read file
        contents = await file.read()
        
        # Determine file type and read accordingly
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(contents))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload CSV or Excel file.")
        
        # Store original data
        uploaded_data['df'] = df
        
        # Calculate RFM
        rfm_df = calculate_rfm(df.copy())
        uploaded_data['rfm_df'] = rfm_df
        
        return {
            "message": "File uploaded and processed successfully",
            "rows": len(df),
            "customers": len(rfm_df),
            "filename": file.filename
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.get("/summary")
async def get_summary():
    """Get RFM analysis summary"""
    if uploaded_data['rfm_df'] is None:
        raise HTTPException(status_code=404, detail="No data uploaded. Please upload a dataset first.")
    
    rfm_df = uploaded_data['rfm_df']
    
    # Calculate summary statistics
    total_customers = len(rfm_df)
    total_revenue = rfm_df['monetary'].sum()
    avg_recency = rfm_df['recency'].mean()
    avg_frequency = rfm_df['frequency'].mean()
    avg_monetary = rfm_df['monetary'].mean()
    
    # Segment counts
    segment_counts = rfm_df['segment'].value_counts().to_dict()
    total_segments = len(segment_counts)
    
    # Top segment
    top_segment = rfm_df['segment'].value_counts().index[0]
    top_segment_count = rfm_df['segment'].value_counts().values[0]
    
    return {
        "total_customers": int(total_customers),
        "total_revenue": float(total_revenue),
        "total_segments": int(total_segments),
        "top_segment": top_segment,
        "top_segment_count": int(top_segment_count),
        "avg_recency": float(avg_recency),
        "avg_frequency": float(avg_frequency),
        "avg_monetary": float(avg_monetary),
        "segment_counts": segment_counts
    }

@app.get("/distribution")
async def get_distribution():
    """Get segment distribution for charts"""
    if uploaded_data['rfm_df'] is None:
        raise HTTPException(status_code=404, detail="No data uploaded. Please upload a dataset first.")
    
    rfm_df = uploaded_data['rfm_df']
    
    # Segment distribution
    segment_dist = rfm_df['segment'].value_counts().reset_index()
    segment_dist.columns = ['segment', 'count']
    segment_dist['percentage'] = (segment_dist['count'] / len(rfm_df) * 100).round(2)
    
    # Revenue by segment
    revenue_by_segment = rfm_df.groupby('segment')['monetary'].sum().reset_index()
    revenue_by_segment.columns = ['segment', 'revenue']
    revenue_by_segment = revenue_by_segment.sort_values('revenue', ascending=False)
    
    # RFM score distribution
    score_dist = rfm_df['rfm_score_numeric'].value_counts().sort_index().reset_index()
    score_dist.columns = ['score', 'count']
    
    return {
        "segment_distribution": segment_dist.to_dict('records'),
        "revenue_by_segment": revenue_by_segment.to_dict('records'),
        "score_distribution": score_dist.to_dict('records')
    }

@app.get("/insights")
async def get_insights():
    """Get customer insights and recommendations"""
    if uploaded_data['rfm_df'] is None:
        raise HTTPException(status_code=404, detail="No data uploaded. Please upload a dataset first.")
    
    rfm_df = uploaded_data['rfm_df']
    
    insights = []
    
    # Champions insight
    champions = rfm_df[rfm_df['segment'] == 'Champions']
    if len(champions) > 0:
        insights.append({
            "segment": "Champions",
            "count": int(len(champions)),
            "revenue": float(champions['monetary'].sum()),
            "percentage": float(len(champions) / len(rfm_df) * 100),
            "recommendation": "Reward these customers with exclusive offers and early access to new products. They are your best advocates.",
            "icon": "trophy"
        })
    
    # At Risk insight
    at_risk = rfm_df[rfm_df['segment'] == 'At Risk']
    if len(at_risk) > 0:
        insights.append({
            "segment": "At Risk",
            "count": int(len(at_risk)),
            "revenue": float(at_risk['monetary'].sum()),
            "percentage": float(len(at_risk) / len(rfm_df) * 100),
            "recommendation": "Send personalized win-back campaigns. Offer special discounts to re-engage them.",
            "icon": "alert-triangle"
        })
    
    # Hibernating insight
    hibernating = rfm_df[rfm_df['segment'] == 'Hibernating']
    if len(hibernating) > 0:
        insights.append({
            "segment": "Hibernating",
            "count": int(len(hibernating)),
            "revenue": float(hibernating['monetary'].sum()),
            "percentage": float(len(hibernating) / len(rfm_df) * 100),
            "recommendation": "Consider re-engagement campaigns or remove from active marketing to reduce costs.",
            "icon": "moon"
        })
    
    # Promising insight
    promising = rfm_df[rfm_df['segment'] == 'Promising']
    if len(promising) > 0:
        insights.append({
            "segment": "Promising",
            "count": int(len(promising)),
            "revenue": float(promising['monetary'].sum()),
            "percentage": float(len(promising) / len(rfm_df) * 100),
            "recommendation": "Nurture these customers with loyalty programs to increase their frequency and value.",
            "icon": "trending-up"
        })
    
    # Loyal insight
    loyal = rfm_df[rfm_df['segment'] == 'Loyal']
    if len(loyal) > 0:
        insights.append({
            "segment": "Loyal",
            "count": int(len(loyal)),
            "revenue": float(loyal['monetary'].sum()),
            "percentage": float(len(loyal) / len(rfm_df) * 100),
            "recommendation": "Maintain engagement with regular communication and appreciation rewards.",
            "icon": "heart"
        })
    
    # Top customers
    top_customers = rfm_df.nlargest(10, 'monetary')[['customerid', 'monetary', 'frequency', 'recency', 'segment']]
    if 'customername' in rfm_df.columns:
        top_customers = rfm_df.nlargest(10, 'monetary')[['customerid', 'customername', 'monetary', 'frequency', 'recency', 'segment']]
    
    return {
        "insights": insights,
        "top_customers": top_customers.to_dict('records')
    }

@app.get("/scatter-data")
async def get_scatter_data():
    """Get scatter plot data for RFM visualization"""
    if uploaded_data['rfm_df'] is None:
        raise HTTPException(status_code=404, detail="No data uploaded. Please upload a dataset first.")
    
    rfm_df = uploaded_data['rfm_df']
    
    # Sample data if too large (for performance)
    if len(rfm_df) > 1000:
        scatter_df = rfm_df.sample(1000)
    else:
        scatter_df = rfm_df
    
    scatter_data = scatter_df[['recency', 'frequency', 'monetary', 'segment']].to_dict('records')
    
    return {
        "data": scatter_data,
        "total_points": len(rfm_df),
        "displayed_points": len(scatter_data)
    }

@app.get("/export")
async def export_results():
    """Export RFM results as CSV"""
    if uploaded_data['rfm_df'] is None:
        raise HTTPException(status_code=404, detail="No data uploaded. Please upload a dataset first.")
    
    rfm_df = uploaded_data['rfm_df']
    
    # Create export file
    output_file = "rfm_results.csv"
    rfm_df.to_csv(output_file, index=False)
    
    return FileResponse(
        output_file,
        media_type="text/csv",
        filename="rfm_analysis_results.csv"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
