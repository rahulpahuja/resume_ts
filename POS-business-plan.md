# Business Plan — Working title: **Khaata** (POS + Payments + Capital for Indian retail)

> A merchant operating system built on the ground Intuit abandoned. Rename freely — "Khaata" is a placeholder.

---

## 1. The one-line thesis

Intuit built a $16B business by turning accounting into a subscription and then bolting payments and lending on top. It tried the same in India and **quit** — no new QuickBooks signups after July 2022, product fully shut down by 30 April 2023. It left behind a market of 60M+ small businesses that it found too hard to serve. We rebuild the same money-machine model, but India-native from day one, and we own the *transaction* (POS) instead of the ledger (accounting).

---

## 2. Where Intuit failed (this is the whole opportunity)

Intuit's own exit reasons, and what each one tells us to do differently:

| Intuit's failure in India | Why it happened | What we do instead |
|---|---|---|
| **Localization cost > revenue** | Maintaining India-specific GST logic wasn't worth it for a US-first company | India is our *only* market. GST, e-invoicing, UPI are the core product, not a costly edge case |
| **GST changed too fast** | Their release cycle couldn't keep up with frequent GST rule changes | We ship GST/e-invoice updates as a live service; compliance-as-a-feature is our moat |
| **Lost to Tally & Zoho** | Local players were cheaper, faster, GST-native | We don't fight Tally on accounting. We sit *upstream* of it — at the point of sale |
| **Accounting-first, not transaction-first** | QuickBooks owned the books, never the checkout | We own the checkout. That's where the payments + lending money lives |
| **No embedded payments/lending in India** | Never localized the fintech layer (UPI is free, different rails) | Payments + merchant lending are the business model, not an add-on |

**The insight:** The world's best at this playbook *tried and left*. The playbook still works — it just needs an operator who treats India as the whole game, not a rounding error.

---

## 3. Market

- ~63M MSMEs in India; tens of millions are retail/kirana/restaurant/pharma counters.
- GST + e-invoicing mandates are pushing even small merchants onto digital billing (e-invoicing is mandatory above ₹5 Cr turnover and the threshold keeps dropping).
- UPI has already made *every* merchant a digital-transaction merchant — the rails are laid; nobody has monetized the software+capital layer on top well.
- Existing billing tools (Retail Daddy, Vyapar, Marg, Tally) largely sell *software licences*. Almost none capture payment flow + lending margin. That's the open lane.

**Beachhead:** pick ONE vertical + ONE city. Recommendation — **pharma/medical or grocery retail in Indore** (you know the ground, ListApp already mapped pharma B2B here). Vertical depth beats horizontal spread at the start.

---

## 4. Product — three layers, shipped in order

**Layer 1 — POS software (the wedge, near-zero margin).**
Fast GST billing, offline-first, barcode/thermal print, inventory, GSTR-1/3B export, vernacular UI. This is table stakes and must be *free or near-free* to win distribution. Its job is to acquire merchants and sit on the transaction, not to make money.

**Layer 2 — Payments (the data + daily cash flow).**
Integrate an existing aggregator (Razorpay / Cashfree / PhonePe) — **do not** build your own gateway (see §7). Accept UPI, cards, wallets, EMI right inside checkout. UPI margin is ~zero by regulation, so monetize the *value-added* layer: instant settlement, auto-reconciliation, card/EMI MDR spread. The real prize here is the **data** — you now see every rupee the merchant earns.

**Layer 3 — Capital (the profit engine).**
Merchant cash advances underwritten on the transaction data Layer 2 gives you. Repay via a small slice of daily sales flowing through the POS. Done via an **NBFC/bank co-lending partnership** first (they hold the licence + capital; you bring the merchant, data, and collection). This is where 20–30%+ effective yields live vs. fractions of a percent on payments.

---

## 5. Business model & unit economics

The stack: **POS gets the merchant → Payments gets the data + daily money flow → Lending monetizes the data at fat margin.** Same architecture as Square and QuickBooks Capital.

Illustrative per-merchant economics (conservative, tune to reality):

| Line | Assumption | Monthly value |
|---|---|---|
| POS subscription | ₹300–800/mo (or free at start) | ₹0–800 |
| Payments spread | 10–20 bps on ~₹4L/mo card+EMI volume | ₹400–800 |
| **Lending (the driver)** | 1 in 4 merchants takes ₹1.5L advance/yr; you keep ~8–12% of principal as your share | **₹1,000–1,500 blended/mo** |
| **Blended ARPU** | | **~₹1,500–3,000/mo** |

