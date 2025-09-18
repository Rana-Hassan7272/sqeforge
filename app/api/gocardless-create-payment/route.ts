import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { amount, currency, plan, customer_email } = await request.json()

  try {
    // Create customer
    const customerResponse = await fetch(`${process.env.GOCARDLESS_BASE_URL}/customers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GOCARDLESS_ACCESS_TOKEN}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customers: {
          email: customer_email,
          given_name: "Customer",
          family_name: "Name",
          country_code: "GB",
        },
      }),
    })

    const customer = await customerResponse.json()

    // Create mandate
    const mandateResponse = await fetch(`${process.env.GOCARDLESS_BASE_URL}/customer_bank_accounts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GOCARDLESS_ACCESS_TOKEN}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_bank_accounts: {
          account_holder_name: "Customer Name",
          account_number: "55779911",
          branch_code: "200000",
          country_code: "GB",
          currency: "GBP",
          links: {
            customer: customer.customers.id,
          },
        },
      }),
    })

    const bankAccount = await mandateResponse.json()

    // Create subscription
    const subscriptionResponse = await fetch(`${process.env.GOCARDLESS_BASE_URL}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GOCARDLESS_ACCESS_TOKEN}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptions: {
          amount: amount,
          currency: currency,
          name: `SQE Forge ${plan} Plan`,
          interval_unit: "monthly",
          links: {
            mandate: bankAccount.customer_bank_accounts.id,
          },
        },
      }),
    })

    const subscription = await subscriptionResponse.json()

    return NextResponse.json({
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success&subscription=${subscription.subscriptions.id}`,
    })
  } catch (error) {
    console.error("GoCardless error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}
