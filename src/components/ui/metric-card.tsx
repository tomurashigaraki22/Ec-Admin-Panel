import { LucideIcon } from 'lucide-react'
import { Card } from '@tremor/react'
import { MoneyIcon } from './icons'

interface MetricCardProps {
    title: string
    value: string
    change: {
        value: string
        trend: 'up' | 'down'
    }
    icon: LucideIcon | typeof MoneyIcon
    iconBgColor: string
    iconColor: string
    borderColor: string
}

export function MetricCard({ title, value, change, icon: Icon, iconBgColor, iconColor, borderColor }: MetricCardProps) {
    return (
        <Card className="px-5 py-5 shadow-xs border border-[#d3d5dc] bg-[#FFFFFF] rounded-xl">
            <div className="space-y-3">
                <div className={`${iconBgColor} ${borderColor} w-9 h-9 p-1 border-3 flex justify-center items-center rounded-full`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div className="space-y-2">
                    <p className="text-[15px] text-[#667085]">{title}</p>
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-medium text-[#333843]">{value}</p>
                        <span
                            className={`text-sm font-medium ${change.trend === 'up' ? 'text-[#0D894F] bg-[#E7F4EE]' : 'text-red-600 bg-red-50'} 
              px-3 py-1 rounded-full`}
                        >
                            {change.value}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
}