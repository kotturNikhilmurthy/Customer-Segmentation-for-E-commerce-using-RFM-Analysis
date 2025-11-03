import React from 'react'
import { Calendar, Repeat, DollarSign, BarChart3, Users, Target } from 'lucide-react'

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            How RFM Analysis Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the three key metrics that power customer segmentation
          </p>
        </div>

        {/* RFM Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <MetricCard
            icon={<Calendar className="h-16 w-16 text-blue-600" />}
            title="Recency (R)"
            subtitle="When did they last purchase?"
            description="Measures how recently a customer made a purchase. Customers who purchased recently are more likely to respond to new offers."
            formula="Current Date - Last Purchase Date"
            example="A customer who purchased 5 days ago has better recency than one who purchased 50 days ago"
            color="blue"
          />
          <MetricCard
            icon={<Repeat className="h-16 w-16 text-green-600" />}
            title="Frequency (F)"
            subtitle="How often do they purchase?"
            description="Counts the total number of purchases. Frequent customers show higher engagement and loyalty to your brand."
            formula="Total Number of Purchases"
            example="A customer with 10 purchases has higher frequency than one with 2 purchases"
            color="green"
          />
          <MetricCard
            icon={<DollarSign className="h-16 w-16 text-purple-600" />}
            title="Monetary (M)"
            subtitle="How much do they spend?"
            description="Calculates the total amount spent. High-value customers contribute more to your revenue and profitability."
            formula="Sum of (Quantity × Price)"
            example="A customer who spent $5,000 has higher monetary value than one who spent $500"
            color="purple"
          />
        </div>

        {/* Scoring System */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Scoring System
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Each customer receives a score from 1-5 for each metric, where 5 is the best. 
            Scores are calculated using quantile-based segmentation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ScoreCard
              title="Recency Score"
              description="Lower days = Higher score"
              scores={[
                { score: 5, desc: "0-20 days" },
                { score: 4, desc: "21-40 days" },
                { score: 3, desc: "41-60 days" },
                { score: 2, desc: "61-80 days" },
                { score: 1, desc: "80+ days" }
              ]}
            />
            <ScoreCard
              title="Frequency Score"
              description="More purchases = Higher score"
              scores={[
                { score: 5, desc: "20+ purchases" },
                { score: 4, desc: "15-19 purchases" },
                { score: 3, desc: "10-14 purchases" },
                { score: 2, desc: "5-9 purchases" },
                { score: 1, desc: "1-4 purchases" }
              ]}
            />
            <ScoreCard
              title="Monetary Score"
              description="Higher spend = Higher score"
              scores={[
                { score: 5, desc: "$5000+" },
                { score: 4, desc: "$2000-$4999" },
                { score: 3, desc: "$1000-$1999" },
                { score: 2, desc: "$500-$999" },
                { score: 1, desc: "$0-$499" }
              ]}
            />
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Analysis Process
          </h2>
          
          <div className="space-y-6">
            <ProcessStep
              number="1"
              title="Data Collection"
              description="Upload your customer transaction data containing CustomerID, Date, Quantity, and Price"
              icon={<BarChart3 className="h-8 w-8" />}
            />
            <ProcessStep
              number="2"
              title="RFM Calculation"
              description="Our algorithm calculates Recency, Frequency, and Monetary values for each customer"
              icon={<Target className="h-8 w-8" />}
            />
            <ProcessStep
              number="3"
              title="Score Assignment"
              description="Customers are scored 1-5 on each metric using quantile-based segmentation"
              icon={<BarChart3 className="h-8 w-8" />}
            />
            <ProcessStep
              number="4"
              title="Customer Segmentation"
              description="Based on RFM scores, customers are grouped into segments like Champions, Loyal, At Risk, etc."
              icon={<Users className="h-8 w-8" />}
            />
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Customer Segments
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Customers are automatically categorized into actionable segments
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SegmentCard
              title="Champions"
              rfm="R: 4-5, F: 4-5, M: 4-5"
              description="Best customers who buy often and spend the most"
              color="bg-green-100 text-green-800"
            />
            <SegmentCard
              title="Loyal"
              rfm="F: 4-5, M: 3-5"
              description="Regular customers with high purchase frequency"
              color="bg-blue-100 text-blue-800"
            />
            <SegmentCard
              title="Promising"
              rfm="R: 4-5, F: 2-3"
              description="Recent customers with potential to become loyal"
              color="bg-purple-100 text-purple-800"
            />
            <SegmentCard
              title="At Risk"
              rfm="R: 1-2, F: 3-5, M: 3-5"
              description="Good customers who haven't purchased recently"
              color="bg-yellow-100 text-yellow-800"
            />
            <SegmentCard
              title="Hibernating"
              rfm="R: 1-2, F: 1-2"
              description="Inactive customers with low engagement"
              color="bg-gray-100 text-gray-800"
            />
            <SegmentCard
              title="New Customers"
              rfm="R: 4-5, F: 1-2"
              description="Recent first-time or low-frequency buyers"
              color="bg-indigo-100 text-indigo-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ icon, title, subtitle, description, formula, example, color }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
    <p className="text-sm text-gray-500 text-center mb-4">{subtitle}</p>
    <p className="text-gray-700 mb-4">{description}</p>
    <div className={`bg-${color}-50 rounded-lg p-3 mb-3`}>
      <p className="text-sm font-semibold text-gray-700 mb-1">Formula:</p>
      <p className={`font-mono text-sm text-${color}-700`}>{formula}</p>
    </div>
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-sm font-semibold text-gray-700 mb-1">Example:</p>
      <p className="text-sm text-gray-600">{example}</p>
    </div>
  </div>
)

const ScoreCard = ({ title, description, scores }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="space-y-2">
      {scores.map((item) => (
        <div key={item.score} className="flex items-center justify-between bg-white rounded p-2">
          <span className="font-semibold text-primary-700">Score {item.score}</span>
          <span className="text-sm text-gray-600">{item.desc}</span>
        </div>
      ))}
    </div>
  </div>
)

const ProcessStep = ({ number, title, description, icon }) => (
  <div className="flex items-start space-x-4 bg-white rounded-lg p-6 shadow">
    <div className="flex-shrink-0 w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
      {number}
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-primary-600">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

const SegmentCard = ({ title, rfm, description, color }) => (
  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${color}`}>
      {title}
    </div>
    <p className="text-sm text-gray-600 mb-2 font-mono">{rfm}</p>
    <p className="text-gray-700">{description}</p>
  </div>
)

export default HowItWorks