- **Low churn** — once billing, inventory, GST filing, settlement and a live loan all run through you, leaving is a nightmare. That stickiness is the entire flywheel.
- **LTV:CAC** — target 8–12:1 at scale (Intuit-class), which is only possible *because* lending, not software, carries the margin.
- **The trap to avoid:** trying to make money on the software. You won't. Software is customer acquisition; capital is the business.

---

## 6. Go-to-market

1. **Free POS, one vertical, one city.** Give the billing software away to pharma/grocery counters in Indore. Get to daily active usage — the transaction stream is the asset.
2. **Turn on payments** for active merchants once they trust the billing. Now you have cash-flow data.
3. **Offer capital** to the top ~25% by consistent flow. This is the moment ARPU 5–10x's.
4. **Land-and-expand** vertical by vertical, city by city, only after the loan book proves out in city one.

Distribution edge for you specifically: local ground game (you're in Indore, you've done B2B pharma via ListApp, you've sold to Manek/Aapki Pooja), plus your fintech (Bankwest/CBA) and security (CyberArk) depth to actually pass NBFC/PCI diligence — a wedge most billing-software founders can't clear.

---

## 7. Regulatory & the money question ("how much to set up payments")

Two paths, wildly different cost:

**Path A — Become your own Payment Aggregator (DON'T, not yet).** RBI PA licence needs **₹15 Cr net worth to apply, ₹25 Cr within 3 years, maintained permanently**, plus PCI-DSS, fit-and-proper, and RBI's cybersecurity framework. Multi-crore, multi-year, dedicated team. Wrong starting point.

**Path B — Ride an existing aggregator (DO THIS).** Integrate Razorpay/Cashfree as a partner/platform. **~₹0 upfront** for the rail. You earn the MDR spread + your VAS. This is how you start next month, not next decade.

**Lending, legally:** Start as a **Lending Service Provider / co-lending partner** with a licensed NBFC or bank — they hold the licence and capital, you bring merchant + data + collection, split the interest. Only pursue your **own NBFC licence** (min ₹10 Cr net worth for a new NBFC) once the co-lending book proves the model. This keeps you compliant *and* cheap in Phase 1.

---

## 8. Competition

- **Tally / Zoho Books** — accounting-first, sit *downstream* of us. Not payment or lending players. We integrate/export to them rather than fight them.
- **Vyapar / Marg / Retail Daddy** — billing-software-licence businesses. Strong distribution, weak on the payments+capital monetization. This is who we out-*model*, not out-feature.
- **PhonePe / Paytm / BharatPe** — the real competitive threat; they already own payments + are pushing merchant lending. Our defense is **vertical depth + owning the full billing/inventory workflow**, which they treat as generic. Beat them on being the merchant's *operating system*, not just their QR code.

Honest read: the payments-QR layer is commoditized and crowded. Your defensibility has to come from (a) owning the whole back-office workflow per vertical, and (b) the loan book's data compounding. Don't pick a fight on QR.

---

## 9. Phased roadmap

- **Phase 0 (0–3 mo):** Free GST POS, one vertical, Indore. Goal: 100–300 daily-active counters.
- **Phase 1 (3–9 mo):** Razorpay/Cashfree payments live. Goal: transaction data on 60%+ of active base.
- **Phase 2 (9–18 mo):** Co-lending pilot with one NBFC on top-quartile merchants. Goal: prove repayment + unit economics on a small book.
- **Phase 3 (18 mo+):** Expand verticals/cities; evaluate own NBFC licence once the book justifies it. PA licence only if scale genuinely demands it.

---

## 10. The risks I'd flag honestly

- **UPI zero-MDR** kills naive payment monetization — the whole plan leans on lending, so if the co-lending partnership or underwriting doesn't work, the model doesn't work. De-risk this *early*, in Phase 2, before scaling anything.
- **BharatPe/PhonePe** can out-spend you on payments. Don't compete there; win the workflow.
- **Collections risk** on merchant advances is real — the daily-sales-slice mechanic mitigates it but doesn't eliminate default. Start tiny, underwrite tight.
- **Focus.** This plan only works if you go deep in one vertical/city and resist widening — the failure mode is spreading thin before the loan book proves out.

---

## 11. The ask / what Phase 0 actually costs *you*

Phase 0 needs almost no capital — it needs a shipped POS and boots on the ground in Indore. You can build the billing app; the payments rail is a partner integration; the lending needs a partner, not your balance sheet. The expensive, licensed stuff (PA, NBFC) is deliberately deferred until the model is proven. **Your Phase 0 cost is time + one vertical's worth of merchant relationships — not crores.**
