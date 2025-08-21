"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus, Calendar, IndianRupee, ChevronRight } from "lucide-react"
import { getGroupsByUserId, getUserById, currentUser } from "@/lib/sample-data"

interface GroupsListProps {
  onGroupSelect: (groupId: string) => void
}

export function GroupsList({ onGroupSelect }: GroupsListProps) {
  const userGroups = getGroupsByUserId(currentUser.id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getGroupMemberAvatars = (memberIds: string[]) => {
    return memberIds
      .slice(0, 3)
      .map((memberId) => {
        const member = getUserById(memberId)
        return member ? { name: member.name, avatar: member.avatar } : null
      })
      .filter(Boolean)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Groups
          </h1>
          <p className="text-muted-foreground mt-2">Manage shared expenses with friends and roommates</p>
        </div>
        <Button className="gradient-blue text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userGroups.map((group, index) => {
          const memberAvatars = getGroupMemberAvatars(group.members)
          const creator = getUserById(group.createdBy)

          return (
            <Card
              key={group.id}
              className="gradient-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onGroupSelect(group.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{group.members.length} members</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>

                {/* Member Avatars */}
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {memberAvatars.map((member, idx) => (
                      <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                        <AvatarImage src={member?.avatar || "/placeholder.svg"} alt={member?.name} />
                        <AvatarFallback className="text-xs">
                          {member?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {group.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium">+{group.members.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">members</span>
                </div>

                {/* Group Stats */}
                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-1 text-sm">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">₹{group.totalExpenses.toLocaleString()}</span>
                    <span className="text-muted-foreground">total</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(group.createdDate)}</span>
                  </div>
                </div>

                {/* Creator Badge */}
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">
                    Created by {creator?.name.split(" ")[0]}
                  </Badge>
                  {group.createdBy === currentUser.id && (
                    <Badge className="text-xs gradient-blue text-white">Admin</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {userGroups.length === 0 && (
        <Card className="gradient-card border border-border/50 shadow-lg">
          <CardContent className="text-center py-12">
            <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Groups Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first group to start sharing expenses with friends and roommates.
            </p>
            <Button className="gradient-blue text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Group
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
