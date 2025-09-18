import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen, Brain, BarChart3, MessageSquare, Clock, Users, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-secondary transition-colors font-medium">
                Features
              </a>
              <a href="#pricing" className="text-foreground hover:text-secondary transition-colors font-medium">
                Pricing
              </a>
              <a href="#testimonials" className="text-foreground hover:text-secondary transition-colors font-medium">
                Reviews
              </a>
              <Link href="/contact" className="text-foreground hover:text-secondary transition-colors font-medium">
                Contact
              </Link>
              <Link href="/blog" className="text-foreground hover:text-secondary transition-colors font-medium">
                Blog
              </Link>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">Admin</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Forge Your Legal Path To Success
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master the SQE with our comprehensive platform featuring practice questions, AI-powered assistance, and
            personalized study materials designed for professionals and law graduates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/pricing">Choose Your Plan</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/practice">Try 5 Sample Questions</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">5 Practice MCQs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">4 Intensity Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">Progress Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for SQE preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <BookOpen className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Practice Questions & Mocks</CardTitle>
                <CardDescription>
                  Different intensity levels with scenario-based questions featuring single best answers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Brain className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>AI Assistant "Forger"</CardTitle>
                <CardDescription>
                  Get explanations in simple terms for answers and topics you don't understand
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your performance across FLK1 and FLK2 modules with detailed analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <MessageSquare className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>Revision notes and comprehensive study resources for all SQE topics</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Clock className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Timed Conditions</CardTitle>
                <CardDescription>Practice under real exam conditions with SRA-compliant timing</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Legal Blog & Updates</CardTitle>
                <CardDescription>Stay current with SQE/SRA updates and legal developments</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Try Sample Questions</h2>
            <p className="text-xl text-muted-foreground">
              Experience our scenario-based questions ranging from easy to extremely difficult
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sample Question - Contract Law</CardTitle>
                <Badge variant="secondary">Medium Difficulty</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <p className="text-foreground leading-relaxed">
                  Sarah enters into a contract with BuildCorp to construct a conservatory for £15,000. The contract
                  specifies completion by 1st June. BuildCorp completes the work on 15th June, but Sarah discovers the
                  foundations are defective and will cost £3,000 to repair. Sarah refuses to pay the full amount.
                </p>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  Which of the following best describes Sarah's legal position?
                </p>
                <div className="space-y-2">
                  {[
                    "A) Sarah must pay the full amount as the work is substantially complete",
                    "B) Sarah can refuse payment entirely due to the defective work",
                    "C) Sarah can deduct the repair costs and late completion penalty from payment",
                    "D) Sarah must pay the full amount but can claim damages separately",
                    "E) Sarah can terminate the contract and claim full damages",
                  ].map((option, index) => (
                    <div
                      key={index}
                      className="p-3 border border-border rounded-lg hover:bg-card transition-colors cursor-pointer"
                    >
                      <span className="text-foreground">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/practice">Try More Questions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mock Exams Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mock Exams & Practice Tests</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive mock exams designed to mirror the real SQE1 experience with scaled scoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Mock Exam Features */}
            <Card className="border-border">
              <CardHeader>
                <Clock className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Timed Mock Exams</CardTitle>
                <CardDescription>Full-length mock exams with authentic SQE1 timing and conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>180 questions per FLK assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>5 hours 15 minutes per session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>Real exam interface simulation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>SQE1 Scaled Scoring</CardTitle>
                <CardDescription>Authentic scoring system matching the real SQE1 examination</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>300+ scaled score to pass (60%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>Detailed performance breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>Subject-specific analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BookOpen className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Mini Mock Packages</CardTitle>
                <CardDescription>Focused practice tests for specific topics and subtopics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>Topic-specific mini mocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>4 difficulty levels per topic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-secondary" />
                    <span>Instant feedback and explanations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card className="border-secondary bg-secondary/5">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-secondary mb-2">£12</div>
                  <div className="text-sm text-muted-foreground line-through mb-1">£15</div>
                  <div className="text-sm font-medium">Starter Mock Package</div>
                  <div className="text-xs text-muted-foreground mt-1">10 Mock Exams + 500 Flashcards</div>
                </CardContent>
              </Card>

              <Card className="border-secondary bg-secondary/5">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-secondary mb-2">£24</div>
                  <div className="text-sm text-muted-foreground line-through mb-1">£30</div>
                  <div className="text-sm font-medium">Standard Mock Package</div>
                  <div className="text-xs text-muted-foreground mt-1">50 Mock Exams + AI Assistant</div>
                </CardContent>
              </Card>

              <Card className="border-secondary bg-secondary/5">
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold text-secondary mb-2">£40</div>
                  <div className="text-sm text-muted-foreground line-through mb-1">£60</div>
                  <div className="text-sm font-medium">Premium Mock Package</div>
                  <div className="text-xs text-muted-foreground mt-1">Unlimited Mocks + Tutoring</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/pricing">View All Mock Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">Flexible pricing options for every learning style</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">£15</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg border border-border mb-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-secondary">20 Mocks</div>
                    <div className="text-sm text-muted-foreground">10 FLK1 • 10 FLK2</div>
                    <div className="text-2xl font-bold text-secondary mt-3">360 MCQs</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Basic practice questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Study materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Timed conditions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Legal blog access</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/checkout?plan=basic">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-secondary border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-secondary text-secondary-foreground">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge className="bg-red-100 text-red-800 border-red-200">25% OFF</Badge>
                  </div>
                  <span className="text-lg text-muted-foreground line-through">£60</span>
                  <span className="text-4xl font-bold text-foreground ml-2">£45</span>
                  <span className="text-muted-foreground">/month</span>
                  <div className="text-sm text-green-600 font-medium mt-1">Save £15/month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg border border-border mb-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-secondary">100 Mocks</div>
                    <div className="text-sm text-muted-foreground">FLK1 & FLK2</div>
                    <div className="text-2xl font-bold text-secondary mt-3">500 MCQs</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Basic practice questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>4 intensity levels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>AI Assistant "Forger"</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Flashcards per subtopic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Legal blog access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="font-medium">Personalized Weekly Timetable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Calendar view & Jan/July exam scheduling</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/checkout?plan=professional">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge className="bg-red-100 text-red-800 border-red-200">33% OFF</Badge>
                  </div>
                  <span className="text-lg text-muted-foreground line-through">£150</span>
                  <span className="text-4xl font-bold text-foreground ml-2">£100</span>
                  <span className="text-muted-foreground">/month</span>
                  <div className="text-sm text-green-600 font-medium mt-1">Save £50/month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg border border-border mb-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-secondary">Unlimited Mocks</div>
                    <div className="text-sm text-muted-foreground">FLK1 & FLK2</div>
                    <div className="text-2xl font-bold text-secondary mt-3">Unlimited MCQs</div>
                    <div className="text-sm text-muted-foreground">FLK1 & FLK2</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Priority AI support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>1-on-1 tutoring sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Legal blog access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="font-medium">Advanced Weekly Timetable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Advanced calendar view & scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Custom study schedule optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span>Progress-based timetable adjustments</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/checkout?plan=premium">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-secondary bg-secondary/5">
              <CardHeader className="text-center">
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  Personalized Study Timetables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">January 2025 Exam Track</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>Intensive 12-week schedule</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>20-25 hours/week study plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>Weekly milestones & mock exams</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>Focused revision in final weeks</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">July 2025 Exam Track</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>Comprehensive 36-week schedule</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>8-15 hours/week study plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>Gradual progression & deep learning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        <span>Flexible pace for working professionals</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Available with Professional (£45) and Premium (£100) plans - includes calendar view
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/timetable">
                      <Clock className="w-4 h-4 mr-2" />
                      View Sample Calendar & Timetable
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Students Say</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "The AI assistant made complex legal concepts so much easier to understand. Passed SQE1 on my first
                  attempt!"
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold">Sarah M.</p>
                  <p>Career Changer</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "The practice questions perfectly mirrored the actual exam. The different intensity levels helped me
                  build confidence gradually."
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold">James R.</p>
                  <p>Law Graduate</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "As a working professional, the flexible study materials and progress tracking were invaluable. Highly
                  recommend!"
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold">Emma L.</p>
                  <p>Legal Professional</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Forge Your Legal Career?
          </h2>
          <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of successful SQE candidates who chose SQE Forge for their exam preparation
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link href="/pricing">Choose Your Plan Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SQE Forge</span>
              </div>
              <p className="text-muted-foreground">Forge Your Legal Path To Success</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/practice" className="hover:text-foreground transition-colors">
                    Practice Questions
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-foreground transition-colors">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/study" className="hover:text-foreground transition-colors">
                    Study Materials
                  </Link>
                </li>
                <li>
                  <Link href="/progress" className="hover:text-foreground transition-colors">
                    Progress Tracking
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Legal Blog
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    SQE Updates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SQE Forge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
