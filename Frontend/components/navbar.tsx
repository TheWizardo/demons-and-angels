"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, User } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCurrentUserToken, getUserFromToken, logout, isAdmin } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(getUserFromToken(getCurrentUserToken()))
  const router = useRouter()

  useEffect(() => {
    // Update user state when component mounts
    setUser(getUserFromToken(getCurrentUserToken()))
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const navLinks = [
    { href: "/", label: "בית" },
    { href: "/about", label: "אודות" },
    { href: "/store", label: "חנות" },
    { href: "/contact", label: "צור קשר" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <img src="/Images/lavender.png" alt="" className="h-7 w-5 object-cover" />
          <span>שדים ומלאכים</span>
          <img src="/Images/rose.png" alt="" className="h-7 w-5 object-cover rotate-180" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              className="text-sm font-medium transition-colors hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md"
            >
              {link.label}
            </Link>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="החלף ערכת נושא"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin() && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">ניהול האתר</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>התנתק</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">התחבר</Link>
            </Button>
          )} */}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="החלף ערכת נושא"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="תפריט">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-medium transition-colors hover:text-primary px-4"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* {user ? (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <p className="text-sm text-muted-foreground mb-2">{user.name}</p>
                      {isAdmin() && (
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block text-lg font-medium transition-colors hover:text-primary mb-2"
                        >
                          ניהול האתר
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        התנתק
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary border-t pt-4 mt-4"
                  >
                    התחבר
                  </Link>
                )} */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
