"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  FileText,
  Layers,
  Search,
  Download,
  Star,
  Eye,
  ChevronRight,
  Brain,
  CheckSquare,
  Target,
} from "lucide-react"
import Link from "next/link"

const studyMaterials = [
  {
    id: "contract-formation",
    module: "FLK1 - Contract Law",
    topic: "Formation",
    title: "Contract Formation Essentials",
    description: "Comprehensive guide to offer, acceptance, consideration, and intention to create legal relations",
    type: "notes",
    pages: 24,
    lastUpdated: "2024-01-15",
    difficulty: "Intermediate",
    flashcards: 45,
    downloads: 1247,
    rating: 4.8,
    subtopics: ["Offer", "Acceptance", "Consideration", "Intention", "Certainty"],
    mindMapAvailable: true,
    checklistItems: 12,
    completedItems: 8,
    studyTime: "2.5 hours",
  },
  {
    id: "tort-negligence",
    module: "FLK1 - Tort Law",
    topic: "Negligence",
    title: "Negligence: Duty, Breach & Causation",
    description: "Complete analysis of negligence elements with case law and practical examples",
    type: "notes",
    pages: 32,
    lastUpdated: "2024-01-12",
    difficulty: "Advanced",
    flashcards: 67,
    downloads: 892,
    rating: 4.9,
    subtopics: ["Duty of Care", "Breach", "Causation", "Remoteness", "Defenses"],
    mindMapAvailable: true,
    checklistItems: 15,
    completedItems: 12,
    studyTime: "3.2 hours",
  },
  {
    id: "property-conveyancing",
    module: "FLK2 - Property Practice",
    topic: "Conveyancing",
    title: "Residential Conveyancing Process",
    description: "Step-by-step guide through the conveyancing process from instruction to completion",
    type: "notes",
    pages: 28,
    lastUpdated: "2024-01-10",
    difficulty: "Intermediate",
    flashcards: 52,
    downloads: 634,
    rating: 4.7,
    subtopics: ["Pre-contract", "Exchange", "Completion", "Post-completion", "Remedies"],
    mindMapAvailable: true,
    checklistItems: 10,
    completedItems: 6,
    studyTime: "2.8 hours",
  },
  {
    id: "business-company-law",
    module: "FLK1 - Business Law",
    topic: "Company Law",
    title: "Company Formation & Management",
    description: "Directors' duties, shareholder rights, and corporate governance principles",
    type: "notes",
    pages: 36,
    lastUpdated: "2024-01-08",
    difficulty: "Advanced",
    flashcards: 78,
    downloads: 1156,
    rating: 4.6,
    subtopics: ["Formation", "Directors' Duties", "Shareholder Rights", "Meetings", "Accounts"],
    mindMapAvailable: true,
    checklistItems: 18,
    completedItems: 14,
    studyTime: "4.1 hours",
  },
  {
    id: "dispute-civil-procedure",
    module: "FLK1 - Dispute Resolution",
    topic: "Civil Procedure",
    title: "Civil Litigation Procedure",
    description: "CPR rules, case management, and procedural requirements for civil claims",
    type: "notes",
    pages: 30,
    lastUpdated: "2024-01-05",
    difficulty: "Intermediate",
    flashcards: 58,
    downloads: 743,
    rating: 4.5,
    subtopics: ["Pre-action", "Statements of Case", "Case Management", "Trial", "Enforcement"],
    mindMapAvailable: true,
    checklistItems: 13,
    completedItems: 9,
    studyTime: "3.0 hours",
  },
  {
    id: "litigation-criminal",
    module: "FLK2 - Litigation",
    topic: "Criminal Procedure",
    title: "Criminal Litigation Essentials",
    description: "Police powers, court procedures, and sentencing in criminal cases",
    type: "notes",
    pages: 26,
    lastUpdated: "2024-01-03",
    difficulty: "Intermediate",
    flashcards: 41,
    downloads: 567,
    rating: 4.4,
    subtopics: ["Police Powers", "Court Procedure", "Evidence", "Sentencing", "Appeals"],
    mindMapAvailable: true,
    checklistItems: 11,
    completedItems: 7,
    studyTime: "2.3 hours",
  },
  // FLK1 MODULES - Complete SRA Coverage
  {
    id: "business-law-practice",
    module: "FLK1 - Business Law and Practice",
    topic: "Business Law and Practice",
    title: "Business Law and Practice Comprehensive Guide",
    description:
      "Complete coverage of business organizations, stakeholder interests, financing, taxation, and insolvency",
    type: "notes",
    pages: 45,
    lastUpdated: "2024-01-15",
    difficulty: "Advanced",
    flashcards: 89,
    downloads: 1247,
    rating: 4.8,
    subtopics: [
      "Starting a Business",
      "Managing a Business",
      "Stakeholder Interests",
      "Business Financing",
      "Business Taxation",
      "Business Termination",
      "Insolvency",
    ],
    mindMapAvailable: true,
    checklistItems: 20,
    completedItems: 15,
    studyTime: "4.5 hours",
  },
  {
    id: "dispute-resolution",
    module: "FLK1 - Dispute Resolution",
    topic: "Dispute Resolution",
    title: "Dispute Resolution Complete Guide",
    description:
      "Analysis of claims, arbitration, mediation, litigation, pre-action steps, case management, evidence, and costs",
    type: "notes",
    pages: 38,
    lastUpdated: "2024-01-14",
    difficulty: "Advanced",
    flashcards: 76,
    downloads: 1156,
    rating: 4.7,
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
    mindMapAvailable: true,
    checklistItems: 22,
    completedItems: 18,
    studyTime: "4.8 hours",
  },
  {
    id: "contract-law",
    module: "FLK1 - Contract Law",
    topic: "Contract Law",
    title: "Contract Law Core Principles",
    description:
      "Formation, contents, causation, remoteness, vitiating elements, discharge, remedies, and unjust enrichment",
    type: "notes",
    pages: 42,
    lastUpdated: "2024-01-13",
    difficulty: "Advanced",
    flashcards: 85,
    downloads: 1389,
    rating: 4.9,
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
    mindMapAvailable: true,
    checklistItems: 18,
    completedItems: 14,
    studyTime: "4.2 hours",
  },
  {
    id: "tort-law",
    module: "FLK1 - Tort Law",
    topic: "Tort Law",
    title: "Tort Law Complete Coverage",
    description:
      "Negligence, remedies, defences, occupiers' liability, product liability, nuisance, and Rylands v Fletcher",
    type: "notes",
    pages: 40,
    lastUpdated: "2024-01-12",
    difficulty: "Advanced",
    flashcards: 82,
    downloads: 1278,
    rating: 4.8,
    subtopics: [
      "Negligence",
      "Remedies and Defences",
      "Occupiers' Liability",
      "Product Liability",
      "Nuisance",
      "Rylands v Fletcher Rule",
    ],
    mindMapAvailable: true,
    checklistItems: 16,
    completedItems: 12,
    studyTime: "4.0 hours",
  },
  {
    id: "legal-system-england-wales",
    module: "FLK1 - Legal System of England and Wales",
    topic: "Legal System",
    title: "Legal System of England and Wales",
    description: "Courts system, case law development, primary legislation, and statutory interpretation",
    type: "notes",
    pages: 35,
    lastUpdated: "2024-01-11",
    difficulty: "Intermediate",
    flashcards: 68,
    downloads: 945,
    rating: 4.6,
    subtopics: ["Courts System", "Case Law Development", "Primary Legislation", "Statutory Interpretation"],
    mindMapAvailable: true,
    checklistItems: 14,
    completedItems: 10,
    studyTime: "3.5 hours",
  },
  {
    id: "constitutional-administrative-eu-law",
    module: "FLK1 - Constitutional and Administrative Law and EU Law",
    topic: "Public Law",
    title: "Constitutional, Administrative and EU Law",
    description: "Constitutional framework, separation of powers, judicial review, human rights, and EU law impact",
    type: "notes",
    pages: 48,
    lastUpdated: "2024-01-10",
    difficulty: "Advanced",
    flashcards: 95,
    downloads: 1067,
    rating: 4.7,
    subtopics: ["Constitutional Framework", "Separation of Powers", "Judicial Review", "Human Rights", "EU Law Impact"],
    mindMapAvailable: true,
    checklistItems: 24,
    completedItems: 19,
    studyTime: "5.0 hours",
  },
  {
    id: "legal-services",
    module: "FLK1 - Legal Services",
    topic: "Legal Services",
    title: "Legal Services Regulation and Funding",
    description: "SRA regulatory role and funding options for legal services",
    type: "notes",
    pages: 28,
    lastUpdated: "2024-01-09",
    difficulty: "Intermediate",
    flashcards: 52,
    downloads: 734,
    rating: 4.5,
    subtopics: ["SRA Regulatory Role", "Funding Options for Legal Services"],
    mindMapAvailable: true,
    checklistItems: 12,
    completedItems: 8,
    studyTime: "2.8 hours",
  },
  // FLK2 MODULES - Complete SRA Coverage
  {
    id: "property-practice",
    module: "FLK2 - Property Practice",
    topic: "Property Practice",
    title: "Property Practice Complete Guide",
    description:
      "Property transactions, title investigation, searches, exchange, completion, commercial leases, and taxation",
    type: "notes",
    pages: 52,
    lastUpdated: "2024-01-08",
    difficulty: "Advanced",
    flashcards: 105,
    downloads: 1456,
    rating: 4.9,
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
    mindMapAvailable: true,
    checklistItems: 26,
    completedItems: 20,
    studyTime: "5.5 hours",
  },
  {
    id: "wills-administration-estates",
    module: "FLK2 - Wills and Administration of Estates",
    topic: "Wills and Estates",
    title: "Wills and Administration of Estates",
    description:
      "Will validity, interpretation, estate distribution, grants of representation, inheritance tax, and administration",
    type: "notes",
    pages: 46,
    lastUpdated: "2024-01-07",
    difficulty: "Advanced",
    flashcards: 92,
    downloads: 1234,
    rating: 4.8,
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
    mindMapAvailable: true,
    checklistItems: 22,
    completedItems: 17,
    studyTime: "4.8 hours",
  },
  {
    id: "solicitors-accounts",
    module: "FLK2 - Solicitors Accounts",
    topic: "Solicitors Accounts",
    title: "Solicitors Accounts Rules and Practice",
    description:
      "Client money transactions, ledger operations, SRA Accounts Rules, accounting entries, bills, and record-keeping",
    type: "notes",
    pages: 38,
    lastUpdated: "2024-01-06",
    difficulty: "Advanced",
    flashcards: 78,
    downloads: 987,
    rating: 4.6,
    subtopics: [
      "Client Money Transactions",
      "Ledger and Bank Account Operation",
      "SRA Accounts Rules Breaches",
      "Accounting Entries",
      "Bills",
      "Record-keeping",
    ],
    mindMapAvailable: true,
    checklistItems: 18,
    completedItems: 14,
    studyTime: "4.0 hours",
  },
  {
    id: "land-law",
    module: "FLK2 - Land Law",
    topic: "Land Law",
    title: "Land Law Core Principles",
    description:
      "Registered and unregistered land, freehold and leasehold estates, legal and equitable interests, landlord and tenant, co-ownership",
    type: "notes",
    pages: 44,
    lastUpdated: "2024-01-05",
    difficulty: "Advanced",
    flashcards: 88,
    downloads: 1345,
    rating: 4.8,
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
    mindMapAvailable: true,
    checklistItems: 20,
    completedItems: 15,
    studyTime: "4.5 hours",
  },
  {
    id: "trusts",
    module: "FLK2 - Trusts",
    topic: "Trusts",
    title: "Trusts Law Complete Guide",
    description:
      "Express and implied trusts, fiduciary relationships, trustees' duties, powers, liability, and equitable remedies",
    type: "notes",
    pages: 42,
    lastUpdated: "2024-01-04",
    difficulty: "Advanced",
    flashcards: 84,
    downloads: 1123,
    rating: 4.7,
    subtopics: [
      "Express Trusts",
      "Implied Trusts",
      "Fiduciary Relationships",
      "Trustees' Duties",
      "Trustees' Powers",
      "Trustees' Liability",
      "Equitable Remedies",
    ],
    mindMapAvailable: true,
    checklistItems: 19,
    completedItems: 14,
    studyTime: "4.3 hours",
  },
  {
    id: "criminal-law-practice",
    module: "FLK2 - Criminal Law and Practice",
    topic: "Criminal Law and Practice",
    title: "Criminal Law and Practice Complete Coverage",
    description:
      "Core principles of criminal liability, police station procedures, pre-trial considerations, client objectives, and court trials",
    type: "notes",
    pages: 50,
    lastUpdated: "2024-01-03",
    difficulty: "Advanced",
    flashcards: 98,
    downloads: 1289,
    rating: 4.8,
    subtopics: [
      "Core Principles of Criminal Liability",
      "Police Station Procedures",
      "Pre-trial Considerations",
      "Meeting Client Objectives",
      "Magistrates' Court Trials",
      "Crown Court Trials",
    ],
    mindMapAvailable: true,
    checklistItems: 24,
    completedItems: 18,
    studyTime: "5.2 hours",
  },
]

