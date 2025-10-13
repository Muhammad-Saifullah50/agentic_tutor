import { Brain, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

interface NavbarProps {
  questionsCorrect?: number;
  questionsTotal?: number;
  flashcardsRemembered?: number;
  flashcardsTotal?: number;
}

export function Navbar({
  questionsCorrect = 0,
  questionsTotal = 0,
  flashcardsRemembered = 0,
  flashcardsTotal = 0,
}: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const applyTheme = (currentTheme: typeof theme) => {
      if (currentTheme === "system") {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", systemPrefersDark);
      } else {
        document.documentElement.classList.toggle("dark", currentTheme === "dark");
      }
    };

    applyTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <nav className="border-b bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Study Mode</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Learning</p>
            </div>
          </div>

          {/* Center - Progress Stats */}
          <div className="hidden md:flex items-center gap-6">
            {questionsTotal > 0 && (
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                <span className="text-sm font-medium">Quiz:</span>
                <span className="text-sm text-primary font-semibold">
                  {questionsCorrect}/{questionsTotal}
                </span>
              </div>
            )}
            {flashcardsTotal > 0 && (
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                <span className="text-sm font-medium">Remembered:</span>
                <span className="text-sm text-accent font-semibold">
                  {flashcardsRemembered}/{flashcardsTotal}
                </span>
              </div>
            )}
          </div>

          {/* Right Side - Theme Toggle */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="transition-transform hover:scale-110"
                >
                  {theme === "light" && <Sun className="h-5 w-5" />}
                  {theme === "dark" && <Moon className="h-5 w-5" />}
                  {theme === "system" && <Monitor className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="mt-3 flex md:hidden items-center gap-4">
          {questionsTotal > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
              <span className="text-xs font-medium">Quiz:</span>
              <span className="text-xs text-primary font-semibold">
                {questionsCorrect}/{questionsTotal}
              </span>
            </div>
          )}
          {flashcardsTotal > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
              <span className="text-xs font-medium">Remembered:</span>
              <span className="text-xs text-accent font-semibold">
                {flashcardsRemembered}/{flashcardsTotal}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
