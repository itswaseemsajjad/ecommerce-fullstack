import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <div className="space-y-3">
          <Link href="/dashboard" className="block bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700">
            View Orders
          </Link>
          <Link href="/products" className="block border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
