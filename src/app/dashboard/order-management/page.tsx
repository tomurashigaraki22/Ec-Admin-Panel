'use client'

import { OrdersTable } from '@/components/ui/orders-table'
import { OrderTypes } from '../types'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'


export default function OrderManagementPage() {
    const [orders, setOrders] = useState<OrderTypes[]>([])
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)


    const fetchOrders = async () => {
        console.log("Error: ", error)
        try {
            const token = Cookies.get('token')
            console.log("Token: ", token)
            if (!token) {
                throw new Error('Authentication token not found')
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if (response.status === 500) {
                throw new Error('Server error. Please try again later.')
            }
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || `Request failed with status ${response.status}`)
            }
            const data = await response.json()
            setOrders(data.orders)
        }   
        catch (err) {
            const errorMessage = err instanceof Error? err.message : 'Failed to fetch orders'
            setError(errorMessage)
            console.error('Error fetching orders:', err)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])



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
                    currentPage={currentPage}
                    totalPages={5}
                    onPageChange={(page) => {
                        const fetchOrders = async () => {
                            try {
                                const token = Cookies.get('token')
                                console.log("Token: ", token)
                                if (!token) {
                                    throw new Error('Authentication token not found')
                                }
                                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?page=${page}`, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    }
                                })
                                if (response.status === 500) {
                                    throw new Error('Server error. Please try again later.')
                                }
                                if (!response.ok) {
                                    const errorData = await response.json().catch(() => ({}))
                                    throw new Error(errorData.error || `Request failed with status ${response.status}`)
                                }
                                const data = await response.json()
                                setOrders(data.orders)
                                setCurrentPage(page)
                            }   
                            catch (err) {
                                const errorMessage = err instanceof Error? err.message : 'Failed to fetch orders'
                                setError(errorMessage)
                                console.error('Error fetching orders:', err)
                            }
                        }

                        fetchOrders()
                    }}
                    onDateSelect={(date) => console.log('Date selected:', date)}
                    onFilterChange={() => console.log('Filter changed')}
                    // full
                />
            </div>
        </div>
    )
}