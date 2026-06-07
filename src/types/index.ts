export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image: string
  createdAt: string
}

export interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  product: Product
}
