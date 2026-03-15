'use server';

import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

type ActionState = { error: string } | { success: boolean } | null;

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function signup(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // (your existing signup code – unchanged)
  // Make sure to wrap DB calls in try-catch and return appropriate errors
  try {
    const parsed = signupSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
    });
    if (!parsed.success) {
      return { error: 'Invalid input' };
    }

    const { email, password, name } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: 'Email already taken' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    (await cookies()).set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // Parse and validate input (fast, no DB)
  console.time('login validation');
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  console.timeEnd('login validation');
  if (!parsed.success) {
    console.log('Login failed: invalid input');
    return { error: 'Invalid email or password format' };
  }

  const { email, password } = parsed.data;

  // Database and crypto operations – wrap in try-catch
  try {
    console.time('find user');
    const user = await prisma.user.findUnique({ where: { email } });
    console.timeEnd('find user');

    if (!user) {
      console.log('Login failed: user not found');
      return { error: 'Invalid credentials' };
    }

    console.time('password compare');
    const isValid = await bcrypt.compare(password, user.password);
    console.timeEnd('password compare');

    if (!isValid) {
      console.log('Login failed: wrong password');
      return { error: 'Invalid credentials' };
    }

    // Create JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    console.time('create token');
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);
    console.timeEnd('create token');

    // Set cookie
    console.time('set cookie');
    (await cookies()).set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    console.timeEnd('set cookie');

    console.log('Login successful, redirecting...');
  } catch (error) {
    console.error('Login error (DB or JWT):', error);
    return { error: 'A system error occurred. Please try again later.' };
  }

  // ✅ Redirect outside try-catch – ensures it's not caught
  redirect('/dashboard');
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    if (!token) return null;

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const rawUserId = payload.userId;
    if (!rawUserId) return null;

    const userId = Number(rawUserId);
    if (isNaN(userId)) return null;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });
    return user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}