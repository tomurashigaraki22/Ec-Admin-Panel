'use client'

import { useState } from 'react'
import { Ubuntu } from 'next/font/google'
import { Search, Plus, Filter, Edit2 } from 'lucide-react'
import { AddPromotionModal } from '@/components/ui/add-promotion-modal'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

interface Promotion {
  title: string
  discountType: 'Shipping Discount' | 'Percentage' | 'Fixed Amount'
  value: string
  duration: string
  status: 'Active' | 'Expired'
  usage: number
  target: string
}

const promotions: Promotion[] = [
  {
    title: 'Free Shipping Offer',
    discountType: 'Shipping Discount',
    value: 'Free',
    duration: '24 Mar 2025 - 30 Mar 2025',
    status: 'Expired',
    usage: 43,
    target: 'All Customers'
  },
  {
    title: 'Free Shipping Offer',
    discountType: 'Percentage',
    value: '5%',
    duration: '24 Mar 2025 - 30 Mar 2025',
    status: 'Active',
    usage: 12,
    target: 'Selected Products'
  },
  // ... add more promotions
]

export default function DiscountsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

    const handleAddPromotion = (newPromotion: Promotion) => {
        // Logic to add new promotion
        console.log('New Promotion:', newPromotion)
        setShowAddModal(false)
    }

  return (
    <div className={`p-6 ${ubuntu.className} bg-gray-50 min-h-screen`}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header with Search */}
        <div className="bg-white rounded-lg p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Find what you're looking for"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Promotion Overview Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-medium">Promotion Overview</h2>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <Filter size={16} />
                Filters
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#4C8EDA] text-white rounded-lg text-sm hover:bg-[#4577b6] transition-colors duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Promotion
              </button>
            </div>
          </div>

          {/* Promotions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Promotion Title</th>
                  <th className="text-left p-4 font-medium text-gray-600">Discount Type</th>
                  <th className="text-left p-4 font-medium text-gray-600">Value</th>
                  <th className="text-left p-4 font-medium text-gray-600">Duration</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Usage</th>
                  <th className="text-left p-4 font-medium text-gray-600">Target</th>
                  <th className="text-left p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promo, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-4 text-gray-800">{promo.title}</td>
                    <td className="p-4 text-gray-600">{promo.discountType}</td>
                    <td className="p-4 text-gray-600">{promo.value}</td>
                    <td className="p-4 text-gray-600">{promo.duration}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        promo.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {promo.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{promo.usage}</td>
                    <td className="p-4 text-gray-600">{promo.target}</td>
                    <td className="p-4">
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Edit2 size={16} className="text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 1-10 from 100</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm ${
                    currentPage === page
                      ? 'bg-[#4C8EDA] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the modal component */}
      <AddPromotionModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPromotion}
      />
    </div>
  )
}