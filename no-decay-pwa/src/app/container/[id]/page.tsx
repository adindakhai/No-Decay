"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Thermometer, Droplets, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SensorChart } from "@/components/sensor-chart"

type LatestSensor = {
  temperature: number
  humidity: number
  mq4: number
  mq135: number
}

export default function ContainerDetailPage() {
  const params = useParams()
  const rawId = params.id
  const containerId = Array.isArray(rawId) ? rawId[0] : rawId || "1"
  const [latest, setLatest] = useState<LatestSensor | null>(null)

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`/api/sensor?containerId=${containerId}&latest=true`)
        const data = await res.json()
        setLatest(data)
      } catch (err) {
        console.error("Failed to fetch latest sensor data", err)
      }
    }

    fetchLatest()

    const interval = setInterval(fetchLatest, 30000)
    return () => clearInterval(interval)
  }, [containerId])

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
            src="/image/containerhome.svg"
            alt="Container"
            width={250}
            height={150}
            className="rounded-xl"
          />
          <p className="mt-4 text-xl font-semibold text-green-900">Container {containerId}</p>
          <div className="flex items-center text-green-900 gap-2 mt-1">
            <Calendar size={16} />
            <span>12 - 05 - 2025</span>
          </div>

          <div className="flex justify-around w-full mt-4">
            <div className="text-center">
              <Wind className="mx-auto text-green-900" />
              <p className="text-green-900 font-semibold">
                {latest ? `${Math.max(latest.mq4, latest.mq135)} ppm` : "-"}
              </p>
              <p className="text-xs text-gray-500">Gas</p>
            </div>
            <div className="text-center">
              <Thermometer className="mx-auto text-green-900" />
              <p className="text-green-900 font-semibold">
                {latest ? `${latest.temperature}°c` : "-"}
              </p>
              <p className="text-xs text-gray-500">Temperature</p>
            </div>
            <div className="text-center">
              <Droplets className="mx-auto text-green-900" />
              <p className="text-green-900 font-semibold">
                {latest ? `${latest.humidity}%` : "-"}
              </p>
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

        <div className="w-full mt-4">
          <SensorChart containerId={containerId} />
        </div>
      </div>

      <Button className="w-full bg-green-900 hover:bg-green-800 text-white text-lg rounded-xl py-6">
        Analysis
      </Button>
    </div>
  )
}