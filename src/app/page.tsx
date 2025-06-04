import Image from "next/image"
import Link from "next/link"
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'] 
})

export default function Home() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#4C8EDA]/5 to-[#4C8EDA]/10 flex flex-col items-center justify-center p-4 ${ubuntu.className}`}>
      <div className="w-full max-w-lg text-center space-y-8">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="min-w-16 min-h-16 bg-[#4C8EDA] rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
          <Image
            src="https://steadfast.ng/_next/image?url=%2Flogo.png&w=384&q=75"
            alt="Admin Panel Logo"
            width={182}
            height={96}
            priority
            className="text-white"
          />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-800">Admin Panel</h1>
            <p className="text-gray-500 mt-2">
              Welcome to your dashboard. Please sign in to continue.
            </p>
          </div>
        </div>

        {/* Login Button */}
        <Link 
          href="/login" 
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[#4C8EDA] rounded-lg hover:bg-[#4577b6] transition-colors duration-200 shadow-md shadow-blue-100"
        >
          Sign In to Dashboard
        </Link>

        {/* Footer Links */}
        <div className="pt-8 text-sm text-gray-500 space-x-4">
          <a 
            href="#" 
            className="hover:text-[#4C8EDA] transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a 
            href="#" 
            className="hover:text-[#4C8EDA] transition-colors duration-200"
          >
            Terms of Service
          </a>
          <span>•</span>
          <a 
            href="#" 
            className="hover:text-[#4C8EDA] transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
