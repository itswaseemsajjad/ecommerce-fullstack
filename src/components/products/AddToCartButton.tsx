'use client'
import { useCart } from '@/store/cart'
import { useState } from 'react'

interface Props {
  product: { id: string; name: string; price: number; image: string }
  disabled: boolean
}

export function AddToCartButton({ product, disabled }: Props) {
  const addItem = useCart((s) => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {disabled ? 'Out of Stock' : added ? '✓ Added to Cart!' : 'Add to Cart'}
    </button>
  )
}
