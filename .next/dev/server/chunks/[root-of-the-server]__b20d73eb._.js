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
    "getAllLatestVitals",
    ()=>getAllLatestVitals,
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
// --- MOCK DATA GENERATORS ---
const MOCK_PATIENTS = [
    {
        patient_id: "PAT001",
        name: "John Doe",
        age: 45,
        medical_condition: "Cardiac Arrhythmia"
    },
    {
        patient_id: "PAT002",
        name: "Jane Smith",
        age: 62,
        medical_condition: "Hypertension"
    },
    {
        patient_id: "PAT003",
        name: "Robert Johnson",
        age: 35,
        medical_condition: "Allergic Reaction"
    },
    {
        patient_id: "PAT004",
        name: "Emily Davis",
        age: 28,
        medical_condition: "Asthma Attack"
    }
];
const generateMockVital = (patientId)=>({
        id: Math.floor(Math.random() * 10000),
        patient_id: patientId,
        ambulance_id: "AMB-" + Math.floor(Math.random() * 100),
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
        id: Math.floor(Math.random() * 1000),
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
        return generateMockVital(patientId);
    }
    try {
        const result = await sql`SELECT * FROM vitals WHERE patient_id = ${patientId} ORDER BY recorded_at DESC LIMIT 1`;
        return result[0] || null;
    } catch (e) {
        console.error("DB Error:", e);
        return generateMockVital(patientId);
    }
}
async function getRecentVitals(patientId, minutes = 60) {
    const sql = getSql();
    if (!sql) {
        return Array.from({
            length: 10
        }, (_, i)=>{
            const v = generateMockVital(patientId);
            v.recorded_at = new Date(Date.now() - i * 60000).toISOString();
            return v;
        });
    }
    try {
        const result = await sql`SELECT * FROM vitals 
       WHERE patient_id = ${patientId} 
       AND recorded_at > NOW() - INTERVAL '${minutes} minutes'
       ORDER BY recorded_at ASC`;
        return result;
    } catch (e) {
        return Array.from({
            length: 10
        }, (_, i)=>{
            const v = generateMockVital(patientId);
            v.recorded_at = new Date(Date.now() - i * 60000).toISOString();
            return v;
        });
    }
}
async function storeVitals(vitalData) {
    const sql = getSql();
    if (!sql) {
        console.log("[Mock DB] Storing vitals:", vitalData);
        return {
            ...vitalData,
            id: Math.floor(Math.random() * 10000),
            recorded_at: new Date().toISOString()
        };
    }
    try {
        const result = await sql`INSERT INTO vitals 
       (patient_id, ambulance_id, heart_rate, spo2, systolic_bp, diastolic_bp, temperature, status, encrypted_data)
       VALUES (${vitalData.patientId}, ${vitalData.ambulanceId}, ${vitalData.heartRate}, ${vitalData.spo2}, ${vitalData.systolicBp}, ${vitalData.diastolicBp}, ${vitalData.temperature}, ${vitalData.status}, ${vitalData.encryptedData || null})
       RETURNING *`;
        return result[0];
    } catch (e) {
        console.log("[Mock DB Fallback] Storing vitals:", vitalData);
        return {
            ...vitalData,
            id: Math.floor(Math.random() * 10000),
            recorded_at: new Date().toISOString()
        };
    }
}
async function createAlert(alertData) {
    const sql = getSql();
    if (!sql) {
        console.log("[Mock DB] Creating alert:", alertData);
        return {
            ...alertData,
            id: Math.floor(Math.random() * 1000),
            is_acknowledged: false,
            created_at: new Date().toISOString()
        };
    }
    try {
        const result = await sql`INSERT INTO alerts (patient_id, alert_type, alert_level, message)
       VALUES (${alertData.patientId}, ${alertData.alertType}, ${alertData.alertLevel}, ${alertData.message})
       RETURNING *`;
        return result[0];
    } catch (e) {
        console.log("[Mock DB Fallback] Creating alert:", alertData);
        return {
            ...alertData,
            id: Math.floor(Math.random() * 1000),
            is_acknowledged: false,
            created_at: new Date().toISOString()
        };
    }
}
async function getActiveAlerts() {
    const sql = getSql();
    if (!sql) {
        // Return some mock alerts occasionally
        if (Math.random() > 0.7) {
            return [
                generateMockAlert(MOCK_PATIENTS[0].patient_id)
            ];
        }
        return [];
    }
    try {
        const result = await sql`SELECT * FROM alerts WHERE is_acknowledged = FALSE ORDER BY created_at DESC`;
        return result;
    } catch (e) {
        if (Math.random() > 0.7) {
            return [
                generateMockAlert(MOCK_PATIENTS[0].patient_id)
            ];
        }
        return [];
    }
}
async function getPatientAlerts(patientId) {
    const sql = getSql();
    if (!sql) {
        return [
            generateMockAlert(patientId)
        ];
    }
    try {
        const result = await sql`SELECT * FROM alerts WHERE patient_id = ${patientId} ORDER BY created_at DESC LIMIT 50`;
        return result;
    } catch (e) {
        return [
            generateMockAlert(patientId)
        ];
    }
}
async function acknowledgeAlert(alertId, acknowledgedBy) {
    const sql = getSql();
    if (!sql) {
        return {
            id: alertId,
            is_acknowledged: true,
            acknowledged_by: acknowledgedBy,
            acknowledged_at: new Date().toISOString()
        };
    }
    try {
        const result = await sql`UPDATE alerts 
       SET is_acknowledged = TRUE, acknowledged_by = ${acknowledgedBy}, acknowledged_at = NOW()
       WHERE id = ${alertId}
       RETURNING *`;
        return result[0];
    } catch (e) {
        return {
            id: alertId,
            is_acknowledged: true,
            acknowledged_by: acknowledgedBy,
            acknowledged_at: new Date().toISOString()
        };
    }
}
async function getPatient(patientId) {
    const sql = getSql();
    if (!sql) {
        return MOCK_PATIENTS.find((p)=>p.patient_id === patientId) || MOCK_PATIENTS[0];
    }
    try {
        const result = await sql`SELECT * FROM patients WHERE patient_id = ${patientId}`;
        return result[0] || null;
    } catch (e) {
        return MOCK_PATIENTS.find((p)=>p.patient_id === patientId) || MOCK_PATIENTS[0];
    }
}
async function getAllPatients() {
    const sql = getSql();
    if (!sql) return MOCK_PATIENTS;
    try {
        const result = await sql`SELECT * FROM patients`;
        return result;
    } catch (e) {
        return MOCK_PATIENTS;
    }
}
async function getAllLatestVitals() {
    const sql = getSql();
    if (!sql) {
        return MOCK_PATIENTS.map((p)=>generateMockVital(p.patient_id));
    }
    try {
        const result = await sql`
      SELECT DISTINCT ON (patient_id) *
      FROM vitals
      ORDER BY patient_id, recorded_at DESC
    `;
        return result;
    } catch (e) {
        return MOCK_PATIENTS.map((p)=>generateMockVital(p.patient_id));
    }
}
async function getAllPatientsWithVitals() {
    const sql = getSql();
    if (!sql) {
        return MOCK_PATIENTS.map((p)=>{
            const v = generateMockVital(p.patient_id);
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
    try {
        const result = await sql`
      SELECT 
        p.patient_id,
        p.name,
        p.age,
        p.medical_condition,
        v.id as vital_id,
        v.heart_rate,
        v.spo2,
        v.systolic_bp,
        v.diastolic_bp,
        v.temperature,
        v.status,
        v.recorded_at,
        v.encrypted_data,
        v.ambulance_id
      FROM patients p
      LEFT JOIN LATERAL (
        SELECT * FROM vitals
        WHERE patient_id = p.patient_id
        ORDER BY recorded_at DESC
        LIMIT 1
      ) v ON true
      ORDER BY p.patient_id
    `;
        return result;
    } catch (e) {
        return MOCK_PATIENTS.map((p)=>{
            const v = generateMockVital(p.patient_id);
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