import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
  }

  await prisma.deviceToken.upsert({
    where: { token },
    update: {},
    create: { token },
  });

  return NextResponse.json({ success: true });
}
