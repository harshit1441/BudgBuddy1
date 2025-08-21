"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Target, AlertTriangle, Lightbulb, Award } from "lucide-react"
import { getExpensesByCategory, currentUser, sampleLeaderboard } from "@/lib/sample-data"

const COLORS = [
  "oklch(0.55 0.15 240)", // Primary blue
  "oklch(0.65 0.12 220)", // Light blue
  "oklch(0.45 0.18 260)", // Deep blue
  "oklch(0.75 0.08 200)", // Sky blue
  "oklch(0.35 0.2 280)", // Purple blue
  "oklch(0.85 0.05 180)", // Cyan
]

export function AnalyticsDashboard() {
  const categoryExpenses = getExpensesByCategory(currentUser.id)
  const totalExpenses = Object.values(categoryExpenses).reduce((sum, amount) => sum + amount, 0)

  // Peer comparison data
  const currentUserEntry = sampleLeaderboard.find((entry) => entry.userId === currentUser.id)
  const peerAverage = {
    expenses: Math.round(
      sampleLeaderboard.reduce((sum, entry) => sum + entry.monthlyExpenses, 0) / sampleLeaderboard.length,
    ),
    savings: Math.round(
      sampleLeaderboard.reduce((sum, entry) => sum + entry.savingsPercentage, 0) / sampleLeaderboard.length,
    ),
    credits: Math.round(sampleLeaderboard.reduce((sum, entry) => sum + entry.credits, 0) / sampleLeaderboard.length),
  }

  // Category comparison with peers
  const categoryComparison = [
    { category: "Food", you: 2000, peers: 1800, difference: 11 },
    { category: "Entertainment", you: 800, peers: 600, difference: 33 },
    { category: "Transport", you: 300, peers: 450, difference: -33 },
    { category: "Education", you: 1500, peers: 1200, difference: 25 },
    { category: "Bills", you: 1000, peers: 1100, difference: -9 },
  ]

  // Spending pattern radar chart
  const spendingPattern = [
    { category: "Food", score: 75 },
    { category: "Entertainment", score: 85 },
    { category: "Transport", score: 45 },
    { category: "Education", score: 90 },
    { category: "Bills", score: 70 },
    { category: "Shopping", score: 60 },
  ]

  // Monthly trend
  const monthlyTrend = [
    { month: "Aug", expenses: 6800, budget: 7000, savings: 1200 },
    { month: "Sep", expenses: 7200, budget: 7000, savings: 800 },
    { month: "Oct", expenses: 6900, budget: 7000, savings: 1100 },
    { month: "Nov", expenses: 7800, budget: 7000, savings: 200 },
    { month: "Dec", expenses: 7600, budget: 7000, savings: 400 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in">
          Financial Analytics
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          Deep insights into your spending patterns, peer comparisons, and personalized recommendations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-border/50 animate-slide-up">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Monthly Expenses</p>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">+12% vs peers</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{currentUserEntry?.savingsPercentage || 68}%</div>
            <p className="text-sm text-muted-foreground">Savings Rate</p>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">-4% vs peers</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{currentUser.totalCredits.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Reward Credits</p>
            <div className="flex items-center mt-2 text-xs">
              <Award className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">Above average</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">#{currentUserEntry?.rank || 2}</div>
            <p className="text-sm text-muted-foreground">College Rank</p>
            <div className="flex items-center mt-2 text-xs">
              <Target className="h-3 w-3 mr-1 text-primary" />
              <span className="text-primary">Top 25%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending vs Peers */}
        <Card
          className="gradient-card border border-border/50 shadow-lg animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Category vs Peer Average</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
                <XAxis dataKey="category" stroke="oklch(0.45 0.05 240)" />
                <YAxis stroke="oklch(0.45 0.05 240)" />
                <Tooltip
                  formatter={(value, name) => [`₹${value}`, name === "you" ? "You" : "Peers"]}
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.88 0.02 240)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="you" fill="oklch(0.55 0.15 240)" name="you" radius={[2, 2, 0, 0]} />
                <Bar dataKey="peers" fill="oklch(0.75 0.08 200)" name="peers" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spending Pattern Radar */}
        <Card
          className="gradient-card border border-border/50 shadow-lg animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spending Pattern Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={spendingPattern}>
                <PolarGrid stroke="oklch(0.88 0.02 240)" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: "oklch(0.45 0.05 240)" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "oklch(0.45 0.05 240)" }} />
                <Radar
                  name="Spending Score"
                  dataKey="score"
                  stroke="oklch(0.55 0.15 240)"
                  fill="oklch(0.55 0.15 240)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.6s" }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Monthly Financial Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
              <XAxis dataKey="month" stroke="oklch(0.45 0.05 240)" />
              <YAxis stroke="oklch(0.45 0.05 240)" />
              <Tooltip
                formatter={(value, name) => [`₹${value}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.88 0.02 240)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="oklch(0.55 0.15 240)"
                strokeWidth={3}
                dot={{ fill: "oklch(0.55 0.15 240)", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="oklch(0.75 0.08 200)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "oklch(0.75 0.08 200)", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="oklch(0.35 0.2 280)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.35 0.2 280)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.7s" }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-primary" />
            AI-Powered Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alerts */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                Spending Alerts
              </h4>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200">
                  <h5 className="font-medium text-orange-800 mb-1">Food Overspending</h5>
                  <p className="text-sm text-orange-700">
                    You're spending 11% more on food than peers. Consider meal planning to save ₹200/month.
                  </p>
                  <Progress value={75} className="mt-2 h-2" />
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
                  <h5 className="font-medium text-red-800 mb-1">Entertainment Budget</h5>
                  <p className="text-sm text-red-700">
                    Entertainment expenses are 33% above average. Set a ₹600 monthly limit.
                  </p>
                  <Progress value={85} className="mt-2 h-2" />
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center">
                <Target className="mr-2 h-4 w-4 text-green-500" />
                Smart Recommendations
              </h4>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Transport Optimization</h5>
                  <p className="text-sm text-green-700">
                    Great job! You're spending 33% less on transport. You could reallocate ₹150 to savings.
                  </p>
                  <Badge className="mt-2 bg-green-500 text-white text-xs">Opportunity</Badge>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Savings Goal Progress</h5>
                  <p className="text-sm text-blue-700">
                    You're on track for your laptop goal! Maintain current savings rate to achieve it by June 2025.
                  </p>
                  <Badge className="mt-2 bg-blue-500 text-white text-xs">On Track</Badge>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-1">Credit Earning</h5>
                  <p className="text-sm text-purple-700">
                    Complete 2 more expense entries this week to earn 50 bonus credits!
                  </p>
                  <Badge className="mt-2 bg-purple-500 text-white text-xs">Action Item</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
