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

type Props = {
  containerId: string
}

export function SensorChart({ containerId }: Props) {
  const [data, setData] = useState([])

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

    // ⏱ Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [containerId])

  if (data.length === 0) {
    return <p className="text-sm text-muted">Loading chart...</p>
  }

  return (
    <ChartContainer
      config={sensorChartConfig}
      className="bg-[#FFF6EB] rounded-xl p-6 aspect-[16/5]"
    >
      <LineChart data={data} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
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
  )
}
