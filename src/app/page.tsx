import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/products/ProductCard'
import Link from 'next/link'

export default async function HomePage() {
  const products = await prisma.product.findMany({ take: 8, orderBy: { createdAt: 'desc' } })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Shop the Future</h1>
          <p className="text-xl text-blue-100 mb-8">Premium products, seamless experience, lightning-fast delivery</p>
          <Link href="/products" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-shadow">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/products" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $50' },
            { icon: '🔒', title: 'Secure Payment', desc: 'Powered by Stripe' },
            { icon: '↩️', title: '30-Day Returns', desc: 'No questions asked' },
          ].map((f) => (
            <div key={f.title} className="p-6">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
