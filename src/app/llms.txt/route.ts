import {
  BUSINESS,
  BUSINESS_HOURS,
  CREDENTIALS,
  EMERGENCY_SERVICE,
  PROFILES,
  REVIEW_RATINGS,
  SERVICE_AREA_TOWNS,
  SERVICE_CALL_FEE,
  WARRANTY_STATEMENT,
} from '@/lib/business';
import { BRANCHES, NJ_BOOKING_ENABLED, NJ_PATH } from '@/lib/branches';
import { cities } from '@/lib/cities';
import { posts } from '@/lib/posts';
import { services } from '@/lib/services';

// llms.txt is generated from the same records as the rendered pages and the
// structured data, so AI search tools can never read a figure the site itself
// does not state. Do not hand-edit a static copy in /public; it would shadow this route.
export const dynamic = 'force-static';

function render(): string {
  const url = BUSINESS.url;
  const lines: string[] = [];
  const add = (line = '') => lines.push(line);

  add(`# ${BUSINESS.name}`);
  add();
  add(
    `> Insured appliance repair company based in ${BUSINESS.address.addressLocality}, Connecticut. Same-day service when available, $${SERVICE_CALL_FEE} service call waived with repair, ${WARRANTY_STATEMENT}.`,
  );
  add();
  add(`- **Website:** ${url}`);
  add(`- **Phone (Connecticut):** ${BUSINESS.phone.display}`);
  if (NJ_BOOKING_ENABLED) add(`- **Phone (Bergen County, NJ):** ${BRANCHES.nj.phone}`);
  add(`- **Email:** ${BUSINESS.email}`);
  add(`- **Address:** ${BUSINESS.formattedAddress}`);
  add(`- **Hours:** ${BUSINESS_HOURS.display}, Eastern Time`);
  add(
    `- **Evening emergency line:** ${EMERGENCY_SERVICE.from}–${EMERGENCY_SERVICE.until} ET, 7 days a week. The emergency service call is $${EMERGENCY_SERVICE.fee} and covers the evening visit and diagnosis.`,
  );
  add(
    `- **Service call fee:** $${SERVICE_CALL_FEE}, covers the diagnostic and is waived when you proceed with the repair. The repair price is quoted in writing on-site before work begins.`,
  );
  add(`- **Warranty:** ${WARRANTY_STATEMENT} on every repair.`);
  add(
    `- **Credentials:** Fully insured (general liability). ${CREDENTIALS.map((c) => c.name).join(', ')}. Technicians are background-checked.`,
  );
  add(
    `- **Ratings (as of ${REVIEW_RATINGS.asOf}):** ${REVIEW_RATINGS.google.rating.toFixed(1)}/5 on Google from ${REVIEW_RATINGS.google.count}+ reviews; ${REVIEW_RATINGS.thumbtack.rating.toFixed(1)}/5 on Thumbtack from ${REVIEW_RATINGS.thumbtack.count}+ reviews.`,
  );
  add();

  add('## About');
  add();
  add(
    `${BUSINESS.name} repairs major household appliances across New Haven County and nearby Connecticut communities. Technicians carry OEM parts for the most common failures, so most repairs finish in one visit. Brands serviced include Samsung, LG, Whirlpool, GE, Maytag, Bosch, KitchenAid, Frigidaire, and Electrolux.`,
  );
  add();

  add('## Services');
  add();
  for (const service of services) {
    add(`- [${service.title}](${url}/services/${service.slug}) — ${service.description}`);
  }
  add();

  add('## Service Area (Connecticut)');
  add();
  add(`${SERVICE_AREA_TOWNS.join(', ')}.`);
  add();
  add('City pages:');
  add();
  for (const city of cities) {
    add(`- [Appliance Repair in ${city.name}, CT](${url}/${city.slug})`);
  }
  add();

  if (NJ_BOOKING_ENABLED) {
    add('## Bergen County, New Jersey');
    add();
    add(
      `A separate ${BRANCHES.nj.name} line (${BRANCHES.nj.phone}) takes repair requests from all 70 Bergen County municipalities. Same $${SERVICE_CALL_FEE} service call and ${WARRANTY_STATEMENT}. Details: ${url}${NJ_PATH}`,
    );
    add();
  }

  add('## Profiles');
  add();
  add(`- Google Business Profile: ${PROFILES.google}`);
  add(`- Yelp: ${PROFILES.yelp}`);
  add(`- Thumbtack: ${PROFILES.thumbtack}`);
  add(`- Facebook: ${PROFILES.facebook}`);
  add(`- Instagram: ${PROFILES.instagram}`);
  add();

  add('## Pages');
  add();
  add(`- [Home](${url})`);
  add(`- [Services](${url}/services)`);
  add(`- [About](${url}/about)`);
  add(`- [Book a repair](${url}/booking)`);
  add(`- [Blog](${url}/blog) — repair and maintenance guides written for Connecticut homes`);
  add(`- [Sitemap](${url}/sitemap.xml)`);
  add();

  add('## Recent Guides');
  add();
  const recent = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
  for (const post of recent) {
    add(`- [${post.title}](${url}/blog/${post.slug})`);
  }
  add();

  return lines.join('\n');
}

export function GET() {
  return new Response(render(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
