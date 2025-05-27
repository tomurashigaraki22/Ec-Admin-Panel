import dynamic from 'next/dynamic'
import { Card } from '@tremor/react'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type SalesData = {
    date: string
    value: number
}

type SalesChartCardProps = {
    data: SalesData[]
    total: string
    timeframe: string
    onTimeframeChange: (timeframe: string) => void
}

export function SalesChartCard({ data, total, timeframe, onTimeframeChange }: SalesChartCardProps) {
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
            categories: data.map(item => item.date),
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
        data: data.map(item => item.value)
    }]

    const timeframeOptions = ['All Date', '12 Months', '30 Days', '7 Days', '24 Hour']

    return (
        <Card className="lg:col-span-2 p-6 shadow-sm border bg-[#FFFFFF] border-[#E0E2E7] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-[#333843] text-md font-medium">{total}</p>
                    <p className="text-[#667085] text-sm">Total Sales</p>
                </div>
                <div className="flex gap-2 bg-white rounded-[14px] p-1 border border-[#E0E2E7]">
                    {timeframeOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => onTimeframeChange(option)}
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
    )
}