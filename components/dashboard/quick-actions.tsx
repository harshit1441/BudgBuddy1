"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Receipt, Users, Target, TrendingUp } from "lucide-react"

interface QuickActionsProps {
  onPageChange: (page: string) => void
}

export function QuickActions({ onPageChange }: QuickActionsProps) {
  const actions = [
    {
      title: "Add Expense",
      description: "Record a new expense",
      icon: Plus,
      action: () => onPageChange("expenses"),
      gradient: "gradient-blue",
    },
    {
      title: "View Groups",
      description: "Check group expenses",
      icon: Users,
      action: () => onPageChange("groups"),
      gradient: "bg-gradient-to-r from-accent to-primary",
    },
    {
      title: "Set Goal",
      description: "Create savings goal",
      icon: Target,
      action: () => onPageChange("goals"),
      gradient: "bg-gradient-to-r from-primary to-accent",
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: TrendingUp,
      action: () => onPageChange("analytics"),
      gradient: "bg-gradient-to-r from-accent/80 to-primary/80",
    },
  ]

  return (
    <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Receipt className="mr-2 h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className={`h-20 flex-col space-y-2 ${action.gradient} text-white border-0 hover:scale-105 transition-all duration-200 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={action.action}
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
