import currency from 'currency.js'

export const useCurrency = (value: any, options = {}) => {
  return currency(value, {
    symbol: '£',
    ...options,
  })
}
