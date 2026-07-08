# mslending.au — Domain Cutover Runbook

Goal: point mslending.au at the new Cloudflare Pages site (msl-website.pages.dev), with ZERO email disruption and instant rollback. Broker Studio stays live as fallback until we cancel (3–4 weeks after cutover).

## DNS snapshot — taken 2026-07-06 (the source of truth)

**Website records (the ONLY ones we change):**
| Host | Type | Value | Meaning |
|---|---|---|---|
| `@` (mslending.au) | A | `54.206.196.166` | Broker Studio's server |
| `www` | CNAME | `mslending.au` | follows the apex |

**Email + auth records (replicate EXACTLY, never touch):**
| Host | Type | Value |
|---|---|---|
| `@` | MX 1 | `mslending-au.mail.protection.outlook.com` |
| `@` | TXT | `v=spf1 include:_spf.mslending_au._d.easydmarc.pro -all` |
| `_dmarc` | TXT | `v=DMARC1;p=reject;pct=100;rua=mailto:8d8389168c@rua.easydmarc.com;ruf=mailto:8d8389168c@ruf.easydmarc.com;ri=86400;fo=1;` |
| `selector1._domainkey` | CNAME | `selector1-mslending-au._domainkey.moneysenselending.onmicrosoft.com` |
| `selector2._domainkey` | CNAME | `selector2-mslending-au._domainkey.moneysenselending.onmicrosoft.com` |

(M365 tenant: moneysenselending.onmicrosoft.com. No autodiscover/SRV records present. Note: also has a stray empty TXT on `_dmarc` — ignore.)

**Current DNS host:** ns1/2/3.nameserver.net.au (Synergy Wholesale — via Broker Studio).

## The plan (Path B — move DNS to Cloudflare; recommended)

Why: Cloudflare Pages needs the apex domain on Cloudflare DNS (CNAME flattening). Also gives us permanent, direct control — no more asking Broker Studio for DNS changes, ever.

1. **[Dougal → Broker Studio]** Send the access email (below). We need EITHER registrar/DNS access OR them to action a nameserver change on request.
2. **[Dougal, 5 min, guided]** Add `mslending.au` as a free site in the Cloudflare account (dash.cloudflare.com → Add a domain). Cloudflare auto-imports records — we VERIFY against the snapshot above and fix any gaps (esp. the 5 email records).
3. **[Claude]** In the Cloudflare zone: add website records pointing at Pages (`@` and `www` → msl-website.pages.dev custom domain), attach the custom domain to the Pages project.
4. **[Broker Studio or Dougal at registrar]** Change nameservers to the two Cloudflare-assigned ones. This is THE cutover moment.
5. **[Claude]** Verify: site loads on mslending.au, SSL active, then immediately test email (send in + out), verify MX/SPF/DKIM/DMARC resolve identically.
6. **Watch 3–4 weeks** (bot tracks rankings) → then cancel Broker Studio website sub. Keep the domain registration paid wherever it lives.

## Rollback (if ever needed)
Change nameservers back to ns1/2/3.nameserver.net.au → old site + old DNS restored within minutes-to-hours. Nothing is deleted at any step.

## Email to send Broker Studio (step 1)
See chat / below. Key ask: registrar confirmation + access or actioned nameserver change.
