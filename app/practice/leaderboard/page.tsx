"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Clock, Target, Crown, Star, Zap } from "lucide-react"
import Link from "next/link"

const globalLeaderboard = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    score: 2847,
    questionsCompleted: 1250,
    averageScore: 89,
    streak: 15,
    badges: ["Expert", "Consistent", "High Achiever"],
    change: 0,
  },
  {
    rank: 2,
    name: "James Wilson",
    avatar: "/avatars/james.jpg",
    score: 2756,
    questionsCompleted: 1180,
    averageScore: 87,
    streak: 12,
    badges: ["Expert", "Speed Demon"],
    change: 1,
  },
  {
    rank: 3,
    name: "Emma Thompson",
    avatar: "/avatars/emma.jpg",
    score: 2698,
    questionsCompleted: 1095,
    averageScore: 91,
    streak: 8,
    badges: ["Perfectionist", "Rising Star"],
    change: -1,
  },
  {
    rank: 4,
    name: "Michael Brown",
    avatar: "/avatars/michael.jpg",
    score: 2634,
    questionsCompleted: 1034,
    averageScore: 85,
    streak: 6,
    badges: ["Consistent"],
    change: 2,
  },
  {
    rank: 5,
    name: "You",
    avatar: "/avatars/user.jpg",
    score: 2589,
    questionsCompleted: 989,
    averageScore: 83,
    streak: 4,
    badges: ["Rising Star"],
    change: -1,
    isCurrentUser: true,
  },
]

const weeklyLeaderboard = [
  {
    rank: 1,
    name: "Emma Thompson",
    avatar: "/avatars/emma.jpg",
    weeklyScore: 456,
    questionsThisWeek: 78,
    averageScore: 94,
    change: 3,
  },
  {
    rank: 2,
    name: "You",
    avatar: "/avatars/user.jpg",
    weeklyScore: 423,
    questionsThisWeek: 65,
    averageScore: 87,
    change: 1,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    weeklyScore: 398,
    questionsThisWeek: 52,
    averageScore: 91,
    change: -2,
  },
]

const achievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first 10 questions",
    icon: "🎯",
    earned: true,
    earnedAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Century Club",
    description: "Complete 100 questions",
    icon: "💯",
    earned: true,
    earnedAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Perfect Score",
    description: "Get 100% on a practice session",
    icon: "⭐",
    earned: true,
    earnedAt: "2024-01-18",
  },
  {
    id: 4,
    name: "Speed Demon",
    description: "Complete 50 questions in under 30 minutes",
    icon: "⚡",
    earned: false,
    progress: 75,
  },
  {
    id: 5,
    name: "Consistency King",
    description: "Practice for 7 days in a row",
    icon: "🔥",
    earned: false,
    progress: 57,
  },
  {
    id: 6,
    name: "Master of All",
    description: "Score 80%+ in all modules",
    icon: "👑",
    earned: false,
    progress: 83,
  },
]

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"weekly" | "monthly" | "allTime">("allTime")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
    return <span className="w-4 h-4 text-muted-foreground">-</span>
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
              <Link href="/practice" className="text-muted-foreground hover:text-foreground">
                Practice
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Leaderboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Rank #5
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground mt-2">Compete with other SQE candidates and track your progress</p>
        </div>

        {/* Your Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#5</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 rotate-180 text-red-500" />
                Down 1 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,589</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +156 this week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievements.filter((a) => a.earned).length}</div>
              <p className="text-xs text-muted-foreground">of {achievements.length} earned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Global Rankings
                </CardTitle>
                <CardDescription>Top performers across all time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {globalLeaderboard.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        user.isCurrentUser ? "border-secondary bg-secondary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`font-semibold ${user.isCurrentUser ? "text-secondary" : "text-foreground"}`}
                            >
                              {user.name}
                            </h3>
                            {user.isCurrentUser && <Badge variant="secondary">You</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{user.questionsCompleted} questions</span>
                            <span>{user.averageScore}% avg</span>
                            <span>{user.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-wrap gap-1">
                          {user.badges.slice(0, 2).map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{user.score.toLocaleString()}</div>
                          <div className="flex items-center gap-1 text-sm">
                            {getChangeIcon(user.change)}
                            <span
                              className={
                                user.change > 0
                                  ? "text-green-500"
                                  : user.change < 0
                                    ? "text-red-500"
                                    : "text-muted-foreground"
                              }
                            >
                              {user.change !== 0 && (user.change > 0 ? "+" : "")}
                              {user.change || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  This Week's Top Performers
                </CardTitle>
                <CardDescription>Most active users this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyLeaderboard.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        user.isCurrentUser ? "border-secondary bg-secondary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(user.rank)}</div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`font-semibold ${user.isCurrentUser ? "text-secondary" : "text-foreground"}`}
                            >
                              {user.name}
                            </h3>
                            {user.isCurrentUser && <Badge variant="secondary">You</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{user.questionsThisWeek} questions this week</span>
                            <span>{user.averageScore}% avg</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{user.weeklyScore}</div>
                        <div className="flex items-center gap-1 text-sm">
                          {getChangeIcon(user.change)}
                          <span
                            className={
                              user.change > 0
                                ? "text-green-500"
                                : user.change < 0
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                            }
                          >
                            {user.change !== 0 && (user.change > 0 ? "+" : "")}
                            {user.change || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-border ${achievement.earned ? "bg-green-50 border-green-200" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.earned && (
                        <Badge variant="default" className="bg-green-600">
                          Earned
                        </Badge>
                      )}
                    </div>

                    {achievement.earned ? (
                      <div className="text-sm text-green-700">
                        Earned on {new Date(achievement.earnedAt!).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
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
