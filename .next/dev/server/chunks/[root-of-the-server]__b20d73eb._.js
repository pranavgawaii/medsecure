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
"[project]/app/api/alerts/active/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const alerts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getActiveAlerts"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            alerts: alerts.map((alert)=>({
                    id: alert.id,
                    patientId: alert.patient_id,
                    alertType: alert.alert_type,
                    alertLevel: alert.alert_level,
                    message: alert.message,
                    isAcknowledged: alert.is_acknowledged,
                    createdAt: alert.created_at
                })),
            count: alerts.length
        });
    } catch (error) {
        console.error("Error retrieving alerts:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to retrieve alerts"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b20d73eb._.js.map