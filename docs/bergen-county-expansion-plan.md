# Bergen County expansion plan

Draft — September 20, 2026. Planning only; NJ phone number, operating model, coverage, launch date, pricing, hours, and dispatch ownership still need confirmation.

## Recommended direction

Keep one website, myappliance.us, with distinct Connecticut and Bergen County experiences. Add NJ under `/new-jersey/bergen-county/`. Preserve existing CT URLs, canonical URLs, and the current homepage hero during the first release. Add clear navigation to the new branch. A future brand-wide homepage is a separate decision after establishing an NJ presence and taking a fresh Search Console baseline.

This is an implementation recommendation, not a guarantee of indexing or rankings. The September 17 Search Console screenshots are historical; export fresh data before launch.

## What the repository currently does

| Area | Finding | Required change |
| --- | --- | --- |
| Business data | `src/lib/business.ts` has one CT city list, pricing policy, and review totals. Phone numbers are repeated across components. | Central branch records for CT and NJ, including operational status, phone, coverage, services, hours, fees, warranty, review links, and dispatch settings. |
| Booking | `BookingForm.tsx` and `ContactForm.tsx` reject non-CT ZIPs through `isCtZip`. | Both forms must support approved coverage, display the applicable branch, and preserve details when switching. |
| Address suggestions | `/api/places` biases to CT and filters out other states. | Use the selected branch to bias suggestions; validate the actual service address separately. |
| Lead delivery | `/api/book` uses one sheet/tab and notification recipient. Rows have no branch field. Customer emails contain CT phone and area text. | Validate coverage on the server, resolve the receiving branch, label/store branch and landing page, route notifications, and use the correct contact details in customer emails. |
| Booking status | Email subject currently says “Booking Confirmed.” The form collects preferred times without checking a dispatch calendar. | Use request-received wording unless dispatch actually confirms a slot. |
| SEO | Root layout injects CT business/service structured data site-wide; inherited metadata is CT-focused. | Keep shared brand data global and place branch/service data on the appropriate pages; override NJ metadata and social previews. |
| Coverage | Maps, city pages, and footer lists describe CT. | Separate branch coverage views based on confirmed towns; no automatic claim of statewide NJ coverage. |

## Decisions needed from the owner

- NJ phone number, who answers it, and missed-call handling.
- Real operating base, separate NJ team, and whether customers can visit the location.
- Opening date; whether any prelaunch inquiries should be accepted and who handles them.
- Launch towns, exclusions, service boundaries, and verified ZIP/address coverage.
- NJ service call fee, waiver policy, warranty, working hours, appointment windows, and appliances supported. Do not assume the CT $99 policy applies.
- Shared or separate dispatch recipients and job queue; whether existing spreadsheet users/automations depend on current columns.
- NJ photos, technician/team details, and eventual NJ Google review URL. Existing CT reviews can be used only with clear attribution to their actual source/branch.

## Website and phone behavior

| Visitor context | Proposed behavior |
| --- | --- |
| Existing CT page | CT number, CT coverage, and CT booking defaults remain consistent. |
| NJ branch or NJ town page | NJ number in header, page calls to action, mobile call control, booking sidebar, footer contact, and confirmation messages. |
| Homepage | Retain its current CT content for launch; add a clearly labeled Bergen County link and a compact location switcher outside the hero. |
| Shared booking entry | Ask for service location/ZIP, identify the eligible branch, and let the customer confirm it. |
| Customer changes region | Navigate to that region's real URL and preserve entered booking details; do not overwrite a CT page's contact identity based only on a remembered preference. |
| Unsupported or ambiguous address | Explain that coverage needs confirmation; do not claim availability or silently route to the wrong branch. |

Use explicit URLs and user choice. Do not rely on IP location to redirect customers or make NJ content discoverable. A saved preference can help on neutral entry points, but the page URL controls its branch identity. The booking API must independently validate the service location; a browser-supplied branch ID alone is insufficient.

ZIP codes are useful initial routing signals, not exact county boundaries. Use a maintained list and address/town confirmation for boundary cases. Accepting every NJ ZIP would overstate Bergen County coverage.

## Initial page scope

