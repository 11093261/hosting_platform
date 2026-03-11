'use server'

import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// Define the possible state shapes
type ActionState = { error: string } | { success: boolean } | null

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

export async function signup(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. Validate input
  const parsed = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  })
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { email, password, name } = parsed.data

  // 2. Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'Email already taken' }
  }

  // 3. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. Create user in database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  // 5. Create a session token (JWT)
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  // 6. Set HTTP‑only cookie
  ;(await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return { success: true }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  const { email, password } = parsed.data

  // 1. Find user by email
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { error: 'Invalid credentials' }
  }

  // 2. Compare password
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return { error: 'Invalid credentials' }
  }

  // 3. Create session token
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  // 4. Set HTTP‑only cookie
  ;(await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return { success: true }
}

// ========== FIXED FUNCTION ==========
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    if (!token) return null

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    // Extract userId and ensure it's a number (Prisma expects id as number)
    const rawUserId = payload.userId
    if (rawUserId === undefined || rawUserId === null) return null
    
    const userId = Number(rawUserId)
    if (isNaN(userId)) return null

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }, // exclude password
    })
    return user
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}