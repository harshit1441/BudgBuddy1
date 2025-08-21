"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, CreditCard, Building2, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { calculateWalletBalance, getWalletTransactionsByUserId, currentUser } from "@/lib/sample-data"

export function WalletOverview() {
  const balance = calculateWalletBalance(currentUser.id)
  const transactions = getWalletTransactionsByUserId(currentUser.id)
  const recentTransactions = transactions.slice(0, 5)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTransactionIcon = (type: string) => {
    return type === "credit" ? (
      <ArrowDownLeft className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center mx-auto">
              <Wallet className="h-8 w-8 text-white" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ₹{balance.toLocaleString()}
              </h2>
            </div>

            <div className="flex justify-center space-x-4">
              <Button className="gradient-blue text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-4 w-4" />
                Add Money
              </Button>
              <Button variant="outline" className="hover:bg-accent/50 bg-transparent">
                <CreditCard className="mr-2 h-4 w-4" />
                Send Money
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Bank */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-primary" />
            Connected Bank Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SBI</span>
              </div>
              <div>
                <h4 className="font-medium">State Bank of India</h4>
                <p className="text-sm text-muted-foreground">Student Savings Account</p>
                <p className="text-xs text-muted-foreground">****1234</p>
              </div>
            </div>
            <Badge className="gradient-blue text-white">Connected</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              ₹
              {transactions
                .filter((t) => t.type === "credit")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Received</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              ₹
              {transactions
                .filter((t) => t.type === "debit")
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{transactions.length}</div>
            <p className="text-sm text-muted-foreground">Transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.5s" }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 hover:shadow-md transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${(index + 6) * 0.05}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground">{transaction.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-semibold ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {transactions.length > 5 && (
            <div className="text-center mt-4">
              <Button variant="outline" className="hover:bg-accent/50 bg-transparent">
                View All Transactions
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
