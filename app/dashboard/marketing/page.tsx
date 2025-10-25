'use client'

import { useState } from 'react'
import { MessageSquare, Send, Users, Calendar, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MarketingPage() {
  const [message, setMessage] = useState('')
  const [selectedSegment, setSelectedSegment] = useState('all')

  const campaigns = [
    { id: '1', name: 'Weekend Special Offer', type: 'WhatsApp', sent: 150, delivered: 145, opened: 89, status: 'completed' },
    { id: '2', name: 'Birthday Wishes', type: 'SMS', sent: 24, delivered: 24, opened: 18, status: 'active' },
    { id: '3', name: 'New Menu Launch', type: 'WhatsApp', sent: 200, delivered: 195, opened: 124, status: 'scheduled' }
  ]

  const handleSendCampaign = () => {
    if (!message.trim()) {
      toast.error('Please enter a message')
      return
    }
    toast.success(`Campaign sent to ${selectedSegment} segment!`)
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Marketing & Campaigns</h1>
        <p className="text-gray-600 mt-1">Engage customers with WhatsApp & SMS campaigns</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Sent</span>
            <Send className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">374</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Delivery Rate</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">97.3%</p>
          <p className="text-sm text-green-600 mt-1">+2.1% vs last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Open Rate</span>
            <MessageSquare className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">62%</p>
          <p className="text-sm text-purple-600 mt-1">Above average</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Active Campaigns</span>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600 mt-1">Running now</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Campaign</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Segment</label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Customers (234)</option>
                <option value="vip">VIP Customers (18)</option>
                <option value="loyal">Loyal Customers (45)</option>
                <option value="regular">Regular Customers (98)</option>
                <option value="new">New Customers (73)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Hi {name}! 🎉 Enjoy 20% OFF on your next order. Use code: SAVE20. Valid till Sunday!"
              />
              <p className="text-sm text-gray-600 mt-2">
                Use {'{name}'} for customer name, {'{points}'} for loyalty points
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSendCampaign}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send WhatsApp</span>
              </button>
              <button
                onClick={handleSendCampaign}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send SMS</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Templates</h2>
          <div className="space-y-2">
            {[
              '🎉 Weekend Special: 20% OFF on all orders!',
              '🎂 Happy Birthday! Enjoy a free dessert on us.',
              '⭐ You have 500 loyalty points! Redeem now.',
              '🆕 Check out our new menu items today!'
            ].map((template, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(template)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg text-sm transition-colors"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Campaign History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opened</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{campaign.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.sent}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.delivered}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.opened}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
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
