import React from 'react'
import { Book, Code, Database, Zap, CheckCircle } from 'lucide-react'

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Book className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">
            Complete guide to using the RFM Analytics Platform
          </p>
        </div>

        {/* Quick Start */}
        <Section
          icon={<Zap className="h-8 w-8 text-yellow-600" />}
          title="Quick Start Guide"
        >
          <ol className="space-y-4">
            <Step number="1" title="Prepare Your Data">
              Ensure your data file (CSV or Excel) contains the following columns:
              <ul className="mt-2 ml-6 space-y-1">
                <li>• <code>CustomerID</code> - Unique identifier for each customer</li>
                <li>• <code>InvoiceDate</code> - Date of the transaction</li>
                <li>• <code>Quantity</code> - Number of items purchased</li>
                <li>• <code>Price</code> - Price per item</li>
                <li>• <code>CustomerName</code> - (Optional) Customer name</li>
              </ul>
            </Step>
            <Step number="2" title="Upload Your Dataset">
              Navigate to the Upload page and either drag-and-drop your file or click "Browse Files" to select it.
            </Step>
            <Step number="3" title="Analyze">
              Click "Analyze Dataset" and wait for the processing to complete. This typically takes a few seconds.
            </Step>
            <Step number="4" title="View Results">
              You'll be automatically redirected to the Dashboard where you can explore your customer segments, insights, and recommendations.
            </Step>
            <Step number="5" title="Export">
              Download your RFM analysis results as a CSV file for further use in your CRM or marketing tools.
            </Step>
          </ol>
        </Section>

        {/* Data Format */}
        <Section
          icon={<Database className="h-8 w-8 text-blue-600" />}
          title="Data Format Requirements"
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Supported File Formats</h4>
              <ul className="ml-6 space-y-1">
                <li>• CSV (.csv)</li>
                <li>• Excel (.xlsx, .xls)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Column Requirements</h4>
              <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4">Column</th>
                      <th className="text-left py-2 pr-4">Required</th>
                      <th className="text-left py-2 pr-4">Type</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary-700">CustomerID</td>
                      <td className="py-2 pr-4">Yes</td>
                      <td className="py-2 pr-4">String/Number</td>
                      <td className="py-2">Unique customer identifier</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary-700">InvoiceDate</td>
                      <td className="py-2 pr-4">Yes</td>
                      <td className="py-2 pr-4">Date</td>
                      <td className="py-2">Transaction date (any standard format)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary-700">Quantity</td>
                      <td className="py-2 pr-4">Yes</td>
                      <td className="py-2 pr-4">Number</td>
                      <td className="py-2">Number of items purchased</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary-700">Price</td>
                      <td className="py-2 pr-4">Yes</td>
                      <td className="py-2 pr-4">Number</td>
                      <td className="py-2">Price per item</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary-700">CustomerName</td>
                      <td className="py-2 pr-4">No</td>
                      <td className="py-2 pr-4">String</td>
                      <td className="py-2">Customer name (optional)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Data</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-sm">
                <pre>{`CustomerID,CustomerName,InvoiceDate,Quantity,Price
C001,John Smith,2024-01-15,2,29.99
C001,John Smith,2024-02-20,1,49.99
C002,Jane Doe,2024-01-10,3,19.99
C002,Jane Doe,2024-03-05,2,39.99
C003,Bob Johnson,2024-02-01,1,99.99`}</pre>
              </div>
            </div>
          </div>
        </Section>

        {/* API Reference */}
        <Section
          icon={<Code className="h-8 w-8 text-green-600" />}
          title="API Reference"
        >
          <div className="space-y-6">
            <APIEndpoint
              method="POST"
              endpoint="/api/upload"
              description="Upload and process customer transaction data"
              request={{
                type: "multipart/form-data",
                body: "file: CSV or Excel file"
              }}
              response={{
                message: "File uploaded and processed successfully",
                rows: 1000,
                customers: 250,
                filename: "transactions.csv"
              }}
            />

            <APIEndpoint
              method="GET"
              endpoint="/api/summary"
              description="Get RFM analysis summary statistics"
              response={{
                total_customers: 250,
                total_revenue: 125000.50,
                total_segments: 7,
                top_segment: "Champions",
                avg_recency: 45.2,
                avg_frequency: 8.5,
                avg_monetary: 500.00
              }}
            />

            <APIEndpoint
              method="GET"
              endpoint="/api/distribution"
              description="Get segment distribution and revenue data"
              response={{
                segment_distribution: [
                  { segment: "Champions", count: 50, percentage: 20.0 }
                ],
                revenue_by_segment: [
                  { segment: "Champions", revenue: 50000.00 }
                ]
              }}
            />

            <APIEndpoint
              method="GET"
              endpoint="/api/insights"
              description="Get customer insights and recommendations"
              response={{
                insights: [
                  {
                    segment: "Champions",
                    count: 50,
                    revenue: 50000.00,
                    percentage: 20.0,
                    recommendation: "Reward these customers...",
                    icon: "trophy"
                  }
                ],
                top_customers: []
              }}
            />

            <APIEndpoint
              method="GET"
              endpoint="/api/scatter-data"
              description="Get scatter plot data for visualization"
              response={{
                data: [
                  { recency: 10, frequency: 15, monetary: 1500, segment: "Champions" }
                ],
                total_points: 250,
                displayed_points: 250
              }}
            />

            <APIEndpoint
              method="GET"
              endpoint="/api/export"
              description="Export RFM results as CSV file"
              response="CSV file download"
            />
          </div>
        </Section>

        {/* RFM Segments */}
        <Section
          icon={<CheckCircle className="h-8 w-8 text-purple-600" />}
          title="Customer Segments Explained"
        >
          <div className="space-y-4">
            <SegmentDoc
              name="Champions"
              criteria="R: 4-5, F: 4-5, M: 4-5"
              description="Your best customers who buy frequently and spend the most. They are highly engaged and loyal."
              action="Reward them with exclusive offers, early access to new products, and VIP treatment."
            />
            <SegmentDoc
              name="Loyal"
              criteria="F: 4-5, M: 3-5"
              description="Regular customers with high purchase frequency and good spending levels."
              action="Maintain engagement with regular communication, loyalty rewards, and appreciation."
            />
            <SegmentDoc
              name="Promising"
              criteria="R: 4-5, F: 2-3"
              description="Recent customers with potential to become loyal. They've made recent purchases but not frequently yet."
              action="Nurture with loyalty programs, personalized recommendations, and engagement campaigns."
            />
            <SegmentDoc
              name="At Risk"
              criteria="R: 1-2, F: 3-5, M: 3-5"
              description="Previously good customers who haven't purchased recently. Risk of churning."
              action="Send win-back campaigns with special offers and personalized messages to re-engage."
            />
            <SegmentDoc
              name="Hibernating"
              criteria="R: 1-2, F: 1-2"
              description="Inactive customers with low engagement across all metrics."
              action="Consider re-engagement campaigns or remove from active marketing to reduce costs."
            />
            <SegmentDoc
              name="Cannot Lose"
              criteria="R: 1-2, F: 4-5, M: 4-5"
              description="High-value customers who used to purchase frequently but haven't recently."
              action="Immediate action required. Send personalized offers and reach out directly."
            />
            <SegmentDoc
              name="New Customers"
              criteria="R: 4-5, F: 1-2"
              description="Recent first-time or low-frequency buyers. Great opportunity to build loyalty."
              action="Welcome campaigns, onboarding sequences, and incentives for second purchase."
            />
          </div>
        </Section>

        {/* Best Practices */}
        <Section
          icon={<CheckCircle className="h-8 w-8 text-green-600" />}
          title="Best Practices"
        >
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span><strong>Regular Analysis:</strong> Run RFM analysis monthly or quarterly to track customer behavior changes</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span><strong>Clean Data:</strong> Ensure your data is clean and accurate before uploading</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span><strong>Segment-Specific Campaigns:</strong> Create targeted marketing campaigns for each segment</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span><strong>Track Progress:</strong> Monitor how customers move between segments over time</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span><strong>Combine with Other Data:</strong> Use RFM insights alongside other customer data for deeper understanding</span>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  )
}

