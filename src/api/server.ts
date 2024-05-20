import { initDB } from 'api/models'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from 'api/routes'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app = express()
const port = process.env.port || 3001
const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000'

export const startServer = async () => {
    try {
        await initDB()

        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())

        app.use(cookieParser())
        app.use(
            cors({
                credentials: true,
                origin: baseUrl,
            }),
        )

        app.use(router)

        app.use(errorMiddleware)

        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()
