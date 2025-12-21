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
"[project]/app/api/init-db/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function POST() {
    try {
        const databaseUrl = process.env.NEON_POSTGRES_URL || process.env.NEON_NEON_DATABASE_URL;
        if (!databaseUrl) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Database URL not configured"
            }, {
                status: 500
            });
        }
        const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(databaseUrl);
        await sql`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        age INT,
        gender VARCHAR(10),
        medical_conditions VARCHAR(500),
        emergency_contact VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        await sql`
      CREATE TABLE IF NOT EXISTS ambulances (
        id SERIAL PRIMARY KEY,
        ambulance_id VARCHAR(50) UNIQUE NOT NULL,
        driver_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'available',
        current_patient_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        await sql`
      CREATE TABLE IF NOT EXISTS vitals (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        ambulance_id VARCHAR(50),
        heart_rate INT,
        spo2 DECIMAL(5, 2),
        systolic_bp INT,
        diastolic_bp INT,
        temperature DECIMAL(5, 2),
        status VARCHAR(50),
        encrypted_data TEXT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      )
    `;
        await sql`
      CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        alert_type VARCHAR(50),
        alert_level VARCHAR(50),
        message TEXT,
        is_acknowledged BOOLEAN DEFAULT FALSE,
        acknowledged_by VARCHAR(255),
        acknowledged_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      )
    `;
        await sql`
      CREATE TABLE IF NOT EXISTS vital_history (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        heart_rate_avg INT,
        spo2_avg DECIMAL(5, 2),
        systolic_bp_avg INT,
        diastolic_bp_avg INT,
        temperature_avg DECIMAL(5, 2),
        status VARCHAR(50),
        date_recorded DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      )
    `;
        // Create indexes
        await sql`CREATE INDEX IF NOT EXISTS idx_patient_id ON vitals(patient_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_ambulance_id ON vitals(ambulance_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_recorded_at ON vitals(recorded_at)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_alert_patient_id ON alerts(patient_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_alert_created_at ON alerts(created_at)`;
        // Seed data
        await sql`
      INSERT INTO patients (patient_id, name, age, gender, medical_conditions) 
      VALUES 
        ('PAT001', 'John Doe', 45, 'M', 'Hypertension'),
        ('PAT002', 'Jane Smith', 52, 'F', 'Diabetes, Heart Disease'),
        ('PAT003', 'Michael Johnson', 38, 'M', 'Asthma')
      ON CONFLICT (patient_id) DO NOTHING
    `;
        await sql`
      INSERT INTO ambulances (ambulance_id, driver_name, status) 
      VALUES 
        ('AMB001', 'Officer Mike', 'available'),
        ('AMB002', 'Officer Sarah', 'available')
      ON CONFLICT (ambulance_id) DO NOTHING
    `;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Database initialized successfully",
            tables: [
                "patients",
                "ambulances",
                "vitals",
                "alerts",
                "vital_history"
            ]
        });
    } catch (error) {
        console.error("[v0] Database init error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to initialize database",
            details: String(error)
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4bdc3549._.js.map