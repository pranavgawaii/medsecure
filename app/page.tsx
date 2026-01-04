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
import {
  Activity,
  Shield,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
  Lock,
  Loader2,
  Ambulance,
  Building2,
  CheckCircle2,
  Globe,
  Server,
  HeartPulse
} from "lucide-react"

import { Suspense } from "react"

function HomeContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("hospital") // 'hospital' | 'ambulance'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check auth status
    const checkAuth = () => {
      const cookie = document.cookie;
      const loggedIn = cookie.includes("auth-token");
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        try {
          const match = cookie.match(/auth-token=([^;]+)/);
          if (match) {
            const decoded = atob(decodeURIComponent(match[1]));
            const data = JSON.parse(decoded);
            setRole(data.role || "hospital");
          }
        } catch (e) {
          console.error("Failed to parse role", e);
        }
      }
    }
    checkAuth()
  }, [])

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 md:pt-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-white dark:from-blue-950/50 dark:via-slate-950 dark:to-slate-950" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 w-fit mx-auto lg:mx-0">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Secure IoT Medical Data</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  Emergency care, <br />
                  <span className="text-blue-600">accelerated by data.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Real-time vital transmission from ambulance to hospital. Secure, reliable, and life-saving. Connect your fleet today with military-grade encryption.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  {isLoggedIn ? (
                    role === 'hospital' ? (
                      <Button onClick={() => router.push('/dashboard')} size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow-lg shadow-blue-500/20">
                        Hospital Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => router.push('/ambulance')} size="lg" className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold shadow-lg shadow-red-500/20">
                        Ambulance Console <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    )
                  ) : (
                    <Button onClick={() => setIsLoginOpen(true)} size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow-lg shadow-blue-500/20">
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="lg" className="h-12 px-8 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md font-semibold">
                    Live Demo
                  </Button>
                </div>

                <div className="flex items-center gap-8 justify-center lg:justify-start pt-8 text-slate-500 dark:text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>End-to-End Encrypted</span>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto lg:ml-auto w-full max-w-lg lg:max-w-none">
                {/* Abstract visual representation */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 aspect-video lg:aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 opacity-50 patterned-background"></div>
                  <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                    <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20 flex flex-col items-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-3">
                        <Ambulance className="w-6 h-6 text-red-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Ambulance</span>
                      <span className="text-xs text-slate-500">Transmitting Data</span>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20 flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Hospital</span>
                      <span className="text-xs text-slate-500">Receiving Live Vitals</span>
                    </div>
                  </div>
                  {/* Animated Connection Line */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[200px] h-1 bg-gradient-to-r from-red-200 via-blue-200 to-blue-200 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-blue-500 animate-slide-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                Critical features for critical moments
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Designed for speed, security, and reliability. MedSecure24 bridges the gap between emergency response and hospital readiness.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <HeartPulse className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Real-Time Vitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Live streaming of heart rate, BP, SPO2, and ECG data allows doctors to prepare before the patient arrives.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl">Bank-Grade Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    AES-256 bit encryption and strict access controls ensure that sensitive patient data never falls into the wrong hands.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl">Instant Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Automated triage suggestions and priority alerts help emergency departments manage incoming caseloads effectively.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                  Seamless Integration Workflow
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Paramedic Connects Device</h3>
                      <p className="text-slate-600 dark:text-slate-400">IoT sensors are attached to the patient in the ambulance. Connection is established instantly.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Secure Encrypted Transmission</h3>
                      <p className="text-slate-600 dark:text-slate-400">Data is encrypted locally and transmitted via stable 4G/5G networks to the cloud.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Hospital Monitoring</h3>
                      <p className="text-slate-600 dark:text-slate-400">Doctors view live feeds on the dashboard and prepare the trauma team accordingly.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                {/* Placeholder for workflow graphic */}
                <div className="aspect-video bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center justify-center">
                  <Activity className="w-16 h-16 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to modernize your emergency response?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join the network of forward-thinking hospitals and ambulance fleets. Save time, save lives.</p>
            <Button
              size="lg"
              onClick={() => setIsLoginOpen(true)}
              className="h-14 px-10 text-lg rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-xl shadow-blue-900/20"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="font-bold text-xl mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                MedSecure24
              </div>
              <p className="text-sm text-slate-500">
                Advanced IoT solutions for the healthcare sector.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                <li><a href="#" className="hover:text-blue-600">Ambulance App</a></li>
                <li><a href="#" className="hover:text-blue-600">Hospital Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} MedSecure24. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
      <HomeContent />
    </Suspense>
  )
}
