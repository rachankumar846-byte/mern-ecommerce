import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { OrdersSkeleton } from '../components/Skeleton'

const statusSteps = ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered']

const statusColors = {
  'Pending': 'text-yellow-400 bg-yellow-900/30 border-yellow-700',
  'Confirmed': 'text-blue-400 bg-blue-900/30 border-blue-700',
  'Shipped': 'text-purple-400 bg-purple-900/30 border-purple-700',
  'Out for Delivery': 'text-orange-400 bg-orange-900/30 border-orange-700',
  'Delivered': 'text-green-400 bg-green-900/30 border-green-700',
}

const statusIcons = {
  'Pending': '🕐',
  'Confirmed': '✅',
  'Shipped': '📦',
  'Out for Delivery': '🚚',
  'Delivered': '🎉',
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setOrders(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [token])

  if (loading) return <OrdersSkeleton />

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold mb-8">My Orders 📦</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-2xl font-bold text-gray-400 mb-4">No orders yet!</h2>
            <p className="text-gray-500 mb-8">Start shopping to see your orders here</p>
            <Link to="/products" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition">
              Shop Now →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map(order => {
              const currentStep = statusSteps.indexOf(order.status || 'Pending')
              return (
                <div key={order._id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">Order ID</p>
                      <p className="text-white font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Date</p>
                      <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Total</p>
                      <p className="text-purple-400 font-bold">₹{Math.round(order.totalAmount).toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[order.status || 'Pending']}`}>
                        {statusIcons[order.status || 'Pending']} {order.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Order Tracking */}
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm mb-4">Order Tracking:</p>
                    <div className="flex items-center justify-between relative">
                      {/* Progress Line */}
                      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-700 z-0">
                        <div
                          className="h-full bg-purple-600 transition-all duration-500"
                          style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                        ></div>
                      </div>

                      {statusSteps.map((step, i) => (
                        <div key={step} className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                            i <= currentStep
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'bg-gray-800 border-gray-600 text-gray-500'
                          }`}>
                            {i < currentStep ? '✓' : i === currentStep ? statusIcons[step] : i + 1}
                          </div>
                          <p className={`text-xs mt-2 text-center max-w-16 ${
                            i <= currentStep ? 'text-purple-400' : 'text-gray-500'
                          }`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-gray-400 text-sm mb-3">Items ordered:</p>
                    <div className="flex flex-col gap-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="bg-white rounded-xl p-2 w-14 h-14 flex items-center justify-center shrink-0">
                            <img src={item.thumbnail} alt={item.title} className="h-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold">{item.title}</p>
                            <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-purple-400 font-bold">₹{Math.round(item.price * item.quantity * 84).toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <p className="text-gray-400 text-sm">📍 Deliver to: {order.address}</p>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}