"use client"

import Link from "next/link"
import { Activity, Menu, X, LayoutDashboard, Database, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"
import { UserButton, useUser, SignInButton } from "@clerk/nextjs"

export function MainHeader({ onLoginClick }: { onLoginClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">MedSecure24</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group">
                  <LayoutDashboard className="w-4 h-4 mr-2 group-hover:text-blue-500" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/ambulance">
                <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group">
                  <Database className="w-4 h-4 mr-2 group-hover:text-red-500" />
                  Ambulance Console
                </Button>
              </Link>

              <div className="ml-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                  Sign In
                </Button>
              </SignInButton>
            </>
          )}

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <ModeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center">
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
          </div>
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-slate-900 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 animate-in slide-in-from-top-2">
          <div className="px-4 py-4 flex flex-col gap-2">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-700 dark:text-slate-300">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/ambulance" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-700 dark:text-slate-300">
                    <Database className="w-4 h-4 mr-2" />
                    Ambulance Console
                  </Button>
                </Link>
                <Link href="/simulator" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-700 dark:text-slate-300">
                    <Database className="w-4 h-4 mr-2" />
                    Simulator
                  </Button>
                </Link>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" size="sm" className="w-full justify-start bg-blue-600">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

