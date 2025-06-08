import GreetingCard from "@/components/ui/greeting-card";
import CategoryButtons from "@/components/ui/category-buttons";
import ContainerCards from "@/components/ui/container-cards";
import { Navbar } from "@/components/ui/navbar";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  console.log("Session:", session)
  if (!session) {
    redirect("/signin")
  }
  console.log("User:", session?.user)
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 w-full px-4 pb-16">
        <div className="mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex flex-col space-y-4">
          <div className="mt-4">
            <GreetingCard name={session.user?.name ?? "User"} />
          </div>

          <section className="w-full">
            <h2 className="font-inter font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-[145%] flex items-center text-[#115437] mb-4">
              Find What You Need
            </h2>
            <CategoryButtons />
          </section>

          <section className="w-full">
            <h2 className="font-inter font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-[145%] flex items-center text-[#115437] mb-4">
              Quick Update
            </h2>
            <ContainerCards />
          </section>
        </div>
      </main>
      <div className="px-4 pb-4 pt-4 bg-transparent w-full">
        <Navbar />
      </div>
    </div>
  );
}
