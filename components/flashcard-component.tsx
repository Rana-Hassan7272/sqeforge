"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

interface FlashCard {
  id: string
  front: string
  back: string
  category: string
  difficulty: "Foundation" | "Intermediate" | "Advanced" | "Expert"
  legalPrinciple: string
  caseReferences?: string[]
  statuteReferences?: string[]
}

export const blackLetterLawFlashcards: FlashCard[] = [
  // Contract Law - Formation
  {
    id: "contract-001",
    front: "What are the essential elements required for a valid contract under English law?",
    back: "1. Offer - A definite promise to be bound on specific terms\n2. Acceptance - Unqualified agreement to the offer terms\n3. Consideration - Something of value exchanged by both parties\n4. Intention to create legal relations - Parties must intend legal consequences\n5. Capacity - Parties must have legal capacity to contract\n6. Certainty - Terms must be sufficiently certain",
    category: "Contract Law",
    difficulty: "Foundation",
    legalPrinciple: "Essential elements of contract formation",
    caseReferences: ["Carlill v Carbolic Smoke Ball Co [1893]", "Balfour v Balfour [1919]"],
  },

  // Tort Law - Negligence
  {
    id: "tort-001",
    front: "State the three-stage test for establishing a duty of care in negligence.",
    back: "The Caparo test requires:\n1. Foreseeability - Was damage reasonably foreseeable?\n2. Proximity - Is there sufficient legal proximity between parties?\n3. Fair, just and reasonable - Would it be fair, just and reasonable to impose a duty?\n\nAll three elements must be satisfied to establish a duty of care.",
    category: "Tort Law",
    difficulty: "Foundation",
    legalPrinciple: "Caparo test for duty of care in negligence",
    caseReferences: ["Caparo Industries plc v Dickman [1990]", "Donoghue v Stevenson [1932]"],
  },

  // Criminal Law - Mens Rea
  {
    id: "criminal-001",
    front: "Define the two types of recklessness in criminal law and explain the difference.",
    back: "1. Cunningham Recklessness (Subjective):\n- Defendant must actually foresee the risk of harm\n- Must unreasonably decide to take that risk\n- Applied to most statutory offences\n\n2. Caldwell Recklessness (Objective) - Now largely abolished:\n- Based on what reasonable person would foresee\n- Largely overruled by R v G [2003]",
    category: "Criminal Law",
    difficulty: "Intermediate",
    legalPrinciple: "Types of recklessness in criminal law",
    caseReferences: ["R v Cunningham [1957]", "R v G [2003]", "R v Caldwell [1982]"],
  },

  // Land Law - Registered Land
  {
    id: "land-001",
    front:
      "Explain the three classes of interests that can affect registered land under the Land Registration Act 2002.",
    back: "1. Registered Interests:\n- Legal estates and charges registered with their own title\n- Protected by registration\n\n2. Overriding Interests (Schedule 3):\n- Bind purchasers without registration\n- Include actual occupation rights, easements, local land charges\n\n3. Minor Interests:\n- Must be protected by notice or restriction\n- Include restrictive covenants, estate contracts",
    category: "Land Law",
    difficulty: "Advanced",
    legalPrinciple: "Classification of interests in registered land",
    statuteReferences: ["Land Registration Act 2002"],
  },

  // Trusts - Three Certainties
  {
    id: "trusts-001",
    front: "What are the three certainties required for a valid express trust?",
    back: "1. Certainty of Intention:\n- Clear intention to create a trust (not just moral obligation)\n- Words like 'on trust for' help but not essential\n\n2. Certainty of Subject Matter:\n- Trust property must be clearly identified\n- Beneficiaries' interests must be certain\n\n3. Certainty of Objects:\n- Beneficiaries must be clearly identified\n- Test varies by trust type (fixed/discretionary)",
    category: "Trusts",
    difficulty: "Foundation",
    legalPrinciple: "Three certainties for valid express trusts",
    caseReferences: ["Knight v Knight (1840)", "McPhail v Doulton [1971]"],
  },

  // Business Law - Directors' Duties
  {
    id: "business-001",
    front: "List the seven statutory duties of directors under the Companies Act 2006.",
    back: "1. S.171 - Duty to act within powers\n2. S.172 - Duty to promote success of company\n3. S.173 - Duty to exercise independent judgment\n4. S.174 - Duty to exercise reasonable care, skill and diligence\n5. S.175 - Duty to avoid conflicts of interest\n6. S.176 - Duty not to accept benefits from third parties\n7. S.177 - Duty to declare interest in proposed transactions",
    category: "Business Law",
    difficulty: "Advanced",
    legalPrinciple: "Statutory duties of company directors",
    statuteReferences: ["Companies Act 2006, ss.171-177"],
  },

  // Constitutional Law - Separation of Powers
  {
    id: "constitutional-001",
    front: "Explain the doctrine of separation of powers in the UK constitution.",
    back: "The separation of powers divides government functions between:\n\n1. Legislature (Parliament):\n- Makes laws\n- Scrutinizes executive\n\n2. Executive (Government):\n- Implements and enforces laws\n- Proposes legislation\n\n3. Judiciary (Courts):\n- Interprets and applies law\n- Independent from political branches\n\nUK has 'fusion' rather than strict separation - executive drawn from legislature.",
    category: "Constitutional Law",
    difficulty: "Intermediate",
    legalPrinciple: "Separation of powers doctrine",
  },

  // Property Practice - Conveyancing
  {
    id: "property-001",
    front: "What are the key stages in a typical residential conveyancing transaction?",
    back: "1. Pre-contract stage:\n- Take instructions and verify identity\n- Investigate title and raise enquiries\n- Arrange mortgage and searches\n- Negotiate contract terms\n\n2. Exchange of contracts:\n- Contracts become legally binding\n- Completion date fixed\n\n3. Pre-completion:\n- Final searches and requisitions\n- Prepare completion statement\n\n4. Completion:\n- Transfer of ownership\n- Registration at Land Registry",
    category: "Property Practice",
    difficulty: "Foundation",
    legalPrinciple: "Stages of residential conveyancing process",
  },

  // Wills and Probate - Testamentary Capacity
  {
    id: "wills-001",
    front: "State the test for testamentary capacity established in Banks v Goodfellow.",
    back: "The testator must:\n\n1. Understand the nature of making a will and its effects\n2. Know the extent of their property\n3. Understand and appreciate the claims to which they ought to give effect\n4. Not be affected by any disorder of mind that perverts their sense of right or prevents rational judgment\n\nAll elements must be satisfied at the time of making the will.",
    category: "Wills and Probate",
    difficulty: "Intermediate",
    legalPrinciple: "Test for testamentary capacity",
    caseReferences: ["Banks v Goodfellow (1870)"],
  },

  // Solicitors Accounts - Client Money Rules
  {
    id: "accounts-001",
    front: "What constitutes 'client money' under the SRA Accounts Rules?",
    back: "Client money includes:\n\n1. Money held or received for a client\n2. Money held or received for a third party in relation to regulated services\n3. Money held as stakeholder\n4. Money held to the sender's order\n5. Money held in capacity as trustee\n6. Advance payments for costs where a bill has not been delivered\n\nMust be held in designated client account and kept separate from firm's money.",
    category: "Solicitors Accounts",
    difficulty: "Advanced",
    legalPrinciple: "Definition and treatment of client money",
    statuteReferences: ["SRA Accounts Rules 2019"],
  },
]

