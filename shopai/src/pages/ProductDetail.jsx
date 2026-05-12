import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiArrowLeft, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { ProductDetailSkeleton } from '../components/Skeleton'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <ProductDetailSkeleton />

  if (!product) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-red-400 text-xl">Product not found!</div>
    </div>
  )

  const handleBuyNow = () => {
    addToCart({...product, quantity})
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <FiArrowLeft /> Back to Products
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-96">
              <img src={product.images[selectedImage]} alt={product.title} className="h-full object-contain" />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`bg-white rounded-xl p-2 flex-shrink-0 w-20 h-20 flex items-center justify-center border-2 transition ${selectedImage === i ? 'border-purple-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-purple-400 capitalize mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-yellow-400' : ''} />
                ))}
              </div>
              <span className="text-gray-400">{product.rating}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-purple-400">₹{Math.round(product.price * 84).toLocaleString('en-IN')}</span>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
            <p className={`mb-6 font-semibold ${product.stock > 10 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 10 ? `✅ In Stock (${product.stock} available)` : `⚠️ Only ${product.stock} left!`}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-400">Quantity:</span>
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-purple-400 font-bold text-xl">-</button>
                <span className="text-white font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-purple-400 font-bold text-xl">+</button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <button onClick={() => addToCart({...product, quantity})}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
                  <FiShoppingCart /> Add to Cart
                </button>
                <button onClick={() => isWishlisted(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className={`p-4 rounded-xl border transition ${isWishlisted(product.id) ? 'bg-red-600 border-red-600' : 'border-gray-700 hover:border-red-500'}`}>
                  <FiHeart className={isWishlisted(product.id) ? 'fill-white' : ''} />
                </button>
              </div>
              <button onClick={handleBuyNow}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition text-lg">
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}