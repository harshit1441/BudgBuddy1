"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Filter, Search, Receipt } from "lucide-react"
import { getExpensesByUserId, currentUser } from "@/lib/sample-data"
import type { Expense, ExpenseCategory } from "@/lib/types"

const expenseCategories: ExpenseCategory[] = [
  "Food",
  "Rent",
  "Bills",
  "Entertainment",
  "Transport",
  "Shopping",
  "Education",
  "Healthcare",
  "Other",
]

export function ExpenseList() {
  const [expenses] = useState<Expense[]>(getExpensesByUserId(currentUser.id))
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [monthFilter, setMonthFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getCategoryColor = (category: ExpenseCategory) => {
    const colors = {
      Food: "bg-blue-100 text-blue-800",
      Rent: "bg-purple-100 text-purple-800",
      Bills: "bg-yellow-100 text-yellow-800",
      Entertainment: "bg-pink-100 text-pink-800",
      Transport: "bg-green-100 text-green-800",
      Shopping: "bg-indigo-100 text-indigo-800",
      Education: "bg-cyan-100 text-cyan-800",
      Healthcare: "bg-red-100 text-red-800",
      Other: "bg-gray-100 text-gray-800",
    }
    return colors[category] || colors.Other
  }

  const applyFilters = () => {
    let filtered = expenses

    if (categoryFilter !== "all") {
      filtered = filtered.filter((expense) => expense.category === categoryFilter)
    }

    if (monthFilter !== "all") {
      filtered = filtered.filter((expense) => expense.date.startsWith(monthFilter))
    }

    if (searchTerm) {
      filtered = filtered.filter((expense) => expense.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredExpenses(filtered)
  }

  // Apply filters whenever filter values change
  React.useEffect(() => {
    applyFilters()
  }, [categoryFilter, monthFilter, searchTerm])

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const essentialAmount = filteredExpenses.filter((e) => e.isNeeded).reduce((sum, expense) => sum + expense.amount, 0)
  const nonEssentialAmount = totalAmount - essentialAmount

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₹{essentialAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Essential</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">₹{nonEssentialAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Non-Essential</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="gradient-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Filter className="mr-2 h-5 w-5 text-primary" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="2024-12">December 2024</SelectItem>
                  <SelectItem value="2024-11">November 2024</SelectItem>
                  <SelectItem value="2024-10">October 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setCategoryFilter("all")
                  setMonthFilter("all")
                  setSearchTerm("")
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card className="gradient-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Receipt className="mr-2 h-5 w-5 text-primary" />
            Expenses ({filteredExpenses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredExpenses.map((expense, index) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 hover:shadow-md transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-foreground">{expense.description}</h4>
                    <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                    <Badge variant={expense.isNeeded ? "default" : "secondary"}>
                      {expense.isNeeded ? "Essential" : "Non-essential"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(expense.date)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">₹{expense.amount.toLocaleString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="hover:bg-accent/50 bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-destructive/10 hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredExpenses.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Receipt className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No expenses found</p>
                <p className="text-sm">Try adjusting your filters or add your first expense!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
