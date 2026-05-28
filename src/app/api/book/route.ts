export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Resend } from 'resend';

async function appendToSheet(data: Record<string, string>) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = process.env.GOOGLE_SHEET_ID!;
  const tab = process.env.GOOGLE_SHEET_TAB ?? 'Service Requests';

  const now = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

  const row = [
    data.name,           // Full Name
    data.phone,          // Phone
    data.email || '',    // Email
    data.zip,            // ZIP Code
    data.appliance,      // Appliance
    data.brand || '',    // Brand
    data.issue,          // Issue Description
    data.urgency,        // Urgency
    data.timeSlot || '', // Preferred Time
    'New',               // Status
    '',                  // Assigned Technician
    '',                  // Parts Needed
    data.date || '',     // Appointment Date
    now,                 // Created Time
    now,                 // Last Modified
    '',                  // Completion Time
  ];

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tab}!A:A`,
  });
  const nextRow = (existing.data.values?.length ?? 1) + 1;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${tab}!A${nextRow}:P${nextRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

async function sendNotification(data: Record<string, string>) {
  const urgencyColor = data.urgency === 'emergency' ? '#dc2626' : data.urgency === 'today' ? '#ea580c' : '#2563eb';
  const notificationEmail = process.env.NOTIFICATION_EMAIL!;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Repair Request</title></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr><td style="background:#112654;padding:28px 32px;border-radius:4px 4px 0 0;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <p style="margin:0;color:#ffb81c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">MyAppliance Repair LLC</p>
            <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">New Repair Request</h1>
          </td>
          <td align="right">
            <span style="display:inline-block;background:${urgencyColor};color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 12px;border-radius:4px;">${data.urgency}</span>
          </td>
        </tr></table>
      </td></tr>

      <tr><td style="background:#ffb81c;padding:14px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <p style="margin:0;color:#112654;font-size:13px;font-weight:600;">Customer phone number</p>
            <p style="margin:2px 0 0;color:#112654;font-size:24px;font-weight:800;letter-spacing:0.5px;">${data.phone}</p>
          </td>
          <td align="right">
            <a href="tel:${data.phone}" style="display:inline-block;background:#112654;color:#ffffff;font-size:13px;font-weight:700;padding:10px 20px;border-radius:4px;text-decoration:none;">Call Now</a>
          </td>
        </tr></table>
      </td></tr>

      <tr><td style="background:#ffffff;padding:28px 32px;">

        <p style="margin:0 0 12px;color:#112654;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #f1f5f9;padding-bottom:8px;">Customer Info</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:38%;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Name</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;font-weight:600;">${data.name}</p></td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;">${data.email || '—'}</p></td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">ZIP Code</p></td>
            <td style="padding:8px 0;"><p style="margin:0;color:#112654;font-size:14px;">${data.zip}</p></td>
          </tr>
        </table>

        <p style="margin:0 0 12px;color:#112654;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #f1f5f9;padding-bottom:8px;">Job Details</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:38%;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Appliance</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;font-weight:700;">${data.appliance}</p></td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Brand</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;">${data.brand || '—'}</p></td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Issue</p></td>
            <td style="padding:8px 0;"><p style="margin:0;color:#112654;font-size:14px;">${data.issue}</p></td>
          </tr>
        </table>

        <p style="margin:0 0 12px;color:#112654;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #f1f5f9;padding-bottom:8px;">Schedule</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:38%;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Preferred Date</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;font-weight:600;">${data.date || '—'}</p></td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Preferred Time</p></td>
            <td style="padding:8px 0;"><p style="margin:0;color:#112654;font-size:14px;">${data.timeSlot || 'Any time'}</p></td>
          </tr>
        </table>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;padding:16px 20px;text-align:center;">
          <p style="margin:0 0 10px;color:#64748b;font-size:13px;">This lead has been saved to your Google Sheet.</p>
          <a href="${sheetUrl}" style="display:inline-block;background:#112654;color:#ffffff;font-size:13px;font-weight:700;padding:10px 24px;border-radius:4px;text-decoration:none;">Open Google Sheet</a>
        </div>

      </td></tr>

      <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;border-radius:0 0 4px 4px;">
        <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">MyAppliance Repair LLC · myappliance.us · (959) 261-6736</p>
        <p style="margin:6px 0 0;color:#cbd5e1;font-size:11px;text-align:center;">This notification was sent to ${notificationEmail} · Do not reply to this email</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'MyAppliance Repair LLC <notifications@myappliance.us>',
    to: notificationEmail,
    subject: `🔧 New Lead — ${data.appliance} · ${data.urgency.toUpperCase()} · ${data.name}`,
    html,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  let sheetOk = false;
  try {
    await appendToSheet(data);
    sheetOk = true;
  } catch (err) {
    console.error('[/api/book] sheet error:', err);
  }

  try {
    await sendNotification(data);
  } catch (err) {
    console.error('[/api/book] email error:', err);
  }

  if (!sheetOk) {
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
