import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [
//       {find: '@', replacement: ''}
//     ]
//   }
// })

const config = defineConfig(({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  // const mode = process.env?.mode || 'development'
  // const PORT = process.env?.port || 3000
  const apiUrl = 'http://localhost:3001/api/v1'
  const jsonServerUrl = 'http://localhost:8000'
  // const socketsUrl = process.env?.socketsUrl || 'http://localhost:3002'

  const isDev = mode === 'development'

  const rootDir = path.resolve(__dirname, '..', '..')
  const srcDir = path.resolve(rootDir, 'src')
  const srcFrontendDir = path.resolve(srcDir, 'frontend')
  const srcGameDir = path.resolve(srcDir, 'game')

  return {
    plugins: [
      svgr({ exportAsDefault: true }),
      react(),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: srcFrontendDir },
        { find: '@game', replacement: srcGameDir },
      ],
    },
    define: {
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __API_JSON__: JSON.stringify(jsonServerUrl),
      __PROJECT__: JSON.stringify('frontend'),
    },
    css: {
      modules: {
        generateScopedName: isDev
          ? '[path][name]__[local]--[hash:base64:5]'
          : '[hash:base64:8]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/app/styles/globals-for-preprocessor.scss";',
        },
      },
    },
  }
})

export default config
