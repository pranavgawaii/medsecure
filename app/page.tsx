"use client"

import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Shield, Zap, TrendingUp, Users, ArrowRight, Lock } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live Beta Available
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Emergency Response</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Secure, real-time vital data transmission from ambulance to hospital.
              Empowering doctors with instant insights to save lives.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
                  Access Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/simulator">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  Try Simulator
                </Button>
              </Link>
            </div>

            <div className="pt-12 flex items-center justify-center gap-8 text-slate-400 dark:text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> Military-Grade Encryption
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> < 50ms Latency
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> HIPAA Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why MedSecure24?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Built for critical moments where every second counts. Our platform ensures data integrity, speed, and reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-slate-50 dark:bg-slate-800/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Real-Time Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">Stream heart rate, SPO2, and BP directly from device to dashboard with sub-second latency.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-slate-50 dark:bg-slate-800/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>End-to-End Encrypted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">AES-256 encryption ensures patient data remains private and secure during transmission.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-slate-50 dark:bg-slate-800/50 hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">Automated triage and alert system identifies critical patients before arrival.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute -top-[50%] -left-[20%] w-[1000px] h-[1000px] rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-[50%] -right-[20%] w-[800px] h-[800px] rounded-full bg-purple-600 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Modernize Emergency Care?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Join the network of smart ambulances and hospitals saving lives with data.</p>
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all font-semibold">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
