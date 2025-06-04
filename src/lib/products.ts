import { Product } from '@/utils/types'

export const products: Product[] = [
  {
    id: 1,
    image: 'https://media.istockphoto.com/id/663267894/photo/crystal-glass-chandelier-isolated.jpg?s=612x612&w=0&k=20&c=AykdxcW1s-IFqKC_jy1G3rsDoBYHVm7rAyFepUJMyek=',
    name: 'Crystal Chandelier Light',
    variants: '3 Variants',
    productCode: 'CL-2023-001',
    category: 'Indoor Light',
    stock: 24,
    price: 'NGN 1,200,000',
    status: 'Published',
    added: '26 Apr 2025',
    summary: 'Premium crystal chandelier with modern design',
    sales: 156,
    remainingProducts: 24
  },
  {
    id: 2,
    image: 'https://media.istockphoto.com/id/623756060/photo/crystal-chandelier.jpg?s=612x612&w=0&k=20&c=4yijTJ0s8UbmDuvvwSiOdE5HJVYucycWDhtfGdxA-O4=',
    name: 'Modern Pendant Light',
    variants: '2 Variants',
    productCode: 'PL-2023-002',
    category: 'Pendant Light',
    stock: 15,
    price: 'NGN 450,000',
    status: 'Draft',
    added: '25 Apr 2025',
    summary: 'Contemporary pendant light for dining areas',
    sales: 89,
    remainingProducts: 15
  }
]