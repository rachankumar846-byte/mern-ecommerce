import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiFilter } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { ProductCardSkeleton } from '../components/Skeleton'

const categories = [
  'All', 'smartphones', 'laptops', 'fragrances', 'skincare',
  'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses',
  'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches',
  'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses',
  'lighting'
]

const excludedCategories = ['motorcycle', 'automotive']

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let url = ''
        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}&limit=100`
        } else if (selectedCategory === 'All') {
          url = 'https://dummyjson.com/products?limit=194'
        } else {
          url = `https://dummyjson.com/products/category/${selectedCategory}`
        }
        const res = await fetch(url)
        const data = await res.json()
        const filtered = data.products.filter(p => !excludedCategories.includes(p.category))
        setProducts(filtered)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedCategory, search])

  const toggleWishlist = (product) => {
    isWishlisted(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)
  }

  const handleBuyNow = (product) => {
    addToCart(product)
    navigate('/checkout')
  }

  const filtered = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-gray-800 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {search ? `Search results for "${search}"` : 'All Products'}
          </h1>
          <div className="flex gap-4 mt-4">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-6 flex gap-8">
        <div className="w-64 shrink-0">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FiFilter /> Filters</h3>
            <h4 className="text-gray-400 text-sm mb-3">CATEGORY</h4>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-2 rounded-lg transition capitalize ${
                    selectedCategory === cat ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <p className="text-gray-400 mb-6">{filtered.length} products found</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500 transition group">
                    <div className="relative bg-white h-48 flex items-center justify-center p-4">
                      <img src={product.thumbnail} alt={product.title}
                        className="h-full object-contain group-hover:scale-110 transition-transform" />
                      <button onClick={() => toggleWishlist(product)}
                        className="absolute top-3 right-3 bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition">
                        <FiHeart className={isWishlisted(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white truncate">{product.title}</h3>
                      <p className="text-gray-400 text-sm capitalize">{product.category}</p>
                      <p className="text-yellow-400 text-sm mt-1">⭐ {product.rating}</p>
                      <p className="text-purple-400 font-bold text-lg mt-1">₹{Math.round(product.price * 84).toLocaleString('en-IN')}</p>
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex gap-2">
                          <button onClick={() => addToCart(product)}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-1 text-sm">
                            <FiShoppingCart size={14} /> Add to Cart
                          </button>
                          <Link to={`/product/${product.id}`}
                            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition text-center text-sm flex items-center justify-center">
                            View
                          </Link>
                        </div>
                        <button onClick={() => handleBuyNow(product)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition text-sm font-semibold">
                          ⚡ Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}