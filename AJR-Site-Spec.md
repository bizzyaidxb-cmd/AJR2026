# AJR — Website & Portal Specification v1.0
*Source: FigJam site-architecture board + product decisions (Aug 2026). Supersedes flow gaps in the board.*

---

## 1. Product principles
- Registration is **free**. Fundraising is driven by leaderboard pride between clubs, riders, and cities — you can ride without raising, but you're invisible on the boards.
- Money can come from three sources: **solo riders' pages, clubs' pages, and plain donors** (standalone donate, no account).
- Every city host sets a **fundraising target** for their city; totals roll up from all sources in that city.
- **Ride dates are set per state**: every city in a state rides on the same date (e.g., Palakkad and Kochi share Kerala's date). Different states may ride on different dates.

## 2. Roles
| Role | Can do |
|---|---|
| Visitor / donor | Browse, donate (no account), share |
| Solo rider | Register, profile + personal fundraising page, join a ride |
| Club member | Rider + belongs to a club, counts toward club total |
| Club admin | Manage club page, approve join requests, invite members, add co-admins |
| City host (ride admin) | Set city target, manage ride details, start/end ride, add event mgmt team |
| Event mgmt team | Assist host on ride-day operations |
| Super admin | Approve clubs + host applications, all content, all reports |

## 3. Auth *(revised per stakeholder feedback, Aug 2026)*
- Signup: **phone verified via OTP** (single channel). Email collected but not verified at signup.
- **Password created at signup** (min 8 chars), set together with T&C acceptance.
- Login: phone or email + password. OTP reserved for phone verification and password reset.

## 4. Rider registration flow *(revised per stakeholder feedback, Aug 2026 — friction minimized)*
1. **Select city** (shows the state's shared ride date).
2. **Basic info:** first name, second name, email, phone — nothing else.
3. **Verify phone** (OTP).
4. **Create password + accept T&C** (scroll-gated full terms incl. indemnity).
5. → **Straight to rider profile page**, with a first-visit tutorial (rider card, ride, clubs, fundraising).
6. **Deferred to "complete your rider card" before ride day:** emergency contact (name/relation/phone), bike maker + model, blood group (optional), Instagram ID, photo. Reminder nudges intensify as ride day approaches; incomplete rider cards can be required for ride-day check-in.
7. **Club joining moves post-signup:** from the profile page — join a club (admin approval) or create one (AJR approval). Not part of registration.
8. **City binding:** locked to one city until that city's ride completes; **60-day window** after to change location; emergencies via admin.

## 5. Clubs
- Create club: name, year of formation, logo, banner, primary admin (creator default, more can be added).
- **Club invitation link** (keyed to email ID) pre-fills member registration.
- **Super admin approves every new club**; name-similarity check flags duplicates before approval.
- Club page: leaderboard of members, amount raised, donation CTA, share CTA, link to city page.
- **Membership: one club at a time.** Leaving = self-removal (club admin is alerted); the rider reverts to a solo profile and must go through the normal join/approval process to enter another club. Funds raised while in a club stay attributed to that club's historical totals.

## 6. Donations
- **Standalone Donate page** — public, from the nav. No account, but donor must provide **name, email, and phone** (for receipt + payment verification).
- **Anonymity option:** every donor — standalone or via rider/club/city pages — can choose to appear as **"Anonymous"** on all public surfaces (leaderboards, top-donor lists, profile pages). Name/contact still stored internally for receipts, reconciliation, and legal compliance; never displayed.
- Donate CTAs on rider, club, and city pages credit that entity.
- Attribution: rider donations show on rider's page; club totals surface top donors within the club; city total = solo riders + clubs + direct donors of that city.
- Gateway: **Razorpay**. After payment: confirmation email (ours) + Razorpay receipt; donation appears on the donor-facing entity page and the rider's profile.
- 80G receipts: parked pending stakeholder answer (Questionnaire §1).

## 7. Leaderboard (common page)
Tabs: **All · Top clubs · Top individuals · Top cities.**
- Club rows expandable to show top donors/members inside.
- Fundraising level indicator (badge tiers) on rider and club profiles.
- **Time scope: all-time by default**, with a ride/edition filter — all rides selected initially; user deselects the rides they want excluded. Totals recompute live.

## 8. City page
- Funds raised **vs host-set target** (public progress).
- Total riders, total clubs, ride date.
- **Start point + route map, schedule of the day (assembly → flag-off → tribute → end), capacity + registered count (Almost full / Full), host profile + contact.**
- State-specific theming (per board note). Galleries: deferred — replaced by Instagram social fetch from riders' handles.

## 9. Ride host flow (per board, confirmed)
1. "Become a ride host" → choose city (Tier 1/2 list; can apply even if host exists).
2. Extended registration (address, pincode, state, city).
3. Application: q1–q10 long-form answers → **super admin approval**.
4. Rejected → email. Approved → email with **Calendly link**.
5. Login again → T&C → **video orientation (n videos) → quiz** (fail loops back to videos).
6. Pass → add event management team members.
7. **Ride Admin panel:** set venue/date/time, set city fundraising target, start ride / end ride, view city page.

## 10. Notifications
All four channels: **WhatsApp (Business API), email, SMS, and on-site** (profile dashboard).
- OTP: SMS + email.
- Approvals (club join, club creation, host application): WhatsApp + email + on-site.
- Ride-day reminders: WhatsApp + SMS.

## 11. Admin portal (super admin)
- Queues: club approvals (with dedup warnings), host applications (q1–q10 review).
- Cities & rides: create city, assign host, override ride details.
- Finance: donations by city/club/rider/day, Razorpay reconciliation, Excel export.
- Content: homepage stats, stories, T&C/waiver versions.
- Comms: broadcast to riders segmented by city/club.
- Read-only stakeholder/Foundation access for fund verification.

## 12. Data model (core entities)
`User` (auth, contact, address) · `RiderProfile` (bike, emergency contact, blood group, insta, level) · `Club` (info, status, admins) · `ClubMembership` (status: invited/pending/approved) · `ClubInvitation` (email-keyed link) · `State` (ride date, theme) · `City` (state, host, target) · `Ride` (venue, route, schedule, capacity, state: draft/live/started/ended) · `Donation` (amount, donor name/email/phone, `is_anonymous` flag, source page, attributed entity, Razorpay ref) · `HostApplication` (answers, status) · `OrientationProgress` (videos watched, quiz attempts) · `Notification` (channel, status).

## 13. Open items (for stakeholder answers)
- Legal entity + 80G → receipt automation (§6).
- Refund policy (donations are typically non-refundable — confirm).
- Instagram fetch: official API requires rider consent per handle — confirm approach.
- DPDP: emergency-contact data is third-party personal data; retention policy needed.

## 14. Build order
1. Auth (OTP) + rider registration + profile.
2. Donate (standalone + rider/club pages) with Razorpay.
3. City pages + leaderboard.
4. Clubs (create/join/invite + approval queue).
5. Host application + orientation + Ride Admin.
6. Super admin portal + comms.
