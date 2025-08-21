"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Users, Plus, Receipt, IndianRupee, UserPlus, AlertCircle } from "lucide-react"
import { sampleGroups, sampleGroupExpenses, getUserById, currentUser } from "@/lib/sample-data"

interface GroupDetailProps {
  groupId: string
  onBack: () => void
}

export function GroupDetail({ groupId, onBack }: GroupDetailProps) {
  const group = sampleGroups.find((g) => g.id === groupId)
  const groupExpenses = sampleGroupExpenses.filter((exp) => exp.groupId === groupId)

  if (!group) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Group not found</h2>
        <Button onClick={onBack} variant="outline">
          Go Back
        </Button>
      </div>
    )
  }

  const members = group.members.map((memberId) => getUserById(memberId)).filter(Boolean)
  const creator = getUserById(group.createdBy)

  // Calculate who owes whom
  const calculateBalances = () => {
    const balances: Record<string, number> = {}

    // Initialize balances
    group.members.forEach((memberId) => {
      balances[memberId] = 0
    })

    // Calculate based on group expenses
    groupExpenses.forEach((expense) => {
      const splitAmount = expense.amount / expense.splitBetween.length

      // Person who paid gets positive balance
      balances[expense.paidBy] += expense.amount - splitAmount

      // Others get negative balance
      expense.splitBetween.forEach((memberId) => {
        if (memberId !== expense.paidBy) {
          balances[memberId] -= splitAmount
        }
      })
    })

    return balances
  }

  const balances = calculateBalances()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Food: "bg-blue-100 text-blue-800",
      Transport: "bg-green-100 text-green-800",
      Entertainment: "bg-pink-100 text-pink-800",
      Other: "bg-gray-100 text-gray-800",
    }
    return colors[category as keyof typeof colors] || colors.Other
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {group.name}
          </h1>
          <p className="text-muted-foreground mt-1">{group.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:bg-accent/50 bg-transparent">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
          <Button className="gradient-blue text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Group Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">₹{group.totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{groupExpenses.length}</div>
            <p className="text-sm text-muted-foreground">Transactions</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{group.members.length}</div>
            <p className="text-sm text-muted-foreground">Members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Members List */}
        <Card className="gradient-card border border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Members ({members.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {members.map((member, index) => {
              const balance = balances[member.id]
              const isCurrentUser = member.id === currentUser.id

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {member.name} {isCurrentUser && "(You)"}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {group.createdBy === member.id && (
                      <Badge className="mb-1 gradient-blue text-white text-xs">Admin</Badge>
                    )}
                    <div
                      className={`text-sm font-medium ${
                        balance > 0 ? "text-green-600" : balance < 0 ? "text-red-600" : "text-muted-foreground"
                      }`}
                    >
                      {balance > 0
                        ? `Gets ₹${Math.abs(balance).toFixed(0)}`
                        : balance < 0
                          ? `Owes ₹${Math.abs(balance).toFixed(0)}`
                          : "Settled up"}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Balance Summary */}
        <Card className="gradient-card border border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <IndianRupee className="mr-2 h-5 w-5 text-primary" />
              Balance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(balances)
              .filter(([_, balance]) => Math.abs(balance) > 0)
              .map(([memberId, balance], index) => {
                const member = getUserById(memberId)
                if (!member) return null

                return (
                  <div
                    key={memberId}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name.split(" ")[0]}</span>
                    </div>

                    <div className={`font-semibold ${balance > 0 ? "text-green-600" : "text-red-600"}`}>
                      {balance > 0 ? "+" : ""}₹{balance.toFixed(0)}
                    </div>
                  </div>
                )
              })}

            {Object.values(balances).every((balance) => Math.abs(balance) < 1) && (
              <div className="text-center py-6 text-muted-foreground">
                <AlertCircle className="mx-auto h-12 w-12 mb-2 opacity-50" />
                <p>All members are settled up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Group Expenses */}
      <Card className="gradient-card border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Receipt className="mr-2 h-5 w-5 text-primary" />
            Group Expenses ({groupExpenses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {groupExpenses.map((expense, index) => {
              const paidBy = getUserById(expense.paidBy)
              const splitAmount = expense.amount / expense.splitBetween.length

              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 hover:shadow-md transition-all duration-200 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">{expense.description}</h4>
                      <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Paid by {paidBy?.name.split(" ")[0]}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                      <span>•</span>
                      <span>₹{splitAmount.toFixed(0)} per person</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">₹{expense.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Split {expense.splitBetween.length} ways</p>
                  </div>
                </div>
              )
            })}

            {groupExpenses.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Receipt className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No expenses yet</p>
                <p className="text-sm">Add your first group expense to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
