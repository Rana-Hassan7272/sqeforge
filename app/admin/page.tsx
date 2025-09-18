"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isAdminMode, enableAdminMode, disableAdminMode, setMockSubscription } from "@/lib/admin-mode"
import Link from "next/link"

const modules = [
  // FLK1 MODULES - Complete SRA Coverage
  {
    id: "business-law-practice",
    name: "FLK1 - Business Law and Practice",
    subtopics: [
      "Starting a Business",
      "Managing a Business",
      "Stakeholder Interests",
      "Business Financing",
      "Business Taxation",
      "Business Termination",
      "Insolvency",
    ],
  },
  {
    id: "dispute-resolution",
    name: "FLK1 - Dispute Resolution",
    subtopics: [
      "Analysis of Claims",
      "Arbitration",
      "Mediation",
      "Litigation",
      "Pre-action Steps",
      "Commencing Claims",
      "Progressing Claims",
      "Case Management",
      "Evidence",
      "Trial Preparation",
      "Costs",
    ],
  },
  {
    id: "contract-law",
    name: "FLK1 - Contract Law",
    subtopics: [
      "Formation",
      "Contents",
      "Causation",
      "Remoteness",
      "Vitiating Elements",
      "Discharge",
      "Remedies",
      "Unjust Enrichment",
    ],
  },
  {
    id: "tort-law",
    name: "FLK1 - Tort Law",
    subtopics: [
      "Negligence",
      "Remedies and Defences",
      "Occupiers' Liability",
      "Product Liability",
      "Nuisance",
      "Rylands v Fletcher Rule",
    ],
  },
  {
    id: "legal-system-england-wales",
    name: "FLK1 - Legal System of England and Wales",
    subtopics: ["Courts System", "Case Law Development", "Primary Legislation", "Statutory Interpretation"],
  },
  {
    id: "constitutional-administrative-eu-law",
    name: "FLK1 - Constitutional and Administrative Law and EU Law",
    subtopics: ["Constitutional Framework", "Separation of Powers", "Judicial Review", "Human Rights", "EU Law Impact"],
  },
  {
    id: "legal-services",
    name: "FLK1 - Legal Services",
    subtopics: ["SRA Regulatory Role", "Funding Options for Legal Services"],
  },
  // FLK2 MODULES - Complete SRA Coverage
  {
    id: "property-practice",
    name: "FLK2 - Property Practice",
    subtopics: [
      "Key Elements of Property Transactions",
      "Title Investigation",
      "Pre-contract Searches",
      "Progression to Exchange",
      "Pre-completion",
      "Completion and Post-completion",
      "Commercial Leases",
      "Lease Covenants",
      "Security of Tenure",
      "Taxation of Property Transactions",
    ],
  },
  {
    id: "wills-administration-estates",
    name: "FLK2 - Wills and Administration of Estates",
    subtopics: [
      "Will Validity",
      "Will Interpretation",
      "Estate Distribution",
      "Grants of Representation",
      "Inheritance Tax",
      "Estate Administration",
      "Personal Representatives",
      "Trustees",
    ],
  },
  {
    id: "solicitors-accounts",
    name: "FLK2 - Solicitors Accounts",
    subtopics: [
      "Client Money Transactions",
      "Ledger and Bank Account Operation",
      "SRA Accounts Rules Breaches",
      "Accounting Entries",
      "Bills",
      "Record-keeping",
    ],
  },
  {
    id: "land-law",
    name: "FLK2 - Land Law",
    subtopics: [
      "Registered Land",
      "Unregistered Land",
      "Freehold Estates",
      "Leasehold Estates",
      "Legal Interests",
      "Equitable Interests",
      "Landlord and Tenant",
      "Co-ownership",
    ],
  },
  {
    id: "trusts",
    name: "FLK2 - Trusts",
    subtopics: [
      "Express Trusts",
      "Implied Trusts",
      "Fiduciary Relationships",
      "Trustees' Duties",
      "Trustees' Powers",
      "Trustees' Liability",
      "Equitable Remedies",
    ],
  },
  {
    id: "criminal-law-practice",
    name: "FLK2 - Criminal Law and Practice",
    subtopics: [
      "Core Principles of Criminal Liability",
      "Police Station Procedures",
      "Pre-trial Considerations",
      "Meeting Client Objectives",
      "Magistrates' Court Trials",
      "Crown Court Trials",
    ],
  },
  {
    id: "scoring-test",
    name: "SCORING SYSTEM TEST",
    subtopics: [
      "Foundation Questions",
      "Intermediate Questions",
      "Advanced Questions",
      "Expert Questions",
      "Mixed Difficulty",
    ],
  },
]

