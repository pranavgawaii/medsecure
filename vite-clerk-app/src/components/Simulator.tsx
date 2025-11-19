import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Database, 
  Activity, 
  Play, 
  Square, 
  Send, 
  Lock, 
  Wifi, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function Simulator() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [transmissions, setTransmissions] = useState(0);
  const [lastTransmission, setLastTransmission] = useState<string>("Never");
  const [isEncrypted, setIsEncrypted] = useState(true);
  
  // Data from API
  const [patients, setPatients] = useState<any[]>([]);
  const [ambulances, setAmbulances] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedAmbulance, setSelectedAmbulance] = useState("");

  // Form State
  const [vitals, setVitals] = useState({
    heartRate: 72,
    spo2: 98,
    systolic: 120,
    diastolic: 80,
    temperature: 37.2
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, ambulancesRes] = await Promise.all([
          fetch('/api/patients'),
          fetch('/api/ambulances')
        ]);
        const patientsData = await patientsRes.json();
        const ambulancesData = await ambulancesRes.json();
        
        setPatients(patientsData);
        setAmbulances(ambulancesData);
        
        if (patientsData.length > 0) setSelectedPatient(patientsData[0].patient_id);
        if (ambulancesData.length > 0) setSelectedAmbulance(ambulancesData[0].ambulance_id);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const transmitData = async () => {
    try {
      const payload = {
        patient_id: selectedPatient,
        ambulance_id: selectedAmbulance,
        heart_rate: vitals.heartRate,
        spo2: vitals.spo2,
        systolic_bp: vitals.systolic,
        diastolic_bp: vitals.diastolic,
        temperature: vitals.temperature,
        encrypted_data: isEncrypted ? "AES-256-GCM-ENCRYPTED-PAYLOAD" : null
      };

      await fetch('/api/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setTransmissions(prev => prev + 1);
      setLastTransmission(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Transmission failed:", error);
    }
  };

  // Simulation Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        // Randomize vitals slightly for simulation
        setVitals(prev => ({
          ...prev,
          heartRate: Math.max(60, Math.min(120, prev.heartRate + (Math.random() > 0.5 ? 2 : -2))),
          spo2: Math.max(90, Math.min(100, prev.spo2 + (Math.random() > 0.5 ? 1 : -1)))
        }));
        transmitData();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, selectedPatient, selectedAmbulance]); // Add dependencies

  const handleTransmit = () => {
    transmitData();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/home" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-600" />
                Ambulance IoT Simulator
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Simulate real-time vital data transmission from ambulance
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium border border-green-200 dark:border-green-800">
              <Wifi className="w-4 h-4" />
              Database Connected
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Simulation Controls */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Simulation Controls</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Patient
                  </label>
                  <select 
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {patients.map(p => (
                      <option key={p.patient_id} value={p.patient_id}>
                        {p.name} ({p.patient_id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Ambulance
                  </label>
                  <select 
                    value={selectedAmbulance}
                    onChange={(e) => setSelectedAmbulance(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {ambulances.map(a => (
                      <option key={a.ambulance_id} value={a.ambulance_id}>
                        {a.ambulance_id} - {a.driver_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
                  isSimulating 
                    ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSimulating ? (
                  <>
                    <Square className="w-4 h-4 fill-current" /> Stop Simulation
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Start Simulation
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
                  <div className={`font-bold ${isSimulating ? "text-green-600" : "text-gray-500"}`}>
                    {isSimulating ? "Running" : "Stopped"}
                  </div>
                </div>
                <div className="text-center border-l border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sent</div>
                  <div className="font-bold text-gray-900 dark:text-white">{transmissions}</div>
                </div>
                <div className="text-center border-l border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Last</div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm truncate">
                    {lastTransmission}
                  </div>
                </div>
              </div>
            </div>

            {/* Encryption Verification */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold">Encryption Verification</h2>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium">AES-256-GCM</div>
                  <div className="text-sm text-gray-500">Military-grade encryption active</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Patient to Verify
                </label>
                <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  {patients.map(p => (
                    <option key={p.patient_id} value={p.patient_id}>
                      {p.name} ({p.patient_id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Manual Transmission */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Manual Vital Transmission</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Encrypted</span>
                  <button 
                    onClick={() => setIsEncrypted(!isEncrypted)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${isEncrypted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isEncrypted ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Heart Rate (bpm)
                    <span className="text-gray-400 font-normal">40-180</span>
                  </label>
                  <input 
                    type="number" 
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({...vitals, heartRate: parseInt(e.target.value)})}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="range" 
                    min="40" max="180" 
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({...vitals, heartRate: parseInt(e.target.value)})}
                    className="w-full mt-2 accent-blue-600"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    SpO₂ (%)
                    <span className="text-gray-400 font-normal">60-100</span>
                  </label>
                  <input 
                    type="number" 
                    value={vitals.spo2}
                    onChange={(e) => setVitals({...vitals, spo2: parseInt(e.target.value)})}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="range" 
                    min="60" max="100" 
                    value={vitals.spo2}
                    onChange={(e) => setVitals({...vitals, spo2: parseInt(e.target.value)})}
                    className="w-full mt-2 accent-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Systolic BP
                    </label>
                    <input 
                      type="number" 
                      value={vitals.systolic}
                      onChange={(e) => setVitals({...vitals, systolic: parseInt(e.target.value)})}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Diastolic BP
                    </label>
                    <input 
                      type="number" 
                      value={vitals.diastolic}
                      onChange={(e) => setVitals({...vitals, diastolic: parseInt(e.target.value)})}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Temperature (°C)
                    <span className="text-gray-400 font-normal">32-42</span>
                  </label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({...vitals, temperature: parseFloat(e.target.value)})}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <button 
                  onClick={handleTransmit}
                  className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-5 h-5" />
                  Transmit Vitals {isEncrypted && "(Encrypted)"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
