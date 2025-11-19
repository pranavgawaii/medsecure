import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config({ path: '../.env' }); // Try to read from root or local .env

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://pranav:mypassword@localhost:5432/medsecure24?sslmode=disable",
});

// Test Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to Database:', result.rows[0]);
  });
});

// --- API Routes ---

// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all ambulances
app.get('/api/ambulances', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ambulances ORDER BY ambulance_id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Post new vitals (from Simulator)
app.post('/api/vitals', async (req, res) => {
  const { patient_id, ambulance_id, heart_rate, spo2, systolic_bp, diastolic_bp, temperature, encrypted_data } = req.body;
  
  try {
    const query = `
      INSERT INTO vitals (patient_id, ambulance_id, heart_rate, spo2, systolic_bp, diastolic_bp, temperature, encrypted_data, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'normal')
      RETURNING *
    `;
    const values = [patient_id, ambulance_id, heart_rate, spo2, systolic_bp, diastolic_bp, temperature, encrypted_data];
    const result = await pool.query(query, values);
    
    // Also update the ambulance current_patient_id if needed
    await pool.query('UPDATE ambulances SET current_patient_id = $1 WHERE ambulance_id = $2', [patient_id, ambulance_id]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent vitals for Dashboard (Live View)
app.get('/api/vitals/live', async (req, res) => {
  try {
    // Get the latest vital reading for each active ambulance/patient
    const query = `
      SELECT DISTINCT ON (v.patient_id) 
        v.*, p.name as patient_name, p.medical_conditions, a.ambulance_id
      FROM vitals v
      JOIN patients p ON v.patient_id = p.patient_id
      LEFT JOIN ambulances a ON v.ambulance_id = a.ambulance_id
      ORDER BY v.patient_id, v.recorded_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const activeAmbulancesCount = await pool.query("SELECT COUNT(*) FROM ambulances WHERE status != 'idle'");
    const criticalPatientsCount = await pool.query("SELECT COUNT(*) FROM vitals WHERE status = 'critical' AND recorded_at > NOW() - INTERVAL '1 hour'");
    
    res.json({
      incomingAmbulances: activeAmbulancesCount.rows[0].count,
      criticalPatients: criticalPatientsCount.rows[0].count,
      availableBeds: 12, // Mocked for now
      avgArrivalTime: '5m' // Mocked for now
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
