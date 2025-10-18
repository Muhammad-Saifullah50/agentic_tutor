import { AppSidebar } from "../../components/AppSidebar";
import { Navbar } from "../../components/Navbar";
import { ThemeProvider } from "../../components/theme-provider";
import { SidebarProvider } from "../../components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <main className="flex flex-1 items-center justify-center p-6">
              {children}
            </main>
          </ThemeProvider>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
