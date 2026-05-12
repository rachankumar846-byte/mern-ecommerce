import { Link } from 'react-router-dom'
import { FiTrash2, FiArrowLeft, FiShoppingCart, FiLock } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto py-8 px-6">
          <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
            <FiArrowLeft /> Continue Shopping
          </Link>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FiShoppingCart size={80} className="text-gray-700 mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty!</h2>
            <p className="text-gray-500 mb-8">Add some products to get started</p>
            <Link to="/products" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition">
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <FiArrowLeft /> Continue Shopping
        </Link>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart 🛒</h1>
          <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm transition">Clear Cart</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map(item => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex gap-6">
                <div className="bg-white rounded-xl p-3 w-24 h-24 flex items-center justify-center shrink-0">
                  <img src={item.thumbnail} alt={item.title} className="h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm capitalize">{item.category}</p>
                  <p className="text-purple-400 font-bold mt-1">₹{Math.round(item.price * 84).toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-purple-400 font-bold text-xl">-</button>
                      <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-purple-400 font-bold text-xl">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 transition">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-bold text-lg">₹{Math.round(item.price * item.quantity * 84).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span><span>₹{Math.round(total * 84).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span><span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (18%)</span><span>₹{Math.round(total * 84 * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="h-px bg-gray-700"></div>
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total</span><span>₹{Math.round(total * 84 * 1.18).toLocaleString('en-IN')}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition text-center block">
              Proceed to Checkout →
            </Link>
            <div className="mt-4 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
              <FiLock size={14} /> Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}