interface FlashCardComponentProps {
  cards: FlashCard[]
  category: string
}

export function FlashCardComponent({ cards, category }: FlashCardComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const currentCard = cards[currentIndex]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    setIsFlipped(false)
  }

  const markCorrect = () => {
    setScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }))
    nextCard()
  }

  const markIncorrect = () => {
    setScore((prev) => ({ ...prev, total: prev.total + 1 }))
    nextCard()
  }

  const resetScore = () => {
    setScore({ correct: 0, total: 0 })
  }

  if (!currentCard) return null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{category} Flashcards</h2>
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Score: {score.correct}/{score.total}
            {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
          </div>
          <Button variant="outline" size="sm" onClick={resetScore}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="min-h-[400px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{isFlipped ? "Answer" : "Question"}</CardTitle>
            <Badge
              variant={
                currentCard.difficulty === "Foundation"
                  ? "secondary"
                  : currentCard.difficulty === "Intermediate"
                    ? "default"
                    : currentCard.difficulty === "Advanced"
                      ? "destructive"
                      : "outline"
              }
            >
              {currentCard.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] flex items-center">
            <div className="w-full">
              {isFlipped ? (
                <div className="space-y-4">
                  <div className="whitespace-pre-line text-sm leading-relaxed">{currentCard.back}</div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Legal Principle: {currentCard.legalPrinciple}
                    </p>
                    {currentCard.caseReferences && (
                      <p className="text-xs text-muted-foreground">Cases: {currentCard.caseReferences.join(", ")}</p>
                    )}
                    {currentCard.statuteReferences && (
                      <p className="text-xs text-muted-foreground">
                        Statutes: {currentCard.statuteReferences.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-lg leading-relaxed">{currentCard.front}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" onClick={prevCard} disabled={cards.length <= 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
            {isFlipped ? "Show Question" : "Show Answer"}
          </Button>
        </div>

        <Button variant="outline" onClick={nextCard} disabled={cards.length <= 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {isFlipped && (
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="destructive" onClick={markIncorrect}>
            Incorrect
          </Button>
          <Button variant="default" onClick={markCorrect}>
            Correct
          </Button>
        </div>
      )}
    </div>
  )
}
