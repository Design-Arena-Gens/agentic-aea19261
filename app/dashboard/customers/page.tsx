'use client'

import { useState } from 'react'
import { Users, Star, Gift, TrendingUp, Phone, Mail, Calendar } from 'lucide-react'

const customers = [
  { id: '1', name: 'John Doe', phone: '+91-9876543210', email: 'john@example.com', segment: 'vip', totalSpent: 12500, visits: 28, loyaltyPoints: 1250 },
  { id: '2', name: 'Jane Smith', phone: '+91-9876543211', email: 'jane@example.com', segment: 'loyal', totalSpent: 8900, visits: 15, loyaltyPoints: 890 },
  { id: '3', name: 'Mike Johnson', phone: '+91-9876543212', email: 'mike@example.com', segment: 'regular', totalSpent: 4500, visits: 8, loyaltyPoints: 450 },
  { id: '4', name: 'Sarah Williams', phone: '+91-9876543213', email: 'sarah@example.com', segment: 'new', totalSpent: 750, visits: 2, loyaltyPoints: 75 },
]

const segmentColors = {
  vip: 'bg-purple-100 text-purple-800 border-purple-300',
  loyal: 'bg-blue-100 text-blue-800 border-blue-300',
  regular: 'bg-green-100 text-green-800 border-green-300',
  new: 'bg-gray-100 text-gray-800 border-gray-300'
}

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers & CRM</h1>
        <p className="text-gray-600 mt-1">Manage customer relationships and loyalty programs</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Customers</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">234</p>
          <p className="text-sm text-green-600 mt-1">+12 this week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">VIP Customers</span>
            <Star className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">18</p>
          <p className="text-sm text-gray-600 mt-1">Top spenders</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Lifetime Value</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">₹3,250</p>
          <p className="text-sm text-green-600 mt-1">+8% vs last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Loyalty Points</span>
            <Gift className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">45,670</p>
          <p className="text-sm text-gray-600 mt-1">Active points</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Customer Database</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Segment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loyalty Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{customer.name.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900">
                        <Phone className="w-3 h-3 mr-1" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${segmentColors[customer.segment as keyof typeof segmentColors]}`}>
                      {customer.segment.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.visits} visits</td>
                  <td className="px-6 py-4 text-sm font-semibold text-orange-600">{customer.loyaltyPoints} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
