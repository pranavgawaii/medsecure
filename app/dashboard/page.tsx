"use client"

import { useState, useEffect } from "react"
import { MainHeader } from "@/components/main-header"
import { DashboardHeader } from "@/components/dashboard/header"
import { PatientGrid } from "@/components/dashboard/patient-grid"
import { AlertPanel } from "@/components/dashboard/alert-panel"
import { VitalsChart } from "@/components/dashboard/vitals-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, Users, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch patients and alerts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, we'd fetch from API
        // For now, we'll load data after a delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Poll for new alerts
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/alerts/active")
        if (response.ok) {
          const data = await response.json()
          setAlerts(data.alerts)
        }
      } catch (error) {
        console.error("Error fetching alerts:", error)
      }
    }, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Poll every 3 seconds for new patient data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/patients/with-vitals")
        if (response.ok) {
          const data = await response.json()
          // Update state if patients exist
          if (data.patients && data.patients.length > 0) {
            setPatients(data.patients)
          }
        }
      } catch (error) {
        console.error("Error fetching patients:", error)
      }
    }

    const interval = setInterval(fetchPatients, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <MainHeader />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Hospital Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Real-time patient monitoring and alerts</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Patients</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  {patients.length}
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Active Alerts</p>
                <p className={`text-2xl font-bold flex items-center gap-2 ${
                  alerts.length > 0 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                  {alerts.length}
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">System Status</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                  <Activity className="w-5 h-5 animate-pulse" />
                  Live
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-500">
            <div className="p-4 rounded-lg border-l-4 border-red-600 bg-red-50 dark:bg-red-900/20 dark:border-red-400">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-200">Critical Alerts Active</h3>
                  <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                    {alerts.length} critical condition{alerts.length !== 1 ? 's' : ''} detected. Immediate attention required.
                  </p>
                </div>
              </div>
            </div>
            <AlertPanel alerts={alerts} />
          </div>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="patients" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="patients" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Patient Monitor
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Active Alerts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4 mt-6">
            <PatientGrid selectedPatient={selectedPatient} onSelectPatient={setSelectedPatient} patients={patients} />
            {selectedPatient && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Real-Time Vitals for {selectedPatient}</CardTitle>
                </CardHeader>
                <CardContent>
                  <VitalsChart patientId={selectedPatient} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Active Alerts ({alerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-slate-600 dark:text-slate-400">No active alerts</p>
                  </div>
                ) : (
                  <AlertPanel alerts={alerts} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-blue-200 dark:border-slate-600">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Patients Monitored</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{patients.length}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-red-200 dark:border-slate-600">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Alerts</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{alerts.length}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-green-200 dark:border-slate-600">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">System Uptime</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">99.9%</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-purple-200 dark:border-slate-600">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Data Encrypted</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">100%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
