"use client"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Clock, Users, Target, CheckCircle } from "lucide-react"
import { useState } from "react"

const mockContent = {
  starter: {
    name: "Starter Package",
    mocks: 6,
    price: 15,
    flk1Mocks: [
      {
        title: "FLK1 Mock 1: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Standard",
        sampleQuestions: [
          "In contract law, which of the following constitutes valid consideration?",
          "What is the test for establishing a duty of care in negligence?",
          "Under the Companies Act 2006, what are the key duties of company directors?",
          "In civil procedure, what is the purpose of case management conferences?",
        ],
      },
      {
        title: "FLK1 Mock 2: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Standard",
        sampleQuestions: [
          "What constitutes a fundamental breach of contract?",
          "How is causation established in tort law claims?",
          "What are the requirements for valid company formation?",
          "When should alternative dispute resolution be considered?",
        ],
      },
      {
        title: "FLK1 Mock 3: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Standard",
        sampleQuestions: [
          "Which remedies are available for breach of contract?",
          "What defenses are available in negligence claims?",
          "How do shareholders' rights differ from directors' duties?",
          "What are the key stages of civil litigation?",
        ],
      },
    ],
    flk2Mocks: [
      {
        title: "FLK2 Mock 1: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Standard",
        sampleQuestions: [
          "What are the key requirements for registered land transactions?",
          "How do you prepare for a civil trial hearing?",
          "What rights does a suspect have during police interviews?",
          "What are the core principles of professional conduct for solicitors?",
        ],
      },
      {
        title: "FLK2 Mock 2: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Standard",
        sampleQuestions: [
          "How do leasehold and freehold estates differ?",
          "What evidence rules apply in civil proceedings?",
          "What are the key stages of criminal procedure?",
          "How should conflicts of interest be handled?",
        ],
      },
      {
        title: "FLK2 Mock 3: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Standard",
        sampleQuestions: [
          "What searches are required in property transactions?",
          "How are costs assessed in litigation?",
          "What disclosure obligations exist in criminal cases?",
          "What are the money laundering reporting requirements?",
        ],
      },
    ],
  },
  standard: {
    name: "Standard Package",
    mocks: 12,
    price: 45,
    flk1Mocks: [
      {
        title: "FLK1 Mock 1: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Standard",
        sampleQuestions: [
          "Analyze the formation requirements for a valid contract in commercial contexts",
          "Evaluate the application of the Caparo test in novel duty situations",
          "Assess the fiduciary duties of directors in conflict situations",
          "Consider the effectiveness of mediation in commercial disputes",
        ],
      },
      {
        title: "FLK1 Mock 2: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Standard",
        sampleQuestions: [
          "How do exclusion clauses operate under UCTA 1977?",
          "What is the relationship between factual and legal causation?",
          "Analyze the corporate veil doctrine and its exceptions",
          "Evaluate the role of expert witnesses in litigation",
        ],
      },
      {
        title: "FLK1 Mock 3: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Advanced",
        sampleQuestions: [
          "Critically assess the doctrine of frustration in long-term contracts",
          "Analyze the development of psychiatric harm in negligence",
          "Evaluate minority shareholder protection mechanisms",
          "Consider the impact of the Jackson reforms on litigation costs",
        ],
      },
      {
        title: "FLK1 Mock 4: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Advanced",
        sampleQuestions: [
          "How do implied terms interact with express contractual provisions?",
          "Assess the liability of public authorities in negligence",
          "Analyze the duties of directors in insolvency situations",
          "Evaluate the effectiveness of case management in complex litigation",
        ],
      },
      {
        title: "FLK1 Mock 5: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Advanced",
        sampleQuestions: [
          "Consider the role of good faith in English contract law",
          "Analyze the tort of negligent misstatement and its limitations",
          "Evaluate corporate governance principles in listed companies",
          "Assess the role of ADR in international commercial disputes",
        ],
      },
      {
        title: "FLK1 Mock 6: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Contract Law", "Tort Law", "Business Law", "Dispute Resolution"],
        difficulty: "Advanced",
        sampleQuestions: [
          "How do penalty clauses differ from liquidated damages?",
          "Analyze the scope of occupiers' liability in commercial premises",
          "Consider the impact of Brexit on company law compliance",
          "Evaluate enforcement mechanisms for arbitral awards",
        ],
      },
    ],
    flk2Mocks: [
      {
        title: "FLK2 Mock 1: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Standard",
        sampleQuestions: [
          "Analyze the priority rules in registered land",
          "Evaluate witness preparation techniques for civil trials",
          "Consider the admissibility of confession evidence",
          "Assess client confidentiality obligations in practice",
        ],
      },
      {
        title: "FLK2 Mock 2: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Standard",
        sampleQuestions: [
          "How do overriding interests affect registered proprietors?",
          "Analyze the use of expert evidence in civil proceedings",
          "Consider the rights of suspects during detention",
          "Evaluate the duty to act in clients' best interests",
        ],
      },
      {
        title: "FLK2 Mock 3: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Advanced",
        sampleQuestions: [
          "Critically assess the doctrine of proprietary estoppel",
          "Analyze advocacy techniques in complex commercial litigation",
          "Evaluate the exclusion of evidence under PACE",
          "Consider professional indemnity and risk management",
        ],
      },
      {
        title: "FLK2 Mock 4: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Advanced",
        sampleQuestions: [
          "How do restrictive covenants operate in modern property law?",
          "Assess case management strategies in multi-track claims",
          "Analyze the disclosure obligations in criminal proceedings",
          "Evaluate regulatory compliance in legal practice",
        ],
      },
      {
        title: "FLK2 Mock 5: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Advanced",
        sampleQuestions: [
          "Consider the impact of human rights on property law",
          "Analyze settlement negotiations and their tactical use",
          "Evaluate sentencing principles and their application",
          "Assess the regulation of legal services markets",
        ],
      },
      {
        title: "FLK2 Mock 6: Mixed Topics",
        questions: 180,
        duration: "5 hours",
        topics: ["Property Law", "Litigation & Advocacy", "Criminal Procedure", "Professional Conduct"],
        difficulty: "Advanced",
        sampleQuestions: [
          "How do trusts of land operate in co-ownership situations?",
          "Consider the role of alternative dispute resolution in family matters",
          "Analyze the appeals process in criminal cases",
          "Evaluate professional development and competence requirements",
        ],
      },
    ],
  },
  premium: {
    name: "Premium Package",
    mocks: 50,
    price: 100,
    description:
      "Comprehensive collection with 25 FLK1 and 25 FLK2 mock exams, each containing 180 questions mixing topics within their respective areas",
    additionalFeatures: [
      "25 FLK1 Mock Exams (180 questions each)",
      "25 FLK2 Mock Exams (180 questions each)",
      "Advanced difficulty progression",
      "Specialized topic combinations",
      "Comprehensive analytics",
      "Performance benchmarking",
      "Weakness identification",
      "Unlimited retakes",
    ],
  },
}

