import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log(`[v0] Received Stripe webhook: ${event.type}`)

  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`[v0] Unhandled webhook event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`[v0] Webhook handler error:`, error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`[v0] Subscription created: ${subscription.id}`)

  // TODO: Save subscription to database
  // This would typically:
  // 1. Find user by customer ID
  // 2. Update user's subscription status
  // 3. Set subscription start date and plan

  const customerId = subscription.customer as string
  const planId = subscription.metadata?.plan || "professional"

  console.log(`[v0] Customer ${customerId} subscribed to ${planId} plan`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`[v0] Subscription updated: ${subscription.id}`)

  // TODO: Update subscription in database
  // Handle plan changes, status updates, etc.

  const status = subscription.status
  const planId = subscription.metadata?.plan

  console.log(`[v0] Subscription ${subscription.id} status: ${status}, plan: ${planId}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`[v0] Subscription deleted: ${subscription.id}`)

  // TODO: Update user's subscription status to "cancelled"
  // Optionally provide grace period before feature access is removed
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`[v0] Payment succeeded for invoice: ${invoice.id}`)

  // TODO: Update payment history in database
  // Send confirmation email to user

  const subscriptionId = (invoice as any).subscription || ''
  const amountPaid = invoice.amount_paid / 100 // Convert from pence to pounds

  console.log(`[v0] Payment of £${amountPaid} succeeded for subscription ${subscriptionId}`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`[v0] Payment failed for invoice: ${invoice.id}`)

  // TODO: Handle failed payment
  // 1. Update subscription status
  // 2. Send payment failure notification
  // 3. Potentially suspend access after grace period

  const subscriptionId = (invoice as any).subscription || ''
  const attemptCount = invoice.attempt_count

  console.log(`[v0] Payment failed for subscription ${subscriptionId}, attempt ${attemptCount}`)
}