const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
    <div className="flex items-center space-x-3 mb-6">
      {icon}
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
)

const Step = ({ number, title, children }) => (
  <li className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <div className="text-gray-600">{children}</div>
    </div>
  </li>
)

const APIEndpoint = ({ method, endpoint, description, request, response }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <div className="flex items-center space-x-3 mb-2">
      <span className={`px-3 py-1 rounded font-semibold text-sm ${
        method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
      }`}>
        {method}
      </span>
      <code className="text-lg font-mono text-gray-900">{endpoint}</code>
    </div>
    <p className="text-gray-600 mb-3">{description}</p>
    {request && (
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-700 mb-1">Request:</p>
        <div className="bg-gray-50 rounded p-2 text-sm font-mono">
          <p>Content-Type: {request.type}</p>
          <p>{request.body}</p>
        </div>
      </div>
    )}
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-1">Response:</p>
      <div className="bg-gray-900 text-gray-100 rounded p-3 text-sm font-mono overflow-x-auto">
        <pre>{typeof response === 'string' ? response : JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  </div>
)

const SegmentDoc = ({ name, criteria, description, action }) => (
  <div className="border-l-4 border-primary-500 bg-gray-50 rounded-r-lg p-4">
    <h4 className="text-lg font-bold text-gray-900 mb-1">{name}</h4>
    <p className="text-sm font-mono text-gray-600 mb-2">{criteria}</p>
    <p className="text-gray-700 mb-2">{description}</p>
    <div className="bg-white rounded p-2">
      <p className="text-sm"><strong className="text-primary-700">Action:</strong> {action}</p>
    </div>
  </div>
)

export default Documentation
