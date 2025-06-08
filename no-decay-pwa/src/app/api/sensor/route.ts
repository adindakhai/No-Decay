import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import axios from "axios"
import { sendFCMNotification } from "@/lib/fcm" // kamu harus buat ini

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

    // 2. Kirim ke backend ML Flask
    const mlResponse = await axios.post(process.env.ML_BACKEND_URL!, {
      temperature,
      humidity,
      mq4,
      mq135,
    })
    const status = mlResponse.data.status as string // Fresh / Warning / Spoiled

    // 3. Simpan hasil prediksi
    await prisma.prediction.create({
      data: {
        sensorId: sensorData.id,
        status,
      },
    })

    // 4. Kirim notifikasi jika hasilnya warning/spoiled
    if (status === "warning" || status === "spoiled") {
      const tokens = await prisma.deviceToken.findMany()

      for (const token of tokens) {
        await sendFCMNotification(token.token, {
          title: "⚠️ Kondisi Makanan",
          body:
            status === "spoiled"
              ? "🚨 Makanan kemungkinan besar sudah busuk!"
              : "⚠️ Kondisi penyimpanan kurang ideal.",
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: sensorData,
      prediction: status,
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
    // Jika latest=true → ambil data terbaru + prediksi
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

    // Jika tidak → ambil list semua data untuk chart
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

    const formatted = data.map((item) => ({
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
