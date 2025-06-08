"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Calendar, Thermometer, Droplets, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddContainerDialog } from "@/components/ui/add-container-dialog"
import { DeleteContainerDialog } from "@/components/ui/delete-container-dialog"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/ui/navbar"

type Status = "fresh" | "warning" | "spoiled"

const statusColor: Record<Status, string> = {
  fresh: "bg-[#115437]",
  warning: "bg-[#E15B02]",
  spoiled: "bg-[#BF0000]",
}

interface Container {
  id: number
  name: string
  date: string
  status: Status
}

export default function ContainerPage() {
  const router = useRouter()
  const [containers, setContainers] = useState<Container[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const staticContainers = [
      { id: 1, name: "Container 01" },
      { id: 2, name: "Container 02" },
      { id: 3, name: "Container 03" },
    ]

    const fetchStatuses = async () => {
      const fetched: Container[] = await Promise.all(
        staticContainers.map(async (c) => {
          try {
            const res = await fetch(`/api/sensor?containerId=${c.id}&latest=true`)
            const data = await res.json()
            const status = (data.prediction || "fresh") as Status
            const formattedDate = new Date().toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).replace(/\//g, " - ")

            return {
              id: c.id,
              name: c.name,
              date: formattedDate,
              status,
            }
          } catch (error) {
            console.error("❌ Gagal fetch prediksi:", error)
            return {
              id: c.id,
              name: c.name,
              date: "N/A",
              status: "fresh" as Status,
            }
          }
        })
      )
      setContainers(fetched)
    }

    fetchStatuses()
  }, [])

  const handleAddContainer = (name: string) => {
    const newId = containers.length + 1
    const newContainer: Container = {
      id: newId,
      name,
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).replace(/\//g, " - "),
      status: "fresh",
    }
    setContainers([...containers, newContainer])
  }

  const handleDeleteContainer = (id: number) => {
    setContainers(containers.filter((c) => c.id !== id))
  }

  const filteredContainers = containers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold text-[#115437]">Container</h1>
          </div>

          {/* Header with Add Button */}
          <div className="flex flex-row items-center w-[341px] h-[42px] justify-between">
            <h2 className="text-[32px] font-bold text-[#115437]">My Container</h2>
            <AddContainerDialog onAddContainer={handleAddContainer} />
          </div>

          {/* Search Bar */}
          <div className="relative w-[349px] h-[58px]">
            <Input
              placeholder="Search Container"
              className="h-full bg-white border-[#115437] focus-visible:ring-[#115437] rounded-xl shadow-md px-4 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#115437]" size={24} />
          </div>

          {/* Container Cards */}
          <div className="space-y-4 w-full">
            {filteredContainers.map((container) => (
              <div key={container.id} className="relative group">
                {/* Delete Button */}
                <div className="absolute left-103 top-[-18px] z-10">
                  <DeleteContainerDialog
                    containerName={container.name}
                    onDelete={() => handleDeleteContainer(container.id)}
                  />
                </div>
                <Link href={`/container/${container.id}`}>
                  <Card className="flex flex-col justify-center items-center px-5 py-0 gap-3 isolate w-[350px] h-[130px] bg-[#FEF3E2] rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.25)]">
                    <CardContent className="p-0 w-full">
                      {/* Status Badge */}
                      <div className="absolute w-[80px] h-[37px] left-[270px] top-0 z-0">
                        <div className={`absolute w-[80px] h-[37px] left-0 top-0 ${statusColor[container.status]} rounded-tr-xl`}>
                          <span className="absolute w-[37px] h-[19px] left-[21px] top-[8.5px] font-inter font-bold text-[12px] leading-[130%] flex items-center text-center text-[#FEF3E2]">
                            {container.status}
                          </span>
                        </div>
                      </div>

                      {/* Container Content */}
                      <div className="flex flex-col justify-center items-center gap-3 w-full">
                        <div className="flex flex-row items-center gap-5 w-[282px] h-[54px] z-[1]">
                          <div className="flex flex-row justify-center items-center py-[10px] pr-[1px] pl-0 gap-[10px] w-[76px] h-[53px]">
                            <Image
                              src="/image/container.png"
                              alt="Container"
                              width={75}
                              height={51}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex flex-col items-start gap-[5px] w-[108px] h-[40px]">
                            <div className="flex flex-row justify-center items-center gap-[13px] w-[88px] h-[18px]">
                              <span className="font-inter font-bold text-[14px] leading-[130%] flex items-center text-[#115437]">
                                {container.name}
                              </span>
                            </div>
                            <div className="flex flex-row items-center gap-[5px] w-[96px] h-[17px]">
                              <Calendar className="w-[17px] h-[17px] text-[#115437]" />
                              <span className="font-inter text-[12px] leading-[130%] flex items-center text-[#115437]">
                                {container.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row justify-center items-center gap-[22px] w-[282px] h-[25px] z-[2]">
                          <div className="flex flex-row justify-center items-center gap-[5px] w-[54px] h-[25px]">
                            <Wind className="w-[25px] h-[25px] text-[#115437]" />
                            <span className="w-[24px] h-[17px] font-inter text-[12px] leading-[130%] flex items-center text-center text-[#666666]">
                              Gas
                            </span>
                          </div>
                          <div className="flex flex-row justify-center items-center gap-[5px] w-[103px] h-[25px]">
                            <Thermometer className="w-[25px] h-[25px] text-[#115437]" />
                            <span className="w-[73px] h-[17px] font-inter text-[12px] leading-[130%] flex items-center text-center text-[#666666]">
                              Temperature
                            </span>
                          </div>
                          <div className="flex flex-row justify-center items-center gap-[5px] w-[81px] h-[25px]">
                            <Droplets className="w-[25px] h-[25px] text-[#115437]" />
                            <span className="w-[51px] h-[17px] font-inter text-[12px] leading-[130%] flex items-center text-center text-[#666666]">
                              Humidity
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  )
}
