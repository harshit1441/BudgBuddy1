"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react"
import { getExpensesByCategory, getExpensesByUserId, currentUser } from "@/lib/sample-data"

const COLORS = [
  "oklch(0.55 0.15 240)", // Primary blue
  "oklch(0.65 0.12 220)", // Light blue
  "oklch(0.45 0.18 260)", // Deep blue
  "oklch(0.75 0.08 200)", // Sky blue
  "oklch(0.35 0.2 280)", // Purple blue
  "oklch(0.85 0.05 180)", // Cyan
]

export function ExpenseAnalytics() {
  const categoryExpenses = getExpensesByCategory(currentUser.id)
  const expenses = getExpensesByUserId(currentUser.id)

  const pieData = Object.entries(categoryExpenses).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const totalExpenses = Object.values(categoryExpenses).reduce((sum, amount) => sum + amount, 0)

  // Mock peer comparison data
  const peerComparison = [
    { category: "Food", you: 2000, peers: 1800 },
    { category: "Entertainment", you: 800, peers: 600 },
    { category: "Transport", you: 300, peers: 450 },
    { category: "Education", you: 1500, peers: 1200 },
  ]

  // Mock monthly trend data
  const monthlyTrend = [
    { month: "Aug", expenses: 6800, budget: 7000 },
    { month: "Sep", expenses: 7200, budget: 7000 },
    { month: "Oct", expenses: 6900, budget: 7000 },
    { month: "Nov", expenses: 7800, budget: 7000 },
    { month: "Dec", expenses: 7600, budget: 7000 },
  ]

  const budgetUsage = (totalExpenses / 8000) * 100 // Assuming ₹8000 budget

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total This Month</p>
            <Progress value={budgetUsage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(budgetUsage)}% of budget used</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">₹{Math.round(totalExpenses / expenses.length)}</div>
            <p className="text-sm text-muted-foreground">Avg per Transaction</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{Object.keys(categoryExpenses).length}</div>
            <p className="text-sm text-muted-foreground">Categories Used</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{expenses.filter((e) => !e.isNeeded).length}</div>
            <p className="text-sm text-muted-foreground">Non-Essential Items</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Budget Alert:</strong> You've used {Math.round(budgetUsage)}% of your monthly budget. Consider
            reducing non-essential spending.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <Lightbulb className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Savings Tip:</strong> You spent ₹800 on entertainment this month. Reducing this by 25% could save
            you ₹200.
          </AlertDescription>
        </Alert>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="gradient-card border border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peer Comparison */}
        <Card className="gradient-card border border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">vs Peer Average</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peerComparison}>
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
      </div>

      {/* Monthly Trend */}
      <Card className="gradient-card border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Monthly Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
              <XAxis dataKey="month" stroke="oklch(0.45 0.05 240)" />
              <YAxis stroke="oklch(0.45 0.05 240)" />
              <Tooltip
                formatter={(value, name) => [`₹${value}`, name === "expenses" ? "Expenses" : "Budget"]}
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
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="gradient-card border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <h4 className="font-medium text-primary mb-2">Food Spending Pattern</h4>
              <p className="text-sm text-muted-foreground">
                You spend ₹2,000 on food monthly. Peers average ₹1,800. Consider meal planning to save ₹400/month.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
              <h4 className="font-medium text-accent mb-2">Entertainment Budget</h4>
              <p className="text-sm text-muted-foreground">
                Entertainment expenses are 33% above peer average. Setting a ₹600 limit could save ₹200 monthly.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-green-100 to-green-50 border border-green-200">
              <h4 className="font-medium text-green-700 mb-2">Positive Trend</h4>
              <p className="text-sm text-green-600">
                Your education spending shows commitment to learning. This investment will pay off long-term!
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200">
              <h4 className="font-medium text-orange-700 mb-2">Optimization Opportunity</h4>
              <p className="text-sm text-orange-600">
                Transport costs are below average. Consider this budget for other categories or savings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
