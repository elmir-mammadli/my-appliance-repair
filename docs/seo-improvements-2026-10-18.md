# SEO and repair-service improvements — October 18, 2026

The supplied article, *How to Create an Effective Landing Page for Appliance Repair Services*, is useful as a conversion checklist. This project already has the landing page, service pages, local coverage, booking, reviews, and a sitemap. The work below applies its measurement, content, trust, and local-search recommendations to the existing site.

## Implemented in the project

| Area | Change | Purpose |
| --- | --- | --- |
| Lead measurement | Successful API responses generate `generate_lead` from both repair forms. Failed requests generate a separate error event. | Measure received inquiries rather than treating a button press as a booking. |
| Booking funnel | Track modal opens, the first form edit, and successful completion of the contact-check step. | Locate abandonment between interest, contact entry, and a received request. |
| Phone intent | Track clicks on the published CT and NJ phone links, attributed to the number's branch. | Compare call intent with online inquiries. A click does not establish a connected or qualified call. |
| Consent reliability | Restore consent before the initial GA configuration, tolerate unavailable browser storage, and suppress custom conversion events unless analytics consent is granted. | Fix the previous race between consent restoration and tag initialization. |
| Event data | Send fixed form/appliance/branch categories and the page path. Exclude names, customer phone numbers, addresses, ZIPs, emails, issue descriptions, and query strings from these custom event parameters. | Keep operational customer information out of conversion payloads. |
| Service search previews | Shorter service titles, diagnostic pricing in descriptions, appliance-specific Twitter cards, and a descriptive specialty-appliance title. | Match the service a searcher needs and clarify the offer. |
| Structured data | Give each service a stable ID and URL linked to the business identity. Remove the five repeated top-level service records from every CT footer; retain the business's service catalog. Fix the specialty-service catalog URL. | Make the service graph consistent without duplicate, competing descriptions. |
| Service guidance | Add a before-booking question for every service and repair-versus-replacement guidance. Correct model-specific and overly certain diagnostic claims. | Help homeowners describe symptoms and decide whether to request a visit. |
| Availability | Share one answer across homepage visible FAQ, its matching schema, and service FAQs. Use the existing branch hours as the shared hours source. | Remove conflicting promises of guaranteed afternoon dispatch and 24/7 attendance from those answers. |
| Editorial reliability | Substantially revise the dryer-heating and gas-burner guides with manufacturer references, correct diagnostic limits, and relevant service links. Preserve their original URLs and publication dates. | Replace inaccurate repair instructions and unsupported failure statistics with useful guidance. |
| Article headings | Omit a repeated leading body headline when the article template already supplies the main heading. Seven existing articles contained this duplication. | Present one main article heading and retain the section hierarchy. |
| Content dates | Add optional `updatedAt`, a visible updated date, article modification metadata, and sitemap `lastmod` only for the two substantively revised articles. RSS uses the latest actual content date. | Reflect real edits rather than refreshing every page on deployment. |
| Mobile reading | Remove the fixed height cap on expanded service FAQ answers. | Keep longer answers readable on narrow screens. |

The homepage hero and overall page design were preserved. The pre-existing spacing edits in `BergenPage.tsx` were also preserved.

## GA4 setup after deployment

The existing measurement ID remains `G-JKQBNGF2P9`. No new marketing vendor or ad account was added.

| Event | Trigger | How to interpret it |
| --- | --- | --- |
| `booking_open` | A repair modal is opened. | Interest only. |
| `form_start` | First edit in a repair form; once per attempt. | Entry into the form funnel. |
| `booking_step_complete` | Valid contact/coverage check advances to step 2; once per attempt. | A visitor reached repair details. This is not an address-coverage guarantee. |
| `booking_submit_error` | The repair request fails. | A delivery problem, not a received inquiry. No error text or customer details are sent. |
| `generate_lead` | `/api/book` returns a successful response. | A received repair request, not an appointment confirmation, completed job, or payment. |
| `click_to_call` | A published branch phone link is clicked. | Call intent, not proof a call connected. |

