export type SalesData = {
  id: string
  title: string
  platform: string
  price: number
  discount: number
  purchaseDate: string
  customer: string | null
}

export type SalesChartData = {
  month: string
  value: number
}
