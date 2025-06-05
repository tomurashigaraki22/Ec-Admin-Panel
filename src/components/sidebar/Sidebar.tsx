'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Truck,
  Package,
  BarChart,
  Bell,
  LogOut,
  Percent,
  RotateCcw,
  FileText,
  Shield,
  Image as ImageIcon
} from 'lucide-react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ShoppingCart, label: 'Order Management', href: '/dashboard/order-management', badge: '13' },
  { icon: Users, label: 'Customer Management', href: '/dashboard/customers' },
  { icon: Percent, label: 'Discount & Promotion', href: '/dashboard/discounts' },
  { icon: Package, label: 'Product Management', href: '/dashboard/products' },
  { icon: Truck, label: 'Shipping & Logistics', href: '/dashboard/shipping' },
  { icon: FileText, label: 'Inventory', href: '/dashboard/inventory' },
  { icon: RotateCcw, label: 'Returns & Refunds', href: '/dashboard/returns' },
  { icon: BarChart, label: 'Reports & Analytics', href: '/dashboard/reports' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: Shield, label: 'Permission & Roles', href: '/dashboard/roles' },
  { icon: ImageIcon, label: 'Banner Management', href: '/dashboard/banners' },
  { icon: FileText, label: 'Audit Logs', href: '/dashboard/audit' },
]

interface DecodedToken {
  user_id?: string
  username?: string
  email?: string
  // add other fields as needed
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ username?: string; email?: string }>({})

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      try {
        const decoded: DecodedToken = jwt_decode(token)
        console.log("Decoded: ", decoded)
        setUser({
          username: decoded.username,
          email: decoded.email,
        })
      } catch (e) {
        // handle error or fallback
        console.log("E: ", e)
        setUser({})
      }
    }
  }, [])

  return (
    <aside className="w-[280px] bg-[#4C8EDA] min-h-screen p-4 flex flex-col">
      <div className="flex items-center relative mt-3 w-full h-[2.5rem] py-5 gap-3 px-2 mb-8">
        <Image src="/logo.png" alt="Steadfast" fill className=" absolute object-contain" />
      </div>
      
      <nav className="flex-1 space-y-1.5 ">
        {menuItems.map((item,i) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={i}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium',
                isActive ? 'bg-[#184193] text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[14px] font-semibold">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-[11px] w-5 h-5 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 ">
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <span className="text-sm font-medium">
              {user.username
                ? user.username
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                : 'U'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {user.username || 'Unknown User'}
            </p>
            <p className="text-xs text-white/60">
              {user.email || 'No email'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            Cookies.remove('token')
            router.push('/')
           }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}