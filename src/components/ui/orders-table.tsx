import { Pencil } from 'lucide-react'
import { useState } from 'react'

type OrderStatus = 'Processing' | 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled'

export type Order = {
    id: string
    product: {
        name: string
        additional_count?: number
    }
    date: string
    customer: {
        name: string
        email: string
    }
    total: number
    payment_status: 'paid' | 'unpaid' | 'Failed'
    status: OrderStatus
}

type OrdersTableProps = {
    orders: Order[]
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    onDateSelect: (date: string) => void
    onFilterChange: () => void
}

export function OrdersTable({
    orders,
    currentPage,
    totalPages,
    onPageChange,
    onDateSelect,
    onFilterChange
}: OrdersTableProps) {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])

    const getStatusColor = (status: OrderStatus) => {
        const colors = {
            Processing: 'bg-orange-50 text-orange-500',
            Placed: 'bg-orange-50 text-orange-500',
            Shipped: 'bg-blue-50 text-blue-500',
            Delivered: 'bg-green-50 text-green-500',
            Cancelled: 'bg-red-50 text-red-500'
        }
        return colors[status]
    }

    return (
        <div className="bg-white rounded-xl border border-[#E0E2E7] overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-[#E0E2E7]">
                <div className="flex items-center gap-2">
                    <h2 className="text-[#333843] font-medium">Recent Orders</h2>
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-sm rounded-full">+20 Orders</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onDateSelect('')}
                        className="px-4 py-2 text-sm text-[#667085] border border-[#E0E2E7] rounded-lg flex items-center gap-2"
                    >
                        Select Date
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 2.66667H4C2.89543 2.66667 2 3.5621 2 4.66667V12.6667C2 13.7712 2.89543 14.6667 4 14.6667H12C13.1046 14.6667 14 13.7712 14 12.6667V4.66667C14 3.5621 13.1046 2.66667 12 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.33331 1.33333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.6667 1.33333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={onFilterChange}
                        className="px-4 py-2 text-sm text-[#667085] border border-[#E0E2E7] rounded-lg flex items-center gap-2"
                    >
                        Filters
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14.6667 2H1.33333L6.66667 8.30667V12.6667L9.33333 14V8.30667L14.6667 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="px-4 py-2 text-sm text-white bg-[#5C59E8] rounded-lg">
                        View All
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#E0E2E7]">
                            <th className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    className="rounded border-[#E0E2E7]"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedOrders(orders.map(order => order.id))
                                        } else {
                                            setSelectedOrders([])
                                        }
                                    }}
                                />
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Order ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Product</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Customer</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Payment</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-[#E0E2E7] hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-[#E0E2E7]"
                                        checked={selectedOrders.includes(order.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedOrders([...selectedOrders, order.id])
                                            } else {
                                                setSelectedOrders(selectedOrders.filter(id => id !== order.id))
                                            }
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 text-xs text-[#333843]">{order.id}</td>
<td className="px-6 py-4">
    <div className="text-xs">
        <div className="font-medium text-[#333843]">{order.product.name}</div>
        {order.product.additional_count !== undefined && (
            <div className="text-[#667085]">Additional Count: {order.product.additional_count}</div>
        )}
    </div>
</td>
                                <td className="px-6 py-4 text-xs text-[#667085]">{order.date}</td>
                                <td className="px-6 py-4">
                                    <div className="text-xs">
                                        <div className="font-medium text-[#333843]">{order.customer.name}</div>
                                        <div className="text-[#667085]">{order.customer.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-[#333843]">₦{order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${order.payment_status === 'paid' ? 'bg-green-50 text-green-500' :
                                        order.payment_status === 'unpaid' ? 'bg-red-50 text-red-500' :
                                            'bg-orange-50 text-orange-500'
                                        }`}>
                                        {order.payment_status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href={`/dashboard/order-management/${order.id}`}
                                        className="text-[#667085] hover:text-[#667085] text-xs font-medium"
                                    >
                                        <Pencil size={15} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 flex items-center justify-between border-t border-[#E0E2E7]">
                <div className="text-sm text-[#667085]">
                    Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, orders.length)} of {orders.length} results
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 text-[#667085] disabled:opacity-50"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded-lg text-sm ${currentPage === page
                                ? 'bg-[#5C59E8] text-white'
                                : 'text-[#667085] hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 text-[#667085] disabled:opacity-50"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}