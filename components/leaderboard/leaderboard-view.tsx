"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Building2 } from "lucide-react"
import { sampleLeaderboard, getUserById, currentUser } from "@/lib/sample-data"

export function LeaderboardView() {
  const [filter, setFilter] = useState<"college" | "hostel">("college")

  // Filter leaderboard based on selection
  const filteredLeaderboard = sampleLeaderboard.filter((entry) => {
    if (filter === "hostel") {
      const user = getUserById(entry.userId)
      return user?.hostel === currentUser.hostel
    }
    return true // College view shows all users
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">🥇 Champion</Badge>
      case 2:
        return <Badge className="bg-gradient-to-r from-gray-300 to-gray-500 text-white">🥈 Runner-up</Badge>
      case 3:
        return <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white">🥉 Third Place</Badge>
      default:
        return null
    }
  }

  const getPerformanceColor = (savingsPercentage: number) => {
    if (savingsPercentage >= 70) return "text-green-600"
    if (savingsPercentage >= 60) return "text-blue-600"
    if (savingsPercentage >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const currentUserRank = filteredLeaderboard.find((entry) => entry.userId === currentUser.id)?.rank || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in">
          Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          See how you rank among your peers in savings and financial management
        </p>
      </div>

      {/* Filter and Current Rank */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <Select value={filter} onValueChange={(value) => setFilter(value as "college" | "hostel")}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select leaderboard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="college">
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  College Leaderboard
                </div>
              </SelectItem>
              <SelectItem value="hostel">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Hostel Leaderboard
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentUserRank > 0 && (
          <Card className="gradient-card border border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">#{currentUserRank}</span>
                </div>
                <div>
                  <p className="font-medium">Your Rank</p>
                  <p className="text-sm text-muted-foreground">
                    {filter === "college" ? "College" : "Hostel"} Position
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Top 3 Podium */}
      <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center justify-center">
            <Trophy className="mr-2 h-6 w-6 text-primary" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredLeaderboard.slice(0, 3).map((entry, index) => {
              const user = getUserById(entry.userId)
              if (!user) return null

              const isCurrentUser = entry.userId === currentUser.id

              return (
                <div
                  key={entry.userId}
                  className={`text-center p-6 rounded-xl transition-all duration-300 hover:scale-105 animate-slide-up ${
                    entry.rank === 1
                      ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300"
                      : entry.rank === 2
                        ? "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300"
                        : "bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300"
                  } ${isCurrentUser ? "ring-2 ring-primary ring-offset-2" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-lg">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="text-lg font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2">{getRankIcon(entry.rank)}</div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {user.name} {isCurrentUser && "(You)"}
                      </h3>
                      <p className="text-sm text-muted-foreground">{user.hostel}</p>
                    </div>

                    {getRankBadge(entry.rank)}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-2 rounded-lg bg-white/50">
                        <p className="font-semibold text-primary">{entry.credits.toLocaleString()}</p>
                        <p className="text-muted-foreground">Credits</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-white/50">
                        <p className={`font-semibold ${getPerformanceColor(entry.savingsPercentage)}`}>
                          {entry.savingsPercentage}%
                        </p>
                        <p className="text-muted-foreground">Savings</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Full Rankings ({filteredLeaderboard.length} students)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLeaderboard.map((entry, index) => {
              const user = getUserById(entry.userId)
              if (!user) return null

              const isCurrentUser = entry.userId === currentUser.id
              const isTopThree = entry.rank <= 3

              return (
                <div
                  key={entry.userId}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:shadow-md animate-slide-up ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30"
                      : isTopThree
                        ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200"
                        : "bg-gradient-to-r from-background to-accent/5 border border-border/30"
                  }`}
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {entry.rank <= 3 ? (
                        getRankIcon(entry.rank)
                      ) : (
                        <span className="text-lg font-bold text-muted-foreground">#{entry.rank}</span>
                      )}
                    </div>

                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="font-medium">
                        {user.name} {isCurrentUser && "(You)"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user.hostel} • {user.college}
                      </p>
                    </div>

                    {isTopThree && getRankBadge(entry.rank)}
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-primary">{entry.credits.toLocaleString()}</p>
                      <p className="text-muted-foreground">Credits</p>
                    </div>

                    <div className="text-center">
                      <p className={`font-semibold ${getPerformanceColor(entry.savingsPercentage)}`}>
                        {entry.savingsPercentage}%
                      </p>
                      <p className="text-muted-foreground">Savings</p>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold text-accent">₹{entry.monthlyExpenses.toLocaleString()}</p>
                      <p className="text-muted-foreground">Monthly</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{filteredLeaderboard.length}</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-accent">
              {Math.round(
                filteredLeaderboard.reduce((sum, entry) => sum + entry.savingsPercentage, 0) /
                  filteredLeaderboard.length,
              )}
              %
            </p>
            <p className="text-sm text-muted-foreground">Avg Savings</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <CardContent className="p-4 text-center">
            <Medal className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">
              ₹
              {Math.round(
                filteredLeaderboard.reduce((sum, entry) => sum + entry.monthlyExpenses, 0) / filteredLeaderboard.length,
              ).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Avg Expenses</p>
          </CardContent>
        </Card>

        <Card className="gradient-card border border-border/50 animate-slide-up" style={{ animationDelay: "0.7s" }}>
          <CardContent className="p-4 text-center">
            <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">
              {filteredLeaderboard.reduce((sum, entry) => sum + entry.credits, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Credits</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
