"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Home,
  Receipt,
  Users,
  Wallet,
  Target,
  Gift,
  Trophy,
  BarChart3,
  Settings,
  Menu,
  X,
  UserCheck,
  Newspaper,
} from "lucide-react"

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "groups", label: "Groups", icon: Users },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "goals", label: "Goals", icon: Target },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "peer-pressure", label: "Peer Pressure", icon: UserCheck },
  { id: "financial-news", label: "Financial News", icon: Newspaper },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <Card className="flex flex-col h-full gradient-card border-r border-border/50 rounded-none">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden">
                <Image
                  src="/Logo.png"
                  alt="BudgBuddy Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BudgBuddy
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 pt-2 space-y-2 overflow-y-auto scrollbar-hide">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 transition-all duration-200 ${
                    isActive ? "gradient-blue text-white shadow-lg animate-glow" : "hover:bg-accent/50 hover:scale-105"
                  }`}
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </Card>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <Card className="flex items-center justify-between h-16 px-4 gradient-card border-b border-border/50 rounded-none">
          <div className="flex items-center space-x-3 mx-auto">
            <div className="w-8 h-8 relative rounded-xl overflow-hidden">
              <Image
                src="/Logo.png"
                alt="BudgBuddy Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BudgBuddy
            </span>
          </div>

          <Button variant="ghost" size="sm" className="absolute right-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </Card>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <Card className="absolute top-16 left-0 right-0 z-50 gradient-card border-b border-border/50 rounded-none animate-slide-up max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-12 transition-all duration-200 ${
                      isActive ? "gradient-blue text-white shadow-lg" : "hover:bg-accent/50"
                    }`}
                    onClick={() => {
                      onPageChange(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </Card>
        )}
      </div>
    </>
  )
}
