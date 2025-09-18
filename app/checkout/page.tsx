"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "professional"

  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = {
    basic: { name: "Basic", price: 12.5, displayPrice: 15, originalPrice: null },
    professional: { name: "Professional", price: 37.5, displayPrice: 45, originalPrice: 60 },
    premium: { name: "Premium", price: 83.33, displayPrice: 100, originalPrice: 150 },
  }

  const selectedPlan = plans[planId as keyof typeof plans] || plans.professional

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      if (paymentMethod === "stripe") {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: selectedPlan.displayPrice * 100, // Convert to pence
            currency: "gbp",
            plan: planId,
            payment_method_types: ["card"],
          }),
        })

        const { client_secret } = await response.json()

        // Redirect to Stripe Checkout or use Elements
        window.location.href = `/api/stripe-checkout?plan=${planId}`
      } else if (paymentMethod === "paypal") {
        const response = await fetch("/api/paypal-create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: selectedPlan.displayPrice,
            currency: "GBP",
            plan: planId,
          }),
        })

        const { approval_url } = await response.json()
        window.location.href = approval_url
      } else if (paymentMethod === "gocardless") {
        const response = await fetch("/api/gocardless-create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: selectedPlan.displayPrice * 100, // Convert to pence
            currency: "GBP",
            plan: planId,
            customer_email: (document.getElementById("email") as HTMLInputElement)?.value,
          }),
        })

        const { redirect_url } = await response.json()
        window.location.href = redirect_url
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

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
            <Button variant="outline" size="sm" asChild>
              <Link href="/pricing">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Pricing
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground">Start your SQE preparation journey today</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your selected plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{selectedPlan.name} Plan</div>
                    <div className="text-sm text-muted-foreground">Monthly subscription</div>
                  </div>
                  <div className="text-right">
                    {selectedPlan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">£{selectedPlan.originalPrice}</div>
                    )}
                    <div className="font-bold">£{selectedPlan.displayPrice}/month</div>
                  </div>
                </div>

                <Separator />

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium text-center">
                    ✓ Final price - No VAT, no hidden fees, no additional charges
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between font-bold">
                  <span>Total due today</span>
                  <span>£{selectedPlan.displayPrice}</span>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• Cancel anytime</p>
                  <p>• No setup fees or hidden charges</p>
                  <p>• Instant access to all features</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-secondary" />
                  Payment Information
                </CardTitle>
                <CardDescription>Your payment details are secure and encrypted</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <Label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          Credit/Debit Card (Visa, MasterCard, Amex) - Stripe
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            P
                          </div>
                          PayPal - Quick & Secure
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <RadioGroupItem value="gocardless" id="gocardless" />
                        <Label htmlFor="gocardless" className="cursor-pointer flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Direct Debit (UK) - GoCardless (Lower fees)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "stripe" && (
                    <div className="text-center py-8">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <CreditCard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-blue-900 mb-2">Stripe Secure Payment</h3>
                        <p className="text-blue-800 text-sm mb-4">
                          Pay securely with your Visa, MasterCard, or American Express card
                        </p>
                        <p className="text-xs text-blue-600">Bank-level security • PCI DSS compliant</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-2xl">P</span>
                        </div>
                        <h3 className="font-semibold text-blue-900 mb-2">PayPal Payment</h3>
                        <p className="text-blue-800 text-sm mb-4">
                          You will be securely redirected to PayPal to complete your payment
                        </p>
                        <p className="text-xs text-blue-600">PayPal Buyer Protection included</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "gocardless" && (
                    <div className="text-center py-8">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <Building2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-green-900 mb-2">Direct Debit Payment</h3>
                        <p className="text-green-800 text-sm mb-4">Lower fees with UK Direct Debit via GoCardless</p>
                        <p className="text-xs text-green-600">Direct Debit Guarantee protection</p>
                      </div>
                    </div>
                  )}

                  {/* Email for all payment methods */}
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1" required />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-secondary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-secondary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay £${selectedPlan.displayPrice}`}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    <p>Secured by 256-bit SSL encryption</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
