export default function currencyFilter(value, currency = 'USD') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(value)
}
