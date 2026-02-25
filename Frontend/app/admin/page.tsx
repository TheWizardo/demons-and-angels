"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdmin, getUserFromToken, getCurrentUserToken, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsManager } from "@/components/admin/products-manager"
import { ConfigManager } from "@/components/admin/config-manager"
import { LogOut } from "lucide-react"
import * as auth from "@/lib/auth"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const user = getUserFromToken(getCurrentUserToken())

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/login")
    } else {
      auth.verifyAdminViaBackend().then(isAdmin => {
        if (!isAdmin) {
          router.push("/login");
        }
        else {
          setIsAuthorized(true)
        }
      }).catch(err => {
        router.push("/login")
      })
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
    router.refresh()
  }

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p>מעביר לדף התחברות...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">ניהול האתר</h1>
          <p className="text-muted-foreground">ברוך הבא, {user?.customer.firstName}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="ml-2 h-4 w-4" />
          התנתק
        </Button>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="products">מוצרים</TabsTrigger>
          <TabsTrigger value="config">הגדרות</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <ProductsManager />
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <ConfigManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
