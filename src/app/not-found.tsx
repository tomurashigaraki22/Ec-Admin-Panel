'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#4C8EDA]">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">The page you are looking for doesn&apos;t exist or has been moved.</p>
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