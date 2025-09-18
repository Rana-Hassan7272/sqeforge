"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Play, Settings, Clock, Target, BookOpen, Shuffle, Save, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const modules = [
  "Business Law & Practice",
  "Contract Law",
  "Tort Law",
  "Property Law",
  "Criminal Law & Practice",
  "Dispute Resolution",
]

const difficulties = ["Foundation", "Intermediate", "Advanced", "Expert"]

const savedSets = [
  {
    id: 1,
    name: "Contract Law Weaknesses",
    description: "Focus on formation and breach topics",
    modules: ["Contract Law"],
    topics: ["Formation", "Breach", "Remedies"],
    difficulty: ["Intermediate", "Advanced"],
    questionCount: 50,
    timeLimit: 90,
    createdAt: "2024-01-15",
    lastUsed: "2024-01-20",
    timesUsed: 5,
    averageScore: 78,
  },
  {
    id: 2,
    name: "Mixed Practice Set",
    description: "All modules, foundation level",
    modules: ["Business Law & Practice", "Contract Law", "Tort Law"],
    topics: [],
    difficulty: ["Foundation"],
    questionCount: 30,
    timeLimit: 45,
    createdAt: "2024-01-10",
    lastUsed: "2024-01-18",
    timesUsed: 3,
    averageScore: 85,
  },
  {
    id: 3,
    name: "Expert Challenge",
    description: "Most difficult questions across all topics",
    modules: modules,
    topics: [],
    difficulty: ["Expert"],
    questionCount: 25,
    timeLimit: 60,
    createdAt: "2024-01-05",
    lastUsed: "2024-01-16",
    timesUsed: 2,
    averageScore: 62,
  },
]

export default function CustomPracticePage() {
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(["Foundation", "Intermediate"])
  const [questionCount, setQuestionCount] = useState([50])
  const [timeLimit, setTimeLimit] = useState([90])
  const [includeBookmarked, setIncludeBookmarked] = useState(false)
  const [includeIncorrect, setIncludeIncorrect] = useState(true)
  const [randomOrder, setRandomOrder] = useState(true)
  const [setName, setSetName] = useState("")
  const [setDescription, setSetDescription] = useState("")

  const handleModuleToggle = (module: string) => {
    setSelectedModules((prev) => (prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]))
  }

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  const canCreateSet = selectedModules.length > 0 && selectedDifficulties.length > 0

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
              <span className="text-foreground font-medium">Custom Practice</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Custom Practice Sets</h1>
          <p className="text-muted-foreground mt-2">Create personalized practice sessions tailored to your needs</p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create New Set</TabsTrigger>
            <TabsTrigger value="saved">Saved Sets ({savedSets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Configuration Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Practice Configuration
                    </CardTitle>
                    <CardDescription>Customize your practice session parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Module Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Select Modules</Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {modules.map((module) => (
                          <div key={module} className="flex items-center space-x-2">
                            <Checkbox
                              id={module}
                              checked={selectedModules.includes(module)}
                              onCheckedChange={() => handleModuleToggle(module)}
                            />
                            <Label htmlFor={module} className="text-sm font-normal cursor-pointer">
                              {module}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Difficulty Levels</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {difficulties.map((difficulty) => (
                          <div key={difficulty} className="flex items-center space-x-2">
                            <Checkbox
                              id={difficulty}
                              checked={selectedDifficulties.includes(difficulty)}
                              onCheckedChange={() => handleDifficultyToggle(difficulty)}
                            />
                            <Label htmlFor={difficulty} className="text-sm font-normal cursor-pointer">
                              {difficulty}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Question Count */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Number of Questions: {questionCount[0]}</Label>
                      <Slider
                        value={questionCount}
                        onValueChange={setQuestionCount}
                        max={200}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>10</span>
                        <span>200</span>
                      </div>
                    </div>

                    {/* Time Limit */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Time Limit: {timeLimit[0]} minutes</Label>
                      <Slider
                        value={timeLimit}
                        onValueChange={setTimeLimit}
                        max={300}
                        min={15}
                        step={15}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>15 min</span>
                        <span>5 hours</span>
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Additional Options</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="bookmarked"
                            checked={includeBookmarked}
                            onCheckedChange={setIncludeBookmarked}
                          />
                          <Label htmlFor="bookmarked" className="text-sm font-normal">
                            Include bookmarked questions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="incorrect" checked={includeIncorrect} onCheckedChange={setIncludeIncorrect} />
                          <Label htmlFor="incorrect" className="text-sm font-normal">
                            Include previously incorrect questions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="random" checked={randomOrder} onCheckedChange={setRandomOrder} />
                          <Label htmlFor="random" className="text-sm font-normal">
                            Randomize question order
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Set */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Save className="w-5 h-5" />
                      Save Practice Set
                    </CardTitle>
                    <CardDescription>Save this configuration for future use</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="setName">Set Name</Label>
                      <Input
                        id="setName"
                        placeholder="e.g., Contract Law Review"
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setDescription">Description (Optional)</Label>
                      <Input
                        id="setDescription"
                        placeholder="Brief description of this practice set"
                        value={setDescription}
                        onChange={(e) => setSetDescription(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" disabled={!canCreateSet || !setName}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Practice Set
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Practice Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Modules:</span>
                        <span className="font-medium">{selectedModules.length || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Difficulties:</span>
                        <span className="font-medium">{selectedDifficulties.length || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="font-medium">{questionCount[0]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time Limit:</span>
                        <span className="font-medium">{timeLimit[0]} min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Difficulty:</span>
                        <span className="font-medium">
                          {selectedDifficulties.includes("Expert")
                            ? "Expert"
                            : selectedDifficulties.includes("Advanced")
                              ? "Advanced"
                              : selectedDifficulties.includes("Intermediate")
                                ? "Intermediate"
                                : "Foundation"}
                        </span>
                      </div>
                    </div>

                    {selectedModules.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Selected Modules:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedModules.map((module) => (
                            <Badge key={module} variant="secondary" className="text-xs">
                              {module}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedDifficulties.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Difficulties:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedDifficulties.map((difficulty) => (
                            <Badge key={difficulty} variant="outline" className="text-xs">
                              {difficulty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full" disabled={!canCreateSet}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Practice Session
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Shuffle className="w-4 h-4 mr-2" />
                      Random Mix (All Modules)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Weak Areas Only
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Clock className="w-4 h-4 mr-2" />
                      Timed Challenge (30 min)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSets.map((set) => (
                <Card key={set.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{set.name}</CardTitle>
                        <CardDescription className="mt-1">{set.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="font-medium">{set.questionCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{set.timeLimit}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Used:</span>
                        <span className="font-medium">{set.timesUsed}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Score:</span>
                        <span className="font-medium">{set.averageScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {set.modules.slice(0, 2).map((module) => (
                          <Badge key={module} variant="secondary" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                        {set.modules.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{set.modules.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {set.difficulty.map((diff) => (
                          <Badge key={diff} variant="outline" className="text-xs">
                            {diff}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Created {new Date(set.createdAt).toLocaleDateString()} • Last used{" "}
                      {new Date(set.lastUsed).toLocaleDateString()}
                    </div>

                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {savedSets.length === 0 && (
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No saved practice sets</h3>
                  <p className="text-muted-foreground mb-4">Create your first custom practice set to get started</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Practice Set
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
