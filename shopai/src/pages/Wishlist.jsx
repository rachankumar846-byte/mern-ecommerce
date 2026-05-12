import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <FiHeart size={80} className="text-gray-700 mb-6" />
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Your wishlist is empty!</h2>
        <p className="text-gray-500 mb-8">Save items you love to your wishlist</p>
        <Link to="/products" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition">
          Browse Products →
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold mb-8">My Wishlist ❤️</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500 transition">
              <div className="relative bg-white h-48 flex items-center justify-center p-4">
                <img src={product.thumbnail} alt={product.title} className="h-full object-contain" />
                <button onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-red-500 p-2 rounded-full hover:bg-red-600 transition">
                  <FiTrash2 size={14} className="text-white" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white truncate">{product.title}</h3>
                <p className="text-gray-400 text-sm capitalize">{product.category}</p>
                <p className="text-yellow-400 text-sm mt-1">⭐ {product.rating}</p>
                <p className="text-purple-400 font-bold text-lg mt-1">₹{Math.round(product.price * 84).toLocaleString('en-IN')}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => addToCart(product)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-1 text-sm">
                    <FiShoppingCart size={14} /> Add to Cart
                  </button>
                  <Link to={`/product/${product.id}`}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition text-center text-sm flex items-center justify-center">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}