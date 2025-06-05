'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'  // Remove unused imports
import { Ubuntu } from 'next/font/google'  // Remove Inter
import { useRouter } from 'next/navigation'
import { ImageLibrary } from '@/components/ImageLibrary'
import { CreateProductData, ProductVariation } from '@/types/product'
import { Category } from '@/types/category'
import toast from 'react-hot-toast'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

interface UploadedImage {
  id: string
  url: string
  name: string
  date: string
  size: string
}

export default function AddProductPage() {
  const [tags, setTags] = useState(['Ceiling Light', 'Statement Lighting', 'Modern Lighting', 'Luxury Lighting'])
  const [hasVariations, setHasVariations] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [newTag, setNewTag] = useState('')  // Add state for new tag input
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    product_code: '',
    description: '',
    price: '',
    images: [],
    discount_price: '',
    stock_quantity: '',
    stock_status: 'in_stock',
    variations: [] as ProductVariation[]
  })
  const [variations, setVariations] = useState<ProductVariation[]>([])
  const [newVariation, setNewVariation] = useState({
    type: 'Size',
    value: '',
    price: ''
  })
  const router = useRouter()

  // Add useEffect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data.categories)
      } catch (error) {
        toast.error('Failed to load categories')
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Add handler for tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(currentTags => currentTags.filter(tag => tag !== tagToRemove))
  }

  // Add handler for tag addition
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      setTags(currentTags => [...currentTags, newTag.trim()])
      setNewTag('')
    }
  }

// Add this helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

// Update the image upload function
const handleImageUpload = async (file: File): Promise<string> => {
  try {
    // Convert file to base64
    const base64String = await fileToBase64(file)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64String,
        filename: file.name
      })
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Upload error:', error)
    toast.error('Failed to upload image')
    throw error
  }
}

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // No need to upload images again, use the already uploaded URLs
      const imageUrls = uploadedImages.map(image => image.url)

      const productData: CreateProductData = {
        name: formData.name,
        category: formData.category,
        sub_category: formData.subCategory || undefined,
        price: parseFloat(formData.price),
        description: formData.description,
        images: imageUrls,
        stock_quantity: parseInt(formData.stock_quantity),
        tags: tags,
        is_variable_product: hasVariations,
        variations: hasVariations ? variations.map(v => ({
          type: 'Size',
          value: v.value,
          price: parseFloat(v.price.toString())
        })) : undefined,
      }

      // Create product
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create product')
      }

      toast.success('Product created successfully')
      router.push('/dashboard/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddVariation = () => {
    if (newVariation.value && newVariation.price) {
      setVariations([...variations, {
        ...newVariation,
        price: parseFloat(newVariation.price)
      }])
      setNewVariation({
        type: 'Size',
        value: '',
        price: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
              <span className="text-gray-400">Add Product</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-[#4C8EDA] text-white rounded-lg hover:bg-[#4577b6] disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm border border-gray-200">
          <section>
            <h2 className="font-medium mb-4 text-gray-700">Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  required
                  disabled={loading}
                >
                  <option value="">Select Product Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {loading && (
                  <div className="mt-1 text-sm text-gray-500">Loading categories...</div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">
                  Sub-Category (Optional)
                </label>
                <select 
                  value={formData.subCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                >
                  <option value="">Select Sub-Category</option>
                  {/* Add your sub-categories here */}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Product Name</label>
                <input 
                  type="text"
                  placeholder="Enter Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Product Code</label>
                <input 
                  type="text"
                  placeholder="Enter Product Code"
                  value={formData.product_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, product_code: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Product Description</label>
                <textarea 
                  rows={4}
                  placeholder="Enter Product Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Tag Name</label>
                <input 
                  type="text"
                  placeholder="Enter tag name"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-sm flex items-center gap-1 border border-gray-200">
                      {tag}
                      <X 
                        size={14} 
                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-medium mb-4 text-gray-700">Images</h2>
            
            {/* Image Preview Grid */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mb-4">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative group aspect-square">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button 
                      onClick={() => {
                        setUploadedImages(uploadedImages.filter(img => img.id !== image.id))
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#4C8EDA] transition-colors">
<input
  type="file"
  id="fileUpload"
  multiple
  accept="image/*"
  className="hidden"
  onChange={async (e) => {
    if (e.target.files) {
      setIsSubmitting(true)
      try {
        const newImages = await Promise.all(
          Array.from(e.target.files).map(async file => {
            // Validate file size before upload (optional)
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
              throw new Error('File size too large. Maximum size is 5MB')
            }
            
            const url = await handleImageUpload(file)
            return {
              id: Math.random().toString(36).substr(2, 9),
              url: url,
              name: file.name,
              date: new Date().toISOString().split('T')[0],
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            }
          })
        )
        setUploadedImages(prev => [...prev, ...newImages])
        toast.success('Images uploaded successfully')
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to upload images')
      } finally {
        setIsSubmitting(false)
      }
    }
  }}
/>
              <label 
                htmlFor="fileUpload" 
                className="text-[#4C8EDA] text-sm font-medium cursor-pointer hover:text-[#4577b6]"
              >
                Add File
              </label>
              <p className="text-sm text-gray-500 mt-2">or</p>
              <div className="flex justify-center gap-4 mt-2">
                <button 
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    // Handle import file logic
                  }}
                >
                  Import file
                </button>
                <button 
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => setShowLibrary(true)}
                >
                  Upload from Library
                </button>
              </div>
            </div>

            {/* Library Modal */}
            {showLibrary && (
              <ImageLibrary 
                onSelect={(selectedImages) => {
                  setUploadedImages(prevImages => [...prevImages, ...selectedImages])
                  setShowLibrary(false)
                }}
                onClose={() => setShowLibrary(false)}
              />
            )}
          </section>

          <section>
            <h2 className="font-medium mb-4 text-gray-700">Price</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Product Price</label>
                <input 
                  type="text"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Discount Price</label>
                <input 
                  type="text"
                  placeholder="Enter Product Discount"
                  value={formData.discount_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount_price: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-medium mb-4 text-gray-700">Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Stock Status</label>
                <select 
                  value={formData.stock_status}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_status: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  required
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5 text-gray-600">Quantity</label>
                <input 
                  type="number"
                  placeholder="Enter Product Quantity"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-700">Multiple Variations</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={hasVariations}
                  onChange={e => setHasVariations(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C8EDA]"></div>
              </label>
            </div>

            {hasVariations && (
              <div className="space-y-4">
                {variations.map((variation, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="block text-sm text-gray-600">{variation.type}</span>
                      <span className="block text-sm font-medium">{variation.value}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-600">Price</span>
                      <span className="block text-sm font-medium">₦{variation.price}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setVariations(variations.filter((_, i) => i !== index))}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5 text-gray-600">Value</label>
                    <input 
                      type="text"
                      value={newVariation.value}
                      onChange={(e) => setNewVariation(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="e.g. Small (40cm)"
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5 text-gray-600">Price</label>
                    <input 
                      type="number"
                      value={newVariation.price}
                      onChange={(e) => setNewVariation(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="Enter price"
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddVariation}
                      className="p-2.5 bg-[#4C8EDA] text-white rounded-lg hover:bg-[#4577b6]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </form>
  )
}