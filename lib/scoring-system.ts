export interface Question {
  id: string
  difficulty: "Foundation" | "Intermediate" | "Advanced" | "Expert"
  angoffScore: number // Expected percentage of competent candidates who would answer correctly
  topic: string
  subtopic: string
  module: "FLK1" | "FLK2"
}

export interface QuestionResult {
  questionId: string
  correct: boolean
  timeSpent: number
  difficulty: string
  angoffScore: number
  userAnswer: string
  correctAnswer: string
}

export interface MockExamResult {
  id: string
  module: "FLK1" | "FLK2"
  questions: QuestionResult[]
  rawScore: number
  scaledScore: number
  passStatus: "pass" | "fail"
  confidenceLevel: number
  completedAt: Date
  totalQuestions: number
  correctAnswers: number
  percentageScore: number
}

export class SQE1Scoring {
  private static readonly SCALED_PASS_THRESHOLD = 300 // SQE1 pass mark is 300 out of 500
  private static readonly RAW_PASS_THRESHOLD = 60 // 60% raw score equivalent

  /**
   * Calculate SQE1 scaled score (300 = pass, max 500)
   * Uses linear scaling: 0% = 100, 60% = 300, 100% = 500
   */
  static calculateSQE1ScaledScore(
    correctAnswers: number,
    totalQuestions: number,
  ): {
    rawScore: number
    scaledScore: number
    passed: boolean
    percentageScore: number
  } {
    const rawScore = correctAnswers
    const percentageScore = (correctAnswers / totalQuestions) * 100

    // SQE1 scaled scoring: 300 = pass mark (60%), max 500
    let scaledScore: number

    if (percentageScore <= 60) {
      // Below pass mark: scale from 100 to 300
      scaledScore = 100 + (percentageScore / 60) * 200
    } else {
      // Above pass mark: scale from 300 to 500
      scaledScore = 300 + ((percentageScore - 60) / 40) * 200
    }

    scaledScore = Math.round(scaledScore)
    const passed = scaledScore >= 300

    return {
      rawScore,
      scaledScore,
      passed,
      percentageScore: Math.round(percentageScore),
    }
  }

  /**
   * Calculate weighted scaled score using Modified Angoff method
   * Harder questions (lower Angoff scores) contribute more to the final score
   */
  static calculateWeightedScaledScore(results: QuestionResult[]): number {
    if (results.length === 0) return 100 // Minimum scaled score

    let totalWeightedScore = 0
    let totalWeight = 0

    results.forEach((result) => {
      // Weight is inversely related to Angoff score (harder questions have more weight)
      const weight = 100 - result.angoffScore + 10 // Add 10 to prevent zero weights
      const score = result.correct ? 100 : 0

      totalWeightedScore += score * weight
      totalWeight += weight
    })

    const weightedPercentage = totalWeightedScore / totalWeight

    // Convert to SQE1 scaled score
    let scaledScore: number
    if (weightedPercentage <= 60) {
      scaledScore = 100 + (weightedPercentage / 60) * 200
    } else {
      scaledScore = 300 + ((weightedPercentage - 60) / 40) * 200
    }

    return Math.round(scaledScore)
  }

  /**
   * Calculate raw score (simple percentage)
   */
  static calculateRawScore(results: QuestionResult[]): number {
    if (results.length === 0) return 0

    const correctAnswers = results.filter((r) => r.correct).length
    return Math.round((correctAnswers / results.length) * 100)
  }

  /**
   * Determine pass/fail status based on scaled score
   */
  static getPassStatus(scaledScore: number): "pass" | "fail" {
    return scaledScore >= this.SCALED_PASS_THRESHOLD ? "pass" : "fail"
  }

  /**
   * Calculate confidence level based on performance consistency
   */
  static calculateConfidenceLevel(results: QuestionResult[]): number {
    if (results.length === 0) return 0

    // Group by difficulty and calculate performance
    const difficultyGroups = results.reduce(
      (acc, result) => {
        if (!acc[result.difficulty]) {
          acc[result.difficulty] = { correct: 0, total: 0 }
        }
        acc[result.difficulty].total++
        if (result.correct) acc[result.difficulty].correct++
        return acc
      },
      {} as Record<string, { correct: number; total: number }>,
    )

    // Calculate consistency across difficulty levels
    const performances = Object.values(difficultyGroups).map((group) => group.correct / group.total)

    const avgPerformance = performances.reduce((sum, perf) => sum + perf, 0) / performances.length
    const variance =
      performances.reduce((sum, perf) => sum + Math.pow(perf - avgPerformance, 2), 0) / performances.length
    const consistency = Math.max(0, 1 - variance)

    return Math.round(avgPerformance * consistency * 100)
  }

