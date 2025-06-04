'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'  // Remove unused imports
import { Ubuntu } from 'next/font/google'  // Remove Inter
import { useRouter } from 'next/navigation'
import { ImageLibrary } from '@/components/ImageLibrary'

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
  const router = useRouter()

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
            <span className="text-gray-400">Add Product</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50" onClick={() => router.back()}>
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
          <h2 className="font-medium mb-4 text-gray-700">Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Category</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600">
                <option>Select Product Category</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Sub-Category</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600">
                <option>Select Sub-Category</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Product Name</label>
              <input 
                type="text"
                placeholder="Enter Product Name"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Product Code</label>
              <input 
                type="text"
                placeholder="Enter Product Code"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Product Description</label>
              <textarea 
                rows={4}
                placeholder="Enter Product Description"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600 resize-none"
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
              onChange={(e) => {
                if (e.target.files) {
                  const newImages = Array.from(e.target.files).map(file => ({
                    id: Math.random().toString(36).substr(2, 9),
                    url: URL.createObjectURL(file),
                    name: file.name,
                    date: new Date().toISOString().split('T')[0], // Add today's date
                    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` // Convert bytes to MB
                  }))
                  setUploadedImages([...uploadedImages, ...newImages])
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
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Discount Price</label>
              <input 
                type="text"
                placeholder="Enter Product Discount"
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
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600">
                <option>Select Stock Status</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5 text-gray-600">Quantity</label>
              <input 
                type="number"
                placeholder="Enter Product Quantity"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1.5 text-gray-600">Variation</label>
                  <input 
                    type="text"
                    placeholder="Enter Product Variation"
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1.5 text-gray-600">Variation Price</label>
                  <input 
                    type="text"
                    placeholder="Enter Product Variation Price"
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1.5 text-gray-600">Variation Quantity</label>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      placeholder="Enter Variation Quantity"
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#4C8EDA] focus:ring-1 focus:ring-[#4C8EDA] text-gray-600"
                    />
                    <button className="p-2.5 bg-red-50 rounded-lg">
                      <X size={20} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              <button className="text-[#4C8EDA] text-sm font-medium">+ Add More</button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}