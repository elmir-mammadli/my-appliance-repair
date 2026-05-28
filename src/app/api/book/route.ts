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
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'MyAppliance Repair LLC <notifications@myappliance.us>',
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `🔧 New Repair Request — ${data.appliance} (${data.urgency})`,
    html: `
      <h2>New Booking Request</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Name</td><td style="padding:6px 12px">${data.name}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:6px 12px">${data.phone}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:6px 12px">${data.email || '—'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">ZIP</td><td style="padding:6px 12px">${data.zip}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Appliance</td><td style="padding:6px 12px">${data.appliance}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Brand</td><td style="padding:6px 12px">${data.brand || '—'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Issue</td><td style="padding:6px 12px">${data.issue}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Preferred Date</td><td style="padding:6px 12px">${data.date || '—'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Preferred Time</td><td style="padding:6px 12px">${data.timeSlot || 'Any time'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Urgency</td><td style="padding:6px 12px;text-transform:capitalize">${data.urgency}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f1f5f9">Submitted</td><td style="padding:6px 12px">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</td></tr>
      </table>
    `,
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
