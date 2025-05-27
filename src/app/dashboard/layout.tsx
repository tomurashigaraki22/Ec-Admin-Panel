'use client'

import Sidebar from '@/components/sidebar/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#F5F5F550]">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}