import { prisma } from '../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await prisma.$connect();
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}