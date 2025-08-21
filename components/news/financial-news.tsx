"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Newspaper, TrendingUp, Search, Calendar, Tag, Lightbulb, Star } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    headline: "UPI crossed 15B transactions this month – Students benefit with faster payments",
    description:
      "The Unified Payments Interface (UPI) has reached a new milestone with over 15 billion transactions, making it easier for students to manage their daily expenses with instant payments.",
    date: "2025-01-15",
    category: "UPI",
    trending: true,
    image: "/upi-payment-phone.png",
  },
  {
    id: 2,
    headline: "FD interest rates rising in 2025 – Good time to start saving",
    description:
      "Fixed Deposit rates are increasing across major banks, offering students better returns on their savings. Now might be the perfect time to start your first FD.",
    date: "2025-01-14",
    category: "Savings",
    trending: true,
    image: "/placeholder-dq7bu.png",
  },
  {
    id: 3,
    headline: "New student loan scheme announced – lower EMI for education",
    description:
      "The government has introduced a new student loan scheme with reduced EMI options, making higher education more accessible for students from all backgrounds.",
    date: "2025-01-13",
    category: "Student Loans",
    trending: false,
    image: "/placeholder-o7tnt.png",
  },
  {
    id: 4,
    headline: "Budget Hack: Cut down food delivery → save ₹1000/month",
    description:
      "Simple lifestyle changes like reducing food delivery orders can help students save significant amounts. Learn practical tips to manage your food budget better.",
    date: "2025-01-12",
    category: "Savings Tips",
    trending: false,
    image: "/food-delivery-budget.png",
  },
  {
    id: 5,
    headline: "Digital wallets vs Bank accounts: What students should know",
    description:
      "Understanding the pros and cons of digital wallets versus traditional bank accounts can help students make better financial decisions for their daily needs.",
    date: "2025-01-11",
    category: "Digital Banking",
    trending: false,
    image: "/digital-wallet-mobile-banking.png",
  },
  {
    id: 6,
    headline: "Cryptocurrency basics for students: Start small, learn big",
    description:
      "A beginner's guide to understanding cryptocurrency investments, with emphasis on starting small and learning the fundamentals before making any major decisions.",
    date: "2025-01-10",
    category: "Investment",
    trending: true,
    image: "/bitcoin-learning.png",
  },
]

const trendingTags = [
  { name: "UPI", count: 12, color: "bg-blue-100 text-blue-800" },
  { name: "Savings", count: 8, color: "bg-green-100 text-green-800" },
  { name: "Student Loans", count: 6, color: "bg-purple-100 text-purple-800" },
  { name: "Investment", count: 5, color: "bg-orange-100 text-orange-800" },
  { name: "Digital Banking", count: 4, color: "bg-indigo-100 text-indigo-800" },
  { name: "Pocket Money", count: 3, color: "bg-pink-100 text-pink-800" },
]

const aiTips = [
  "Try saving 10% from entertainment to reach your laptop goal faster.",
  "Your food spending is 21% above peers - consider meal planning.",
  "You're doing great with rent savings! Keep up the good work.",
  "Consider setting up a recurring FD with your monthly savings.",
  "Your UPI transactions show good budgeting habits - well done!",
]

export default function FinancialNews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentTip, setCurrentTip] = useState(0)

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
      article.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", ...Array.from(new Set(newsArticles.map((article) => article.category)))]

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % aiTips.length)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Student Finance News & Updates
        </h1>
        <p className="text-gray-600 mt-2">Stay updated with the latest financial news and tips for students</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main News Feed */}
        <div className="lg:col-span-3 space-y-4">
          {filteredNews.map((article, index) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.headline}
                      className="w-full h-48 md:h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`${
                          article.category === "UPI"
                            ? "bg-blue-100 text-blue-800"
                            : article.category === "Savings"
                              ? "bg-green-100 text-green-800"
                              : article.category === "Student Loans"
                                ? "bg-purple-100 text-purple-800"
                                : article.category === "Investment"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {article.category}
                      </Badge>
                      {article.trending && (
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">{article.headline}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trendingTags.map((tag) => (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCategory(tag.name)}
                  >
                    <Badge className={tag.color}>{tag.name}</Badge>
                    <span className="text-sm text-gray-500">{tag.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Today's AI Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-purple-800">{aiTips[currentTip]}</p>
                </div>
                <Button onClick={nextTip} variant="outline" size="sm" className="w-full bg-transparent">
                  <Star className="h-4 w-4 mr-2" />
                  Get Another Tip
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-blue-500" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Articles Today</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trending Topics</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Your Reading Time</span>
                  <span className="font-semibold">12 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
