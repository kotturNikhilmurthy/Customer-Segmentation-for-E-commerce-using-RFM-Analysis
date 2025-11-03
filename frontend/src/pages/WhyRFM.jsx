import React from 'react'
import { Users, TrendingUp, Target, Zap, Shield, BarChart3 } from 'lucide-react'

const WhyRFM = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Why RFM Analysis?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how RFM analysis can transform your customer strategy and drive business growth
          </p>
        </div>

        {/* Main Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <BenefitCard
            icon={<Users className="h-12 w-12 text-blue-600" />}
            title="Customer Segmentation"
            description="Automatically group customers based on their behavior patterns, enabling targeted marketing strategies for each segment."
            benefits={[
              "Identify your best customers",
              "Find at-risk customers before they churn",
              "Discover new customer opportunities",
              "Personalize customer experiences"
            ]}
          />
          <BenefitCard
            icon={<TrendingUp className="h-12 w-12 text-green-600" />}
            title="Revenue Optimization"
            description="Maximize ROI by focusing resources on high-value customers and re-engaging those at risk of churning."
            benefits={[
              "Increase customer lifetime value",
              "Reduce customer acquisition costs",
              "Improve marketing spend efficiency",
              "Boost overall revenue growth"
            ]}
          />
          <BenefitCard
            icon={<Target className="h-12 w-12 text-purple-600" />}
            title="Data-Driven Decisions"
            description="Make informed business decisions based on concrete customer behavior data rather than assumptions."
            benefits={[
              "Eliminate guesswork in marketing",
              "Predict customer behavior",
              "Measure campaign effectiveness",
              "Track customer trends over time"
            ]}
          />
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real-World Use Cases
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <UseCaseCard
              title="E-Commerce Retailers"
              description="Identify VIP customers for exclusive offers and re-engage dormant shoppers with personalized campaigns."
              metrics={[
                "30% increase in repeat purchases",
                "25% reduction in churn rate",
                "40% improvement in email open rates"
              ]}
            />
            <UseCaseCard
              title="Subscription Services"
              description="Predict churn before it happens and implement retention strategies for at-risk subscribers."
              metrics={[
                "20% decrease in subscription cancellations",
                "35% increase in upsell success",
                "50% better customer retention"
              ]}
            />
            <UseCaseCard
              title="B2B Companies"
              description="Prioritize high-value accounts and optimize sales team focus on the most promising opportunities."
              metrics={[
                "45% increase in account expansion",
                "30% shorter sales cycles",
                "60% better lead qualification"
              ]}
            />
            <UseCaseCard
              title="Marketing Agencies"
              description="Demonstrate clear ROI to clients by showing improved customer engagement and revenue metrics."
              metrics={[
                "2x improvement in campaign ROI",
                "40% better targeting accuracy",
                "55% increase in conversion rates"
              ]}
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-600" />}
              title="Fast & Easy"
              description="Upload your data and get insights in minutes, not hours"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-green-600" />}
              title="Secure & Private"
              description="Your data is processed securely and never shared"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
              title="Visual Insights"
              description="Beautiful charts and dashboards for easy understanding"
            />
            <FeatureCard
              icon={<Target className="h-8 w-8 text-red-600" />}
              title="Actionable Recommendations"
              description="Get specific actions for each customer segment"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-purple-600" />}
              title="Automatic Segmentation"
              description="AI-powered customer grouping with no manual work"
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-indigo-600" />}
              title="Export Results"
              description="Download your analysis for further use"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Impact of RFM Analysis
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="80%"
              label="of revenue comes from 20% of customers"
              color="text-blue-600"
            />
            <StatCard
              value="5x"
              label="more expensive to acquire new customers than retain existing ones"
              color="text-green-600"
            />
            <StatCard
              value="60-70%"
              label="probability of selling to existing customers"
              color="text-purple-600"
            />
            <StatCard
              value="25%"
              label="increase in profits with 5% increase in retention"
              color="text-red-600"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="gradient-bg rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Unlock Your Customer Insights?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Start analyzing your customer data today and make data-driven decisions
          </p>
          <a
            href="/upload"
            className="inline-block px-8 py-4 bg-white text-purple-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  )
}

const BenefitCard = ({ icon, title, description, benefits }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span className="text-gray-700">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
)

const UseCaseCard = ({ title, description, metrics }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-700">Key Results:</p>
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center">
          <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
          <span className="text-sm text-gray-700">{metric}</span>
        </div>
      ))}
    </div>
  </div>
)

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
    <div className="flex items-center space-x-3 mb-3">
      {icon}
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
)

const StatCard = ({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-5xl font-bold mb-2 ${color}`}>{value}</div>
    <p className="text-gray-600">{label}</p>
  </div>
)

export default WhyRFM
