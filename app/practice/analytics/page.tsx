"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Target, Clock, BookOpen, Award, Calendar, Filter } from "lucide-react"
import Link from "next/link"

const performanceData = [
  { module: "Contract Law", score: 78, questions: 245, time: 180 },
  { module: "Tort Law", score: 82, questions: 198, time: 145 },
  { module: "Business Law", score: 71, questions: 167, time: 125 },
  { module: "Property Law", score: 85, questions: 134, time: 98 },
  { module: "Criminal Law", score: 79, questions: 156, time: 112 },
  { module: "Dispute Resolution", score: 73, questions: 89, time: 67 },
]

const progressData = [
  { week: "Week 1", score: 65, questions: 45 },
  { week: "Week 2", score: 68, questions: 78 },
  { week: "Week 3", score: 72, questions: 92 },
  { week: "Week 4", score: 75, questions: 115 },
  { week: "Week 5", score: 78, questions: 134 },
  { week: "Week 6", score: 81, questions: 156 },
]

const difficultyData = [
  { name: "Foundation", value: 45, color: "#10b981" },
  { name: "Intermediate", value: 35, color: "#3b82f6" },
  { name: "Advanced", value: 15, color: "#f59e0b" },
  { name: "Expert", value: 5, color: "#ef4444" },
]

const topicWeaknesses = [
  { topic: "Directors' Duties", score: 62, improvement: -5 },
  { topic: "Negligence", score: 68, improvement: 3 },
  { topic: "Contract Formation", score: 71, improvement: 8 },
  { topic: "Property Registration", score: 74, improvement: 2 },
  { topic: "Criminal Defences", score: 76, improvement: 12 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const totalQuestions = performanceData.reduce((sum, module) => sum + module.questions, 0)
  const averageScore = Math.round(
    performanceData.reduce((sum, module) => sum + module.score, 0) / performanceData.length,
  )
  const totalTime = performanceData.reduce((sum, module) => sum + module.time, 0)

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
              <span className="text-foreground font-medium">Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 90 days"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
          <p className="text-muted-foreground mt-2">Detailed insights into your SQE preparation progress</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuestions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalTime / 60)}h</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                Above SQE average
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">By Module</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Performance by Module</CardTitle>
                  <CardDescription>Your average scores across different law modules</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="module" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Question Difficulty Distribution</CardTitle>
                  <CardDescription>Breakdown of questions by difficulty level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid gap-4">
              {performanceData.map((module, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{module.module}</h3>
                      <Badge
                        variant={module.score >= 80 ? "default" : module.score >= 70 ? "secondary" : "destructive"}
                      >
                        {module.score}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={module.score} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{module.questions} questions completed</span>
                        <span>
                          {Math.round(module.time / 60)}h {module.time % 60}m spent
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Your improvement in scores and question completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="questions" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weaknesses" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Topics where you need more practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicWeaknesses.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{topic.topic}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={topic.score} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{topic.score}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {topic.improvement > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${topic.improvement > 0 ? "text-green-500" : "text-red-500"}`}>
                          {topic.improvement > 0 ? "+" : ""}
                          {topic.improvement}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>SQE Pass Prediction</CardTitle>
                  <CardDescription>Based on your current performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-green-600">92%</div>
                    <p className="text-muted-foreground">Predicted pass probability</p>
                    <Progress value={92} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      You're performing well above the pass threshold. Keep up the excellent work!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Recommended Study Plan</CardTitle>
                  <CardDescription>Personalized recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900">Focus Areas</h4>
                      <p className="text-sm text-blue-700">
                        Spend more time on Directors' Duties and Contract Formation
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900">Strengths</h4>
                      <p className="text-sm text-green-700">Continue practicing Property Law and Tort Law</p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-900">Study Schedule</h4>
                      <p className="text-sm text-orange-700">2-3 hours daily, focus on weak areas 60% of time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