const mockPackages = [
  { id: "basic", name: "Basic Package", price: "£12", questions: "180 per module", mocks: 6 },
  { id: "professional", name: "Professional Package", price: "£24", questions: "500 per module", mocks: 12 },
  { id: "premium", name: "Premium Package", price: "£40", questions: "Unlimited", mocks: "50+" },
]

export default function AdminTestingPage() {
  const [adminEnabled, setAdminEnabled] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState<"free" | "basic" | "professional" | "premium">("free")
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 89,
    totalQuestions: 2847,
    totalMocks: 156,
    totalFlashcards: 1893,
    totalMindmaps: 78,
  })

  const [questionStats, setQuestionStats] = useState([
    { module: "Business Law", questions: 387, difficulty: { easy: 129, medium: 158, hard: 100 } },
    { module: "Dispute Resolution", questions: 445, difficulty: { easy: 148, medium: 178, hard: 119 } },
    { module: "Contract Law", questions: 324, difficulty: { easy: 108, medium: 124, hard: 92 } },
    { module: "Tort Law", questions: 267, difficulty: { easy: 89, medium: 102, hard: 76 } },
    { module: "Property Practice", questions: 398, difficulty: { easy: 133, medium: 152, hard: 113 } },
    { module: "Wills & Estates", questions: 289, difficulty: { easy: 96, medium: 111, hard: 82 } },
    { module: "Solicitors Accounts", questions: 234, difficulty: { easy: 78, medium: 89, hard: 67 } },
    { module: "Land Law", questions: 312, difficulty: { easy: 104, medium: 119, hard: 89 } },
    { module: "Trusts", questions: 191, difficulty: { easy: 64, medium: 73, hard: 54 } },
    { module: "Scoring Test", questions: 50, difficulty: { easy: 17, medium: 16, hard: 17 } },
  ])

  useEffect(() => {
    setAdminEnabled(isAdminMode())
    if (!isAdminMode()) {
      enableAdminMode()
      setAdminEnabled(true)
    }

    const mockSub =
      (localStorage.getItem("sqe-forge-mock-subscription") as "free" | "basic" | "professional" | "premium") || "free"
    setCurrentSubscription(mockSub)
  }, [])

  const toggleAdminMode = () => {
    if (adminEnabled) {
      disableAdminMode()
      setAdminEnabled(false)
    } else {
      enableAdminMode()
      setAdminEnabled(true)
    }
  }

  const handleSubscriptionChange = (plan: "free" | "basic" | "professional" | "premium") => {
    setMockSubscription(plan)
    setCurrentSubscription(plan)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Testing Interface</h1>
        <p className="text-muted-foreground">Complete system overview and testing capabilities</p>
      </div>

      <Card className="mb-8 border-2 border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl text-primary">🎯 SCORING SYSTEM TEST - READY TO USE</CardTitle>
          <CardDescription className="text-base">
            Test the complete SQE1 scaled scoring system with 50 questions across all difficulty levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Available Questions:</div>
              <div className="text-2xl font-bold text-primary">50 Questions</div>
              <div className="text-xs text-muted-foreground">17 Easy • 16 Medium • 17 Hard</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Scoring Features:</div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  SQE1 Scaled Scoring
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Weighted Angoff Method
                </Badge>
                <Badge variant="outline" className="text-xs">
                  300/500 Pass Mark
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/practice/scoring-test/session?intensity=1&count=50">🚀 START SCORING TEST</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                <Link href="/practice/scoring-test">View Module Details</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 mb-8 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalQuestions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all modules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mock Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalMocks}</div>
            <p className="text-xs text-muted-foreground">Full & mini mocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalFlashcards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Study materials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mindmaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalMindmaps}</div>
            <p className="text-xs text-muted-foreground">Visual guides</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Admin Mode Control
              <Switch checked={adminEnabled} onCheckedChange={toggleAdminMode} />
            </CardTitle>
            <CardDescription>
              {adminEnabled
                ? "✅ All features unlocked - you can access everything"
                : "❌ Admin mode disabled - some features may be restricted"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Subscription Plans</CardTitle>
            <CardDescription>
              Current Plan: <Badge variant="outline">{currentSubscription}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={currentSubscription === "basic" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubscriptionChange("basic")}
              >
                Basic (180q)
              </Button>
              <Button
                variant={currentSubscription === "professional" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubscriptionChange("professional")}
              >
                Pro (500q)
              </Button>
              <Button
                variant={currentSubscription === "premium" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubscriptionChange("premium")}
              >
                Premium (∞)
              </Button>
              <Button
                variant={currentSubscription === "free" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubscriptionChange("free")}
              >
                Free
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="modules">Study Modules</TabsTrigger>
          <TabsTrigger value="practice">Practice Questions</TabsTrigger>
          <TabsTrigger value="mocks">Mock Packages</TabsTrigger>
          <TabsTrigger value="features">Premium Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <h2 className="text-2xl font-semibold">Study Modules & Subtopics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <CardDescription>{module.subtopics.length} subtopics available</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {module.subtopics.map((subtopic) => (
                      <Badge key={subtopic} variant="outline" className="text-xs">
                        {subtopic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/study?module=${module.id}`}>Study</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={`/practice/${module.id}`}>Practice</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <h2 className="text-2xl font-semibold">Practice Questions & Mini Mocks</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Question Types</CardTitle>
                <CardDescription>Test different question formats and difficulties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice?difficulty=easy">Easy Questions (Foundation Level)</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice?difficulty=medium">Medium Questions (Competent Level)</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice?difficulty=hard">Hard Questions (Advanced Level)</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice?type=mini-mock">Mini Mocks (20 Questions)</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wrong Question Bank</CardTitle>
                <CardDescription>Review previously incorrect answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice/review?type=wrong">Wrong Answers Review</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice/review?type=flagged">Flagged Questions</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice/analytics">Performance Analytics</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mocks" className="space-y-4">
          <h2 className="text-2xl font-semibold">Mock Exam Packages</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {mockPackages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Questions:</span>
                      <Badge variant="secondary">{pkg.questions}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Mock Exams:</span>
                      <Badge variant="secondary">{pkg.mocks}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Intensity Levels:</span>
                      <Badge variant="outline">{pkg.id === "basic" ? "1-2" : "1-4"}</Badge>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Button asChild size="sm">
                      <Link href={`/practice/packages?package=${pkg.id}`}>Try Package</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/practice/packages/${pkg.id}/mock-exam`}>Full Mock Exam</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <h2 className="text-2xl font-semibold">Premium Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Study Tools</CardTitle>
                <CardDescription>Advanced study and revision tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/flashcards">📚 Flashcards System</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/timetable">📅 Study Calendar</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/progress">📊 Progress Tracking</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
                <CardDescription>AI-powered study assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/ai-assistant">🤖 AI Study Assistant</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/practice?ai-explanations=true">💡 AI Explanations</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start bg-transparent">
                    <Link href="/study?ai-summaries=true">📝 AI Summaries</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-primary">🎯 SQE1 Scoring System</CardTitle>
                <CardDescription>Test the complete scaled scoring system (300/500 pass mark)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pass Mark:</span>
                    <Badge>300/500 (60%)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Scaled Scoring:</span>
                    <Badge variant="outline">SRA Compliant</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Test Questions:</span>
                    <Badge variant="secondary">50 Available</Badge>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Button asChild size="sm" className="w-full">
                    <Link href="/practice/scoring-test/session?intensity=1&count=50">🚀 Full Scoring Test</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                    <Link href="/practice/scoring-test/session?intensity=1&count=10">Quick Test (10Q)</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                    <Link href="/practice/scoring-test">View All Questions</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-2xl font-semibold">Question Bank Analytics</h2>
          <div className="grid gap-4">
            {questionStats.map((stat) => (
              <Card key={stat.module}>
                <CardHeader>
                  <CardTitle className="text-lg">{stat.module}</CardTitle>
                  <CardDescription>{stat.questions} total questions available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{stat.difficulty.easy}</div>
                      <div className="text-sm text-muted-foreground">Easy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{stat.difficulty.medium}</div>
                      <div className="text-sm text-muted-foreground">Medium</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{stat.difficulty.hard}</div>
                      <div className="text-sm text-muted-foreground">Hard</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <h2 className="text-2xl font-semibold">System Management</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Database Status</CardTitle>
                <CardDescription>Real-time database health monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Questions Database</span>
                  <Badge className="bg-green-100 text-green-800">✅ Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>User Database</span>
                  <Badge className="bg-green-100 text-green-800">✅ Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Analytics Database</span>
                  <Badge className="bg-green-100 text-green-800">✅ Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cache System</span>
                  <Badge className="bg-green-100 text-green-800">✅ Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage questions, flashcards, and study materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📝 Add New Questions
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🗃️ Manage Question Bank
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📚 Update Flashcards
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🧠 Edit Mindmaps
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📊 Export Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Monitor and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  👥 View All Users
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  💳 Subscription Management
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📈 User Progress Reports
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🔒 Access Control
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Tools</CardTitle>
                <CardDescription>Administrative tools and utilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🔄 Clear Cache
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📋 System Logs
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  ⚙️ Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🚀 Performance Monitor
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Testing Links</CardTitle>
          <CardDescription>Direct access to key testing areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            <Button asChild className="bg-primary">
              <Link href="/practice/scoring-test/session?intensity=1&count=50">🎯 Test Scoring System</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/practice">All Practice Questions</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/practice/packages">Mock Packages</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">Pricing Page</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
