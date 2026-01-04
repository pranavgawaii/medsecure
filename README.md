<div align="center">

# MedSecure24
### Secure Real-Time Ambulance Data Transmission System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-success.svg)
![Security](https://img.shields.io/badge/security-AES--256--GCM-critical.svg)
![Framework](https://img.shields.io/badge/framework-Next.js%2014-black.svg)

<p align="center">
  <a href="#-system-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-documentation">API Docs</a>
</p>

</div>

---

## 🏥 System Overview

**MedSecure24** is an advanced IoT-enabled emergency healthcare platform designed to bridge the critical gap between pre-hospital care and hospital treatment. By transmitting encrypted patient vital signs in real-time from ambulances to hospital dashboards, our system allows medical teams to prepare for incoming trauma cases before they arrive.

The platform utilizes military-grade **AES-256-GCM encryption** to ensure full HIPAA compliance and data integrity during transmission over standard cellular networks (4G/5G).

## 🚀 Key Features

### 🚑 For Ambulances
- **Instant Connectivity**: Seamless pairing with IoT medical sensors.
- **Secure Transmission**: Auto-encrypted data stream to the cloud.
- **Offline Buffering**: Local data storage during network dropouts with auto-sync.

### 🏥 For Hospitals
- **Live Vitals Dashboard**: Real-time visualization of Heart Rate, SpO2, BP, and ECG.
- **Smart Triage**: automated patient condition classification (Stable/Moderate/Critical).
- **Audio-Visual Alerts**: Immediate notifications for critical threshold breaches.

### 🛡️ Security Core
- **End-to-End Encryption**: Data is encrypted at the source and only decrypted at the hospital.
- **Audit Trails**: Complete logging of all data access and transmission events.
- **Role-Based Access**: Strict separation between Administrator, Medical Staff, and Paramedic roles.

## 🏗️ Architecture

The system follows a modern microservices-ready architecture:

```mermaid
graph TD
    A[🚑 Ambulance IoT Unit] -->|Encrypted Stream| B(☁️ Secure Cloud Gateway)
    B -->|Validation & Storage| C{🗄️ Neon Database}
    C -->|Real-time Push| D[🏥 Hospital Dashboard]
    
    subgraph Security Layer
    A -.->|AES-256 Key Exchange| D
    end
```

### Data Flow
1. **Acquisition**: Sensors collect patient vitals (HR, BP, SpO2).
2. **Encryption**: Data is encrypted using AES-256-GCM with a unique session IV.
3. **Transmission**: Encrypted payload is sent via Secure WebSockets/HTTP.
4. **Processing**: Backend validates integrity without decrypting sensitive payload.
5. **Decryption**: Authorized hospital clients decrypt data locally for display.

## ⚡ Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | Next.js 14, React 18 | High-performance dashboard with Server Components |
| **Styling** | TailwindCSS, Shadcn/UI | Professional, responsive, and accessible UI |
| **Backend** | Node.js, Next.js API | Serverless API routes for handling high-throughput data |
| **Database** | PostgreSQL (Neon) | Serverless SQL database for scalable storage |
| **Security** | Web Crypto API | Native browser-based, high-performance cryptography |
| **Real-time** | Polling / WebSockets | Low-latency data delivery infrastructure |

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Database URL (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Start-Up-POC/medsecurree.git
   cd medsecurree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file:
   ```env
   NEON_POSTGRES_URL=postgresql://user:pass@host/db
   ENCRYPTION_KEY=your-32-byte-secret-key-base64
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Initialize Database**
   ```bash
   npm run db:init
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`

## 📡 API Documentation

### Vital Signs

#### Transmit Vitals
`POST /api/vitals/transmit`

Receives encrypted vital data from ambulance units.

**Request Body:**
```json
{
  "ambulanceId": "AMB-882",
  "patientId": "PAT-2024-001",
  "encryptedPayload": "base64_encoded_string",
  "iv": "initialization_vector",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### Get Latest Vitals
`GET /api/vitals/latest?patientId={id}`

Returns the most recent vital signs for a specific patient.

## 📊 Patient Classification Logic

The system automatically categorizes patients based on vital thresholds:

| Status | Heart Rate | SpO2 | Systolic BP | Action |
|:-------|:-----------|:-----|:------------|:-------|
| 🟢 **Stable** | 60-100 | >95% | 100-140 | Routine Monitoring |
| 🟡 **Moderate** | 50-60 / 100-120 | 90-95% | 90-100 / 140-160 | Increased Focus |
| 🔴 **Critical** | <50 / >120 | <90% | <90 / >160 | **Immediate Alert** |

## 🤝 Contributing

We welcome contributions to MedSecure24! Please follow our [Contribution Guidelines](CONTRIBUTING.md).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ for Emergency Responders everywhere.</p>
  <p>© 2024 MedSecure24 Inc.</p>
</div>
