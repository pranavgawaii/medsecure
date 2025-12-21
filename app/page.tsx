"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MainHeader } from "@/components/main-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Shield, Zap, TrendingUp, Users, ArrowRight, Lock, Loader2, Ambulance, Building2 } from "lucide-react"

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("hospital") // 'hospital' | 'ambulance'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("login") === "required") {
      setIsLoginOpen(true)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })

      if (res.ok) {
        // Redirect based on role
        if (role === 'ambulance') {
          window.location.href = "/ambulance"
        } else {
          window.location.href = "/dashboard"
        }
      } else {
        setError("Invalid credentials. Try demo/demo")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <MainHeader onLoginClick={() => setIsLoginOpen(true)} />

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to MedSecure24</DialogTitle>
            <DialogDescription>
              Select your role and sign in to access the platform.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="py-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div
                    onClick={() => setRole('hospital')}
                    className={`cursor-pointer p-4 border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors ${role === 'hospital' ? 'border-blue-500 bg-blue-50 dark:bg-slate-800 text-blue-600' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <Building2 className="w-6 h-6" />
                    <span className="text-sm font-medium">Hospital Staff</span>
                  </div>
                  <div
                    onClick={() => setRole('ambulance')}
                    className={`cursor-pointer p-4 border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-slate-800 transition-colors ${role === 'ambulance' ? 'border-red-500 bg-red-50 dark:bg-slate-800 text-red-600' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <Ambulance className="w-6 h-6" />
                    <span className="text-sm font-medium">Ambulance</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="name@organization.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // mock validation
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <span className="text-xs text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required // mock validation
                  />
                </div>
                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-xs text-slate-600 dark:text-slate-400">
                  <p><strong>Demo Credentials:</strong></p>
                  <p>Any email / Any password (e.g. demo/demo)</p>
                </div>

                <Button type="submit" className={`w-full ${role === 'ambulance' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Sign In to {role === 'ambulance' ? 'Console' : 'Dashboard'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="py-4 text-center space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                <Shield className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Registration Closed</h3>
                <p className="text-sm text-slate-500 mt-1">This is a private beta environment. Please contact your system administrator to request an account.</p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setIsLoginOpen(false)}>Close</Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 dark:from-blue-950 dark:via-slate-950 dark:to-slate-950 -z-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Secure IoT Medical Data Transmission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              Real-Time Vitals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Secured & Delivered
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Connect ambulances, monitor patients, and secure data with military-grade encryption. The future of emergency response is here.
            </p>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" /> HIPAA Compliant
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Features Grid */ }
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

  {/* CTA Section */ }
  <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
      <div className="absolute -top-[50%] -left-[20%] w-[1000px] h-[1000px] rounded-full bg-blue-600 blur-3xl"></div>
      <div className="absolute -bottom-[50%] -right-[20%] w-[800px] h-[800px] rounded-full bg-purple-600 blur-3xl"></div>
    </div>

    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Modernize Emergency Care?</h2>
      <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Join the network of smart ambulances and hospitals saving lives with data.</p>
      <Button
        size="lg"
        onClick={() => setIsLoginOpen(true)}
        className="h-14 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all font-semibold"
      >
        Get Started Now
      </Button>
    </div>
  </section>
    </main >
  )
}
