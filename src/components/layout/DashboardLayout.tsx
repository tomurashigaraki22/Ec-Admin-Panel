import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Truck,
  Package,
  BarChart,
  Bell,
  Settings,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: ShoppingCart, label: 'Order Management', href: '/dashboard/orders' },
    { icon: Users, label: 'Customer Management', href: '/dashboard/customers' },
    { icon: Package, label: 'Product Management', href: '/dashboard/products' },
    { icon: Truck, label: 'Shipping & Logistics', href: '/dashboard/shipping' },
    { icon: BarChart, label: 'Reports & Analytics', href: '/dashboard/reports' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  router.pathname === item.href ? 'bg-gray-100' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}