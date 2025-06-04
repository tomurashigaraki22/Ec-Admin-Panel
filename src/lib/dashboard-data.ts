import { Order } from '@/components/ui/orders-table'

export const dashboardStats = {
  totalSales: {
    title: 'Total Sales',
    value: 'N40,689,500',
    change: { value: '+8%', trend: 'up' as const },
    iconBgColor: 'bg-[#DEDEFA]',
    iconColor: 'text-[#5C59E8]',
    borderColor: 'border-[#EFEFFD]'
  },
  totalOrders: {
    title: 'Total Orders',
    value: '240,500',
    change: { value: '+16%', trend: 'up' as const },
    iconBgColor: 'bg-[#E7F4EE]',
    iconColor: 'text-[#0D894F]',
    borderColor: 'border-[#F2FBF6]'
  },
  totalCustomers: {
    title: 'Total Customers',
    value: '8,000',
    change: { value: '+18%', trend: 'up' as const },
    iconBgColor: 'bg-[#FEF4E9]',
    iconColor: 'text-[#ED7B00]',
    borderColor: 'border-[#FFF9F0]'
  },
  inventoryLevel: {
    title: 'Inventory Level',
    value: '24,500',
    change: { value: '-2%', trend: 'down' as const },
    iconBgColor: 'bg-[#FEE8E7]',
    iconColor: 'text-[#F04438]',
    borderColor: 'border-[#FFF4F3]'
  }
}

export const salesChartData = [
  { date: '01', value: 40000000 },
  { date: '05', value: 35000000 },
  { date: '10', value: 45000000 },
  // ... add more data points
]

export const orderStatusData = [
  { name: 'Completed', value: 9000 },
  { name: 'Processing', value: 2000 },
  { name: 'Shipped', value: 500 },
  { name: 'Cancelled', value: 10 }
]

export const orderVolumeData = [
  { name: 'Chandelier', value: 500000 },
  { name: 'Strip Light', value: 300000 },
  { name: 'Indoor Light', value: 200000 },
  { name: 'Wall Light', value: 150000 }
]

export const recentOrders: Order[] = [
  {
    id: '#302012',
    product: { name: 'Chandelier', additional_count: 2 },
    date: '1 min ago',
    customer: { name: 'Jessica Jackson', email: 'jessica@example.com' },
    total: 150000,
    payment_status: 'paid',
    status: 'Processing'
  },
  // ... add more orders
]