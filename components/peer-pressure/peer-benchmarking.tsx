"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, PieChart, Lightbulb, Calendar, DollarSign } from "lucide-react"
import {
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  calculatePeerPressureStats,
  getPeerPressureExpenses,
  getPeerPressureByCategory,
  currentUser,
} from "@/lib/sample-data"

const COLORS = ["#3B82F6", "#1D4ED8", "#2563EB", "#1E40AF", "#1E3A8A", "#172554"]

export default function PeerBenchmarking() {
  const [showAdvice, setShowAdvice] = useState(false)

  // Get peer pressure data
  const peerPressureStats = calculatePeerPressureStats(currentUser.id)
  const peerPressureExpenses = getPeerPressureExpenses(currentUser.id)
  const categoryBreakdown = getPeerPressureByCategory(currentUser.id)

  // Prepare chart data
  const pieChartData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
    name: category,
    value: amount,
    percentage: Math.round((amount / peerPressureStats.totalAmount) * 100),
  }))

  const monthlyTrend = [
    { month: "Oct", amount: 2800 },
    { month: "Nov", amount: 3500 },
    { month: "Dec", amount: peerPressureStats.totalAmount },
  ]

  const adviceCards = [
    {
      title: "Set a Social Budget",
      description: "Allocate ₹2,000/month for peer activities. Stick to it!",
      impact: "Save ₹1,500/month",
    },
    {
      title: "Suggest Alternatives",
      description: "Propose cheaper alternatives when friends suggest expensive plans.",
      impact: "Reduce peer expenses by 40%",
    },
    {
      title: "Practice Saying No",
      description: "Say no to 1 peer outing per week. Your wallet will thank you.",
      impact: "Save ₹1,200/month",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Peer Pressure Expenses
          </h1>
          <p className="text-gray-600 mt-2">Track and manage expenses influenced by peer pressure</p>
        </div>
        <Button onClick={() => setShowAdvice(!showAdvice)} className="bg-gradient-to-r from-blue-500 to-blue-600">
          <Lightbulb className="h-4 w-4 mr-2" />
          {showAdvice ? "Hide" : "Show"} Tips
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Count</p>
                <p className="text-3xl font-bold text-blue-700 animate-in slide-in-from-bottom duration-1000">
                  {peerPressureStats.count}
                </p>
                <p className="text-xs text-blue-500 mt-1">Peer influenced expenses</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Amount</p>
                <p className="text-3xl font-bold text-blue-800 animate-in slide-in-from-bottom duration-1000 delay-200">
                  ₹{peerPressureStats.totalAmount.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">Spent due to peers</p>
              </div>
              <DollarSign className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-200 to-blue-300 border-blue-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Percentage</p>
                <p className="text-3xl font-bold text-blue-900 animate-in slide-in-from-bottom duration-1000 delay-400">
                  {peerPressureStats.percentage}%
                </p>
                <p className="text-xs text-blue-700 mt-1">Of total expenses</p>
              </div>
              <TrendingDown className="h-12 w-12 text-blue-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advice Cards - Animated */}
      {showAdvice && (
        <div className="grid md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top duration-500">
          {adviceCards.map((advice, index) => (
            <Card key={advice.title} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">{advice.title}</h4>
                    <p className="text-sm text-blue-600 mt-1">{advice.description}</p>
                    <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-700">
                      {advice.impact}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-500" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, "Peer Pressure Expenses"]} />
                  <Bar dataKey="amount" fill="url(#blueGradient)" />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
            Peer Pressure Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {peerPressureExpenses.map((expense, index) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors animate-in slide-in-from-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-blue-500">⚠️</div>
                  <div>
                    <p className="font-semibold text-blue-800">{expense.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-blue-200 text-blue-700">
                        {expense.category}
                      </Badge>
                      <span className="text-xs text-blue-600">{expense.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-700">₹{expense.amount}</p>
                  <p className="text-xs text-blue-500">Peer influenced</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Insights */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">AI Insights & Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                💡 You spent ₹{peerPressureStats.totalAmount.toLocaleString()} due to peer pressure this month.
              </p>
              <p className="text-blue-600 text-sm mt-1">
                This represents {peerPressureStats.percentage}% of your total expenses.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                🎯 Most peer pressure expenses were in {Object.keys(categoryBreakdown)[0]} and Entertainment.
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Consider setting limits for social activities in these categories.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                📈 Your peer pressure spending increased by 25% from last month.
              </p>
              <p className="text-blue-600 text-sm mt-1">Time to implement some of the suggested strategies above!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
