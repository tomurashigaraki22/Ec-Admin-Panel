'use client'

import { useState, useEffect } from 'react'
import { Ubuntu } from 'next/font/google'
import { Search, Plus, MoreHorizontal, Edit2, Trash, Check } from 'lucide-react'
import { roles, administrators, availableRoles, modulesList } from '../types'
import Image from 'next/image'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export default function RolesPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'admin' | 'roles' | 'access'>('admin')
  const [localRoles, setLocalRoles] = useState<typeof roles>([])

  useEffect(() => {
    const savedRoles = localStorage.getItem('roles')
    if (savedRoles) {
      setLocalRoles(JSON.parse(savedRoles))
    } else {
      setLocalRoles(roles)
      localStorage.setItem('roles', JSON.stringify(roles))
    }
  }, [])

  const handlePermissionToggle = (
    roleId: number,
    moduleIndex: number,
    permission: keyof typeof roles[0]['modules'][0]['permissions']
  ) => {
    setLocalRoles(prevRoles => {
      const newRoles = prevRoles.map(role => {
        if (role.id === roleId) {
          const newModules = [...role.modules]
          newModules[moduleIndex] = {
            ...newModules[moduleIndex],
            permissions: {
              ...newModules[moduleIndex].permissions,
              [permission]: !newModules[moduleIndex].permissions[permission]
            }
          }
          return { ...role, modules: newModules }
        }
        return role
      })
      localStorage.setItem('roles', JSON.stringify(newRoles))
      return newRoles
    })
  }

  const handleReset = () => {
    setLocalRoles(roles)
    localStorage.setItem('roles', JSON.stringify(roles))
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'admin':
        return (
          <>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-medium">Administrators</h2>
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Search administrators"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {administrators.map((admin) => (
                <div key={admin.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Image
                        src={admin.avatar}
                        alt={admin.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                        <p className="text-sm text-gray-500 mt-1">{admin.role}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                    <p>Last login: {admin.lastLogin}</p>
                    <p>Date added: {admin.dateAdded}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      case 'roles':
        return (
          <>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-medium">Roles</h2>
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Find what you're looking for"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Department</th>
                  <th className="text-left p-4 font-medium text-gray-600">Role</th>
                  <th className="text-left p-4 font-medium text-gray-600">Assigned Users</th>
                  <th className="text-left p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {localRoles.map((role) => (
                  <tr key={role.id} className="border-b border-gray-200">
                    <td className="p-4 text-gray-800">{role.department}</td>
                    <td className="p-4 text-gray-800">{role.title}</td>
                    <td className="p-4 text-gray-600">{role.assignedUsers}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded">
                          <Edit2 size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded">
                          <Trash size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      case 'access':
        return (
          <>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-medium">Access Control</h2>
                <button 
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-[#4C8EDA]"
                >
                  Reset to defaults
                </button>
              </div>
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Find what you're looking for"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-9 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Role</th>
                    <th className="text-left p-4 font-medium text-gray-600">Assigned Users</th>
                    <th className="text-left p-4 font-medium text-gray-600">Modules</th>
                    <th className="text-center p-4 font-medium text-gray-600">Read</th>
                    <th className="text-center p-4 font-medium text-gray-600">Full Access</th>
                    <th className="text-center p-4 font-medium text-gray-600">Update</th>
                    <th className="text-center p-4 font-medium text-gray-600">Add</th>
                    <th className="text-center p-4 font-medium text-gray-600">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {localRoles.flatMap(role => 
                    role.modules.map((module, moduleIndex) => (
                      <tr key={`${role.id}-${moduleIndex}`} className="border-b border-gray-200">
                        {moduleIndex === 0 && (
                          <>
                            <td className="p-4 text-gray-800" rowSpan={role.modules.length}>
                              {role.title}
                            </td>
                            <td className="p-4 text-gray-600" rowSpan={role.modules.length}>
                              {role.assignedUsers}
                            </td>
                          </>
                        )}
                        <td className="p-4 text-gray-600">{module.name}</td>
                        {['read', 'fullAccess', 'update', 'add', 'delete'].map((permission) => (
                          <td key={permission} className="p-4 text-center">
                            <button 
                              onClick={() => handlePermissionToggle(
                                role.id, 
                                moduleIndex, 
                                permission as keyof typeof module.permissions
                              )}
                              className="focus:outline-none"
                            >
                              <div className="flex justify-center">
                                <div className={`w-5 h-5 rounded flex items-center justify-center
                                  ${module.permissions[permission as keyof typeof module.permissions] 
                                    ? 'bg-[#4C8EDA]' 
                                    : 'border border-gray-300 hover:border-[#4C8EDA]'
                                  } transition-colors duration-200`}
                                >
                                  {module.permissions[permission as keyof typeof module.permissions] && (
                                    <Check size={12} className="text-white" />
                                  )}
                                </div>
                              </div>
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )
    }
  }

  return (
    <div className={`p-6 ${ubuntu.className} text-sm bg-gray-50 min-h-screen`}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium text-gray-800">Permission & Roles</h1>
            <p className="text-sm text-gray-500 mt-1">Manage administrator access and roles</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#4C8EDA] text-white rounded-lg text-sm hover:bg-[#4577b6] transition-colors duration-200 flex items-center gap-2"
          >
            <Plus size={16} />
            {activeTab === 'admin' ? 'Add New Admin' : 'Add New Role'}
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="flex items-center gap-8 px-6 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('admin')}
              className={`py-4 px-1 border-b-2 transition-colors ${
                activeTab === 'admin' 
                  ? 'border-[#4C8EDA] text-[#4C8EDA]' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              Admin
            </button>
            <button 
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 transition-colors ${
                activeTab === 'roles' 
                  ? 'border-[#4C8EDA] text-[#4C8EDA]' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              Roles
            </button>
            <button 
              onClick={() => setActiveTab('access')}
              className={`py-4 px-1 border-b-2 transition-colors ${
                activeTab === 'access' 
                  ? 'border-[#4C8EDA] text-[#4C8EDA]' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              Access Control
            </button>
          </div>

          {/* Dynamic Content Based on Active Tab */}
          {renderContent()}
        </div>
      </div>

      {/* Modal - changes based on active tab */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {activeTab === 'admin' ? 'Add New Admin' : 'Add New Role'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {activeTab === 'admin' ? 'Name' : 'Department'}
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                />
              </div>

              {activeTab === 'admin' ? (
                <>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input 
                      type="email"
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Role</label>
                    <select 
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                    >
                      <option value="">Select a role</option>
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Role Title</label>
                  <input 
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4C8EDA]"
                  />
                </div>
              )}

              {activeTab === 'roles' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium">Module Permissions</h4>
                  {modulesList.map((module) => (
                    <div key={module} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{module}</span>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-[#4C8EDA]" />
                          <span className="text-sm">Read</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-[#4C8EDA]" />
                          <span className="text-sm">Write</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded text-[#4C8EDA]" />
                          <span className="text-sm">Delete</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#4C8EDA] text-white rounded-lg text-sm hover:bg-[#4577b6]"
                >
                  {activeTab === 'admin' ? 'Add Admin' : 'Add Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}