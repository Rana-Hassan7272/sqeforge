"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, BookOpen, Brain } from "lucide-react"
import { getFlashcardsByCategory, getAllCategories } from "@/lib/flashcards-database"
import { PackageService } from "@/lib/package-features"

export default function FlashcardsPage({ params }: { params: { category: string } }) {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set())

  // Get user's current plan (for demo, using localStorage)
  const userPlan = (typeof window !== 'undefined' ? localStorage.getItem('sqe-forge-mock-subscription') : 'free') || 'free'
  const flashcardLimit = PackageService.getFlashcardLimit(userPlan)
  
  const allCards = getFlashcardsByCategory(params.category)
  const cards = allCards.slice(0, flashcardLimit)
  const categoryTitle = params.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setShowAnswer(false)
    }
  }

  const handleCorrect = () => {
    setCorrectAnswers(correctAnswers + 1)
    setCompletedCards((prev) => new Set([...prev, cards[currentCard].id]))
    handleNext()
  }

  const handleIncorrect = () => {
    setIncorrectAnswers(incorrectAnswers + 1)
    handleNext()
  }

  const resetSession = () => {
    setCurrentCard(0)
    setShowAnswer(false)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    setCompletedCards(new Set())
  }

  const progress = ((correctAnswers + incorrectAnswers) / cards.length) * 100

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Category Not Found</CardTitle>
            <CardDescription>The requested flashcard category does not exist.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Available Categories:</h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {getAllCategories().map((category) => (
                  <Button key={category} variant="outline" size="sm" asChild>
                    <a href={`/practice/flashcards/${category}`}>
                      {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Practice
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{categoryTitle}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                <Brain className="w-4 h-4 mr-1" />
                {cards.length} Cards
              </Badge>
              <Button variant="outline" onClick={resetSession}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentCard + 1} of {cards.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-green-600">Correct: {correctAnswers}</span>
            <span className="text-red-600">Incorrect: {incorrectAnswers}</span>
          </div>
        </div>

        {/* Flashcard */}
        <Card className="min-h-[400px] mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="secondary">{cards[currentCard].tags[0]}</Badge>
                <Badge variant="outline" className="ml-2">
                  {cards[currentCard].difficulty}
                </Badge>
              </div>
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">{showAnswer ? "Answer" : "Question"}</h3>
              <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <p className="text-gray-900 whitespace-pre-line text-center">
                  {showAnswer ? cards[currentCard].back : cards[currentCard].front}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} size="lg">
                  Show Answer
                </Button>
              ) : (
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={handleIncorrect}
                    className="text-red-600 border-red-200 bg-transparent"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Incorrect
                  </Button>
                  <Button onClick={handleCorrect} className="text-green-600 bg-green-50 border-green-200">
                    <Check className="w-4 h-4 mr-2" />
                    Correct
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentCard === 0}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button variant="outline" onClick={handleNext} disabled={currentCard === cards.length - 1}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
