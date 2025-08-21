"use client"

import type React from "react"
import { Navigation } from "./navigation"

interface AppLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

export function AppLayout({ children, currentPage, onPageChange }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation currentPage={currentPage} onPageChange={onPageChange} />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0 min-h-screen">
          <div className="px-4 py-6 lg:px-8 animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}
