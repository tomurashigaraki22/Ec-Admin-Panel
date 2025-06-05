export type DiscountType = 'Shipping Discount' | 'Percentage' | 'Fixed Amount'
export type Target = 'All Customers' | 'Selected Products'
export type Status = 'Active' | 'Expired'

export interface PromotionData {
  title: string
  discountType: DiscountType
  value: string
  target: Target
  startDate: string
  endDate: string
}

export interface Promotion {
  title: string
  discountType: DiscountType
  value: string
  target: Target
  duration: string
  status: Status
  usage: number
}

export interface Coupon {
  id: number
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minAmount: number | null
  description: string
  is_available: boolean
}

export interface CreateCouponData {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minAmount?: number
  description: string
  is_available?: boolean
}