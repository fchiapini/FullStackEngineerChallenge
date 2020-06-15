import express from 'express'
import routes from './routes/routes'
import bodyParser from 'body-parser'
import cors from 'cors'

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api', routes)

app.get('/', (req, res) => res.send('Welcome to Performance Review!'))

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}!`))
