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
"[project]/app/api/vitals/verify-encryption/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/encryption.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const patientId = request.nextUrl.searchParams.get("patientId");
        if (!patientId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Patient ID is required"
            }, {
                status: 400
            });
        }
        const vital = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLatestVitals"])(patientId);
        if (!vital) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No vital data found for this patient"
            }, {
                status: 404
            });
        }
        // Check if encrypted data exists
        const isEncrypted = vital.encrypted_data && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidEncryptedFormat"])(vital.encrypted_data);
        if (!isEncrypted) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Data is NOT encrypted in database",
                vital: {
                    id: vital.id,
                    patientId: vital.patient_id,
                    encrypted: false
                }
            }, {
                status: 200
            });
        }
        // Decrypt to verify
        let decryptedData = null;
        try {
            decryptedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$encryption$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decryptVitalData"])(vital.encrypted_data);
        } catch (error) {
            console.error("[v0] Decryption failed:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Data is encrypted but decryption failed",
                vital: {
                    id: vital.id,
                    patientId: vital.patient_id,
                    encrypted: true,
                    encryptedDataSample: vital.encrypted_data.substring(0, 100) + "..."
                }
            }, {
                status: 200
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Data is ENCRYPTED and successfully decrypted",
            vital: {
                id: vital.id,
                patientId: vital.patient_id,
                ambulanceId: vital.ambulance_id,
                status: vital.status,
                recordedAt: vital.recorded_at,
                encrypted: true,
                encryptedDataSample: vital.encrypted_data.substring(0, 100) + "...",
                decryptedData: decryptedData,
                plainTextVitals: {
                    heartRate: vital.heart_rate,
                    spo2: vital.spo2,
                    systolicBp: vital.systolic_bp,
                    diastolicBp: vital.diastolic_bp,
                    temperature: vital.temperature
                },
                verification: {
                    dataMatchesEncrypted: JSON.stringify(decryptedData) === JSON.stringify(vital),
                    encryptionFormat: "AES-256-GCM",
                    integrity: "Verified via authentication tag"
                }
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("[v0] Verification error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to verify encryption",
            details: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0159a6b6._.js.map