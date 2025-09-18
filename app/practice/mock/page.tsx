"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, BookOpen, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { mockExamConfigs } from "@/lib/questions-database"

const mockExams = [
  {
    id: "flk1-full",
    title: "FLK1 Full Mock Exam",
    description: "Complete SQE1 FLK1 mock exam covering all modules",
    duration: mockExamConfigs.flk1.duration,
    questions: mockExamConfigs.flk1.totalQuestions,
    modules: ["Business Law", "Contract Law", "Tort Law", "Dispute Resolution"],
    difficulty: "Exam Standard",
    attempts: 3,
    bestScore: 78,
    lastAttempt: "2 days ago",
  },
  {
    id: "flk2-full",
    title: "FLK2 Full Mock Exam",
    description: "Complete SQE1 FLK2 mock exam covering property and litigation",
    duration: mockExamConfigs.flk2.duration,
    questions: mockExamConfigs.flk2.totalQuestions,
    modules: ["Property Practice", "Litigation"],
    difficulty: "Exam Standard",
    attempts: 1,
    bestScore: 65,
    lastAttempt: "1 week ago",
  },
  {
    id: "mixed-practice",
    title: "Mixed Practice Mock",
    description: "Shorter practice exam with questions from all areas",
    duration: 120,
    questions: 60,
    modules: ["All Modules"],
    difficulty: "Practice",
    attempts: 5,
    bestScore: 82,
    lastAttempt: "Yesterday",
  },
]

export default function MockExamPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const handleExamSelect = (examId: string) => {
    console.log("[v0] Exam selected:", examId) // Added debug logging
    setSelectedExam(examId)
  }

  const handleStartExam = (examId: string) => {
    console.log("[v0] Starting exam:", examId) // Added debug logging
    // Navigate to actual exam page
    window.location.href = `/practice/mock/${examId}/start`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/practice" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SQE Forge</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Mock Exams</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mock Exams</h1>
          <p className="text-muted-foreground">
            Take full-length practice exams under timed conditions to simulate the real SQE experience
          </p>
        </div>

        {/* Important Notice */}
        <Card className="border-orange-200 bg-orange-50 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-1">Exam Conditions</h3>
                <p className="text-sm text-orange-800">
                  Mock exams are conducted under strict timed conditions. Once started, you cannot pause or restart.
                  Ensure you have a stable internet connection and uninterrupted time before beginning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mock Exam Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockExams.map((exam) => (
            <Card
              key={exam.id}
              className={`border-border cursor-pointer transition-all hover:shadow-md hover:bg-accent/5 ${
                selectedExam === exam.id ? "ring-2 ring-secondary border-secondary" : ""
              }`}
              onClick={() => {
                console.log("[v0] Mock exam card clicked:", exam.id) // Added debug logging
                handleExamSelect(exam.id)
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{exam.title}</CardTitle>
                    <CardDescription className="text-sm mb-3">{exam.description}</CardDescription>
                  </div>
                  <Badge
                    className={
                      exam.difficulty === "Exam Standard" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {exam.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Exam Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{formatDuration(exam.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{exam.questions} questions</span>
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <span className="text-sm font-medium text-foreground mb-2 block">Modules:</span>
                  <div className="flex flex-wrap gap-1">
                    {exam.modules.slice(0, 2).map((module, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {module}
                      </Badge>
                    ))}
                    {exam.modules.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{exam.modules.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Performance */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Best Score</span>
                    <span className="font-medium text-foreground">{exam.bestScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attempts</span>
                    <span className="text-foreground">{exam.attempts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Attempt</span>
                    <span className="text-foreground">{exam.lastAttempt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Exam Section */}
        {selectedExam && (
          <Card className="border-secondary bg-secondary/5 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                Ready to Start Mock Exam?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(() => {
                const exam = mockExams.find((e) => e.id === selectedExam)!
                return (
                  <>
                    <div className="bg-background p-4 rounded-lg border border-border">
                      <h3 className="font-semibold text-foreground mb-3">{exam.title}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium text-foreground">{formatDuration(exam.duration)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Questions:</span>
                          <span className="font-medium text-foreground">{exam.questions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Difficulty:</span>
                          <span className="font-medium text-foreground">{exam.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target Score:</span>
                          <span className="font-medium text-foreground">70%+</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Before you start:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Ensure you have {formatDuration(exam.duration)} of uninterrupted time</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Check your internet connection is stable</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Have pen and paper ready for notes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Find a quiet environment free from distractions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={() => {
                          console.log("[v0] Start mock exam button clicked") // Added debug logging
                          handleStartExam(selectedExam!)
                        }}
                      >
                        Start Mock Exam
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1 bg-transparent" asChild>
                        <Link href="/practice">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Practice First
                        </Link>
                      </Button>
                    </div>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Mock Exam Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Time Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Aim for 100 seconds per question maximum</p>
                <p>• Don't spend too long on difficult questions</p>
                <p>• Flag questions to review if time permits</p>
                <p>• Keep track of your progress throughout</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Exam Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Read each scenario carefully and completely</p>
                <p>• Identify the key legal issues before looking at options</p>
                <p>• Eliminate obviously wrong answers first</p>
                <p>• Choose the best answer, not just a correct one</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
