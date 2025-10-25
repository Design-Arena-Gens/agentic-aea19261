'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Store, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Smartphone
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Store className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-POS Pro
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/register')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            The Future of Business
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete POS system with AI-powered business intelligence for restaurants, retail shops, 
            and any business type. Increase profits with smart insights and automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <Zap className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Everything You Need to Run Your Business
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Powerful features designed for modern businesses
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShoppingCart className="w-8 h-8 text-blue-600" />}
              title="Smart POS System"
              description="Fast, touch-friendly billing with offline support, multiple payment modes, and custom receipts"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-green-600" />}
              title="AI Business Insights"
              description="Demand forecasting, trend prediction, restock suggestions, and personalized recommendations"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-purple-600" />}
              title="Advanced Analytics"
              description="Real-time dashboards, sales reports, profit analysis, and staff performance tracking"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-orange-600" />}
              title="CRM & Loyalty"
              description="Customer database, loyalty programs, segmentation, and automated marketing campaigns"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-pink-600" />}
              title="WhatsApp Integration"
              description="Automated messages, bulk campaigns, order updates, and customer engagement"
            />
            <FeatureCard
              icon={<Store className="w-8 h-8 text-indigo-600" />}
              title="Restaurant & Retail Modes"
              description="Table management, kitchen display, barcode scanning, and inventory control"
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-teal-600" />}
              title="Cloud Sync"
              description="Works offline with automatic cloud synchronization across all devices"
            />
            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-red-600" />}
              title="Omnichannel"
              description="Web, Android, and iOS apps with seamless data sync"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-gray-700" />}
              title="Secure & Compliant"
              description="Bank-grade security, GST billing, data encryption, and automated backups"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" label="Active Businesses" />
            <StatCard number="1M+" label="Orders Processed" />
            <StatCard number="99.9%" label="Uptime" />
            <StatCard number="24/7" label="Support" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using AI-POS Pro
          </p>
          <button
            onClick={() => router.push('/register')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Start Your Free 14-Day Trial
          </button>
          <p className="mt-4 text-gray-500">
            No credit card required • Cancel anytime • Full support
          </p>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Store className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">AI-POS Pro</span>
          </div>
          <p className="text-gray-400">
            © 2024 AI-POS Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  )
}
