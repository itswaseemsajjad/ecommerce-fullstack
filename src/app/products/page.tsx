import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/products/ProductCard'

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const products = await prisma.product.findMany({
    where: {
      AND: [
        searchParams.category ? { category: searchParams.category } : {},
        searchParams.q ? { name: { contains: searchParams.q } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

  const categories = await prisma.product.groupBy({ by: ['category'] })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-48 shrink-0">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="/products" className="text-blue-600 hover:underline text-sm">All</a>
            </li>
            {categories.map((c) => (
              <li key={c.category}>
                <a href={`/products?category=${c.category}`} className="text-gray-600 hover:text-blue-600 text-sm">{c.category}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {searchParams.category || 'All Products'} ({products.length})
            </h1>
            <form className="flex gap-2">
              <input name="q" defaultValue={searchParams.q} placeholder="Search..." className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Search</button>
            </form>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
