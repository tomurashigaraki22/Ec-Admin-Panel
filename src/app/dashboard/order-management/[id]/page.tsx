'use client'

import { File } from "lucide-react"

type OrderStatus = 'Processing' | 'Placed' | 'Shipped' | 'Arrived' | 'Delivered'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    const currentStatus: OrderStatus = 'Processing'

    const getStatusColor = (status: OrderStatus, isActive: boolean) => {
        if (!isActive) return 'text-[#667085]'
        return {
            Processing: 'text-[#5C59E8]',
            Placed: 'text-[#5C59E8]',
            Shipped: 'text-[#5C59E8]',
            Arrived: 'text-[#5C59E8]',
            Delivered: 'text-[#5C59E8]'
        }[status]
    }

    const isStatusActive = (status: OrderStatus) => {
        const order: Record<OrderStatus, number> = {
            Placed: 1,
            Processing: 2,
            Shipped: 3,
            Arrived: 4,
            Delivered: 5
        }
        return order[currentStatus] >= order[status]
    }

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
                <div className="flex items-center gap-2 mb-5 text-[#667085]">
                    <span>Dashboard</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Order History</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#333843]">Order Details</span>
                </div>

                <div className="bg-white rounded-xl border border-[#E0E2E7] p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-medium text-[#333843]">Order #{params.id}</h2>
                            <span className="px-2 py-1 bg-orange-50 text-orange-500 text-sm rounded-full">{currentStatus}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <select className="px-4 py-2 text-sm border border-[#E0E2E7] rounded-lg text-[#667085] bg-white">
                                <option>Processing</option>
                                <option>Placed</option>
                                <option>Shipped</option>
                                <option>Arrived</option>
                                <option>Delivered</option>
                            </select>
                            <button className="px-4 py-2 text-sm border border-[#E0E2E7] rounded-lg text-[#667085] flex items-center gap-2">
                                Export
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 10L2 11C2 12.1046 2.89543 13 4 13L12 13C13.1046 13 14 12.1046 14 11L14 10M8 2L8 10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="px-4 py-2 text-sm border border-[#E0E2E7] rounded-lg text-[#667085] flex items-center gap-2">
                                Invoice
                                <File size={16} />
                            </button>
                            <button className="px-4 py-2 text-sm bg-[#5C59E8] text-white rounded-lg">
                                Save
                            </button>

                        </div>
                    </div>

                    <div className="flex items-center justify-between relative pb-8 mt-[3rem] mx-[5rem]">
                        <div className="absolute left-0 right-0 top-4 h-[2px] bg-[#E0E2E7]" />
                        <div className="absolute left-0 top-4 h-[2px] bg-[#5C59E8] w-[50%] " />

                        <div className="grid grid-cols-5 w-full ">
                            {['Order Placed', 'Processing', 'Shipped', 'Arrived', 'Delivered'].map((status, index) => {
                                const statusKey = status === 'Order Placed' ? 'Placed' : status;
                                const isActive = isStatusActive(statusKey as OrderStatus);
                                return (
                                    <div key={index} className="relative col-span-1 z-10 text-center ">
                                        <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-4 flex items-center justify-center ${isActive ? 'bg-[#5C59E8] border-[#5C59E8]' : 'bg-white border-[#E0E2E7]'}`}>
                                            {isActive && index === 0 && (
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M2 8L6 12L14 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className={`flex flex-col items-center justify-center ${isActive ? '' : 'opacity-50'}`}>
                                            <div className="">
                                                {index === 0 && (
                                                    <svg width="29" height="30" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M10.5 27H6.5C6.23478 27 5.98043 26.8946 5.79289 26.7071C5.60536 26.5196 5.5 26.2652 5.5 26V6C5.5 5.73478 5.60536 5.48043 5.79289 5.29289C5.98043 5.10536 6.23478 5 6.5 5H10.5V27Z" fill="#2DB324" />
                                                        <path d="M14.5 14H22.5" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.5 18H22.5" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M26.5 5H6.5C5.94772 5 5.5 5.44772 5.5 6V26C5.5 26.5523 5.94772 27 6.5 27H26.5C27.0523 27 27.5 26.5523 27.5 26V6C27.5 5.44772 27.0523 5 26.5 5Z" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.5 5V27" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                                {index === 1 && (
                                                    <svg width="29" height="30" viewBox="0 0 33 32" fill="none" xmlns="">
                                                        <path opacity="0.2" d="M4.6375 9.32495C4.54693 9.48052 4.49946 9.65743 4.5 9.83745V22.1625C4.50096 22.3405 4.54884 22.5151 4.63882 22.6687C4.7288 22.8224 4.85769 22.9495 5.0125 23.0375L16.0125 29.225C16.1608 29.3097 16.3292 29.3529 16.5 29.35L16.6125 16L4.6375 9.32495Z" fill="#184193" />
                                                        <path d="M28.5 22.1625V9.83753C28.499 9.6595 28.4512 9.48487 28.3612 9.33125C28.2712 9.17763 28.1423 9.05045 27.9875 8.96253L16.9875 2.77503C16.8393 2.68946 16.6711 2.64441 16.5 2.64441C16.3289 2.64441 16.1607 2.68946 16.0125 2.77503L5.0125 8.96253C4.85769 9.05045 4.72879 9.17763 4.63882 9.33125C4.54884 9.48487 4.50096 9.6595 4.5 9.83753V22.1625C4.50096 22.3406 4.54884 22.5152 4.63882 22.6688C4.72879 22.8224 4.85769 22.9496 5.0125 23.0375L16.0125 29.225C16.1607 29.3106 16.3289 29.3557 16.5 29.3557C16.6711 29.3557 16.8393 29.3106 16.9875 29.225L27.9875 23.0375C28.1423 22.9496 28.2712 22.8224 28.3612 22.6688C28.4512 22.5152 28.499 22.3406 28.5 22.1625V22.1625Z" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M22.625 19.0625V12.5625L10.5 5.875" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M28.3617 9.32495L16.6117 16L4.63672 9.32495" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.6125 16L16.5 29.35" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                )}
                                                {index === 2 && (
                                                    <svg width="29" height="30" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M22.5 18H2.5V23C2.5 23.2652 2.60536 23.5196 2.79289 23.7071C2.98043 23.8946 3.23478 24 3.5 24H6C6 23.2044 6.31607 22.4413 6.87868 21.8787C7.44129 21.3161 8.20435 21 9 21C9.79565 21 10.5587 21.3161 11.1213 21.8787C11.6839 22.4413 12 23.2044 12 24H21C20.9997 23.4731 21.1381 22.9553 21.4014 22.4989C21.6648 22.0425 22.0437 21.6635 22.5 21.4V18Z" fill="#184193" />
                                                        <path opacity="0.2" d="M27 24C27.0003 23.4732 26.862 22.9557 26.5988 22.4993C26.3356 22.043 25.9569 21.664 25.5008 21.4005C25.0447 21.1369 24.5273 20.9982 24.0005 20.9981C23.4737 20.998 22.9562 21.1366 22.5 21.4V15H30.5V23C30.5 23.2652 30.3946 23.5196 30.2071 23.7071C30.0196 23.8946 29.7652 24 29.5 24H27Z" fill="#184193" />
                                                        <path d="M22.5 10H27.825C28.0242 9.99872 28.2192 10.0577 28.3843 10.1693C28.5494 10.2808 28.6769 10.4397 28.75 10.625L30.5 15" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.5 18H22.5" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M24 27C25.6569 27 27 25.6569 27 24C27 22.3431 25.6569 21 24 21C22.3431 21 21 22.3431 21 24C21 25.6569 22.3431 27 24 27Z" stroke="#184193" strokeWidth="2" strokeMiterlimit="10" />
                                                        <path d="M9 27C10.6569 27 12 25.6569 12 24C12 22.3431 10.6569 21 9 21C7.34315 21 6 22.3431 6 24C6 25.6569 7.34315 27 9 27Z" stroke="#184193" strokeWidth="2" strokeMiterlimit="10" />
                                                        <path d="M21 24H12" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6 24H3.5C3.23478 24 2.98043 23.8946 2.79289 23.7071C2.60536 23.5196 2.5 23.2652 2.5 23V9C2.5 8.73478 2.60536 8.48043 2.79289 8.29289C2.98043 8.10536 3.23478 8 3.5 8H22.5V21.4" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M22.5 15H30.5V23C30.5 23.2652 30.3946 23.5196 30.2071 23.7071C30.0196 23.8946 29.7652 24 29.5 24H27" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                )}
                                                {index === 3 && (
                                                    <svg width="29" height="30" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M22.5 18H2.5V23C2.5 23.2652 2.60536 23.5196 2.79289 23.7071C2.98043 23.8946 3.23478 24 3.5 24H6C6 23.2044 6.31607 22.4413 6.87868 21.8787C7.44129 21.3161 8.20435 21 9 21C9.79565 21 10.5587 21.3161 11.1213 21.8787C11.6839 22.4413 12 23.2044 12 24H21C20.9997 23.4731 21.1381 22.9553 21.4014 22.4989C21.6648 22.0425 22.0437 21.6635 22.5 21.4V18Z" fill="#184193" />
                                                        <path opacity="0.2" d="M27 24C27.0003 23.4732 26.862 22.9557 26.5988 22.4993C26.3356 22.043 25.9569 21.664 25.5008 21.4005C25.0447 21.1369 24.5273 20.9982 24.0005 20.9981C23.4737 20.998 22.9562 21.1366 22.5 21.4V15H30.5V23C30.5 23.2652 30.3946 23.5196 30.2071 23.7071C30.0196 23.8946 29.7652 24 29.5 24H27Z" fill="#184193" />
                                                        <path d="M22.5 10H27.825C28.0242 9.99872 28.2192 10.0577 28.3843 10.1693C28.5494 10.2808 28.6769 10.4397 28.75 10.625L30.5 15" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.5 18H22.5" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M24 27C25.6569 27 27 25.6569 27 24C27 22.3431 25.6569 21 24 21C22.3431 21 21 22.3431 21 24C21 25.6569 22.3431 27 24 27Z" stroke="#184193" strokeWidth="2" strokeMiterlimit="10" />
                                                        <path d="M9 27C10.6569 27 12 25.6569 12 24C12 22.3431 10.6569 21 9 21C7.34315 21 6 22.3431 6 24C6 25.6569 7.34315 27 9 27Z" stroke="#184193" strokeWidth="2" strokeMiterlimit="10" />
                                                        <path d="M21 24H12" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6 24H3.5C3.23478 24 2.98043 23.8946 2.79289 23.7071C2.60536 23.5196 2.5 23.2652 2.5 23V9C2.5 8.73478 2.60536 8.48043 2.79289 8.29289C2.98043 8.10536 3.23478 8 3.5 8H22.5V21.4" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M22.5 15H30.5V23C30.5 23.2652 30.3946 23.5196 30.2071 23.7071C30.0196 23.8946 29.7652 24 29.5 24H27" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                )}
                                                {index === 4 && (
                                                    <svg width="29" height="30" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M25.5 19.1125L20.9 23.7125C20.7746 23.8298 20.6227 23.9149 20.4573 23.9606C20.2918 24.0063 20.1178 24.0113 19.95 23.975L12.7 22.1625C12.5676 22.1256 12.4442 22.0618 12.3375 21.975L5.5 16.6375L9.575 8.97502L15.9875 7.10002C16.2154 7.03468 16.459 7.0524 16.675 7.15002L21 9.11252H18.4125C18.2826 9.11207 18.154 9.13723 18.0339 9.18656C17.9138 9.23589 17.8045 9.30843 17.7125 9.40002L12.8125 14.2875C12.7125 14.3902 12.6354 14.513 12.5863 14.6478C12.5373 14.7825 12.5174 14.9261 12.5281 15.0691C12.5387 15.2121 12.5796 15.3512 12.648 15.4772C12.7164 15.6032 12.8109 15.7132 12.925 15.8L13.6 16.3125C14.2932 16.8299 15.135 17.1094 16 17.1094C16.865 17.1094 17.7068 16.8299 18.4 16.3125L20 15.1125L25.5 19.1125Z" fill="#184193" />
                                                        <path d="M30.5875 15.225L27.5 16.7625L23.5 9.11247L26.625 7.54997C26.8572 7.43159 27.1269 7.40983 27.3751 7.48945C27.6233 7.56906 27.83 7.74359 27.95 7.97497L31.025 13.8625C31.0874 13.9803 31.1255 14.1095 31.1372 14.2423C31.1489 14.3751 31.134 14.5089 31.0932 14.6359C31.0525 14.7628 30.9867 14.8803 30.8999 14.9815C30.813 15.0827 30.7068 15.1654 30.5875 15.225V15.225Z" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M5.49979 16.6375L2.41229 15.0875C2.29341 15.0292 2.18746 14.9477 2.10073 14.8476C2.01401 14.7476 1.94829 14.6311 1.90747 14.5052C1.86666 14.3793 1.85159 14.2464 1.86315 14.1145C1.87471 13.9826 1.91268 13.8544 1.97479 13.7375L5.04979 7.84999C5.17008 7.61878 5.37588 7.44367 5.62337 7.36195C5.87086 7.28023 6.14047 7.29837 6.37479 7.41249L9.49979 8.97499L5.49979 16.6375Z" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M27.5 16.7625L25.5 19.1124L20.9 23.7125C20.7746 23.8297 20.6227 23.9148 20.4573 23.9605C20.2918 24.0062 20.1178 24.0112 19.95 23.975L12.7 22.1625C12.5676 22.1255 12.4442 22.0617 12.3375 21.975L5.5 16.6375" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M25.5001 19.1126L20.0001 15.1126L18.4001 16.3126C17.7069 16.8299 16.8651 17.1094 16.0001 17.1094C15.1351 17.1094 14.2933 16.8299 13.6001 16.3126L12.9251 15.8001C12.811 15.7133 12.7166 15.6032 12.6481 15.4772C12.5797 15.3512 12.5388 15.2121 12.5282 15.0691C12.5175 14.9262 12.5374 14.7825 12.5864 14.6478C12.6355 14.5131 12.7126 14.3903 12.8126 14.2876L17.7126 9.40005C17.8047 9.30846 17.9139 9.23592 18.034 9.18659C18.1541 9.13726 18.2828 9.1121 18.4126 9.11255H23.5001" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M9.57422 8.97502L15.9867 7.10002C16.2146 7.03468 16.4582 7.0524 16.6742 7.15002L20.9992 9.11252" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.5 26.6125L10.7375 25.6625C10.5842 25.6279 10.4422 25.5547 10.325 25.45L7.5 23" stroke="#184193" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                )}
                                            </div>
                                            <div className={`text-xs pt-3 ${isActive ? 'text-[#151515]' : 'text-[#151515]'
                                                }`}>{status}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-4 border border-[#E0E2E7] rounded-lg p-4">
                            <h3 className="font-medium text-[#333843]">Order #302011</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Added</span>
                                    <span className="text-[#333843]">23 Apr 2025</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4L2 12C2 12.5523 2.44772 13 3 13L13 13C13.5523 13 14 12.5523 14 12L14 4C14 3.44772 13.5523 3 13 3L3 3C2.44772 3 2 3.44772 2 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 7L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Payment Method</span>
                                    <span className="text-[#333843]">Visa</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M1 3L1 13L15 13L15 3L8 8L1 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Shipping Method</span>
                                    <span className="text-[#333843]">Standard Delivery</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border border-[#E0E2E7] rounded-lg p-4">
                            <h3 className="font-medium text-[#333843]">Customer</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Customer</span>
                                    <span className="text-[#333843]">Jessica Jackson</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 3L2 13C2 13.5523 2.44772 14 3 14L13 14C13.5523 14 14 13.5523 14 13L14 3C14 2.44772 13.5523 2 13 2L3 2C2.44772 2 2 2.44772 2 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 3L8 8L2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Email</span>
                                    <span className="text-[#333843]">jacksonjess@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14.5 11.2V13.2C14.5 13.7304 14.2893 14.2391 13.9142 14.6142C13.5391 14.9893 13.0304 15.2 12.5 15.2C9.39 14.97 6.39 13.72 4 11.5C1.78 9.11 0.53 6.11 0.3 3C0.3 2.46957 0.510714 1.96086 0.885786 1.58579C1.26086 1.21071 1.76957 1 2.3 1H4.3C4.82 1 5.27 1.38 5.35 1.89C5.5 2.89 5.8 3.86 6.25 4.77C6.4 5.08 6.35 5.44 6.13 5.7L5.05 6.78C6.76 9.69 9.31 12.24 12.22 13.95L13.3 12.87C13.56 12.65 13.92 12.6 14.23 12.75C15.14 13.2 16.11 13.5 17.11 13.65C17.62 13.73 18 14.18 18 14.7V16.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Phone</span>
                                    <span className="text-[#333843]">+2348070011981</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border border-[#E0E2E7] rounded-lg p-4">
                            <h3 className="font-medium text-[#333843]">Delivery Information</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4L2 12C2 12.5523 2.44772 13 3 13L13 13C13.5523 13 14 12.5523 14 12L14 4C14 3.44772 13.5523 3 13 3L3 3C2.44772 3 2 3.44772 2 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 7L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Address</span>
                                    <span className="text-[#333843]">No 23 Michael Cresent</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 8L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 2C9.5 3.5 10.5 5.5 10.5 8C10.5 10.5 9.5 12.5 8 14C6.5 12.5 5.5 10.5 5.5 8C5.5 5.5 6.5 3.5 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>State</span>
                                    <span className="text-[#333843]">Enugu</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#667085]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Pick up Location</span>
                                    <span className="text-[#333843]">Young shall grow</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-medium text-[#333843]">Order List</h3>
                            <span className="px-2 py-1 bg-[#5C59E8] bg-opacity-10 text-[#5C59E8] text-sm rounded-full">3 Products</span>
                        </div>

                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E0E2E7]">
                                    <th className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-[#E0E2E7]" />
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Order ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Product Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Quantity</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-[#333843]">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#E0E2E7]">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-[#E0E2E7]" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#5C59E8]">#302012</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#F0F1F3] rounded-lg"></div>
                                            <div className="text-sm text-[#333843]">Chandelier</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">1 min ago</td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">N150,000</td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">N300,000</td>
                                </tr>
                                <tr className="border-b border-[#E0E2E7]">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-[#E0E2E7]" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#5C59E8]">#301600</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#F0F1F3] rounded-lg"></div>
                                            <div className="text-sm text-[#333843]">POP/Surface Light</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">2 Apr 2025</td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">N150,000</td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">N150,000</td>
                                </tr>
                                <tr className="border-b border-[#E0E2E7]">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-[#E0E2E7]" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#5C59E8]">#301002</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#F0F1F3] rounded-lg"></div>
                                            <div className="text-sm text-[#333843]">POP/Surface Light</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">24 Mar 2025</td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">N150,000</td>
                                    <td className="px-6 py-4 text-sm text-[#333843]">N150,000</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6 space-y-2  ">
                                 <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#667085]">Sub total</span>
                                    <span className="text-[#333843]">NGN 242,700</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#667085]">Saving</span>
                                    <span className="text-red-500">-NGN 1,000</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#667085]">Sub total</span>
                                    <span className="text-[#333843]">NGN 6,000</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#667085]">Sub total</span>
                                    <span className="text-[#333843]">A03467</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span className="text-[#667085]">Estimated Total</span>
                                    <span className="text-[#333843]">NGN 249,700</span>
                                </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
