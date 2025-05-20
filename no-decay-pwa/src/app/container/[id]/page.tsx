import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Thermometer, Droplets, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContainerDetailPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link href="/container">
          <ArrowLeft className="text-green-900" />
        </Link>
        <h1 className="text-2xl font-semibold text-green-900">Detail</h1>
      </div>

      {/* Container Card */}
      <Card className="bg-[#FFF6EB] rounded-2xl p-4">
        <CardContent className="flex flex-col items-center">
          <Image
            src="/salad-container.png"
            alt="Container"
            width={250}
            height={150}
            className="rounded-xl"
          />
          <p className="mt-4 text-xl font-semibold text-green-900">Container 01</p>
          <div className="flex items-center text-green-900 gap-2 mt-1">
            <Calendar size={16} />
            <span>12 - 05 - 2025</span>
          </div>

          <div className="flex justify-around w-full mt-4">
            <div className="text-center">
              <Wind className="mx-auto text-green-900" />
              <p className="text-green-900 font-semibold">250 ppm</p>
              <p className="text-xs text-gray-500">Gas</p>
            </div>
            <div className="text-center">
              <Thermometer className="mx-auto text-green-900" />
              <p className="text-green-900 font-semibold">21°c</p>
              <p className="text-xs text-gray-500">Temperature</p>
            </div>
            <div className="text-center">
              <Droplets className="mx-auto text-green-900" />
              <p className="text-green-900 font-semibold">50%</p>
              <p className="text-xs text-gray-500">Humidity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction */}
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">Prediction</h2>
        <div className="flex justify-around bg-[#FFF6EB] text-green-900 p-2 rounded-xl">
          <span>01.00 - 06.00</span>
          <span>07.00 - 12.00</span>
          <span>13.00 - 18.00</span>
          <span>19.00 - 00.00</span>
        </div>

        {/* Dummy chart area */}
        <div className="bg-[#FFF6EB] mt-4 rounded-xl p-4 h-[220px]">
          <p className="text-center text-sm text-gray-500">[Insert chart here]</p>
        </div>
      </div>

      {/* Button */}
      <Button className="w-full bg-green-900 hover:bg-green-800 text-white text-lg rounded-xl py-6">
        Analysis
      </Button>
    </div>
  )
}
