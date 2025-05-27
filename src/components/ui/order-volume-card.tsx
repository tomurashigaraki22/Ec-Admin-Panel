import dynamic from 'next/dynamic'
import { Card } from '@tremor/react'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type VolumeData = {
    name: string
    value: number
}

type OrderVolumeCardProps = {
    data: VolumeData[]
}

export function OrderVolumeCard({ data }: OrderVolumeCardProps) {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut' as const
        },
        colors: ['#F04438', '#FB923C', '#5C59E8', '#93C5FD'],
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
                            formatter: () => '64%'
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
        <Card className="p-6 shadow-sm border border-[#E0E2E7] rounded-2xl">
            <div className="flex items-center justify-between">
                <h3 className="text-[#333843] font-medium">Order Volume Breakdown</h3>
                <button className="text-[#667085]">
                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                        <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div className="h-[240px] mt-4">
                <Chart
                    options={chartOptions}
                    series={series}
                    type="donut"
                    height="100%"
                />
            </div>
            <div className="mt-6 space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartOptions.colors![index] }} />
                            <span className="text-[#667085]">{item.name}</span>
                        </div>
                        <span className="font-medium text-[#333843]">{item.value}%</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}