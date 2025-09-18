import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sqeforge.co.uk"),
  title: "SQE Forge - Forge Your Legal Path To Success",
  description:
    "Professional SQE exam preparation platform with practice questions, study materials, AI assistance, and progress tracking.",
  generator: "Next.js",
  keywords: ["SQE", "legal exam", "solicitor", "exam preparation", "FLK1", "FLK2", "legal education", "UK law"],
  authors: [{ name: "SQE Forge" }],
  openGraph: {
    title: "SQE Forge - Forge Your Legal Path To Success",
    description:
      "Professional SQE exam preparation platform with practice questions, study materials, AI assistance, and progress tracking.",
    url: "https://www.sqeforge.co.uk",
    siteName: "SQE Forge",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQE Forge - Forge Your Legal Path To Success",
    description:
      "Professional SQE exam preparation platform with practice questions, study materials, AI assistance, and progress tracking.",
  },
  alternates: {
    canonical: "https://www.sqeforge.co.uk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
