import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const plan = searchParams.get("plan") || "professional"

  const plans = {
    basic: { name: "Basic Plan", price: 1500, priceId: process.env.STRIPE_BASIC_PRICE_ID },
    professional: { name: "Professional Plan", price: 4500, priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID },
    premium: { name: "Premium Plan", price: 10000, priceId: process.env.STRIPE_PREMIUM_PRICE_ID },
  }

  const selectedPlan = plans[plan as keyof typeof plans] || plans.professional

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: selectedPlan.name,
              description: "SQE Forge Monthly Subscription",
            },
            unit_amount: selectedPlan.price,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?payment=cancelled`,
      customer_email: searchParams.get("email") || undefined,
      metadata: {
        plan: plan,
      },
    })

    return NextResponse.redirect(session.url!)
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}
