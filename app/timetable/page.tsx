"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudyCalendar } from "@/components/study-calendar"
import {
  Calendar,
  Clock,
  Target,
  BookOpen,
  Brain,
  CheckSquare,
  ArrowRight,
  Download,
  Settings,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface ExamSession {
  id: string
  name: string
  date: string
  registrationDeadline: string
  weeksRemaining: number
  recommended: boolean
}

interface WeeklySchedule {
  week: number
  startDate: string
  endDate: string
  focus: string
  topics: string[]
  studyHours: number
  mockExams: number
  practiceQuestions: number
  milestones: string[]
}

const examSessions: ExamSession[] = [
  {
    id: "jan-2025",
    name: "January 2025",
    date: "27-31 January 2025",
    registrationDeadline: "15 December 2024",
    weeksRemaining: 12,
    recommended: true,
  },
  {
    id: "jul-2025",
    name: "July 2025",
    date: "21-25 July 2025",
    registrationDeadline: "15 June 2025",
    weeksRemaining: 36,
    recommended: false,
  },
]

const januaryTimetable: WeeklySchedule[] = [
  {
    week: 1,
    startDate: "4 Nov 2024",
    endDate: "10 Nov 2024",
    focus: "Foundation Building",
    topics: ["Contract Law Basics", "Tort Law Introduction"],
    studyHours: 15,
    mockExams: 0,
    practiceQuestions: 50,
    milestones: ["Complete Contract Formation notes", "Understand negligence basics"],
  },
  {
    week: 2,
    startDate: "11 Nov 2024",
    endDate: "17 Nov 2024",
    focus: "Core Concepts",
    topics: ["Contract Terms", "Tort Liability"],
    studyHours: 18,
    mockExams: 0,
    practiceQuestions: 75,
    milestones: ["Master contract terms", "Complete tort liability checklist"],
  },
  {
    week: 3,
    startDate: "18 Nov 2024",
    endDate: "24 Nov 2024",
    focus: "Business Law Fundamentals",
    topics: ["Company Formation", "Directors' Duties"],
    studyHours: 20,
    mockExams: 1,
    practiceQuestions: 100,
    milestones: ["Understand company structures", "First FLK1 mock exam"],
  },
  {
    week: 4,
    startDate: "25 Nov 2024",
    endDate: "1 Dec 2024",
    focus: "Property Practice",
    topics: ["Conveyancing Process", "Land Registration"],
    studyHours: 20,
    mockExams: 1,
    practiceQuestions: 100,
    milestones: ["Complete conveyancing flowchart", "First FLK2 mock exam"],
  },
  {
    week: 5,
    startDate: "2 Dec 2024",
    endDate: "8 Dec 2024",
    focus: "Dispute Resolution",
    topics: ["Civil Procedure", "Alternative Dispute Resolution"],
    studyHours: 22,
    mockExams: 1,
    practiceQuestions: 125,
    milestones: ["Master CPR rules", "Complete ADR comparison chart"],
  },
  {
    week: 6,
    startDate: "9 Dec 2024",
    endDate: "15 Dec 2024",
    focus: "Criminal Practice",
    topics: ["Police Powers", "Court Procedures"],
    studyHours: 22,
    mockExams: 1,
    practiceQuestions: 125,
    milestones: ["Understand PACE codes", "Complete criminal procedure timeline"],
  },
  {
    week: 7,
    startDate: "16 Dec 2024",
    endDate: "22 Dec 2024",
    focus: "Consolidation Week",
    topics: ["Review All Topics", "Identify Weak Areas"],
    studyHours: 18,
    mockExams: 2,
    practiceQuestions: 150,
    milestones: ["Complete comprehensive review", "Take diagnostic mocks"],
  },
  {
    week: 8,
    startDate: "23 Dec 2024",
    endDate: "29 Dec 2024",
    focus: "Holiday Review",
    topics: ["Light Review", "Flashcard Practice"],
    studyHours: 10,
    mockExams: 0,
    practiceQuestions: 50,
    milestones: ["Maintain momentum", "Review flashcards daily"],
  },
  {
    week: 9,
    startDate: "30 Dec 2024",
    endDate: "5 Jan 2025",
    focus: "Intensive Practice",
    topics: ["Mock Exams", "Timed Practice"],
    studyHours: 25,
    mockExams: 3,
    practiceQuestions: 200,
    milestones: ["Complete 3 full mocks", "Achieve 70%+ average"],
  },
  {
    week: 10,
    startDate: "6 Jan 2025",
    endDate: "12 Jan 2025",
    focus: "Final Preparation",
    topics: ["Weak Area Focus", "Exam Technique"],
    studyHours: 25,
    mockExams: 2,
    practiceQuestions: 150,
    milestones: ["Address all weak areas", "Perfect exam timing"],
  },
  {
    week: 11,
    startDate: "13 Jan 2025",
    endDate: "19 Jan 2025",
    focus: "Peak Performance",
    topics: ["Final Review", "Confidence Building"],
    studyHours: 20,
    mockExams: 2,
    practiceQuestions: 100,
    milestones: ["Achieve consistent 75%+", "Complete final review"],
  },
  {
    week: 12,
    startDate: "20 Jan 2025",
    endDate: "26 Jan 2025",
    focus: "Exam Week",
    topics: ["Light Review", "Rest & Preparation"],
    studyHours: 8,
    mockExams: 0,
    practiceQuestions: 25,
    milestones: ["Stay calm and confident", "Take the SQE!"],
  },
]

const julyTimetable: WeeklySchedule[] = [
  {
    week: 1,
    startDate: "4 Nov 2024",
    endDate: "10 Nov 2024",
    focus: "Getting Started",
    topics: ["Study Planning", "Resource Familiarization"],
    studyHours: 8,
    mockExams: 0,
    practiceQuestions: 25,
    milestones: ["Set up study space", "Complete diagnostic assessment"],
  },
  {
    week: 2,
    startDate: "11 Nov 2024",
    endDate: "17 Nov 2024",
    focus: "Contract Law Foundation",
    topics: ["Contract Formation", "Terms and Conditions"],
    studyHours: 10,
    mockExams: 0,
    practiceQuestions: 40,
    milestones: ["Complete contract formation notes", "Understand offer and acceptance"],
  },
  // ... more weeks would continue with gradual progression
]

export default function TimetablePage() {
  const [selectedExam, setSelectedExam] = useState<string>("jan-2025")
  const [currentWeek, setCurrentWeek] = useState(1)

  const selectedSession = examSessions.find((session) => session.id === selectedExam)
  const timetable = selectedExam === "jan-2025" ? januaryTimetable : julyTimetable
  const currentWeekData = timetable.find((week) => week.week === currentWeek)

  const totalStudyHours = timetable.reduce((sum, week) => sum + week.studyHours, 0)
  const totalMockExams = timetable.reduce((sum, week) => sum + week.mockExams, 0)
  const totalQuestions = timetable.reduce((sum, week) => sum + week.practiceQuestions, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
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
              <span className="text-foreground font-medium">Study Timetable</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Personalized Study Timetable</h1>
          <p className="text-muted-foreground">
            Choose your exam session and follow a structured weekly plan designed to maximize your success
          </p>
        </div>

        {/* Exam Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Select Your Exam Session</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {examSessions.map((session) => (
              <Card
                key={session.id}
                className={`border-border cursor-pointer transition-all ${
                  selectedExam === session.id ? "ring-2 ring-primary border-primary bg-primary/5" : "hover:shadow-md"
                } ${session.recommended ? "border-green-200 bg-green-50" : ""}`}
                onClick={() => setSelectedExam(session.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{session.name}</CardTitle>
                    {session.recommended && <Badge className="bg-green-100 text-green-800">Recommended</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Exam Dates: {session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Registration Deadline: {session.registrationDeadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{session.weeksRemaining} weeks remaining</span>
                    </div>
                    {session.recommended && (
                      <div className="bg-green-100 border border-green-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-green-800">
                          Recommended for focused preparation with intensive study schedule
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedSession && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Timetable Overview */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    {selectedSession.name} Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{selectedSession.weeksRemaining}</div>
                      <div className="text-sm text-muted-foreground">Weeks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{totalStudyHours}</div>
                      <div className="text-sm text-muted-foreground">Study Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{totalMockExams}</div>
                      <div className="text-sm text-muted-foreground">Mock Exams</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                      <div className="text-sm text-muted-foreground">Practice Questions</div>
                    </div>
                  </div>
                  <Progress value={(currentWeek / selectedSession.weeksRemaining) * 100} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>
                      Week {currentWeek} of {selectedSession.weeksRemaining}
                    </span>
                    <span>{Math.round((currentWeek / selectedSession.weeksRemaining) * 100)}% Complete</span>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Schedule */}
              <Tabs defaultValue="current" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="current">Current Week</TabsTrigger>
                  <TabsTrigger value="overview">Full Schedule</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-6">
                  {currentWeekData && (
                    <Card className="border-border">
                      <CardHeader>
                        <CardTitle className="text-xl">
                          Week {currentWeekData.week}: {currentWeekData.focus}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {currentWeekData.startDate} - {currentWeekData.endDate}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Week Stats */}
                          <div className="grid md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <div>
                                <div className="font-medium text-foreground">{currentWeekData.studyHours}h</div>
                                <div className="text-xs text-muted-foreground">Study Time</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-green-600" />
                              <div>
                                <div className="font-medium text-foreground">{currentWeekData.mockExams}</div>
                                <div className="text-xs text-muted-foreground">Mock Exams</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-purple-600" />
                              <div>
                                <div className="font-medium text-foreground">{currentWeekData.practiceQuestions}</div>
                                <div className="text-xs text-muted-foreground">Questions</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-orange-600" />
                              <div>
                                <div className="font-medium text-foreground">{currentWeekData.milestones.length}</div>
                                <div className="text-xs text-muted-foreground">Milestones</div>
                              </div>
                            </div>
                          </div>

                          {/* Topics */}
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Focus Topics</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentWeekData.topics.map((topic, index) => (
                                <Badge key={index} variant="secondary">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Milestones */}
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Week Milestones</h4>
                            <div className="space-y-2">
                              {currentWeekData.milestones.map((milestone, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckSquare className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-foreground">{milestone}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 pt-4 border-t border-border">
                            <Button asChild>
                              <Link href="/study">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Start Studying
                              </Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href="/practice">
                                <Target className="w-4 h-4 mr-2" />
                                Practice Questions
                              </Link>
                            </Button>
                            {currentWeekData.mockExams > 0 && (
                              <Button variant="outline" asChild>
                                <Link href="/practice/mock">
                                  <Brain className="w-4 h-4 mr-2" />
                                  Take Mock Exam
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="overview" className="space-y-4">
                  {timetable.map((week) => (
                    <Card
                      key={week.week}
                      className={`border-border cursor-pointer transition-all ${
                        currentWeek === week.week ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
                      }`}
                      onClick={() => setCurrentWeek(week.week)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              Week {week.week}: {week.focus}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {week.startDate} - {week.endDate}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {week.topics.slice(0, 2).map((topic, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                              {week.topics.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{week.topics.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{week.studyHours}h</span>
                            <span>{week.practiceQuestions} Qs</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="calendar" className="space-y-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Study Schedule Calendar
                      </CardTitle>
                      <p className="text-muted-foreground">Visual overview of your {selectedSession.name} study plan</p>
                    </CardHeader>
                    <CardContent>
                      <StudyCalendar
                        timetable={timetable}
                        selectedExam={selectedExam}
                        onWeekSelect={setCurrentWeek}
                        currentWeek={currentWeek}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Week Navigation */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Week Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                        disabled={currentWeek === 1}
                      >
                        Previous
                      </Button>
                      <span className="font-medium text-foreground">Week {currentWeek}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(Math.min(selectedSession.weeksRemaining, currentWeek + 1))}
                        disabled={currentWeek === selectedSession.weeksRemaining}
                      >
                        Next
                      </Button>
                    </div>
                    <Progress value={(currentWeek / selectedSession.weeksRemaining) * 100} className="h-2" />
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
                    <Link href="/progress">
                      <Target className="w-4 h-4 mr-2" />
                      View Progress
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/study">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Study Materials
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/practice">
                      <Brain className="w-4 h-4 mr-2" />
                      Practice Questions
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Study Tip */}
              <Card className="border-border bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-secondary">Study Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">
                    Stick to your weekly schedule but be flexible. If you fall behind, focus on understanding rather
                    than rushing through topics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
