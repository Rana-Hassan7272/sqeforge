import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { amount, currency, plan } = await request.json()

  try {
    const response = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString(),
            },
            description: `SQE Forge ${plan} Plan Monthly Subscription`,
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?payment=cancelled`,
        },
      }),
    })

    const order = await response.json()
    const approvalUrl = order.links.find((link: any) => link.rel === "approve")?.href

    return NextResponse.json({ approval_url: approvalUrl })
  } catch (error) {
    console.error("PayPal error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}
