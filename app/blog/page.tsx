"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight, Scale, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: "sqe-fee-increases-2025",
    title: "SQE Assessment Fees to Increase from September 2025",
    excerpt:
      "The SRA has announced fee increases for SQE assessments, with SQE1 rising to £1,934 and SQE2 to £2,974 from September 2025.",
    author: "SRA Official",
    date: "2025-04-30",
    readTime: "3 min read",
    category: "SRA Updates",
    featured: true,
    tags: ["SRA", "Fees", "2025", "Assessment"],
    source: "Solicitors Regulation Authority",
    sourceUrl: "https://www.sra.org.uk/students/sqe/",
  },
  {
    id: "sqe-specifications-update-2025",
    title: "Updated SQE Assessment Specifications Published for September 2025",
    excerpt:
      "New specifications include increased Professional Conduct and Ethics questions (up to 20%) and additional guidance on scenario types for ethics questions.",
    author: "SRA Assessment Team",
    date: "2025-04-30",
    readTime: "5 min read",
    category: "SRA Updates",
    featured: false,
    tags: ["Specifications", "Ethics", "Professional Conduct"],
    source: "Solicitors Regulation Authority",
    sourceUrl: "https://www.sra.org.uk/students/sqe/",
  },
  {
    id: "sqe2-welsh-language-2025",
    title: "SQE1 Now Available in Welsh from January 2025",
    excerpt:
      "Following SQE2, candidates can now take SQE1 in Welsh. Advance notice required for Welsh language assessments.",
    author: "SRA Communications",
    date: "2024-06-15",
    readTime: "2 min read",
    category: "SRA Updates",
    featured: false,
    tags: ["Welsh", "Language", "Accessibility"],
    source: "Solicitors Regulation Authority",
    sourceUrl: "https://www.sra.org.uk/students/sqe/",
  },
  {
    id: "sqe2-scoring-changes",
    title: "SQE2 Results Now Shown as Scaled Scores Out of 500",
    excerpt:
      "New scoring system implemented with pass mark always scaled to 300 for consistency across assessment windows.",
    author: "SRA Assessment Team",
    date: "2025-04-01",
    readTime: "4 min read",
    category: "SRA Updates",
    featured: false,
    tags: ["Scoring", "SQE2", "Results"],
    source: "Solicitors Regulation Authority",
    sourceUrl: "https://www.sra.org.uk/students/sqe/",
  },
  {
    id: "qualified-lawyers-language-requirements",
    title: "New Language Proficiency Requirements for Qualified Lawyers",
    excerpt:
      "Qualified lawyers granted SQE2 exemption must now demonstrate language proficiency before applying for admission as a solicitor.",
    author: "SRA Policy Team",
    date: "2024-06-01",
    readTime: "3 min read",
    category: "Legal Updates",
    featured: false,
    tags: ["Qualified Lawyers", "Language", "Admission"],
    source: "Solicitors Regulation Authority",
    sourceUrl: "https://www.sra.org.uk/students/sqe/",
  },
  {
    id: "sqe-annual-report-2024",
    title: "SQE Annual Report 2024: Third Year Assessment Data Published",
    excerpt:
      "Comprehensive data covering July 2023 to July 2024 assessments, including pass rates and candidate demographics.",
    author: "SRA Research Team",
    date: "2025-04-15",
    readTime: "6 min read",
    category: "SRA Updates",
    featured: false,
    tags: ["Annual Report", "Statistics", "Data"],
    source: "Solicitors Regulation Authority",
    sourceUrl: "https://www.sra.org.uk/students/sqe/",
  },
]

const categories = ["All", "SRA Updates", "Legal Updates", "Study Tips", "Case Law", "Legislation"]

export default function BlogPage() {
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
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Legal Blog & Updates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay current with the latest SQE updates, legal developments, and official announcements from the SRA.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category !== "All" ? "bg-transparent" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts
          .filter((post) => post.featured)
          .map((post) => (
            <Card key={post.id} className="border-secondary bg-secondary/5 mb-12">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl">{post.title}</CardTitle>
                <CardDescription className="text-lg">{post.excerpt}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <span>Source:</span>
                  <Link
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline flex items-center gap-1"
                  >
                    {post.source}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts
            .filter((post) => !post.featured)
            .map((post) => (
              <Card key={post.id} className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    {post.category === "SRA Updates" && <AlertCircle className="w-4 h-4 text-orange-500" />}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <span>Source:</span>
                    <Link
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline flex items-center gap-1"
                    >
                      {post.source}
                      <ExternalLink className="w-2 h-2" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="border-secondary bg-secondary/5 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Scale className="w-5 h-5 text-secondary" />
              Stay Updated
            </CardTitle>
            <CardDescription>Get the latest SQE updates and legal developments delivered to your inbox</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="Enter your email address" className="flex-1" />
              <Button>
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              No spam. Unsubscribe at any time. Updates 2-3 times per month.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            All content is sourced from official SRA publications and announcements. We provide summaries and analysis
            while maintaining full attribution to original sources. For complete details, please refer to the original
            SRA documentation.
          </p>
        </div>
      </div>
    </div>
  )
}
