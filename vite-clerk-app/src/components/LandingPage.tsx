import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { ShieldCheck, Activity, Lock, Users, ArrowRight, Database, HeartPulse } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">MedSecure24</span>
            </div>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: 5G Ambulance Connectivity
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Secure Real-Time <br className="hidden sm:block" />
            <span className="text-blue-600">Ambulance Data Transmission</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Critical care starts before arrival. Transmit patient vitals, ECGs, and 
            video feeds securely from the ambulance to the hospital in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignUpButton mode="modal">
              <button className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 text-lg">
                Try Simulator <ArrowRight className="w-5 h-5" />
              </button>
            </SignUpButton>
            <button className="px-8 py-4 rounded-xl border border-gray-200 dark:border-gray-800 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-lg">
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose MedSecure24?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for modern healthcare providers who demand security, speed, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-6 h-6 text-blue-600" />,
                title: "End-to-End Encryption",
                desc: "Military-grade encryption for all patient records and communication channels."
              },
              {
                icon: <Activity className="w-6 h-6 text-blue-600" />,
                title: "Real-time Vitals",
                desc: "Monitor patient status instantly with our low-latency IoT integration layer."
              },
              {
                icon: <Database className="w-6 h-6 text-blue-600" />,
                title: "Secure Storage",
                desc: "Redundant cloud storage with automated backups and granular access controls."
              },
              {
                icon: <Users className="w-6 h-6 text-blue-600" />,
                title: "Team Collaboration",
                desc: "Seamlessly coordinate between doctors, nurses, and emergency responders."
              },
              {
                icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
                title: "Emergency Alerts",
                desc: "Automated critical alerts sent directly to on-call staff devices."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
                title: "HIPAA Compliant",
                desc: "Fully compliant infrastructure designed to meet all regulatory standards."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg">MedSecure24</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 MedSecure24 Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
