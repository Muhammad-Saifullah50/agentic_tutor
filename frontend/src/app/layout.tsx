import type { Metadata } from 'next'
import './../index.css'
import { Toaster } from '../components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "../components/theme-provider"
import { SidebarProvider } from "../components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"
import { Navbar } from '../components/Navbar'


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
        <body className=''>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider >

  )
}

