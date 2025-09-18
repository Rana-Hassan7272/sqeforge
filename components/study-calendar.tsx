"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"

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

interface StudyCalendarProps {
  timetable: WeeklySchedule[]
  selectedExam: string
  onWeekSelect: (week: number) => void
  currentWeek: number
}

export function StudyCalendar({ timetable, selectedExam, onWeekSelect, currentWeek }: StudyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  // Parse dates and create a map of dates to study data
  const studyDateMap = new Map<string, WeeklySchedule>()

  timetable.forEach((week) => {
    const startDate = new Date(week.startDate + " 2024")
    const endDate = new Date(week.endDate + " 2024")

    // Handle year transition for dates in 2025
    if (week.startDate.includes("Jan") || week.startDate.includes("Feb")) {
      startDate.setFullYear(2025)
      endDate.setFullYear(2025)
    }

    // Add each day of the week to the map
    const current = new Date(startDate)
    while (current <= endDate) {
      const dateKey = current.toISOString().split("T")[0]
      studyDateMap.set(dateKey, week)
      current.setDate(current.getDate() + 1)
    }
  })

  // Get study data for a specific date
  const getStudyDataForDate = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0]
    return studyDateMap.get(dateKey)
  }

  // Custom day renderer to show study indicators
  const renderDay = (date: Date) => {
    const studyData = getStudyDataForDate(date)
    const isToday = date.toDateString() === new Date().toDateString()

    if (!studyData) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className={`text-sm ${isToday ? "font-bold" : ""}`}>{date.getDate()}</span>
        </div>
      )
    }

    const isCurrentWeek = studyData.week === currentWeek

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-1 rounded-md cursor-pointer transition-all ${
          isCurrentWeek ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"
        }`}
        onClick={() => onWeekSelect(studyData.week)}
      >
        <span className={`text-xs font-medium ${isToday ? "font-bold" : ""}`}>{date.getDate()}</span>
        <div className="flex gap-0.5 mt-0.5">
          {studyData.studyHours > 0 && (
            <div className="w-1 h-1 bg-blue-500 rounded-full" title={`${studyData.studyHours}h study`} />
          )}
          {studyData.mockExams > 0 && (
            <div className="w-1 h-1 bg-red-500 rounded-full" title={`${studyData.mockExams} mock exam(s)`} />
          )}
          {studyData.practiceQuestions > 0 && (
            <div className="w-1 h-1 bg-green-500 rounded-full" title={`${studyData.practiceQuestions} questions`} />
          )}
        </div>
      </div>
    )
  }

  // Get the selected date's study data
  const selectedStudyData = selectedDate ? getStudyDataForDate(selectedDate) : null

  return (
    <div className="space-y-6">
      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {currentMonth.toLocaleDateString("default", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="text-muted-foreground">Study Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-muted-foreground">Mock Exams</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-muted-foreground">Practice Questions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-sm" />
          <span className="text-muted-foreground">Current Week</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {(() => {
          const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
          const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
          const startDate = new Date(firstDay)
          startDate.setDate(startDate.getDate() - firstDay.getDay())

          const days = []
          const current = new Date(startDate)

          for (let i = 0; i < 42; i++) {
            const isCurrentMonth = current.getMonth() === currentMonth.getMonth()
            days.push(
              <div
                key={current.toISOString()}
                className={`aspect-square border border-border rounded-md ${
                  !isCurrentMonth ? "opacity-30" : ""
                } ${selectedDate?.toDateString() === current.toDateString() ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedDate(new Date(current))}
              >
                {renderDay(new Date(current))}
              </div>,
            )
            current.setDate(current.getDate() + 1)
          }

          return days
        })()}
      </div>

      {/* Selected Date Details */}
      {selectedStudyData && (
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">
                  Week {selectedStudyData.week}: {selectedStudyData.focus}
                </h4>
                <Badge variant={selectedStudyData.week === currentWeek ? "default" : "secondary"}>
                  {selectedStudyData.week === currentWeek ? "Current Week" : `Week ${selectedStudyData.week}`}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-foreground">{selectedStudyData.studyHours}h</div>
                    <div className="text-xs text-muted-foreground">Study Time</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-600" />
                  <div>
                    <div className="font-medium text-foreground">{selectedStudyData.mockExams}</div>
                    <div className="text-xs text-muted-foreground">Mock Exams</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-medium text-foreground">{selectedStudyData.practiceQuestions}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-foreground mb-2">Focus Topics</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedStudyData.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedStudyData.week !== currentWeek && (
                <Button onClick={() => onWeekSelect(selectedStudyData.week)} className="w-full">
                  Switch to Week {selectedStudyData.week}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Month Overview */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-foreground mb-4">
            {currentMonth.toLocaleDateString("default", { month: "long" })} Overview
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(() => {
              const monthWeeks = timetable.filter((week) => {
                const startDate = new Date(week.startDate + " 2024")
                if (week.startDate.includes("Jan") || week.startDate.includes("Feb")) {
                  startDate.setFullYear(2025)
                }
                return (
                  startDate.getMonth() === currentMonth.getMonth() &&
                  startDate.getFullYear() === currentMonth.getFullYear()
                )
              })

              const totalHours = monthWeeks.reduce((sum, week) => sum + week.studyHours, 0)
              const totalMocks = monthWeeks.reduce((sum, week) => sum + week.mockExams, 0)
              const totalQuestions = monthWeeks.reduce((sum, week) => sum + week.practiceQuestions, 0)
              const weeksCount = monthWeeks.length

              return (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{weeksCount}</div>
                    <div className="text-sm text-muted-foreground">Study Weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{totalHours}</div>
                    <div className="text-sm text-muted-foreground">Study Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{totalMocks}</div>
                    <div className="text-sm text-muted-foreground">Mock Exams</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                </>
              )
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