1. `/new-jersey/bergen-county/`: the main NJ landing page, with the local phone, confirmed towns, actual services, service call policy, hours, team information, and usable booking flow.
2. A small number of useful town pages under `/new-jersey/bergen-county/[town]/`, only where coverage and distinct local information are ready. Town-page quantity follows useful content and operational priorities.
3. Add selected NJ appliance-service pages later if they answer a distinct customer need; do not launch every town × appliance combination.

Use descriptive titles, self-canonicals for distinct NJ pages, crawlable links, breadcrumbs, and sitemap inclusion at launch. Keep CT links/URLs working. A genuine NJ page should not canonicalize to a CT page. State-level `hreflang` is not needed for these English US pages.

Useful NJ content includes real service availability, actual coverage limitations, branch contact details, technician introductions, supported appliances, clear pricing policy, and local job examples once available. Do not invent NJ jobs or present CT review totals as reviews earned by the new branch.

Google's doorway and scaled-content guidance supports building useful regional pages rather than repeating town names across near-identical pages: [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).

## Google Business Profile and branch identity

If the NJ operation qualifies as a distinct location with separate staff and service area, create its own Business Profile, with the NJ phone and NJ landing page. A new phone number or service-area page alone does not establish eligibility. Retain the existing CT profile.

For a service-area operation that does not receive customers at its address, hide the address on the profile. Use the real operating location for verification; a virtual mailing address is not a substitute. Google currently permits up to 20 service-area entries, so the profile's coverage list should be selected from the actual operating area rather than copied from an unlimited website list.

Sources: [Business representation guidelines](https://support.google.com/business/answer/3038177?hl=en), [Service-area settings](https://support.google.com/business/answer/9157481?hl=en).

Use stable identifiers for the shared organization and each actual branch in structured data. Reference the relevant branch from its services, with matching visible phone, area, and hours. Do not invent a public address merely to qualify for a Google enhancement; validate against [Google's LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Delivery sequence

### 1. Confirm operating details and capture the baseline

Complete the owner decisions above. Export current CT indexing, landing-page traffic, and conversions. Establish a launch checklist and the NJ dispatch owner.

### 2. Introduce branch support with CT behavior preserved

Centralize branch data and phone rendering; update both booking forms, address suggestions, backend validation, spreadsheet fields, notification routing, and email templates. Append fields or migrate carefully so existing spreadsheet columns and workflows keep working. Keep NJ unavailable publicly until its details and routing are ready.

### 3. Build and review NJ content in preview

Build the Bergen County page, region navigation, coverage map, and branch-specific metadata/schema. Review on mobile and desktop. Preview pages should remain out of the production sitemap and search index until ready. No NJ page should accidentally inherit CT-only metadata or present a CT service as the NJ provider.

### 4. Launch and verify

Enable NJ coverage only when the phone, dispatch, and service start date are ready. Publish the branch page, add internal links and sitemap entries, and inspect priority URLs in Search Console. Verify the eligible NJ Business Profile and link it to the branch page. Indexing requests are optional signals, not guarantees; no need to repeatedly request every URL.

### 5. Measure and expand

Report phone-link clicks, booking submissions, accepted leads, and completed jobs separately by branch. Track source page/campaign without sending customer contact details to analytics. Review actual towns generating jobs, call quality, indexing, and conversion before expanding content. Gather NJ-specific photos and reviews as real jobs are completed.

## Launch acceptance checks

- Every CT entry point still shows the expected CT phone and coverage.
- Every NJ entry point shows the confirmed NJ phone, including mobile and error/success states.
- Modal and inline booking both route valid CT and NJ requests correctly; unsupported and boundary addresses have deliberate behavior.
- Notification recipient, job record, and customer email agree on branch and contact number.
- Server-side checks prevent an incorrect client branch from misrouting a request.
- Testing uses a test recipient/queue so preview requests do not create real appointments or customer messages.
- Region selection and switching work on mobile without losing form details.
- Published NJ pages return 200, allow indexing, have correct canonicals, are internally linked, and appear in the sitemap.
- Structured data and metadata do not conflict with visible branch information.
- Review totals and links are accurately attributed; new-branch reviews are not fabricated or borrowed as branch totals.
- A rollout can disable NJ intake without breaking CT booking or changing existing CT URLs.

## First implementation milestone

Make the site's business data, phone components, and booking pipeline support two branches while CT remains the only active branch. Then activate the Bergen County experience with confirmed operational details. This foundation should precede a large batch of NJ pages.
