import type { Metadata } from 'next'
import './../globals.css'

export const metadata: Metadata = {
  title: 'Study Mode - AI-Powered Learning',
  description: "Master any topic with AI-powered learning through three simple steps: Explain, Quiz, and Review. Study smarter with spaced repetition.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}