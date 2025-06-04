export interface Product {
  id: number
  image: string
  name: string
  variants: string
  productCode: string
  category: string
  stock: number
  price: string
  status: 'Published' | 'Draft' | 'Removed' | 'Out of Stock'
  added: string
  summary: string
  sales: number
  remainingProducts: number
}

export interface Customer {
  id: number
  name: string
  email: string
  phoneNumber: string
  orders: number
  created: string
  lastLogin: string
  status: 'Active' | 'Suspended' | 'Deactivated'
  avatar: string
}

export interface CustomerOrder {
  id: string
  product: string
  productCount: number
  date: string
  total: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Placed'
  otherProducts?: number
}
  
export interface CustomerDetails {
id: number
name: string
email: string
phone: string
address: string
dateCreated: string
lastLogin: string
status: 'Active' | 'Inactive' | 'Suspended' | 'Deactivated'
avatar: string
orders: CustomerOrder[]
}

export interface MonthlyCustomerStats {
  month: string
  total: number
  new: number
}

export interface CustomerData {
  month: string
  active: number
  newSignups: number
}