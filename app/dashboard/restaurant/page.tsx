'use client'

import { useState } from 'react'
import { Utensils, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const tables = [
  { id: '1', number: '1', capacity: 4, status: 'available', x: 50, y: 50 },
  { id: '2', number: '2', capacity: 4, status: 'occupied', x: 200, y: 50, orderId: 'ORD-001' },
  { id: '3', number: '3', capacity: 2, status: 'available', x: 350, y: 50 },
  { id: '4', number: '4', capacity: 6, status: 'reserved', x: 50, y: 200 },
  { id: '5', number: '5', capacity: 4, status: 'occupied', x: 200, y: 200, orderId: 'ORD-002' },
  { id: '6', number: '6', capacity: 4, status: 'available', x: 350, y: 200 },
]

const orders = [
  { id: 'ORD-001', table: '2', items: ['Burger', 'Fries', 'Coke'], status: 'preparing', time: '10 mins' },
  { id: 'ORD-002', table: '5', items: ['Pizza', 'Pasta', 'Wine'], status: 'ready', time: '5 mins' },
  { id: 'ORD-003', table: 'Takeaway', items: ['Sandwich', 'Coffee'], status: 'pending', time: 'Just now' },
]

export default function RestaurantPage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'occupied': return 'bg-blue-500'
      case 'reserved': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'preparing': return 'bg-blue-100 text-blue-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Mode</h1>
          <p className="text-gray-600 mt-1">Manage tables, orders, and kitchen operations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOrderType('dine-in')}
            className={`px-4 py-2 rounded-lg font-medium ${orderType === 'dine-in' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Dine-in
          </button>
          <button
            onClick={() => setOrderType('takeaway')}
            className={`px-4 py-2 rounded-lg font-medium ${orderType === 'takeaway' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Takeaway
          </button>
          <button
            onClick={() => setOrderType('delivery')}
            className={`px-4 py-2 rounded-lg font-medium ${orderType === 'delivery' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Delivery
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Table Layout */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Layout</h2>
          <div className="relative h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            {tables.map(table => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`absolute w-20 h-20 rounded-lg flex flex-col items-center justify-center text-white font-bold transition-transform hover:scale-110 ${getStatusColor(table.status)} ${selectedTable === table.id ? 'ring-4 ring-purple-500' : ''}`}
                style={{ left: table.x, top: table.y }}
              >
                <span className="text-lg">{table.number}</span>
                <span className="text-xs">{table.capacity} seats</span>
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Live Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Live Orders</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Table {order.table}</p>
                <div className="space-y-1 mb-2">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-700">• {item}</p>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{order.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kitchen Display */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Kitchen Display System</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-2 border-yellow-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Pending</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="font-semibold">ORD-003</p>
                <p className="text-sm text-gray-600">Sandwich, Coffee</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-blue-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Preparing</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold">ORD-001</p>
                <p className="text-sm text-gray-600">Burger, Fries, Coke</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-gray-900">Ready</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold">ORD-002</p>
                <p className="text-sm text-gray-600">Pizza, Pasta, Wine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
