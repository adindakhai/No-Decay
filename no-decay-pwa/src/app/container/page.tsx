import { ArrowLeft, Search, Bell, Users, Plus, Calendar, Package, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Container list page – No‑Decay PWA
 * Front‑end only – uses shadcn/ui + TailwindCSS
 */
export default function ContainerPage() {
  const containers = [
    {
      id: 1,
      name: "Container 01",
      date: "12 - 05 - 2025",
      status: "Fresh" as Status,
      gas: "normal" as Level,
      temp: "normal" as Level,
      humid: "normal" as Level,
    },
    {
      id: 2,
      name: "Container 02",
      date: "13 - 05 - 2025",
      status: "Warning" as Status,
      gas: "normal" as Level,
      temp: "warning" as Level,
      humid: "normal" as Level,
    },
    {
      id: 3,
      name: "Container 03",
      date: "14 - 05 - 2025",
      status: "Spoiled" as Status,
      gas: "critical" as Level,
      temp: "normal" as Level,
      humid: "warning" as Level,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top‑bar */}
      <header className="flex items-center gap-4 p-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeft className="h-6 w-6 text-[#115437]" />
        </Button>
        <h1 className="flex-1 text-center text-xl font-semibold text-[#115437] mr-10">
          Container
        </h1>
      </header>

      <main className="flex-1 px-6 pb-36">
        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-[#115437]">My Container</h2>

        {/* Search */}
        <div className="relative mb-6">
          <Input
            placeholder="Search Container"
            className="pl-4 pr-12 py-3 rounded-xl border text-base border-[#115437] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#115437]"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#115437]" />
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {containers.map((c) => (
            <Card
              key={c.id}
              className="relative rounded-2xl bg-[#FFF7EA] shadow-sm"
            >
              {/* Status badge */}
              <div
                className="absolute right-0 top-0 rounded-tr-2xl rounded-bl-2xl px-4 py-1 text-sm font-medium text-white"
                style={{ backgroundColor: statusColor[c.status] }}
              >
                {c.status}
              </div>

              <CardContent className="flex gap-4 p-4">
                <Package className="h-14 w-14 text-[#115437]" />

                <div className="flex flex-col flex-1">
                  <span className="text-lg font-semibold text-[#115437]">
                    {c.name}
                  </span>

                  <div className="mt-1 flex items-center gap-2 text-[#115437]">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{c.date}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-6">
                    <SensorBadge label="Gas" level={c.gas} />
                    <SensorBadge label="Temperature" level={c.temp} />
                    <SensorBadge label="Humidity" level={c.humid} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 flex justify-center pb-6">
        <div className="relative w-full max-w-md px-4">
          {/* Bar */}
          <div className="flex items-center justify-between rounded-2xl bg-[#115437] px-8 py-4 text-white shadow-md">
            <Bell className="h-6 w-6" />
            <Users className="h-6 w-6" />
          </div>

          {/* FAB */}
          <button
            className="absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-[#115437] bg-[#FFE9A0] shadow-md"
          >
            <Plus className="h-8 w-8 text-[#115437]" />
          </button>
        </div>
      </nav>
    </div>
  );
}

// ————————————————————————————————————————————————————————————
// Helpers & small components
// ————————————————————————————————————————————————————————————
type Status = "Fresh" | "Warning" | "Spoiled";
type Level = "normal" | "warning" | "critical";

const statusColor: Record<Status, string> = {
  Fresh: "#0B5E36",
  Warning: "#E1560E",
  Spoiled: "#B80B0B",
};

const levelColor: Record<Level, string> = {
  normal: "#0B5E36",
  warning: "#E1560E",
  critical: "#B80B0B",
};

function SensorBadge({ label, level }: { label: string; level: Level }) {
  const icon =
    label === "Gas"
      ? Wind
      : label === "Temperature"
      ? Thermometer
      : Droplets;
  const Icon = icon;
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full border-2"
        style={{ borderColor: levelColor[level] }}
      >
        <Icon className="h-4 w-4" style={{ color: levelColor[level] }} />
      </div>
      <span className="text-sm text-[#115437]">{label}</span>
    </div>
  );
}
