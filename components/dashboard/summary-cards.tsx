"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Wallet, Target, Award } from "lucide-react"
import { currentUser, calculateWalletBalance, calculateMonthlyExpenses, getGoalsByUserId } from "@/lib/sample-data"

export function SummaryCards() {
  const walletBalance = calculateWalletBalance(currentUser.id)
  const monthlyExpenses = calculateMonthlyExpenses(currentUser.id)
  const goals = getGoalsByUserId(currentUser.id)
  const activeGoals = goals.filter((goal) => !goal.isCompleted)
  const avgGoalProgress =
    activeGoals.length > 0
      ? activeGoals.reduce((sum, goal) => sum + (goal.currentAmount / goal.targetAmount) * 100, 0) / activeGoals.length
      : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Balance Card */}
      <Card className="gradient-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">₹{walletBalance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +2.5% from last month
          </p>
        </CardContent>
      </Card>

      {/* Monthly Expenses Card */}
      <Card
        className="gradient-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          <TrendingDown className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">₹{monthlyExpenses.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +12% from last month
          </p>
        </CardContent>
      </Card>

      {/* Savings Progress Card */}
      <Card
        className="gradient-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Goals Progress</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{Math.round(avgGoalProgress)}%</div>
          <Progress value={avgGoalProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{activeGoals.length} active goals</p>
        </CardContent>
      </Card>

      {/* Rewards Card */}
      <Card
        className="gradient-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Reward Credits</CardTitle>
          <Award className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{currentUser.totalCredits.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +150 this week
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
