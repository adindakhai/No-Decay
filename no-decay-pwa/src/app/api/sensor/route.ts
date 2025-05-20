import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { temperature, humidity, mq4, mq135, containerId } = body

    if (!containerId) {
      return NextResponse.json(
        { success: false, error: "Missing containerId" },
        { status: 400 }
      )
    }

    const newData = await prisma.sensorData.create({
      data: {
        temperature,
        humidity,
        mq4,
        mq135,
        containerId,
      },
    })

    return NextResponse.json({ success: true, data: newData })
  } catch (error) {
    console.error("POST /api/sensor error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const containerId = searchParams.get("containerId")
  const latest = searchParams.get("latest")

  if (!containerId) {
    return NextResponse.json(
      { success: false, error: "Missing containerId" },
      { status: 400 }
    )
  }

  try {
    // If latest=true → return most recent data
    if (latest === "true") {
      const latestData = await prisma.sensorData.findFirst({
        where: { containerId },
        orderBy: { createdAt: "desc" },
      })

      if (!latestData) {
        return NextResponse.json(
          { success: false, error: "No data found" },
          { status: 404 }
        )
      }

      return NextResponse.json(latestData)
    }

    // Else → return full list for chart
    const data = await prisma.sensorData.findMany({
      where: { containerId },
      orderBy: { createdAt: "asc" },
      select: {
        temperature: true,
        humidity: true,
        createdAt: true,
      },
    })

    const formatted = data.map((item) => ({
      time: item.createdAt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temperature: item.temperature,
      humidity: item.humidity,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("GET /api/sensor error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    )
  }
}
