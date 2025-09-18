"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertCircle, CheckCircle, Flag, ArrowRight, ArrowLeft } from "lucide-react"
import { getMockExamQuestions } from "@/lib/mock-exams-database"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
  difficulty: string
}

export default function MockExamStartPage() {
  const params = useParams()
  const router = useRouter()
  const examId = params.examId as string

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 hours in minutes (SQE standard)
  const [examStarted, setExamStarted] = useState(false)
  const [examCompleted, setExamCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Load mock exam questions
    const mockQuestions = getMockExamQuestions(examId)
    setQuestions(mockQuestions)
  }, [examId])

  useEffect(() => {
    if (examStarted && timeRemaining > 0 && !examCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setExamCompleted(true)
            return 0
          }
          return prev - 1
        })
      }, 60000) // Update every minute

      return () => clearInterval(timer)
    }
  }, [examStarted, timeRemaining, examCompleted])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const handleFlagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion)
      } else {
        newSet.add(currentQuestion)
      }
      return newSet
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitExam = () => {
    setExamCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to Start Mock Exam?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">Important Instructions</h3>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• You have 5 hours to complete 180 questions</li>
                    <li>• Once started, the timer cannot be paused</li>
                    <li>• You can flag questions for review</li>
                    <li>• Ensure stable internet connection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-secondary/10 p-3 rounded">
                  <div className="font-medium">Questions</div>
                  <div className="text-2xl font-bold text-secondary">{questions.length}</div>
                </div>
                <div className="bg-secondary/10 p-3 rounded">
                  <div className="font-medium">Time Limit</div>
                  <div className="text-2xl font-bold text-secondary">5 Hours</div>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={() => setExamStarted(true)}>
                Start Mock Exam
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const passed = score >= 70

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              {passed ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              Mock Exam Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${passed ? "text-green-600" : "text-red-600"}`}>{score}%</div>
              <div className="text-lg text-muted-foreground">
                {Object.keys(selectedAnswers).length} of {questions.length} questions answered
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {questions.filter((_, i) => selectedAnswers[i] === questions[i].correctAnswer).length}
                </div>
                <div className="text-sm text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  {questions.length -
                    questions.filter((_, i) => selectedAnswers[i] === questions[i].correctAnswer).length}
                </div>
                <div className="text-sm text-red-700">Incorrect</div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" onClick={() => router.push("/practice/mock")}>
                Back to Mock Exams
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/dashboard")}>
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Mock Exam</Badge>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className={`font-mono ${timeRemaining < 60 ? "text-red-600" : "text-foreground"}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFlagQuestion}
                className={flaggedQuestions.has(currentQuestion) ? "bg-yellow-100 border-yellow-300" : "bg-transparent"}
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Progress: {Math.round(progress)}%</span>
            <span>
              Answered: {Object.keys(selectedAnswers).length}/{questions.length}
            </span>
          </div>
        </div>

        {/* Question */}
        {currentQ && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="secondary">{currentQ.topic}</Badge>
                  <Badge variant="outline" className="ml-2">
                    {currentQ.difficulty}
                  </Badge>
                </div>
                {flaggedQuestions.has(currentQuestion) && (
                  <Badge className="bg-yellow-100 text-yellow-800">Flagged</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <div className="text-base leading-relaxed whitespace-pre-wrap">{currentQ.question}</div>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-secondary bg-secondary text-secondary-foreground"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
                        )}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-3">
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmitExam} className="bg-green-600 hover:bg-green-700">
                Submit Exam
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
