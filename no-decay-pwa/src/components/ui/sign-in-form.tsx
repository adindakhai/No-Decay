"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock } from "lucide-react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-800"
          required
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-800"
          required
        />
      </div>
      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-green-800">
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-green-800 text-white font-medium rounded-md hover:bg-green-900 transition-colors"
      >
        Sign In
      </button>
    </form>
  )
}
