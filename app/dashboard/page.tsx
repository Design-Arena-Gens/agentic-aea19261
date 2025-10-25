'use client'

import { useEffect, useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users,
  Package,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function DashboardPage() {
  const [stats, setStats] = useState({
    todaySales: 12450,
    todayOrders: 45,
    totalCustomers: 234,
    lowStockItems: 8
  })

  const [insights, setInsights] = useState([
    {
      type: 'trend',
      title: 'Sales Trending Up',
      description: 'Your sales are 23% higher than last week',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'alert',
      title: 'Low Stock Alert',
      description: '8 products need restocking',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      type: 'recommendation',
      title: 'AI Recommendation',
      description: 'Create combo offers for Coffee + Snacks',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ])

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const topProductsData = {
    labels: ['Burger', 'Pizza', 'Coffee', 'Pasta', 'Salad'],
    datasets: [
      {
        label: 'Units Sold',
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)'
        ]
      }
    ]
  }

  const categoryData = {
    labels: ['Food', 'Beverages', 'Snacks', 'Others'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Sales"
          value={`₹${stats.todaySales.toLocaleString()}`}
          change="+12.5%"
          isPositive={true}
          icon={DollarSign}
          color="bg-blue-500"
        />
        <StatCard
          title="Orders"
          value={stats.todayOrders.toString()}
          change="+8.2%"
          isPositive={true}
          icon={ShoppingCart}
          color="bg-green-500"
        />
        <StatCard
          title="Customers"
          value={stats.totalCustomers.toString()}
          change="+15.3%"
          isPositive={true}
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStockItems.toString()}
          change="-2 items"
          isPositive={false}
          icon={Package}
          color="bg-orange-500"
        />
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
        </div>
        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-lg ${insight.bgColor}`}
            >
              <insight.icon className={`w-5 h-5 ${insight.color} mt-0.5`} />
              <div>
                <h3 className={`font-semibold ${insight.color}`}>{insight.title}</h3>
                <p className="text-gray-700 text-sm mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Trend</h2>
          <div className="h-64">
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="h-64">
            <Bar data={topProductsData} options={chartOptions} />
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales by Category</h2>
          <div className="h-64">
            <Doughnut data={categoryData} options={{ ...chartOptions, maintainAspectRatio: true }} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Order #100{order}</p>
                  <p className="text-sm text-gray-600">2 items • Customer {order}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{(450 + order * 100).toLocaleString()}</p>
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon, 
  color 
}: { 
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: any
  color: string 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className={`${color} p-2 rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <div className="flex items-center space-x-1">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-600">vs last week</span>
      </div>
    </div>
  )
}
