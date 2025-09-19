"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, BookOpen, Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ExtendedFlashcard {
  id: number
  front: string
  back: string
  category: string
  difficulty: string
  legalPrinciple: string
  caseReferences?: string[]
  statuteReferences?: string[]
}

const constitutionalLawFlashcards: ExtendedFlashcard[] = [
  {
    id: 1,
    front: "What are the three core principles of the UK constitution according to Dicey?",
    back: "1. Parliamentary Sovereignty - Parliament can make or unmake any law\n2. Rule of Law - No one is above the law, equality before the law\n3. Constitutional Conventions - Unwritten rules that govern political behavior\n\nThese principles form the foundation of the UK's unwritten constitution.",
    category: "Constitutional Principles",
    difficulty: "Foundation",
    legalPrinciple: "Dicey's constitutional principles",
    caseReferences: [
      "Entick v Carrington (1765)",
      "AV Dicey - Introduction to the Study of the Law of the Constitution",
    ],
  },
  {
    id: 2,
    front: "Explain the doctrine of separation of powers in the UK context.",
    back: "The UK has a 'fusion' rather than strict separation:\n\n1. Legislature (Parliament) - Makes laws\n2. Executive (Government) - Implements laws, drawn from Parliament\n3. Judiciary (Courts) - Interprets law, independent since Constitutional Reform Act 2005\n\nKey features: Executive accountability to Parliament, judicial independence, checks and balances.",
    category: "Separation of Powers",
    difficulty: "Foundation",
    legalPrinciple: "Separation of powers doctrine",
    statuteReferences: ["Constitutional Reform Act 2005"],
  },
  {
    id: 3,
    front: "What is the difference between legal rules and constitutional conventions?",
    back: "Legal Rules:\n- Enforceable in courts\n- Breach has legal consequences\n- Created by Parliament or courts\n\nConstitutional Conventions:\n- Not legally enforceable\n- Breach has political consequences\n- Based on precedent and practice\n\nExample: Queen must give Royal Assent (convention) vs. Parliament can make laws (legal rule).",
    category: "Constitutional Conventions",
    difficulty: "Intermediate",
    legalPrinciple: "Distinction between law and convention",
    caseReferences: ["Attorney General v Jonathan Cape Ltd (1976)"],
  },
  {
    id: 4,
    front: "Define the rule of law according to Lord Bingham's eight principles.",
    back: "Lord Bingham's Rule of Law principles:\n1. Law must be accessible and predictable\n2. Questions of legal right should be resolved by law not discretion\n3. Laws should apply equally to all\n4. Ministers must exercise power reasonably and in good faith\n5. Human rights must be protected\n6. Means must exist for resolving disputes\n7. Adjudicative procedures must be fair\n8. State must comply with international law",
    category: "Rule of Law",
    difficulty: "Advanced",
    legalPrinciple: "Modern conception of rule of law",
    caseReferences: ["Lord Bingham - The Rule of Law (2010)"],
  },
  {
    id: 5,
    front: "What are the key features of parliamentary sovereignty?",
    back: "Parliamentary Sovereignty means:\n\n1. Parliament can make any law on any subject\n2. No Parliament can bind its successors\n3. No court can override an Act of Parliament\n4. Parliament is the supreme legal authority\n\nModern challenges: EU law (pre-Brexit), devolution, human rights, common law constitutionalism.",
    category: "Parliamentary Sovereignty",
    difficulty: "Foundation",
    legalPrinciple: "Parliamentary sovereignty doctrine",
    caseReferences: ["Ellen Street Estates v Minister of Health (1934)", "Factortame (No 2) (1991)"],
  },
  {
    id: 6,
    front: "Explain the constitutional significance of the Human Rights Act 1998.",
    back: "The HRA 1998:\n- Incorporates ECHR rights into UK law\n- Creates interpretive obligation (s.3)\n- Allows declaration of incompatibility (s.4)\n- Makes it unlawful for public authorities to breach Convention rights (s.6)\n- Preserves parliamentary sovereignty while strengthening rights protection\n\nBalances rights protection with parliamentary supremacy.",
    category: "Human Rights",
    difficulty: "Intermediate",
    legalPrinciple: "Constitutional impact of human rights incorporation",
    statuteReferences: ["Human Rights Act 1998", "European Convention on Human Rights"],
  },
]

export default function ConstitutionalLawFlashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set())

  const cards = constitutionalLawFlashcards
  const categoryTitle = "Constitutional Law Principles"

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

                {cards[currentCard].caseReferences && cards[currentCard].caseReferences!.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-blue-900">Cases: </span>
                    <span className="text-sm text-blue-800">{cards[currentCard].caseReferences?.join(", ")}</span>
                  </div>
                )}

                {cards[currentCard].statuteReferences && cards[currentCard].statuteReferences!.length > 0 && (
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
