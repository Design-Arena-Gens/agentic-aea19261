import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo subscription
  const subscription = await prisma.subscription.create({
    data: {
      plan: 'free',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'active'
    }
  })

  // Create demo store
  const store = await prisma.store.create({
    data: {
      name: 'Demo Store',
      type: 'both',
      address: '123 Main Street, City',
      phone: '+91-9876543210',
      email: 'demo@store.com',
      gstNumber: 'GST123456789',
      receiptFooter: 'Thank you for your business!',
      subscriptionId: subscription.id,
      active: true
    }
  })

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: hashedPassword,
      name: 'Demo Admin',
      role: 'admin',
      phone: '+91-9876543210',
      storeId: store.id,
      active: true
    }
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Food', icon: '🍔', color: '#ef4444', storeId: store.id } }),
    prisma.category.create({ data: { name: 'Beverages', icon: '☕', color: '#3b82f6', storeId: store.id } }),
    prisma.category.create({ data: { name: 'Snacks', icon: '🍿', color: '#f59e0b', storeId: store.id } }),
    prisma.category.create({ data: { name: 'Desserts', icon: '🍰', color: '#ec4899', storeId: store.id } })
  ])

  // Create products
  const products = [
    { name: 'Classic Burger', categoryId: categories[0].id, price: 250, costPrice: 150, sku: 'BUR001', barcode: '8901234567890' },
    { name: 'Cheese Pizza', categoryId: categories[0].id, price: 350, costPrice: 200, sku: 'PIZ001', barcode: '8901234567891' },
    { name: 'Veg Pasta', categoryId: categories[0].id, price: 220, costPrice: 120, sku: 'PAS001', barcode: '8901234567892' },
    { name: 'Cappuccino', categoryId: categories[1].id, price: 120, costPrice: 50, sku: 'CAP001', barcode: '8901234567893' },
    { name: 'Cold Coffee', categoryId: categories[1].id, price: 150, costPrice: 60, sku: 'COF001', barcode: '8901234567894' },
    { name: 'Green Tea', categoryId: categories[1].id, price: 80, costPrice: 30, sku: 'TEA001', barcode: '8901234567895' },
    { name: 'French Fries', categoryId: categories[2].id, price: 100, costPrice: 40, sku: 'FRI001', barcode: '8901234567896' },
    { name: 'Nachos', categoryId: categories[2].id, price: 180, costPrice: 80, sku: 'NAC001', barcode: '8901234567897' },
    { name: 'Chocolate Cake', categoryId: categories[3].id, price: 200, costPrice: 100, sku: 'CAK001', barcode: '8901234567898' },
    { name: 'Ice Cream', categoryId: categories[3].id, price: 120, costPrice: 50, sku: 'ICE001', barcode: '8901234567899' }
  ]

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        storeId: store.id,
        taxRate: 5,
        active: true
      }
    })

    // Add inventory
    await prisma.inventory.create({
      data: {
        productId: createdProduct.id,
        storeId: store.id,
        quantity: Math.floor(Math.random() * 50) + 10,
        minStock: 10
      }
    })
  }

  // Create demo customers
  const customers = [
    { name: 'John Doe', phone: '+91-9876543210', email: 'john@example.com', segment: 'vip', totalSpent: 12500, visitCount: 28, loyaltyPoints: 1250 },
    { name: 'Jane Smith', phone: '+91-9876543211', email: 'jane@example.com', segment: 'loyal', totalSpent: 8900, visitCount: 15, loyaltyPoints: 890 },
    { name: 'Mike Johnson', phone: '+91-9876543212', email: 'mike@example.com', segment: 'regular', totalSpent: 4500, visitCount: 8, loyaltyPoints: 450 }
  ]

  for (const customer of customers) {
    await prisma.customer.create({
      data: {
        ...customer,
        storeId: store.id
      }
    })
  }

  // Create restaurant tables
  for (let i = 1; i <= 6; i++) {
    await prisma.table.create({
      data: {
        number: i.toString(),
        storeId: store.id,
        capacity: i % 2 === 0 ? 4 : 2,
        status: i === 2 || i === 5 ? 'occupied' : 'available',
        x: ((i - 1) % 3) * 150 + 50,
        y: Math.floor((i - 1) / 3) * 150 + 50
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
