"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Check, AlertCircle, Users, Target, Award } from "lucide-react"
import { getNotificationsByUserId, currentUser } from "@/lib/sample-data"

export function NotificationPanel() {
  const [notifications, setNotifications] = useState(getNotificationsByUserId(currentUser.id))
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const dismissNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "group":
        return <Users className="h-5 w-5 text-blue-500" />
      case "achievement":
        return <Award className="h-5 w-5 text-green-500" />
      case "goal":
        return <Target className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative hover:bg-accent/50">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs gradient-blue text-white">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 z-50 gradient-card border border-border/50 shadow-xl animate-slide-up">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="max-h-96 overflow-y-auto space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-sm">We'll notify you about important updates</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all duration-200 animate-slide-up ${
                    notification.isRead
                      ? "bg-background border-border/30"
                      : "bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-medium ${
                              notification.isRead ? "text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.date)}</p>
                        </div>

                        <div className="flex space-x-1 ml-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0 hover:bg-primary/10"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissNotification(notification.id)}
                            className="h-6 w-6 p-0 hover:bg-destructive/10"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))}
                className="w-full text-sm"
              >
                Mark all as read
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
