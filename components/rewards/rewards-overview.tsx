"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Award, Star, Coffee, CreditCard, Trophy, CheckCircle } from "lucide-react"
import { sampleRewards, sampleUserRewards, currentUser } from "@/lib/sample-data"

export function RewardsOverview() {
  const [userRewards, setUserRewards] = useState(sampleUserRewards)
  const [claimingReward, setClaimingReward] = useState<string | null>(null)

  const userCredits = currentUser.totalCredits
  const claimedRewardIds = userRewards.map((ur) => ur.rewardId)

  const handleClaimReward = (rewardId: string) => {
    const reward = sampleRewards.find((r) => r.id === rewardId)
    if (!reward || userCredits < reward.creditsRequired) return

    setClaimingReward(rewardId)

    // Simulate claiming process
    setTimeout(() => {
      const newUserReward = {
        id: `ureward-${Date.now()}`,
        userId: currentUser.id,
        rewardId: rewardId,
        claimedDate: new Date().toISOString().split("T")[0],
        status: "claimed" as const,
      }

      setUserRewards((prev) => [...prev, newUserReward])
      setClaimingReward(null)
    }, 1500)
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "cashback":
        return <CreditCard className="h-6 w-6 text-green-600" />
      case "coupon":
        return <Coffee className="h-6 w-6 text-orange-600" />
      case "badge":
        return <Award className="h-6 w-6 text-purple-600" />
      default:
        return <Gift className="h-6 w-6 text-primary" />
    }
  }

  const availableRewards = sampleRewards.filter((reward) => reward.isAvailable)
  const claimedRewards = userRewards.filter((ur) => ur.status === "claimed")
  const redeemedRewards = userRewards.filter((ur) => ur.status === "redeemed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in">
          Rewards Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          Earn credits by achieving goals and managing expenses wisely. Redeem them for exciting rewards!
        </p>
      </div>

      {/* Credits Overview */}
      <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 gradient-blue rounded-full flex items-center justify-center mx-auto animate-glow">
              <Star className="h-10 w-10 text-white" />
            </div>

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {userCredits.toLocaleString()}
              </h2>
              <p className="text-muted-foreground">Available Credits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
                <p className="text-lg font-semibold text-primary">{claimedRewards.length}</p>
                <p className="text-xs text-muted-foreground">Claimed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10">
                <p className="text-lg font-semibold text-accent">{redeemedRewards.length}</p>
                <p className="text-xs text-muted-foreground">Redeemed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-green-50">
                <p className="text-lg font-semibold text-green-600">+150</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <Gift className="mr-2 h-6 w-6 text-primary" />
            Available Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward, index) => {
              const isAlreadyClaimed = claimedRewardIds.includes(reward.id)
              const canAfford = userCredits >= reward.creditsRequired
              const isClaiming = claimingReward === reward.id

              return (
                <div
                  key={reward.id}
                  className="p-6 rounded-xl bg-gradient-to-br from-background to-accent/5 border border-border/30 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                      {getRewardIcon(reward.type)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-primary">
                          {reward.creditsRequired.toLocaleString()} credits
                        </span>
                      </div>

                      {!canAfford && !isAlreadyClaimed && (
                        <div className="space-y-1">
                          <Progress value={(userCredits / reward.creditsRequired) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            Need {(reward.creditsRequired - userCredits).toLocaleString()} more credits
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      {isAlreadyClaimed ? (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Claimed
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleClaimReward(reward.id)}
                          disabled={!canAfford || isClaiming}
                          className={`w-full ${canAfford ? "gradient-blue text-white" : "bg-muted text-muted-foreground"}`}
                        >
                          {isClaiming ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Claiming...
                            </>
                          ) : canAfford ? (
                            "Claim Reward"
                          ) : (
                            "Insufficient Credits"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* My Rewards */}
      {userRewards.length > 0 && (
        <Card
          className="gradient-card border border-border/50 shadow-lg animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-primary" />
              My Rewards ({userRewards.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRewards.map((userReward, index) => {
                const reward = sampleRewards.find((r) => r.id === userReward.rewardId)
                if (!reward) return null

                return (
                  <div
                    key={userReward.id}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-background to-accent/5 border border-border/30 animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                      {getRewardIcon(reward.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{reward.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Claimed on {new Date(userReward.claimedDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <Badge
                      className={
                        userReward.status === "redeemed" ? "bg-green-500 text-white" : "gradient-blue text-white"
                      }
                    >
                      {userReward.status === "redeemed" ? "Used" : "Ready"}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to Earn Credits */}
      <Card
        className="gradient-card border border-border/50 shadow-lg animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <Star className="mr-2 h-6 w-6 text-primary" />
            How to Earn Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Complete Goals</h4>
              <p className="text-sm text-muted-foreground">+100 credits per goal</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10">
              <Award className="h-8 w-8 text-accent mx-auto mb-2" />
              <h4 className="font-medium mb-1">Stay Under Budget</h4>
              <p className="text-sm text-muted-foreground">+50 credits monthly</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-100 to-green-50">
              <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Track Expenses</h4>
              <p className="text-sm text-muted-foreground">+10 credits daily</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-100 to-orange-50">
              <Gift className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Refer Friends</h4>
              <p className="text-sm text-muted-foreground">+200 credits each</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
