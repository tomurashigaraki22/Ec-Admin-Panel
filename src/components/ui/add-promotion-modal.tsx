import { useState, FormEvent } from 'react'
import { CreateCouponData } from '@/types/promotion'

interface AddPromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateCouponData) => void
}

export function AddPromotionModal({ isOpen, onClose, onSubmit }: AddPromotionModalProps) {
  const [formData, setFormData] = useState<CreateCouponData>({
    code: '',
    type: 'percentage',
    value: 0,
    minAmount: undefined,
    description: '',
    is_available: true
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
          <h3 className="text-lg font-medium">Add New Coupon</h3>
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
              <label className="block text-sm text-gray-600 mb-1">Coupon Code</label>
              <input 
                type="text"
                placeholder="Enter coupon code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Discount Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  type: e.target.value as CreateCouponData['type']
                }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Value ({formData.type === 'percentage' ? '%' : '₦'})
              </label>
              <input 
                type="number"
                placeholder="Enter discount value"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  value: parseFloat(e.target.value) || 0 
                }))}
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Minimum Amount (₦)</label>
              <input 
                type="number"
                placeholder="Enter minimum amount (optional)"
                value={formData.minAmount || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  minAmount: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              placeholder="Enter coupon description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={3}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_available"
              checked={formData.is_available}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                is_available: e.target.checked 
              }))}
              className="rounded text-[#4C8EDA]"
            />
            <label htmlFor="is_available" className="text-sm text-gray-600">
              Make coupon available immediately
            </label>
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
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}