import type { Metadata } from 'next'
import './../index.css'
import { Toaster } from '../components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "./../components/theme-provider"
import { SidebarProvider, SidebarTrigger } from "./../components/ui/sidebar"
import { AppSidebar } from "./../components/AppSidebar"


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
          <SidebarProvider>

            <AppSidebar />

            <div>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarTrigger />

                {children}
              </ThemeProvider>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider >

  )
}

