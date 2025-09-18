import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "./auth-service"
import { SubscriptionService } from "./subscription-service"

export async function requireSubscription(
  request: NextRequest,
  requiredPlan: "basic" | "professional" | "premium" = "basic",
) {
  try {
    // Get session from cookie or header
    const sessionId =
      request.cookies.get("sqe-forge-session")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!sessionId) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Validate session
    const user = await AuthService.validateSession(sessionId)
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check subscription
    const userPlan = await SubscriptionService.getUserPlan(user.id)

    const planHierarchy = { basic: 1, professional: 2, premium: 3 }
    const userLevel = planHierarchy[userPlan as keyof typeof planHierarchy] || 0
    const requiredLevel = planHierarchy[requiredPlan]

    if (userLevel < requiredLevel) {
      return NextResponse.redirect(new URL("/pricing", request.url))
    }

    // Add user info to request headers for downstream use
    const response = NextResponse.next()
    response.headers.set("x-user-id", user.id)
    response.headers.set("x-user-plan", userPlan)

    return response
  } catch (error) {
    console.error("[v0] Subscription middleware error:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}
