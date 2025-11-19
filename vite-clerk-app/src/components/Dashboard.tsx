import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Activity, 
  AlertTriangle, 
  Ambulance, 
  Clock, 
  Heart, 
  MapPin, 
  Thermometer, 
  User, 
  Wind 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({
    incomingAmbulances: 0,
    criticalPatients: 0,
    availableBeds: 12,
    avgArrivalTime: '5m'
  });
  
  const [liveVitals, setLiveVitals] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Live Vitals
  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const res = await fetch('/api/vitals/live');
        const data = await res.json();
        setLiveVitals(data);
        
        // If no patient selected, select the first one
        if (!selectedPatientId && data.length > 0) {
          setSelectedPatientId(data[0].patient_id);
        }

        // Update Chart Data for the selected patient
        if (selectedPatientId) {
          const patientData = data.find((d: any) => d.patient_id === selectedPatientId);
          if (patientData) {
            setChartData(prev => {
              const newDataPoint = {
                time: new Date(patientData.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                hr: patientData.heart_rate,
                spo2: patientData.spo2
              };
              // Keep last 20 points
              const newChartData = [...prev, newDataPoint].slice(-20);
              return newChartData;
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch live vitals:", error);
      }
    };

    fetchVitals();
    const interval = setInterval(fetchVitals, 2000);
    return () => clearInterval(interval);
  }, [selectedPatientId]);

  const currentPatient = liveVitals.find(v => v.patient_id === selectedPatientId) || liveVitals[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/home" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Hospital Command Center
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              {stats.criticalPatients} Critical Alerts
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Ambulance className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold">{stats.incomingAmbulances}</span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Incoming Ambulances</h3>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold">{stats.criticalPatients}</span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Critical Patients</h3>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold">{stats.availableBeds}</span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Available ER Beds</h3>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold">{stats.avgArrivalTime}</span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Avg. Arrival Time</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Incoming List */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold mb-4">Incoming Transmissions</h2>
            <div className="space-y-4">
              {liveVitals.length === 0 ? (
                <div className="text-center p-8 text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                  No active transmissions
                </div>
              ) : (
                liveVitals.map((v) => (
                  <div 
                    key={v.patient_id}
                    onClick={() => {
                      setSelectedPatientId(v.patient_id);
                      setChartData([]); // Reset chart on switch
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPatientId === v.patient_id
                        ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 ring-1 ring-blue-500' 
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-lg">{v.ambulance_id || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{v.patient_name}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        v.heart_rate > 100 || v.spo2 < 90 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {v.heart_rate > 100 || v.spo2 < 90 ? 'Critical' : 'Stable'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {new Date(v.recorded_at).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" /> {v.medical_conditions?.split(',')[0] || 'General'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Center/Right Column: Patient Detail */}
          <div className="lg:col-span-2 space-y-6">
            {currentPatient ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      Live Vitals: {currentPatient.patient_name} ({currentPatient.patient_id})
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {currentPatient.ambulance_id} • {currentPatient.medical_conditions}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                      View Full History
                    </button>
                  </div>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-900/50">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Heart className="w-4 h-4 text-red-500" /> Heart Rate
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentPatient.heart_rate} <span className="text-sm font-normal text-gray-500">bpm</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Wind className="w-4 h-4 text-blue-500" /> SpO2
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentPatient.spo2} <span className="text-sm font-normal text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Activity className="w-4 h-4 text-orange-500" /> BP
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentPatient.systolic_bp}/{currentPatient.diastolic_bp}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Thermometer className="w-4 h-4 text-yellow-500" /> Temp
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentPatient.temperature} <span className="text-sm font-normal text-gray-500">°C</span>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="p-6 h-80">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Real-time Heart Rate Trend</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                      <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} domain={[60, 140]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="hr" 
                        stroke="#EF4444" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#EF4444' }}
                        activeDot={{ r: 6 }}
                        animationDuration={500}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-gray-500">
                Select an active transmission to view details
              </div>
            )}

            {/* AI Analysis */}
            {currentPatient && (
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  AI Predictive Analysis
                </h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  {currentPatient.heart_rate > 100 
                    ? "Patient showing signs of Tachycardia. Heart rate trend indicates increasing stress. Recommended preparation: Cardiac Team and Defibrillator on standby."
                    : "Patient vitals are currently stable. Continue monitoring for any sudden changes in SpO2 or Blood Pressure."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
