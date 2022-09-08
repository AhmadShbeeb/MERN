const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') })
require('colors')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
console.log(`/////SERVER:${process.env.MONGO_URI}`)
console.log(`/////SERVER:${process.env.NODE_ENV}`)
console.log(`/////SERVER:${path.resolve(__dirname, '../', '.env')}`)
connectDB()
const app = express()

app.use(express.json()) // attach any json data to the "req" object (converts request body to json)
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// serve frontend
if (process.env.NODE_ENV === 'production') {
  // join: will just concatenate it with the previous argument
  app.use(express.static(path.join(__dirname, '../frontend/build'))) // set static assets folder
  // resolve: is the result of executing cd with each argument
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))) // * for all routes except the api routes to point to index.html
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started at port ${port}`))
