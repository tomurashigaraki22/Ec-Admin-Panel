'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Pencil } from 'lucide-react'
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { Customer, PaginationData } from '@/types/customer'
import Cookies from 'js-cookie'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export default function CustomerManagementPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const fetchCustomers = async (page: number) => {
    setLoading(true)
    setError(null)
    try {
      const token = Cookies.get('token')
      if (!token) throw new Error('No authentication token found')

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/get-users?page=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch customers')
      }

      const data = await response.json()
      setCustomers(data.users)
      setPagination(data.pagination)
      setCurrentPage(data.pagination.current_page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers(1)
  }, [])

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error: {error}
      </div>
    )
  }

  return (
    <div className={`p-6 ${ubuntu.className} text-sm bg-gray-50 min-h-screen`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-800">Customer Management</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Find what you're looking for"
              className="w-full p-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
            Export
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-medium">Customers List</h2>
          <div className="flex gap-2">
            <select 
              className="p-2 border border-gray-200 rounded-lg text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Select Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="deactivated">Deactivated</option>
            </select>
            <button className="p-2 border border-gray-200 rounded-lg">
              <Filter size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading customers...</div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left font-medium">Customer</th>
                  <th className="p-4 text-left font-medium">Phone Number</th>
                  <th className="p-4 text-left font-medium">Orders</th>
                  <th className="p-4 text-left font-medium">Created</th>
                  <th className="p-4 text-left font-medium">Last Login</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-200">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600">
                            {customer.name?.[0] || customer.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name || 'Unnamed User'}</p>
                          <p className="text-gray-500 text-xs">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{customer.phone_number}</td>
                    <td className="p-4 text-gray-600">{customer.orders}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(customer.created).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-600">
                      {customer.last_login 
                        ? new Date(customer.last_login).toLocaleDateString()
                        : 'Never'
                      }
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'active' ? 'bg-green-100 text-green-600' :
                        customer.status === 'suspended' ? 'bg-orange-100 text-orange-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        className="p-1.5 hover:bg-gray-100 rounded"
                        onClick={() => router.push(`/dashboard/customers/details?id=${customer.id}`)}
                      >
                        <Pencil size={16} className="text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination && (
              <div className="p-4 flex items-center justify-between border-t border-gray-200">
                <p className="text-gray-500">
                  Showing {(pagination.current_page - 1) * pagination.per_page + 1}-
                  {Math.min(pagination.current_page * pagination.per_page, pagination.total)} from {pagination.total}
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => fetchCustomers(page)}
                      className={`w-8 h-8 rounded ${
                        currentPage === page ? 'bg-[#4C8EDA] text-white' : 'bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}