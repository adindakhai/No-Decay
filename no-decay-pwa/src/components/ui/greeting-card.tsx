import Image from "next/image"
import SearchBar from "@/components/ui/search-bar"

interface GreetingCardProps {
  name: string
}

export default function GreetingCard({ name }: GreetingCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl text-white p-5 bg-gradient-to-br from-[#115437] to-[#FFE9A0]">
      <div className="flex items-start">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="font-medium text-[#FEF3E2]">Welcome, {name}</p>
        </div>
      </div>

      <div className="mt-3">
        <h1 className="text-2xl font-bold text-[#FFE9A0] leading-tight">
          Just fresh,<br />just right.
        </h1>
      </div>

      <div className="mt-4 relative z-10">
        <SearchBar />
      </div>

      <div className="absolute right-5 bottom-10 w-36 h-auto z-100">
        <Image
          src="/image/sayurhome.svg"
          alt="Fresh vegetables"
          width={144}
          height={144}
          className="object-contain"
        />
      </div>
    </div>
  )
}
