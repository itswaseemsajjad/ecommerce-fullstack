import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  hasItem: (id: string) => boolean
  toggle: (item: WishlistItem) => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().hasItem(item.id)) {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      hasItem: (id) => get().items.some((i) => i.id === id),
      toggle: (item) => {
        if (get().hasItem(item.id)) get().removeItem(item.id)
        else get().addItem(item)
      },
    }),
    { name: 'wishlist-storage' }
  )
)
