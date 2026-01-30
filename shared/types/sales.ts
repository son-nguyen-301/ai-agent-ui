export type SalesData = {
  id: string
  title: string
  platform: string
  price: number
  discount: number
  genre: string
  purchaseDate: string
  customer: string | null
}

export type SalesChartData = {
  month: string
  value: number
}