  /**
   * Generate detailed performance analysis aligned with SQE1 requirements
   */
  static analyzePerformance(results: QuestionResult[]): {
    byDifficulty: Record<string, { correct: number; total: number; percentage: number }>
    byTopic: Record<string, { correct: number; total: number; percentage: number }>
    timeAnalysis: { avgTime: number; efficiency: number }
    recommendations: string[]
    sqe1Analysis: {
      scaledScore: number
      passStatus: string
      competencyLevel: string
      areasForImprovement: string[]
    }
  } {
    const byDifficulty = results.reduce(
      (acc, result) => {
        if (!acc[result.difficulty]) {
          acc[result.difficulty] = { correct: 0, total: 0, percentage: 0 }
        }
        acc[result.difficulty].total++
        if (result.correct) acc[result.difficulty].correct++
        acc[result.difficulty].percentage = Math.round(
          (acc[result.difficulty].correct / acc[result.difficulty].total) * 100,
        )
        return acc
      },
      {} as Record<string, { correct: number; total: number; percentage: number }>,
    )

    const byTopic = results.reduce(
      (acc, result) => {
        // Extract topic from question (would need to be passed in)
        const topic = "General" // Placeholder - would extract from question data
        if (!acc[topic]) {
          acc[topic] = { correct: 0, total: 0, percentage: 0 }
        }
        acc[topic].total++
        if (result.correct) acc[topic].correct++
        acc[topic].percentage = Math.round((acc[topic].correct / acc[topic].total) * 100)
        return acc
      },
      {} as Record<string, { correct: number; total: number; percentage: number }>,
    )

    const avgTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length
    const efficiency = Math.max(0, 100 - (avgTime / 120) * 100) // Assuming 2 minutes per question is optimal

    const recommendations = this.generateSQE1Recommendations(byDifficulty, efficiency, results)

    const scaledScore = this.calculateWeightedScaledScore(results)
    const sqe1Analysis = {
      scaledScore,
      passStatus: this.getPassStatus(scaledScore),
      competencyLevel: this.getCompetencyLevel(scaledScore),
      areasForImprovement: this.identifyWeakAreas(byDifficulty, byTopic),
    }

    return {
      byDifficulty,
      byTopic,
      timeAnalysis: { avgTime, efficiency },
      recommendations,
      sqe1Analysis,
    }
  }

  private static getCompetencyLevel(scaledScore: number): string {
    if (scaledScore >= 450) return "Excellent - Well above competency threshold"
    if (scaledScore >= 400) return "Very Good - Comfortably above competency threshold"
    if (scaledScore >= 350) return "Good - Above competency threshold"
    if (scaledScore >= 300) return "Competent - Meets minimum competency threshold"
    if (scaledScore >= 250) return "Approaching Competency - Needs improvement"
    return "Below Competency - Significant improvement required"
  }

  private static generateSQE1Recommendations(
    byDifficulty: Record<string, { correct: number; total: number; percentage: number }>,
    efficiency: number,
    results: QuestionResult[],
  ): string[] {
    const recommendations: string[] = []

    if (byDifficulty.Expert?.percentage < 40) {
      recommendations.push(
        "Focus on expert-level questions - practice complex legal scenarios requiring multi-step analysis",
      )
    }

    if (byDifficulty.Advanced?.percentage < 50) {
      recommendations.push("Strengthen advanced legal knowledge - review case law and statutory interpretation")
    }

    if (byDifficulty.Foundation?.percentage < 80) {
      recommendations.push("Review fundamental legal principles - ensure solid grasp of basic concepts")
    }

    if (efficiency < 60) {
      recommendations.push("Improve time management - SQE1 requires answering 180 questions in 5 hours")
    }

    if (efficiency > 90) {
      recommendations.push("Excellent time management - consider spending more time on complex questions")
    }

    const correctAnswers = results.filter((r) => r.correct).length
    const percentage = (correctAnswers / results.length) * 100

    if (percentage < 60) {
      recommendations.push("Focus on reaching the 60% competency threshold - review SQE1 syllabus systematically")
    }

    if (percentage >= 60 && percentage < 70) {
      recommendations.push("Good progress - consolidate knowledge and practice more challenging questions")
    }

    return recommendations
  }

