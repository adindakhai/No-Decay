"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function CategoryButtons() {

  return (
    <div className="relative w-full h-[110px]">
      <div className="absolute w-full h-full flex justify-between gap-4">
        <CategoryButton 
          icon="/image/containerawal.png" 
          label="Tips" 
          href="/recommendation"
          imageClassName="w-[85px] h-[87px] mt-0"
        />
        <CategoryButton 
          icon="/image/tips.png" 
          label="Container" 
          href="/container"
          imageClassName="w-[85px] h-[85px] mt-5"
        />
        <CategoryButton 
          icon="/image/bantuan.png" 
          label="Help" 
          href="/help"
          imageClassName="w-[74px] h-[85px] mt-3"
        />
      </div>
    </div>
  )
}

interface CategoryButtonProps {
  icon: string
  label: string
  href?: string
  imageClassName?: string
}

function CategoryButton({ icon, label, href, imageClassName }: CategoryButtonProps) {
  const router = useRouter()

  return (
    <div 
      className="relative w-[93px] h-[112px] cursor-pointer"
      onClick={() => href && router.push(href)}
    >
      <div className="absolute w-full h-full rounded-[30px] bg-gradient-to-br from-[#FEF3E2] to-[#FFE9A0] shadow-[0px_4px_15px_rgba(0,0,0,0.25)]">
        <div className="relative w-full h-full">
          <Image
            src={icon}
            alt={label}
            width={85}
            height={87}
            className={`object-contain absolute left-1/2 transform -translate-x-1/2 ${imageClassName}`}
          />
          <div className="absolute bottom-[3px] left-0 w-full h-[25px] flex items-center justify-center">
            <span className="font-inter font-bold text-[14px] leading-[130%] text-[#115437]">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
