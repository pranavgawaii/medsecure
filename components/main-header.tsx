"use client"

import Link from "next/link"
import { Activity, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"

export function MainHeader() {
  const [isOpen, setIsOpen] = useState(false)

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
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              Dashboard
            </Button>
          </Link>
          <Link href="/simulator">
            <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              Simulator
            </Button>
          </Link>
          <Link href="/api-docs">
            <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              API Docs
            </Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
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
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="px-4 py-4 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-700 dark:text-slate-300">
                Dashboard
              </Button>
            </Link>
            <Link href="/simulator" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-700 dark:text-slate-300">
                Simulator
              </Button>
            </Link>
            <Link href="/api-docs" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-700 dark:text-slate-300">
                API Docs
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
