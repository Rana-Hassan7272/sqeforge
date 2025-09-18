"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Brain, BookOpen, Scale, Timer } from "lucide-react"
import Link from "next/link"
import { getQuestionsByModuleAndTopic } from "@/lib/questions-database"
import { PackageService } from "@/lib/package-features"
import { useLocalStorageString } from "@/hooks/use-local-storage"

export default function MiniMockPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const module = params.module as string
  const topic = (params.topic as string).replace(/-/g, " ")
  const questionCount = Number.parseInt(searchParams.get("count") || "20")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(questionCount * 90) // 1.5 minutes per question
  const [sessionComplete, setSessionComplete] = useState(false)
  const [selectedCount, setSelectedCount] = useState(questionCount)
  const [showSettings, setShowSettings] = useState(!searchParams.get("count"))

  const allQuestions = getQuestionsByModuleAndTopic(module, topic)
  const questions = allQuestions.slice(0, selectedCount)
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Get user's current plan and available options
  const [userPlan, setUserPlan, isLoadingPlan] = useLocalStorageString('sqe-forge-mock-subscription', 'free')
  const availableOptions = PackageService.getMiniMockOptions(userPlan)
  
  const allMiniMockOptions = [
    { count: 5, time: 7.5, label: "Quick Practice" },
    { count: 10, time: 15, label: "Short Mock" },
    { count: 15, time: 22.5, label: "Medium Mock" },
    { count: 20, time: 30, label: "Standard Mock" },
  ]
  
  const miniMockOptions = allMiniMockOptions.filter(option => availableOptions.includes(option.count))

  const startMiniMock = (count: number) => {
    setSelectedCount(count)
    setTimeRemaining(count * 90)
    setShowSettings(false)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setSelectedAnswer("")
    setShowExplanation(false)
    setSessionComplete(false)
  }

  useEffect(() => {
    if (timeRemaining > 0 && !sessionComplete) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeRemaining, sessionComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      const answerIndex = Number.parseInt(selectedAnswer)
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerIndex }))
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

  if (sessionComplete) {
    const correctAnswers = Object.entries(answers).filter(([questionId, answerIndex]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      return question && answerIndex === question.correctAnswer
    }).length

    const score = Math.round((correctAnswers / questions.length) * 100)
    const passed = score >= 60

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur">
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
          <div className="max-w-2xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Mini Mock Complete!</CardTitle>
                    <CardDescription>
                      {topic} - {questions.length} Questions
                    </CardDescription>
                  </div>
                  <Badge
                    variant={passed ? "default" : "destructive"}
                    className={`text-lg px-4 py-2 ${passed ? "bg-green-100 text-green-800 border-green-200" : ""}`}
                  >
                    {passed ? "PASS" : "FAIL"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-foreground">{score}%</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">
                      {correctAnswers}/{questions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">60%</div>
                    <div className="text-sm text-muted-foreground">Pass Mark</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/practice">Practice More</Link>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href={`/practice/${module}/mini-mock/${params.topic}`}>Retry Mock</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No questions available for this mini mock.</p>
            <Button className="mt-4" asChild>
              <Link href="/practice">Back to Practice</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href={`/practice/${module}`} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Module</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Mini Mock Setup</CardTitle>
                <CardDescription>
                  Choose your mini mock length for {topic}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {miniMockOptions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Mini mocks are not available in your current plan.</p>
                    <Button asChild>
                      <Link href="/pricing">Upgrade Your Plan</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {miniMockOptions.map((option) => (
                      <Card key={option.count} className="cursor-pointer hover:border-secondary transition-colors" onClick={() => startMiniMock(option.count)}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-foreground">{option.label}</h3>
                              <p className="text-sm text-muted-foreground">{option.count} questions • {option.time} minutes</p>
                            </div>
                            <Badge variant="outline">{option.count} MCQs</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/practice" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Practice</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Mini Mock</Badge>
              <div className="flex items-center space-x-2 text-sm">
                <Timer className="w-4 h-4" />
                <span className={timeRemaining < 300 ? "text-red-600 font-semibold" : "text-foreground"}>
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
            <span className="text-sm font-medium text-foreground">Question {currentQuestionIndex + 1}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="max-w-4xl mx-auto">
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
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 mt-0.5" />}
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

                    {currentQuestion.legislation.length > 0 && (
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

                    {currentQuestion.cases.length > 0 && (
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
      </div>
    </div>
  )
}
