"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MainHeader } from "@/components/main-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Shield,
  Zap,
  Ambulance,
  Building2,
  CheckCircle2,
  HeartPulse,
  Lock,
  ArrowRight,
  Stethoscope,
  Globe
} from "lucide-react"

import { Suspense } from "react"
import { SignInButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs"
import { motion } from "framer-motion"

function HomeContent() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <MainHeader />

      <main className="flex-1">
        {/* Dynamic Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-teal-50/30 to-transparent dark:from-blue-950/20 dark:via-teal-950/10 dark:to-transparent" />
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-teal-400/10 dark:bg-teal-600/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-32 md:pt-48 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-8 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 border border-blue-100 dark:border-blue-800 backdrop-blur-md w-fit mx-auto lg:mx-0 shadow-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Secure IoT Medical Data</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  Emergency care, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">accelerated.</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Real-time vital transmission from ambulance to hospital with military-grade encryption. Saving seconds when they matter most.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                  <SignedIn>
                    <Button onClick={() => router.push('/dashboard')} size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </SignInButton>
                  </SignedOut>

                  <Button variant="outline" size="lg" className="h-14 px-10 text-lg border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full font-bold backdrop-blur-sm bg-white/50 dark:bg-black/20">
                    Live Demo
                  </Button>
                </div>

                <div className="flex items-center gap-6 justify-center lg:justify-start pt-6 text-sm font-semibold text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" />
                    <span>End-to-End Encrypted</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto lg:ml-auto w-full max-w-lg lg:max-w-none"
              >
                {/* Glassmorphic Abstract Visualization */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 glass dark:glass-dark aspect-[4/3] flex items-center justify-center p-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 dark:from-blue-500/10 dark:to-teal-500/10" />

                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-red-100 dark:border-red-900/30 flex items-center gap-4 z-20"
                  >
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                      <HeartPulse className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium">Heart Rate</div>
                      <div className="text-lg font-bold">120 BPM</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 right-10 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/30 flex items-center gap-4 z-20"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium">Status</div>
                      <div className="text-lg font-bold text-blue-600">Stable</div>
                    </div>
                  </motion.div>

                  {/* Central Node */}
                  <div className="relative z-10 w-32 h-32 bg-gradient-to-r from-primary to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/40 animate-pulse-slow">
                    <Shield className="w-12 h-12 text-white" />
                  </div>

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="30%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-blue-200 dark:text-blue-800 opacity-50" strokeDasharray="5,5" />
                    <line x1="70%" y1="80%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-teal-200 dark:text-teal-800 opacity-50" strokeDasharray="5,5" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Critical features for critical moments
              </h2>
              <p className="text-xl text-muted-foreground">
                Engineered for speed, security, and reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-[2rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                    <Globe className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Real-Time Global Telemetry</h3>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md">
                    Live streaming of heart rate, BP, SPO2, and ECG data allows doctors to prepare before the patient arrives.
                  </p>
                  <Button variant="link" className="px-0 text-primary font-bold text-lg">Learn more <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
                <div className="absolute right-[-20%] bottom-[-20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />
                {/* Decorative UI element */}
                <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-50 translate-x-10 translate-y-10">
                  <Card className="w-full h-full glass border-0">
                    <CardHeader><CardTitle>Live Feed</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4 animate-pulse" />
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2 animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                <p className="text-muted-foreground">
                  AES-256 bit encryption ensures patient data is safe.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Alerts</h3>
                <p className="text-muted-foreground">
                  Automated triage suggestions and priority alerts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 bg-slate-50 dark:bg-black/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight mb-8">Seamless Integration</h2>
                <div className="space-y-10">
                  {[
                    { title: "Paramedic Connects Device", desc: "IoT sensors are attached to the patient in the ambulance.", icon: Ambulance },
                    { title: "Secure Transmission", desc: "Data is encrypted locally and transmitted via 5G networks.", icon: Lock },
                    { title: "Hospital Monitoring", desc: "Doctors view live feeds and prepare the trauma team.", icon: Building2 }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden glass dark:glass-dark p-2 animate-float">
                  <Image
                    src="/workflow-diagram.png"
                    alt="Workflow"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl shadow-inner bg-slate-100 dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary -z-10" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to save lives?</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join the network of forward-thinking hospitals and ambulance fleets today.
            </p>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="h-16 px-12 text-xl rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Get Started Now
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="font-bold text-xl mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                MedSecure24
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced IoT solutions for the healthcare sector.
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedSecure24. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  )
}
