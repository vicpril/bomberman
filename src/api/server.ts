import { initDB } from 'api/models'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import router from 'api/routes'

const app = express()
const port = 3001

export const startServer = async () => {
  try {
    await initDB()

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(cookieParser())

    app.use((req, res, next) => {
      console.log('🚀 ~ req.body', req.body)
      next()
    })

    app.use(router)

    app.get('/', (req, res) => {
      res.send('Hi123!')
    })

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
