import { SERVICE_CALL_FEE } from './business';

const SITE_URL = 'https://www.myappliance.us';
const PHONE = '(959) 261-6736';
const PHONE_URL = 'tel:+19592616736';

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!,
  );

function formatDate(value: string) {
  if (!value) return 'To be arranged';
  // Date-only booking values must not shift to the previous day in US time zones.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

const services = [
  ['Refrigerators', 'refrigerator-repair'],
  ['Washers', 'washer-repair'],
  ['Dryers', 'dryer-repair'],
  ['Dishwashers', 'dishwasher-repair'],
  ['Ovens & ranges', 'oven-range-repair'],
  ['More appliances', 'more-appliances'],
] as const;

/** Customer receipt only: the requested appointment is still pending confirmation. */
export function createBookingConfirmationEmail(data: Record<string, string>) {
  const name = data.name?.trim() || 'there';
  const appliance = data.appliance || 'Appliance';
  const applianceLabel = `${appliance}${data.brand ? ` · ${data.brand}` : ''}`;
  const preferredDate = formatDate(data.date || '');
  const time = data.timeSlot || 'Any time';
  const address =
    data.address?.trim() ||
    (data.zip ? `ZIP ${data.zip} — address to be confirmed` : 'To be confirmed by phone');
  const issue = data.issue?.trim() || 'We’ll discuss the details when we call.';
  const phone = data.phone?.trim() || 'the number you provided';
  const preheader =
    'We’ll call within 30 minutes to confirm your service address and appointment. Your request details are inside.';

  const detailRow = (label: string, value: string, last = false) => `
    <tr>
      <th class="detail-label" scope="row" width="124" align="left" valign="top" style="width:124px;padding:16px 16px 16px 0;border-bottom:${last ? '0' : '1px solid #e8edf3'};color:#59677d;font-size:13px;font-weight:400;line-height:21px;">${label}</th>
      <td class="detail-value" valign="top" style="padding:16px 0;border-bottom:${last ? '0' : '1px solid #e8edf3'};color:#142852;font-size:15px;line-height:23px;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(value).replace(/\r?\n/g, '<br>')}</td>
    </tr>`;

  const step = (number: string, title: string, copy: string) => `
    <tr>
      <td width="36" valign="top" style="width:36px;padding:0 0 22px;color:#bd7b00;font-size:14px;font-weight:700;line-height:23px;">${number}</td>
      <td valign="top" style="padding:0 0 22px;">
        <p style="margin:0 0 4px;color:#142852;font-size:15px;font-weight:700;line-height:23px;">${title}</p>
        <p style="margin:0;color:#59677d;font-size:14px;line-height:23px;">${copy}</p>
      </td>
    </tr>`;

  const serviceRows = [0, 2, 4]
    .map(
      (index) =>
        `<tr>${services
          .slice(index, index + 2)
          .map(
            ([label, slug]) => `
    <td width="50%" valign="top" style="padding:8px 8px 8px 0;border-top:1px solid #e5dfcf;font-size:14px;line-height:22px;">
      <a href="${SITE_URL}/services/${slug}" style="color:#142852;text-decoration:underline;">${escapeHtml(label)}</a>
    </td>`,
          )
          .join('')}</tr>`,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your repair request · My Appliance Repair</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; }
    @media only screen and (max-width:600px) {
      .outer-pad { padding:12px 0 !important; }
      .section-pad { padding-left:24px !important; padding-right:24px !important; }
      .hero-title { font-size:30px !important; line-height:36px !important; }
      .header-note { display:none !important; }
      .detail-label { width:92px !important; padding-right:12px !important; }
      .schedule-cell { display:block !important; width:auto !important; padding:16px 20px !important; }
      .schedule-time { border-top:1px solid #e0e6ed !important; border-left:0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#eef1f5;font-family:Arial,Helvetica,sans-serif;color:#142852;">
  <div style="display:none;font-size:1px;line-height:1px;color:#eef1f5;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eef1f5" style="width:100%;background-color:#eef1f5;">
    <tr><td class="outer-pad" align="center" style="padding:32px 16px;">
      <!--[if mso]><table role="presentation" width="640" align="center"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background-color:#ffffff;" bgcolor="#ffffff">
        <tr><td height="5" bgcolor="#ffb81c" style="height:5px;line-height:5px;font-size:1px;">&nbsp;</td></tr>
        <tr><td class="section-pad" bgcolor="#ffffff" style="padding:26px 40px;background-color:#ffffff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
            <td><a href="${SITE_URL}" style="text-decoration:none;"><img src="${SITE_URL}/images/email/myappliance-logo.png" width="198" height="65" alt="My Appliance Repair LLC" style="display:block;width:198px;max-width:100%;height:auto;border:0;color:#142852;font-size:18px;font-weight:700;"></a></td>
            <td class="header-note" align="right" style="color:#59677d;font-size:11px;line-height:18px;letter-spacing:1.2px;">LOCAL EXPERTISE.<br>THOUGHTFUL SERVICE.</td>
          </tr></table>
        </td></tr>
        <tr><td class="section-pad" bgcolor="#142852" style="padding:34px 40px 36px;background-color:#142852;">
          <p style="margin:0 0 14px;color:#ffbf36;font-size:11px;font-weight:700;line-height:16px;letter-spacing:2px;">REPAIR REQUEST RECEIVED</p>
          <h1 class="hero-title" style="margin:0 0 18px;color:#ffffff;font-size:36px;font-weight:700;line-height:42px;letter-spacing:-1px;">Let’s get your home<br>back to normal.</h1>
          <p style="margin:0;color:#e0e7f2;font-size:15px;line-height:25px;">Hi ${escapeHtml(name)}, thanks for choosing My Appliance Repair.<br>We’ll call you within <strong style="color:#ffffff;">30 minutes</strong> to confirm your appointment and service address.</p>
        </td></tr>
        <tr><td class="section-pad" style="padding:32px 40px 8px;">
          <h2 style="margin:0 0 6px;color:#142852;font-size:21px;line-height:28px;letter-spacing:-0.3px;">Your visit, at a glance</h2>
          <p style="margin:0 0 20px;color:#59677d;font-size:13px;line-height:21px;">Your preferred schedule. We’ll confirm availability by phone.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f2f5f9" style="width:100%;background-color:#f2f5f9;"><tr>
            <td class="schedule-cell" width="55%" valign="top" style="padding:18px 20px;">
              <p style="margin:0 0 6px;color:#59677d;font-size:11px;line-height:16px;letter-spacing:1px;">PREFERRED DATE</p>
              <p style="margin:0;color:#142852;font-size:16px;font-weight:700;line-height:24px;">${escapeHtml(preferredDate)}</p>
            </td>
            <td class="schedule-cell schedule-time" width="45%" valign="top" style="padding:18px 20px;border-left:1px solid #e0e6ed;">
              <p style="margin:0 0 6px;color:#59677d;font-size:11px;line-height:16px;letter-spacing:1px;">PREFERRED TIME</p>
              <p style="margin:0;color:#142852;font-size:15px;font-weight:700;line-height:24px;">${escapeHtml(time)}</p>
            </td>
          </tr></table>
          <table aria-label="Repair request details" width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;">
            ${detailRow('Appliance', applianceLabel)}
            ${detailRow('Service address', address)}
            ${detailRow('Your concern', issue, true)}
          </table>
        </td></tr>
        <tr><td class="section-pad" style="padding:16px 40px 4px;">
          <h2 style="margin:0 0 22px;padding-top:26px;border-top:1px solid #e8edf3;color:#142852;font-size:21px;line-height:28px;letter-spacing:-0.3px;">What happens next</h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${step('01', 'A quick call to confirm', `We’ll reach you at <strong style="color:#142852;">${escapeHtml(phone)}</strong> to review the details and agree on a visit time.`)}
            ${step('02', 'A little preparation', 'Once scheduled, please make sure your technician can access the appliance. Have the model number handy if available.')}
            ${step('03', 'A clear quote before any repair', `Your $${SERVICE_CALL_FEE} service call covers the diagnostic and is waived when you proceed with the repair. You approve the written quote before work begins.`)}
          </table>
        </td></tr>
        <tr><td class="section-pad" style="padding:4px 40px 32px;">
          <table role="presentation" cellspacing="0" cellpadding="0"><tr><td align="center" bgcolor="#ffb81c" style="background-color:#ffb81c;border-radius:4px;">
            <a href="${PHONE_URL}" style="display:inline-block;border:1px solid #ffb81c;border-radius:4px;padding:14px 23px;color:#142852;font-size:15px;font-weight:700;line-height:22px;text-decoration:none;mso-padding-alt:0;"><!--[if mso]><i style="mso-font-width:150%;mso-text-raise:22pt;" hidden>&emsp;</i><span style="mso-text-raise:11pt;"><![endif]-->Call ${PHONE}<!--[if mso]></span><i style="mso-font-width:150%;" hidden>&emsp;&#8203;</i><![endif]--></a>
          </td></tr></table>
          <p style="margin:10px 0 0;color:#59677d;font-size:12px;line-height:20px;">Need to change a detail? Give us a call and we’ll help.</p>
        </td></tr>
        <tr><td class="section-pad" bgcolor="#faf6eb" style="padding:28px 40px;background-color:#faf6eb;border-top:1px solid #eee7d6;">
          <p style="margin:0 0 9px;color:#796229;font-size:10px;font-weight:700;line-height:16px;letter-spacing:1.6px;">MORE WAYS WE CAN HELP</p>
          <h2 style="margin:0 0 10px;color:#142852;font-size:22px;line-height:29px;letter-spacing:-0.4px;">Another appliance acting up?</h2>
          <p style="margin:0 0 18px;color:#59677d;font-size:14px;line-height:23px;">Mention it when we call. From the laundry room to the kitchen, our team is here to help.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;">${serviceRows}</table>
          <p style="margin:18px 0 0;font-size:13px;line-height:21px;font-weight:700;"><a href="${SITE_URL}/services" style="color:#142852;text-decoration:underline;">Explore our repair services &rarr;</a></p>
        </td></tr>
        <tr><td class="section-pad" align="center" style="padding:22px 40px;border-bottom:1px solid #e8edf3;">
          <p style="margin:0;color:#142852;font-size:12px;line-height:21px;font-weight:700;">Fully insured &nbsp; &middot; &nbsp; 90-day parts &amp; labor warranty</p>
          <p style="margin:4px 0 0;color:#59677d;font-size:12px;line-height:20px;">Local appliance care for our Connecticut communities.</p>
        </td></tr>
        <tr><td class="section-pad" align="center" bgcolor="#f8fafc" style="padding:24px 40px;background-color:#f8fafc;">
          <p style="margin:0 0 7px;color:#142852;font-size:12px;font-weight:700;line-height:20px;">My Appliance Repair LLC</p>
          <p style="margin:0 0 12px;font-size:12px;line-height:20px;"><a href="${SITE_URL}" style="color:#59677d;text-decoration:underline;">myappliance.us</a> &nbsp;&middot;&nbsp; <a href="${PHONE_URL}" style="color:#59677d;text-decoration:underline;">${PHONE}</a></p>
          <p style="margin:0;color:#68758a;font-size:11px;line-height:18px;overflow-wrap:anywhere;word-break:break-word;">Sent to ${escapeHtml(data.email || '')} because you requested a technician visit.<br>This email acknowledges your request; your appointment is confirmed by phone.</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;

  const text = `MY APPLIANCE REPAIR LLC
Repair request received

Hi ${name}, thanks for choosing My Appliance Repair.
We’ll call you within 30 minutes to confirm your appointment and service address.

YOUR REQUEST
Appliance: ${applianceLabel}
Preferred date: ${preferredDate}
Preferred time: ${time}
Service address: ${address}
Your concern: ${issue}

WHAT HAPPENS NEXT
1. We’ll call ${phone} to review your request and agree on a visit time.
2. Once scheduled, please make sure the technician can access the appliance. Have the model number handy if available.
3. Your $${SERVICE_CALL_FEE} service call covers the diagnostic and is waived when you proceed with the repair. You approve the written quote before work begins.

Need to change a detail? Call ${PHONE}.

ANOTHER APPLIANCE ACTING UP?
Mention it when we call. We repair refrigerators, washers, dryers, dishwashers, ovens, ranges, and more.
Explore our services: ${SITE_URL}/services

Fully insured · 90-day parts & labor warranty
My Appliance Repair LLC · ${SITE_URL} · ${PHONE}
Sent to ${data.email || ''} because you requested a technician visit.
This email acknowledges your request; your appointment is confirmed by phone.`;

  return {
    subject: `Request received: ${appliance.replace(/[\r\n]/g, ' ')} repair · My Appliance Repair`,
    html,
    text,
  };
}
