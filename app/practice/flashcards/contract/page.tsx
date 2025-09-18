"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, BookOpen, Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"

const contractLawFlashcards = [
  {
    id: 1,
    front: "What are the essential elements for a valid contract under English law?",
    back: "1. Offer - A definite promise to be bound on specific terms\n2. Acceptance - Unqualified agreement to the offer terms\n3. Consideration - Something of value exchanged by both parties\n4. Intention to create legal relations - Parties must intend legal consequences\n5. Capacity - Parties must have legal capacity to contract\n6. Certainty - Terms must be sufficiently certain\n\nAll elements must be present for a legally binding contract.",
    category: "Formation",
    difficulty: "Foundation",
    legalPrinciple: "Essential elements of contract formation",
    caseReferences: ["Carlill v Carbolic Smoke Ball Co [1893]", "Balfour v Balfour [1919]"],
  },
  {
    id: 2,
    front: "Define consideration and state the rule from Currie v Misa (1875).",
    back: "Consideration is 'some right, interest, profit or benefit accruing to one party, or some forbearance, detriment, loss or responsibility given, suffered or undertaken by the other' (Currie v Misa).\n\nKey principles:\n- Must be sufficient but need not be adequate\n- Must move from the promisee\n- Past consideration is generally not valid\n- Cannot be performance of existing legal duty",
    category: "Consideration",
    difficulty: "Foundation",
    legalPrinciple: "Definition and requirements of consideration",
    caseReferences: ["Currie v Misa (1875)", "Chappell v Nestlé [1960]", "Williams v Roffey Bros [1991]"],
  },
  {
    id: 3,
    front: "Explain the postal rule and its exceptions.",
    back: "The postal rule states that acceptance takes effect when posted, not when received (Adams v Lindsell 1818).\n\nRequirements:\n- Post must be reasonable means of communication\n- Letter properly addressed and stamped\n- Offeror hasn't excluded the rule\n\nExceptions:\n- Rule expressly excluded\n- Instantaneous communication\n- Would lead to manifest inconvenience/absurdity",
    category: "Offer & Acceptance",
    difficulty: "Intermediate",
    legalPrinciple: "Postal rule for acceptance",
    caseReferences: ["Adams v Lindsell (1818)", "Entores v Miles Far East Corp [1955]"],
  },
  {
    id: 4,
    front: "What is the difference between an offer and an invitation to treat?",
    back: "Offer:\n- Definite promise to be bound on specific terms\n- Shows intention to be legally bound\n- Can be accepted to form contract\n\nInvitation to Treat:\n- Invitation for others to make offers\n- No intention to be bound\n- Cannot be accepted\n\nExamples: Shop displays (invitation), advertisements with clear terms (offer), auctions (invitation).",
    category: "Offer & Acceptance",
    difficulty: "Foundation",
    legalPrinciple: "Distinction between offers and invitations to treat",
    caseReferences: [
      "Fisher v Bell [1961]",
      "Pharmaceutical Society v Boots [1953]",
      "Carlill v Carbolic Smoke Ball Co [1893]",
    ],
  },
  {
    id: 5,
    front: "Explain the doctrine of frustration and its legal effects.",
    back: "Frustration occurs when performance becomes impossible, illegal, or radically different from what was contemplated without fault of either party.\n\nTest: Has the foundation of the contract been destroyed? (Davis Contractors v Fareham UDC)\n\nEffects:\n- Contract automatically terminated\n- Parties discharged from future obligations\n- Law Reform (Frustrated Contracts) Act 1943 governs restitution",
    category: "Discharge",
    difficulty: "Advanced",
    legalPrinciple: "Doctrine of frustration",
    caseReferences: ["Taylor v Caldwell (1863)", "Davis Contractors v Fareham UDC (1956)", "Krell v Henry [1903]"],
    statuteReferences: ["Law Reform (Frustrated Contracts) Act 1943"],
  },
  {
    id: 6,
    front: "What are the requirements for a valid exclusion clause under UCTA 1977?",
    back: "Requirements under Unfair Contract Terms Act 1977:\n\n1. Incorporation - Clause must be part of the contract\n2. Construction - Must cover the breach that occurred\n3. Reasonableness - Must satisfy reasonableness test (s.11)\n\nReasonableness factors:\n- Relative bargaining power\n- Alternative sources available\n- Inducements to agree\n- Knowledge of clause\n- Practicability of compliance",
    category: "Exclusion Clauses",
    difficulty: "Advanced",
    legalPrinciple: "Validity of exclusion clauses",
    caseReferences: ["George Mitchell v Finney Lock Seeds [1983]", "Smith v Eric S Bush [1990]"],
    statuteReferences: ["Unfair Contract Terms Act 1977"],
  },
]

export default function ContractLawFlashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set())

  const cards = contractLawFlashcards
  const categoryTitle = "Contract Law Principles"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/practice" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Practice</span>
                </Link>
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
                <Badge variant="secondary">{cards[currentCard].category}</Badge>
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
                <p className="text-gray-900 whitespace-pre-line text-center leading-relaxed">
                  {showAnswer ? cards[currentCard].back : cards[currentCard].front}
                </p>
              </div>
            </div>

            {showAnswer && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Legal Principle:</h4>
                <p className="text-blue-800 mb-3">{cards[currentCard].legalPrinciple}</p>

                {cards[currentCard].caseReferences && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-blue-900">Cases: </span>
                    <span className="text-sm text-blue-800">{cards[currentCard].caseReferences?.join(", ")}</span>
                  </div>
                )}

                {cards[currentCard].statuteReferences && (
                  <div>
                    <span className="text-sm font-medium text-blue-900">Statutes: </span>
                    <span className="text-sm text-blue-800">{cards[currentCard].statuteReferences?.join(", ")}</span>
                  </div>
                )}
              </div>
            )}

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
