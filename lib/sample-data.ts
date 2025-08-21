import type {
  User,
  Expense,
  Group,
  GroupExpense,
  Goal,
  WalletTransaction,
  Reward,
  UserReward,
  LeaderboardEntry,
  Notification,
} from "./types"

// Sample Users
export const sampleUsers: User[] = [
  {
    id: "user-1",
    name: "Riyan Sharma",
    email: "riyan.sharma@college.edu",
    hostel: "Hostel A",
    college: "IIT Delhi",
    avatar: "/student-male-avatar.png",
    totalCredits: 1250,
    savingsPercentage: 68,
    joinedDate: "2024-01-15",
  },
  {
    id: "user-2",
    name: "Anjali Patel",
    email: "anjali.patel@college.edu",
    hostel: "Hostel B",
    college: "IIT Delhi",
    avatar: "/student-female-avatar.png",
    totalCredits: 980,
    savingsPercentage: 72,
    joinedDate: "2024-01-20",
  },
  {
    id: "user-3",
    name: "Harshit Kumar",
    email: "harshit.kumar@college.edu",
    hostel: "Hostel A",
    college: "IIT Delhi",
    avatar: "/student-male-avatar-glasses.png",
    totalCredits: 1450,
    savingsPercentage: 75,
    joinedDate: "2024-01-10",
  },
  {
    id: "user-4",
    name: "Priya Singh",
    email: "priya.singh@college.edu",
    hostel: "Hostel C",
    college: "IIT Delhi",
    avatar: "/student-female-avatar-smile.png",
    totalCredits: 820,
    savingsPercentage: 65,
    joinedDate: "2024-02-01",
  },
]

// Sample Expenses for current user (Riyan)
export const sampleExpenses: Expense[] = [
  {
    id: "exp-1",
    userId: "user-1",
    amount: 2000,
    description: "Monthly mess bill",
    category: "Food",
    isNeeded: true,
    date: "2024-12-01",
  },
  {
    id: "exp-2",
    userId: "user-1",
    amount: 4000,
    description: "Hostel rent",
    category: "Rent",
    isNeeded: true,
    date: "2024-12-01",
  },
  {
    id: "exp-3",
    userId: "user-1",
    amount: 1000,
    description: "Electricity and water bill",
    category: "Bills",
    isNeeded: true,
    date: "2024-12-05",
  },
  {
    id: "exp-4",
    userId: "user-1",
    amount: 800,
    description: "Movie night with friends",
    category: "Entertainment",
    isNeeded: false,
    date: "2024-12-10",
    peerPressure: true,
  },
  {
    id: "exp-5",
    userId: "user-1",
    amount: 300,
    description: "Auto to mall",
    category: "Transport",
    isNeeded: false,
    date: "2024-12-12",
  },
  {
    id: "exp-6",
    userId: "user-1",
    amount: 1500,
    description: "New textbooks",
    category: "Education",
    isNeeded: true,
    date: "2024-12-15",
  },
  {
    id: "exp-7",
    userId: "user-1",
    amount: 1200,
    description: "Dinner at expensive restaurant with friends",
    category: "Food",
    isNeeded: false,
    date: "2024-12-08",
    peerPressure: true,
  },
  {
    id: "exp-8",
    userId: "user-1",
    amount: 2500,
    description: "Designer sneakers (everyone had them)",
    category: "Shopping",
    isNeeded: false,
    date: "2024-11-25",
    peerPressure: true,
  },
  {
    id: "exp-9",
    userId: "user-1",
    amount: 600,
    description: "Concert tickets with group",
    category: "Entertainment",
    isNeeded: false,
    date: "2024-11-30",
    peerPressure: true,
  },
  {
    id: "exp-10",
    userId: "user-1",
    amount: 400,
    description: "Coffee dates (3 times this week)",
    category: "Food",
    isNeeded: false,
    date: "2024-12-14",
    peerPressure: true,
  },
]

// Sample Groups
export const sampleGroups: Group[] = [
  {
    id: "group-1",
    name: "Hostel Roommates",
    description: "Shared expenses for our hostel room",
    members: ["user-1", "user-3"],
    createdBy: "user-1",
    createdDate: "2024-01-15",
    totalExpenses: 3500,
  },
  {
    id: "group-2",
    name: "Goa Trip Squad",
    description: "Planning our semester break trip to Goa",
    members: ["user-1", "user-2", "user-3", "user-4"],
    createdBy: "user-2",
    createdDate: "2024-11-01",
    totalExpenses: 12000,
  },
]

