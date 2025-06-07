"use client"

import { useEffect, useState } from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { SensorDataPoint } from "../../types/types"

const sensorChartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "#115437",
  },
  humidity: {
    label: "Humidity (%)",
    color: "#2B8A61",
  },
}

const gasChartConfig = {
  mq4: {
    label: "MQ-4 (ppm)",
    color: "#E67E22",
  },
  mq135: {
    label: "MQ-135 (ppm)",
    color: "#C0392B",
  },
}

type Props = {
  containerId: string
}

export function SensorChart({ containerId }: Props) {
  const [data, setData] = useState<SensorDataPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/sensor?containerId=${containerId}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Failed to fetch chart data", err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [containerId])

  if (data.length === 0) {
    return <p className="text-sm text-muted">Loading chart...</p>
  }

  const displayData = data.slice(-50)

  return (
    <div className="space-y-8">
      {/* 🌡️ Chart Suhu & Kelembapan */}
      <ChartContainer
        config={sensorChartConfig}
        className="bg-[#FFF6EB] rounded-xl p-6 aspect-[16/5]"
      >
        <LineChart data={displayData} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            interval={0}
            padding={{ top: 0, bottom: 0 }}
            tick={{ fontSize: 9 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="temperature" stroke="#115437" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="humidity" stroke="#2B8A61" strokeWidth={2} dot={false} />
          <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>

      {/* 🧪 Chart Gas MQ-4 & MQ-135 */}
      <ChartContainer
        config={gasChartConfig}
        className="bg-[#FFF6EB] rounded-xl p-6 aspect-[16/5]"
      >
        <LineChart data={displayData} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            interval={0}
            padding={{ top: 0, bottom: 0 }}
            tick={{ fontSize: 9 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="mq4" stroke="#E67E22" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="mq135" stroke="#C0392B" strokeWidth={2} dot={false} />
          <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
