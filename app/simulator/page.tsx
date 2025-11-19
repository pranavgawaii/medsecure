"use client"

import { useState, useEffect } from "react"
import { MainHeader } from "@/components/main-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Radio, Play, Square, Zap, CheckCircle, AlertCircle } from "lucide-react"
import { VitalsForm } from "@/components/simulator/vitals-form"
import { SimulationStatus } from "@/components/simulator/simulation-status"
import { DatabaseStatus } from "@/components/simulator/database-status"
import { EncryptionDemo } from "@/components/simulator/encryption-demo"

export default function SimulatorPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [transmissionCount, setTransmissionCount] = useState(0)
  const [lastTransmissionTime, setLastTransmissionTime] = useState<string | null>(null)
  const [selectedPatient, setSelectedPatient] = useState("PAT001")
  const [selectedAmbulance, setSelectedAmbulance] = useState("AMB001")

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(async () => {
      try {
        // Generate realistic vital data variations
        const baseHeartRate = 70 + (Math.random() - 0.5) * 20
        const baseSpo2 = 95 + (Math.random() - 0.5) * 10
        const baseSystolicBp = 120 + (Math.random() - 0.5) * 30
        const baseDiastolicBp = 80 + (Math.random() - 0.5) * 20
        const baseTemperature = 37 + (Math.random() - 0.5) * 3

        const vitalsData = {
          patientId: selectedPatient,
          ambulanceId: selectedAmbulance,
          heartRate: Math.max(40, Math.min(150, baseHeartRate)),
          spo2: Math.max(80, Math.min(100, baseSpo2)),
          systolicBp: Math.max(60, Math.min(200, baseSystolicBp)),
          diastolicBp: Math.max(40, Math.min(120, baseDiastolicBp)),
          temperature: Math.max(35, Math.min(40, baseTemperature)),
        }

        const response = await fetch("/api/vitals/transmit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vitalsData),
        })

        if (response.ok) {
          const data = await response.json()
          setTransmissionCount((prev) => prev + 1)
          setLastTransmissionTime(new Date().toLocaleTimeString())
          console.log("[v0] Vital transmission successful:", data)
        } else {
          const error = await response.json()
          console.error("[v0] Transmission failed:", error)
        }
      } catch (error) {
        console.error("[v0] Error transmitting vitals:", error)
      }
    }, 10000) // Transmit every 10 seconds

    return () => clearInterval(interval)
  }, [isRunning, selectedPatient, selectedAmbulance])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <MainHeader />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Ambulance IoT Simulator</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Simulate and test real-time vital data transmission</p>
            </div>
          </div>
        </div>

        <DatabaseStatus />

        {/* Simulation Controls */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Simulation Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient & Ambulance Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white block">Select Patient</label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="PAT001">👨 John Doe (PAT001)</option>
                  <option value="PAT002">👩 Jane Smith (PAT002)</option>
                  <option value="PAT003">👨 Michael Johnson (PAT003)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-white block">Select Ambulance</label>
                <select
                  value={selectedAmbulance}
                  onChange={(e) => setSelectedAmbulance(e.target.value)}
                  disabled={isRunning}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="AMB001">🚑 Ambulance AMB001</option>
                  <option value="AMB002">🚑 Ambulance AMB002</option>
                </select>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 h-12 text-base font-semibold ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-5 h-5 mr-2" />
                    Stop Simulation
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Simulation
                  </>
                )}
              </Button>
            </div>

            {/* Status Indicator */}
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              isRunning
                ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
            }`}>
              <Activity className={`w-4 h-4 ${isRunning ? 'text-green-600 dark:text-green-400 animate-pulse' : 'text-slate-400'}`} />
              <span className={`text-sm font-medium ${isRunning ? 'text-green-700 dark:text-green-300' : 'text-slate-600 dark:text-slate-400'}`}>
                {isRunning ? 'Simulation Running' : 'Simulation Stopped'}
              </span>
            </div>

            <SimulationStatus
              isRunning={isRunning}
              transmissionCount={transmissionCount}
              lastTransmissionTime={lastTransmissionTime}
            />
          </CardContent>
        </Card>

        {/* Manual Vital Input */}
        <VitalsForm
          patientId={selectedPatient}
          ambulanceId={selectedAmbulance}
          onTransmitSuccess={() => {
            setTransmissionCount((prev) => prev + 1)
            setLastTransmissionTime(new Date().toLocaleTimeString())
          }}
        />

        {/* Encryption Verification Demo */}
        <EncryptionDemo />
      </div>
    </main>
  )
}
