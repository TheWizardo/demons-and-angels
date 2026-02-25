"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import config from "@/lib/config";
import { configService } from "@/services/config-service";

interface SiteConfig {
  bannerEnabled: boolean
  bannerMessage: string
}

export function SiteBanner() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    bannerEnabled: config.showBanner,
    bannerMessage: config.banner_message || "",
  })

  useEffect(() => {
    configService.fetchConfig().then((cfg) => {
      if (cfg) {
        setSiteConfig({
          bannerEnabled: cfg.showBanner,
          bannerMessage: cfg.banner_message || "",
        })
      }
    }).catch((err) => {
      console.error("Error fetching config:", err)
    })
  }, []);

  if (!siteConfig.bannerEnabled || !siteConfig.bannerMessage) return null

  return (
    <div className="relative bg-primary text-primary-foreground">
      <Link href="/store" className="block py-3 px-4 text-center hover:underline">
        <p className="text-sm font-medium">{siteConfig.bannerMessage}</p>
      </Link>
    </div>
  )
}
