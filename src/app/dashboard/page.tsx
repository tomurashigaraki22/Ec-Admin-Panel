'use client'

import { useEffect, useState } from 'react'
import { Package, Users, DollarSign, Clock } from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { OrderStatusCard } from '@/components/ui/order-status-card'
import { OrderVolumeCard } from '@/components/ui/order-volume-card'
import { CustomerStatsCard } from '@/components/ui/customer-stats-card'
import { SalesChartCard } from '@/components/ui/sales-chart-card'
import { OrdersTable } from '@/components/ui/orders-table'
import Cookies from 'js-cookie'
import { DashboardData, OrderTypes } from '@/app/dashboard/types'



 
// const salesData = [
//     { date: '01', value: 800000 },
//     { date: '03', value: 750000 },
//     { date: '05', value: 900000 },
//     { date: '07', value: 750000 },
//     { date: '09', value: 800000 },
//     { date: '11', value: 900000 },
//     { date: '13', value: 950000 },
//     { date: '15', value: 1000000 },
//     { date: '17', value: 1200000 },
//     { date: '19', value: 1000000 },
//     { date: '21', value: 1100000 },
//     { date: '23', value: 1200000 },
//     { date: '25', value: 900000 },
//     { date: '27', value: 600000 },
//     { date: '29', value: 900000 },
//     { date: '31', value: 850000 },
// ]

// const orderStatus = [
//     { name: 'Completed', value: 50 },
//     { name: 'Processing', value: 30 },
//     { name: 'Shipped', value: 20 },
//     { name: 'Cancelled', value: 20 },
// ]

