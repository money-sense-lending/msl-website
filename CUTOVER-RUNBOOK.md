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

## The plan (Path B — move DNS to Cloudflare) — UPDATED 2026-07-08 after BizIT reply

CONFIRMED: BizIT manages the domain in their Synergy Wholesale partner console. They cannot delegate access but WILL action emailed change requests. Domain expires 11 Apr 2027, auto-renew ON. So the cutover = one emailed nameserver-change request to BizIT.

1. **[Dougal, ~5 min, guided]** dash.cloudflare.com → Add a domain → mslending.au → Free plan. Cloudflare auto-imports DNS records and assigns TWO nameservers (note them down).
2. **[Claude]** Verify the imported records against the snapshot above via API (esp. the 5 email records); supply exact values for any gaps for Dougal to add in the dash.
3. **[Dougal, 2 clicks / Claude via API]** Attach mslending.au + www as custom domains on the msl-website Pages project (Workers & Pages → msl-website → Custom domains). Cloudflare auto-creates the website DNS records.
4. **[Dougal → BizIT]** Email BizIT requesting the nameserver change to the two Cloudflare nameservers (Claude drafts it). THIS IS THE CUTOVER MOMENT.
5. **[Claude]** Monitor propagation; verify site + SSL on mslending.au; verify MX/SPF/DKIM/DMARC identical; send/receive test email.
6. Watch 3–4 weeks (bot tracks rankings) → cancel Broker Studio website sub. Domain/renewals stay with BizIT (fine).

## Rollback (if ever needed)
Change nameservers back to ns1/2/3.nameserver.net.au → old site + old DNS restored within minutes-to-hours. Nothing is deleted at any step.

## Email to send Broker Studio (step 1)
See chat / below. Key ask: registrar confirmation + access or actioned nameserver change.
