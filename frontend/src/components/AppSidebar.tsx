import { Brain, Plus } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./../components/ui/sidebar"
import { getUserLessons } from "../actions/lesson.actions"
import { Lesson } from "@prisma/client"

export async function AppSidebar() {
  let lessons: Lesson[] = []
  
  try {
    lessons = await getUserLessons()
  } catch (error) {
    console.error("Failed to fetch lessons:", error)
    
  }

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo at the top */}
        <div className="flex items-center gap-2 p-4 border-b">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AgentiLearn</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Learning</p>
          </div>
        </div>

        {/* New Lesson Button */}
        <div className="py-4 px-2">
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            <span>New Lesson</span>
          </Link>
        </div>

        {/* Lessons List */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <SidebarMenuItem key={lesson.id} className=" rounded-lg !hover:bg-gradient-primary  hover:text-primary-foreground transition-colors">
                    <SidebarMenuButton asChild className="hover:bg-gradient-primary capitalize">
                      <Link href={`/lesson/${lesson.id}?stage=explain`}>
                        <span className="truncate ">{lesson.topic}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No lessons yet. Create your first lesson!
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}