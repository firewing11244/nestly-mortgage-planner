import cors from 'cors'
import express from 'express'
import { readFileSync } from 'node:fs'

const seedPath = new URL('../../data/seed-data.json', import.meta.url)
const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
const app = express()
const port = Number(process.env.API_PORT ?? 8787)

// This in-memory store resets to the committed seed data when the API restarts.
// A production version would replace this boundary with a database repository.
const store = { clients: structuredClone(seed.clients), scenarios: structuredClone(seed.scenarios), alerts: structuredClone(seed.alerts), resources: structuredClone(seed.resources), rules: structuredClone(seed.rules) }

app.use(cors())
app.use(express.json())
app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'nestly-api' }))
app.get('/api/clients', (_request, response) => response.json(store.clients))
app.get('/api/clients/:clientId', (request, response) => { const client = store.clients.find((item) => item.id === request.params.clientId); return client ? response.json(client) : response.status(404).json({ error: 'Client not found' }) })
app.get('/api/clients/:clientId/scenarios', (request, response) => response.json(store.scenarios.filter((item) => item.clientId === request.params.clientId)))
app.get('/api/scenarios', (_request, response) => response.json(store.scenarios))
app.get('/api/alerts', (_request, response) => response.json(store.alerts))
app.get('/api/resources', (_request, response) => response.json(store.resources))
app.get('/api/config/rules', (_request, response) => response.json(store.rules))
app.post('/api/scenarios', (request, response) => {
  const { clientId, name, propertyPrice, deposit, interestRate, loanTermYears } = request.body ?? {}
  const clientExists = store.clients.some((client) => client.id === clientId)
  const validNumbers = [propertyPrice, deposit, interestRate, loanTermYears].every((value) => typeof value === 'number' && Number.isFinite(value))
  if (!clientExists || !name?.trim() || !validNumbers || propertyPrice <= deposit || interestRate <= 0 || loanTermYears <= 0) return response.status(400).json({ error: 'A valid client, name and positive scenario values are required.' })
  const scenario = { id: `scn_${crypto.randomUUID()}`, clientId, name: name.trim(), status: 'draft', propertyPrice, deposit, interestRate, loanTermYears, repaymentType: 'principal_and_interest', createdAt: new Date().toISOString() }
  store.scenarios.push(scenario)
  return response.status(201).json(scenario)
})
app.use((error, _request, response, _next) => { console.error(error); response.status(500).json({ error: 'Unexpected API error' }) })
app.listen(port, '127.0.0.1', () => console.log(`Nestly API listening at http://127.0.0.1:${port}`))
