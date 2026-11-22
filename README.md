# Nestly — mortgage planning collaboration application

An original portfolio concept for an AI Product Engineer application. It demonstrates the kind of broker-and-client collaboration platform described in the role, while clearly not representing or copying an Arlee product.

## What it demonstrates

- A calm, decision-oriented client experience rather than a generic loan calculator.
- Live mortgage scenario modelling: price, deposit, rate, and term update repayment, LVR, affordability ratio, and cash buffer.
- A broker-ready collaboration flow: save scenario, share plan, adviser note, and a next-steps timeline.
- Product thinking in the interface: clear assumptions, useful guardrails, and plain-language interpretation.
- A React + TypeScript MVP with route-based screens, stateful scenarios and a REST API layer.
- An Express backend with validation and an in-memory repository seeded from safe fictional data.

## Run it

### React MVP (recommended)

```sh
cd react-app
npm install
npm run dev
```

Then visit `http://localhost:5174`. This starts both the React UI and Express API together.

Run a production-quality check with:

```sh
npm run build
```

### Original static concept

The original static prototype is retained for reference. From this folder run:

```sh
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Demo data

The Express API owns the fictional advisers, client households, scenarios, lender products, alerts, resources and calculation rules seeded from [`data/seed-data.json`](data/seed-data.json). See [`data/ASSUMPTIONS.md`](data/ASSUMPTIONS.md) for its scope and public reference points.

## API surface

The browser calls the Express API through Vite's `/api` proxy.

- `GET /api/health`
- `GET /api/clients` and `GET /api/clients/:clientId`
- `GET /api/scenarios` and `GET /api/clients/:clientId/scenarios`
- `POST /api/scenarios` — validates and creates a scenario in the demo repository
- `GET /api/alerts`, `GET /api/resources`, and `GET /api/config/rules`

The repository intentionally resets to the committed seed data on an API restart. In production, this API boundary would use authenticated database repositories and an audited calculation service.

## Suggested interview walkthrough (about 90 seconds)

1. Start with the client’s goal and explain that the plan makes trade-offs visible, rather than presenting one opaque borrowing number.
2. Move the property price and deposit sliders. Point out the live LVR, monthly payment, and affordability changes.
3. Explain the “comfort buffer” as a deliberately human metric: it protects the client from a plan that looks workable only on paper.
4. Save or share a scenario to show the collaboration model between adviser and client.
5. Close on how you would build the next iteration: verified lender rules, consented financial data, an auditable AI explanation layer, and security/privacy controls.

## Honest scope

This is a portfolio MVP using illustrative figures. It does not provide lending advice, retrieve bank data, or make credit decisions. The local backend is intentionally in-memory and has no authentication; it is not a production security model.
