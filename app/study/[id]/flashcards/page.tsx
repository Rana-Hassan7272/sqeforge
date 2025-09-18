"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Eye, EyeOff, Shuffle, Target, Layers } from "lucide-react"
import Link from "next/link"
import { getFlashcardsByCategory } from "@/lib/flashcards-database"

export default function FlashcardsPage() {
  const params = useParams()
  const materialId = params.id as string

  const flashcards =
    getFlashcardsByCategory(`${materialId}-concepts`) ||
    getFlashcardsByCategory("business-law-concepts") ||
    getFlashcardsByCategory("contract-law-concepts") ||
    getFlashcardsByCategory("tort-law-concepts") ||
    getFlashcardsByCategory("property-law-concepts") ||
    getFlashcardsByCategory("criminal-law-concepts")

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set())
  const [correctCards, setCorrectCards] = useState<Set<string>>(new Set())
  const [incorrectCards, setIncorrectCards] = useState<Set<string>>(new Set())
  const [sessionComplete, setSessionComplete] = useState(false)

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Layers className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">Flashcards not available for this topic yet.</p>
            <Button asChild>
              <Link href={`/study/${materialId}`}>Back to Study Material</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentCard = flashcards[currentCardIndex]
  const progress = (studiedCards.size / flashcards.length) * 100
  const accuracy = studiedCards.size > 0 ? (correctCards.size / studiedCards.size) * 100 : 0

  const handleCardFlip = () => {
    setShowAnswer(!showAnswer)
  }

  const handleAnswer = (isCorrect: boolean) => {
    const newStudiedCards = new Set(studiedCards)
    newStudiedCards.add(currentCard.id)
    setStudiedCards(newStudiedCards)

    if (isCorrect) {
      setCorrectCards((prev) => new Set(prev).add(currentCard.id))
    } else {
      setIncorrectCards((prev) => new Set(prev).add(currentCard.id))
    }

    // Move to next card or complete session
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      setShowAnswer(false)
    } else {
      setSessionComplete(true)
    }
  }

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
      setShowAnswer(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1)
      setShowAnswer(false)
    }
  }

  const handleShuffle = () => {
    setCurrentCardIndex(Math.floor(Math.random() * flashcards.length))
    setShowAnswer(false)
  }

  const handleRestart = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setStudiedCards(new Set())
    setCorrectCards(new Set())
    setIncorrectCards(new Set())
    setSessionComplete(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "foundation":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-blue-100 text-blue-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href={`/study/${materialId}`} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Study Material</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-border">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Flashcard Session Complete!</CardTitle>
                <CardDescription>Great job studying {materialId.replace(/-/g, " ")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">{Math.round(accuracy)}%</div>
                  <p className="text-muted-foreground">
                    {correctCards.size} out of {studiedCards.size} cards correct
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">Total Cards</div>
                    <div className="text-muted-foreground">{flashcards.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">Correct</div>
                    <div className="text-muted-foreground">{correctCards.size}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">Incorrect</div>
                    <div className="text-muted-foreground">{incorrectCards.size}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" onClick={handleRestart}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Study Again
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/study">Browse Materials</Link>
                  </Button>
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
            <Link
              href={`/study/${materialId}`}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Study Material</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleShuffle}>
                <Shuffle className="w-4 h-4 mr-2" />
                Shuffle
              </Button>
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Card {currentCardIndex + 1} of {flashcards.length}
            </span>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-muted-foreground">Progress: {Math.round(progress)}%</span>
              {studiedCards.size > 0 && (
                <span className="text-muted-foreground">Accuracy: {Math.round(accuracy)}%</span>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Flashcard */}
            <div className="lg:col-span-3">
              <Card className="border-border min-h-[400px] cursor-pointer" onClick={handleCardFlip}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{currentCard.category}</Badge>
                      <Badge className={getDifficultyColor(currentCard.difficulty)}>{currentCard.difficulty}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCardFlip()
                      }}
                    >
                      {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="text-lg font-medium text-foreground leading-relaxed">
                      {showAnswer ? currentCard.back : currentCard.front}
                    </div>

                    {!showAnswer && <p className="text-sm text-muted-foreground">Click to reveal answer</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Answer Buttons */}
              {showAnswer && (
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleAnswer(false)}
                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Incorrect
                  </Button>
                  <Button size="lg" onClick={() => handleAnswer(true)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Correct
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePreviousCard} disabled={currentCardIndex === 0}>
                  Previous Card
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                >
                  Next Card
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cards Studied</span>
                    <span className="text-foreground font-medium">
                      {studiedCards.size}/{flashcards.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Correct</span>
                    <span className="text-green-600 font-medium">{correctCards.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Incorrect</span>
                    <span className="text-red-600 font-medium">{incorrectCards.size}</span>
                  </div>
                  {studiedCards.size > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-foreground font-medium">{Math.round(accuracy)}%</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Study Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Try to answer before flipping</li>
                    <li>• Review incorrect cards again</li>
                    <li>• Use spaced repetition</li>
                    <li>• Focus on understanding, not memorizing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
