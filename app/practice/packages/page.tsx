"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, BookOpen, Clock, Target, Star, Eye, MessageCircle } from "lucide-react"

const packages = [
  {
    id: "starter",
    name: "Starter Package",
    mocks: 6,
    price: 15,
    originalPrice: 18,
    discount: 3,
    flashcards: 500,
    description: "Perfect for getting started with mock exams and practice questions",
    features: [
      "6 Full Mock Exams (180 questions each)",
      "3 FLK1 Mocks (Contract, Tort, Business, Dispute Resolution)",
      "3 FLK2 Mocks (Property, Litigation & Advocacy)",
      "500 Flashcards Access",
      "Mini Mocks: 20, 30, or 50 questions per topic",
      "SRA Timed Conditions (5 hours per mock)",
      "Detailed Performance Analytics",
      "Instant Results & Feedback",
      "30-day Access",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Package",
    mocks: 12,
    price: 45,
    originalPrice: 55,
    discount: 10,
    flashcards: "unlimited",
    description: "Most popular choice for comprehensive practice with extensive mini mocks",
    features: [
      "12 Full Mock Exams (180 questions each)",
      "6 FLK1 Mocks (Contract, Tort, Business, Dispute Resolution)",
      "6 FLK2 Mocks (Property, Litigation & Advocacy)",
      "Unlimited Flashcards Access",
      "Mini Mocks: 20, 30, or 50 questions per topic",
      "Topics & Subtopics Coverage",
      "SRA Timed Conditions (5 hours per mock)",
      "Advanced Performance Analytics",
      "Detailed Answer Explanations",
      "Progress Tracking",
      "60-day Access",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Package",
    mocks: 50,
    price: 100,
    originalPrice: 120,
    discount: 20,
    flashcards: "unlimited",
    description: "Ultimate preparation with extensive mock practice and comprehensive mini mocks",
    features: [
      "50 Full Mock Exams (180 questions each)",
      "25 FLK1 Mocks (Contract, Tort, Business, Dispute Resolution)",
      "25 FLK2 Mocks (Property, Litigation & Advocacy)",
      "Unlimited Flashcards Access",
      "Mini Mocks: 20, 30, or 50 questions per topic",
      "Complete Topics & Subtopics",
      "SRA Timed Conditions (5 hours per mock)",
      "Comprehensive Analytics Dashboard",
      "Detailed Answer Explanations",
      "Performance Comparison Tools",
      "Weakness Identification",
      "90-day Access",
    ],
    popular: false,
  },
]

export default function MockPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const handlePurchase = async (packageId: string) => {
    const selectedPkg = packages.find((pkg) => pkg.id === packageId)
    if (!selectedPkg) return

    console.log("[v0] Initiating purchase for package:", packageId)

    // Create Stripe checkout session for one-time payment
    try {
      const response = await fetch("/api/stripe-checkout-mock-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: selectedPkg.id,
          packageName: selectedPkg.name,
          price: selectedPkg.price,
          mocks: selectedPkg.mocks,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("[v0] Error creating checkout session:", error)
    }
  }

  const handleReviewMock = (packageId: string) => {
    // Navigate to mock review page
    window.location.href = `/practice/packages/review?package=${packageId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SQE Forge</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/practice" className="text-gray-600 hover:text-blue-600 transition-colors">
                Back to Practice
              </a>
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mock Exam Packages</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Purchase individual mock exam packages without a subscription. Each mock contains 180 questions mixing
            topics within FLK1 or FLK2, just like the real SQE exams.
          </p>
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-medium">
              ✓ All prices are final - No setup fees, no hidden costs, no subscription required
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">FLK1 & FLK2 Mock Exams</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">FLK1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Functioning Legal Knowledge 1</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Contract Law
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Tort Law
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Business Law
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Dispute Resolution
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">180 questions mixing all FLK1 topics per mock</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">FLK2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Functioning Legal Knowledge 2</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Property Law
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Litigation & Advocacy
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Criminal Procedure
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Professional Conduct
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">180 questions mixing all FLK2 topics per mock</p>
            </div>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                pkg.popular ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{pkg.description}</CardDescription>

                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600">£{pkg.price}</span>
                    <span className="text-lg text-gray-400 line-through">£{pkg.originalPrice}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">Save £{pkg.discount}</div>
                  <div className="text-sm text-gray-500 mt-1">One-time payment • Final price</div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">{pkg.mocks} Mock Exams</span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full mt-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">
                      {pkg.flashcards === "unlimited" ? "Unlimited" : pkg.flashcards} Flashcards
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleReviewMock(pkg.id)}
                    variant="outline"
                    className="w-full py-2 text-sm font-medium border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review Mock Content
                  </Button>

                  <Button
                    onClick={() => handlePurchase(pkg.id)}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Purchase Package
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">Final price • No additional fees</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What's Included in Every Package</h2>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">SRA Timed Conditions</h3>
              <p className="text-gray-600 text-sm">Authentic 5-hour exam timing that matches real SQE conditions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
              <p className="text-gray-600 text-sm">Comprehensive performance tracking and progress insights</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Exam Format</h3>
              <p className="text-gray-600 text-sm">180 questions per mock mixing topics within FLK1 or FLK2</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Chatbot 'Forger'</h3>
              <p className="text-gray-600 text-sm">24/7 AI assistant to help with questions and explanations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Immediate feedback with detailed answer explanations</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long do I have access?</h3>
              <p className="text-gray-600 text-sm">
                Access duration varies by package: 30 days (Starter), 60 days (Standard), 90 days (Premium).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Are these real SQE conditions?</h3>
              <p className="text-gray-600 text-sm">
                Yes, all mock exams follow SRA timing and format requirements exactly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I retake the mocks?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can retake any mock exam multiple times during your access period.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Are there any additional fees?</h3>
              <p className="text-gray-600 text-sm">
                No additional fees, no setup costs. The price you see is the final price you pay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
