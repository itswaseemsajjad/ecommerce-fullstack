// Shared display formatters.
//
// These wrap the browser-native Intl APIs so currency and date formatting stay
// consistent across the storefront, cart, and order dashboard. Using Intl means
// we get correct thousands separators and currency symbols without shipping a
// heavyweight formatting library to the client.

/** Format a numeric amount as a localized currency string (e.g. "$1,299.00"). */
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
}

export function truncate(str: string, length: number = 100): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
