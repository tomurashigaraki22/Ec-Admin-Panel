'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CustomerDetails } from '@/types/customer'
import { Ubuntu } from 'next/font/google'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { 
  MdPerson,
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdCalendarToday, 
  MdAccessTime 
} from 'react-icons/md'
import Cookies from 'js-cookie'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

function CustomerDetailsContent() {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [statusReason, setStatusReason] = useState('')
  
  const searchParams = useSearchParams()
  const customerId = searchParams.get('id')

  const fetchCustomerDetails = async (pageNum: number) => {
    try {
      const token = Cookies.get('token')
      if (!token) throw new Error('No authentication token found')
      if (!customerId) throw new Error('Customer ID is required')

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-user-details?user_id=${customerId}&page=${pageNum}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch customer details')
      }

      const data = await response.json()
      console.log("Data: ", data)
      setCustomerDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (customerId) {
      fetchCustomerDetails(page)
    }
  }, [customerId, page])

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>
  }

  if (error || !customerDetails) {
    return <div className="p-6 text-center text-red-600">Error: {error || 'Customer not found'}</div>
  }

  // Calculate stats from order_overview
  const stats = customerDetails.order_overview

  // Update chart options
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false
      }
    },
    colors: ['#4C8EDA', '#22C55E', '#EF4444', '#FF0000'],
    labels: ['Processing', 'Completed', 'Cancelled', 'Placed'],
    series: [stats.processing, stats.completed, stats.cancelled, stats.shipped],
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Orders',
              formatter: () => stats.total.toString()
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    }
  }

  const handleStatusUpdate = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) throw new Error('No authentication token found')

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-user-status`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: customerId,
            status: newStatus,
            reason: statusReason
          })
        }
      )
      console.log("Response: ", response)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update status')
      }

      // Refresh customer details
      fetchCustomerDetails(page)
      setShowStatusModal(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  return (
    <div className={`p-6 ${ubuntu.className} text-sm bg-gray-50 min-h-screen`}>
      {/* Header with breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-800">Customer Information</h1>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-gray-600">Dashboard</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Customer List</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Customer Information</span>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Customer Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Blue Header Background */}
          <div className="h-32 bg-[#4C8EDA] rounded-t-lg relative">
            {/* Update status button */}
            <div className='absolute top-4 right-4'>
              <button 
                onClick={() => setShowStatusModal(true)}
                className='px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors duration-200 flex items-center gap-2'
              >
                <span>Update Status</span>
              </button>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Avatar and Name Section */}
            <div className="text-center -mt-16 mb-4">
              <div className="relative w-32 h-32 mx-auto mb-3 rounded-full border-4 border-white shadow-sm">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-600">
                  {customerDetails.user_info.name?.[0] || customerDetails.user_info.email[0].toUpperCase()}
                </div>
              </div>
              <h2 className="text-xl font-medium text-gray-800">{customerDetails.user_info.name}</h2>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm mt-2">
                {customerDetails.user_info.status}
              </span>
            </div>

            {/* Information List */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdPerson className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">User Name</p>
                  <p className="font-medium">{customerDetails.user_info.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdEmail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customerDetails.user_info.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdPhone className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customerDetails.user_info.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdLocationOn className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{customerDetails.user_info.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdCalendarToday className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Created</p>
                  <p className="font-medium">{customerDetails?.user_info?.date_created.split("T")[0]}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdAccessTime className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-medium">{customerDetails?.user_info?.last_login?.split("T")[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="col-span-2 space-y-6">
          {/* Order Overview Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="font-medium text-gray-800 mb-4">Order Status Overview</h2>
            <div className="flex items-center justify-between">
              <div className="w-40 h-40">
                <Chart
                  options={chartOptions}
                  series={chartOptions.series}
                  type="donut"
                  height="100%"
                />
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4C8EDA]"></span>
                    <span className="text-gray-600">Processing</span>
                  </div>
                  <p className="text-xl font-medium mt-1">{stats.processing}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <p className="text-xl font-medium mt-1">{stats.completed}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    <span className="text-gray-600">Cancelled</span>
                  </div>
                  <p className="text-xl font-medium mt-1">{stats.cancelled}</p>
                </div>
                {/* <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF0000]"></span>
                    <span className="text-gray-600">Placed</span>
                  </div>
                  <p className="text-xl font-medium mt-1">{stats.placed}</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left font-medium">Order ID</th>
                  <th className="p-4 text-left font-medium">Product</th>
                  <th className="p-4 text-left font-medium">Date</th>
                  <th className="p-4 text-left font-medium">Total</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Payment</th>  {/* New column */}
                </tr>
              </thead>
              <tbody>
                {customerDetails.orders.map((order) => (
                  <tr key={order.order_id} className="border-b border-gray-200">
                    <td className="p-4 text-gray-600">{order.order_id}</td>
                    <td className="p-4">
                      <div>
                        {/* Parse the products JSON string */}
                        {(() => {
                          try {
                            const products = JSON.parse(order.products)
                            return (
                              <>
                                <p className="text-gray-800">Product ID: {products[0].product_id}</p>
                                {products.length > 1 && (
                                  <p className="text-xs text-gray-500">+{products.length - 1} other products</p>
                                )}
                              </>
                            )
                          } catch (e) {
                            console.log("Main: ",e)
                            return <p className="text-gray-800">Invalid product data</p>
                          }
                        })()}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-600">₦{order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed' ? 'bg-green-100 text-green-600' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-600' :
                        order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.payment_status === 'paid' ? 'bg-green-100 text-green-600' :
                        order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {order?.payment_status?.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 flex items-center justify-between border-t border-gray-200">
              <p className="text-gray-500">
                Showing {((customerDetails.pagination.current_page - 1) * customerDetails.pagination.per_page) + 1}-
                {Math.min(customerDetails.pagination.current_page * customerDetails.pagination.per_page, customerDetails.pagination.total)} 
                from {customerDetails.pagination.total}
              </p>
              <div className="flex gap-1">
                {Array.from({ length: customerDetails.pagination.total_pages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded ${
                      page === pageNum ? 'bg-[#4C8EDA] text-white' : 'bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">Update Account Status</h3>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Account Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA]"
                >
                  <option value="">Select a new status</option>
                  <option value="active">Active</option>
                  <option value="deactivated">Inactive</option>
                  <option value="suspended">Suspend</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Reason for Status Change</label>
                <textarea
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  placeholder="Enter reason for status change"
                  rows={4}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-[#4C8EDA] text-white rounded-lg text-sm hover:bg-[#4577b6]"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CustomerDetailsPage() {
  return (
    <Suspense fallback={
      <div className="p-6 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-32 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <CustomerDetailsContent />
    </Suspense>
  )
}