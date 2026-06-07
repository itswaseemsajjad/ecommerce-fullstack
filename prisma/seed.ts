import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  const products = [
    { name: 'Wireless Noise-Cancelling Headphones', description: 'Premium sound quality with 30-hour battery life and active noise cancellation.', price: 299.99, stock: 50, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
    { name: 'Mechanical Keyboard', description: 'RGB backlit mechanical keyboard with Cherry MX switches for the perfect typing experience.', price: 149.99, stock: 30, category: 'Electronics', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400' },
    { name: 'Ergonomic Office Chair', description: 'Lumbar support, adjustable armrests, and breathable mesh for all-day comfort.', price: 549.99, stock: 15, category: 'Furniture', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400' },
    { name: 'Smart Watch Pro', description: 'Health monitoring, GPS tracking, and 7-day battery in a sleek design.', price: 399.99, stock: 40, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
    { name: 'Minimalist Leather Wallet', description: 'Slim RFID-blocking bifold wallet in genuine leather. Holds up to 8 cards.', price: 49.99, stock: 100, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400' },
    { name: 'Running Shoes Ultra', description: 'Lightweight and responsive foam for maximum energy return on every stride.', price: 129.99, stock: 60, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
    { name: 'Stainless Steel Water Bottle', description: 'Double-walled vacuum insulation keeps drinks cold 24h or hot 12h.', price: 34.99, stock: 200, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400' },
    { name: 'Wireless Charging Pad', description: 'Fast 15W Qi wireless charging compatible with all Qi-enabled devices.', price: 39.99, stock: 80, category: 'Electronics', image: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=400' },
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('Database seeded!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
