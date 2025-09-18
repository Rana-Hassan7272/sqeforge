"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, BookOpen, Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"

const tortLawFlashcards = [
  {
    id: 1,
    front: "State the three-stage test for establishing a duty of care in negligence.",
    back: "The Caparo test requires:\n\n1. Foreseeability - Was damage reasonably foreseeable?\n2. Proximity - Is there sufficient legal proximity between parties?\n3. Fair, just and reasonable - Would it be fair, just and reasonable to impose a duty?\n\nAll three elements must be satisfied to establish a duty of care. This test refined the Anns v Merton two-stage test.",
    category: "Negligence",
    difficulty: "Foundation",
    legalPrinciple: "Caparo test for duty of care in negligence",
    caseReferences: [
      "Caparo Industries plc v Dickman [1990]",
      "Donoghue v Stevenson [1932]",
      "Anns v Merton LBC [1978]",
    ],
  },
  {
    id: 2,
    front: "What is the 'but for' test in causation and which case established it?",
    back: "The 'but for' test asks: 'But for the defendant's breach, would the harm have occurred?' (Barnett v Chelsea Hospital 1969).\n\nIf harm would have occurred anyway, causation fails. This is the factual causation test, distinct from legal causation (remoteness).\n\nExample: Doctor fails to examine patient who dies from poison - if patient would have died anyway, no causation.",
    category: "Causation",
    difficulty: "Foundation",
    legalPrinciple: "Factual causation in negligence",
    caseReferences: ["Barnett v Chelsea & Kensington Hospital [1969]", "Cork v Kirby MacLean [1952]"],
  },
  {
    id: 3,
    front: "Explain the standard of care in negligence and how it is determined.",
    back: "The standard is that of the reasonable person in the defendant's position (objective test).\n\nFactors considered:\n- Magnitude of risk\n- Likelihood of harm\n- Seriousness of potential injury\n- Cost and practicability of precautions\n- Social utility of defendant's conduct\n\nProfessionals judged by standards of their profession (Bolam test).",
    category: "Breach of Duty",
    difficulty: "Intermediate",
    legalPrinciple: "Objective standard of care in negligence",
    caseReferences: ["Blyth v Birmingham Waterworks (1856)", "Bolam v Friern Hospital [1957]", "Bolton v Stone [1951]"],
  },
  {
    id: 4,
    front: "What is the principle in Rylands v Fletcher and its modern application?",
    back: "Strict liability for escape of dangerous things from land.\n\nRequirements:\n1. Bringing something onto land\n2. Non-natural use of land\n3. Escape\n4. Damage\n\nModern application limited by Cambridge Water - foreseeability now required. Largely superseded by statutory environmental liability. Still applies to isolated escapes.",
    category: "Strict Liability",
    difficulty: "Advanced",
    legalPrinciple: "Rylands v Fletcher strict liability rule",
    caseReferences: [
      "Rylands v Fletcher (1868)",
      "Cambridge Water v Eastern Counties Leather (1994)",
      "Transco v Stockport MBC [2004]",
    ],
  },
  {
    id: 5,
    front: "Explain the test for remoteness of damage in tort.",
    back: "The Wagon Mound test: Damage must be reasonably foreseeable as a result of the breach.\n\nKey principles:\n- Type of damage must be foreseeable, not exact extent\n- Thin skull rule applies - take victim as you find them\n- Intervening acts may break chain of causation\n- Different test from contract (Hadley v Baxendale)\n\nOverruled the direct consequence test from Re Polemis.",
    category: "Remoteness",
    difficulty: "Intermediate",
    legalPrinciple: "Reasonable foreseeability test for remoteness",
    caseReferences: [
      "Overseas Tankship v Morts Dock (The Wagon Mound) [1961]",
      "Smith v Leech Brain [1962]",
      "Re Polemis [1921]",
    ],
  },
  {
    id: 6,
    front: "What are the elements of the tort of private nuisance?",
    back: "Private nuisance requires:\n\n1. Unlawful interference with use/enjoyment of land\n2. Indirect interference (direct = trespass)\n3. Continuous or recurring activity\n4. Unreasonable interference (considering locality, duration, sensitivity)\n\nDefenses: Statutory authority, prescription (20 years), consent, act of stranger.\n\nRemedies: Damages, injunction (discretionary).",
    category: "Nuisance",
    difficulty: "Intermediate",
    legalPrinciple: "Elements of private nuisance",
    caseReferences: [
      "Hunter v Canary Wharf [1997]",
      "St Helens Smelting v Tipping (1865)",
      "Sturges v Bridgman (1879)",
    ],
  },
]

export default function TortLawFlashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set())

  const cards = tortLawFlashcards
  const categoryTitle = "Tort Law Principles"

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
