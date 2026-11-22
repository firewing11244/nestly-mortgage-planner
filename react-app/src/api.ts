import type { Alert, Client, Resource, Scenario } from './domain'

export type Rules = { comfortRatioTarget: number; highLvrThreshold: number; serviceabilityStressRateAddition: number; currency: string; assumptions: string[] }
export type ApiData = { clients: Client[]; scenarios: Scenario[]; alerts: Alert[]; resources: Resource[]; rules: Rules }

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...options })
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error ?? `Request failed (${response.status})`) }
  return response.json() as Promise<T>
}

export async function loadData(): Promise<ApiData> {
  const [clients, scenarios, alerts, resources, rules] = await Promise.all([request<Client[]>('/api/clients'), request<Scenario[]>('/api/scenarios'), request<Alert[]>('/api/alerts'), request<Resource[]>('/api/resources'), request<Rules>('/api/config/rules')])
  return { clients, scenarios, alerts, resources, rules }
}

export function createScenario(input: Pick<Scenario, 'clientId' | 'name' | 'propertyPrice' | 'deposit' | 'interestRate' | 'loanTermYears'>) { return request<Scenario>('/api/scenarios', { method: 'POST', body: JSON.stringify(input) }) }
