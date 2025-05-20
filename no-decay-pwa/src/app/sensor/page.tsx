import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const data = await prisma.sensorData.findMany({ orderBy: { createdAt: "desc" }, take: 5 })

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Latest Sensor Data</h2>
      {data.map((entry) => (
        <div key={entry.id} className="mb-2">
          <p>🌡 Temp: {entry.temperature}°C | 💧 Humidity: {entry.humidity}%</p>
          <p>🔥 MQ4: {entry.mq4} | ☠ MQ135: {entry.mq135}</p>
          <p className="text-sm text-gray-500">🕒 {new Date(entry.createdAt).toLocaleString()}</p>
          <hr className="my-2" />
        </div>
      ))}
    </div>
  )
}
