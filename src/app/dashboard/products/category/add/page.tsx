'use client'

import { useState, FormEvent } from 'react'
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CreateCategoryData } from '@/types/category'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export default function AddCategoryPage() {
  const router = useRouter()
  const [hasSubCategory, setHasSubCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateCategoryData>({
    name: '',
    image_url: '',
    slug: '',
    description: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Generate slug from name if not provided
          slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-')
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create category')
      }

      toast.success('Category created successfully')
      router.push('/dashboard/products')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`p-6 ${ubuntu.className} max-w-6xl mx-auto text-gray-600`}>
      <form onSubmit={handleSubmit}>
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
              type="button"
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
              onClick={() => router.back()}
            >
              Cancel
            </button>
              <button 
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-[#4C8EDA] text-white rounded-lg hover:bg-[#4577b6] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm border border-gray-200">
          <section>
            <div className='flex items-center justify-between mb-4'>
              <h2 className="font-medium text-gray-700">Information</h2>
              <button 
                type="button"
                className='px-3 py-1.5 border border-gray-200 rounded-lg flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50' 
                onClick={() => setHasSubCategory(!hasSubCategory)}
              >
                <span className="text-sm text-gray-500">
                  {hasSubCategory ? "Remove Sub-Category" : "Add Sub-Category"}
                </span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Category Name</label>
                <input 
                  type="text"
                  placeholder="Enter Product Category"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Image URL</label>
                <input 
                  type="url"
                  placeholder="Enter Category Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    image_url: e.target.value
                  }))}
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Slug (Optional)</label>
                <input 
                  type="text"
                  placeholder="Enter Category Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    slug: e.target.value
                  }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Category Description</label>
                <textarea 
                  rows={4}
                  placeholder="Enter Category Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600 resize-none"
                />
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}