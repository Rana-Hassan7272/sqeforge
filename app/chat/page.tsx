"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, Lightbulb, BookOpen, HelpCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import ForgerChat from "@/components/forger-chat"

const topicSuggestions = [
  {
    category: "Contract Law",
    topics: [
      "Contract formation elements",
      "Offer vs invitation to treat",
      "Postal rule for acceptance",
      "Consideration requirements",
      "Breach of contract remedies",
    ],
  },
  {
    category: "Tort Law",
    topics: [
      "Negligence duty of care",
      "Causation in negligence",
      "Occupiers' liability",
      "Nuisance private vs public",
      "Defamation defenses",
    ],
  },
  {
    category: "Property Law",
    topics: [
      "Conveyancing process",
      "Land registration",
      "Landlord and tenant rights",
      "Mortgage law basics",
      "Easements and covenants",
    ],
  },
  {
    category: "Business Law",
    topics: [
      "Company formation",
      "Directors' duties",
      "Shareholder rights",
      "Partnership law",
      "Insolvency procedures",
    ],
  },
]

const commonQuestions = [
  {
    question: "What's the difference between offer and invitation to treat?",
    category: "Contract Law",
    difficulty: "Medium",
  },
  {
    question: "How do I remember the elements of negligence?",
    category: "Tort Law",
    difficulty: "Easy",
  },
  {
    question: "When does the postal rule apply?",
    category: "Contract Law",
    difficulty: "Hard",
  },
  {
    question: "What are directors' fiduciary duties?",
    category: "Business Law",
    difficulty: "Medium",
  },
  {
    question: "Explain consideration in simple terms",
    category: "Contract Law",
    difficulty: "Easy",
  },
  {
    question: "What's the conveyancing process?",
    category: "Property Law",
    difficulty: "Medium",
  },
]

export default function ChatPage() {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [selectedQuestion, setSelectedQuestion] = useState<string>("")

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question)
    setIsChatOpen(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-blue-100 text-blue-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SQE Forge</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Forger AI Chat</span>
            </div>
            <Button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-secondary hover:bg-secondary/90">
              <MessageSquare className="w-4 h-4 mr-2" />
              {isChatOpen ? "Close Chat" : "Open Chat"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Meet Forger AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Your personal AI study assistant that explains complex legal concepts in simple, everyday language
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Instant explanations</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-secondary" />
              <span>Simple language</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-secondary" />
              <span>Practical examples</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Common Questions */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Popular Questions</h2>
            <div className="space-y-4">
              {commonQuestions.map((item, index) => (
                <Card
                  key={index}
                  className="border-border cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleQuestionSelect(item.question)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground mb-2">{item.question}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                        </div>
                      </div>
                      <MessageSquare className="w-5 h-5 text-muted-foreground ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Topic Suggestions */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Topic</h2>
            <div className="space-y-6">
              {topicSuggestions.map((category, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <CardDescription>Click any topic to ask Forger about it</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.topics.map((topic, topicIndex) => (
                        <button
                          key={topicIndex}
                          onClick={() => handleQuestionSelect(`Explain ${topic} in simple terms`)}
                          className="w-full text-left p-3 rounded-lg border border-border hover:bg-card transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{topic}</span>
                            <HelpCircle className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How Forger Helps You Learn</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border text-center">
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle>Simple Explanations</CardTitle>
                <CardDescription>
                  Complex legal concepts broken down into everyday language that anyone can understand
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle>Practical Examples</CardTitle>
                <CardDescription>
                  Real-world scenarios and analogies that make abstract legal principles concrete and memorable
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border text-center">
              <CardHeader>
                <HelpCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle>Instant Answers</CardTitle>
                <CardDescription>
                  Get immediate help whenever you're stuck, whether studying notes, practicing questions, or reviewing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="border-secondary bg-secondary/5 max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <Bot className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Ready to start learning?</h3>
              <p className="text-muted-foreground mb-6">
                Ask Forger anything about SQE topics and get explanations that actually make sense
              </p>
              <Button size="lg" onClick={() => setIsChatOpen(true)} className="bg-secondary hover:bg-secondary/90">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chatting with Forger
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forger Chat Component */}
      <ForgerChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} initialQuestion={selectedQuestion} />
    </div>
  )
}
