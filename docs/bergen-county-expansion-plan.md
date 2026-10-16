# Bergen County expansion

Implementation on `nj-branch` — September 20, 2026. This branch has not been deployed to production.

## Confirmed operating details

- NJ phone: **(201) 403-0001**.
- Ready to accept requests from **all 70 Bergen County municipalities**.
- **$99 service call**, with the existing fee-waiver policy when proceeding with repair.
- Same dispatch inbox, Google Sheet, hours (**Mon–Sun 8am–6pm**), and **90-day parts and labor warranty** as CT.
- Repair prices are quoted by the technician after diagnosis; no fixed repair-price ranges were added.

## Implemented website scope

The county landing page is `/new-jersey/bergen-county`, with a dedicated booking page at `/new-jersey/bergen-county/booking`.

Ten initial town pages are nested under the county path: Hackensack, Teaneck, Fort Lee, Fair Lawn, Garfield, Englewood, Bergenfield, Paramus, Ridgewood, and Lodi. This is an editorial starting set, not a claim about search-volume rankings. Each has its own introduction, practical preparation advice, and local FAQ. All 70 municipalities remain selectable for booking; they do not need separate SEO pages.

Existing CT URLs, homepage hero, and canonical URLs are preserved. CT navigation and footer now link to New Jersey. NJ pages use the NJ number in navigation, calls to action, booking, and footer. Existing CT business structured data remains on CT pages; NJ pages provide their own business/service graph without inventing an address or NJ review history. NJ titles, social metadata, breadcrumbs, and sitemap entries are included.

## Booking and dispatch

Both the modal and inline forms route using the service ZIP code. NJ requests also require a Bergen municipality. Town-page booking buttons preselect the municipality, while appliance buttons preselect the appliance. Changing service region preserves entered repair details and updates the form’s contact number.

The API derives the branch from location and ignores a submitted branch ID. ZIPs are routing hints, not exact county boundaries: dispatch still confirms the actual address and available appointment. Requests from unsupported ZIPs are directed to call. Address suggestions use a branch-specific state filter and geographic bias; suggestions are not a service-coverage guarantee.

The existing dispatch environment variables are reused. No separate NJ inbox or credentials are required. Existing Google Sheet columns A:Q keep their order. New requests append these fields:

| Column | Header |
| --- | --- |
| R | Branch |
| S | Municipality |
| T | Source page |

Add those labels to the existing sheet’s header row when releasing, and check downstream tools that assume exactly 17 columns. The code writes values to R:T even before labels are added. No live sheet data or headers were changed during implementation.

Customer emails say **Request Received**, use the applicable branch phone, and leave appointment confirmation to dispatch. Source-page tracking stores only a relative path; URL query parameters are excluded. Customer-provided text is escaped for email HTML. Sheet writes use the append API so simultaneous submissions do not calculate the same row number.

## Verification

- Production build and TypeScript validation passed.
- Six focused routing/validation tests passed; run `npm run test:branches` without starting a browser or server.
- Generated HTML checked for all 12 NJ routes: correct canonical, NJ phone, indexability, and no inherited CT business schema.
- Desktop and mobile browser review completed. NJ modal, town preselection, inline-form branch switching, and preservation of repair details across region changes checked.
- No test request was submitted to the live dispatch inbox or Google Sheet. Delivery through the real email/Sheets integrations still needs a controlled release smoke test.

## Release and follow-up

1. Review the branch preview and set the R:T sheet header labels.
2. Deploy the reviewed branch through the normal Vercel workflow; verify the NJ number answers and run a clearly labeled controlled booking test.
3. Check `/sitemap.xml`, then inspect the county page and a small sample of town pages in Search Console. Indexing and rankings are not guaranteed by deployment.
4. Measure NJ calls, accepted requests, completed jobs, and town-page performance before adding more pages. Add real NJ photos, job examples, and reviews as they become available.

`NEXT_PUBLIC_NJ_BOOKING_ENABLED=false` pauses NJ online intake while preserving CT booking. Because this is a public build-time variable, **rebuild/redeploy** after changing it. The paused build also excludes NJ URLs from the sitemap and marks them noindex. County pages remain accessible and callers can still contact the team.

No Google Business Profile was created. A separate NJ profile should represent a qualifying real operation; no public street address is invented by this implementation.

## Reference sources

- [Bergen County municipality directory](https://bergencountynj.gov/municipalities/)
- [Google doorway and scaled-content policies](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse)
- [Google business representation guidelines](https://support.google.com/business/answer/3038177?hl=en)
- [Google service-area settings](https://support.google.com/business/answer/9157481?hl=en)
