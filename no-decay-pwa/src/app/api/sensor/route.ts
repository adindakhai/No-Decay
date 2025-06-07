import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import axios from "axios"

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

    // 1. Simpan data sensor ke DB
    const sensorData = await prisma.sensorData.create({
      data: {
        temperature,
        humidity,
        mq4,
        mq135,
        containerId,
      },
    })

    // 2. Panggil backend Flask untuk prediksi
    const mlResponse = await axios.post("http://localhost:5000/predict", {
      temperature,
      humidity,
      mq4,
      mq135,
    })
    const status = mlResponse.data.status as string  // Fresh / Warning / Spoiled

    // 3. Simpan hasil prediksi ke DB
    const prediction = await prisma.prediction.create({
      data: {
        sensorId: sensorData.id,
        status,
      },
    })

    return NextResponse.json({
      success: true,
      data: sensorData,
      prediction: prediction.status,
    })
  } catch (error) {
    console.error("POST /api/sensor error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to save or predict" },
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
    // Jika latest=true → return data terbaru + prediction
    if (latest === "true") {
      const latestData = await prisma.sensorData.findFirst({
        where: { containerId },
        orderBy: { createdAt: "desc" },
        include: { prediction: true },
      })

      if (!latestData) {
        return NextResponse.json(
          { success: false, error: "No data found" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        temperature: latestData.temperature,
        humidity: latestData.humidity,
        mq4: latestData.mq4,
        mq135: latestData.mq135,
        prediction: latestData.prediction?.status ?? null,
      })
    }

    // Else → return full list untuk chart
    const data = await prisma.sensorData.findMany({
      where: { containerId },
      orderBy: { createdAt: "asc" },
      select: {
        temperature: true,
        humidity: true,
        mq4: true,      
        mq135: true,    
        createdAt: true,
      },
    })

    const formatted = data.map((item: {
      temperature: number;
      humidity: number;
      mq4: number;
      mq135: number;
      createdAt: Date;
    }) => ({
      time: item.createdAt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temperature: item.temperature,
      humidity: item.humidity,
      mq4: item.mq4,        
      mq135: item.mq135,    
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
