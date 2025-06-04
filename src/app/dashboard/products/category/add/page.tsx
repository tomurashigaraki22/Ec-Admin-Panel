'use client'

import { useState } from 'react'
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/navigation'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export default function AddCategoryPage() {
  const router = useRouter()
  const [hasSubCategory, setHasSubCategory] = useState(false)

  return (
    <div className={`p-6 ${ubuntu.className} max-w-6xl mx-auto text-gray-600`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-700">Product Management</h1>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-gray-600">Dashboard</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Product List</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Add Category</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-[#4C8EDA] text-white rounded-lg hover:bg-[#4577b6]">
            Save
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm border border-gray-200">
        <section>
        <div className='flex items-center justify-between mb-4'>
            <h2 className="font-medium text-gray-700">Information</h2>
            <button className='px-3 py-1.5 border border-gray-200 rounded-lg flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50' onClick={()  => setHasSubCategory(!hasSubCategory)}>
                <span className="text-sm text-gray-500">{hasSubCategory ? "Remove Sub-Category" : "Add Sub-Category"}</span>
            </button>
        </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Category</label>
              <input 
                type="text"
                placeholder="Enter Product Category"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm text-gray-600">Sub-Category</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    className="sr-only peer"
                    checked={hasSubCategory}
                    onChange={e => setHasSubCategory(e.target.checked)}
                  />
                </label>
              </div>
              {hasSubCategory && (
                <input 
                  type="text"
                  placeholder="Enter Sub-Category"
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                />
              )}
            </div>

            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Category Description</label>
              <textarea 
                rows={4}
                placeholder="Enter Category Description"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600 resize-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}