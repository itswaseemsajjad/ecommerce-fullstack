'use client'
import { useWishlist } from '@/store/wishlist'

interface Props {
  product: { id: string; name: string; price: number; image: string }
}

export function WishlistButton({ product }: Props) {
  const { hasItem, toggle } = useWishlist()
  const isWishlisted = hasItem(product.id)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        toggle(product)
      }}
      className={`p-2 rounded-full border transition-colors ${
        isWishlisted
          ? 'bg-red-50 border-red-200 text-red-500'
          : 'bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
      }`}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isWishlisted ? '❤️' : '🤍'}
    </button>
  )
}
