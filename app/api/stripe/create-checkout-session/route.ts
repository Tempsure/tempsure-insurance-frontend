import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

type CheckoutRequestBody = {
  amount?: number;
  currency?: string;
  description?: string;
  quoteSessionId?: string;
  metadata?: Record<string, string | number | boolean>;
};

const sanitizeMetadata = (
  metadata: Record<string, string | number | boolean> | undefined,
): Record<string, string> | undefined => {
  if (!metadata) return undefined;
  const entries = Object.entries(metadata)
    .filter(([key]) => key.trim().length > 0)
    .slice(0, 20)
    .map(([key, value]) => [key.slice(0, 40), String(value).slice(0, 500)] as const);
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    if (!body?.amount || !Number.isFinite(body.amount) || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Please refresh your quote and try again.' },
        { status: 400 },
      );
    }

    const secretKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: 'Stripe secret key is missing. Set STRIPE_SECRET_KEY in .env.local.' },
        { status: 500 },
      );
    }

    const stripe = new Stripe(secretKey);
    const origin = request.headers.get('origin') ?? new URL(request.url).origin;
    const unitAmount = Math.round(body.amount * 100);
    const currency = (body.currency || 'gbp').toLowerCase();

    // Merge quoteSessionId into metadata so the webhook can create the policy
    const rawMetadata = {
      ...(body.metadata ?? {}),
      ...(body.quoteSessionId ? { quoteSessionId: body.quoteSessionId } : {}),
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${origin}/quotes?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/quotes?payment=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: unitAmount,
            product_data: {
              name: 'TempSure Insurance Policy',
              description: body.description?.slice(0, 500) || 'Short-term insurance policy',
            },
          },
        },
      ],
      metadata: sanitizeMetadata(rawMetadata),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 },
    );
  }
}
