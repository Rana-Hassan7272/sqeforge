"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Flag,
  CheckCircle,
  XCircle,
  Brain,
  RotateCcw,
  BookOpen,
  Scale,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getQuestionsByModuleAndIntensity } from "@/lib/questions-database"
import { SQE1Scoring, type QuestionResult } from "@/lib/scoring-system"

export default function PracticeSessionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const module = params.module as string
  const intensity = Number.parseInt(searchParams.get("intensity") || "1")
  const questionCount = Number.parseInt(searchParams.get("count") || "20")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())
  const [questionTimes, setQuestionTimes] = useState<{ [key: number]: number }>({})

  const allQuestions = getQuestionsByModuleAndIntensity(module, intensity)
  const questions = allQuestions.slice(0, Math.min(questionCount, allQuestions.length))

  console.log(`[v0] Found ${allQuestions.length} questions for module ${module} at intensity ${intensity}`)
  console.log(`[v0] Using ${questions.length} questions for practice session (requested: ${questionCount})`)

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  useEffect(() => {
    if (questions.length === 0) {
      console.log("[v0] No questions available, redirecting to practice page")
      router.push("/practice")
    }
  }, [questions.length, router])

  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0

  useEffect(() => {
    if (currentQuestion && !showExplanation && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentQuestion, showExplanation, timeRemaining])

  useEffect(() => {
    if (currentQuestion) {
      setTimeRemaining(currentQuestion.timeLimit || 90)
      setQuestionStartTime(Date.now())
    }
  }, [currentQuestionIndex, currentQuestion])

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer && currentQuestion) {
      const answerIndex = Number.parseInt(selectedAnswer)
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)

      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerIndex }))
      setQuestionTimes((prev) => ({ ...prev, [currentQuestion.id]: timeSpent }))
      setShowExplanation(true)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer("")
      setShowExplanation(false)
    } else {
      setSessionComplete(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer("")
      setShowExplanation(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (sessionComplete) {
    const questionResults: QuestionResult[] = Object.entries(answers).map(([questionId, answerIndex]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))!
      return {
        questionId,
        correct: answerIndex === question.correctAnswer,
        timeSpent: questionTimes[Number.parseInt(questionId)] || 0,
        difficulty: question.difficulty.toLowerCase(),
        angoffScore: question.angoffScore || 50,
        userAnswer: answerIndex.toString(),
        correctAnswer: question.correctAnswer.toString(),
      }
    })

    const rawScore = SQE1Scoring.calculateRawScore(questionResults)
    const scaledScore = SQE1Scoring.calculateWeightedScaledScore(questionResults)
    const passStatus = SQE1Scoring.getPassStatus(scaledScore)
    const confidenceLevel = SQE1Scoring.calculateConfidenceLevel(questionResults)
    const analysis = SQE1Scoring.analyzePerformance(questionResults)

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/practice" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Practice</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Session Complete!</CardTitle>
                    <CardDescription>Your performance analysis using SQE1 scaled scoring system</CardDescription>
                  </div>
                  <Badge
                    variant={passStatus === "pass" ? "default" : "destructive"}
                    className={`text-lg px-4 py-2 ${passStatus === "pass" ? "bg-green-100 text-green-800 border-green-200" : ""}`}
                  >
                    {passStatus === "pass" ? "PASS" : "FAIL"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{rawScore}%</div>
                    <div className="text-sm text-muted-foreground">Raw Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">{scaledScore}</div>
                    <div className="text-sm text-muted-foreground">Scaled Score (out of 500)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">300</div>
                    <div className="text-sm text-muted-foreground">Pass Threshold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{confidenceLevel}%</div>
                    <div className="text-sm text-muted-foreground">Confidence Level</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Performance by Difficulty</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(analysis.byDifficulty).map(([difficulty, stats]) => (
                      <div key={difficulty} className="p-4 bg-card rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{difficulty}</span>
                          <span className="text-sm text-muted-foreground">{stats.percentage}%</span>
                        </div>
                        <Progress value={stats.percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {stats.correct}/{stats.total} correct
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {analysis.recommendations.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Recommendations</h3>
                    <div className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-secondary/10 rounded-lg">
                          <Brain className="w-4 h-4 text-secondary mt-0.5" />
                          <span className="text-sm text-foreground">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/practice">Practice More</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.location.reload()}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retry Session
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/progress">
                      <Brain className="w-4 h-4 mr-2" />
                      View Progress
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No questions available for this selection.</p>
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
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Level {intensity}</Badge>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={timeRemaining < 30 ? "text-red-600 font-semibold" : "text-foreground"}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{currentQuestion.topic}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {currentQuestion.subtopic}
                      </Badge>
                    </div>
                    <Badge
                      className={
                        currentQuestion.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : currentQuestion.difficulty === "Medium"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">Scenario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <p className="text-foreground leading-relaxed">{currentQuestion.question}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-4">{currentQuestion.questionText}</h3>

                    <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} disabled={showExplanation}>
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index.toString()
                        const isCorrect = index === currentQuestion.correctAnswer
                        const showResult = showExplanation

                        return (
                          <div
                            key={index}
                            className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                              showResult && isCorrect
                                ? "border-green-500 bg-green-50"
                                : showResult && isSelected && !isCorrect
                                  ? "border-red-500 bg-red-50"
                                  : isSelected
                                    ? "border-secondary bg-secondary/5"
                                    : "border-border hover:bg-card"
                            }`}
                            onClick={() => !showExplanation && handleAnswerSelect(index.toString())}
                          >
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-0.5" />
                            <Label
                              htmlFor={`option-${index}`}
                              className="flex-1 cursor-pointer text-foreground leading-relaxed"
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + index)})</span>
                              {option}
                            </Label>
                            {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                            {showResult && isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            )}
                          </div>
                        )
                      })}
                    </RadioGroup>
                  </div>

                  {showExplanation && (
                    <Card className="border-secondary bg-secondary/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-secondary">
                          <Brain className="w-5 h-5" />
                          Explanation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground leading-relaxed">{currentQuestion.explanation}</p>

                        {currentQuestion.legislation && currentQuestion.legislation.length > 0 && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                              <Scale className="w-4 h-4" />
                              Relevant Legislation
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {currentQuestion.legislation.map((law, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {law}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {currentQuestion.cases && currentQuestion.cases.length > 0 && (
                          <div>
                            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Key Cases
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {currentQuestion.cases.map((case_, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {case_}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {!showExplanation ? (
                      <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                        Submit Answer
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion}>
                        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Session Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Module</span>
                    <span className="text-foreground font-medium">{module}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Intensity</span>
                    <span className="text-foreground font-medium">Level {intensity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="text-foreground font-medium">{questions.length} available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time per Q</span>
                    <span className="text-foreground font-medium">{currentQuestion?.timeLimit || 90}s</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Flag className="w-4 h-4 mr-2" />
                    Flag Question
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Brain className="w-4 h-4 mr-2" />
                    Ask Forger AI
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
