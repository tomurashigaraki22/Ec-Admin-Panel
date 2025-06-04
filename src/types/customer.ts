export interface Customer {
  id: number
  name: string | null
  email: string
  phone_number: string
  created: string
  last_login: string | null
  status: string
  orders: number
}

export interface PaginationData {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export interface CustomersResponse {
  users: Customer[]
  pagination: PaginationData
}

export interface CustomerDetails {
  user_info: {
    name: string
    email: string
    phone: string
    address: string
    date_created: string
    last_login: string | null
    status: string
  }
  order_overview: {
    total: number
    completed: number
    processing: number
    shipped: number
    cancelled: number
  }
  orders: Order[]
  pagination: {
    total: number
    current_page: number
    per_page: number
    total_pages: number
  }
}

interface Order {
  order_id: string
  products: string
  date: string
  total: number
  status: string
  payment_status: 'paid' | 'pending' | 'failed'
}