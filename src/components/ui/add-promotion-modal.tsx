import { useState, FormEvent } from 'react'
import { PromotionData } from '@/types/promotion'

interface AddPromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PromotionData) => void
}

export function AddPromotionModal({ isOpen, onClose, onSubmit }: AddPromotionModalProps) {
  const [formData, setFormData] = useState<PromotionData>({
    title: '',
    discountType: 'Shipping Discount',
    value: '',
    target: 'All Customers',
    startDate: '',
    endDate: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Promotion Title</label>
              <input 
                type="text"
                placeholder="Enter promotion title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Discount Type</label>
              <select 
                value={formData.discountType}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  discountType: e.target.value as PromotionData['discountType']
                }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              >
                <option value="Shipping Discount">Shipping Discount</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed Amount">Fixed Amount</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Value</label>
              <input 
                type="text"
                placeholder="Enter discount value"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Target</label>
              <select 
                value={formData.target}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  target: e.target.value as PromotionData['target']
                }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              >
                <option value="All Customers">All Customers</option>
                <option value="Selected Products">Selected Products</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input 
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
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