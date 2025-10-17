import { AppSidebar } from "../../components/AppSidebar"
import { Navbar } from "../../components/Navbar"
import { ThemeProvider } from "../../components/theme-provider"
import { SidebarProvider } from "../../components/ui/sidebar"

const layout = ({children} : {children: React.ReactNode}) => {
  return (
   <SidebarProvider defaultOpen>

            <AppSidebar />

            <div className='flex w-full items-center justify-center flex-col min-h-screen'>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                <main>
                  {children}
                </main>
              </ThemeProvider>
            </div>
          </SidebarProvider>
  )
}

export default layout