1. In the GA4 property, mark `generate_lead` as a key event. Keep `click_to_call` separate so online inquiries and call clicks are not reported as the same outcome.
2. Create event-scoped custom dimensions for `branch_id`, `form_id`, `form_variant`, and `appliance_type` if those breakdowns are needed in reports. `page_path` identifies the originating page. Branch attribution on the completed form follows the service ZIP, which can differ from the page's region.
3. Review Enhanced Measurement → Form interactions. Turn automatic form-interaction measurement off when using this explicit funnel, to avoid a second automatic `form_start` and misleading `form_submit` counts. See [Google's Enhanced Measurement documentation](https://support.google.com/analytics/answer/9216061?hl=en).
4. Use Realtime or DebugView with analytics consent accepted to verify each event after deployment. Test one successful request and one failed request in a staging environment. Browser tests mock dispatch; they do not prove production GA ingestion or email delivery.
5. Build a funnel by landing page and branch: form start → contact step complete → `generate_lead`. The inline contact form has no separate contact-check step, so compare it using start → lead. Compare phone clicks separately. Consented visitors and visitors without blockers form a subset of total customers.
6. Do not assign the $99 diagnostic fee as lead revenue. Track qualified inquiries, confirmed appointments, completed jobs, and actual revenue in the booking/operations system before calculating return on ad spend.

Reference: [Google's recommended lead event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead) and [consent implementation guidance](https://developers.google.com/tag-platform/security/guides/consent).

## Local-search work that requires account access or business evidence

These are operational next steps; this repository change does not publish Google Business Profile edits, directory listings, indexing requests, or ads.

1. **Verify the real Business Profile details.** Compare the business identity and branch phones with `src/lib/business.ts` and `src/lib/branches.ts`. The shared hours now reflect the existing branch records: Monday–Sunday, 8am–6pm. Confirm these against actual staffed hours and reconcile the requested evening window separately; a preferred window is not a confirmed appointment. Check holiday hours and emergency availability in the profile.
2. **Represent the service business accurately.** Review the profile's available category choices against the actual appliance-repair service. List only areas the team serves. A service-area business that does not receive customers at its address should hide that address on Google. A city service page is not evidence of a staffed office; create an additional branch profile only when eligible. Follow [Google's business representation guidelines](https://support.google.com/business/answer/3038177?hl=en).
3. **Use the matching regional destination.** The CT profile's website can use `https://www.myappliance.us/?utm_source=google&utm_medium=organic&utm_campaign=business_profile_ct`; use `/booking` with the same parameters for an appointment link where supported. An eligible Bergen profile should use `/new-jersey/bergen-county` and its `/booking` route with `business_profile_nj`. These are account-edit examples, not new URLs to add to the sitemap. GA handles acquisition attribution; the custom conversion payload strips query strings.
4. **Reconcile existing citations.** Check the actual Google, Yelp, Thumbtack, and relevant local-directory listings. Correct contradictory business names, branch numbers, coverage, and hours. Use real locations and a consistent identity; the project does not substantiate a new storefront in every service town.
5. **Collect genuine proof from completed jobs.** With customer permission, use original repair photos and concise records: appliance model, symptom, diagnostic finding, repair, and outcome. Remove names, addresses, serial numbers, and other private details from public examples. Have a technician verify each example. Request honest reviews without incentives or review gating. Google describes local ranking in terms of relevance, distance, and prominence in its [local-ranking guidance](https://support.google.com/business/answer/7091?hl=en).
6. **Review remaining historical claims.** Existing city narratives, About statistics, older blog anecdotes, and static review badges still need source records. The home hero badge was intentionally preserved; the earlier audit records why it may differ from other counts. Do not invent new case studies, credentials, manufacturer authorization, or repair statistics.

## Search intent and destination map

| Searcher need | Existing destination | Next useful evidence |
| --- | --- | --- |
| Washer / washing machine not spinning or draining | `/services/washer-repair` | Verified diagnostic example, model information. |
| Dryer no heat / taking too long | `/services/dryer-repair` | Actual airflow and component diagnosis, original repair image. |
| Refrigerator warm / ice maker not working | `/services/refrigerator-repair` | Verified cooling or water-supply case, model-specific limitations. |
| Dishwasher not draining / not cleaning | `/services/dishwasher-repair` | Verified drainage or circulation example. |
| Gas stove, oven, or range heating fault | `/services/oven-range-repair` | Technician-reviewed ignition or bake-circuit example. |
| Freezer, microwave, ice maker, or cooktop service | `/services/more-appliances` | Confirm supported models and economic repair limits. |
| Appliance repair in Hamden or New Haven | Existing `/hamden` and `/new-haven` pages | Genuine local job evidence, consistent CT contact details. |
| Bergen County appliance repair | `/new-jersey/bergen-county` and existing town pages | Confirm NJ service availability, regional phone, and genuine local evidence. |

Keep these destinations stable. Improve their substance before adding more near-identical appliance × brand × town pages. An actual new service can justify its own page when there is enough distinct, verified information to answer a customer's questions.

## Search Console and performance measurement

After deployment, validate the service pages and both revised articles with URL Inspection and Rich Results Test. Confirm the canonical, a successful fetch, and whether the page can be indexed. Submit the existing `/sitemap.xml` if needed and request recrawling of a small number of materially changed priority URLs. Keep a dated record of the inspected URL, last crawl, indexing state, and Google-selected canonical. These checks do not guarantee indexing.

Compare organic impressions, clicks, relevant queries, and received/qualified inquiries over comparable periods, split by service and region. The files under `latest-google-performance` cover May 24–June 6, 2026; they are historical evidence, despite the folder name. They cannot describe October performance. Obtain a current Search Console export before making ranking or traffic claims.

Measure mobile Core Web Vitals using field data where available and a reproducible performance run for changed routes. Passing browser layout tests is not a Core Web Vitals measurement. Avoid adding heavy review, video, map, or heatmap scripts without measuring their effect. Existing images already use Next.js optimization.

Google can use a consistently accurate `lastmod`; it does not use sitemap `priority` or `changefreq` to set rankings or crawl schedules. Those existing fields were retained for compatibility, without treating them as a growth tactic. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Paid traffic and experiments

Once lead tracking is verified in the account, map each ad group to its matching service page and actual coverage. Show the $99 diagnostic policy accurately and qualify same-day availability. Separate CT and Bergen campaigns and call destinations. Base spend decisions on qualified inquiries and completed jobs; no campaign was launched by this change.

Review irrelevant-query negatives using real search terms, particularly jobs, parts-only shopping, TV repair, pressure washers, and unsupported appliance models. Some of these appeared in the historical export; confirm they remain irrelevant before adding exclusions. Test one meaningful variable at a time when traffic supports it, such as service-specific CTA wording or an actual verified job example. Keep the experiment's success metric tied to received and qualified inquiries rather than button clicks alone.

## Guidance applied selectively

The article's suggestions about profile embeds, keyword repetition, dwell time, urgency, and rich results are not guarantees of better rankings. Relevant, reliable content and accurate business claims are the priorities. FAQs remain useful customer content; they are not a promise of enhanced search presentation. Own-business review markup does not make the site eligible for self-serving review stars. See [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [review snippet rules](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

## Verification

Run `npm run build`, `npm run test:branches`, and `npm run test:seo`. The SEO/conversion tests use mocked booking, address, and third-party requests and cover desktop and mobile. Use `PLAYWRIGHT_CHANNEL=chrome npm run test:seo` if a local Chrome installation is used instead of Playwright's downloaded Chromium. The tests use port 3100 and do not reuse the development server.

Final results: production build and TypeScript passed; all six branch-routing tests and all 16 desktop/mobile SEO-conversion tests passed; focused ESLint checks and `git diff --check` passed. The final browser run used isolated Playwright Chromium from a temporary directory. All 79 sitemap HTML pages had one matching canonical, allowed indexing, unique titles, and parseable JSON-LD. All 37 article pages had one main heading. Only the two revised articles received a sitemap modification date. The homepage retains its existing separate mobile/desktop hero headings.

These checks used the local production build. Production deployment, GA4 ingestion, live email/Sheets delivery, Google indexing, profile accuracy, and field Core Web Vitals were not validated by this run.
