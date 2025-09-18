export interface User {
  id: string
  email: string
  name?: string
  stripeCustomerId?: string
  createdAt: Date
  lastLoginAt: Date
}

export class AuthService {
  // TODO: Replace with actual database operations
  private static users: Map<string, User> = new Map()
  private static sessions: Map<string, { userId: string; expiresAt: Date }> = new Map()

  static async createUser(email: string, name?: string): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    }

    this.users.set(user.id, user)
    console.log(`[v0] Created user: ${user.email}`)

    return user
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  static async getUserById(userId: string): Promise<User | null> {
    return this.users.get(userId) || null
  }

  static async createSession(userId: string): Promise<string> {
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    this.sessions.set(sessionId, { userId, expiresAt })
    console.log(`[v0] Created session for user ${userId}`)

    return sessionId
  }

  static async validateSession(sessionId: string): Promise<User | null> {
    const session = this.sessions.get(sessionId)
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        this.sessions.delete(sessionId)
      }
      return null
    }

    return this.getUserById(session.userId)
  }

  static async updateUserStripeCustomerId(userId: string, stripeCustomerId: string): Promise<void> {
    const user = this.users.get(userId)
    if (user) {
      user.stripeCustomerId = stripeCustomerId
      console.log(`[v0] Updated user ${userId} with Stripe customer ID: ${stripeCustomerId}`)
    }
  }

  static async loginUser(email: string): Promise<{ user: User; sessionId: string }> {
    let user = await this.findUserByEmail(email)

    if (!user) {
      user = await this.createUser(email)
    } else {
      user.lastLoginAt = new Date()
    }

    const sessionId = await this.createSession(user.id)

    return { user, sessionId }
  }

  static async logoutUser(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId)
    console.log(`[v0] Logged out session: ${sessionId}`)
  }
}
