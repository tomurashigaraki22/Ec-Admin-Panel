'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Plus, LayoutGrid, List, Filter, Pencil, Trash2 } from 'lucide-react'
import { Inter } from 'next/font/google'
import { Product } from '@/utils/types'
import { products } from '@/lib/products'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function ProductsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const router = useRouter()

  return (
    <div className={`p-6 ${inter.className} text-sm bg-gray-50 min-h-screen`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-800">Product Management</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-9 border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 border-gray-400 rounded-lg p-1">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded ${view === 'grid' ? 'bg-[#4C8EDA] text-white' : 'text-gray-500'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded ${view === 'list' ? 'bg-[#4C8EDA] text-white' : 'text-gray-500'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product List Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span>Dashboard</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Product List</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 border-gray-400 rounded-lg flex items-center gap-2">
            <Filter size={16} />
            <span className="text-sm">Filters</span>
          </button>
          <button className="px-3 py-1.5 bg-[#EEF2FF] text-[#4C8EDA] rounded-lg flex items-center gap-2" onClick={() => router.push("/dashboard/products/category/add")}>
            <Plus size={16} />
            <span className="text-sm">Add New Category</span>
          </button>
          <button className="px-3 py-1.5 bg-[#4C8EDA] text-white rounded-lg flex items-center gap-2" onClick={() => router.push("/dashboard/products/add")}>
            <Plus size={16} />
            <span className="text-sm">Add New Product</span>
          </button>
        </div>
      </div>

      {/* Products View */}
      {view === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: Product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 mb-4 group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                    <Pencil size={14} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                    <Trash2 size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start text-center">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    product.status === 'Published' ? 'bg-green-100 text-green-600' :
                    product.status === 'Removed' ? 'bg-orange-100 text-orange-600' :
                    product.status === 'Draft' ? 'bg-gray-100 text-gray-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {product.status}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600">{product.summary}</p>
                
                <div className="pt-2 border-t border-gray-400">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Sales</span>
                    <span>{product.sales}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Remaining Products</span>
                    <span>{product.remainingProducts}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="p-4 pl-6">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-4 text-left text-gray-400">Product</th>
                <th className="p-4 text-left text-gray-400">Product Code</th>
                <th className="p-4 text-left text-gray-400">Category</th>
                <th className="p-4 text-left text-gray-400">Stock</th>
                <th className="p-4 text-left text-gray-400">Price</th>
                <th className="p-4 text-left text-gray-400">Status</th>
                <th className="p-4 text-left text-gray-400">Added</th>
                <th className="p-4 text-left text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 border-gray-400">
                  <td className="p-4 pl-6">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-center">{product.name}</p>
                        <p className="text-xs text-gray-500 text-center">{product.variants}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">{product.productCode}</td>
                  <td className="p-4 text-center">{product.category}</td>
                  <td className="p-4 text-center">{product.stock}</td>
                  <td className="p-4 text-center">{product.price}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      product.status === 'Published' ? 'bg-green-100 text-green-600' :
                      product.status === 'Removed' ? 'bg-orange-100 text-orange-600' :
                      product.status === 'Draft' ? 'bg-gray-100 text-gray-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">{product.added}</td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Pencil size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded">
                        <Trash2 size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <p className="text-gray-500">Showing 1-10 from 100</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded ${
                page === 1 ? 'bg-[#4C8EDA] text-white' : 'bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}