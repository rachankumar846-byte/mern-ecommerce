import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('shopai-wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('shopai-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const isWishlisted = (id) => wishlist.some(item => item.id === id)

  const totalWishlist = wishlist.length

  return (
    <WishlistContext.Provider value={{
      wishlist, addToWishlist, removeFromWishlist, isWishlisted, totalWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}