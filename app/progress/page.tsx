"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  BookOpen,
  Brain,
  Award,
  Calendar,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  // Mock data - in real app this would come from API
  const overallProgress = {
    flk1: 68,
    flk2: 45,
    overall: 56,
  }

  const weeklyStats = {
    questionsAnswered: 127,
    timeSpent: "8h 32m",
    accuracy: 73,
    streak: 5,
  }

  const moduleProgress = [
    { name: "Constitutional Law", flk: "FLK1", progress: 85, accuracy: 78, questions: 45, timeSpent: "2h 15m" },
    { name: "Contract Law", flk: "FLK1", progress: 72, accuracy: 81, questions: 38, timeSpent: "1h 45m" },
    { name: "Tort Law", flk: "FLK1", progress: 65, accuracy: 69, questions: 42, timeSpent: "2h 30m" },
    { name: "Criminal Law", flk: "FLK1", progress: 58, accuracy: 75, questions: 35, timeSpent: "1h 20m" },
    { name: "Advocacy", flk: "FLK2", progress: 45, accuracy: 67, questions: 28, timeSpent: "1h 10m" },
    { name: "Interviewing", flk: "FLK2", progress: 52, accuracy: 72, questions: 31, timeSpent: "1h 25m" },
    { name: "Case Analysis", flk: "FLK2", progress: 38, accuracy: 64, questions: 22, timeSpent: "55m" },
  ]

  const recentActivity = [
    { type: "practice", module: "Contract Law", score: 85, date: "Today", time: "2:30 PM" },
    { type: "mock", module: "FLK1 Mock", score: 72, date: "Yesterday", time: "4:15 PM" },
    { type: "study", module: "Tort Law", score: null, date: "Yesterday", time: "10:30 AM" },
    { type: "practice", module: "Criminal Law", score: 78, date: "2 days ago", time: "6:45 PM" },
  ]

  const studyGoals = [
    { goal: "Complete 50 questions this week", current: 42, target: 50, deadline: "3 days" },
    { goal: "Achieve 80% accuracy in Contract Law", current: 81, target: 80, deadline: "Completed" },
    { goal: "Finish FLK1 revision notes", current: 68, target: 100, deadline: "1 week" },
  ]

  const timetableProgress = {
    currentWeek: 3,
    totalWeeks: 12,
    examSession: "January 2025",
    weeklyTarget: {
      studyHours: 20,
      practiceQuestions: 100,
      mockExams: 1,
    },
    weeklyActual: {
      studyHours: 18,
      practiceQuestions: 127,
      mockExams: 1,
    },
    onTrack: true,
  }

  const examReadiness = {
    flk1: {
      score: 68,
      passThreshold: 60,
      status: "pass",
      scaledScore: 72, // Using SRA Angoff method
      confidence: 85,
    },
    flk2: {
      score: 45,
      passThreshold: 60,
      status: "fail",
      scaledScore: 48,
      confidence: 62,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">SQE Forge</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/practice">Practice</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your SQE preparation journey and performance analytics</p>
        </div>

        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Timetable Progress - {timetableProgress.examSession}
            </CardTitle>
            <CardDescription>Your progress against your personalized study schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {timetableProgress.currentWeek}/{timetableProgress.totalWeeks}
                </div>
                <div className="text-sm text-muted-foreground">Weeks Complete</div>
                <Progress
                  value={(timetableProgress.currentWeek / timetableProgress.totalWeeks) * 100}
                  className="h-2 mt-2"
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {timetableProgress.weeklyActual.studyHours}/{timetableProgress.weeklyTarget.studyHours}h
                </div>
                <div className="text-sm text-muted-foreground">This Week's Study Hours</div>
                <Progress
                  value={(timetableProgress.weeklyActual.studyHours / timetableProgress.weeklyTarget.studyHours) * 100}
                  className="h-2 mt-2"
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {timetableProgress.weeklyActual.practiceQuestions}/{timetableProgress.weeklyTarget.practiceQuestions}
                </div>
                <div className="text-sm text-muted-foreground">Practice Questions</div>
                <Progress
                  value={
                    (timetableProgress.weeklyActual.practiceQuestions /
                      timetableProgress.weeklyTarget.practiceQuestions) *
                    100
                  }
                  className="h-2 mt-2"
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {timetableProgress.weeklyActual.mockExams}/{timetableProgress.weeklyTarget.mockExams}
                </div>
                <div className="text-sm text-muted-foreground">Mock Exams</div>
                <Badge variant={timetableProgress.onTrack ? "default" : "destructive"}>
                  {timetableProgress.onTrack ? "On Track" : "Behind"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/timetable">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Timetable
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/study">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Studying
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Exam Readiness Assessment
            </CardTitle>
            <CardDescription>Pass/fail analysis using SRA's Modified Angoff scoring method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">FLK1 Assessment</h3>
                  <Badge
                    variant={examReadiness.flk1.status === "pass" ? "default" : "destructive"}
                    className={
                      examReadiness.flk1.status === "pass" ? "bg-green-100 text-green-800 border-green-200" : ""
                    }
                  >
                    {examReadiness.flk1.status === "pass" ? "PASS" : "FAIL"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raw Score:</span>
                    <span className="font-medium">{examReadiness.flk1.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Scaled Score (Angoff):</span>
                    <span className="font-medium">{examReadiness.flk1.scaledScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pass Threshold:</span>
                    <span className="font-medium">{examReadiness.flk1.passThreshold}%</span>
                  </div>
                  <Progress value={examReadiness.flk1.scaledScore} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Confidence Level: {examReadiness.flk1.confidence}%</span>
                    <span>
                      {examReadiness.flk1.scaledScore >= examReadiness.flk1.passThreshold ? "Ready" : "Needs Work"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">FLK2 Assessment</h3>
                  <Badge
                    variant={examReadiness.flk2.status === "pass" ? "default" : "destructive"}
                    className={
                      examReadiness.flk2.status === "pass" ? "bg-green-100 text-green-800 border-green-200" : ""
                    }
                  >
                    {examReadiness.flk2.status === "pass" ? "PASS" : "FAIL"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raw Score:</span>
                    <span className="font-medium">{examReadiness.flk2.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Scaled Score (Angoff):</span>
                    <span className="font-medium">{examReadiness.flk2.scaledScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pass Threshold:</span>
                    <span className="font-medium">{examReadiness.flk2.passThreshold}%</span>
                  </div>
                  <Progress value={examReadiness.flk2.scaledScore} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Confidence Level: {examReadiness.flk2.confidence}%</span>
                    <span>
                      {examReadiness.flk2.scaledScore >= examReadiness.flk2.passThreshold ? "Ready" : "Needs Work"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <h4 className="font-medium text-foreground mb-2">About SRA's Modified Angoff Scoring</h4>
              <p className="text-sm text-muted-foreground">
                The scaled score uses the SRA's Modified Angoff method, which adjusts your raw score based on question
                difficulty. Harder questions contribute more to your scaled score, providing a more accurate assessment
                of your competency level.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions This Week</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{weeklyStats.questionsAnswered}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span>+12% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{weeklyStats.timeSpent}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span>+8% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{weeklyStats.accuracy}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                <span>-2% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{weeklyStats.streak} days</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Keep it up!</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Overall Progress
                  </CardTitle>
                  <CardDescription>Your completion progress across both FLK modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">FLK1 Progress</span>
                      <span className="text-sm text-muted-foreground">{overallProgress.flk1}%</span>
                    </div>
                    <Progress value={overallProgress.flk1} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">FLK2 Progress</span>
                      <span className="text-sm text-muted-foreground">{overallProgress.flk2}%</span>
                    </div>
                    <Progress value={overallProgress.flk2} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Completion</span>
                      <span className="text-sm text-muted-foreground">{overallProgress.overall}%</span>
                    </div>
                    <Progress value={overallProgress.overall} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                  <CardDescription>Your performance metrics for this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">{weeklyStats.questionsAnswered}</div>
                      <div className="text-sm text-muted-foreground">Questions</div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">{weeklyStats.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">{weeklyStats.timeSpent}</div>
                      <div className="text-sm text-muted-foreground">Study Time</div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">{weeklyStats.streak}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
                <CardDescription>Detailed progress breakdown by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {moduleProgress.map((module, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant={module.flk === "FLK1" ? "default" : "secondary"}>{module.flk}</Badge>
                          <span className="font-medium">{module.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{module.questions} questions</span>
                          <span>{module.timeSpent}</span>
                          <span className="font-medium">{module.accuracy}% accuracy</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={module.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium w-12">{module.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest study sessions and practice attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        {activity.type === "practice" && <BookOpen className="h-4 w-4 text-secondary" />}
                        {activity.type === "mock" && <Target className="h-4 w-4 text-secondary" />}
                        {activity.type === "study" && <Brain className="h-4 w-4 text-secondary" />}
                        <div>
                          <div className="font-medium">{activity.module}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.type === "practice" && "Practice Session"}
                            {activity.type === "mock" && "Mock Exam"}
                            {activity.type === "study" && "Study Session"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.score && <div className="font-medium text-secondary">{activity.score}%</div>}
                        <div className="text-sm text-muted-foreground">
                          {activity.date} at {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Study Goals</CardTitle>
                <CardDescription>Track your progress towards your study objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studyGoals.map((goal, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{goal.goal}</span>
                        <div className="flex items-center gap-2">
                          {goal.deadline === "Completed" ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {goal.deadline}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress
                          value={goal.deadline === "Completed" ? 100 : (goal.current / goal.target) * 100}
                          className="flex-1 h-2"
                        />
                        <span className="text-sm font-medium w-16">
                          {goal.deadline === "Completed" ? "100%" : `${goal.current}/${goal.target}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Timetable Integration</CardTitle>
                <CardDescription>How your progress aligns with your study schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">Week {timetableProgress.currentWeek}</div>
                      <div className="text-sm text-muted-foreground">Current Week</div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">
                        {Math.round((timetableProgress.currentWeek / timetableProgress.totalWeeks) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Schedule Complete</div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-2xl font-bold text-secondary">
                        {timetableProgress.totalWeeks - timetableProgress.currentWeek}
                      </div>
                      <div className="text-sm text-muted-foreground">Weeks Remaining</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Weekly Targets vs Actual</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Study Hours</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              (timetableProgress.weeklyActual.studyHours / timetableProgress.weeklyTarget.studyHours) *
                              100
                            }
                            className="w-24 h-2"
                          />
                          <span className="text-sm font-medium w-16">
                            {timetableProgress.weeklyActual.studyHours}/{timetableProgress.weeklyTarget.studyHours}h
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Practice Questions</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              (timetableProgress.weeklyActual.practiceQuestions /
                                timetableProgress.weeklyTarget.practiceQuestions) *
                              100
                            }
                            className="w-24 h-2"
                          />
                          <span className="text-sm font-medium w-16">
                            {timetableProgress.weeklyActual.practiceQuestions}/
                            {timetableProgress.weeklyTarget.practiceQuestions}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mock Exams</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={
                              (timetableProgress.weeklyActual.mockExams / timetableProgress.weeklyTarget.mockExams) *
                              100
                            }
                            className="w-24 h-2"
                          />
                          <span className="text-sm font-medium w-16">
                            {timetableProgress.weeklyActual.mockExams}/{timetableProgress.weeklyTarget.mockExams}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
