import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 2) {
        setSuggestions([])
        return
      }
      setLoading(true)
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=6`)
        const data = await res.json()
        setSuggestions(data.products || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`)
      setSearch('')
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`)
    setSearch('')
    setShowSuggestions(false)
    setSuggestions([])
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-purple-400">ShopAI ✨</Link>

      <div className="relative w-96" ref={searchRef}>
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-2">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true) }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setShowSuggestions(true)}
            className="outline-none bg-transparent text-white w-full text-sm placeholder-gray-400"
          />
          {search && (
            <button onClick={() => { setSearch(''); setSuggestions([]) }}
              className="text-gray-400 hover:text-white transition text-lg leading-none">×</button>
          )}
          <button onClick={handleSearch} className="text-purple-400 hover:text-purple-300 transition">
            <FiSearch size={16} />
          </button>
        </div>

        {showSuggestions && search.length >= 2 && (
          <div className="absolute top-12 left-0 right-0 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-50">
            {loading ? (
              <div className="px-4 py-3 text-gray-400 text-sm animate-pulse">Searching...</div>
            ) : suggestions.length > 0 ? (
              <>
                {suggestions.map(product => (
                  <button key={product.id} onClick={() => handleSuggestionClick(product)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition text-left">
                    <img src={product.thumbnail} alt={product.title}
                      className="w-10 h-10 object-contain bg-white rounded-lg p-1" />
                    <div>
                      <p className="text-white text-sm font-semibold">{product.title}</p>
                      <p className="text-purple-400 text-xs">${product.price}</p>
                    </div>
                  </button>
                ))}
                <button onClick={handleSearch}
                  className="w-full px-4 py-3 text-purple-400 hover:bg-gray-800 transition text-sm text-left border-t border-gray-700">
                  🔍 See all results for "{search}"
                </button>
              </>
            ) : (
              <div className="px-4 py-3 text-gray-400 text-sm">No products found for "{search}"</div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <Link to="/products" className="hover:text-purple-400 transition">Products</Link>
        <Link to="/wishlist" className="hover:text-purple-400 transition">Wishlist ❤️</Link>
        <Link to="/orders" className="hover:text-purple-400 transition">Orders 📦</Link>
        <Link to="/cart" className="relative hover:text-purple-400 transition">
          <FiShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-purple-400 font-semibold">{user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="hover:text-purple-400 transition">
            <FiUser size={24} />
          </Link>
        )}
      </div>
    </nav>
  )
}