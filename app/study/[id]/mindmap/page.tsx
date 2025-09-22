"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, BookOpen, ArrowLeft, ZoomIn, ZoomOut, Download, Share } from "lucide-react"
import Link from "next/link"
import { getMindMapByTopic, mindMapsDatabase } from "@/lib/mindmaps-database"

export default function MindMapPage() {
  const params = useParams()
  const materialId = params.id as string
  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const mindMap =
    getMindMapByTopic("business-law-practice", materialId) ||
    getMindMapByTopic("contract-law-practice", materialId) ||
    getMindMapByTopic("tort-law-practice", materialId) ||
    getMindMapByTopic("property-law-practice", materialId) ||
    getMindMapByTopic("criminal-law-practice", materialId) ||
    getMindMapByTopic("dispute-resolution", materialId)

  if (!mindMap) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">Mind map not available for this topic yet.</p>
            <p className="text-sm text-muted-foreground mb-4">Available modules: {Object.keys(mindMapsDatabase).join(", ")}</p>
            <p className="text-sm text-muted-foreground mb-4">Looking for: {materialId}</p>
            <Button asChild>
              <Link href={`/study/${materialId}`}>Back to Study Material</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const convertNodeToDisplay = (node: any, x: number, y: number, level: number): any => {
    return {
      id: node.id,
      title: node.label,
      description: node.description || `${node.label} - Key concept in ${mindMap.title}`,
      x,
      y,
      level,
      connections: node.children?.map((child: any) => child.id) || [],
      color: level === 0 ? "bg-blue-500" : level === 1 ? "bg-green-500" : "bg-purple-500",
      caselaw: node.caselaw || [],
      statutes: node.statutes || [],
    }
  }

  const generateDisplayNodes = (rootNode: any) => {
    const nodes: Array<{
      id: string
      label: string
      x: number
      y: number
      level: number
      parent?: string
      children: string[]
      statutes: string[]
      connections?: string[]
      color?: string
      title?: string
      description?: string
      caselaw?: string[]
    }> = []
    const centerX = 400
    const centerY = 300

    // Add root node
    nodes.push(convertNodeToDisplay(rootNode, centerX, centerY, 0))

    // Add first level children in circle around center
    if (rootNode.children) {
      const angleStep = (2 * Math.PI) / rootNode.children.length
      rootNode.children.forEach((child: any, index: number) => {
        const angle = index * angleStep
        const x = centerX + Math.cos(angle) * 200
        const y = centerY + Math.sin(angle) * 200
        nodes.push(convertNodeToDisplay(child, x, y, 1))

        // Add second level children
        if (child.children) {
          child.children.forEach((grandchild: any, gIndex: number) => {
            const childAngle = angle + (gIndex - (child.children.length - 1) / 2) * 0.3
            const gx = x + Math.cos(childAngle) * 120
            const gy = y + Math.sin(childAngle) * 120
            nodes.push(convertNodeToDisplay(grandchild, gx, gy, 2))
          })
        }
      })
    }

    return nodes
  }

  const nodes = generateDisplayNodes(mindMap.rootNode)
  const selectedNodeData = nodes.find((n) => n.id === selectedNode)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/study/${materialId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Notes
                </Link>
              </Button>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{mindMap.title} Mind Map</span>
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
                node.connections?.map((connectionId: string) => {
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
                      <div className="flex flex-wrap gap-1">
                        {selectedNodeData.caselaw.map((case_: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {case_}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNodeData.statutes && selectedNodeData.statutes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Statutes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedNodeData.statutes.map((statute: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {statute}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNodeData.connections && selectedNodeData.connections.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Connected to:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedNodeData.connections.map((connectionId: string) => {
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
                <Link href={`/study/${materialId}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Full Notes
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/study/${materialId}/flashcards`}>Practice Flashcards</Link>
              </Button>
            </div>

            <div className="bg-secondary/10 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">SQE1 Guidelines</h4>
              <p className="text-xs text-muted-foreground">
                This mindmap follows the SRA SQE1 2024 specification. Focus on practical application rather than
                memorizing case names. Questions test competency at newly qualified solicitor level with emphasis on
                client-based scenarios and professional conduct.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
