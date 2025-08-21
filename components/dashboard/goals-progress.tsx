"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, Calendar, Plus } from "lucide-react"
import { getGoalsByUserId, currentUser } from "@/lib/sample-data"

export function GoalsProgress() {
  const goals = getGoalsByUserId(currentUser.id)
  const activeGoals = goals.filter((goal) => !goal.isCompleted).slice(0, 3) // Show top 3 active goals

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const calculateDaysLeft = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Target className="mr-2 h-5 w-5 text-primary" />
          Active Goals
        </CardTitle>
        <Button size="sm" className="gradient-blue text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeGoals.map((goal, index) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const daysLeft = calculateDaysLeft(goal.deadline)

          return (
            <div
              key={goal.id}
              className="space-y-2 p-4 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-foreground">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">
                    ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
                </div>
              </div>

              <Progress value={progress} className="h-2" />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Target: {formatDate(goal.deadline)}</span>
                <span className={daysLeft < 30 ? "text-destructive" : "text-primary"}>
                  ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                </span>
              </div>
            </div>
          )
        })}

        {activeGoals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No active goals yet</p>
            <p className="text-sm">Create your first savings goal to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
