export interface User {
  id: string
  name: string
  email: string
  hostel: string
  college: string
  avatar: string
  totalCredits: number
  savingsPercentage: number
  joinedDate: string
}

export interface Expense {
  id: string
  userId: string
  amount: number
  description: string
  category: ExpenseCategory
  isNeeded: boolean
  date: string
  receiptUrl?: string
  peerPressure?: boolean
}

export type ExpenseCategory =
  | "Food"
  | "Rent"
  | "Bills"
  | "Entertainment"
  | "Transport"
  | "Shopping"
  | "Education"
  | "Healthcare"
  | "Other"

export interface Group {
  id: string
  name: string
  description: string
  members: string[] // User IDs
  createdBy: string
  createdDate: string
  totalExpenses: number
}

export interface GroupExpense {
  id: string
  groupId: string
  amount: number
  description: string
  paidBy: string // User ID
  splitBetween: string[] // User IDs
  date: string
  category: ExpenseCategory
}

export interface Goal {
  id: string
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  isCompleted: boolean
  createdDate: string
}

export interface WalletTransaction {
  id: string
  userId: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
  category: string
}

export interface Reward {
  id: string
  title: string
  description: string
  creditsRequired: number
  type: "cashback" | "coupon" | "badge"
  isAvailable: boolean
  imageUrl: string
}

export interface UserReward {
  id: string
  userId: string
  rewardId: string
  claimedDate: string
  status: "claimed" | "redeemed"
}

export interface LeaderboardEntry {
  userId: string
  rank: number
  credits: number
  savingsPercentage: number
  monthlyExpenses: number
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "reminder" | "achievement" | "group" | "goal"
  isRead: boolean
  date: string
}
