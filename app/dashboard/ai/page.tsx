'use client'

import { useState } from 'react'
import { Bot, Send, Sparkles, TrendingUp, AlertCircle, Lightbulb, Target } from 'lucide-react'
import toast from 'react-hot-toast'

const insights = [
  {
    type: 'forecast',
    title: 'Demand Forecast',
    description: 'Coffee sales expected to increase by 30% this weekend based on historical trends.',
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    data: { confidence: 85 }
  },
  {
    type: 'alert',
    title: 'Restock Alert',
    description: 'Cappuccino inventory is critically low. Order 50 units to meet weekend demand.',
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    data: { priority: 'high' }
  },
  {
    type: 'recommendation',
    title: 'Combo Suggestion',
    description: 'Create "Coffee + Snack" combo for ₹200. Projected 15% increase in average order value.',
    icon: Lightbulb,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    data: { potentialRevenue: 12500 }
  },
  {
    type: 'trend',
    title: 'Peak Hour Detection',
    description: 'Highest sales occur between 12 PM - 2 PM. Consider adding extra staff during lunch.',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    data: { peakHours: '12:00 PM - 2:00 PM' }
  }
]

const quickQuestions = [
  'What was my best selling product last week?',
  'Which products are running low on stock?',
  'Show me today\'s revenue and profit',
  'Which customers are most valuable?',
  'What time of day has the highest sales?'
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Business Assistant. I can help you with sales insights, inventory management, customer analytics, and business recommendations. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [healthScore, setHealthScore] = useState(78)

  const handleSend = async (question?: string) => {
    const userMessage = question || input
    if (!userMessage.trim()) return

    setMessages([...messages, { role: 'user', content: userMessage }])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ''
      const lower = userMessage.toLowerCase()

      if (lower.includes('best') || lower.includes('top') || lower.includes('most profitable')) {
        response = 'Based on your sales data, your best-selling product last week was **Classic Burger** with 65 units sold, generating ₹16,250 in revenue. Your most profitable item is **Cheese Pizza** with a profit margin of 42.8% (₹150 profit per unit).'
      } else if (lower.includes('stock') || lower.includes('inventory')) {
        response = 'You have 3 products running low on stock:\n• Cappuccino: 8 units (Min: 15)\n• Pasta: 12 units (Min: 20)\n• Salad: 7 units (Min: 10)\n\nI recommend restocking these items within 2 days to avoid stockouts.'
      } else if (lower.includes('revenue') || lower.includes('sales') || lower.includes('profit')) {
        response = 'Today\'s performance:\n• Total Revenue: ₹12,450\n• Total Orders: 45\n• Average Order Value: ₹277\n• Estimated Profit: ₹4,983 (40% margin)\n• Top Category: Food (58% of sales)'
      } else if (lower.includes('customer')) {
        response = 'Your customer analytics:\n• Total Customers: 234\n• VIP Customers: 18 (spending >₹5000)\n• Loyal Customers: 45\n• Average Customer Lifetime Value: ₹3,250\n\nTop customer: +91-9876543210 with total spending of ₹12,500 across 28 visits.'
      } else if (lower.includes('time') || lower.includes('hour') || lower.includes('peak')) {
        response = 'Peak sales hours:\n• 12:00 PM - 2:00 PM: ₹45,000/week (35% of daily sales)\n• 7:00 PM - 9:00 PM: ₹38,000/week (29% of daily sales)\n• 9:00 AM - 11:00 AM: ₹22,000/week (17% of daily sales)\n\nConsider running "Happy Hour" promotions during off-peak times to balance demand.'
      } else {
        response = 'I can help you with:\n• Sales and revenue analysis\n• Product performance insights\n• Inventory management\n• Customer analytics and segmentation\n• Peak hour detection\n• Profit optimization recommendations\n\nWhat would you like to know more about?'
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Business Assistant</h1>
        <p className="text-gray-600 mt-1">Get intelligent insights and recommendations for your business</p>
      </div>

      {/* Business Health Score */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-xl font-bold">Business Health Score</h2>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{healthScore}</div>
            <div className="text-sm opacity-90">out of 100</div>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${healthScore}%` }}
          />
        </div>
        <p className="text-sm opacity-90">
          Your business is performing well! Focus on inventory management to improve your score.
        </p>
      </div>

      {/* AI Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className={`${insight.bgColor} rounded-xl p-6 border-2 border-transparent hover:border-purple-500 transition-all`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-white`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${insight.color} mb-1`}>{insight.title}</h3>
                <p className="text-gray-700 text-sm">{insight.description}</p>
                {insight.data.confidence && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="text-xs text-gray-600">Confidence:</div>
                    <div className="flex-1 bg-white/50 rounded-full h-2">
                      <div
                        className={`${insight.color.replace('text', 'bg')} rounded-full h-2`}
                        style={{ width: `${insight.data.confidence}%` }}
                      />
                    </div>
                    <div className="text-xs font-semibold text-gray-700">{insight.data.confidence}%</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center space-x-3">
          <Bot className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Ask Your AI Assistant</h2>
        </div>

        {/* Quick Questions */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSend(question)}
                className="text-sm px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:border-purple-500 hover:bg-purple-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your business..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
