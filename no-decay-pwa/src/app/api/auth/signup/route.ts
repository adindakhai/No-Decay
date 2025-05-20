import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(req: Request) {
  const { email, name, password } = await req.json()

  // Cek user sudah ada
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return new Response("Email already in use", { status: 400 })
  }

  const hashed = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
    },
  })

  return Response.json({ user })
}
