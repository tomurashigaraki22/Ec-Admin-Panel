export interface Category {
  id: string
  name: string
  image_url: string
  slug: string
  description: string
  topProducts?: {
    id: string
    name: string
    price: number
    image: string | null
    total_sold: number
    description: string
    stock_quantity: number
  }[]
}

export interface CreateCategoryData {
  name: string
  image_url: string
  slug: string
  description: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  total_sold: number
  description: string
  stock_quantity: number
}

export interface CategoriesResponse {
  categories: Category[]
}