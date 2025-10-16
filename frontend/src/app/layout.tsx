import type { Metadata } from 'next'
import './../globals.css'
import { Toaster } from '../components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "./../components/theme-provider"



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
    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>
        <body>
          <Toaster />

          <div>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

              {children}
            </ThemeProvider>
          </div>
        </body>
      </html>
    </ClerkProvider >

  )
}