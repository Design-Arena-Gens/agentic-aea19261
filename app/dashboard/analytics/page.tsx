'use client'

import { useState } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { Download, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import toast from 'react-hot-toast'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text('Sales Report', 14, 15)
    doc.text(`Period: ${period}`, 14, 22)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 29)
    
    // @ts-ignore
    doc.autoTable({
      startY: 35,
      head: [['Product', 'Sales', 'Revenue']],
      body: [
        ['Burger', '65 units', '₹16,250'],
        ['Pizza', '59 units', '₹20,650'],
        ['Coffee', '80 units', '₹9,600']
      ]
    })
    
    doc.save('sales-report.pdf')
    toast.success('Report exported successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Track performance and generate insights</p>
        </div>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={exportToPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Revenue</span>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">₹1,51,000</p>
          <p className="text-sm text-green-600 mt-1">+23% vs last week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Orders</span>
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">345</p>
          <p className="text-sm text-green-600 mt-1">+15% vs last week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Order Value</span>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">₹438</p>
          <p className="text-sm text-green-600 mt-1">+7% vs last week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">New Customers</span>
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-green-600 mt-1">+12 this week</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-64">
            <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {[
              { name: 'Classic Burger', sales: '₹16,250', units: 65, color: 'bg-blue-500' },
              { name: 'Cheese Pizza', sales: '₹20,650', units: 59, color: 'bg-purple-500' },
              { name: 'Cappuccino', sales: '₹9,600', units: 80, color: 'bg-green-500' }
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-10 ${product.color} rounded`} />
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.units} units sold</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{product.sales}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
