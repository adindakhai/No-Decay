import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionWrapper from "@/components/session-wrapper" // ← pakai wrapper client
import FCMClient from "@/components/fcm-client"; // ← Tambahkan ini

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "No-Decay",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon512_rounded.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <SessionWrapper>
          <FCMClient />
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
