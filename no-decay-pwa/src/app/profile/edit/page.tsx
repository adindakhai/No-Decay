"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EditProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState("Sarah")
  const [isUploading, setIsUploading] = useState(false)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsUploading(true)
    try {
      // Here you would typically upload the image and update the name to your backend
      // For now, we'll just simulate a delay and return to profile
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/profile')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save changes. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    setDisplayName("Sarah") // Reset to original name
    router.push('/profile')
  }

  return (
    <div className="relative w-[390px] h-[844px] mx-auto bg-white">
      <div className="absolute left-5 right-5 top-[calc(50%-897px/2+75px)] flex flex-col justify-center items-center">
        <div className="w-[350px] flex flex-col items-start gap-4">
          {/* Top Navigation */}
          <div className="flex flex-row items-center gap-[43px] w-[292px] h-[35px]">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => router.push('/profile')}
            >
              <ArrowLeft className="w-[14px] h-[23px] text-[#115437]" />
            </div>
            <h1 className="text-2xl font-bold text-[#115437]">Edit Profile</h1>
          </div>

          {/* Profile Picture Preview */}
          <div className="w-full flex flex-col items-center gap-8 mt-4">
            <div className="relative w-[200px] h-[200px]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#115437]">
                <Image
                  src={selectedImage || "/image/default-avatar.png"}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            <div className="flex flex-col gap-4 w-full">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-[50px] bg-[#115437] hover:bg-[#0d4530] text-white rounded-xl flex items-center justify-center gap-2"
                disabled={isUploading}
              >
                <Upload className="w-5 h-5" />
                Choose Photo
              </Button>

              {/* Display Name Input */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#115437]" />
                </div>
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display Name"
                  className="w-full pl-10 pr-3 py-3 border-[#115437] focus-visible:ring-[#115437] rounded-xl"
                  disabled={isUploading}
                />
              </div>

              {/* Action Buttons */}
              <Button
                onClick={handleSave}
                className="w-full h-[50px] bg-[#115437] hover:bg-[#0d4530] text-white rounded-xl"
                disabled={isUploading}
              >
                {isUploading ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                onClick={handleCancel}
                className="w-full h-[50px] bg-white border-2 border-[#BF0000] text-[#BF0000] hover:bg-[#BF0000] hover:text-white rounded-xl flex items-center justify-center gap-2"
                disabled={isUploading}
              >
                <X className="w-5 h-5" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 