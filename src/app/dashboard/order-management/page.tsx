'use client'

import { OrdersTable } from '@/components/ui/orders-table'

const orders = [
    {
        id: '302012',
        product: 'Chandelier',
        additionalProducts: '+3 other products',
        date: '1 min ago',
        customer: {
            name: 'Jessica Jackson',
            email: 'jessicajackson@gmail.com'
        },
        total: 150000,
        payment: 'Paid' as const,
        status: 'Processing' as const
    },
 ]

export default function OrderManagementPage() {
    return (
        <div className="space-y-6 pb-[5rem]">
            <div className="grid items-center px-5 py-5 border-b bg-white border-[#e1dede90] grid-cols-2 justify-between">
                <h1 className="text-xl text-[#667085]">Order Management</h1>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Find what you're looking for"
                        className="w-full px-5 py-4 rounded-lg border text-[#5b5b5b] bg-[#FFFFFF] border-[#d3d5dc] text-sm outline-none"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-[#979797]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="px-5">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-[#333843]">Order History</h2>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm border border-[#E0E2E7] rounded-lg text-[#667085] flex items-center gap-2">
                            Export
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 10L2 11C2 12.1046 2.89543 13 4 13L12 13C13.1046 13 14 12.1046 14 11L14 10M8 2L8 10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#5C59E8] text-white rounded-lg flex items-center gap-2">
                            Add Order
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3.33334V12.6667M12.6667 8H3.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <OrdersTable
                    orders={orders}
                    currentPage={1}
                    totalPages={5}
                    onPageChange={(page) => console.log('Page changed:', page)}
                    onDateSelect={(date) => console.log('Date selected:', date)}
                    onFilterChange={() => console.log('Filter changed')}
                    // full
                />
            </div>
        </div>
    )
}