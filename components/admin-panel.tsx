"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { isAdminMode, enableAdminMode, disableAdminMode } from "@/lib/admin-mode"
import Link from "next/link"

export default function AdminPanel() {
  const [adminEnabled, setAdminEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setAdminEnabled(isAdminMode())
  }, [])

  const toggleAdminMode = () => {
    if (adminEnabled) {
      disableAdminMode()
      setAdminEnabled(false)
    } else {
      enableAdminMode()
      setAdminEnabled(true)
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(true)}
          className="bg-background/80 backdrop-blur"
        >
          ⚙️
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-background/95 backdrop-blur border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">⚙️ Developer Panel</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              👁️
            </Button>
          </div>
          <CardDescription className="text-xs">Development tools for testing paid features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="admin-mode" className="text-sm">
                Admin Mode
              </Label>
              <p className="text-xs text-muted-foreground">Access all paid features without subscription</p>
            </div>
            <Switch id="admin-mode" checked={adminEnabled} onCheckedChange={toggleAdminMode} />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Available Features:</Label>
            <div className="flex flex-wrap gap-1">
              <Badge variant={adminEnabled ? "default" : "secondary"} className="text-xs">
                Flashcards
              </Badge>
              <Badge variant={adminEnabled ? "default" : "secondary"} className="text-xs">
                Calendar
              </Badge>
              <Badge variant={adminEnabled ? "default" : "secondary"} className="text-xs">
                Premium Content
              </Badge>
              <Badge variant={adminEnabled ? "default" : "secondary"} className="text-xs">
                AI Assistant
              </Badge>
            </div>
          </div>

          <div className="pt-2 border-t">
            <Button asChild size="sm" className="w-full">
              <Link href="/admin">Full Testing Interface</Link>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            {adminEnabled ? (
              <p className="text-green-600">✓ All features unlocked for development</p>
            ) : (
              <p>Enable admin mode to test paid features</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
