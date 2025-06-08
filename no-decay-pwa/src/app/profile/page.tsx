"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/ui/navbar"
import { signOut, useSession } from "next-auth/react"

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  // Loading state (opsional)
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>
  }

  // Belum login → redirect manual ke /signin (opsional, middleware juga bisa handle)
  if (!session) {
    router.push("/signin")
    return null
  }

  const user = session.user

  return (
    <div className="relative w-[390px] h-[844px] mx-auto bg-white">
      <div className="absolute left-5 right-5 top-[calc(50%-897px/2+75px)] flex flex-col justify-center items-center">
        <div className="w-[350px] flex flex-col items-start gap-4">
          {/* Top Navigation */}
          <div className="flex flex-row items-center gap-[43px] w-[292px] h-[35px]">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/")}
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
                  src="/image/placeholder.png"
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
              <h2 className="text-3xl font-bold text-[#115437]">{user?.name ?? "Anonymous"}</h2>
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
                <svg width="24" height="24" />
                <span className="text-gray-600">{user?.email ?? "unknown@example.com"}</span>
              </div>
            </div>

            {/* Password Placeholder */}
            <div className="w-full max-w-[350px] p-4 border border-[#115437] rounded-xl">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" />
                <span className="text-gray-600">******</span>
              </div>
            </div>

            {/* Logout */}
            <Button
              className="w-full max-w-[350px] h-[50px] bg-[#BF0000] hover:bg-[#a00000] text-white rounded-xl"
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}
