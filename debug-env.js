const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

console.log('📁 Current directory:', process.cwd())
const envPath = path.join(process.cwd(), '.env.local')
console.log('📄 .env.local path:', envPath)

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists')
  const content = fs.readFileSync(envPath, 'utf8')
  console.log('--- File content (lines) ---')
  const lines = content.split('\n')
  lines.forEach((line, i) => {
    // Mask any potential passwords in output
    const maskedLine = line.replace(/(:[^:@]*@)/g, ':****@')
    console.log(`${i + 1}: ${maskedLine || '(empty line)'}`)
  })
  console.log('----------------------------')
} else {
  console.log('❌ .env.local file does NOT exist!')
}

console.log('🔍 DATABASE_URL from process.env:', process.env.DATABASE_URL ? 'Found' : 'Missing')