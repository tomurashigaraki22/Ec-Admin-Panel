export interface CreateProductData {
  name: string
  price: number
  description: string
  category: string
  sub_category?: string
  stock_quantity: number
  tags: string[]
  is_variable_product: boolean
  variations?: ProductVariation[]
  images: string[]
}

export interface ProductVariation {
  type: string
  value: string
  price: number
}

export interface UploadResponse {
  url: string
  message: string
}

export interface Product {
  productId: string
  title: string
  price: number
  description: string
  category: string
  images: string[]
  rating: number | null
  review_count: number
  highlights: string[]
  specifications: string[]
  whats_in_box: string[]
  stock_quantity: number
}

export interface ProductsResponse {
  products: Product[]
  error?: string
}