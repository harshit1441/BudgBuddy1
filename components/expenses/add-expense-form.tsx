"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Upload, Camera, CalendarIcon, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import type { ExpenseCategory } from "@/lib/types"

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

interface AddExpenseFormProps {
  onExpenseAdded: () => void
}

export function AddExpenseForm({ onExpenseAdded }: AddExpenseFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<ExpenseCategory>("Food")
  const [isNeeded, setIsNeeded] = useState(true)
  const [isPeerPressure, setIsPeerPressure] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [isOcrProcessing, setIsOcrProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate adding expense
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setIsOpen(false)
      setAmount("")
      setDescription("")
      setCategory("Food")
      setIsNeeded(true)
      setIsPeerPressure(false)
      setDate(new Date())
      onExpenseAdded()
    }, 1500)
  }

  const handleOcrUpload = () => {
    setIsOcrProcessing(true)

    // Mock OCR processing
    setTimeout(() => {
      setAmount("450")
      setDescription("Grocery shopping at Big Bazaar")
      setCategory("Food")
      setIsNeeded(true)
      setIsOcrProcessing(false)
    }, 2000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="gradient-blue text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        size="lg"
      >
        <Plus className="mr-2 h-5 w-5" />
        Add New Expense
      </Button>
    )
  }

  return (
    <Card className="gradient-card border border-border/50 shadow-lg animate-slide-up">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Plus className="mr-2 h-5 w-5 text-primary" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4 animate-bounce" />
            <h3 className="text-lg font-semibold text-green-600 mb-2">Expense Added Successfully!</h3>
            <p className="text-muted-foreground">Your expense has been recorded and categorized.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OCR Upload Section */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Smart Bill Scanner</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a photo of your bill and we'll extract the details automatically
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleOcrUpload}
                disabled={isOcrProcessing}
                className="hover:bg-accent/50 bg-transparent"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isOcrProcessing ? "Processing..." : "Upload Bill"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="text-lg font-semibold"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What did you spend on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Needed Toggle */}
              <div className="space-y-2">
                <Label htmlFor="needed">Expense Type</Label>
                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Switch id="needed" checked={isNeeded} onCheckedChange={setIsNeeded} />
                  <Label htmlFor="needed" className="font-medium">
                    {isNeeded ? "Essential" : "Non-essential"}
                  </Label>
                </div>
              </div>
            </div>

            {/* Peer Pressure Toggle */}
            <div className="space-y-2">
              <Label htmlFor="peer-pressure">Peer Influence</Label>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-orange-200 bg-orange-50">
                <Switch id="peer-pressure" checked={isPeerPressure} onCheckedChange={setIsPeerPressure} />
                <div className="flex-1">
                  <Label htmlFor="peer-pressure" className="font-medium text-orange-800">
                    Was this due to peer pressure?
                  </Label>
                  <p className="text-xs text-orange-600 mt-1">
                    {isPeerPressure ? "This expense was influenced by friends/peers" : "This was your own decision"}
                  </p>
                </div>
                {isPeerPressure && <div className="text-orange-500">⚠️</div>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 gradient-blue text-white" disabled={!amount || !description}>
                Add Expense
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
