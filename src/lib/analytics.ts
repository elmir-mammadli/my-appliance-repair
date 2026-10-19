import { BRANCHES, NJ_PATH, type BranchId } from './branches';

export const GA_ID = 'G-JKQBNGF2P9';
export type AnalyticsConsent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    repairAnalyticsConsent?: AnalyticsConsent;
    repairAnalyticsInitialized?: boolean;
  }
}

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem('ga_consent');
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function initializeAnalytics(consent: AnalyticsConsent) {
  if (window.repairAnalyticsInitialized) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // The Google tag command queue uses Arguments objects, not array entries.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Queue consent before config. A returning visitor's choice must be applied
  // before the first page view, even when the external tag loads slowly.
  window.gtag('consent', 'default', {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.repairAnalyticsConsent = consent;
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${window.location.pathname}`,
  });
  window.repairAnalyticsInitialized = true;
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  window.repairAnalyticsConsent = consent;
  try {
    window.localStorage.setItem('ga_consent', consent);
  } catch {
    // The current choice still works when browser storage is unavailable.
  }
  window.gtag?.('consent', 'update', { analytics_storage: consent });
}

type RepairEvent =
  | 'booking_open'
  | 'form_start'
  | 'booking_step_complete'
  | 'booking_submit_error'
  | 'generate_lead'
  | 'click_to_call';

type RepairEventContext = {
  form_id?: 'contact' | 'booking';
  form_variant?: 'inline' | 'modal' | 'page';
  branch_id?: BranchId;
  appliance?: string;
  step?: 1;
};

const applianceTypes = new Set([
  'Washer',
  'Dryer',
  'Refrigerator',
  'Dishwasher',
  'Oven / Range',
  'Cooktop',
  'Microwave',
  'Freezer',
  'Other',
]);

/** Only fixed categories go to GA. Never pass contact details or issue text. */
export function trackRepairEvent(name: RepairEvent, context: RepairEventContext = {}) {
  if (typeof window === 'undefined' || window.repairAnalyticsConsent !== 'granted') return;
  try {
    window.gtag?.('event', name, {
      form_id: context.form_id,
      form_variant: context.form_variant,
      branch_id: context.branch_id ?? (window.location.pathname.startsWith(NJ_PATH) ? 'nj' : 'ct'),
      appliance_type:
        context.appliance && applianceTypes.has(context.appliance) ? context.appliance : undefined,
      step: context.step,
      page_path: window.location.pathname,
      page_location: `${window.location.origin}${window.location.pathname}`,
      transport_type: 'beacon',
    });
  } catch {
    // Analytics must never interrupt a phone link or a repair request.
  }
}

export function branchForPhoneLink(href: string): BranchId | undefined {
  const phone = href
    .replace(/^tel:/i, '')
    .replace(/\D/g, '')
    .replace(/^1(?=\d{10}$)/, '');
  return (Object.keys(BRANCHES) as BranchId[]).find(
    (id) => BRANCHES[id].telephone.replace(/^\+1/, '') === phone,
  );
}
