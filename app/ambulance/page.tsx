"use client"

import { useState, useEffect } from "react"
import { MainHeader } from "@/components/main-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Radio, Play, Square, Zap, Ambulance, AlertCircle } from "lucide-react"
import { VitalsForm } from "@/components/simulator/vitals-form"
import { SimulationStatus } from "@/components/simulator/simulation-status"
import { DatabaseStatus } from "@/components/simulator/database-status"
import { EncryptionDemo } from "@/components/simulator/encryption-demo"

export default function AmbulancePage() {
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
        }, 5000) // Transmit (simulated) every 5 seconds for faster feedback

        return () => clearInterval(interval)
    }, [isRunning, selectedPatient, selectedAmbulance])

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <MainHeader />

            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-600 rounded-xl shadow-lg shadow-red-500/20">
                            <Ambulance className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Ambulance Console</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Vehicle ID: {selectedAmbulance} | Status: <span className="text-green-600 font-medium">Online</span></p>
                        </div>
                    </div>
                </div>

                <DatabaseStatus />

                {/* Simulation Controls */}
                <Card className="border-0 shadow-lg bg-white dark:bg-slate-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-600" />
                            Vital Transmission Control
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Patient & Ambulance Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-900 dark:text-white block">Patient Onboard</label>
                                <select
                                    value={selectedPatient}
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                    disabled={isRunning}
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="PAT001">👨 John Doe (Critical)</option>
                                    <option value="PAT002">👩 Jane Smith (Stable)</option>
                                    <option value="PAT003">👨 Michael Johnson (Trauma)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                {/* Visual only since we are in "Ambulance Console" */}
                                <label className="text-sm font-medium text-slate-900 dark:text-white block">Destination</label>
                                <div className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed">
                                    General Hospital (ETA: 12 min)
                                </div>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                onClick={() => setIsRunning(!isRunning)}
                                className={`flex-1 h-14 text-lg font-bold shadow-lg transition-all hover:scale-[1.02] ${isRunning
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                            >
                                {isRunning ? (
                                    <>
                                        <Square className="w-6 h-6 mr-2" />
                                        STOP TRANSMISSION
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-6 h-6 mr-2" />
                                        START VITALS STREAM
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Status Indicator */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${isRunning
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                            }`}>
                            <div className="flex items-center gap-3">
                                <Radio className={`w-5 h-5 ${isRunning ? 'text-green-600 animate-pulse' : 'text-slate-400'}`} />
                                <div>
                                    <p className={`font-semibold ${isRunning ? 'text-green-700 dark:text-green-400' : 'text-slate-500'}`}>
                                        {isRunning ? 'Broadcasting to Hospital' : 'Transmission Standby'}
                                    </p>
                                    {isRunning && <p className="text-xs text-green-600/80">Latency: 45ms | Packet Loss: 0%</p>}
                                </div>
                            </div>
                            {isRunning && (
                                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold uppercase rounded tracking-wide">
                                    Live
                                </div>
                            )}
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

                <EncryptionDemo />
            </div>
        </main>
    )
}
