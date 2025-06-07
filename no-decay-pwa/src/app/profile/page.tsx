"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/ui/navbar"

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="relative w-[390px] h-[844px] mx-auto bg-white">
      <div className="absolute left-5 right-5 top-[calc(50%-897px/2+75px)] flex flex-col justify-center items-center">
        <div className="w-[350px] flex flex-col items-start gap-4">
          {/* Top Navigation */}
          <div className="flex flex-row items-center gap-[43px] w-[292px] h-[35px]">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="w-[14px] h-[23px] text-[#115437]" />
            </div>
            <h1 className="text-2xl font-bold text-[#115437]">Profile</h1>
          </div>

          {/* Profile Content */}
          <div className="w-full flex flex-col items-center gap-8 mt-4">
            {/* Profile Picture */}
            <div className="relative w-[150px] h-[150px]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#115437]">
                <Image
                  src="/image/default-avatar.png"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name with Edit Icon */}
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-[#115437]">Sarah</h2>
              <Link 
                href="/profile/edit"
                className="p-2 text-[#115437] hover:text-[#0d4530] transition-colors rounded-full hover:bg-[#115437]/10"
              >
                <Pencil className="w-6 h-6" />
              </Link>
            </div>

            {/* Email Field */}
            <div className="w-full max-w-[350px] p-4 border border-[#115437] rounded-xl">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="#115437" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">sarah123@rocketmail.com</span>
              </div>
            </div>

            {/* Password Field */}
            <div className="w-full max-w-[350px] p-4 border border-[#115437] rounded-xl">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke="#115437" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">******</span>
              </div>
            </div>

            {/* Forgot Password Link */}
            <button className="text-[#115437] text-sm hover:underline">
              Forgot Password?
            </button>

            {/* Logout Button */}
            <Button 
              className="w-full max-w-[350px] h-[50px] bg-[#BF0000] hover:bg-[#a00000] text-white rounded-xl"
              onClick={() => router.push('/login')}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Using the shared Navbar component */}
      <Navbar />
    </div>
  )
} 