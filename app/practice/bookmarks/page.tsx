"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkIcon, Search, Filter, Trash2, Eye, Clock, Tag, SortAsc, SortDesc } from "lucide-react"
import Link from "next/link"

const bookmarkedQuestions = [
  {
    id: 1,
    module: "Contract Law",
    topic: "Formation",
    difficulty: "Intermediate",
    question:
      "Sarah agrees to buy a car from John for £5,000. Before payment, John changes his mind and refuses to sell. What is Sarah's legal position?",
    bookmarkedAt: "2024-01-15",
    tags: ["breach", "damages", "contract formation"],
    answered: true,
    correct: false,
  },
  {
    id: 2,
    module: "Tort Law",
    topic: "Negligence",
    difficulty: "Advanced",
    question:
      "Dr. Smith, a GP, is off duty and walking through a shopping centre when he sees a man collapse. Dr. Smith continues walking without stopping to help.",
    bookmarkedAt: "2024-01-14",
    tags: ["duty of care", "medical negligence", "rescue"],
    answered: true,
    correct: true,
  },
  {
    id: 3,
    module: "Business Law",
    topic: "Directors' Duties",
    difficulty: "Expert",
    question:
      "Sarah is a director of TechCorp Ltd. She discovers a competitor is struggling and personally buys their shares at low price, then proposes TechCorp acquire them.",
    bookmarkedAt: "2024-01-13",
    tags: ["conflict of interest", "fiduciary duty", "corporate governance"],
    answered: false,
    correct: null,
  },
  {
    id: 4,
    module: "Property Law",
    topic: "Contracts for Sale",
    difficulty: "Foundation",
    question:
      "Mark agrees to buy Lisa's house for £300,000. They shake hands and Mark pays £5,000 deposit. Lisa then receives a higher offer and decides to sell to another buyer instead.",
    bookmarkedAt: "2024-01-12",
    tags: ["written contracts", "land law", "formalities"],
    answered: true,
    correct: true,
  },
  {
    id: 5,
    module: "Criminal Law",
    topic: "Police Powers",
    difficulty: "Intermediate",
    question:
      "PC Jones stops David at 2am near a burglary scene. David wears dark clothing and matches the suspect description. What powers does PC Jones have under PACE?",
    bookmarkedAt: "2024-01-11",
    tags: ["PACE", "stop and search", "reasonable suspicion"],
    answered: false,
    correct: null,
  },
]

const bookmarkedNotes = [
  {
    id: 1,
    title: "Key Cases in Negligence",
    module: "Tort Law",
    content: "Donoghue v Stevenson [1932] - established the neighbour principle...",
    bookmarkedAt: "2024-01-10",
    tags: ["negligence", "duty of care", "landmark cases"],
  },
  {
    id: 2,
    title: "Directors' Duties Summary",
    module: "Business Law",
    content: "Section 171-177 Companies Act 2006 outlines seven key duties...",
    bookmarkedAt: "2024-01-09",
    tags: ["directors", "companies act", "fiduciary duties"],
  },
]

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "module" | "difficulty">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredQuestions = bookmarkedQuestions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesModule = !selectedModule || question.module === selectedModule
    return matchesSearch && matchesModule
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case "date":
        comparison = new Date(a.bookmarkedAt).getTime() - new Date(b.bookmarkedAt).getTime()
        break
      case "module":
        comparison = a.module.localeCompare(b.module)
        break
      case "difficulty":
        const difficultyOrder = { Foundation: 1, Intermediate: 2, Advanced: 3, Expert: 4 }
        comparison =
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        break
    }
    return sortOrder === "asc" ? comparison : -comparison
  })

  const modules = [...new Set(bookmarkedQuestions.map((q) => q.module))]

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
              <Link href="/practice" className="text-muted-foreground hover:text-foreground">
                Practice
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Bookmarks</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Bookmarked Content</h1>
          <p className="text-muted-foreground mt-2">Your saved questions, notes, and study materials</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookmarks</CardTitle>
              <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookmarkedQuestions.length + bookmarkedNotes.length}</div>
              <p className="text-xs text-muted-foreground">Questions and notes saved</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookmarkedQuestions.length}</div>
              <p className="text-xs text-muted-foreground">
                {bookmarkedQuestions.filter((q) => q.answered).length} reviewed
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notes</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookmarkedNotes.length}</div>
              <p className="text-xs text-muted-foreground">Study notes saved</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  (bookmarkedQuestions.filter((q) => q.correct === true).length /
                    bookmarkedQuestions.filter((q) => q.answered).length) *
                    100,
                ) || 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">On bookmarked questions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Questions ({bookmarkedQuestions.length})</TabsTrigger>
            <TabsTrigger value="notes">Notes ({bookmarkedNotes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? <SortAsc className="w-4 h-4 mr-2" /> : <SortDesc className="w-4 h-4 mr-2" />}
                  Sort by {sortBy}
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "module" | "difficulty")}
                  className="px-3 py-1 border border-border rounded-md text-sm"
                >
                  <option value="date">Date</option>
                  <option value="module">Module</option>
                  <option value="difficulty">Difficulty</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedModule || ""}
                  onChange={(e) => setSelectedModule(e.target.value || null)}
                  className="px-3 py-1 border border-border rounded-md text-sm"
                >
                  <option value="">All Modules</option>
                  {modules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {sortedQuestions.map((question) => (
                <Card key={question.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{question.module}</Badge>
                        <Badge variant="secondary">{question.topic}</Badge>
                        <Badge
                          variant={
                            question.difficulty === "Foundation"
                              ? "default"
                              : question.difficulty === "Intermediate"
                                ? "secondary"
                                : question.difficulty === "Advanced"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                        {question.answered && (
                          <Badge variant={question.correct ? "default" : "destructive"}>
                            {question.correct ? "Correct" : "Incorrect"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(question.bookmarkedAt).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-foreground mb-4 leading-relaxed">{question.question}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm">Practice Again</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedQuestions.length === 0 && (
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <BookmarkIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookmarks found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedModule
                      ? "Try adjusting your search or filter criteria"
                      : "Start bookmarking questions during practice to save them here"}
                  </p>
                  <Button asChild>
                    <Link href="/practice">Start Practicing</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="space-y-4">
              {bookmarkedNotes.map((note) => (
                <Card key={note.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline">{note.module}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Saved {new Date(note.bookmarkedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-muted-foreground mb-4">{note.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
