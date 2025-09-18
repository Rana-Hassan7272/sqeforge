"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, BookOpen, Clock } from "lucide-react"

export default function PackageSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const packageId = searchParams.get("package")
  const [packageDetails, setPackageDetails] = useState<any>(null)

  useEffect(() => {
    // In a real app, you'd verify the session and activate the package
    console.log("[v0] Payment successful for session:", sessionId, "package:", packageId)

    // Mock package details based on packageId
    const packages = {
      starter: { name: "Starter Package", mocks: 6, access: "30 days" },
      standard: { name: "Standard Package", mocks: 12, access: "60 days" },
      premium: { name: "Premium Package", mocks: 50, access: "90 days" },
    }

    setPackageDetails(packages[packageId as keyof typeof packages])
  }, [sessionId, packageId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Payment Successful!</CardTitle>
          <p className="text-gray-600 mt-2">Your mock exam package has been activated</p>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          {packageDetails && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">{packageDetails.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">{packageDetails.mocks} Mock Exams</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">{packageDetails.access} Access</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-gray-700">
              You now have access to your mock exams. Start practicing with SRA-compliant timed conditions to prepare
              for your SQE exams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/practice/mock")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Start Mock Exams
              </Button>
              <Button onClick={() => (window.location.href = "/dashboard")} variant="outline" className="px-8 py-3">
                Go to Dashboard
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-500 border-t pt-4">
            <p>
              A confirmation email has been sent to your registered email address. If you have any questions, contact us
              at support@sqeforge.co.uk
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
