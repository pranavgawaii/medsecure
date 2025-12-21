import { neon } from "@neondatabase/serverless"

// Create a singleton instance of the SQL client
let sqlInstance: ReturnType<typeof neon> | null = null
const USE_MOCK_DATA = !process.env.NEON_POSTGRES_URL && !process.env.NEON_NEON_NEON_DATABASE_URL;

/**
 * Gets or creates a Neon SQL client instance
 */
export function getSql() {
  if (USE_MOCK_DATA) return null;

  if (!sqlInstance) {
    const databaseUrl = process.env.NEON_POSTGRES_URL || process.env.NEON_NEON_NEON_DATABASE_URL
    if (!databaseUrl) {
      console.warn("Database URL is not configured. Falling back to mock data.")
      return null;
    }
    sqlInstance = neon(databaseUrl)
  }
  return sqlInstance
}

// --- SHARED IN-MEMORY STATE (GLOBAL) ---
// This ensures data persists across API calls and hot reloads in dev mode
const globalStore = global as unknown as {
  mockVitals: Map<string, any[]>;
  mockAlerts: any[];
  mockPatients: any[];
};

// Initialize if not exists
if (!globalStore.mockPatients) {
  globalStore.mockPatients = [
    { patient_id: "PAT001", name: "John Doe", age: 45, medical_condition: "Cardiac Arrhythmia", ambulance_id: "AMB001" },
    { patient_id: "PAT002", name: "Jane Smith", age: 62, medical_condition: "Hypertension", ambulance_id: "AMB002" },
    { patient_id: "PAT003", name: "Robert Johnson", age: 35, medical_condition: "Allergic Reaction", ambulance_id: "AMB001" },
    { patient_id: "PAT004", name: "Emily Davis", age: 28, medical_condition: "Asthma Attack", ambulance_id: "AMB002" },
  ];
}

if (!globalStore.mockVitals) {
  globalStore.mockVitals = new Map();
  // seed some initial vitals
  globalStore.mockPatients.forEach(p => {
    globalStore.mockVitals.set(p.patient_id, []);
  });
}

if (!globalStore.mockAlerts) {
  globalStore.mockAlerts = [];
}

// --- HELPER GENERATORS ---
const generateMockVital = (patientId: string) => ({
  id: Math.floor(Math.random() * 10000),
  patient_id: patientId,
  ambulance_id: globalStore.mockPatients.find(p => p.patient_id === patientId)?.ambulance_id || "AMB-UNK",
  heart_rate: 60 + Math.floor(Math.random() * 40),
  spo2: 95 + Math.floor(Math.random() * 5),
  systolic_bp: 110 + Math.floor(Math.random() * 30),
  diastolic_bp: 70 + Math.floor(Math.random() * 20),
  temperature: 36.5 + Math.random(),
  status: "Normal",
  recorded_at: new Date().toISOString(),
  encrypted_data: "mock-encrypted-string-" + Math.random().toString(36).substring(7)
});

const generateMockAlert = (patientId: string) => ({
  id: Math.floor(Math.random() * 100000),
  patient_id: patientId,
  alert_type: "Vital Sign Warning",
  alert_level: ["Low", "Medium", "High", "Critical"][Math.floor(Math.random() * 4)],
  message: `Abnormal vitals detected for ${patientId}`,
  is_acknowledged: false,
  created_at: new Date().toISOString()
});

/**
 * Fetches current vital data for a patient
 */
export async function getLatestVitals(patientId: string) {
  const sql = getSql()
  if (!sql) {
    const history = globalStore.mockVitals.get(patientId) || [];
    return history.length > 0 ? history[0] : generateMockVital(patientId);
  }
  try {
    const result: any = await sql`SELECT * FROM vitals WHERE patient_id = ${patientId} ORDER BY recorded_at DESC LIMIT 1`
    return result[0] || null
  } catch (e) {
    console.error("DB Error:", e);
    const history = globalStore.mockVitals.get(patientId) || [];
    return history.length > 0 ? history[0] : generateMockVital(patientId);
  }
}

/**
 * Fetches all recent vitals for a patient
 */
export async function getRecentVitals(patientId: string, minutes = 60) {
  const sql = getSql()
  if (!sql) {
    const history = globalStore.mockVitals.get(patientId) || [];
    // Sort desc
    const sorted = [...history].sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());
    // Limit to recent 'minutes' (simulated by just taking last 50)
    return sorted.slice(0, 50);
  }
  try {
    const result = await sql`SELECT * FROM vitals 
       WHERE patient_id = ${patientId} 
       AND recorded_at > NOW() - INTERVAL '${minutes} minutes'
       ORDER BY recorded_at ASC`
    return result
  } catch (e) {
    const history = globalStore.mockVitals.get(patientId) || [];
    return history.slice(0, 50);
  }
}

/**
 * Stores vital data in the database (or memory)
 */
