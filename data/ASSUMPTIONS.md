# Data and rules for the React MVP

This project should use `seed-data.json` as its local development data source. Every entity is invented; names and lenders are not intended to represent real people or products.

## Public reference points—not runtime product data

- The **RBA cash rate** can inform an educational market-context card, but it should not determine a displayed lender rate. The RBA publishes the cash-rate target and its decision schedule. [RBA cash rate target](https://www.rba.gov.au/cash-rate-target-overview.html)
- The demo includes a **3 percentage-point serviceability stress-rate** setting. APRA says ADIs must assess new borrowers at least 3 percentage points above the loan product rate. It is presented as an illustrative lender-assessment concept, not a credit decision. [APRA APG 223](https://www.apra.gov.au/practice-guides/apg-223)
- The Library may later contain a fact-checked explainer about the **First Home Super Saver scheme**. The ATO currently describes annual voluntary-contribution and total limits, eligibility and release steps. This content must be retrieved or reviewed before publishing because rules can change. [ATO FHSS guidance](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/early-access-to-super/first-home-super-saver-scheme/about-the-fhss-scheme)

## Deliberately excluded from MVP calculations

- Credit eligibility or approval decisions
- Real lender product comparisons or recommendations
- Government-grant, tax, stamp-duty and LMI calculations
- Bank account aggregation and real personal data

## Data model ready for React

The React app can load this JSON through a repository layer such as `src/services/demoRepository.ts`. It should calculate derived fields (loan, LVR, repayment, stress repayment and monthly buffer) client-side for the demo, then move these calculations to an audited server-side rules service before a production build.
