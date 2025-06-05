import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

interface AdminUser {
  id: string
  name?: string
  email?: string
}

interface AdminDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  admin: AdminUser | null
  onDeleted?: () => void // Optional callback to refresh list
}

export const AdminDeleteModal: React.FC<AdminDeleteModalProps> = ({
  isOpen,
  onClose,
  admin,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!admin) return
    setLoading(true)
    try {
      const token = Cookies.get('token')
      if (!token) throw new Error('Authentication token not found')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-user`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: admin.id }),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) {
          if (errorData.error === 'Token has expired') {
            toast.error('Your session has expired. Please log in again.')
            return
          }
          throw new Error('Authentication failed. Please log in again.')
        }
        throw new Error(errorData.error || 'Failed to delete admin user')
      }
      const data = await response.json()
      toast.success(data.message || 'Admin user deleted successfully')
      if (onDeleted) onDeleted()
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete admin user')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !admin) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Remove Admin</h2>
        <p>
          Are you sure you want to remove{' '}
          <b>{admin.name || admin.email || `ID: ${admin.id}`}</b> as an admin?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white flex items-center justify-center min-w-[80px]"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <span className="loader border-2 border-t-2 border-gray-200 border-t-red-600 rounded-full w-4 h-4 animate-spin inline-block mr-2"></span>
            ) : null}
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}