import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { items } = await req.json()

  const lineItems = items.map((item: any) => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name, images: [item.image] },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    metadata: { userId: session.user.id },
  })

  const total = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
  await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      stripeId: stripeSession.id,
      status: 'pending',
      items: {
        create: items.map((i: any) => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
  })

  return NextResponse.json({ url: stripeSession.url })
}
