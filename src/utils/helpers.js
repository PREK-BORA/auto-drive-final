// ============================================================
// Utility Functions
// ============================================================
//
// Small helper functions used across the app.
// ============================================================

/**
 * Format a number as currency (USD).
 * Example: formatCurrency(42000) → "$42,000"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a date string or timestamp into a readable format.
 * Example: formatDate('2024-07-25') → "July 25, 2024"
 */
export function formatDate(date) {
  if (!date) return ''
  const d = date?.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate a string to a maximum length and add an ellipsis.
 * Example: truncate("Hello World", 5) → "Hello..."
 */
export function truncate(text, maxLength = 100) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Capitalize the first letter of a string.
 * Example: capitalize("hello") → "Hello"
 */
export function capitalize(text) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}
