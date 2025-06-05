'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Plus, LayoutGrid, List, Pencil, Trash2 } from 'lucide-react'
import { Inter } from 'next/font/google'
import { Product as ProductType } from '@/types/product'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function ProductsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()

  const fetchProducts = async (page: number = 1, search: string = '', filter: string | null = null) => {
    try {
      setLoading(true)
      const token = Cookies.get('token')
      if (!token) {
        throw new Error('Authentication token not found')
      }

      const queryParams = new URLSearchParams({
        page: page.toString(),
        max: '20',
        ...(search && { q: search }),
        ...(filter && { filter: filter })
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Request failed with status ${response.status}`)
      }

      const data = await response.json()
      setProducts(data.products)
      setTotalPages(Math.ceil(data.total / 20)) // Assuming 20 items per page
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage, searchQuery, filterType)
  }, [currentPage, searchQuery, filterType])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleFilter = (filter: string | null) => {
    setFilterType(filter)
    setCurrentPage(1) // Reset to first page on new filter
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const token = Cookies.get('token')
      if (!token) throw new Error('Authentication token not found')

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) {
          // Handle authentication errors
          if (errorData.error === 'Token has expired') {
            toast.error('Your session has expired. Please log in again.')
            // Optionally redirect to login page
            // router.push('/login')
            return
          }
          throw new Error('Authentication failed. Please log in again.')
        }
        throw new Error(errorData.error || 'Failed to delete product')
      }

      const data = await response.json()
      toast.success(data.message || 'Product deleted successfully')
      fetchProducts(currentPage, searchQuery, filterType) // Refresh the list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product'
      toast.error(errorMessage)
      console.error('Error deleting product:', err)
    }
  }

  if (loading && !products.length) {
    return (
      <div className={`p-6 ${inter.className} text-sm bg-gray-50 min-h-screen flex items-center justify-center`}>
        <div className="text-gray-600">Loading products...</div>
      </div>
    )
  }

  if (error && !products.length) {
    return (
      <div className={`p-6 ${inter.className} text-sm bg-gray-50 min-h-screen flex items-center justify-center`}>
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

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
              value={searchQuery}
              onChange={handleSearch}
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
          <select 
            value={filterType || ''} 
            onChange={(e) => handleFilter(e.target.value || null)}
            className="px-3 py-1.5 border-gray-400 rounded-lg flex items-center gap-2"
          >
            <option value="">All Products</option>
            <option value="deals">Deals of the Month</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
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
          {products.map((product) => (
            <div key={product.productId} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 mb-4 group">
                <Image
                  src={product.images[0] || '/placeholder.png'}
                  alt={product.title}
                  fill
                  className="object-contain rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <button 
                    onClick={() => router.push(`/dashboard/products/edit/${product.productId}`)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <Pencil size={14} className="text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.productId)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <Trash2 size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start text-center">
                  <div>
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
                    {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600">{product.description}</p>
                
                <div className="pt-2 border-t border-gray-400">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Price</span>
                    <span>₦{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Stock</span>
                    <span>{product.stock_quantity}</span>
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
                <th className="p-4 text-left text-gray-400">Category</th>
                <th className="p-4 text-left text-gray-400">Stock</th>
                <th className="p-4 text-left text-gray-400">Price</th>
                <th className="p-4 text-left text-gray-400">Rating</th>
                <th className="p-4 text-left text-gray-400">Status</th>
                <th className="p-4 text-left text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId} className="border-b hover:bg-gray-50 border-gray-400">
                  <td className="p-4 pl-6">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.images[0] || '/placeholder.png'}
                          alt={product.title}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.stock_quantity}</td>
                  <td className="p-4">₦{product.price.toLocaleString()}</td>
                  <td className="p-4">
                    {product.rating ? (
                      <div className="flex items-center gap-1">
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500">({product.review_count})</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">No ratings</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      product.stock_quantity > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => router.push(`/dashboard/products/edit/${product.productId}`)}
                        className="p-1.5 hover:bg-gray-100 rounded"
                      >
                        <Pencil size={16} className="text-gray-500" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.productId)}
                        className="p-1.5 hover:bg-gray-100 rounded"
                      >
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
        <p className="text-gray-500">
          Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, totalPages * 20)} of {totalPages * 20}
        </p>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded ${
                page === currentPage ? 'bg-[#4C8EDA] text-white' : 'bg-gray-100'
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