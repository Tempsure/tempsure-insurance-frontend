import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const CONTACT_TO = 'info@tempsureinsurance.co.uk';
const CONTACT_FROM = 'TempSure Insurance <noreply@tempsureinsurance.co.uk>';

const SUBJECTS: Record<string, string> = {
  quote: 'Get a Quote',
  'existing-policy': 'Existing Policy',
  claim: 'Claim Inquiry',
  complaint: 'Complaint',
  technical: 'Technical Support',
  other: 'Other',
};

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: NextRequest) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const subjectKey = body.subject?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const subjectLabel = SUBJECTS[subjectKey];

  if (!name || name.length > 120) {
    return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (phone.length > 40) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
  }
  if (!subjectLabel) {
    return NextResponse.json({ error: 'Please select a subject.' }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ error: 'Please enter a message under 5000 characters.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email is not configured yet. Please call us or email info@tempsureinsurance.co.uk directly.' },
      { status: 500 },
    );
  }

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `[Contact] ${subjectLabel} — ${name}`,
      html,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: 'We could not send your message. Please email info@tempsureinsurance.co.uk directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
