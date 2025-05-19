import GreetingCard from "@/components/ui/greeting-card"
import CategoryButtons from "@/components/ui/category-buttons"
import ContainerCards from "@/components/ui/container-cards"
import Navbar from "@/components/ui/navbar"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 max-w-md mx-auto w-full pb-16">
        <div className="p-4 space-y-6">
          <GreetingCard name="Sarah" />
          <CategoryButtons />
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-3">Quick Update</h2>
            <ContainerCards />
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  )
}