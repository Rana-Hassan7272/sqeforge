export interface UserSubscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing"
  plan: "basic" | "professional" | "premium"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  createdAt: Date
  updatedAt: Date
}

export class SubscriptionService {
  // TODO: Replace with actual database operations
  private static subscriptions: Map<string, UserSubscription> = new Map()

  static async createSubscription(
    data: Omit<UserSubscription, "id" | "createdAt" | "updatedAt">,
  ): Promise<UserSubscription> {
    const subscription: UserSubscription = {
      ...data,
      id: `sub_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.subscriptions.set(subscription.userId, subscription)
    console.log(`[v0] Created subscription for user ${subscription.userId}: ${subscription.plan}`)

    return subscription
  }

  static async updateSubscription(
    userId: string,
    updates: Partial<UserSubscription>,
  ): Promise<UserSubscription | null> {
    const existing = this.subscriptions.get(userId)
    if (!existing) return null

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    }

    this.subscriptions.set(userId, updated)
    console.log(`[v0] Updated subscription for user ${userId}`)

    return updated
  }

  static async getSubscription(userId: string): Promise<UserSubscription | null> {
    return this.subscriptions.get(userId) || null
  }

  static async getUserPlan(userId: string): Promise<"free" | "basic" | "professional" | "premium"> {
    const subscription = await this.getSubscription(userId)

    if (!subscription || subscription.status !== "active") {
      return "free"
    }

    return subscription.plan
  }

  static async hasActiveSubscription(userId: string): Promise<boolean> {
    const subscription = await this.getSubscription(userId)
    return subscription?.status === "active" || false
  }

  static async cancelSubscription(userId: string): Promise<boolean> {
    const subscription = this.subscriptions.get(userId)
    if (!subscription) return false

    subscription.status = "cancelled"
    subscription.updatedAt = new Date()

    console.log(`[v0] Cancelled subscription for user ${userId}`)
    return true
  }
}
