const fs = require('fs/promises')
const path = require('path')

const root = path.resolve('.')
const cacheDir = path.resolve(root, 'node_modules', '.cache')

fs.rm(cacheDir, { recursive: true, force: true })

console.log('Cache cleared!')
