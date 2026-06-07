import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/products/AddToCartButton'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-blue-600 text-sm font-medium mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-4xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
          <div className="mb-6">
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: product.image }} disabled={product.stock === 0} />
        </div>
      </div>
    </div>
  )
}
