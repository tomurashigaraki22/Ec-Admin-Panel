'use client'

import { useState, useEffect } from 'react'
import { Ubuntu } from 'next/font/google'
import { Search, Plus, Edit2 } from 'lucide-react'
import { AddPromotionModal } from '@/components/ui/add-promotion-modal'
import { Coupon, CreateCouponData } from '@/types/promotion'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export default function DiscountsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch coupons')
      }
      const data = await response.json()
      setCoupons(data.coupons)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coupons')
      toast.error('Failed to fetch coupons')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCoupon = async (data: CreateCouponData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create coupon')
      }

      toast.success('Coupon created successfully')
      setShowAddModal(false)
      fetchCoupons() // Refresh the list
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create coupon')
    }
  }

  const handleDeleteCoupon = async (couponCode: string) => {
    setDeleteLoading(true)
    try {
      const token = Cookies.get('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: couponCode })
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) {
          if (errorData.error === 'Token has expired') {
            toast.error('Your session has expired. Please log in again.')
            return
          }
          throw new Error('Authentication failed. Please log in again.')
        }
        throw new Error(errorData.error || 'Failed to delete coupon')
      }
      const data = await response.json()
      toast.success(data.message || 'Coupon deleted successfully')
      fetchCoupons()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete coupon')
    } finally {
      setDeleteLoading(false)
      setShowDeleteModal(false)
      setSelectedCoupon(null)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>
  }

  return (
    <div className={`p-6 ${ubuntu.className} bg-gray-50 min-h-screen`}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header with Search */}
        <div className="bg-white rounded-lg p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#4C8EDA] text-white rounded-lg text-sm hover:bg-[#4577b6] transition-colors duration-200 flex items-center gap-2"
          >
            <Plus size={16} />
            Add New Coupon
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">Loading coupons...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Code</th>
                    <th className="text-left p-4 font-medium text-gray-600">Type</th>
                    <th className="text-left p-4 font-medium text-gray-600">Value</th>
                    <th className="text-left p-4 font-medium text-gray-600">Min. Amount</th>
                    <th className="text-left p-4 font-medium text-gray-600">Description</th>
                    <th className="text-left p-4 font-medium text-gray-600">Status</th>
                    <th className="text-left p-4 font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons
                    .filter(coupon => 
                      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((coupon) => (
                      <tr key={coupon.id} className="border-b border-gray-200">
                        <td className="p-4 text-gray-800">{coupon.code}</td>
                        <td className="p-4 text-gray-600 capitalize">{coupon.type}</td>
                        <td className="p-4 text-gray-600">
                          {coupon.type === 'percentage' ? `${coupon.value}%` : `₦${coupon.value}`}
                        </td>
                        <td className="p-4 text-gray-600">
                          {coupon.minAmount ? `₦${coupon.minAmount}` : '-'}
                        </td>
                        <td className="p-4 text-gray-600">{coupon.description}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            coupon.is_available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {coupon.is_available ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded"
                            onClick={() => {
                              setSelectedCoupon(coupon);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Edit2 size={16} className="text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <AddPromotionModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCoupon}
      />

      {showDeleteModal && selectedCoupon && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Delete Coupon</h2>
            <p>Are you sure you want to delete <b>{selectedCoupon.code}</b>?</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white flex items-center justify-center min-w-[80px]"
                onClick={() => handleDeleteCoupon(selectedCoupon.code)}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <span className="loader border-2 border-t-2 border-gray-200 border-t-red-600 rounded-full w-4 h-4 animate-spin inline-block mr-2"></span>
                ) : null}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
