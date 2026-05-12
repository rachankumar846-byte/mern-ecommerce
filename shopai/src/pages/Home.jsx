import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HomeSkeleton } from '../components/Skeleton'

const categories = [
  { name: 'Electronics', icon: '💻', color: 'from-purple-600 to-purple-800' },
  { name: 'Fashion', icon: '👗', color: 'from-pink-600 to-pink-800' },
  { name: 'Home', icon: '🏠', color: 'from-blue-600 to-blue-800' },
  { name: 'Sports', icon: '⚽', color: 'from-green-600 to-green-800' },
  { name: 'Books', icon: '📚', color: 'from-yellow-600 to-yellow-800' },
  { name: 'Beauty', icon: '💄', color: 'from-red-600 to-red-800' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-28 px-6 text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome to ShopAI ✨
        </h1>
        <p className="text-xl text-gray-300 mb-8">Shop smarter with AI-powered recommendations</p>
        <Link to="/products" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-full transition text-lg">
          Shop Now →
        </Link>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link to={`/products?search=${cat.name}`} key={cat.name}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform`}>
              <div className="text-4xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-sm">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto pb-16 px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-purple-400 hover:text-purple-300 transition font-semibold">
            View All →
          </Link>
        </div>
        {loading ? <HomeSkeleton /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500 transition group">
                <div className="bg-white h-48 flex items-center justify-center p-4">
                  <img src={product.thumbnail} alt={product.title}
                    className="h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white truncate">{product.title}</h3>
                  <p className="text-yellow-400 text-sm mt-1">⭐ {product.rating}</p>
                  <p className="text-purple-400 font-bold mt-1">₹{Math.round(product.price * 84).toLocaleString('en-IN')}</p>
                  <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition text-sm">
                    Shop Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* AI Banner */}
      <div className="max-w-7xl mx-auto pb-16 px-6">
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-10 text-center border border-purple-700">
          <h2 className="text-4xl font-bold mb-4">🤖 Meet ShopAI Assistant</h2>
          <p className="text-gray-300 text-lg mb-6">Get personalized product recommendations powered by AI</p>
          <button className="bg-white text-purple-900 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition">
            Chat with AI →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 text-center text-gray-400">
        <p className="text-2xl font-bold text-purple-400 mb-2">ShopAI ✨</p>
        <p>© 2026 ShopAI. All rights reserved.</p>
      </footer>
    </div>
  )
}