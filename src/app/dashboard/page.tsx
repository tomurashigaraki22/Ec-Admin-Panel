'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { DonutChart, Card, Title } from '@tremor/react'
import { Package, Users, DollarSign, Clock } from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'
import { ApexOptions } from 'apexcharts'
import { OrderStatusCard } from '@/components/ui/order-status-card'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const salesData = [
    { date: '01', value: 800000 },
    { date: '03', value: 750000 },
    { date: '05', value: 900000 },
    { date: '07', value: 750000 },
    { date: '09', value: 800000 },
    { date: '11', value: 900000 },
    { date: '13', value: 950000 },
    { date: '15', value: 1000000 },
    { date: '17', value: 1200000 },
    { date: '19', value: 1000000 },
    { date: '21', value: 1100000 },
    { date: '23', value: 1200000 },
    { date: '25', value: 900000 },
    { date: '27', value: 600000 },
    { date: '29', value: 900000 },
    { date: '31', value: 850000 },
]

const orderStatus = [
    { name: 'Completed', value: 50 },
    { name: 'Processing', value: 30 },
    { name: 'Shipped', value: 20 },
    { name: 'Cancelled', value: 20 },
]

const volumeBreakdown = [
    { name: 'Chandelier', value: 16.72 },
    { name: 'Track Light', value: 24.99 },
    { name: 'Track Light', value: 11.13 },
    { name: 'Others', value: 11.13 },
]

export default function Dashboard() {
    const [timeframe, setTimeframe] = useState('30 Days')

    const chartOptions: ApexOptions = {
        chart: {
            type: 'area' as const,
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#5C59E8'],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            borderColor: '#E0E2E7',
            strokeDashArray: 3,
            xaxis: { lines: { show: false } }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: salesData.map(item => item.date),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#667085' } }
        },
        yaxis: {
            labels: {
                style: { colors: '#667085' },
                formatter: (value: number) => `₦${(value / 1000000).toFixed(1)}M`
            }
        },
        tooltip: {
            theme: 'light',
            x: { show: true },
            y: {
                formatter: (value: number) => `₦${value.toLocaleString()}`
            }
        },
        markers: {
            size: 0,
            strokeWidth: 2,
            strokeColors: '#FFFFFF',
            hover: { size: 6 }
        }
    }

    const chartSeries = [{
        name: 'Sales',
        data: salesData.map(item => item.value)
    }]

    return (
        <div className="space-y-6">
            <div className="grid items-center px-5 py-5 border-b border-[#e1dede90] grid-cols-2 justify-between">
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
                    value="₦40,689,500"
                    change={{ value: "+12%", trend: "up" }}
                    icon={DollarSign}
                    iconBgColor="bg-[#EEF4FF]"
                    iconColor="text-[#4C8EDA]"
                />
                <MetricCard
                    title="Total Orders"
                    value="240,500"
                    change={{ value: "+15%", trend: "up" }}
                    icon={Package}
                    iconBgColor="bg-[#ECFDF3]"
                    iconColor="text-green-600"
                />
                <MetricCard
                    title="Total Customers"
                    value="8,000"
                    change={{ value: "+10%", trend: "up" }}
                    icon={Users}
                    iconBgColor="bg-[#FEF6EE]"
                    iconColor="text-orange-600"
                />
                <MetricCard
                    title="Inventory Level"
                    value="24,500"
                    change={{ value: "-8%", trend: "down" }}
                    icon={Clock}
                    iconBgColor="bg-[#EEF4FF]"
                    iconColor="text-blue-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-5">
                <Card className="lg:col-span-2 p-6 shadow-sm border bg-[#FFFFFF] border-[#E0E2E7] rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-[#333843] text-md font-medium">₦40,689,500</p>
                            <p className="text-[#667085] text-sm">Total Sales</p>
                        </div>
                        <div className="flex gap-2 bg-white rounded-[14px] p-1 border border-[#E0E2E7]">
                            {['All Date', '12 Months', '30 Days', '7 Days', '24 Hour'].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setTimeframe(option)}
                                    className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-colors ${timeframe === option
                                        ? 'bg-[#DEDEFA] bg-opacity-10 text-[#5C59E8]'
                                        : 'text-[#667085] hover:bg-gray-50'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] bg-[#FFFFFF]">
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height="100%"
                            width="100%"
                        />
                    </div>
                </Card>

                <OrderStatusCard
                    data={orderStatus}
                    total="12k"
                    change="+10%"
                />
            </div>
        </div>
    )
}

