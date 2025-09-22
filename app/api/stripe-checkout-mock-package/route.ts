import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const { packageId, packageName, price, mocks } = await request.json()

    console.log("[v0] Creating Stripe checkout for mock package:", { packageId, packageName, price, mocks })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${packageName} - ${mocks} Mock Exams`,
              description: `One-time purchase of ${mocks} SQE mock exams with SRA timed conditions`,
            },
            unit_amount: price * 100, // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: "payment", // One-time payment, not subscription
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/practice/packages/success?session_id={CHECKOUT_SESSION_ID}&package=${packageId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/practice/packages`,
      metadata: {
        packageId,
        packageName,
        mockCount: mocks.toString(),
        type: "mock_package",
      },
    })

    console.log("[v0] Stripe checkout session created:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Error creating Stripe checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
