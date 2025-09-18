export const isAdminMode = () => {
  if (typeof window === "undefined") return false

  // Check for admin mode in localStorage or URL params
  const adminMode = localStorage.getItem("sqe-forge-admin-mode") === "true"
  const urlParams = new URLSearchParams(window.location.search)
  const adminParam = urlParams.get("admin") === "true"

  return adminMode || adminParam
}

export const enableAdminMode = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sqe-forge-admin-mode", "true")
    console.log("[SQE Forge] Admin mode enabled - access to all paid features")
  }
}

export const disableAdminMode = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sqe-forge-admin-mode")
    console.log("[SQE Forge] Admin mode disabled")
  }
}

export const hasAccessToFeature = async (feature: "flashcards" | "calendar" | "premium-content" | "ai-assistant") => {
  // In admin mode, allow access to all features
  if (isAdminMode()) {
    return true
  }

  // For demo purposes, simulate subscription levels
  const mockSubscription = getMockSubscription()

  switch (feature) {
    case "flashcards":
    case "calendar":
      return mockSubscription === "professional" || mockSubscription === "premium"
    case "premium-content":
      return mockSubscription === "premium"
    case "ai-assistant":
      return mockSubscription === "basic" || mockSubscription === "professional" || mockSubscription === "premium"
    default:
      return false
  }
}

const getMockSubscription = (): "free" | "basic" | "professional" | "premium" => {
  if (typeof window === "undefined") return "free"

  // Check localStorage for mock subscription
  const mockSub = localStorage.getItem("sqe-forge-mock-subscription")
  if (mockSub && ["free", "basic", "professional", "premium"].includes(mockSub)) {
    return mockSub as "free" | "basic" | "professional" | "premium"
  }

  return "free"
}

export const setMockSubscription = (plan: "free" | "basic" | "professional" | "premium") => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sqe-forge-mock-subscription", plan)
    console.log(`[SQE Forge] Mock subscription set to: ${plan}`)
  }
}

export const getCurrentUser = async () => {
  // In admin mode, return a mock admin user
  if (isAdminMode()) {
    return {
      id: "admin-user",
      email: "admin@sqeforge.com",
      name: "Admin User",
      subscription: getMockSubscription(),
    }
  }

  return null
}

export const isLoggedIn = async (): Promise<boolean> => {
  // In admin mode, always consider logged in
  if (isAdminMode()) {
    return true
  }

  return false
}
