"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Settings, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  const [currentPlan] = useState({
    name: "Professional",
    price: 45,
    originalPrice: 60,
    status: "active",
    nextBilling: "2024-02-15",
    trialEnds: null,
  })

  const billingHistory = [
    {
      id: "inv_001",
      date: "2024-01-15",
      amount: 54.0, // Including VAT
      status: "paid",
      description: "Professional Plan - Monthly",
      downloadUrl: "#",
    },
    {
      id: "inv_002",
      date: "2023-12-15",
      amount: 54.0,
      status: "paid",
      description: "Professional Plan - Monthly",
      downloadUrl: "#",
    },
    {
      id: "inv_003",
      date: "2023-11-15",
      amount: 54.0,
      status: "paid",
      description: "Professional Plan - Monthly",
      downloadUrl: "#",
    },
  ]

  const paymentMethod = {
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2025,
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
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription and billing information</p>
          </div>

          <div className="grid gap-6">
            {/* Current Plan */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your active subscription details</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-lg">{currentPlan.name} Plan</div>
                    <div className="text-sm text-muted-foreground">Monthly subscription</div>
                  </div>
                  <div className="text-right">
                    {currentPlan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        £{currentPlan.originalPrice}/month
                      </div>
                    )}
                    <div className="text-2xl font-bold">£{currentPlan.price}/month</div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Next billing date</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(currentPlan.nextBilling).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Payment method</div>
                      <div className="text-sm text-muted-foreground">
                        {paymentMethod.brand} •••• {paymentMethod.last4}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/pricing">
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Change Plan
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Your default payment method for subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium">•••• •••• •••• {paymentMethod.last4}</div>
                      <div className="text-sm text-muted-foreground">
                        Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Your recent invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">{invoice.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()} • Invoice #{invoice.id}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">£{invoice.amount.toFixed(2)}</div>
                          <Badge variant="outline" className="text-xs">
                            Paid
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage & Limits */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
                <CardDescription>Track your usage against plan limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Mock Exams</span>
                      <span className="text-sm text-muted-foreground">23 / 100</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Practice Questions</span>
                      <span className="text-sm text-muted-foreground">187 / 500</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "37%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Alerts */}
            <Card className="border-border border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <CardTitle className="text-orange-800">Billing Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-orange-700">
                <p className="text-sm">
                  Your subscription will automatically renew on {new Date(currentPlan.nextBilling).toLocaleDateString()}
                  . You can cancel or modify your subscription at any time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
