import { Brain } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

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


  return (
    <nav className="border-b bg-card shadow-card w-full sticky top-0 z-10 ">
      <SidebarTrigger className="absolute top-20 "/>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AgentiLearn</h1>
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
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <ThemeToggle />
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
