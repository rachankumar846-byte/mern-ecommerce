import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      id: Number,
      title: String,
      price: Number,
      quantity: Number,
      thumbnail: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)