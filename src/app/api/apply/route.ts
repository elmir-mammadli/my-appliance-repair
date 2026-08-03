export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const fd = await req.formData();

  const name         = fd.get('name')         as string;
  const phone        = fd.get('phone')        as string;
  const email        = fd.get('email')        as string;
  const experience   = fd.get('experience')   as string;
  const availability = fd.get('availability') as string;
  const why          = fd.get('why')          as string;
  const brands: string[] = JSON.parse((fd.get('brands') as string) || '[]');
  const cvEntry      = fd.get('cv');

  let cvFileName: string | null = null;
  let cvAttachment: { filename: string; content: Buffer; contentType: string } | null = null;

  if (cvEntry instanceof File && cvEntry.size > 0) {
    cvFileName = cvEntry.name;
    const bytes = await cvEntry.arrayBuffer();
    cvAttachment = {
      filename: cvEntry.name,
      content: Buffer.from(bytes),
      contentType: cvEntry.type || 'application/octet-stream',
    };
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL!;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Job Application</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
 <tr><td align="center">
 <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

 <tr><td style="background:#112654;padding:28px 32px;border-radius:4px 4px 0 0;">
 <p style="margin:0;color:#ffb81c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">MyAppliance Repair LLC</p>
 <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;">New Job Application</h1>
 </td></tr>

 <tr><td style="background:#ffb81c;padding:14px 32px;">
 <p style="margin:0;color:#112654;font-size:13px;font-weight:600;">Applicant phone</p>
 <p style="margin:2px 0 0;color:#112654;font-size:24px;font-weight:800;">${phone}</p>
 </td></tr>

 <tr><td style="background:#fff;padding:28px 32px;">

 <p style="margin:0 0 12px;color:#112654;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #f1f5f9;padding-bottom:8px;">Applicant Info</p>
 <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
 <tr>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;width:38%;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">Name</p></td>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;font-weight:600;">${name}</p></td>
 </tr>
 <tr>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">Email</p></td>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;">${email}</p></td>
 </tr>
 <tr>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">Experience</p></td>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;">${experience}</p></td>
 </tr>
 <tr>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">Availability</p></td>
 <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><p style="margin:0;color:#112654;font-size:14px;">${availability}</p></td>
 </tr>
 <tr>
 <td style="padding:8px 0;"><p style="margin:0;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">Brands</p></td>
 <td style="padding:8px 0;"><p style="margin:0;color:#112654;font-size:14px;">${brands?.length ? brands.join(', ') : 'None selected'}</p></td>
 </tr>
 </table>

 <p style="margin:0 0 12px;color:#112654;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #f1f5f9;padding-bottom:8px;">Why They Want to Join</p>
 <p style="margin:0 0 24px;color:#334155;font-size:14px;line-height:1.6;">${why.replace(/\n/g, '<br>')}</p>

 ${cvFileName ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:4px;padding:12px 16px;"><p style="margin:0;color:#166534;font-size:13px;"><strong>CV attached:</strong> ${cvFileName}</p></div>` : ''}

 </td></tr>

 <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;border-radius:0 0 4px 4px;">
 <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">MyAppliance Repair LLC · myappliance.us · (959) 261-6736</p>
 <p style="margin:6px 0 0;color:#cbd5e1;font-size:11px;text-align:center;">Sent to ${notificationEmail} · Do not reply to this email</p>
 </td></tr>

 </table>
 </td></tr>
</table>
</body>
</html>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'MyAppliance Repair LLC <notifications@myappliance.us>',
      to: notificationEmail,
      subject: `New Application — ${name} · ${experience} · ${availability}`,
      html,
      ...(cvAttachment ? { attachments: [cvAttachment] } : {}),
    });
  } catch (err) {
    console.error('[/api/apply] email error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
