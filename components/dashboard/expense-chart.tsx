"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { getExpensesByCategory, currentUser } from "@/lib/sample-data"

const COLORS = [
  "oklch(0.55 0.15 240)", // Primary blue
  "oklch(0.65 0.12 220)", // Light blue
  "oklch(0.45 0.18 260)", // Deep blue
  "oklch(0.75 0.08 200)", // Sky blue
  "oklch(0.35 0.2 280)", // Purple blue
  "oklch(0.85 0.05 180)", // Cyan
]

export function ExpenseChart() {
  const categoryExpenses = getExpensesByCategory(currentUser.id)

  const pieData = Object.entries(categoryExpenses).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const monthlyData = [
    { month: "Aug", expenses: 6800 },
    { month: "Sep", expenses: 7200 },
    { month: "Oct", expenses: 6900 },
    { month: "Nov", expenses: 7800 },
    { month: "Dec", expenses: 7600 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart - Category Breakdown */}
      <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
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

      {/* Bar Chart - Monthly Trend */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Expense Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
              <XAxis dataKey="month" stroke="oklch(0.45 0.05 240)" />
              <YAxis stroke="oklch(0.45 0.05 240)" />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Expenses"]}
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.88 0.02 240)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="expenses" fill="oklch(0.55 0.15 240)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
