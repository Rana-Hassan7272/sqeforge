"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckSquare, ArrowLeft, BookOpen, Brain, Target, Clock, Award } from "lucide-react"
import Link from "next/link"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: string
  resources: string[]
}

const checklistData: Record<string, ChecklistItem[]> = {
  "contract-formation": [
    {
      id: "understand-offer",
      title: "Understand what constitutes an offer",
      description: "Learn the difference between an offer and invitation to treat",
      category: "Offer",
      completed: true,
      difficulty: "Easy",
      estimatedTime: "15 mins",
      resources: ["Notes p.1-3", "Cases: Carlill v Carbolic"],
    },
    {
      id: "offer-communication",
      title: "Master offer communication rules",
      description: "Understand how offers must be communicated to be valid",
      category: "Offer",
      completed: true,
      difficulty: "Medium",
      estimatedTime: "20 mins",
      resources: ["Notes p.4-6", "Cases: Taylor v Laird"],
    },
    {
      id: "acceptance-rules",
      title: "Learn acceptance requirements",
      description: "Understand mirror image rule and methods of acceptance",
      category: "Acceptance",
      completed: true,
      difficulty: "Medium",
      estimatedTime: "25 mins",
      resources: ["Notes p.7-10", "Cases: Hyde v Wrench"],
    },
    {
      id: "postal-rule",
      title: "Master the postal rule",
      description: "Understand when acceptance is effective in postal communications",
      category: "Acceptance",
      completed: false,
      difficulty: "Hard",
      estimatedTime: "30 mins",
      resources: ["Notes p.11-13", "Cases: Adams v Lindsell"],
    },
    {
      id: "consideration-basics",
      title: "Understand consideration fundamentals",
      description: "Learn what constitutes valid consideration",
      category: "Consideration",
      completed: true,
      difficulty: "Easy",
      estimatedTime: "20 mins",
      resources: ["Notes p.14-16", "Cases: Currie v Misa"],
    },
    {
      id: "past-consideration",
      title: "Study past consideration rule",
      description: "Understand why past consideration is generally invalid",
      category: "Consideration",
      completed: true,
      difficulty: "Medium",
      estimatedTime: "25 mins",
      resources: ["Notes p.17-19", "Cases: Re McArdle"],
    },
    {
      id: "promissory-estoppel",
      title: "Learn promissory estoppel",
      description: "Understand when promises without consideration can be enforced",
      category: "Consideration",
      completed: false,
      difficulty: "Hard",
      estimatedTime: "35 mins",
      resources: ["Notes p.20-22", "Cases: Central London Property Trust"],
    },
    {
      id: "commercial-presumption",
      title: "Study commercial presumption",
      description: "Understand presumption of intention in commercial contexts",
      category: "Intention",
      completed: true,
      difficulty: "Easy",
      estimatedTime: "15 mins",
      resources: ["Notes p.23-24", "Cases: Edwards v Skyways"],
    },
    {
      id: "domestic-presumption",
      title: "Learn domestic arrangements rule",
      description: "Understand presumption against intention in domestic contexts",
      category: "Intention",
      completed: false,
      difficulty: "Medium",
      estimatedTime: "20 mins",
      resources: ["Notes p.25-26", "Cases: Balfour v Balfour"],
    },
    {
      id: "certainty-requirements",
      title: "Master certainty requirements",
      description: "Understand when terms are too uncertain to enforce",
      category: "Certainty",
      completed: false,
      difficulty: "Hard",
      estimatedTime: "30 mins",
      resources: ["Notes p.27-29", "Cases: Scammell v Ouston"],
    },
    {
      id: "practice-questions",
      title: "Complete practice questions",
      description: "Test understanding with scenario-based questions",
      category: "Assessment",
      completed: false,
      difficulty: "Hard",
      estimatedTime: "45 mins",
      resources: ["Practice Questions 1-10"],
    },
    {
      id: "case-law-review",
      title: "Review key case law",
      description: "Memorize key facts and principles from leading cases",
      category: "Assessment",
      completed: false,
      difficulty: "Medium",
      estimatedTime: "40 mins",
      resources: ["Case Summary Sheet"],
    },
  ],
}

export default function ChecklistPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState(checklistData[params.id] || [])
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]
  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const progressPercentage = (completedCount / totalCount) * 100

  const toggleItem = (itemId: string) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)))
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Assessment":
        return <Target className="w-4 h-4" />
      case "Offer":
        return <BookOpen className="w-4 h-4" />
      case "Acceptance":
        return <CheckSquare className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/study/${params.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Notes
                </Link>
              </Button>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Progress Checklist</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress Overview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                  Contract Formation Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-foreground">Overall Progress</span>
                    <span className="text-2xl font-bold text-foreground">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {completedCount} of {totalCount} items completed
                    </span>
                    <span>
                      {items
                        .filter((i) => !i.completed)
                        .reduce((acc, item) => {
                          const time = Number.parseInt(item.estimatedTime)
                          return acc + (isNaN(time) ? 0 : time)
                        }, 0)}{" "}
                      mins remaining
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {category !== "all" && getCategoryIcon(category)}
                  {category === "all" ? "All Items" : category}
                  <Badge variant="secondary" className="ml-1">
                    {category === "all" ? totalCount : items.filter((i) => i.category === category).length}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Checklist Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`border-border transition-all ${
                    item.completed ? "bg-green-50 border-green-200" : "hover:shadow-md"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Checkbox checked={item.completed} onCheckedChange={() => toggleItem(item.id)} className="mt-1" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3
                              className={`font-semibold text-foreground ${
                                item.completed ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.estimatedTime}
                            </Badge>
                          </div>
                        </div>

                        {item.resources.length > 0 && (
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1">Resources:</h4>
                            <div className="flex flex-wrap gap-1">
                              {item.resources.map((resource, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-medium text-green-600">{completedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="font-medium text-orange-600">{totalCount - completedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Items</span>
                  <span className="font-medium text-foreground">{totalCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href={`/study/${params.id}`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Notes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/study/${params.id}/mindmap`}>
                    <Brain className="w-4 h-4 mr-2" />
                    View Mind Map
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/practice/contract-law`}>
                    <Target className="w-4 h-4 mr-2" />
                    Practice Questions
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievement */}
            {progressPercentage >= 75 && (
              <Card className="border-border bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="pt-6 text-center">
                  <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Great Progress!</h3>
                  <p className="text-sm text-muted-foreground">
                    You're {Math.round(progressPercentage)}% complete. Keep going!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
