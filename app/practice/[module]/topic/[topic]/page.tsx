"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Brain, BookOpen, Scale } from "lucide-react"
import Link from "next/link"
import { getQuestionsByModuleAndTopic } from "@/lib/questions-database"

export default function TopicPracticePage() {
  const params = useParams()
  const module = params.module as string
  const topic = (params.topic as string).replace(/-/g, " ")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})

  const questions = getQuestionsByModuleAndTopic(module, topic)
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

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
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer("")
      setShowExplanation(false)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No questions available for this topic.</p>
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
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/practice" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Practice</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{topic}</Badge>
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
