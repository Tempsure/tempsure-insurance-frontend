import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { stripeSessionId } = (await request.json()) as { stripeSessionId?: string };

    if (!stripeSessionId) {
      return NextResponse.json({ error: 'Missing stripeSessionId' }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    return NextResponse.json({
      paymentIntentId: (session.payment_intent as string) || stripeSessionId,
      amountPaid: (session.amount_total ?? 0) / 100,
    });
  } catch (error) {
    console.error('Stripe verify-payment error:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