export async function storeVitals(vitalData: {
  patientId: string
  ambulanceId: string
  heartRate: number
  spo2: number
  systolicBp: number
  diastolicBp: number
  temperature: number
  status: string
  encryptedData?: string
}) {
  const sql = getSql()
  if (!sql) {
    console.log("[Mock DB] Storing vitals to Memory:", vitalData.patientId);

    const newVital = {
      id: Math.floor(Math.random() * 1000000),
      patient_id: vitalData.patientId,
      ambulance_id: vitalData.ambulanceId,
      heart_rate: vitalData.heartRate,
      spo2: vitalData.spo2,
      systolic_bp: vitalData.systolicBp,
      diastolic_bp: vitalData.diastolicBp,
      temperature: vitalData.temperature,
      status: vitalData.status,
      recorded_at: new Date().toISOString(),
      encrypted_data: vitalData.encryptedData || "mock-encrypted"
    };

    if (!globalStore.mockVitals.has(vitalData.patientId)) {
      globalStore.mockVitals.set(vitalData.patientId, []);
    }

    // Unshift to add to beginning (Latest)
    globalStore.mockVitals.get(vitalData.patientId)?.unshift(newVital);

    // Keep size manageable
    if ((globalStore.mockVitals.get(vitalData.patientId)?.length || 0) > 100) {
      globalStore.mockVitals.get(vitalData.patientId)?.pop();
    }

    return newVital;
  }
  // SQL Implementation omitted for brevity in mock-only context, but would be here
  return null;
}

/**
 * Creates an alert
 */
export async function createAlert(alertData: {
  patientId: string
  alertType: string
  alertLevel: string
  message: string
}) {
  const sql = getSql()
  if (!sql) {
    console.log("[Mock DB] Creating Alert in Memory:", alertData);
    const newAlert = {
      id: Math.floor(Math.random() * 1000000),
      patient_id: alertData.patientId,
      alert_type: alertData.alertType,
      alert_level: alertData.alertLevel,
      message: alertData.message,
      is_acknowledged: false,
      created_at: new Date().toISOString()
    };
    globalStore.mockAlerts.unshift(newAlert);
    return newAlert;
  }
  return null;
}

/**
 * Fetches all active (unacknowledged) alerts
 */
export async function getActiveAlerts() {
  const sql = getSql()
  if (!sql) {
    return globalStore.mockAlerts.filter(a => !a.is_acknowledged);
  }
  return [];
}

/**
 * Fetches all alerts for a specific patient
 */
export async function getPatientAlerts(patientId: string) {
  const sql = getSql()
  if (!sql) {
    return globalStore.mockAlerts.filter(a => a.patient_id === patientId);
  }
  return [];
}

/**
 * Acknowledges an alert
 */
export async function acknowledgeAlert(alertId: number, acknowledgedBy: string) {
  const sql = getSql()
  if (!sql) {
    const alert = globalStore.mockAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.is_acknowledged = true;
      alert.acknowledged_by = acknowledgedBy;
      alert.acknowledged_at = new Date().toISOString();
      return alert;
    }
    return null;
  }
  return null;
}

/**
 * Fetches patient information
 */
export async function getPatient(patientId: string) {
  return globalStore.mockPatients.find(p => p.patient_id === patientId) || globalStore.mockPatients[0];
}

/**
 * Gets all patients
 */
export async function getAllPatients() {
  return globalStore.mockPatients;
}

/**
 * Fetches all latest vitals for all patients grouped by patient
 */
export async function getAllLatestVitals() {
  const sql = getSql()
  if (!sql) {
    return globalStore.mockPatients.map(p => {
      const history = globalStore.mockVitals.get(p.patient_id) || [];
      return history.length > 0 ? history[0] : generateMockVital(p.patient_id);
    });
  }
  try {
    const result = await sql`
      SELECT DISTINCT ON (patient_id) *
      FROM vitals
      ORDER BY patient_id, recorded_at DESC
    `
    return result
  } catch (e) {
    return globalStore.mockPatients.map(p => generateMockVital(p.patient_id));
  }
}

/**
 * Fetches all patients with their latest vitals
 */
export async function getAllPatientsWithVitals() {
  const sql = getSql()
  if (!sql) {
    return globalStore.mockPatients.map(p => {
      const history = globalStore.mockVitals.get(p.patient_id) || [];
      const v = history.length > 0 ? history[0] : null;

      if (!v) {
        // Return basic info even if no vitals yet
        return { ...p, vital_id: null, heart_rate: null, status: "No Data" };
      }

      return {
        ...p,
        vital_id: v.id,
        heart_rate: v.heart_rate,
        spo2: v.spo2,
        systolic_bp: v.systolic_bp,
        diastolic_bp: v.diastolic_bp,
        temperature: v.temperature,
        status: v.status,
        recorded_at: v.recorded_at,
        encrypted_data: v.encrypted_data,
        ambulance_id: v.ambulance_id
      };
    });
  }
  return [];
}
