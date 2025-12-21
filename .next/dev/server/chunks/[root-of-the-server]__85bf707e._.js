module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/encryption.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decryptVitalData",
    ()=>decryptVitalData,
    "encryptVitalData",
    ()=>encryptVitalData,
    "isValidEncryptedFormat",
    ()=>isValidEncryptedFormat
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
// Generate a key from environment variable or create a default one
const getEncryptionKey = ()=>{
    const keyEnv = process.env.ENCRYPTION_KEY;
    if (!keyEnv) {
        throw new Error("ENCRYPTION_KEY environment variable is not set");
    }
    // Ensure the key is exactly 32 bytes (256 bits) for AES-256
    const key = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].scryptSync(keyEnv, "salt", 32);
    return key;
};
function encryptVitalData(data) {
    try {
        const key = getEncryptionKey();
        const plaintext = JSON.stringify(data);
        // Generate a random IV (Initialization Vector)
        const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(16);
        // Create cipher
        const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv("aes-256-gcm", key, iv);
        // Encrypt the data
        let encryptedData = cipher.update(plaintext, "utf8", "hex");
        encryptedData += cipher.final("hex");
        // Get authentication tag
        const authTag = cipher.getAuthTag();
        // Return combined format: iv:encryptedData:authTag (all in base64 for safe transmission)
        const result = `${iv.toString("base64")}:${encryptedData}:${authTag.toString("base64")}`;
        return result;
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Failed to encrypt vital data");
    }
}
function decryptVitalData(encryptedString) {
    try {
        const key = getEncryptionKey();
        const parts = encryptedString.split(":");
        if (parts.length !== 3) {
            throw new Error("Invalid encrypted data format");
        }
        const iv = Buffer.from(parts[0], "base64");
        const encryptedData = parts[1];
        const authTag = Buffer.from(parts[2], "base64");
        // Create decipher
        const decipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(authTag);
        // Decrypt the data
        let decrypted = decipher.update(encryptedData, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return JSON.parse(decrypted);
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt vital data");
    }
}
function isValidEncryptedFormat(encryptedString) {
    try {
        const parts = encryptedString.split(":");
        if (parts.length !== 3) return false;
        // Try to decode base64 parts
        Buffer.from(parts[0], "base64");
        Buffer.from(parts[2], "base64");
        return true;
    } catch  {
        return false;
    }
}
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acknowledgeAlert",
    ()=>acknowledgeAlert,
    "createAlert",
    ()=>createAlert,
    "getActiveAlerts",
    ()=>getActiveAlerts,
    "getAllPatients",
    ()=>getAllPatients,
    "getAllPatientsWithVitals",
    ()=>getAllPatientsWithVitals,
    "getLatestVitals",
    ()=>getLatestVitals,
    "getPatient",
    ()=>getPatient,
    "getPatientAlerts",
    ()=>getPatientAlerts,
    "getRecentVitals",
    ()=>getRecentVitals,
    "getSql",
    ()=>getSql,
    "storeVitals",
    ()=>storeVitals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
// Create a singleton instance of the SQL client
let sqlInstance = null;
const USE_MOCK_DATA = !process.env.NEON_POSTGRES_URL && !process.env.NEON_NEON_NEON_DATABASE_URL;
function getSql() {
    if (USE_MOCK_DATA) return null;
    if (!sqlInstance) {
        const databaseUrl = process.env.NEON_POSTGRES_URL || process.env.NEON_NEON_NEON_DATABASE_URL;
        if (!databaseUrl) {
            console.warn("Database URL is not configured. Falling back to mock data.");
            return null;
        }
        sqlInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(databaseUrl);
    }
    return sqlInstance;
}
// --- SHARED IN-MEMORY STATE (GLOBAL) ---
// This ensures data persists across API calls and hot reloads in dev mode
const globalStore = /*TURBOPACK member replacement*/ __turbopack_context__.g;
// Initialize if not exists
if (!globalStore.mockPatients) {
    globalStore.mockPatients = [
        {
            patient_id: "PAT001",
            name: "John Doe",
            age: 45,
            medical_condition: "Cardiac Arrhythmia",
            ambulance_id: "AMB001"
        },
        {
            patient_id: "PAT002",
            name: "Jane Smith",
            age: 62,
            medical_condition: "Hypertension",
            ambulance_id: "AMB002"
        },
        {
            patient_id: "PAT003",
            name: "Robert Johnson",
            age: 35,
            medical_condition: "Allergic Reaction",
            ambulance_id: "AMB001"
        },
        {
            patient_id: "PAT004",
            name: "Emily Davis",
            age: 28,
            medical_condition: "Asthma Attack",
            ambulance_id: "AMB002"
        }
    ];
}
if (!globalStore.mockVitals) {
    globalStore.mockVitals = new Map();
    // seed some initial vitals
    globalStore.mockPatients.forEach((p)=>{
        globalStore.mockVitals.set(p.patient_id, []);
    });
}
if (!globalStore.mockAlerts) {
    globalStore.mockAlerts = [];
}
// --- HELPER GENERATORS ---
const generateMockVital = (patientId)=>({
        id: Math.floor(Math.random() * 10000),
        patient_id: patientId,
        ambulance_id: globalStore.mockPatients.find((p)=>p.patient_id === patientId)?.ambulance_id || "AMB-UNK",
        heart_rate: 60 + Math.floor(Math.random() * 40),
        spo2: 95 + Math.floor(Math.random() * 5),
        systolic_bp: 110 + Math.floor(Math.random() * 30),
        diastolic_bp: 70 + Math.floor(Math.random() * 20),
        temperature: 36.5 + Math.random(),
        status: "Normal",
        recorded_at: new Date().toISOString(),
        encrypted_data: "mock-encrypted-string-" + Math.random().toString(36).substring(7)
    });
const generateMockAlert = (patientId)=>({
        id: Math.floor(Math.random() * 100000),
        patient_id: patientId,
        alert_type: "Vital Sign Warning",
        alert_level: [
            "Low",
            "Medium",
            "High",
            "Critical"
        ][Math.floor(Math.random() * 4)],
        message: `Abnormal vitals detected for ${patientId}`,
        is_acknowledged: false,
        created_at: new Date().toISOString()
    });
async function getLatestVitals(patientId) {
    const sql = getSql();
    if (!sql) {
        const history = globalStore.mockVitals.get(patientId) || [];
        return history.length > 0 ? history[0] : generateMockVital(patientId);
    }
    try {
        const result = await sql`SELECT * FROM vitals WHERE patient_id = ${patientId} ORDER BY recorded_at DESC LIMIT 1`;
        return result[0] || null;
    } catch (e) {
        console.error("DB Error:", e);
        const history = globalStore.mockVitals.get(patientId) || [];
        return history.length > 0 ? history[0] : generateMockVital(patientId);
    }
}
async function getRecentVitals(patientId, minutes = 60) {
    const sql = getSql();
    if (!sql) {
        const history = globalStore.mockVitals.get(patientId) || [];
        // Sort desc
        const sorted = [
            ...history
        ].sort((a, b)=>new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());
        // Limit to recent 'minutes' (simulated by just taking last 50)
        return sorted.slice(0, 50);
    }
    try {
        const result = await sql`SELECT * FROM vitals 
       WHERE patient_id = ${patientId} 
       AND recorded_at > NOW() - INTERVAL '${minutes} minutes'
       ORDER BY recorded_at ASC`;
        return result;
    } catch (e) {
        const history = globalStore.mockVitals.get(patientId) || [];
        return history.slice(0, 50);
    }
}
async function storeVitals(vitalData) {
    const sql = getSql();
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
async function createAlert(alertData) {
    const sql = getSql();
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
async function getActiveAlerts() {
    const sql = getSql();
    if (!sql) {
        return globalStore.mockAlerts.filter((a)=>!a.is_acknowledged);
    }
    return [];
}
async function getPatientAlerts(patientId) {
    const sql = getSql();
    if (!sql) {
        return globalStore.mockAlerts.filter((a)=>a.patient_id === patientId);
    }
    return [];
}
async function acknowledgeAlert(alertId, acknowledgedBy) {
    const sql = getSql();
    if (!sql) {
        const alert = globalStore.mockAlerts.find((a)=>a.id === alertId);
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
async function getPatient(patientId) {
    return globalStore.mockPatients.find((p)=>p.patient_id === patientId) || globalStore.mockPatients[0];
}
async function getAllPatients() {
    return globalStore.mockPatients;
}
async function getAllPatientsWithVitals() {
    const sql = getSql();
    if (!sql) {
        return globalStore.mockPatients.map((p)=>{
            const history = globalStore.mockVitals.get(p.patient_id) || [];
            const v = history.length > 0 ? history[0] : null;
            if (!v) {
                // Return basic info even if no vitals yet
                return {
                    ...p,
                    vital_id: null,
                    heart_rate: null,
                    status: "No Data"
                };
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
}),
"[project]/lib/classification.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Classification thresholds for patient conditions
 */ __turbopack_context__.s([
    "classifyPatientCondition",
    ()=>classifyPatientCondition,
    "generateAlertMessage",
    ()=>generateAlertMessage,
    "shouldTriggerAlert",
    ()=>shouldTriggerAlert
]);
const THRESHOLDS = {
    CRITICAL: {
        heartRate: {
            min: 40,
            max: 140
        },
        spo2: {
            min: 85
        },
        systolicBp: {
            min: 60,
            max: 200
        },
        diastolicBp: {
            min: 40,
            max: 120
        },
        temperature: {
            min: 32,
            max: 40
        }
    },
    MODERATE: {
        heartRate: {
            min: 50,
            max: 120
        },
        spo2: {
            min: 90
        },
        systolicBp: {
            min: 90,
            max: 180
        },
        diastolicBp: {
            min: 60,
            max: 110
        },
        temperature: {
            min: 36,
            max: 38.5
        }
    },
    STABLE: {
        heartRate: {
            min: 60,
            max: 100
        },
        spo2: {
            min: 95
        },
        systolicBp: {
            min: 100,
            max: 140
        },
        diastolicBp: {
            min: 70,
            max: 100
        },
        temperature: {
            min: 36.5,
            max: 37.5
        }
    }
};
function classifyPatientCondition(vitals) {
    const riskFactors = [];
    let criticalCount = 0;
    let moderateCount = 0;
    // Check heart rate
    if (vitals.heartRate < THRESHOLDS.CRITICAL.heartRate.min || vitals.heartRate > THRESHOLDS.CRITICAL.heartRate.max) {
        riskFactors.push(`Heart rate ${vitals.heartRate} bpm (critical)`);
        criticalCount++;
    } else if (vitals.heartRate < THRESHOLDS.MODERATE.heartRate.min || vitals.heartRate > THRESHOLDS.MODERATE.heartRate.max) {
        riskFactors.push(`Heart rate ${vitals.heartRate} bpm (moderate)`);
        moderateCount++;
    }
    // Check SpO2
    if (vitals.spo2 < THRESHOLDS.CRITICAL.spo2.min) {
        riskFactors.push(`SpO2 ${vitals.spo2}% (critical)`);
        criticalCount++;
    } else if (vitals.spo2 < THRESHOLDS.MODERATE.spo2.min) {
        riskFactors.push(`SpO2 ${vitals.spo2}% (moderate)`);
        moderateCount++;
    }
    // Check systolic BP
    if (vitals.systolicBp < THRESHOLDS.CRITICAL.systolicBp.min || vitals.systolicBp > THRESHOLDS.CRITICAL.systolicBp.max) {
        riskFactors.push(`Systolic BP ${vitals.systolicBp} mmHg (critical)`);
        criticalCount++;
    } else if (vitals.systolicBp < THRESHOLDS.MODERATE.systolicBp.min || vitals.systolicBp > THRESHOLDS.MODERATE.systolicBp.max) {
        riskFactors.push(`Systolic BP ${vitals.systolicBp} mmHg (moderate)`);
        moderateCount++;
    }
    // Check diastolic BP
    if (vitals.diastolicBp < THRESHOLDS.CRITICAL.diastolicBp.min || vitals.diastolicBp > THRESHOLDS.CRITICAL.diastolicBp.max) {
        riskFactors.push(`Diastolic BP ${vitals.diastolicBp} mmHg (critical)`);
        criticalCount++;
    } else if (vitals.diastolicBp < THRESHOLDS.MODERATE.diastolicBp.min || vitals.diastolicBp > THRESHOLDS.MODERATE.diastolicBp.max) {
        riskFactors.push(`Diastolic BP ${vitals.diastolicBp} mmHg (moderate)`);
        moderateCount++;
    }
    // Check temperature
    if (vitals.temperature < THRESHOLDS.CRITICAL.temperature.min || vitals.temperature > THRESHOLDS.CRITICAL.temperature.max) {
        riskFactors.push(`Temperature ${vitals.temperature}°C (critical)`);
        criticalCount++;
    } else if (vitals.temperature < THRESHOLDS.MODERATE.temperature.min || vitals.temperature > THRESHOLDS.MODERATE.temperature.max) {
        riskFactors.push(`Temperature ${vitals.temperature}°C (moderate)`);
        moderateCount++;
    }
    // Determine overall status
    let status = "Stable";
    let score = 0;
    if (criticalCount >= 1) {
        status = "Critical";
        score = 90 + Math.min(criticalCount * 3, 10);
    } else if (moderateCount >= 2) {
        status = "Critical";
        score = 80;
    } else if (moderateCount >= 1) {
        status = "Moderate";
        score = 60 + moderateCount * 10;
    } else {
        status = "Stable";
        score = 30;
    }
    return {
        status,
        riskFactors,
        score: Math.min(score, 100)
    };
}
function shouldTriggerAlert(classification) {
    return classification.status === "Critical";
}
function generateAlertMessage(riskFactors) {
    if (riskFactors.length === 0) return "";
    return `Critical condition detected: ${riskFactors.join(", ")}`;
}
}),
"[project]/lib/vital-validator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Validates vital readings against medical standards
 * Returns validation result with errors if any vital is out of range
 */ __turbopack_context__.s([
    "isEmergencyVital",
    ()=>isEmergencyVital,
    "validateVitals",
    ()=>validateVitals
]);
function validateVitals(vitals) {
    const errors = [];
    // Heart Rate: Normal range 40-180 bpm (includes athletes and critical patients)
    if (vitals.heartRate < 40 || vitals.heartRate > 180) {
        errors.push(`Heart rate ${vitals.heartRate} bpm is out of valid range (40-180)`);
    }
    // SpO2: Must be 60-100% (medical devices don't read below 60%)
    if (vitals.spo2 < 60 || vitals.spo2 > 100) {
        errors.push(`SpO2 ${vitals.spo2}% is out of valid range (60-100)`);
    }
    // Systolic BP: Normal range 40-250 mmHg
    if (vitals.systolicBp < 40 || vitals.systolicBp > 250) {
        errors.push(`Systolic BP ${vitals.systolicBp} mmHg is out of valid range (40-250)`);
    }
    // Diastolic BP: Normal range 20-150 mmHg
    if (vitals.diastolicBp < 20 || vitals.diastolicBp > 150) {
        errors.push(`Diastolic BP ${vitals.diastolicBp} mmHg is out of valid range (20-150)`);
    }
    // Systolic must always be >= Diastolic
    if (vitals.systolicBp < vitals.diastolicBp) {
        errors.push(`Systolic BP (${vitals.systolicBp}) cannot be less than Diastolic BP (${vitals.diastolicBp})`);
    }
    // Temperature: Valid range 32-42°C (includes hypothermia and hyperthermia)
    if (vitals.temperature < 32 || vitals.temperature > 42) {
        errors.push(`Temperature ${vitals.temperature}°C is out of valid range (32-42)`);
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function isEmergencyVital(vitals) {
    // Emergency conditions
    if (vitals.heartRate < 50 || vitals.heartRate > 140) return true;
    if (vitals.spo2 < 85) return true;
    if (vitals.systolicBp < 90 || vitals.systolicBp > 180) return true;
    if (vitals.temperature > 39 || vitals.temperature < 35) return true;
    return false;
}
}),
"[project]/app/api/vitals/transmit/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/encryption.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/classification.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vital$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/vital-validator.ts [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { patientId, ambulanceId, heartRate, spo2, systolicBp, diastolicBp, temperature } = body;
        // Validate required fields exist
        if (!patientId || !ambulanceId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields: patientId and ambulanceId"
            }, {
                status: 400
            });
        }
        if (heartRate === undefined || spo2 === undefined || systolicBp === undefined || diastolicBp === undefined || temperature === undefined) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required vital fields"
            }, {
                status: 400
            });
        }
        // Validate vital values are legitimate medical readings
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$vital$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateVitals"])({
            heartRate,
            spo2,
            systolicBp,
            diastolicBp,
            temperature
        });
        if (!validation.isValid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid vital readings",
                details: validation.errors
            }, {
                status: 400
            });
        }
        // Classify patient condition based on vitals
        const classification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyPatientCondition"])({
            heartRate,
            spo2,
            systolicBp,
            diastolicBp,
            temperature
        });
        // Encrypt the vital data - CRITICAL STEP
        const vitalDataToEncrypt = {
            patientId,
            ambulanceId,
            heartRate,
            spo2,
            systolicBp,
            diastolicBp,
            temperature,
            timestamp: new Date().toISOString()
        };
        const encryptedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptVitalData"])(vitalDataToEncrypt);
        // Store vitals in database with encrypted data
        const storedVital = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeVitals"])({
            patientId,
            ambulanceId,
            heartRate,
            spo2,
            systolicBp,
            diastolicBp,
            temperature,
            status: classification.status,
            encryptedData
        });
        // If critical, create an alert
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shouldTriggerAlert"])(classification)) {
            const alertMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$classification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateAlertMessage"])(classification.riskFactors);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAlert"])({
                patientId,
                alertType: "CRITICAL_VITALS",
                alertLevel: "CRITICAL",
                message: alertMessage
            });
        }
        // Get patient info for response
        const patient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatient"])(patientId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Vitals transmitted and encrypted successfully",
            vitalId: storedVital.id,
            classification,
            encrypted: true,
            patient: patient ? {
                name: patient.name,
                age: patient.age
            } : null
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error processing vital transmission:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to process vital data transmission",
            details: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__85bf707e._.js.map