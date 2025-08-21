"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { GoalsProgress } from "@/components/dashboard/goals-progress"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AddExpenseForm } from "@/components/expenses/add-expense-form"
import { ExpenseList } from "@/components/expenses/expense-list"
import { ExpenseAnalytics } from "@/components/expenses/expense-analytics"
import { GroupsList } from "@/components/groups/groups-list"
import { GroupDetail } from "@/components/groups/group-detail"
import { NotificationPanel } from "@/components/groups/notifications"
import { WalletOverview } from "@/components/wallet/wallet-overview"
import { GoalsManagement } from "@/components/goals/goals-management"
import { RewardsOverview } from "@/components/rewards/rewards-overview"
import { LeaderboardView } from "@/components/leaderboard/leaderboard-view"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import PeerBenchmarking from "@/components/peer-pressure/peer-benchmarking"
import FinancialNews from "@/components/news/financial-news"
import { Receipt, TrendingUp } from "lucide-react"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleExpenseAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroupId(groupId)
  }

  const handleBackToGroups = () => {
    setSelectedGroupId(null)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Header with Notifications */}
            <div className="flex justify-between items-center py-8">
              <div className="text-center flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in">
                  Welcome back, Riyan!
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
                  Here's your financial overview for December 2024. Keep tracking your expenses and achieving your
                  goals!
                </p>
              </div>
              <NotificationPanel />
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Charts and Goals Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ExpenseChart />
              </div>
              <div className="space-y-6">
                <GoalsProgress />
                <QuickActions onPageChange={setCurrentPage} />
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="gradient-card p-6 rounded-xl border border-border/50 shadow-lg animate-slide-up">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Receipt className="mr-2 h-5 w-5 text-primary" />
                  Recent Expenses
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-background to-accent/5">
                    <div>
                      <p className="font-medium">New textbooks</p>
                      <p className="text-sm text-muted-foreground">Education • Dec 15</p>
                    </div>
                    <span className="font-semibold text-accent">₹1,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-background to-accent/5">
                    <div>
                      <p className="font-medium">Auto to mall</p>
                      <p className="text-sm text-muted-foreground">Transport • Dec 12</p>
                    </div>
                    <span className="font-semibold text-accent">₹300</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-background to-accent/5">
                    <div>
                      <p className="font-medium">Movie night</p>
                      <p className="text-sm text-muted-foreground">Entertainment • Dec 10</p>
                    </div>
                    <span className="font-semibold text-accent">₹800</span>
                  </div>
                </div>
              </div>

              <div
                className="gradient-card p-6 rounded-xl border border-border/50 shadow-lg animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Insights & Tips
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <h4 className="font-medium text-primary mb-2">Food Spending Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      You've spent ₹2,000 on food this month. That's 15% more than your peers. Consider meal planning to
                      save ₹500.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
                    <h4 className="font-medium text-accent mb-2">Savings Milestone</h4>
                    <p className="text-sm text-muted-foreground">
                      Great job! You're 40% closer to your laptop goal. Keep it up and you'll reach it by June 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "expenses":
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Expense Management
                </h1>
                <p className="text-muted-foreground mt-2">Track, categorize, and analyze your spending patterns</p>
              </div>
            </div>

            <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
            <ExpenseAnalytics key={refreshKey} />
            <ExpenseList key={refreshKey} />
          </div>
        )

      case "groups":
        return selectedGroupId ? (
          <GroupDetail groupId={selectedGroupId} onBack={handleBackToGroups} />
        ) : (
          <GroupsList onGroupSelect={handleGroupSelect} />
        )

      case "wallet":
        return <WalletOverview />

      case "goals":
        return <GoalsManagement />

      case "rewards":
        return <RewardsOverview />

      case "leaderboard":
        return <LeaderboardView />

      case "analytics":
        return <AnalyticsDashboard />

      case "peer-pressure":
        return <PeerBenchmarking />

      case "financial-news":
        return <FinancialNews />

      default:
        return (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4 capitalize">{currentPage}</h1>
            <p className="text-muted-foreground">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} page coming soon...
            </p>
          </div>
        )
    }
  }

  return (
    <AppLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  )
}
