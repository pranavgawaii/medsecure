"use client"

import Link from "next/link"
import { useState } from "react"
import { MainHeader } from "@/components/main-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Radio, Lock, AlertCircle, BarChart3, Database, CheckCircle, Loader, Zap, Shield, TrendingUp, Users } from "lucide-react"

export default function Home() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [initMessage, setInitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleInitializeDatabase = async () => {
    setIsInitializing(true)
    setInitMessage(null)

    try {
      const response = await fetch("/api/init-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setInitMessage({
          type: "success",
          text: `Database initialized successfully! Tables created: ${data.tables.join(", ")}`,
        })
        console.log("[v0] Database initialized:", data)
      } else {
        const error = await response.json()
        setInitMessage({
          type: "error",
          text: `Initialization failed: ${error.error}`,
        })
      }
    } catch (error) {
      setInitMessage({
        type: "error",
        text: "Error initializing database. Check console for details.",
      })
      console.error("[v0] Database init error:", error)
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <MainHeader />

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
              <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
            Secure Real-Time Ambulance Data Transmission
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Advanced IoT-enabled emergency healthcare system with <span className="font-semibold text-blue-600 dark:text-blue-400">end-to-end encryption</span>, 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> real-time monitoring</span>, and 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> intelligent alerts</span> for improved patient outcomes.
          </p>
        </div>

        <Card className="mb-12 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Database Setup
                </CardTitle>
                <CardDescription>Initialize PostgreSQL database with tables and seed data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Click the button below to create all necessary database tables and populate them with test data. This must
              be done before launching the simulator.
            </p>
            <Button onClick={handleInitializeDatabase} disabled={isInitializing} size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {isInitializing ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Initialize Database
                </>
              )}
            </Button>
            {initMessage && (
              <div
                className={`flex items-start gap-2 p-3 rounded-md ${
                  initMessage.type === "success"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                }`}
              >
                {initMessage.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm">{initMessage.text}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">End-to-End Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                AES-256-GCM encryption protects all patient data during transmission with military-grade security
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Live Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time vital signs monitoring with instant hospital dashboard updates and WebSocket support
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Smart Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Automatic classification of conditions with targeted alerts for critical cases requiring immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Hospital Dashboard */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full border border-green-300 dark:border-green-700">
                  Production Ready
                </span>
              </div>
              <CardTitle className="text-2xl">Hospital Dashboard</CardTitle>
              <CardDescription>Real-time patient monitoring and alert management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                View live vital readings from ambulances, classify patient conditions automatically, and manage critical alerts from doctors with an intuitive interface.
              </p>
              <Link href="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Access Dashboard
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Ambulance Simulator */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer hover:-translate-y-1">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Radio className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-300 dark:border-blue-700">
                  Testing Tool
                </span>
              </div>
              <CardTitle className="text-2xl">Ambulance Simulator</CardTitle>
              <CardDescription>Simulate real-time vital data transmission</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Test the system by simulating ambulance vital data transmission. Start automatic simulations or manually transmit custom vital readings.
              </p>
              <Link href="/simulator">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600">
                  Launch Simulator
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="mb-16">
          <Link href="/api-docs">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">API Documentation</CardTitle>
                <CardDescription>Complete API reference, integration guide, and security specifications</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Technical Stack */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">System Architecture & Tech Stack</CardTitle>
            <CardDescription>Built with modern web technologies and enterprise-grade security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-blue-200 dark:border-slate-600 hover:shadow-md transition-shadow duration-300">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">Backend</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Next.js 16</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">API Routes & Server Components</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-cyan-200 dark:border-slate-600 hover:shadow-md transition-shadow duration-300">
                <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Database</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">PostgreSQL</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Neon Serverless</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-purple-200 dark:border-slate-600 hover:shadow-md transition-shadow duration-300">
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2">Encryption</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">AES-256-GCM</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Military Grade Security</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-green-200 dark:border-slate-600 hover:shadow-md transition-shadow duration-300">
                <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">Frontend</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">React 19</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Tailwind CSS & Shadcn</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
