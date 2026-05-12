import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

// Routes (we'll add these later)
app.get('/', (req, res) => {
  res.json({ message: 'ShopAI API is running! 🚀' })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected!')
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => console.error('❌ MongoDB error:', err))