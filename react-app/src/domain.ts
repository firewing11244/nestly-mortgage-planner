export type PlanHealth = 'on_track' | 'review_due' | 'needs_attention'

export type Client = {
  id: string
  displayName: string
  household: string
  joinedAt: string
  adviserId: string
  goal: { type: string; targetSuburb: string; targetPrice: number; targetDate: string }
  income: { monthlyNet: number; stability: string }
  expenses: { living: number; otherCommitments: number }
  savings: { availableDeposit: number; monthlyContribution: number }
  planHealth: PlanHealth
  lastActivity: string
}

export type Scenario = {
  id: string
  clientId: string
  name: string
  status: 'active' | 'draft'
  propertyPrice: number
  deposit: number
  interestRate: number
  loanTermYears: number
  repaymentType: 'principal_and_interest'
  createdAt: string
}

export type Alert = {
  id: string
  clientId: string
  severity: 'low' | 'medium' | 'high'
  category: string
  title: string
  explanation: string
  suggestedAction: string
  createdAt: string
}

export type Resource = { id: string; type: string; title: string; summary: string; reviewStatus: string }
