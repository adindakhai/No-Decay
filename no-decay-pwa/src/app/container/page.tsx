"use client"

import Link from "next/link"
import {
  ArrowLeft, Search, Bell, Users, Plus, Calendar,
  Thermometer, Droplets, Wind, LayoutDashboard, Lightbulb
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Status = "Fresh" | "Warning" | "Spoiled"

const statusColor: Record<Status, string> = {
  Fresh: "bg-green-900",
  Warning: "bg-orange-600",
  Spoiled: "bg-red-700",
}

const indicatorColor: Record<Status, string> = {
  Fresh: "text-green-800",
  Warning: "text-orange-600",
  Spoiled: "text-red-600",
}

const containers: { id: number; name: string; date: string; status: Status }[] = [
  {
    id: 1,
    name: "Container 01",
    date: "12 - 05 - 2025",
    status: "Fresh",
  },
  {
    id: 2,
    name: "Container 02",
    date: "13 - 05 - 2025",
    status: "Warning",
  },
  {
    id: 3,
    name: "Container 03",
    date: "14 - 05 - 2025",
    status: "Spoiled",
  }
]

export default function ContainerPage() {
  return (
    <div className="pb-28 px-4 pt-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft className="text-green-900" />
          <h1 className="text-xl font-bold text-green-900">My Container</h1>
        </div>
        <Plus className="text-green-900" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Input
          placeholder="Search Container"
          className="bg-white border-[#115437] focus-visible:ring-[#115437] rounded-md shadow-md"
        />
        <Search className="absolute right-3 top-2.5 text-green-900" size={20} />
      </div>

      {/* Container Cards */}
      <div className="space-y-4">
        {containers.map((container) => (
          <Link key={container.id} href={`/container/${container.id}`}>
            <Card className="bg-[#FFF6EB] rounded-2xl p-4">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-green-900">{container.name}</p>
                    <div className="flex items-center gap-1 text-green-900 text-sm">
                      <Calendar size={14} />
                      {container.date}
                    </div>
                  </div>
                  <div className={`text-xs text-white px-3 py-1 rounded-md font-semibold ${statusColor[container.status]}`}>
                    {container.status}
                  </div>
                </div>
                <div className="flex justify-between px-2">
                  <div className="flex flex-col items-center text-green-900">
                    <Wind size={20} />
                    <span className="text-xs mt-1">Gas</span>
                  </div>
                  <div className="flex flex-col items-center text-green-900">
                    <Thermometer size={20} />
                    <span className="text-xs mt-1">Temperature</span>
                  </div>
                  <div className="flex flex-col items-center text-green-900">
                    <Droplets size={20} />
                    <span className="text-xs mt-1">Humidity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-900 p-4 rounded-t-2xl flex justify-around items-center">
        <Bell className="text-white" />
        <LayoutDashboard className="text-white" />
        <Lightbulb className="text-white" />
        <Users className="text-white" />
      </div>
    </div>
  )
}