// Sample Group Expenses
export const sampleGroupExpenses: GroupExpense[] = [
  {
    id: "gexp-1",
    groupId: "group-1",
    amount: 2000,
    description: "Room cleaning supplies",
    paidBy: "user-1",
    splitBetween: ["user-1", "user-3"],
    date: "2024-12-01",
    category: "Other",
  },
  {
    id: "gexp-2",
    groupId: "group-1",
    amount: 1500,
    description: "Shared groceries",
    paidBy: "user-3",
    splitBetween: ["user-1", "user-3"],
    date: "2024-12-08",
    category: "Food",
  },
  {
    id: "gexp-3",
    groupId: "group-2",
    amount: 8000,
    description: "Hotel booking advance",
    paidBy: "user-2",
    splitBetween: ["user-1", "user-2", "user-3", "user-4"],
    date: "2024-11-15",
    category: "Entertainment",
  },
  {
    id: "gexp-4",
    groupId: "group-2",
    amount: 4000,
    description: "Flight tickets",
    paidBy: "user-1",
    splitBetween: ["user-1", "user-2", "user-3", "user-4"],
    date: "2024-11-20",
    category: "Transport",
  },
]

// Sample Goals
export const sampleGoals: Goal[] = [
  {
    id: "goal-1",
    userId: "user-1",
    title: "Buy Gaming Laptop",
    targetAmount: 50000,
    currentAmount: 20000,
    deadline: "2025-06-01",
    category: "Electronics",
    isCompleted: false,
    createdDate: "2024-09-01",
  },
  {
    id: "goal-2",
    userId: "user-1",
    title: "Summer Trip Fund",
    targetAmount: 10000,
    currentAmount: 6000,
    deadline: "2025-05-01",
    category: "Travel",
    isCompleted: false,
    createdDate: "2024-10-01",
  },
  {
    id: "goal-3",
    userId: "user-1",
    title: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 15000,
    deadline: "2024-12-31",
    category: "Savings",
    isCompleted: true,
    createdDate: "2024-06-01",
  },
]

// Sample Wallet Transactions
export const sampleWalletTransactions: WalletTransaction[] = [
  {
    id: "txn-1",
    userId: "user-1",
    type: "credit",
    amount: 5000,
    description: "Monthly allowance from parents",
    date: "2024-12-01",
    category: "Income",
  },
  {
    id: "txn-2",
    userId: "user-1",
    type: "debit",
    amount: 2000,
    description: "Mess bill payment",
    date: "2024-12-01",
    category: "Food",
  },
  {
    id: "txn-3",
    userId: "user-1",
    type: "credit",
    amount: 500,
    description: "Cashback from rewards",
    date: "2024-12-05",
    category: "Rewards",
  },
  {
    id: "txn-4",
    userId: "user-1",
    type: "debit",
    amount: 800,
    description: "Movie tickets",
    date: "2024-12-10",
    category: "Entertainment",
  },
  {
    id: "txn-5",
    userId: "user-1",
    type: "debit",
    amount: 200,
    description: "Coffee with friends",
    date: "2024-12-12",
    category: "Food",
  },
]

// Sample Rewards
export const sampleRewards: Reward[] = [
  {
    id: "reward-1",
    title: "₹100 Cashback",
    description: "Get ₹100 cashback to your wallet",
    creditsRequired: 1000,
    type: "cashback",
    isAvailable: true,
    imageUrl: "/cashback-money-icon.png",
  },
  {
    id: "reward-2",
    title: "Free Coffee Coupon",
    description: "Free coffee at campus cafe",
    creditsRequired: 500,
    type: "coupon",
    isAvailable: true,
    imageUrl: "/coffee-cup-icon.png",
  },
  {
    id: "reward-3",
    title: "Savings Master Badge",
    description: "Digital badge for achieving savings goals",
    creditsRequired: 200,
    type: "badge",
    isAvailable: true,
    imageUrl: "/gold-badge-trophy.png",
  },
  {
    id: "reward-4",
    title: "₹50 Food Voucher",
    description: "₹50 off on food delivery apps",
    creditsRequired: 750,
    type: "coupon",
    isAvailable: true,
    imageUrl: "/placeholder-8tg9x.png",
  },
]