export default function MockReviewPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package") || "starter"
  const [selectedMock, setSelectedMock] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<"flk1" | "flk2" | null>(null)

  const packageData = mockContent[packageId as keyof typeof mockContent]

  if (!packageData) {
    return <div>Package not found</div>
  }

  const handleMockSelect = (mock: any, category: "flk1" | "flk2") => {
    setSelectedMock(mock)
    setSelectedCategory(category)
  }

  const handleBackToOverview = () => {
    setSelectedMock(null)
    setSelectedCategory(null)
  }

  if (selectedMock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={handleBackToOverview} className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Package</span>
                </Button>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">SQE Forge</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mock Details */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedMock.title}</h1>
            <p className="text-xl text-gray-600">
              {selectedCategory?.toUpperCase()} Mock Exam - {selectedMock.questions} Questions
            </p>
            <div className="mt-4 inline-flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">{selectedMock.duration}</Badge>
              <Badge className="bg-green-100 text-green-800">{selectedMock.questions} Questions</Badge>
              <Badge
                className={`${
                  selectedMock.difficulty === "Advanced" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {selectedMock.difficulty}
              </Badge>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics Mixed in This Mock</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {selectedMock.topics.map((topic: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Questions from This Mock</h2>
            <div className="space-y-6">
              {selectedMock.sampleQuestions.map((question: string, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-blue-600 text-white text-xs">Q{index + 1}</Badge>
                    <p className="text-gray-800 font-medium">{question}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> These are sample questions. The actual mock contains {selectedMock.questions}{" "}
                unique questions mixing all {selectedCategory?.toUpperCase()} topics.
              </p>
            </div>
          </div>

          {/* Mock Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mock Exam Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">SRA Timing</h3>
                <p className="text-gray-600 text-sm">Authentic 5-hour exam conditions matching real SQE timing</p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Mixed Topics</h3>
                <p className="text-gray-600 text-sm">
                  Questions from all {selectedCategory?.toUpperCase()} topics in one exam
                </p>
              </div>
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
                <p className="text-gray-600 text-sm">Comprehensive performance tracking and feedback</p>
              </div>
            </div>
          </div>

          {/* Start Mock CTA */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Take This Mock?</h3>
                <p className="text-gray-600 mb-6">
                  Purchase the {packageData.name} to get access to this mock and {packageData.mocks - 1} others.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => (window.location.href = `/practice/packages?purchase=${packageId}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg w-full"
                  >
                    Purchase Package - £{packageData.price}
                  </Button>
                  <Button onClick={handleBackToOverview} variant="outline" className="w-full bg-transparent">
                    View Other Mocks in Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.history.back()} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SQE Forge</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Package Overview */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{packageData.name} - Mock Content Review</h1>
          <p className="text-xl text-gray-600">
            Each mock exam contains 180 questions mixing topics within FLK1 or FLK2
          </p>
          <div className="mt-4 inline-flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800">{packageData.mocks} Mock Exams</Badge>
            <Badge className="bg-green-100 text-green-800">£{packageData.price}</Badge>
            <Badge className="bg-purple-100 text-purple-800">180 Questions Per Mock</Badge>
          </div>
        </div>

        {/* FLK1 Mocks */}
        {packageData.flk1Mocks && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              FLK1 Mock Exams ({packageData.flk1Mocks.length} Mocks)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData.flk1Mocks.map((mock, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleMockSelect(mock, "flk1")}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{mock.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {mock.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {mock.questions} questions
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Topics Mixed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mock.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Sample Questions:</h4>
                      <ul className="space-y-1">
                        {mock.sampleQuestions.slice(0, 2).map((question, qIndex) => (
                          <li key={qIndex} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Badge
                      className={`${
                        mock.difficulty === "Advanced" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {mock.difficulty}
                    </Badge>
                    <div className="mt-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMockSelect(mock, "flk1")
                        }}
                        variant="outline"
                        className="w-full text-sm"
                      >
                        Review This Mock
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FLK2 Mocks */}
        {packageData.flk2Mocks && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Target className="w-8 h-8 text-green-600 mr-3" />
              FLK2 Mock Exams ({packageData.flk2Mocks.length} Mocks)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData.flk2Mocks.map((mock, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleMockSelect(mock, "flk2")}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{mock.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {mock.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {mock.questions} questions
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Topics Mixed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mock.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Sample Questions:</h4>
                      <ul className="space-y-1">
                        {mock.sampleQuestions.slice(0, 2).map((question, qIndex) => (
                          <li key={qIndex} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Badge
                      className={`${
                        mock.difficulty === "Advanced" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {mock.difficulty}
                    </Badge>
                    <div className="mt-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMockSelect(mock, "flk2")
                        }}
                        variant="outline"
                        className="w-full text-sm"
                      >
                        Review This Mock
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Premium Package Additional Features */}
        {packageId === "premium" && packageData.additionalFeatures && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Premium Package Features</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-gray-600 mb-6">{packageData.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {packageData.additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Purchase CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Purchase?</h3>
              <p className="text-gray-600 mb-6">
                Get instant access to all {packageData.mocks} mock exams with detailed analytics and explanations. Each
                mock contains 180 questions mixing topics within FLK1 or FLK2.
              </p>
              <Button
                onClick={() => (window.location.href = `/practice/packages?purchase=${packageId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Purchase {packageData.name} - £{packageData.price}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
