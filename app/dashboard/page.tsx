"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  BookOpen,
  Brain,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Award,
  MessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import ForgerChat from "@/components/forger-chat"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    window.location.href = "/"
  }

  const getDisplayName = () => {
    if (!currentUser) return "User"
    if (currentUser.firstName && currentUser.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`
    }
    if (currentUser.firstName) {
      return currentUser.firstName
    }
    return "User"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SQE Forge</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(!isChatOpen)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Forger AI
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome {getDisplayName()}!</h1>
          <p className="text-muted-foreground">Continue your SQE preparation journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions Completed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Start practicing today</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">Complete questions to see score</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 days</div>
              <p className="text-xs text-muted-foreground">Start your streak!</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Mock Exams</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Ready when you are</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your performance across different modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">FLK1 - Business Law</span>
                    <span className="text-sm text-muted-foreground">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">FLK1 - Dispute Resolution</span>
                    <span className="text-sm text-muted-foreground">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">FLK1 - Contract Law</span>
                    <span className="text-sm text-muted-foreground">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">FLK2 - Property Practice</span>
                    <span className="text-sm text-muted-foreground">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-start space-y-2" asChild>
                    <Link href="/practice">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                      <div className="text-left">
                        <div className="font-semibold">Practice Questions</div>
                        <div className="text-sm opacity-90">Continue with Contract Law</div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/practice?mode=timed">
                      <Clock className="w-6 h-6 text-foreground" />
                      <div className="text-left">
                        <div className="font-semibold">Timed Mock</div>
                        <div className="text-sm text-muted-foreground">Take a full practice exam</div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/study">
                      <Brain className="w-6 h-6 text-foreground" />
                      <div className="text-left">
                        <div className="font-semibold">Study Materials</div>
                        <div className="text-sm text-muted-foreground">Review notes & flashcards</div>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent"
                    onClick={() => setIsChatOpen(true)}
                  >
                    <MessageSquare className="w-6 h-6 text-foreground" />
                    <div className="text-left">
                      <div className="font-semibold">Ask Forger AI</div>
                      <div className="text-sm text-muted-foreground">Get instant explanations</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                  <p className="text-xs text-muted-foreground mt-1">Start practicing to see your progress here</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No upcoming items</p>
                  <p className="text-xs text-muted-foreground mt-1">Schedule your study sessions</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Tip */}
            <Card className="border-border bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-secondary">💡 Study Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Start with practice questions to identify your strengths and areas for improvement. Focus on
                  understanding the underlying legal principles behind each answer.
                </p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent" asChild>
                  <Link href="/practice">Start Practicing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ForgerChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  )
}
