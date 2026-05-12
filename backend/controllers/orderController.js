import Order from '../models/Order.js'

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address } = req.body

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address
    })

    res.status(201).json({
      message: 'Order placed successfully!',
      order
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get My Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}