'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Lock, Mail } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        Cookies.set('token', 'dummy-token', { expires: 7 })
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#4C8EDA] hidden  p-8 text-white md:flex items-center justify-center">
                <div className="max-w-xl text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Steadfast Admin</h2>
                    <p className="text-white/80 text-lg">
                        Streamline and oversee all platform activities on Steadfast.
                    </p>
                </div>
            </div>

            <div className="bg-white p-8 sm:p-12 md:px-[5rem] flex items-center">
                <div className="w-full max-w-md mx-auto">
                    <div className="w-12 h-12 bg-[#4C8EDA] rounded-xl flex items-center justify-center mb-8">
                        <span className="text-white font-bold text-2xl">S</span>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Panel Login</h1>
                    <p className="text-gray-600 mb-8">Welcome back, Please enter your credentials to continue.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C8EDA] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C8EDA] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#4C8EDA] text-white py-2.5 rounded-lg hover:bg-[#4C8EDA]/90 transition-colors font-medium"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}