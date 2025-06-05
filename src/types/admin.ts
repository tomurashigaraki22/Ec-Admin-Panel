export interface AdminUser {
  id: string
  email: string
  role_name: string
  created_at: string
  updated_at: string
}

export interface AdminUsersResponse {
  status: 'success' | 'error'
  data?: AdminUser[]
  message?: string
}

export interface CreateAdminResponse {
  status: 'success' | 'error'
  message: string
  data?: {
    user_id: string
    email: string
    temporary_password: string
  }
}

export interface Role {
  id: number
  title: string
  department: string
  assignedUsers: number
  modules: {
    name: string
    permissions: {
      read: boolean
      fullAccess: boolean
      update: boolean
      add: boolean
      delete?: boolean
    }
  }[]
}

export type TabType = 'admin' | 'roles' | 'access'