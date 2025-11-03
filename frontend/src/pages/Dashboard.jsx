import React, { useState, useEffect } from 'react'
import { Users, DollarSign, PieChart, TrendingUp, Download, AlertCircle } from 'lucide-react'
import axios from 'axios'
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('distribution')
  const [summary, setSummary] = useState(null)
  const [distribution, setDistribution] = useState(null)
  const [insights, setInsights] = useState(null)
  const [scatterData, setScatterData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [summaryRes, distributionRes, insightsRes, scatterRes] = await Promise.all([
        axios.get('/api/summary'),
        axios.get('/api/distribution'),
        axios.get('/api/insights'),
        axios.get('/api/scatter-data')
      ])

      setSummary(summaryRes.data)
      setDistribution(distributionRes.data)
      setInsights(insightsRes.data)
      setScatterData(scatterRes.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.detail || 'No data available. Please upload a dataset first.')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/export', {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'rfm_analysis_results.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error('Error exporting data:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/upload"
            className="inline-block px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Upload Dataset
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">RFM Analysis Dashboard</h1>
            <p className="text-gray-600">Comprehensive customer segmentation insights</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Results
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Total Customers"
            value={summary?.total_customers?.toLocaleString() || '0'}
            bgColor="bg-blue-50"
          />
          <KPICard
            icon={<DollarSign className="h-8 w-8 text-green-600" />}
            title="Total Revenue"
            value={`₹${summary?.total_revenue?.toLocaleString('en-IN', { maximumFractionDigits: 0 }) || '0'}`}
            bgColor="bg-green-50"
          />
          <KPICard
            icon={<PieChart className="h-8 w-8 text-purple-600" />}
            title="Segments"
            value={summary?.total_segments || '0'}
            bgColor="bg-purple-50"
          />
          <KPICard
            icon={<TrendingUp className="h-8 w-8 text-orange-600" />}
            title="Top Segment"
            value={summary?.top_segment || 'N/A'}
            subtitle={`${summary?.top_segment_count || 0} customers`}
            bgColor="bg-orange-50"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <TabButton
                active={activeTab === 'distribution'}
                onClick={() => setActiveTab('distribution')}
                label="Segment Distribution"
              />
              <TabButton
                active={activeTab === 'revenue'}
                onClick={() => setActiveTab('revenue')}
                label="Revenue Analysis"
              />
              <TabButton
                active={activeTab === 'scatter'}
                onClick={() => setActiveTab('scatter')}
                label="RFM Scatter Plot"
              />
              <TabButton
                active={activeTab === 'insights'}
                onClick={() => setActiveTab('insights')}
                label="Insights"
              />
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'distribution' && (
              <DistributionTab data={distribution?.segment_distribution} />
            )}
            {activeTab === 'revenue' && (
              <RevenueTab data={distribution?.revenue_by_segment} />
            )}
            {activeTab === 'scatter' && (
              <ScatterTab data={scatterData?.data} />
            )}
            {activeTab === 'insights' && (
              <InsightsTab insights={insights?.insights} topCustomers={insights?.top_customers} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const KPICard = ({ icon, title, value, subtitle, bgColor }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className={`${bgColor} rounded-lg p-3 w-fit mb-4`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
)

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
      active
        ? 'border-b-2 border-primary-600 text-primary-600'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {label}
  </button>
)

const DistributionTab = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D', '#C084FC']

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Segment Distribution</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                nameKey="segment"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0ea5e9" name="Customer Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {data?.map((segment, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div>
                <p className="font-semibold text-gray-900">{segment.segment}</p>
                <p className="text-sm text-gray-600">
                  {segment.count} customers ({segment.percentage}%)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const RevenueTab = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue by Customer Segment</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="segment" type="category" width={120} />
          <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
          <Legend />
          <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((segment, index) => (
          <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-1">{segment.segment}</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{segment.revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ScatterTab = ({ data }) => {
  const COLORS = {
    'Champions': '#10b981',
    'Loyal': '#3b82f6',
    'Promising': '#8b5cf6',
    'At Risk': '#f59e0b',
    'Hibernating': '#6b7280',
    'Cannot Lose': '#ef4444',
    'New Customers': '#06b6d4',
    'Need Attention': '#f97316',
    'Others': '#9ca3af'
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">RFM Scatter Plot Analysis</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recency vs Monetary</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="recency" name="Recency (days)" />
              <YAxis dataKey="monetary" name="Monetary (₹)" />
              <ZAxis range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              {Object.keys(COLORS).map((segment) => (
                <Scatter
                  key={segment}
                  name={segment}
                  data={data?.filter(d => d.segment === segment)}
                  fill={COLORS[segment]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Frequency vs Monetary</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="frequency" name="Frequency" />
              <YAxis dataKey="monetary" name="Monetary (₹)" />
              <ZAxis range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              {Object.keys(COLORS).map((segment) => (
                <Scatter
                  key={segment}
                  name={segment}
                  data={data?.filter(d => d.segment === segment)}
                  fill={COLORS[segment]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

const InsightsTab = ({ insights, topCustomers }) => {
  const getIcon = (iconName) => {
    const icons = {
      'trophy': '🏆',
      'alert-triangle': '⚠️',
      'moon': '😴',
      'trending-up': '📈',
      'heart': '❤️'
    }
    return icons[iconName] || '📊'
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Insights & Recommendations</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {insights?.map((insight, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{getIcon(insight.icon)}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{insight.segment}</h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Customers</p>
                    <p className="text-lg font-bold text-primary-700">{insight.count}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-lg font-bold text-green-700">
                      ₹{insight.revenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-lg font-bold text-purple-700">
                      {insight.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Recommendation:</p>
                  <p className="text-sm text-gray-600">{insight.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Customers by Revenue</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer ID
                </th>
                {topCustomers?.[0]?.customername && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomers?.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.customerid}
                  </td>
                  {customer.customername && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.customername}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₹{customer.monetary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer.recency} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {customer.segment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
