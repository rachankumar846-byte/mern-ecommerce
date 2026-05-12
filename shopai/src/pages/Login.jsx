import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message)
      } else {
        login(data.user, data.token)
        navigate('/')
      }
    } catch (e) {
      setError('Something went wrong. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">ShopAI ✨</h1>
          <p className="text-gray-400 mt-2">Welcome back!</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition text-lg disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>
          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}