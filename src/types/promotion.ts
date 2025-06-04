export interface PromotionData {
  title: string
  discountType: 'shipping' | 'percentage' | 'fixed'
  value: string
  target: 'all' | 'selected'
  startDate: string
  endDate: string
}