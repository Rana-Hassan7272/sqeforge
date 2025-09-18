import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SQE Forge</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Terms of Service</span>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Scale className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">Please read these terms carefully before using our services</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By accessing and using SQE Forge, you accept and agree to be bound by the terms and provision of this
                  agreement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Use of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  SQE Forge provides educational services for SQE exam preparation. You agree to use our services only
                  for lawful purposes.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>You must be at least 18 years old to use our services</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You may not share your account credentials with others</li>
                  <li>You may not use our content for commercial purposes without permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Subscription and Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our services are provided on a subscription basis with the following terms:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Subscriptions are billed monthly in advance</li>
                  <li>You may cancel your subscription at any time with immediate effect</li>
                  <li>Under UK Consumer Rights Act 2015, you have a 14-day cooling-off period for refunds</li>
                  <li>Price changes require 30 days written notice as per UK consumer protection laws</li>
                  <li>All payments are processed securely in compliance with UK GDPR and PCI DSS standards</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>UK Consumer Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  As a UK-based service, you have specific rights under UK consumer protection legislation:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Right to cancel within 14 days of purchase (Consumer Rights Act 2015)</li>
                  <li>Right to receive services that match their description</li>
                  <li>Right to fair and transparent pricing with VAT clearly displayed</li>
                  <li>Right to data protection under UK GDPR</li>
                  <li>Right to dispute resolution through UK consumer protection agencies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Data Protection (UK GDPR Compliance)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We process your personal data in accordance with UK GDPR and Data Protection Act 2018:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>We are the data controller for your personal information</li>
                  <li>Your data is processed lawfully, fairly, and transparently</li>
                  <li>You have rights to access, rectify, erase, and port your data</li>
                  <li>We retain data only as long as necessary for service provision</li>
                  <li>You can lodge complaints with the UK Information Commissioner's Office (ICO)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These terms are governed by English and Welsh law. Any disputes will be subject to the exclusive
                  jurisdiction of the courts of England and Wales. UK consumer protection laws take precedence where
                  applicable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-secondary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  SQE Forge provides educational materials and cannot guarantee exam success. Our liability is limited
                  to the amount you paid for our services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All content, materials, and intellectual property on SQE Forge are owned by us or our licensors and
                  are protected by copyright and other laws.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: support@sqeforge.co.uk</p>
                  <p>Company Registration: 12345678 (England & Wales)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
