"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Layers, Download, Star, Clock, ChevronLeft, ChevronRight, Menu, Brain } from "lucide-react"
import Link from "next/link"

// Sample study material content
const studyContent = {
  "contract-formation": {
    title: "Contract Formation Essentials",
    module: "FLK1 - Contract Law",
    topic: "Formation",
    difficulty: "Intermediate",
    pages: 24,
    flashcards: 45,
    lastUpdated: "2024-01-15",
    sections: [
      {
        id: "introduction",
        title: "Introduction to Contract Formation",
        content: `
          <h3>What is a Contract?</h3>
          <p>A contract is a legally binding agreement between two or more parties that creates mutual obligations enforceable by law. For a valid contract to exist, several essential elements must be present:</p>
          <ul>
            <li><strong>Offer</strong> - A clear proposal made by one party (the offeror) to another (the offeree)</li>
            <li><strong>Acceptance</strong> - An unqualified agreement to the terms of the offer</li>
            <li><strong>Consideration</strong> - Something of value exchanged between the parties</li>
            <li><strong>Intention to create legal relations</strong> - Both parties must intend the agreement to be legally binding</li>
            <li><strong>Certainty</strong> - The terms must be sufficiently clear and complete</li>
          </ul>
          
          <h3>Key Case Law</h3>
          <p><strong>Carlill v Carbolic Smoke Ball Co [1893]</strong> - Established that advertisements can constitute offers if they show clear intention to be bound.</p>
          
          <h3>Practical Application</h3>
          <p>In practice, contract formation issues frequently arise in commercial disputes. Understanding these principles is crucial for advising clients on the validity and enforceability of their agreements.</p>
        `,
      },
      {
        id: "offer",
        title: "Offer",
        content: `
          <h3>Definition of Offer</h3>
          <p>An offer is a definite promise to be bound on specific terms, communicated to the offeree. It must be distinguished from:</p>
          <ul>
            <li><strong>Invitation to treat</strong> - A mere invitation for others to make offers</li>
            <li><strong>Statement of intention</strong> - A declaration of what someone intends to do</li>
            <li><strong>Supply of information</strong> - Providing details without commitment</li>
          </ul>
          
          <h3>Requirements for a Valid Offer</h3>
          <ol>
            <li><strong>Certainty</strong> - Terms must be clear and complete</li>
            <li><strong>Communication</strong> - Must be communicated to the offeree</li>
            <li><strong>Intention</strong> - Must show intention to be legally bound</li>
          </ol>
          
          <h3>Key Cases</h3>
          <p><strong>Fisher v Bell [1961]</strong> - Goods displayed in shop windows are invitations to treat, not offers.</p>
          <p><strong>Pharmaceutical Society of GB v Boots [1953]</strong> - Self-service displays are invitations to treat; the offer is made at the checkout.</p>
          
          <h3>Termination of Offers</h3>
          <p>Offers can be terminated by:</p>
          <ul>
            <li>Acceptance</li>
            <li>Rejection or counter-offer</li>
            <li>Revocation by the offeror</li>
            <li>Lapse of time</li>
            <li>Death of either party</li>
            <li>Failure of a condition</li>
          </ul>
        `,
      },
      {
        id: "acceptance",
        title: "Acceptance",
        content: `
          <h3>Definition of Acceptance</h3>
          <p>Acceptance is the final and unqualified agreement to all the terms of an offer. It must be:</p>
          <ul>
            <li><strong>Unconditional</strong> - Any variation constitutes a counter-offer</li>
            <li><strong>Communicated</strong> - Generally must be communicated to the offeror</li>
            <li><strong>In the prescribed manner</strong> - If a specific method is required</li>
          </ul>
          
          <h3>Methods of Acceptance</h3>
          <ol>
            <li><strong>Express acceptance</strong> - Clear words or conduct</li>
            <li><strong>Implied acceptance</strong> - Conduct consistent with acceptance</li>
            <li><strong>Acceptance by performance</strong> - Performing the requested act</li>
          </ol>
          
          <h3>Communication of Acceptance</h3>
          <p><strong>General rule</strong>: Acceptance must be communicated to the offeror</p>
          <p><strong>Exceptions</strong>:</p>
          <ul>
            <li>Unilateral contracts (Carlill v Carbolic Smoke Ball Co)</li>
            <li>Waiver by the offeror</li>
            <li>Postal rule (Adams v Lindsell [1818])</li>
          </ul>
          
          <h3>The Postal Rule</h3>
          <p>Acceptance by post takes effect when the letter is posted, not when received, provided:</p>
          <ul>
            <li>Post is a reasonable means of communication</li>
            <li>The letter is properly addressed and stamped</li>
            <li>The offeror has not excluded the postal rule</li>
          </ul>
          
          <h3>Electronic Communications</h3>
          <p>For emails and electronic communications, acceptance generally takes effect when received by the offeror's system.</p>
        `,
      },
      {
        id: "consideration",
        title: "Consideration",
        content: `
          <h3>Definition of Consideration</h3>
          <p>Consideration is something of value in the eyes of the law that is given in exchange for a promise. It can be:</p>
          <ul>
            <li><strong>Executory</strong> - A promise to do something in the future</li>
            <li><strong>Executed</strong> - An act performed in return for a promise</li>
          </ul>
          
          <h3>Rules of Consideration</h3>
          <ol>
            <li><strong>Consideration must be sufficient but need not be adequate</strong>
              <p>The law will not inquire into the adequacy of consideration (Chappell v Nestlé [1960])</p>
            </li>
            <li><strong>Consideration must move from the promisee</strong>
              <p>Only a person who has provided consideration can enforce the contract</p>
            </li>
            <li><strong>Past consideration is no consideration</strong>
              <p>Generally, acts done before a promise cannot constitute consideration (Re McArdle [1951])</p>
            </li>
            <li><strong>Performance of existing duties</strong>
              <p>Generally not good consideration, but exceptions exist (Williams v Roffey Bros [1991])</p>
            </li>
          </ol>
          
          <h3>Key Cases</h3>
          <p><strong>Currie v Misa (1875)</strong> - "A valuable consideration in the sense of the law may consist either in some right, interest, profit or benefit accruing to one party, or some forbearance, detriment, loss or responsibility given, suffered or undertaken by the other."</p>
          
          <p><strong>Williams v Roffey Bros [1991]</strong> - Practical benefit can constitute consideration even when performing existing contractual duties.</p>
          
          <h3>Exceptions to the Consideration Requirement</h3>
          <ul>
            <li>Deeds (formal contracts under seal)</li>
            <li>Promissory estoppel (Central London Property Trust v High Trees House [1947])</li>
          </ul>
        `,
      },
    ],
  },
}

