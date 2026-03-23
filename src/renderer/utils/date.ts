export function toISOString(): string {
  return new Date().toISOString()
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
  })
}

export function isSameDay(iso1: string, iso2: string): boolean {
  return iso1.slice(0, 10) === iso2.slice(0, 10)
}

export function generateId(): string {
  return `${String(Date.now())}-${Math.random().toString(36).slice(2, 9)}`
}
