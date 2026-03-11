const { PrismaClient } = require('@prisma/client')
require('dotenv').config({ path: '.env' })

console.log('🔍 DATABASE_URL found:', process.env.DATABASE_URL ? '✅ Yes' : '❌ No')

async function testConnection() {
  try {
    const prisma = new PrismaClient()
    console.log('⏳ Instantiating PrismaClient...')
    
    await prisma.$connect()
    console.log('✅ Successfully connected to the database')
    
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('✅ Query test passed:', result)
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Connection failed:', error)
  }
}

testConnection()