// const volumeBreakdown = [
//     { name: 'Chandelier', value: 16.72 },
//     { name: 'Track Light', value: 24.99 },
//     { name: 'Track Light', value: 11.13 },
//     { name: 'Others', value: 11.13 },
// ]
// const orders = [
//     {
//         id: '302012',
//         product: 'Chandelier',
//         additionalProducts: '+3 other products',
//         date: '1 min ago',
//         customer: {
//             name: 'Jessica Jackson',
//             email: 'jessicajackson@gmail.com'
//         },
//         total: 150000,
//         payment: 'Paid' as const,
//         status: 'Processing' as const
//     },
//     {
//         id: '302011',
//         product: 'Wall Light',
//         additionalProducts: '+1 other products',
//         date: '1 min ago',
//         customer: {
//             name: 'Jessica Jackson',
//             email: 'jessicajackson@gmail.com'
//         },
//         total: 150000,
//         payment: 'Pending' as const,
//         status: 'Placed' as const
//     },
//     {
//         id: '302002',
//         product: 'POP/Surface Light',
//         date: '5 hour ago',
//         customer: {
//             name: 'Jessica Jackson',
//             email: 'jessicajackson@gmail.com'
//         },
//         total: 150000,
//         payment: 'Paid' as const,
//         status: 'Shipped' as const
//     }
// ]
export default function Dashboard() {
    const [timeframe, setTimeframe] = useState('30 Days')
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    const [fetchingData, setFetchingData] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState<string>("0")
    const [orders, setOrders] = useState<OrderTypes[] | null>(null);
    const [error, setError] = useState('')

    useEffect(() => {
        console.log("TOOtal: ", total)
        const fetchData = async () => {
            setFetchingData(true)
            try {
                const token = Cookies.get('token')
                console.log("Token: ", token)
                if (!token) {
                    throw new Error('Authentication token not found')
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/stats`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include', // Include credentials in the request
                })

                if (response.status === 500) {
                    throw new Error('Server error. Please try again later.')
                }

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.error || `Request failed with status ${response.status}`)
                }

                const data = await response.json()
                setDashboardData(data)
                setError('')
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data'
                setError(errorMessage)
                console.error('Error fetching dashboard data:', err)
            } finally {
                setFetchingData(false)
            }
        }

        const fetchOrders = async () => {
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

        fetchData()
        fetchOrders()
    }, [])

    const formatTimelineData = (data: DashboardData, timeframe: string) => {
        switch (timeframe) {
          case '24 Hour':
            return data.sales_timeline.daily.data.map((item) => ({
              date: item.date,
              value: item.value,
            })) || [];
          case '7 Days':
          case '30 Days':
            return data.sales_timeline.monthly.data.map((item) => ({
              date: item.date,
              value: item.value,
            })) || [];
          case '12 Months':
            return data.sales_timeline.yearly.data.map((item) => ({
              date: `Month ${item.month}`,
              value: item.value,
            })) || [];
          default:
            return [];
        }
      };
      const formatSalesTotal = (amount: number) => {
        if (amount >= 1000000) {
          return `₦${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
          return `₦${(amount / 1000).toFixed(1)}K`;
        }
        return `₦${amount.toFixed(2)}`;
      }

    const orderStatus = [
        { name: 'Completed', value: dashboardData?.order_status.completed || 0 },
        { name: 'Processing', value: dashboardData?.order_status.processing || 0 },
        { name: 'Pending', value: dashboardData?.order_status.pending || 0 },
        { name: 'Shipped', value: dashboardData?.order_status.shipped || 0 },
        { name: 'Cancelled', value: dashboardData?.order_status.cancelled || 0 }
    ]

    // Calculate total from all statuses
    const totalOrders = orderStatus.reduce((sum, status) => sum + status.value, 0)
    console.log("Total Orders: ", totalOrders)

    // Format total orders with k/m suffix if needed
    const formatTotal = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
        console.log("Total Format Orders: ", num)
        return num.toString()
    }

    const formatCustomerStatistics = (data: DashboardData, year: string) => {
        const stats = data.customer_statistics?.[year];
      
        if (!stats || !Array.isArray(stats)) {
          console.warn(`No customer statistics found for year ${year}`);
          return [];
        }
      
        return stats.map((item) => ({
          month: item.month,
          active: item.active_users,
          newSignups: item.new_signups
        }));
      };
      



    if (fetchingData) {
        return <div>Loading dashboard data...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!dashboardData) {
        return <div>No data available</div>
    }

   
    return (
        <div className="space-y-6 pb-[5rem]">
            <div className="grid items-center px-5 py-5 border-b bg-white border-[#e1dede90] grid-cols-2 justify-between">
                <h1 className="text-xl   text-[#667085]">Dashboard Overview</h1>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Find what you're looking for"
                        className="w-full px-5 py-4 rounded-lg border text-[#5b5b5b] bg-[#FFFFFF] border-[#d3d5dc] text-sm  outline-none"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-[#979797]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid px-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
                <MetricCard
                    title="Total Sales"
                    value={`${dashboardData.overview.total_sales.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}`}
                    change={{ value: "+12%", trend: "up" }}
                    icon={DollarSign}
                    iconBgColor="bg-[#EEF4FF]"
                    iconColor="text-[#4C8EDA]"
                    borderColor="border-[#4C8EDA10]"
                />
                <MetricCard
                    title="Total Orders"
                    value={`${dashboardData.overview.total_orders ?? 0}`}
                    change={{ value: "+15%", trend: "up" }}
                    icon={Package}
                    iconBgColor="bg-[#ECFDF3]"
                    iconColor="text-[#16A34A]"
                    borderColor="border-[#16A34A10]"
                />
                <MetricCard
                    title="Total Customers"
                    value={`${dashboardData.overview.total_customers ?? 0}`}
                    change={{ value: "+10%", trend: "up" }}
                    icon={Users}
                    iconBgColor="bg-[#FEF6EE]"
                    iconColor="text-[#EA580C]"
                    borderColor="border-[#EA580C10]"
                />
                <MetricCard
                    title="Inventory Level"
                    value={Number(dashboardData.overview.inventory_level).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    change={{ value: "-8%", trend: "down" }}
                    icon={Clock}
                    iconBgColor="bg-[#EEF4FF]"
                    iconColor="text-[#2563EB]"
                    borderColor="border-[#2563EB10]"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5">
                <div className="col-span-2 grid">
                <SalesChartCard
                    data={dashboardData ? formatTimelineData(dashboardData, timeframe) : []}
                    total={
                        dashboardData
                        ? formatSalesTotal(
                            (() => {
                                switch (timeframe) {
                                case '24 Hour':
                                    return dashboardData.sales_timeline.summary.last_24_hours;
                                case '7 Days':
                                    return dashboardData.sales_timeline.summary.last_7_days;
                                case '30 Days':
                                    return dashboardData.sales_timeline.summary.last_30_days;
                                case '12 Months':
                                    return dashboardData.sales_timeline.summary.last_12_months;
                                default:
                                    return 0;
                                }
                            })()
                            )
                        : '₦0'
                    }
                    timeframe={timeframe}
                    onTimeframeChange={(newTimeframe) => {
                        setTimeframe(newTimeframe);
                        if (dashboardData) {
                        switch (newTimeframe) {
                            case '24 Hour':
                            setTotal(formatSalesTotal(dashboardData.sales_timeline.summary.last_24_hours));
                            break;
                            case '7 Days':
                            setTotal(formatSalesTotal(dashboardData.sales_timeline.summary.last_7_days));
                            break;
                            case '30 Days':
                            setTotal(formatSalesTotal(dashboardData.sales_timeline.summary.last_30_days));
                            break;
                            case '12 Months':
                            setTotal(formatSalesTotal(dashboardData.sales_timeline.summary.last_12_months));
                            break;
                        }
                        }
                    }}
                />

                </div>

                <OrderStatusCard
                    data={orderStatus}
                    total={formatTotal(totalOrders)}
                    change={`${((totalOrders - dashboardData.overview.total_orders) / dashboardData.order_status.pending * 100).toFixed(1)}%`}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5">
                <div className="col-span-2 grid">

                    <CustomerStatsCard
                        data={formatCustomerStatistics(dashboardData, '2025')}
                        selectedYear="2025"
                    />
                </div>

                <OrderVolumeCard data={dashboardData.order_volume_breakdown} />
            </div>
            <div className="px-5">

                <OrdersTable
                    orders={orders ?? []}
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
                />

            </div>

        </div>
    )
}


