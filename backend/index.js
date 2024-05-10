const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const {PORT, MONGO_URI} = process.env

const bookRoutes = require('./routes/bookRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/books', bookRoutes)

async function connectToDatabase() {
    try {
      await mongoose.connect(MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Listening to port:${PORT}`)
          })
      }) 
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}
connectToDatabase();