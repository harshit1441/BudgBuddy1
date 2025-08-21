"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Target, Plus, Edit, Check, CalendarIcon, Trophy, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { getGoalsByUserId, currentUser } from "@/lib/sample-data"

export function GoalsManagement() {
  const [goals, setGoals] = useState(getGoalsByUserId(currentUser.id))
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")
  const [deadline, setDeadline] = useState<Date>()
  const [category, setCategory] = useState("")

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

  const calculateMonthsToComplete = (currentAmount: number, targetAmount: number, monthlySavings = 1000) => {
    const remaining = targetAmount - currentAmount
    return Math.ceil(remaining / monthlySavings)
  }

  const handleAddGoal = () => {
    if (!title || !targetAmount || !deadline) return

    const newGoal = {
      id: `goal-${Date.now()}`,
      userId: currentUser.id,
      title,
      targetAmount: Number.parseInt(targetAmount),
      currentAmount: Number.parseInt(currentAmount) || 0,
      deadline: deadline.toISOString().split("T")[0],
      category: category || "General",
      isCompleted: false,
      createdDate: new Date().toISOString().split("T")[0],
    }

    setGoals((prev) => [...prev, newGoal])

    // Reset form
    setTitle("")
    setTargetAmount("")
    setCurrentAmount("")
    setDeadline(undefined)
    setCategory("")
    setShowAddForm(false)
  }

  const markGoalComplete = (goalId: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, isCompleted: true, currentAmount: goal.targetAmount } : goal,
      ),
    )
  }

  const activeGoals = goals.filter((goal) => !goal.isCompleted)
  const completedGoals = goals.filter((goal) => goal.isCompleted)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Savings Goals
          </h1>
          <p className="text-muted-foreground mt-2">Set and track your financial goals to build better saving habits</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="gradient-blue text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Goals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-border/50 animate-slide-up">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{activeGoals.length}</div>
            <p className="text-sm text-muted-foreground">Active Goals</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{completedGoals.length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">
              ₹{activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Saved</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              ₹{activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Target Amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Plus className="mr-2 h-5 w-5 text-primary" />
              Create New Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Buy Gaming Laptop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Electronics, Travel"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount (₹)</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current">Current Amount (₹)</Label>
                <Input
                  id="current"
                  type="number"
                  placeholder="0"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleAddGoal}
                className="flex-1 gradient-blue text-white"
                disabled={!title || !targetAmount || !deadline}
              >
                Create Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Active Goals ({activeGoals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeGoals.map((goal, index) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const daysLeft = calculateDaysLeft(goal.deadline)
              const monthsToComplete = calculateMonthsToComplete(goal.currentAmount, goal.targetAmount)

              return (
                <div
                  key={goal.id}
                  className="p-6 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 hover:shadow-md transition-all duration-200 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          Target: {formatDate(goal.deadline)}
                        </span>
                        <Badge variant="secondary">{goal.category}</Badge>
                        {daysLeft < 30 && (
                          <Badge variant="destructive" className="flex items-center">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {daysLeft} days left
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="hover:bg-accent/50 bg-transparent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="gradient-blue text-white" onClick={() => markGoalComplete(goal.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {Math.round(progress)}%</span>
                      <span>
                        ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                      </span>
                    </div>

                    <Progress value={progress} className="h-3" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 rounded-lg bg-primary/10">
                        <p className="font-medium text-primary">
                          ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">Remaining</p>
                      </div>

                      <div className="text-center p-3 rounded-lg bg-accent/10">
                        <p className="font-medium text-accent">{monthsToComplete} months</p>
                        <p className="text-muted-foreground">Est. completion</p>
                      </div>

                      <div className="text-center p-3 rounded-lg bg-green-100">
                        <p className="font-medium text-green-600">₹1,000/month</p>
                        <p className="text-muted-foreground">Suggested saving</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-green-600" />
              Completed Goals ({completedGoals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedGoals.map((goal, index) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">{goal.title}</h4>
                    <p className="text-sm text-green-600">Completed • ₹{goal.targetAmount.toLocaleString()} saved</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Achieved</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {goals.length === 0 && (
        <Card className="gradient-card border border-border/50 shadow-lg">
          <CardContent className="text-center py-12">
            <Target className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Goals Set Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first savings goal to start building better financial habits.
            </p>
            <Button onClick={() => setShowAddForm(true)} className="gradient-blue text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
