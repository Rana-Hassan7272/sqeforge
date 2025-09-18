import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth-service"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const { user, sessionId } = await AuthService.loginUser(email)

    console.log(`[v0] User logged in: ${user.email}`)

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      sessionId,
    })
  } catch (error) {
    console.error("[v0] Login API error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
