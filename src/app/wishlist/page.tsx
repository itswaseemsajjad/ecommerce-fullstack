'use client'
import { useWishlist } from '@/store/wishlist'
import { useCart } from '@/store/cart'
import Link from 'next/link'

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const addToCart = useCart((s) => s.addItem)

  function moveToCart(item: typeof items[0]) {
    addToCart(item)
    removeItem(item.id)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🤍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
        <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist ({items.length} items)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">{item.name}</h3>
              <p className="text-blue-600 font-bold mb-3">${item.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <button onClick={() => moveToCart(item)} className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">Add to Cart</button>
                <button onClick={() => removeItem(item.id)} className="px-3 py-2 border rounded-lg text-gray-400 hover:text-red-500 hover:border-red-300">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
