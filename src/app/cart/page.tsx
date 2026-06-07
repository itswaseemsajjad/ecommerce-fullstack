'use client'
import { useCart } from '@/store/cart'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({items.length} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm border">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">+</button>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 text-sm hover:text-red-700">Remove</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${total().toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{total() > 50 ? 'Free' : '$9.99'}</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>${(total() > 50 ? total() : total() + 9.99).toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout" className="block w-full bg-blue-600 text-white text-center font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </Link>
          <button onClick={clearCart} className="w-full mt-2 text-gray-500 text-sm hover:text-gray-700">Clear Cart</button>
        </div>
      </div>
    </div>
  )
}
