export interface PackageFeatures {
  plan: "free" | "basic" | "professional" | "premium"
  mocks: {
    total: number | "unlimited"
    flk1: number | "unlimited"
    flk2: number | "unlimited"
  }
  mcqs: {
    total: number | "unlimited"
    perModule: number | "unlimited"
  }
  flashcards: {
    total: number | "unlimited"
    perSubtopic: number | "unlimited"
  }
  miniMocks: {
    available: boolean
    options: number[] // [5, 10, 15, 20]
  }
  intensityLevels: number // 1-4
  features: {
    aiAssistant: boolean
    progressTracking: boolean
    studyMaterials: boolean
    timedConditions: boolean
    legalBlog: boolean
    prioritySupport: boolean
    flashcardsPerSubtopic: boolean
    calendarView: boolean
    advancedAnalytics: boolean
    tutoring: boolean
    customStudySchedule: boolean
    progressBasedAdjustments: boolean
  }
  limits: {
    questionsPerSession: number | "unlimited"
    sessionsPerDay: number | "unlimited"
    mockExamsPerWeek: number | "unlimited"
  }
}

export const PACKAGE_FEATURES: Record<string, PackageFeatures> = {
  free: {
    plan: "free",
    mocks: {
      total: 0,
      flk1: 0,
      flk2: 0,
    },
    mcqs: {
      total: 50,
      perModule: 10,
    },
    flashcards: {
      total: 50,
      perSubtopic: 5,
    },
    miniMocks: {
      available: false,
      options: [],
    },
    intensityLevels: 1,
    features: {
      aiAssistant: false,
      progressTracking: false,
      studyMaterials: false,
      timedConditions: false,
      legalBlog: false,
      prioritySupport: false,
      flashcardsPerSubtopic: false,
      calendarView: false,
      advancedAnalytics: false,
      tutoring: false,
      customStudySchedule: false,
      progressBasedAdjustments: false,
    },
    limits: {
      questionsPerSession: 10,
      sessionsPerDay: 3,
      mockExamsPerWeek: 0,
    },
  },

  basic: {
    plan: "basic",
    mocks: {
      total: 20,
      flk1: 10,
      flk2: 10,
    },
    mcqs: {
      total: 360,
      perModule: 180,
    },
    flashcards: {
      total: 500,
      perSubtopic: 20,
    },
    miniMocks: {
      available: true,
      options: [5, 10, 15, 20],
    },
    intensityLevels: 2,
    features: {
      aiAssistant: true,
      progressTracking: true,
      studyMaterials: true,
      timedConditions: true,
      legalBlog: true,
      prioritySupport: false,
      flashcardsPerSubtopic: false,
      calendarView: false,
      advancedAnalytics: false,
      tutoring: false,
      customStudySchedule: false,
      progressBasedAdjustments: false,
    },
    limits: {
      questionsPerSession: 50,
      sessionsPerDay: 10,
      mockExamsPerWeek: 3,
    },
  },

  professional: {
    plan: "professional",
    mocks: {
      total: 100,
      flk1: 50,
      flk2: 50,
    },
    mcqs: {
      total: 500,
      perModule: 250,
    },
    flashcards: {
      total: 1500,
      perSubtopic: 50,
    },
    miniMocks: {
      available: true,
      options: [5, 10, 15, 20],
    },
    intensityLevels: 4,
    features: {
      aiAssistant: true,
      progressTracking: true,
      studyMaterials: true,
      timedConditions: true,
      legalBlog: true,
      prioritySupport: true,
      flashcardsPerSubtopic: true,
      calendarView: true,
      advancedAnalytics: true,
      tutoring: false,
      customStudySchedule: true,
      progressBasedAdjustments: false,
    },
    limits: {
      questionsPerSession: 180,
      sessionsPerDay: "unlimited" as any,
      mockExamsPerWeek: 10,
    },
  },

  premium: {
    plan: "premium",
    mocks: {
      total: "unlimited",
      flk1: "unlimited",
      flk2: "unlimited",
    },
    mcqs: {
      total: "unlimited",
      perModule: "unlimited",
    },
    flashcards: {
      total: "unlimited",
      perSubtopic: "unlimited",
    },
    miniMocks: {
      available: true,
      options: [5, 10, 15, 20],
    },
    intensityLevels: 4,
    features: {
      aiAssistant: true,
      progressTracking: true,
      studyMaterials: true,
      timedConditions: true,
      legalBlog: true,
      prioritySupport: true,
      flashcardsPerSubtopic: true,
      calendarView: true,
      advancedAnalytics: true,
      tutoring: true,
      customStudySchedule: true,
      progressBasedAdjustments: true,
    },
    limits: {
      questionsPerSession: "unlimited",
      sessionsPerDay: "unlimited",
      mockExamsPerWeek: "unlimited",
    },
  },
}

export class PackageService {
  static getFeatures(plan: string): PackageFeatures {
    return PACKAGE_FEATURES[plan] || PACKAGE_FEATURES.free
  }

  static hasFeature(plan: string, feature: keyof PackageFeatures['features']): boolean {
    const features = this.getFeatures(plan)
    return features.features[feature]
  }

  static getMockLimit(plan: string): number {
    const features = this.getFeatures(plan)
    return typeof features.mocks.total === 'number' ? features.mocks.total : 999999
  }

  static getMCQLimit(plan: string): number {
    const features = this.getFeatures(plan)
    return typeof features.mcqs.total === 'number' ? features.mcqs.total : 999999
  }

  static getFlashcardLimit(plan: string): number {
    const features = this.getFeatures(plan)
    return typeof features.flashcards.total === 'number' ? features.flashcards.total : 999999
  }

  static getIntensityLevels(plan: string): number {
    return this.getFeatures(plan).intensityLevels
  }

  static getMiniMockOptions(plan: string): number[] {
    const features = this.getFeatures(plan)
    return features.miniMocks.available ? features.miniMocks.options : []
  }

  static canAccessCalendar(plan: string): boolean {
    return this.hasFeature(plan, 'calendarView')
  }

  static canAccessTutoring(plan: string): boolean {
    return this.hasFeature(plan, 'tutoring')
  }

  static getQuestionsPerSession(plan: string): number {
    const features = this.getFeatures(plan)
    return typeof features.limits.questionsPerSession === 'number' ? features.limits.questionsPerSession : 999999
  }
}