export default function StudyMaterialPage() {
  const params = useParams()
  const materialId = params.id as string
  const material = studyContent[materialId as keyof typeof studyContent]

  const [currentSection, setCurrentSection] = useState(0)
  const [showTableOfContents, setShowTableOfContents] = useState(false)

  if (!material) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Study material not found.</p>
            <Button className="mt-4" asChild>
              <Link href="/study">Back to Study Materials</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentSection + 1) / material.sections.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/study" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Study</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-semibold text-foreground">{material.title}</h1>
                <p className="text-sm text-muted-foreground">{material.module}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowTableOfContents(!showTableOfContents)}>
                <Menu className="w-4 h-4 mr-2" />
                Contents
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Section {currentSection + 1} of {material.sections.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className={`lg:col-span-1 ${showTableOfContents ? "block" : "hidden lg:block"}`}>
            <Card className="border-border sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {material.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSection === index
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="text-sm font-medium">{section.title}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{material.sections[currentSection].title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{material.topic}</Badge>
                      <Badge className="bg-blue-100 text-blue-800">{material.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>~8 min read</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: material.sections[currentSection].content }}
                  style={{
                    lineHeight: "1.7",
                  }}
                />

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-4">
                    <Button variant="outline" asChild>
                      <Link href={`/study/${materialId}/mindmap`}>
                        <Brain className="w-4 h-4 mr-2" />
                        View Mind Map
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/study/${materialId}/flashcards`}>
                        <Layers className="w-4 h-4 mr-2" />
                        Study Flashcards
                      </Link>
                    </Button>
                  </div>

                  <Button
                    onClick={() => setCurrentSection(Math.min(material.sections.length - 1, currentSection + 1))}
                    disabled={currentSection === material.sections.length - 1}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
