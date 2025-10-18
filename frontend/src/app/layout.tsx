import type { Metadata } from 'next'
import './../index.css'
import { Toaster } from '../components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: 'AgentiLearn - AI-Powered Learning',
  description: "Master any topic with AI-powered learning through three simple steps: Explain, Quiz, and Review. Study smarter with spaced repetition.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>
        <body className=''>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider >

  )
}

