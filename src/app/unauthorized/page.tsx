'use client'

import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center">
          <ShieldAlert className="w-24 h-24 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-6">Access Denied</h1>
        <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-[#4C8EDA] text-white rounded-lg hover:bg-[#4C8EDA]/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}