import { UserButton, useUser } from "@clerk/clerk-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Ambulance, 
  ArrowRight, 
  LayoutDashboard, 
  Database, 
  Shield, 
  CheckCircle2,
  Siren
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { user } = useUser();
  const [dbStatus, setDbStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleInitDb = () => {
    setDbStatus("loading");
    // Simulate DB initialization
    setTimeout(() => {
      setDbStatus("success");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            MedSecure24
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, {user?.firstName || "User"}!
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              Your secure command center for real-time ambulance data and patient monitoring is ready.
            </p>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hospital Dashboard Card */}
          <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300">
            <div className="absolute top-8 right-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 pr-16">Hospital Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed h-20">
              Real-time patient monitoring and alert management. View live vital readings 
              from ambulances, classify patient conditions automatically, and manage 
              critical alerts.
            </p>
            
            <Link 
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Access Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Ambulance Simulator Card */}
          <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-green-200 dark:hover:border-green-900 transition-all duration-300">
            <div className="absolute top-8 right-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Ambulance className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 pr-16">Ambulance Simulator</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed h-20">
              Simulate real-time vital data transmission. Test the system by simulating 
              ambulance vital data transmission. Start automatic simulations or manually 
              transmit readings.
            </p>
            
            <Link 
              to="/simulator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Launch Simulator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Database Setup Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Database Setup</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                  Initialize PostgreSQL database with tables and seed data. 
                  Click the button to create all necessary database tables and populate them with test data. 
                  This must be done before launching the simulator.
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleInitDb}
              disabled={dbStatus !== "idle"}
              className={`
                px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all min-w-[180px] justify-center
                ${dbStatus === "success" 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800" 
                  : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20"
                }
                ${dbStatus === "loading" ? "opacity-75 cursor-wait" : ""}
              `}
            >
              {dbStatus === "idle" && "Initialize Database"}
              {dbStatus === "loading" && "Initializing..."}
              {dbStatus === "success" && (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Initialized
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">End-to-End Encryption</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AES-256-GCM encryption protects all patient data during transmission
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Live Monitoring</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time vital signs monitoring with instant hospital dashboard updates
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-4">
              <Siren className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Smart Alerts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatic classification of conditions with targeted alerts for critical cases
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
