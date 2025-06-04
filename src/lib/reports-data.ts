import { MoneyIcon } from '@/components/ui/icons'
import { Package2, Users, LayoutGrid } from 'lucide-react'

export const analyticsStats = {
  totalRevenue: {
    title: 'Total Revenue',
    value: 'N40,689,500',
    change: { value: '+8%', trend: 'up' },
    icon: MoneyIcon,
    iconBgColor: 'bg-[#DEDEFA]',
    iconColor: 'text-[#5C59E8]',
    borderColor: 'border-[#EFEFFD]'
  },
  totalOrders: {
    title: 'Total Orders',
    value: '240,500',
    change: { value: '+16%', trend: 'up' },
    icon: Package2,
    iconBgColor: 'bg-[#E7F4EE]',
    iconColor: 'text-[#0D894F]',
    borderColor: 'border-[#F2FBF6]'
  },
  totalCustomers: {
    title: 'Total Customers',
    value: '8,000',
    change: { value: '+18%', trend: 'up' },
    icon: Users,
    iconBgColor: 'bg-[#FEF4E9]',
    iconColor: 'text-[#ED7B00]',
    borderColor: 'border-[#FFF9F0]'
  },
  inventoryCount: {
    title: 'Inventory Count',
    value: '24,500',
    change: { value: '-2%', trend: 'down' },
    icon: LayoutGrid,
    iconBgColor: 'bg-[#FEE8E7]',
    iconColor: 'text-[#F04438]',
    borderColor: 'border-[#FFF4F3]'
  }
}