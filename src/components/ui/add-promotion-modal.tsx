import { useState } from 'react'

interface AddPromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function AddPromotionModal({ isOpen, onClose, onSubmit }: AddPromotionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Add New Promotion</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault()
          onSubmit({})
        }}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Promotion Title</label>
              <input 
                type="text"
                placeholder="Enter promotion title"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Discount Type</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]">
                <option value="">Select type</option>
                <option value="shipping">Shipping Discount</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Value</label>
              <input 
                type="text"
                placeholder="Enter discount value"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Target</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]">
                <option value="">Select target</option>
                <option value="all">All Customers</option>
                <option value="selected">Selected Products</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input 
                type="date"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input 
                type="date"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#4C8EDA] text-white rounded-lg text-sm hover:bg-[#4577b6]"
            >
              Create Promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}