  private static identifyWeakAreas(
    byDifficulty: Record<string, { correct: number; total: number; percentage: number }>,
    byTopic: Record<string, { correct: number; total: number; percentage: number }>,
  ): string[] {
    const weakAreas: string[] = []

    // Identify difficulty levels below 60%
    Object.entries(byDifficulty).forEach(([difficulty, stats]) => {
      if (stats.percentage < 60) {
        weakAreas.push(`${difficulty} level questions (${stats.percentage}%)`)
      }
    })

    // Identify topic areas below 60%
    Object.entries(byTopic).forEach(([topic, stats]) => {
      if (stats.percentage < 60) {
        weakAreas.push(`${topic} (${stats.percentage}%)`)
      }
    })

    return weakAreas
  }
}

export const sqe1SampleQuestions: Question[] = [
  {
    id: "flk1-contract-001",
    difficulty: "Foundation",
    angoffScore: 85, // 85% of competent candidates expected to answer correctly
    topic: "Contract Law",
    subtopic: "Formation",
    module: "FLK1",
  },
  {
    id: "flk1-tort-001",
    difficulty: "Advanced",
    angoffScore: 35, // Only 35% of competent candidates expected to answer correctly
    topic: "Tort Law",
    subtopic: "Negligence",
    module: "FLK1",
  },
  {
    id: "flk2-property-001",
    difficulty: "Intermediate",
    angoffScore: 65,
    topic: "Land Law",
    subtopic: "Registered Land",
    module: "FLK2",
  },
  {
    id: "flk2-criminal-001",
    difficulty: "Expert",
    angoffScore: 25, // Very challenging question
    topic: "Criminal Law and Practice",
    subtopic: "Mens Rea",
    module: "FLK2",
  },
]

export interface WrongQuestionEntry {
  questionId: string
  userAnswer: string
  correctAnswer: string
  timestamp: Date
  attempts: number
  lastAttemptCorrect: boolean
  difficulty: string
  topic: string
}

export class WrongQuestionBank {
  private wrongQuestions: Map<string, WrongQuestionEntry> = new Map()

  addWrongQuestion(questionId: string, userAnswer: string, correctAnswer: string, difficulty: string, topic: string) {
    const existing = this.wrongQuestions.get(questionId)
    if (existing) {
      existing.attempts += 1
      existing.userAnswer = userAnswer
      existing.timestamp = new Date()
      existing.lastAttemptCorrect = false
    } else {
      this.wrongQuestions.set(questionId, {
        questionId,
        userAnswer,
        correctAnswer,
        timestamp: new Date(),
        attempts: 1,
        lastAttemptCorrect: false,
        difficulty,
        topic,
      })
    }
  }

  markQuestionCorrect(questionId: string) {
    const entry = this.wrongQuestions.get(questionId)
    if (entry) {
      entry.lastAttemptCorrect = true
      entry.timestamp = new Date()
    }
  }

  getWrongQuestions(): WrongQuestionEntry[] {
    return Array.from(this.wrongQuestions.values())
      .filter((entry) => !entry.lastAttemptCorrect)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  getQuestionsByAttempts(minAttempts: number): WrongQuestionEntry[] {
    return Array.from(this.wrongQuestions.values()).filter(
      (entry) => entry.attempts >= minAttempts && !entry.lastAttemptCorrect,
    )
  }

  getQuestionsByTopic(topic: string): WrongQuestionEntry[] {
    return Array.from(this.wrongQuestions.values()).filter(
      (entry) => entry.topic === topic && !entry.lastAttemptCorrect,
    )
  }

  getQuestionsByDifficulty(difficulty: string): WrongQuestionEntry[] {
    return Array.from(this.wrongQuestions.values()).filter(
      (entry) => entry.difficulty === difficulty && !entry.lastAttemptCorrect,
    )
  }
}

export const SQE1_EXAM_CONFIG = {
  FLK1: {
    duration: 300, // 5 hours in minutes
    totalQuestions: 180,
    passMarkScaled: 300,
    timePerQuestion: 100, // seconds
    subjects: [
      "Business Law and Practice",
      "Dispute Resolution",
      "Contract Law",
      "Tort Law",
      "Legal System of England and Wales",
      "Constitutional and Administrative Law and EU Law",
      "Legal Services",
    ],
  },
  FLK2: {
    duration: 300, // 5 hours in minutes
    totalQuestions: 180,
    passMarkScaled: 300,
    timePerQuestion: 100, // seconds
    subjects: [
      "Property Practice",
      "Wills and Administration of Estates",
      "Solicitors Accounts",
      "Land Law",
      "Trusts",
      "Criminal Law and Practice",
    ],
  },
}
