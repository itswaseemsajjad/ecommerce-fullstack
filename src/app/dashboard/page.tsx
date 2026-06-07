import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, {session.user.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-blue-600 text-sm font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-blue-700">{orders.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-green-600 text-sm font-medium">Total Spent</p>
          <p className="text-3xl font-bold text-green-700">${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-purple-600 text-sm font-medium">Account Status</p>
          <p className="text-3xl font-bold text-purple-700 capitalize">{(session.user as any).role || 'user'}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border">
          <p className="text-gray-500 mb-4">No orders yet</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-6 border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-mono text-sm text-gray-500">#{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>{order.status}</span>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
