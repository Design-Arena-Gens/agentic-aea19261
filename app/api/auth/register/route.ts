import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, storeName, storeType } = await request.json()

    if (!email || !password || !name || !storeName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        plan: 'free',
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
        status: 'active'
      }
    })

    // Create store
    const store = await prisma.store.create({
      data: {
        name: storeName,
        type: storeType || 'retail',
        subscriptionId: subscription.id,
        active: true
      }
    })

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin',
        storeId: store.id,
        active: true
      }
    })

    // Create default categories
    const defaultCategories = [
      { name: 'Food', icon: '🍔', color: '#ef4444' },
      { name: 'Beverages', icon: '☕', color: '#3b82f6' },
      { name: 'Snacks', icon: '🍿', color: '#f59e0b' },
      { name: 'Others', icon: '📦', color: '#6b7280' }
    ]

    for (const cat of defaultCategories) {
      await prisma.category.create({
        data: {
          ...cat,
          storeId: store.id
        }
      })
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      storeId: store.id
    })

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        storeId: store.id,
        store
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
