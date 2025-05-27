import dynamic from 'next/dynamic'
import { Card } from '@tremor/react'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type OrderStatus = {
    name: string
    value: number
}

type OrderStatusCardProps = {
    data: OrderStatus[]
    total: string
    change: string
}

export function OrderStatusCard({ data, total, change }: OrderStatusCardProps) {
    const chartColors = ['#5C59E8', '#9D9BF1', '#BEBDF6', '#DEDEFA']
    
    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut' as const
        },
        colors: chartColors,
        labels: data.map(item => item.name),
        legend: { show: false },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: '',
                            formatter: () => total
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        states: {
            hover: { filter: { type: 'none' } },
            active: { filter: { type: 'none' } }
        }
    }

    const series = data.map(item => item.value)

    return (
        <Card className="p-6 shadow-sm border bg-[#fff] border-[#E0E2E7] rounded-2xl">
            <div className="flex items-center justify-between">
                <h3 className="text-[#333843] font-medium">Order Status Overview</h3>
                <button className="text-[#667085]">
                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                        <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div className="relative mt-4">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                    <p className="text-xs mt-[3rem] text-[#5C59E8]">{change}</p>
                </div>
                <Chart
                    options={chartOptions}
                    series={series}
                    type="donut"
                    height={240}
                />
            </div>
            <div className="mt-6 space-y-3">
                {data.map((status, index) => (
                    <div key={status.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[index] }} />
                            <span className="text-[#667085]">{status.name}</span>
                        </div>
                        <span className="font-medium text-[#333843]">{status.value}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}