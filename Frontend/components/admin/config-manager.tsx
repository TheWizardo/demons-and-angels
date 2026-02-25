"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import config from "@/lib/config"
import { configService } from "@/services/config-service"

interface SiteConfig {
  showBanner: boolean
  banner_message: string
}

export function ConfigManager() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    showBanner: config.showBanner,
    banner_message: config.banner_message || "",
  })
  const { toast } = useToast()


  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving config:", siteConfig)
    configService.postConfig(siteConfig).then(() => {
      toast({ title: "הגדרות נשמרו בהצלחה" })
    }).catch((err) => {
      toast({ title: "שגיאה בשמירת ההגדרות", description: err.message })
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">הגדרות האתר</h2>

      <Card>
        <CardHeader>
          <CardTitle>באנר אתר</CardTitle>
          <CardDescription>נהל את הבאנר שמופיע בראש האתר</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="showBanner"
                checked={siteConfig.showBanner}
                onCheckedChange={(checked) => setSiteConfig({ ...siteConfig, showBanner: checked })}
              />
              <Label htmlFor="showBanner">הצג באנר</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner_message">הודעת באנר</Label>
              <Textarea
                id="banner_message"
                value={siteConfig.banner_message}
                onChange={(e) => setSiteConfig({ ...siteConfig, banner_message: e.target.value })}
                placeholder="הקלד את ההודעה שתוצג בבאנר..."
                rows={3}
              />
            </div>

            <Button type="submit">שמור שינויים</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
