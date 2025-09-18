import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth-service"

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (sessionId) {
      await AuthService.logoutUser(sessionId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Logout API error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
