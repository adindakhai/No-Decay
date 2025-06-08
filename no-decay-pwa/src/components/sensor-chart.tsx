"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { SensorDataPoint } from "../../types/types"

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
    <div className="space-y-12">
      {/* 🌡️ Suhu & Kelembapan */}
      <div className="bg-[#FFF6EB] rounded-xl p-4" style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#115437" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="humidity" stroke="#2B8A61" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🧪 MQ-4 & MQ-135 */}
      <div className="bg-[#FFF6EB] rounded-xl p-4" style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mq4" stroke="#E67E22" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="mq135" stroke="#C0392B" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