// Sample User Rewards (claimed/redeemed)
export const sampleUserRewards: UserReward[] = [
  {
    id: "ureward-1",
    userId: "user-1",
    rewardId: "reward-3",
    claimedDate: "2024-11-15",
    status: "redeemed",
  },
  {
    id: "ureward-2",
    userId: "user-1",
    rewardId: "reward-2",
    claimedDate: "2024-12-01",
    status: "claimed",
  },
]

// Sample Leaderboard
export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    userId: "user-3",
    rank: 1,
    credits: 1450,
    savingsPercentage: 75,
    monthlyExpenses: 6800,
  },
  {
    userId: "user-1",
    rank: 2,
    credits: 1250,
    savingsPercentage: 68,
    monthlyExpenses: 7600,
  },
  {
    userId: "user-2",
    rank: 3,
    credits: 980,
    savingsPercentage: 72,
    monthlyExpenses: 7200,
  },
  {
    userId: "user-4",
    rank: 4,
    credits: 820,
    savingsPercentage: 65,
    monthlyExpenses: 8100,
  },
]

// Sample Notifications
export const sampleNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    title: "Payment Reminder",
    message: "You owe ₹500 to Riyan for shared groceries",
    type: "reminder",
    isRead: false,
    date: "2024-12-15",
  },
  {
    id: "notif-2",
    userId: "user-1",
    title: "Goal Achievement",
    message: "Congratulations! You've completed your Emergency Fund goal",
    type: "achievement",
    isRead: true,
    date: "2024-12-10",
  },
  {
    id: "notif-3",
    userId: "user-1",
    title: "Group Expense Added",
    message: "New expense added to Goa Trip Squad: Flight tickets ₹4000",
    type: "group",
    isRead: false,
    date: "2024-11-20",
  },
]

// Current user (for demo purposes)
export const currentUser = sampleUsers[0] // Riyan Sharma

// Utility functions
export const getUserById = (id: string): User | undefined => {
  return sampleUsers.find((user) => user.id === id)
}

export const getExpensesByUserId = (userId: string): Expense[] => {
  return sampleExpenses.filter((expense) => expense.userId === userId)
}

export const getGroupsByUserId = (userId: string): Group[] => {
  return sampleGroups.filter((group) => group.members.includes(userId))
}

export const getGoalsByUserId = (userId: string): Goal[] => {
  return sampleGoals.filter((goal) => goal.userId === userId)
}

export const getWalletTransactionsByUserId = (userId: string): WalletTransaction[] => {
  return sampleWalletTransactions.filter((transaction) => transaction.userId === userId)
}

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return sampleNotifications.filter((notification) => notification.userId === userId)
}

export const calculateWalletBalance = (userId: string): number => {
  const transactions = getWalletTransactionsByUserId(userId)
  return transactions.reduce((balance, transaction) => {
    return transaction.type === "credit" ? balance + transaction.amount : balance - transaction.amount
  }, 0)
}

export const calculateMonthlyExpenses = (userId: string, month?: string): number => {
  const expenses = getExpensesByUserId(userId)
  const currentMonth = month || new Date().toISOString().slice(0, 7) // YYYY-MM format

  return expenses
    .filter((expense) => expense.date.startsWith(currentMonth))
    .reduce((total, expense) => total + expense.amount, 0)
}

export const getExpensesByCategory = (userId: string): Record<string, number> => {
  const expenses = getExpensesByUserId(userId)
  const categoryTotals: Record<string, number> = {}

  expenses.forEach((expense) => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
  })

  return categoryTotals
}

// Utility function to get peer pressure expenses
export const getPeerPressureExpenses = (userId: string): Expense[] => {
  return sampleExpenses.filter((expense) => expense.userId === userId && expense.peerPressure === true)
}

export const calculatePeerPressureStats = (userId: string) => {
  const allExpenses = getExpensesByUserId(userId)
  const peerPressureExpenses = getPeerPressureExpenses(userId)

  const totalPeerPressureAmount = peerPressureExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalExpenseAmount = allExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const percentage = totalExpenseAmount > 0 ? Math.round((totalPeerPressureAmount / totalExpenseAmount) * 100) : 0

  return {
    count: peerPressureExpenses.length,
    totalAmount: totalPeerPressureAmount,
    percentage,
  }
}

export const getPeerPressureByCategory = (userId: string): Record<string, number> => {
  const peerPressureExpenses = getPeerPressureExpenses(userId)
  const categoryTotals: Record<string, number> = {}

  peerPressureExpenses.forEach((expense) => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
  })

  return categoryTotals
}
