"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  ArrowRight,
  Filter,
  RotateCcw,
  CheckCircle,
  Building2,
  FileText,
  Scale,
  Home,
  Gavel,
  Users,
} from "lucide-react"
import Link from "next/link"
import { getQuestionsByModule } from "@/lib/questions-database"

const modules = [
  {
    id: "business-law-practice",
    name: "Business Law & Practice",
    description: "Company formation, directors' duties, corporate governance, insolvency",
    questions: 3000,
    completed: 0,
    averageScore: 0,
    icon: Building2,
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-900",
    descColor: "text-blue-700",
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
  {
    id: "contract-law-practice",
    name: "Contract Law",
    description: "Formation, terms, breach, remedies, frustration, misrepresentation",
    questions: 3000,
    completed: 0,
    averageScore: 0,
    icon: FileText,
    color: "bg-green-50 border-green-200",
    textColor: "text-green-900",
    descColor: "text-green-700",
    topics: ["Formation", "Terms", "Breach", "Remedies", "Frustration", "Misrepresentation"],
  },
  {
    id: "tort-law-practice",
    name: "Tort Law",
    description: "Negligence, occupiers' liability, nuisance, defamation, economic torts",
    questions: 3000,
    completed: 0,
    averageScore: 0,
    icon: Scale,
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-900",
    descColor: "text-purple-700",
    topics: ["Negligence", "Occupiers' Liability", "Nuisance", "Defamation", "Economic Torts", "Vicarious Liability"],
  },
  {
    id: "property-law-practice",
    name: "Property Law",
    description: "Freehold, leasehold, easements, covenants, mortgages, registration",
    questions: 3000,
    completed: 0,
    averageScore: 0,
    icon: Home,
    color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-900",
    descColor: "text-orange-700",
    topics: ["Freehold", "Leasehold", "Easements", "Covenants", "Mortgages", "Registration"],
  },
  {
    id: "criminal-law-practice",
    name: "Criminal Law & Practice",
    description: "Actus reus, mens rea, offences, defences, procedure, sentencing",
    questions: 3000,
    completed: 0,
    averageScore: 0,
    icon: Gavel,
    color: "bg-red-50 border-red-200",
    textColor: "text-red-900",
    descColor: "text-red-700",
    topics: ["Actus Reus", "Mens Rea", "Murder", "Manslaughter", "Theft", "Defences"],
  },
  {
    id: "dispute-resolution",
    name: "Dispute Resolution",
    description: "Civil procedure, evidence, costs, appeals, enforcement",
    questions: 2000,
    completed: 0,
    averageScore: 0,
    icon: Users,
    color: "bg-teal-50 border-teal-200",
    textColor: "text-teal-900",
    descColor: "text-teal-700",
    topics: ["Civil Procedure", "Evidence", "Costs", "Appeals", "Enforcement", "ADR"],
  },
]

const intensityLevels = [
  {
    level: 1,
    name: "Foundation",
    description: "Basic concepts and straightforward scenarios",
    color: "bg-green-100 text-green-800",
    questions: "Easy questions to build confidence",
  },
  {
    level: 2,
    name: "Intermediate",
    description: "Moderate complexity with multiple legal issues",
    color: "bg-blue-100 text-blue-800",
    questions: "Standard exam-level difficulty",
  },
  {
    level: 3,
    name: "Advanced",
    description: "Complex scenarios requiring detailed analysis",
    color: "bg-orange-100 text-orange-800",
    questions: "Challenging multi-layered problems",
  },
  {
    level: 4,
    name: "Expert",
    description: "Extremely difficult edge cases and complex law",
    color: "bg-red-100 text-red-800",
    questions: "Most challenging questions available",
  },
]

const sampleMCQs = [
  {
    id: 1,
    module: "Contract Law",
    intensity: "Foundation",
    question:
      "Sarah agrees to buy a car from John for £5,000. Before payment, John changes his mind and refuses to sell. What is Sarah's legal position?",
    options: [
      "A) Sarah has no legal remedy as no money changed hands",
      "B) Sarah can sue for breach of contract and claim damages",
      "C) Sarah can force John to sell the car through specific performance",
      "D) Sarah can only claim her expenses incurred",
      "E) Sarah must accept John's withdrawal as it's his property",
    ],
    correctAnswer: "B",
    explanation:
      "A valid contract exists when there is offer, acceptance, consideration and intention to create legal relations. John's refusal to sell constitutes breach of contract, allowing Sarah to claim damages for her loss.",
  },
  {
    id: 2,
    module: "Tort Law",
    intensity: "Foundation",
    question:
      "Dr. Smith, a GP, is off duty and walking through a shopping centre when he sees a man collapse. Dr. Smith continues walking without stopping to help. The man suffers permanent brain damage.",
    options: [
      "A) Dr. Smith owes a duty of care because he is a qualified doctor",
      "B) Dr. Smith owes a duty of care because he witnessed the emergency",
      "C) Dr. Smith owes no duty of care as he was off duty",
      "D) English law does not impose a duty to rescue strangers",
      "E) Dr. Smith's duty depends on the severity of the emergency",
    ],
    correctAnswer: "D",
    explanation:
      "English law generally imposes no duty to rescue strangers (Capital & Counties plc v Hampshire CC). A doctor's professional duty only extends to patients with whom there is a doctor-patient relationship.",
  },
  {
    id: 3,
    module: "Business Law",
    intensity: "Intermediate",
    question:
      "Sarah is a director of TechCorp Ltd. She discovers a competitor is struggling and personally buys their shares at low price, then proposes TechCorp acquire them.",
    options: [
      "A) No breach as she acted in personal capacity",
      "B) No breach as she intends to benefit TechCorp",
      "C) Breach of duty to avoid conflicts of interest",
      "D) Breach of duty to exercise independent judgment",
      "E) No breach as directors can make personal investments",
    ],
    correctAnswer: "C",
    explanation:
      "Sarah breached s.175 Companies Act 2006 (duty to avoid conflicts of interest). She used her position to gain information about acquisition opportunities and exploited this for personal gain without board approval.",
  },
  {
    id: 4,
    module: "Property Law",
    intensity: "Foundation",
    question:
      "Mark agrees to buy Lisa's house for £300,000. They shake hands and Mark pays £5,000 deposit. Lisa then receives a higher offer and decides to sell to another buyer instead.",
    options: [
      "A) Mark can enforce the oral contract",
      "B) The deposit creates binding legal obligations",
      "C) Contracts for sale of land must be in writing",
      "D) Lisa is entitled to accept the higher offer",
      "E) The handshake creates a valid agreement",
    ],
    correctAnswer: "C",
    explanation:
      "Under s.2 Law of Property (Miscellaneous Provisions) Act 1989, contracts for the sale of land must be in writing and signed by both parties. Mark can recover his deposit but cannot force completion.",
  },
  {
    id: 5,
    module: "Criminal Law",
    intensity: "Intermediate",
    question:
      "PC Jones stops David at 2am near a burglary scene. David wears dark clothing and matches the suspect description. What powers does PC Jones have under PACE?",
    options: [
      "A) Can arrest David immediately based on reasonable suspicion",
      "B) Can search David but cannot arrest without more evidence",
      "C) Can stop and search David under s.1 PACE with reasonable grounds",
      "D) Has no powers as David hasn't committed an offence in his presence",
      "E) Can detain David for questioning for up to 30 minutes",
    ],
    correctAnswer: "C",
    explanation:
      "Under s.1 PACE 1984, PC Jones can stop and search David if he has reasonable grounds to suspect he is carrying stolen goods or prohibited items. The circumstances could provide reasonable grounds for a search.",
  },
]

export default function PracticePage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null)
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null)
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(20)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [practiceMode, setPracticeMode] = useState<"selection" | "practice">("selection")

  const currentQuestion = sampleMCQs[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    console.log("[v0] Answer selected:", answer)
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    console.log("[v0] Submitting answer:", selectedAnswer)
    if (!selectedAnswer) return
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    console.log("[v0] Moving to next question")
    if (currentQuestionIndex < sampleMCQs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // End of practice session
      setPracticeMode("selection")
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const startPractice = () => {
    console.log("[v0] Starting practice mode")
    setPracticeMode("practice")
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const selectedModuleData = modules.find((m) => m.id === selectedModule)

  const ModuleSelectionCard = () => {
    if (!selectedModule) return null
    const module = modules.find((m) => m.id === selectedModule)!

    const actualQuestions = getQuestionsByModule(selectedModule)
    const actualQuestionCount = actualQuestions.length

    return (
      <Card className="border-secondary bg-secondary/5 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-secondary" />
            Ready to Practice?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-background p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-3">{module.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Questions:</span>
                <span className="font-medium text-foreground">{actualQuestionCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Topics:</span>
                <span className="font-medium text-foreground">{getSubtopicsForModule(selectedModule).length}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <Button className="w-full" asChild>
              <Link href={`/practice/${selectedModule}`}>
                Start Practice Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href={`/practice/${selectedModule}/full-mock`}>Take Full Mock</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (practiceMode === "practice") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Practice</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">Sample Questions</span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  Question {currentQuestionIndex + 1} of {sampleMCQs.length}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => setPracticeMode("selection")}>
                  Exit Practice
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{currentQuestion.module}</Badge>
                  <Badge variant="outline">{currentQuestion.intensity}</Badge>
                </div>
                <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-foreground leading-relaxed">{currentQuestion.question}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Select your answer:</h3>
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                          selectedAnswer === option.charAt(0)
                            ? "border-secondary bg-secondary/10"
                            : "border-border hover:bg-card"
                        } ${
                          showExplanation && option.charAt(0) === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : showExplanation &&
                                selectedAnswer === option.charAt(0) &&
                                option.charAt(0) !== currentQuestion.correctAnswer
                              ? "border-red-500 bg-red-50"
                              : ""
                        }`}
                        onClick={() => {
                          console.log("[v0] Option clicked:", option.charAt(0))
                          if (!showExplanation) handleAnswerSelect(option.charAt(0))
                        }}
                      >
                        <span className="text-foreground">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {showExplanation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                    <p className="text-blue-800">{currentQuestion.explanation}</p>
                    <div className="mt-3">
                      <Badge
                        className={
                          selectedAnswer === currentQuestion.correctAnswer
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect"}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  {!showExplanation ? (
                    <Button
                      onClick={() => {
                        console.log("[v0] Submit button clicked")
                        handleSubmitAnswer()
                      }}
                      disabled={!selectedAnswer}
                      className="min-w-32"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        console.log("[v0] Next button clicked")
                        handleNextQuestion()
                      }}
                      className="min-w-32"
                    >
                      {currentQuestionIndex < sampleMCQs.length - 1 ? "Next Question" : "Finish Practice"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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
              <span className="text-foreground font-medium">Practice Questions</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Progress
              </Button>
              <Button variant="outline" asChild>
                <Link href="/practice/packages">View Mock Packages</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/practice/analytics">Analytics</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/practice/bookmarks">Bookmarks</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/practice/custom">Custom Practice</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/practice/leaderboard">Leaderboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Practice Options</h2>
            <Button variant="outline" asChild>
              <Link href="/practice/packages">View Mock Packages</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">Choose between subscription practice or one-time mock packages</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Ready to start</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions Attempted</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">0% completion rate</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">Start practicing to see scores</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="subtopics">Subtopics</TabsTrigger>
            <TabsTrigger value="mocks">Mini Mocks</TabsTrigger>
            <TabsTrigger value="packages">Mock Packages</TabsTrigger>
            <TabsTrigger value="intensity">Intensity</TabsTrigger>
            <TabsTrigger value="blackletter">Black Letter Law</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            {/* Module Selection */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Select Module</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => {
                  const completionRate = Math.round((module.completed / module.questions) * 100)

                  const actualQuestions = getQuestionsByModule(module.id)
                  const actualQuestionCount = actualQuestions.length

                  return (
                    <Card
                      key={module.id}
                      className={`border-border cursor-pointer transition-all hover:shadow-md ${
                        selectedModule === module.id ? "ring-2 ring-secondary" : ""
                      }`}
                      onClick={() => setSelectedModule(module.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{module.name}</CardTitle>
                            <CardDescription className="text-sm mb-3">{module.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {completionRate}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">
                              {module.completed}/{actualQuestionCount}
                            </span>
                          </div>
                          <Progress value={completionRate} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Average Score</span>
                          <span className="font-medium text-foreground">{module.averageScore}%</span>
                        </div>

                        <div className="space-y-2">
                          <span className="text-sm font-medium text-foreground">Topics:</span>
                          <div className="flex flex-wrap gap-1">
                            {module.topics.slice(0, 3).map((topic, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {typeof topic === "string" ? topic : topic.name}
                              </Badge>
                            ))}
                            {module.topics.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{module.topics.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
            <ModuleSelectionCard />
          </TabsContent>

          <TabsContent value="subtopics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Practice by Subtopic</h2>

              {!selectedModule ? (
                <Card className="border-border">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Please select a module first to see available subtopics
                    </p>
                    <Button onClick={() => setSelectedModule(modules[0].id)}>Select Module</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {modules.find((m) => m.id === selectedModule)?.name} Subtopics
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => setSelectedModule("")}>
                      Change Module
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getSubtopicsForModule(selectedModule).map((subtopic, index) => (
                      <Card key={index} className="border-border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">{subtopic}</h4>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" asChild>
                              <Link href={`/practice/${selectedModule}/topic/${encodeURIComponent(subtopic)}`}>
                                Practice
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/practice/${selectedModule}/mini-mock/${encodeURIComponent(subtopic)}`}>
                                Mini Mock
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="mocks" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Mini Mock Exams</h2>
              <p className="text-muted-foreground mb-6">
                Take focused mini mock exams on specific topics (30-45 questions, 60-90 minutes)
              </p>

              {!selectedModule ? (
                <Card className="border-border">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Please select a module first to see available mini mocks
                    </p>
                    <Button onClick={() => setSelectedModule(modules[0].id)}>Select Module</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {modules.find((m) => m.id === selectedModule)?.name} Mini Mocks
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => setSelectedModule("")}>
                      Change Module
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getSubtopicsForModule(selectedModule).map((subtopic, index) => (
                      <Card key={index} className="border-border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">60-90 mins</span>
                          </div>
                          <h4 className="font-medium text-foreground mb-2">{subtopic}</h4>
                          <p className="text-sm text-muted-foreground mb-3">30-45 questions</p>
                          <Button className="w-full" asChild>
                            <Link href={`/practice/${selectedModule}/mini-mock/${encodeURIComponent(subtopic)}`}>
                              Start Mini Mock
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Mock Exam Packages</h2>
              <p className="text-muted-foreground mb-6">
                Complete mock exams simulating real SQE conditions (180 questions, 5 hours)
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      FLK1 Full Mock
                    </CardTitle>
                    <CardDescription>Complete FLK1 assessment covering all topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Questions:</span>
                        <span>180</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span>5 hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pass Mark:</span>
                        <span>60%</span>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/practice/mock/flk1/start">Start FLK1 Mock</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      FLK2 Full Mock
                    </CardTitle>
                    <CardDescription>Complete FLK2 assessment covering all topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Questions:</span>
                        <span>180</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span>5 hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pass Mark:</span>
                        <span>60%</span>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/practice/mock/flk2/start">Start FLK2 Mock</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Module-Specific Mocks */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Module-Specific Mocks</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modules.map((module) => (
                    <Card key={module.id} className="border-border">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{module.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">180 questions • 5 hours</p>
                        <Button className="w-full" size="sm" asChild>
                          <Link href={`/practice/mock/${module.id}/start`}>Start Mock</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blackletter" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Black Letter Law</h2>
              <p className="text-muted-foreground mb-6">Study core legal principles, rules, and statutory provisions</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                  <Card key={module.id} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground mb-2">{module.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">Core principles and rules</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/study/${module.id}/notes`}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Notes
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/practice/flashcards/${getFlashcardCategoryForModule(module.id)}`}>
                            Flashcards
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Mind Maps</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modules.map((module) => (
                    <Card key={`mindmap-${module.id}`} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{module.name} Mind Maps</h4>
                        <p className="text-sm text-muted-foreground mb-3">Visual concept maps</p>
                        <div className="flex flex-wrap gap-1">
                          {getSubtopicsForModule(module.id)
                            .slice(0, 3)
                            .map((topic, index) => (
                              <Button key={index} size="sm" variant="outline" asChild>
                                <Link
                                  href={`/practice/${module.id}/mindmap/${encodeURIComponent(topic.toLowerCase())}`}
                                >
                                  {topic}
                                </Link>
                              </Button>
                            ))}
                        </div>
                        {getSubtopicsForModule(module.id).length === 0 && (
                          <p className="text-xs text-muted-foreground">Mind maps coming soon</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const getFlashcardCategoryForModule = (moduleId: string): string => {
  const categoryMap: Record<string, string> = {
    "business-law-practice": "business-law-concepts",
    "contract-law-practice": "contract-law-principles",
    "tort-law-practice": "tort-law-fundamentals",
    "property-law-practice": "property-law-essentials",
    "criminal-law-practice": "criminal-law-principles",
    "dispute-resolution": "analysis-of-claims",
  }

  return categoryMap[moduleId] || "contract-law-principles"
}

const getSubtopicsForModule = (moduleId: string): string[] => {
  const subtopicMap: Record<string, string[]> = {
    "business-law-practice": [
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
    "contract-law-practice": [
      "Formation",
      "Terms",
      "Breach",
      "Remedies",
      "Frustration",
      "Misrepresentation",
      "Duress",
      "Undue Influence",
      "Mistake",
      "Illegality",
      "Privity",
      "Discharge",
    ],
    "tort-law-practice": [
      "Negligence",
      "Occupiers' Liability",
      "Nuisance",
      "Defamation",
      "Trespass",
      "Economic Torts",
      "Vicarious Liability",
      "Product Liability",
      "Privacy",
      "Harassment",
    ],
    "property-law-practice": [
      "Freehold",
      "Leasehold",
      "Easements",
      "Covenants",
      "Mortgages",
      "Co-ownership",
      "Trusts of Land",
      "Adverse Possession",
      "Registration",
      "Conveyancing",
    ],
    "criminal-law-practice": [
      "Actus Reus",
      "Mens Rea",
      "Murder",
      "Manslaughter",
      "Assault",
      "Theft",
      "Fraud",
      "Criminal Damage",
      "Defences",
      "Inchoate Offences",
      "Participation",
      "Sentencing",
    ],
    "dispute-resolution": [
      "Civil Procedure",
      "Evidence",
      "Costs",
      "Appeals",
      "Enforcement",
      "Alternative Dispute Resolution",
      "Case Management",
      "Interim Applications",
    ],
  }

  return subtopicMap[moduleId] || []
}
