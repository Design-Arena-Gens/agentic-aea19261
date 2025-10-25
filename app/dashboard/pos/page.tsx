'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Minus, Trash2, Search, CreditCard, Wallet, Smartphone, 
  Receipt, Percent, Tag, User, X, Check, Printer
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  taxRate: number
}

const categories = [
  { id: '1', name: 'All', icon: '📦' },
  { id: '2', name: 'Food', icon: '🍔' },
  { id: '3', name: 'Beverages', icon: '☕' },
  { id: '4', name: 'Snacks', icon: '🍿' },
]

const products = [
  { id: '1', name: 'Classic Burger', price: 250, category: 'Food', taxRate: 5 },
  { id: '2', name: 'Cheese Pizza', price: 350, category: 'Food', taxRate: 5 },
  { id: '3', name: 'Cappuccino', price: 120, category: 'Beverages', taxRate: 5 },
  { id: '4', name: 'Cold Coffee', price: 150, category: 'Beverages', taxRate: 5 },
  { id: '5', name: 'French Fries', price: 100, category: 'Snacks', taxRate: 5 },
  { id: '6', name: 'Nachos', price: 180, category: 'Snacks', taxRate: 5 },
  { id: '7', name: 'Veg Pasta', price: 220, category: 'Food', taxRate: 5 },
  { id: '8', name: 'Green Tea', price: 80, category: 'Beverages', taxRate: 5 },
  { id: '9', name: 'Chicken Wings', price: 280, category: 'Snacks', taxRate: 5 },
  { id: '10', name: 'Caesar Salad', price: 200, category: 'Food', taxRate: 5 },
]

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState({ type: 'fixed', value: 0 })
  const [showPayment, setShowPayment] = useState(false)
  const [customerPhone, setCustomerPhone] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    toast.success(`${product.name} added to cart`)
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
    toast.success('Item removed from cart')
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = discount.type === 'percentage' 
    ? (subtotal * discount.value) / 100 
    : discount.value
  const taxAmount = cart.reduce((sum, item) => 
    sum + ((item.price * item.quantity * item.taxRate) / 100), 0
  )
  const total = subtotal - discountAmount + taxAmount

  const handleCheckout = (paymentMethod: string) => {
    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }

    // Simulate order creation
    const orderNumber = `ORD-${Date.now()}`
    toast.success(`Order ${orderNumber} placed successfully!`)
    
    // Print receipt (simulated)
    printReceipt(orderNumber, paymentMethod)
    
    // Clear cart
    setCart([])
    setDiscount({ type: 'fixed', value: 0 })
    setCustomerPhone('')
    setShowPayment(false)
  }

  const printReceipt = (orderNumber: string, paymentMethod: string) => {
    // Simulated receipt printing
    console.log('Printing receipt:', {
      orderNumber,
      items: cart,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      paymentMethod,
      customer: customerPhone
    })
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Products Section */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-3 border-b border-gray-200 flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all text-left"
              >
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
                  {categories.find(c => c.name === product.category)?.icon || '📦'}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-blue-600 font-bold">₹{product.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Current Order</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Receipt className="w-16 h-16 mb-2" />
              <p>Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Customer */}
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Customer phone (optional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Discount */}
            <div className="flex items-center space-x-2">
              <select
                value={discount.type}
                onChange={(e) => setDiscount({ ...discount, type: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fixed">₹</option>
                <option value="percentage">%</option>
              </select>
              <input
                type="number"
                placeholder="Discount"
                value={discount.value || ''}
                onChange={(e) => setDiscount({ ...discount, value: Number(e.target.value) })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Select Payment</h2>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleCheckout('cash')}
                className="flex flex-col items-center space-y-2 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Wallet className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-gray-900">Cash</span>
              </button>

              <button
                onClick={() => handleCheckout('card')}
                className="flex flex-col items-center space-y-2 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <CreditCard className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-gray-900">Card</span>
              </button>

              <button
                onClick={() => handleCheckout('upi')}
                className="flex flex-col items-center space-y-2 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Smartphone className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-gray-900">UPI</span>
              </button>

              <button
                onClick={() => handleCheckout('wallet')}
                className="flex flex-col items-center space-y-2 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Tag className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-gray-900">Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
