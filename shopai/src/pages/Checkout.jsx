import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiLock } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { token } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'card'
  })

  const totalInRupees = total * 84

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOrder = async () => {
    setLoading(true)
    try {
      const fullAddress = `${form.firstName} ${form.lastName}, ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`
      const res = await fetch('https://shopai-backend-dg52.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: totalInRupees * 1.18,
          address: fullAddress
        })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
      } else {
        alert('✅ Order placed successfully!')
        clearCart()
        setStep(1)
      }
    } catch (err) {
      alert('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto py-8 px-6">
        <Link to="/cart" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <FiArrowLeft /> Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mb-8">Checkout 💳</h1>
        <div className="flex items-center gap-4 mb-10">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > i + 1 ? 'bg-green-500' : step === i + 1 ? 'bg-purple-600' : 'bg-gray-700'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={step === i + 1 ? 'text-white' : 'text-gray-400'}>{s}</span>
              {i < 2 && <div className="w-16 h-px bg-gray-700 ml-2"></div>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['firstName', 'lastName', 'email', 'phone'].map(field => (
                    <input key={field} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]} onChange={handleChange}
                      className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition" />
                  ))}
                  <input name="address" placeholder="Address" value={form.address} onChange={handleChange}
                    className="col-span-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition" />
                  <input name="city" placeholder="City" value={form.city} onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition" />
                  <input name="state" placeholder="State" value={form.state} onChange={handleChange}
                    className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition" />
                  <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange}
                    className="col-span-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition" />
                </div>
                <button onClick={() => setStep(2)} className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition">
                  Continue to Payment →
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <div className="flex flex-col gap-4 mb-6">
                  {[{value:'card',label:'💳 Credit/Debit Card'},{value:'upi',label:'📱 UPI'},{value:'cod',label:'💵 Cash on Delivery'}].map(method => (
                    <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${form.paymentMethod === method.value ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700'}`}>
                      <input type="radio" name="paymentMethod" value={method.value} checked={form.paymentMethod === method.value} onChange={handleChange} className="accent-purple-500" />
                      <span className="text-white font-semibold">{method.label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition">← Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition">Review Order →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6">Review Order</h2>
                <div className="flex flex-col gap-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="bg-white rounded-xl p-2 w-16 h-16 flex items-center justify-center shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-purple-400 font-bold">₹{(item.price * item.quantity * 84).toFixed(0)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition">← Back</button>
                  <button onClick={handleOrder} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
                    <FiLock /> {loading ? 'Placing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span><span>₹{totalInRupees.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span><span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (18%)</span><span>₹{(totalInRupees * 0.18).toFixed(0)}</span>
              </div>
              <div className="h-px bg-gray-700"></div>
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total</span><span>₹{(totalInRupees * 1.18).toFixed(0)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <FiLock size={14} /> Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}