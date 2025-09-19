"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, BookOpen, ArrowLeft, ZoomIn, ZoomOut, Download, Share } from "lucide-react"
import Link from "next/link"
import { getMindMapByTopic } from "@/lib/mindmaps-database"

const getFlashcardCategory = (module: string, topic: string) => {
  const topicLower = topic.toLowerCase()
  const moduleLower = module.toLowerCase()

  if (moduleLower.includes("contract") || moduleLower.includes("business")) {
    if (topicLower.includes("formation") || topicLower.includes("starting")) {
      return "contract-law-principles"
    }
    if (topicLower.includes("business") || topicLower.includes("company")) {
      return "business-law-concepts"
    }
  }

  if (moduleLower.includes("tort")) {
    return "tort-law-fundamentals"
  }

  if (moduleLower.includes("property")) {
    return "property-law-essentials"
  }

  if (moduleLower.includes("criminal")) {
    return "criminal-law-principles"
  }

  if (moduleLower.includes("dispute")) {
    return "analysis-of-claims"
  }

  // Default fallback
  return "contract-law-principles"
}

export default function PracticeMindMapPage() {
  const params = useParams()
  const module = params.module as string
  const topic = (params.topic as string).replace(/-/g, " ")

  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const mindMap = getMindMapByTopic(module, params.topic as string)
  const flashcardCategory = getFlashcardCategory(module, topic)

  const convertToDisplayNodes = (rootNode: any, centerX = 400, centerY = 300) => {
    const nodes = []
    const queue = [{ node: rootNode, x: centerX, y: centerY, level: 0 }]

    while (queue.length > 0) {
      const { node, x, y, level } = queue.shift()!

      nodes.push({
        id: node.id,
        title: node.label,
        description: node.description || "",
        x,
        y,
        level,
        connections: node.children?.map((child: any) => child.id) || [],
        color: level === 0 ? "bg-blue-500" : level === 1 ? "bg-green-500" : "bg-purple-500",
        caselaw: node.caselaw || [],
        statutes: node.statutes || [],
      })

      if (node.children) {
        const angleStep = (2 * Math.PI) / node.children.length
        node.children.forEach((child: any, index: number) => {
          const angle = index * angleStep
          const radius = level === 0 ? 200 : 150
          const childX = x + Math.cos(angle) * radius
          const childY = y + Math.sin(angle) * radius

          queue.push({ node: child, x: childX, y: childY, level: level + 1 })
        })
      }
    }

    return nodes
  }

  const nodes = mindMap ? convertToDisplayNodes(mindMap.rootNode) : []
  const selectedNodeData = nodes.find((n) => n.id === selectedNode)

  if (!mindMap) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Mind Map Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              No mind map available for this topic yet. Try exploring other topics or practice questions instead.
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link href={`/practice/${module}/topic/${params.topic}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Practice Questions
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/practice/flashcards/${flashcardCategory}`}>Flashcards</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/practice">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Practice
                </Link>
              </Button>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{mindMap.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Mind Map Canvas */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="absolute inset-0 transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
            <svg className="w-full h-full">
              {/* Connections */}
              {nodes.map((node) =>
                node.connections.map((connectionId: string) => {
                  const targetNode = nodes.find((n) => n.id === connectionId)
                  if (!targetNode) return null

                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke="#e2e8f0"
                      strokeWidth="2"
                      className="transition-colors hover:stroke-blue-400"
                    />
                  )
                }),
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                  selectedNode === node.id ? "scale-110 z-10" : "hover:scale-105"
                }`}
                style={{ left: node.x, top: node.y }}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <div
                  className={`${node.color} text-white rounded-lg p-3 shadow-lg min-w-[120px] text-center border-2 ${
                    selectedNode === node.id ? "border-yellow-400" : "border-white"
                  }`}
                >
                  <div className="font-semibold text-sm">{node.title}</div>
                  {node.level === 0 && <Brain className="w-4 h-4 mx-auto mt-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 border-l border-border bg-background p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                {mindMap.title}
              </h2>
              <p className="text-sm text-muted-foreground">{mindMap.description}</p>
            </div>

            {selectedNodeData ? (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedNodeData.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{selectedNodeData.description}</p>

                  {selectedNodeData.caselaw && selectedNodeData.caselaw.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Cases:</h4>
                      <div className="space-y-1">
                        {selectedNodeData.caselaw.map((case_name: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                            {case_name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNodeData.statutes && selectedNodeData.statutes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Statutes:</h4>
                      <div className="space-y-1">
                        {selectedNodeData.statutes.map((statute: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                            {statute}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNodeData.connections.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Connected to:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedNodeData.connections.map((connectionId) => {
                          const connectedNode = nodes.find((n) => n.id === connectionId)
                          return connectedNode ? (
                            <Badge key={connectionId} variant="secondary" className="text-xs">
                              {connectedNode.title}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm">Click on any node to explore its details and connections</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
              <Button className="w-full" asChild>
                <Link href={`/practice/${module}/topic/${params.topic}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Practice Questions
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/practice/${module}/mini-mock/${params.topic}`}>Mini Mock</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/practice/flashcards/${flashcardCategory}`}>Flashcards</Link>
              </Button>
            </div>

            <div className="bg-secondary/10 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Study Tip</h4>
              <p className="text-xs text-muted-foreground">
                Mind maps help visualize relationships between concepts. Follow the connections to understand how
                different elements interact in {mindMap.title}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
