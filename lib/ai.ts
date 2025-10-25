// AI-powered business intelligence functions

export interface BusinessMetrics {
  totalSales: number
  totalOrders: number
  avgOrderValue: number
  topProducts: any[]
  lowStockProducts: any[]
  salesTrend: any[]
}

export async function generateBusinessInsights(metrics: BusinessMetrics) {
  const insights = []

  // Demand Forecasting
  if (metrics.salesTrend && metrics.salesTrend.length > 0) {
    const recentSales = metrics.salesTrend.slice(-7)
    const avgDailySales = recentSales.reduce((sum, day) => sum + day.sales, 0) / recentSales.length
    const trend = recentSales[recentSales.length - 1].sales > avgDailySales ? 'increasing' : 'decreasing'
    
    insights.push({
      type: 'forecast',
      title: 'Sales Trend Analysis',
      description: `Your sales are ${trend}. Expected revenue for next week: ₹${Math.round(avgDailySales * 7)}`,
      priority: 'normal'
    })
  }

  // Low Stock Alerts
  if (metrics.lowStockProducts && metrics.lowStockProducts.length > 0) {
    insights.push({
      type: 'alert',
      title: 'Low Stock Alert',
      description: `${metrics.lowStockProducts.length} products are running low on stock. Restock soon to avoid stockouts.`,
      priority: 'high'
    })
  }

  // Top Performers
  if (metrics.topProducts && metrics.topProducts.length > 0) {
    const topProduct = metrics.topProducts[0]
    insights.push({
      type: 'trend',
      title: 'Best Selling Product',
      description: `${topProduct.name} is your top seller with ${topProduct.quantity} units sold. Consider promoting similar items.`,
      priority: 'normal'
    })
  }

  // Revenue Optimization
  if (metrics.avgOrderValue) {
    insights.push({
      type: 'recommendation',
      title: 'Upselling Opportunity',
      description: `Average order value is ₹${Math.round(metrics.avgOrderValue)}. Create combo offers to increase it by 20%.`,
      priority: 'normal'
    })
  }

  return insights
}

export function calculateBusinessHealthScore(metrics: BusinessMetrics): number {
  let score = 50 // Base score

  // Sales performance (0-25 points)
  if (metrics.totalSales > 10000) score += 25
  else if (metrics.totalSales > 5000) score += 15
  else if (metrics.totalSales > 1000) score += 10

  // Order volume (0-15 points)
  if (metrics.totalOrders > 100) score += 15
  else if (metrics.totalOrders > 50) score += 10
  else if (metrics.totalOrders > 10) score += 5

  // Stock management (0-10 points)
  if (metrics.lowStockProducts && metrics.lowStockProducts.length === 0) score += 10
  else if (metrics.lowStockProducts && metrics.lowStockProducts.length < 5) score += 5

  return Math.min(score, 100)
}

export async function askAIAssistant(question: string, context: any) {
  // Simulated AI responses for demo
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('profit') || lowerQuestion.includes('revenue')) {
    return `Based on your data, total revenue this week is ₹${context.totalSales || 0} with an average order value of ₹${context.avgOrderValue || 0}. Your profit margin is approximately ${((context.profit / context.totalSales) * 100 || 15).toFixed(1)}%.`
  }

  if (lowerQuestion.includes('best') || lowerQuestion.includes('top') || lowerQuestion.includes('most')) {
    const topProduct = context.topProducts?.[0]
    return topProduct 
      ? `Your best-selling product is "${topProduct.name}" with ${topProduct.quantity} units sold, generating ₹${topProduct.revenue} in revenue.`
      : 'No sales data available yet.'
  }

  if (lowerQuestion.includes('stock') || lowerQuestion.includes('inventory')) {
    const lowStock = context.lowStockProducts?.length || 0
    return lowStock > 0
      ? `You have ${lowStock} products running low on stock. Check the inventory section for details.`
      : 'All products are well-stocked!'
  }

  if (lowerQuestion.includes('customer') || lowerQuestion.includes('crm')) {
    return `You have ${context.totalCustomers || 0} registered customers with an average lifetime value of ₹${context.avgCustomerValue || 0}. ${context.loyalCustomers || 0} customers are in the loyal/VIP segment.`
  }

  return 'I can help you with sales insights, inventory status, customer analytics, and business recommendations. Try asking about your top products, revenue, or stock levels!'
}
