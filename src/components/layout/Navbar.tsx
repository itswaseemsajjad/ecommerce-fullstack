'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/store/cart'

export function Navbar() {
  const { data: session } = useSession()
  const itemCount = useCart((s) => s.itemCount())

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">ShopAI</Link>
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Products</Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600">
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
            )}
          </Link>
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600">Dashboard</Link>
              <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-red-500">Sign Out</button>
            </div>
          ) : (
            <Link href="/auth/signin" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
