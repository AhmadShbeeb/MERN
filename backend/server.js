require('dotenv').config()
require('colors')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
connectDB()
const app = express()

app.use(express.json()) // attach any json data to the "req" object (converts request body to json)
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started at port ${port}`))
