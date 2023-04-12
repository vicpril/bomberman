import express from 'express'

const app = express()
const port = 3001

export const startServer = async () => {
  app.get('/', (req, res) => {
    res.send('Hi!')
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer()
