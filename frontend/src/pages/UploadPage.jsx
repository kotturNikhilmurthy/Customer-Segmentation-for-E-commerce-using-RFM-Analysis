import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import axios from 'axios'

const UploadPage = ({ setAnalysisData }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate()

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setError(null)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess(`Successfully processed ${response.data.customers} customers from ${response.data.rows} transactions`)
      setAnalysisData(response.data)
      
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error uploading file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Customer Data
          </h1>
          <p className="text-xl text-gray-600">
            Upload a CSV or Excel file containing your customer transaction data
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Drag and drop your file here
            </p>
            <p className="text-gray-500 mb-4">or</p>
            <label className="inline-block">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-primary-700 transition-colors inline-block">
                Browse Files
              </span>
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: CSV, Excel (.xlsx, .xls)
            </p>
          </div>

          {/* Selected File */}
          {file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-all ${
              !file || uploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'gradient-primary text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Analyzing Dataset...
              </span>
            ) : (
              'Analyze Dataset'
            )}
          </button>

          {/* Success Message */}
          {success && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Success!</p>
                <p className="text-green-700">{success}</p>
                <p className="text-sm text-green-600 mt-1">Redirecting to dashboard...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Data Format Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Required Data Format
          </h3>
          <p className="text-gray-600 mb-4">
            Your CSV or Excel file should contain the following columns:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="font-semibold text-primary-700">CustomerID</p>
                <p className="text-gray-600">Required</p>
              </div>
              <div>
                <p className="font-semibold text-primary-700">CustomerName</p>
                <p className="text-gray-600">Optional</p>
              </div>
              <div>
                <p className="font-semibold text-primary-700">InvoiceDate</p>
                <p className="text-gray-600">Required</p>
              </div>
              <div>
                <p className="font-semibold text-primary-700">Quantity</p>
                <p className="text-gray-600">Required</p>
              </div>
              <div>
                <p className="font-semibold text-primary-700">Price</p>
                <p className="text-gray-600">Required</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Note:</strong> Column names are case-insensitive. Alternative names like 
            Customer_ID, invoice_date, UnitPrice, etc. are also accepted.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
