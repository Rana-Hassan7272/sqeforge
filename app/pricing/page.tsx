"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 15,
      originalPrice: null,
      popular: false,
      description: "Perfect for getting started with SQE preparation",
      mocks: { total: 20, flk1: 10, flk2: 10 },
      mcqs: { total: 360 },
      miniMocks: "20, 30, or 50 questions per mini mock",
      features: [
        "20 Mock Exams",
        "360 MCQ Practice Questions",
        "180 questions per sub-topic",
        "2 intensity levels (Basic & Intermediate)",
        "AI Assistant 'Forger'",
        "Basic progress tracking",
        "Study materials access",
        "Timed exam conditions",
        "Legal blog access",
        "Email support",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: 45,
      originalPrice: 60,
      popular: true,
      description: "Most popular choice for serious SQE candidates",
      mocks: { total: 100, flk1: 50, flk2: 50 },
      mcqs: { total: 500 },
      miniMocks: "20, 30, or 50 questions per mini mock",
      features: [
        "100 Mock Exams",
        "500 MCQ Practice Questions",
        "180 questions per sub-topic",
        "All 4 intensity levels",
        "AI Assistant 'Forger'",
        "Advanced analytics",
        "Flashcards per subtopic",
        "Calendar view timetable",
        "Legal blog access",
        "Priority support",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 100,
      originalPrice: 150,
      popular: false,
      description: "Complete SQE preparation with unlimited access",
      mocks: { total: "Unlimited", flk1: "Unlimited", flk2: "Unlimited" },
      mcqs: { total: "Unlimited" },
      miniMocks: "20, 30, or 50 questions per mini mock",
      features: [
        "Unlimited Mock Exams",
        "Unlimited MCQ Practice Questions",
        "180 questions per sub-topic",
        "All 4 intensity levels",
        "All Professional features",
        "1-on-1 tutoring sessions",
        "Priority AI support",
        "Advanced performance analytics",
        "Calendar view timetable",
        "Legal blog access",
        "24/7 premium support",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SQE Forge</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your SQE preparation journey.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-8 mb-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-secondary">🛡️</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary">💳</span>
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary">⚡</span>
            <span>Instant Access</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.id} className={`border-border relative ${plan.popular ? "border-secondary border-2" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg text-muted-foreground line-through">£{plan.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        Save £{plan.originalPrice - plan.price}
                      </Badge>
                    </div>
                  )}
                  <span className="text-4xl font-bold text-foreground">£{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-secondary flex-shrink-0">✅</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" size="lg" asChild>
                  <Link href={`/checkout?plan=${plan.id}`}>{plan.popular ? "Get Started" : "Choose Plan"}</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">No setup fees • Cancel anytime</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mock Packages section */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Mock Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One-time purchase mock exam packages for focused practice
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <span>✅</span>
              No subscription required • One-time payment
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Mock Package */}
            <Card className="border-border">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Starter Mock</CardTitle>
                <CardDescription className="text-sm">Essential mock exams for beginners</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">£15</span>
                    <Badge variant="destructive" className="text-xs">
                      Save £3
                    </Badge>
                  </div>
                  <span className="text-4xl font-bold text-foreground">£12</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">10 Mock Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">500 Flashcards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Basic progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Timed exam conditions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Instant results & feedback</span>
                  </li>
                </ul>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout?package=starter-mock">Purchase Now</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">One-time payment • Lifetime access</p>
              </CardContent>
            </Card>

            {/* Standard Mock Package */}
            <Card className="border-secondary border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-secondary text-secondary-foreground">Best Value</Badge>
              </div>

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Standard Mock</CardTitle>
                <CardDescription className="text-sm">Comprehensive mock exam preparation</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">£30</span>
                    <Badge variant="destructive" className="text-xs">
                      Save £6
                    </Badge>
                  </div>
                  <span className="text-4xl font-bold text-foreground">£24</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">50 Mock Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Unlimited Flashcards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">AI Assistant 'Forger'</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Performance tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout?package=standard-mock">Purchase Now</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">One-time payment • Lifetime access</p>
              </CardContent>
            </Card>

            {/* Premium Mock Package */}
            <Card className="border-border">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Premium Mock</CardTitle>
                <CardDescription className="text-sm">Ultimate mock exam experience</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">£60</span>
                    <Badge variant="destructive" className="text-xs">
                      Save £20
                    </Badge>
                  </div>
                  <span className="text-4xl font-bold text-foreground">£40</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Unlimited Mock Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Unlimited Flashcards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">All Standard features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">1-on-1 tutoring sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">Advanced performance analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary flex-shrink-0">✅</span>
                    <span className="text-sm">24/7 premium support</span>
                  </li>
                </ul>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout?package=premium-mock">Purchase Now</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">One-time payment • Lifetime access</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are
                  processed securely.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Are there any setup fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No setup fees. You can cancel your subscription anytime from your account settings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
