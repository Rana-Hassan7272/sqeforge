"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, BookOpen, Brain, Target, Clock } from "lucide-react"
import Link from "next/link"
import { getQuestionsByModuleAndIntensity } from "@/lib/questions-database"

export default function PracticeModulePage() {
  const params = useParams()
  const module = params.module as string
  const [selectedIntensity, setSelectedIntensity] = useState(1)
  const [selectedCount, setSelectedCount] = useState(20)

  const moduleConfig = {
    "business-law-practice": {
      title: "Business Law and Practice",
      description: "Corporate law, partnerships, and commercial transactions",
      topics: [
        "Starting a new business",
        "Management and company decision-making",
        "Interests/rights/obligations/powers of stakeholders",
        "Financing a business",
        "Taxation of a business and its stakeholders",
        "Termination of a solvent business",
        "Corporate insolvency",
        "Personal bankruptcy",
        "Partnership law",
        "Limited liability partnerships",
        "Corporate governance",
        "Directors' duties and liabilities",
      ],
    },
    "dispute-resolution": {
      title: "Dispute Resolution",
      description: "Civil litigation, alternative dispute resolution, and court procedures",
      topics: [
        "Options for dispute resolution",
        "Civil claims",
        "Starting/serving/responding to proceedings",
        "Statements of case",
        "Interim applications",
        "Case management",
        "Evidence",
        "Disclosure",
        "Trial",
        "Costs",
        "Appeals",
        "Enforcement",
      ],
    },
    "contract-law": {
      title: "Contract Law",
      description: "Formation, terms, performance, and remedies in contract law",
      topics: [
        "Existence/formation of a contract",
        "Contents of a contract",
        "Causation and remoteness",
        "Vitiating elements",
        "Discharge of contract and remedies",
        "Unjust enrichment",
      ],
    },
    "tort-law": {
      title: "Tort Law",
      description: "Negligence, nuisance, and other tortious liability",
      topics: [
        "Negligence",
        "Remedies and defences",
        "Occupiers' liability",
        "Product liability",
        "Nuisance and the Rule in Rylands v Fletcher",
      ],
    },
    "legal-system": {
      title: "Legal System of England and Wales",
      description: "Court structure, sources of law, and legal personnel",
      topics: [
        "Courts and judiciary",
        "Precedent",
        "Primary legislation",
        "Statutory interpretation",
        "Application of legislation",
      ],
    },
    "constitutional-law": {
      title: "Constitutional and Administrative Law and EU Law",
      description: "Constitutional principles and administrative law",
      topics: [
        "Core institutions",
        "Legitimacy",
        "Judicial review",
        "Human Rights Act 1998",
        "EU law in UK constitution",
      ],
    },
    "legal-services": {
      title: "Legal Services",
      description: "Professional conduct and regulation",
      topics: [
        "SRA regulatory role",
        "Overriding legal obligations",
        "Equality Act 2010",
        "Money laundering",
        "Financial services",
        "Funding options",
      ],
    },
    "property-practice": {
      title: "Property Practice",
      description: "Residential and commercial property transactions",
      topics: [
        "Key elements of property transactions",
        "Investigation of titles",
        "Pre-contract searches and enquiries",
        "Progressing property transactions to exchange of contracts",
        "Pre-completion steps",
        "Completion and post-completion steps",
        "Grant and assignment of commercial leases",
        "Key lease covenants and breach",
        "Security of tenure",
        "Taxation of property transactions",
      ],
    },
    "wills-estates": {
      title: "Wills and Administration of Estates",
      description: "Estate planning and probate procedures",
      topics: [
        "Wills and Intestacy",
        "Probate and Administration Practice",
        "Taxation – wills and the administration of estates",
      ],
    },
    "solicitors-accounts": {
      title: "Solicitors Accounts",
      description: "Client money handling and accounting rules",
      topics: [
        "Client money",
        "Client account",
        "Interest",
        "Breaches",
        "Record-keeping",
        "Bills",
        "Joint/own accounts",
        "Third-party managed accounts",
        "Accountants' reports",
      ],
    },
    "land-law": {
      title: "Land Law",
      description: "Property rights, registration, and interests in land",
      topics: [
        "Registered and unregistered land",
        "Freehold and leasehold estates",
        "Legal and equitable interests in land",
        "Landlord and tenant",
        "Co-ownership",
      ],
    },
    trusts: {
      title: "Trusts",
      description: "Trust creation, administration, and breach",
      topics: [
        "Express and implied trusts",
        "The fiduciary relationship",
        "Trustees' duties, powers, and liability",
        "Equitable remedies",
      ],
    },
    "criminal-law": {
      title: "Criminal Law and Practice",
      description: "Criminal offenses and procedure",
      topics: [
        "Core principles of criminal liability",
        "Law/procedure/processes at the police station",
        "Pre-trial considerations",
        "Meeting the client's objectives",
        "Magistrates' Court and Crown Court trials",
      ],
    },
    "scoring-test": {
      title: "Scoring System Test",
      description: "Test module for scoring system functionality",
      topics: [
        "Foundation questions",
        "Intermediate questions",
        "Advanced questions",
        "Expert questions",
        "Mixed difficulty",
      ],
    },
  }

  const currentModule = moduleConfig[module as keyof typeof moduleConfig]

  const availableQuestions = getQuestionsByModuleAndIntensity(module, selectedIntensity)
  const actualCount = Math.min(selectedCount, availableQuestions.length)

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Module not found.</p>
            <Button className="mt-4" asChild>
              <Link href="/practice">Back to Practice</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/practice" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Practice</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{currentModule.title}</h1>
            <p className="text-lg text-muted-foreground">{currentModule.description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Topics Covered
                  </CardTitle>
                  <CardDescription>This module covers {currentModule.topics.length} key topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {currentModule.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                        <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="text-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Study Materials
                  </CardTitle>
                  <CardDescription>Additional learning resources for this module</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href={`/practice/${module}/mindmap`}>
                      <Brain className="w-4 h-4 mr-2" />
                      Interactive Mindmaps
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href={`/practice/flashcards/${module}`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Flashcards
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Practice Session
                  </CardTitle>
                  <CardDescription>Configure your practice session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((level) => (
                        <Button
                          key={level}
                          variant={selectedIntensity === level ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedIntensity(level)}
                        >
                          Level {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Number of Questions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[25, 50, 100, 200].map((count) => (
                        <Button
                          key={count}
                          variant={selectedCount === count ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCount(count)}
                          disabled={count > availableQuestions.length}
                        >
                          {count}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-muted-foreground">Available Questions:</span>
                      <span className="text-foreground font-medium">{availableQuestions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-muted-foreground">Selected:</span>
                      <span className="text-foreground font-medium">{actualCount}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-6">
                      <span className="text-muted-foreground">Estimated Time:</span>
                      <span className="text-foreground font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round((actualCount * 90) / 60)} mins
                      </span>
                    </div>

                    <Button className="w-full" asChild disabled={actualCount === 0}>
                      <Link href={`/practice/${module}/session?intensity=${selectedIntensity}&count=${actualCount}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Practice Session
                      </Link>
                    </Button>

                    {actualCount === 0 && (
                      <p className="text-sm text-red-600 mt-2 text-center">
                        No questions available for this configuration
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
