import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Users, TrendingUp, Target } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Advanced Customer Segmentation Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Unlock the power of RFM Analysis to understand your customers better, 
              increase retention, and drive revenue growth with data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-700 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RFM Analytics?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your customer data into actionable insights with our powerful analytics platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="h-12 w-12 text-primary-600" />}
              title="Customer Segmentation"
              description="Automatically segment customers into meaningful groups based on their behavior patterns"
            />
            <FeatureCard
              icon={<TrendingUp className="h-12 w-12 text-primary-600" />}
              title="Revenue Optimization"
              description="Identify high-value customers and optimize marketing spend for maximum ROI"
            />
            <FeatureCard
              icon={<Target className="h-12 w-12 text-primary-600" />}
              title="Targeted Marketing"
              description="Create personalized campaigns for each customer segment to increase engagement"
            />
            <FeatureCard
              icon={<BarChart3 className="h-12 w-12 text-primary-600" />}
              title="Visual Analytics"
              description="Beautiful charts and dashboards to visualize your customer insights"
            />
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Get started with RFM analysis in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Upload Data"
              description="Upload your customer transaction data in CSV or Excel format"
            />
            <StepCard
              number="2"
              title="Analyze"
              description="Our algorithm calculates RFM scores and segments your customers"
            />
            <StepCard
              number="3"
              title="Take Action"
              description="Get actionable insights and recommendations for each segment"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/upload"
              className="inline-flex items-center px-8 py-4 gradient-primary text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Customer Strategy?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of businesses using RFM Analytics to drive growth
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Your Free Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const StepCard = ({ number, title, description }) => (
  <div className="relative bg-white p-8 rounded-xl shadow-lg">
    <div className="absolute -top-4 -left-4 w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
      {number}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default LandingPage
