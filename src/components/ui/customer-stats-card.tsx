import dynamic from 'next/dynamic'
import { Card } from '@tremor/react'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type CustomerData = {
    month: string
    active: number
    newSignups: number
}

type CustomerStatsCardProps = {
    data: CustomerData[]
    selectedYear: string
}

export function CustomerStatsCard({ data, selectedYear }: CustomerStatsCardProps) {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar' as const,
            toolbar: { show: false },
            stacked: false
        },
        colors: ['#5C59E8', '#93C5FD'],
        grid: {
            borderColor: '#E0E2E7',
            strokeDashArray: 3,
            xaxis: { lines: { show: false } }
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
                columnWidth: '20%'
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: data.map(item => item.month),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#667085' } }
        },
        yaxis: {
            labels: {
                style: { colors: '#667085' },
                formatter: (value: number) => `${(value / 1000).toFixed(0)}k`
            },
            tickAmount: 5,
            min: 0,
            max: 50000
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: (value: number) => value.toLocaleString()
            }
        },
        legend: { show: false }
    }

    const series = [
        {
            name: 'Active',
            data: data.map(item => item.active)
        },
        {
            name: 'New Sign-ups',
            data: data.map(item => item.newSignups)
        }
    ]

    return (
        <Card className="p-6 shadow-sm border border-[#E0E2E7] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#333843] font-medium">Customer Statistics</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#5C59E8]" />
                        <span className="text-sm text-[#667085]">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#93C5FD]" />
                        <span className="text-sm text-[#667085]">New Sign-ups</span>
                    </div>
                    <select 
                        value={selectedYear}
                        onChange={() => {}}
                        className="px-3 py-1.5 border border-[#E0E2E7] rounded-lg text-sm text-[#667085] bg-white outline-none"
                    >
                        <option>2025</option>
                    </select>
                </div>
            </div>
            <div className="h-[300px]">
                <Chart
                    options={chartOptions}
                    series={series}
                    type="bar"
                    height="100%"
                />
            </div>
        </Card>
    )
}