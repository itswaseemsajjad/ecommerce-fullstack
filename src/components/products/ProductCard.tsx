'use client'
import Link from 'next/link'
import { useCart } from '@/store/cart'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem)

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-blue-600 font-medium mb-1">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 hover:text-blue-600 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
            disabled={product.stock === 0}
            className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
