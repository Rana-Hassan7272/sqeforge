import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">SQE Forge</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">About Us</span>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">About SQE Forge</h1>
            <p className="text-xl text-muted-foreground">
              Empowering the next generation of solicitors with innovative learning technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-border">
              <CardHeader>
                <Target className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  To democratize legal education by providing accessible, comprehensive, and innovative SQE preparation
                  tools that help aspiring solicitors achieve their career goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Heart className="w-10 h-10 text-secondary mb-4" />
                <CardTitle>Our Values</CardTitle>
                <CardDescription>
                  We believe in excellence, accessibility, innovation, and student success. Every feature we build is
                  designed with your learning journey in mind.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose SQE Forge?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Expert Team</h3>
                <p className="text-muted-foreground">
                  Built by legal professionals and education experts who understand the SQE journey
                </p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Proven Results</h3>
                <p className="text-muted-foreground">
                  Thousands of successful candidates have used our platform to pass their SQE exams
                </p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Focused Approach</h3>
                <p className="text-muted-foreground">
                  Every feature is designed specifically for SQE success, not generic test preparation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Card className="border-secondary bg-secondary/5">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of aspiring solicitors who trust SQE Forge for their exam preparation
                </p>
                <Button size="lg" asChild>
                  <Link href="/pricing">Choose Your Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
