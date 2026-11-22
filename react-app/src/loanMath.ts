import type { Client, Scenario } from './domain'

export const money = (value: number, compact = false) => compact
  ? `$${Math.round(value / 1000)}k`
  : new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value)

export function monthlyRepayment(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12
  const periods = years * 12
  if (monthlyRate === 0) return principal / periods
  return principal * (monthlyRate * (1 + monthlyRate) ** periods) / ((1 + monthlyRate) ** periods - 1)
}

export function derivePlan(client: Client, scenario: Scenario, stressAddition = 3) {
  const loan = Math.max(0, scenario.propertyPrice - scenario.deposit)
  const repayment = monthlyRepayment(loan, scenario.interestRate, scenario.loanTermYears)
  const stressRepayment = monthlyRepayment(loan, scenario.interestRate + stressAddition, scenario.loanTermYears)
  const monthlyBuffer = client.income.monthlyNet - client.expenses.living - client.expenses.otherCommitments - repayment
  const lvr = scenario.propertyPrice ? loan / scenario.propertyPrice : 0
  const repaymentRatio = client.income.monthlyNet ? repayment / client.income.monthlyNet : 0
  return { loan, repayment, stressRepayment, monthlyBuffer, lvr, repaymentRatio }
}