const recentlyViewed = [
  { id: "contract-formation", title: "Contract Formation Essentials", viewedAt: "2 hours ago" },
  { id: "tort-negligence", title: "Negligence: Duty, Breach & Causation", viewedAt: "Yesterday" },
  { id: "property-conveyancing", title: "Residential Conveyancing Process", viewedAt: "2 days ago" },
]

const bookmarked = [
  { id: "business-company-law", title: "Company Formation & Management" },
  { id: "contract-formation", title: "Contract Formation Essentials" },
]

export default function StudyMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModule, setSelectedModule] = useState("all")

  const modules = [
    "all",
    "FLK1 - Contract Law",
    "FLK1 - Tort Law",
    "FLK1 - Business Law",
    "FLK1 - Dispute Resolution",
    "FLK2 - Property Practice",
    "FLK2 - Litigation",
    "FLK1 - Business Law and Practice",
    "FLK1 - Dispute Resolution",
    "FLK1 - Contract Law",
    "FLK1 - Tort Law",
    "FLK1 - Legal System of England and Wales",
    "FLK1 - Constitutional and Administrative Law and EU Law",
    "FLK1 - Legal Services",
    "FLK2 - Property Practice",
    "FLK2 - Wills and Administration of Estates",
    "FLK2 - Solicitors Accounts",
    "FLK2 - Land Law",
    "FLK2 - Trusts",
    "FLK2 - Criminal Law and Practice",
  ]

  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.topic.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = selectedModule === "all" || material.module === selectedModule
    return matchesSearch && matchesModule
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-blue-100 text-blue-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SQE Forge</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Study Materials</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Materials</h1>
          <p className="text-muted-foreground">
            Comprehensive revision notes, mind maps, flashcards, and progress checklists for all SQE modules
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search study materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module === "all" ? "All Modules" : module}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Materials</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="mindmaps">Mind Maps</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                <TabsTrigger value="checklists">Checklists</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="border-border hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{material.module}</Badge>
                              <Badge className={getDifficultyColor(material.difficulty)}>{material.difficulty}</Badge>
                              {material.mindMapAvailable && (
                                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                  <Brain className="w-3 h-3 mr-1" />
                                  Mind Map
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl mb-2">{material.title}</CardTitle>
                            <CardDescription className="text-base">{material.description}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Progress */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground font-medium">
                                {material.completedItems}/{material.checklistItems} completed
                              </span>
                            </div>
                            <Progress
                              value={(material.completedItems / material.checklistItems) * 100}
                              className="h-2"
                            />
                          </div>

                          {/* Subtopics */}
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Subtopics:</h4>
                            <div className="flex flex-wrap gap-1">
                              {material.subtopics.map((subtopic, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {subtopic}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{material.pages} pages</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{material.flashcards} cards</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{material.checklistItems} items</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{material.studyTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-muted-foreground">{material.rating}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button asChild size="sm">
                              <Link href={`/study/${material.id}`}>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Read Notes
                              </Link>
                            </Button>
                            <Button variant="outline" asChild size="sm">
                              <Link href={`/study/${material.id}/mindmap`}>
                                <Brain className="w-4 h-4 mr-2" />
                                Mind Map
                              </Link>
                            </Button>
                            <Button variant="outline" asChild size="sm">
                              <Link href={`/study/${material.id}/flashcards`}>
                                <Layers className="w-4 h-4 mr-2" />
                                Flashcards
                              </Link>
                            </Button>
                            <Button variant="outline" asChild size="sm">
                              <Link href={`/study/${material.id}/checklist`}>
                                <CheckSquare className="w-4 h-4 mr-2" />
                                Checklist
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Mind Maps Tab */}
              <TabsContent value="mindmaps" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMaterials
                    .filter((m) => m.mindMapAvailable)
                    .map((material) => (
                      <Card key={material.id} className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-600" />
                            {material.topic}
                          </CardTitle>
                          <CardDescription>{material.module}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                              <div className="text-center text-sm text-muted-foreground mb-2">Visual Learning Map</div>
                              <div className="flex items-center justify-center space-x-2">
                                {material.subtopics.slice(0, 3).map((subtopic, index) => (
                                  <div key={index} className="bg-white rounded-full px-3 py-1 text-xs border">
                                    {subtopic}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Button className="w-full" asChild>
                              <Link href={`/study/${material.id}/mindmap`}>
                                <Brain className="w-4 h-4 mr-2" />
                                View Interactive Mind Map
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Checklists Tab */}
              <TabsContent value="checklists" className="space-y-6">
                <div className="grid gap-6">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <CheckSquare className="w-5 h-5 text-green-600" />
                              {material.title}
                            </CardTitle>
                            <CardDescription>{material.module}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-foreground">
                              {Math.round((material.completedItems / material.checklistItems) * 100)}%
                            </div>
                            <div className="text-xs text-muted-foreground">Complete</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress value={(material.completedItems / material.checklistItems) * 100} className="h-3" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {material.completedItems} of {material.checklistItems} items completed
                            </span>
                            <span className="text-muted-foreground">Est. {material.studyTime} remaining</span>
                          </div>
                          <Button asChild>
                            <Link href={`/study/${material.id}/checklist`}>
                              <CheckSquare className="w-4 h-4 mr-2" />
                              Continue Checklist
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                <div className="grid gap-6">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="border-border">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{material.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{material.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{material.pages} pages</span>
                              <span>Updated {material.lastUpdated}</span>
                              <span>{material.downloads} downloads</span>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/study/${material.id}`}>
                              Read
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Flashcards Tab */}
              <TabsContent value="flashcards" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">{material.topic}</CardTitle>
                        <CardDescription>{material.module}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Flashcards</span>
                            <span className="font-medium text-foreground">{material.flashcards}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {material.subtopics.slice(0, 3).map((subtopic, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {subtopic}
                              </Badge>
                            ))}
                            {material.subtopics.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{material.subtopics.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <Button className="w-full" asChild>
                            <Link href={`/study/${material.id}/flashcards`}>
                              <Layers className="w-4 h-4 mr-2" />
                              Study Flashcards
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recently Viewed */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Recently Viewed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentlyViewed.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.viewedAt}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  View All
                </Button>
              </CardContent>
            </Card>

            {/* Bookmarked */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Bookmarked</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookmarked.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  View All
                </Button>
              </CardContent>
            </Card>

            {/* Study Tip */}
            <Card className="border-border bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-secondary">Study Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Use flashcards for active recall. Review them regularly using spaced repetition for better retention.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
