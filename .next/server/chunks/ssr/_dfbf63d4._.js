module.exports=[54161,a=>{"use strict";var b=a.i(87924),c=a.i(11011),d=a.i(187),e=a.i(97895);let f=(0,d.cva)("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function g({className:a,variant:d,asChild:g=!1,...h}){let i=g?c.Slot:"span";return(0,b.jsx)(i,{"data-slot":"badge",className:(0,e.cn)(f({variant:d}),a),...h})}a.s(["Badge",()=>g])},87030,a=>{"use strict";var b=a.i(87924),c=a.i(3130),d=a.i(54161);let e=(0,a.i(70106).default)("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);function f(){return(0,b.jsx)("main",{className:"min-h-screen bg-background p-6",children:(0,b.jsxs)("div",{className:"max-w-5xl mx-auto",children:[(0,b.jsx)("div",{className:"mb-8",children:(0,b.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,b.jsx)("div",{className:"p-2 bg-primary rounded-lg",children:(0,b.jsx)(e,{className:"w-6 h-6 text-primary-foreground"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-3xl font-bold text-foreground",children:"API Documentation"}),(0,b.jsx)("p",{className:"text-muted-foreground",children:"Secure Real-Time Ambulance Data Transmission System"})]})]})}),(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)(c.CardTitle,{children:"POST /api/vitals/transmit"}),(0,b.jsx)(d.Badge,{className:"bg-blue-500",children:"Create"})]})}),(0,b.jsxs)(c.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Description"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"Receives encrypted vital data from ambulance, classifies patient condition, and triggers alerts if needed."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Request Body"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs overflow-x-auto",children:`{
  "patientId": "PAT001",
  "ambulanceId": "AMB001",
  "heartRate": 92,
  "spo2": 96,
  "systolicBp": 135,
  "diastolicBp": 85,
  "temperature": 37.2
}`})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Response (Success)"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs overflow-x-auto",children:`{
  "success": true,
  "message": "Vitals transmitted and processed successfully",
  "vitalId": 123,
  "classification": {
    "status": "Stable",
    "riskFactors": [],
    "score": 30
  },
  "patient": {
    "name": "John Doe",
    "age": 45
  }
}`})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Status Codes"}),(0,b.jsxs)("div",{className:"space-y-2 text-sm",children:[(0,b.jsxs)("p",{children:[(0,b.jsx)(d.Badge,{children:"201"})," Created - Vitals successfully stored"]}),(0,b.jsxs)("p",{children:[(0,b.jsx)(d.Badge,{variant:"outline",children:"400"})," Bad Request - Missing required fields"]}),(0,b.jsxs)("p",{children:[(0,b.jsx)(d.Badge,{variant:"outline",children:"500"})," Server Error - Processing failed"]})]})]})]})]}),(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)(c.CardTitle,{children:"GET /api/vitals/latest"}),(0,b.jsx)(d.Badge,{className:"bg-green-500",children:"Read"})]})}),(0,b.jsxs)(c.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Description"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"Retrieves the most recent vital readings for a patient (decrypted)."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Query Parameters"}),(0,b.jsx)("div",{className:"space-y-2 text-sm",children:(0,b.jsxs)("p",{children:[(0,b.jsx)("code",{className:"bg-muted px-2 py-1 rounded",children:"patientId"})," (required) - Patient ID"]})})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Example Request"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs",children:"GET /api/vitals/latest?patientId=PAT001"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Response"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs overflow-x-auto",children:`{
  "success": true,
  "vital": {
    "id": 123,
    "patientId": "PAT001",
    "ambulanceId": "AMB001",
    "heartRate": 92,
    "spo2": 96,
    "systolicBp": 135,
    "diastolicBp": 85,
    "temperature": 37.2,
    "status": "Stable",
    "recordedAt": "2024-11-04T10:30:00Z"
  }
}`})]})]})]}),(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)(c.CardTitle,{children:"GET /api/alerts/active"}),(0,b.jsx)(d.Badge,{className:"bg-green-500",children:"Read"})]})}),(0,b.jsxs)(c.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Description"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"Retrieves all unacknowledged critical alerts."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Response"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs overflow-x-auto",children:`{
  "success": true,
  "alerts": [
    {
      "id": 1,
      "patientId": "PAT003",
      "alertType": "CRITICAL_VITALS",
      "alertLevel": "CRITICAL",
      "message": "Critical condition detected: Heart rate 145 bpm (critical)",
      "isAcknowledged": false,
      "createdAt": "2024-11-04T10:32:00Z"
    }
  ],
  "count": 1
}`})]})]})]}),(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)(c.CardTitle,{children:"POST /api/alerts/acknowledge"}),(0,b.jsx)(d.Badge,{className:"bg-blue-500",children:"Update"})]})}),(0,b.jsxs)(c.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Description"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"Marks an alert as acknowledged by a doctor."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Request Body"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs",children:`{
  "alertId": 1,
  "acknowledgedBy": "Dr. Smith"
}`})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Response"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs overflow-x-auto",children:`{
  "success": true,
  "message": "Alert acknowledged"
}`})]})]})]}),(0,b.jsxs)(c.Card,{children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)(c.CardTitle,{children:"GET /api/vitals/verify-encryption"}),(0,b.jsx)(d.Badge,{className:"bg-purple-500",children:"Verify"})]})}),(0,b.jsxs)(c.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Description"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"Verifies that vital data is encrypted in the database and successfully decrypts it to prove integrity."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Query Parameters"}),(0,b.jsx)("div",{className:"space-y-2 text-sm",children:(0,b.jsxs)("p",{children:[(0,b.jsx)("code",{className:"bg-muted px-2 py-1 rounded",children:"patientId"})," (required) - Patient ID"]})})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Example Request"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs",children:"GET /api/vitals/verify-encryption?patientId=PAT001"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Response"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs overflow-x-auto",children:`{
  "success": true,
  "message": "Data is ENCRYPTED and successfully decrypted",
  "vital": {
    "id": 123,
    "patientId": "PAT001",
    "encrypted": true,
    "encryptedDataSample": "L2hs7f+Vk...",
    "decryptedData": {
      "patientId": "PAT001",
      "heartRate": 92,
      "spo2": 96,
      "timestamp": "2024-11-04T10:30:00Z"
    },
    "verification": {
      "encryptionFormat": "AES-256-GCM",
      "integrity": "Verified via authentication tag"
    }
  }
}`})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Purpose"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"Use this endpoint to verify that data is properly encrypted in the database. Demonstrates that all vital data is stored in encrypted format with AES-256-GCM encryption."})]})]})]})]}),(0,b.jsxs)(c.Card,{className:"mt-8",children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsx)(c.CardTitle,{children:"🔒 Security & Encryption"})}),(0,b.jsxs)(c.CardContent,{className:"space-y-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Encryption Method"}),(0,b.jsx)("p",{className:"text-sm text-muted-foreground",children:"All vital data is encrypted using AES-256-GCM before storage. The encryption provides:"}),(0,b.jsxs)("ul",{className:"list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1",children:[(0,b.jsx)("li",{children:"Confidentiality through AES-256 encryption"}),(0,b.jsx)("li",{children:"Integrity through GCM authentication"}),(0,b.jsx)("li",{children:"Unique IV (Initialization Vector) for each transmission"}),(0,b.jsx)("li",{children:"Secure key derivation from environment secret"})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Encrypted Data Format"}),(0,b.jsxs)("p",{className:"text-sm text-muted-foreground mb-2",children:["Encrypted data is stored as:"," ",(0,b.jsx)("code",{className:"bg-muted px-2 py-1 rounded",children:"base64_iv:hex_ciphertext:base64_auth_tag"})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-semibold mb-2",children:"Environment Variables Required"}),(0,b.jsx)("pre",{className:"bg-muted p-3 rounded-lg text-xs space-y-1",children:`NEON_POSTGRES_URL=<database_url>
ENCRYPTION_KEY=<your_secret_key>`})]})]})]}),(0,b.jsxs)(c.Card,{className:"mt-8",children:[(0,b.jsx)(c.CardHeader,{children:(0,b.jsx)(c.CardTitle,{children:"📊 Patient Classification System"})}),(0,b.jsx)(c.CardContent,{children:(0,b.jsx)("div",{className:"overflow-x-auto",children:(0,b.jsxs)("table",{className:"w-full text-sm",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-border",children:[(0,b.jsx)("th",{className:"text-left py-2 px-2 font-semibold",children:"Parameter"}),(0,b.jsx)("th",{className:"text-left py-2 px-2 font-semibold",children:"Critical"}),(0,b.jsx)("th",{className:"text-left py-2 px-2 font-semibold",children:"Moderate"}),(0,b.jsx)("th",{className:"text-left py-2 px-2 font-semibold",children:"Stable"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-border",children:[(0,b.jsx)("td",{className:"py-2 px-2",children:"Heart Rate"}),(0,b.jsx)("td",{className:"py-2 px-2 text-destructive",children:"<40 or >140"}),(0,b.jsx)("td",{className:"py-2 px-2 text-yellow-600",children:"<50 or >120"}),(0,b.jsx)("td",{className:"py-2 px-2 text-green-600",children:"60-100"})]}),(0,b.jsxs)("tr",{className:"border-b border-border",children:[(0,b.jsx)("td",{className:"py-2 px-2",children:"SpO₂ (%)"}),(0,b.jsx)("td",{className:"py-2 px-2 text-destructive",children:"<85"}),(0,b.jsx)("td",{className:"py-2 px-2 text-yellow-600",children:"<90"}),(0,b.jsx)("td",{className:"py-2 px-2 text-green-600",children:"≥95"})]}),(0,b.jsxs)("tr",{className:"border-b border-border",children:[(0,b.jsx)("td",{className:"py-2 px-2",children:"Systolic BP"}),(0,b.jsx)("td",{className:"py-2 px-2 text-destructive",children:"<60 or >200"}),(0,b.jsx)("td",{className:"py-2 px-2 text-yellow-600",children:"<90 or >180"}),(0,b.jsx)("td",{className:"py-2 px-2 text-green-600",children:"100-140"})]}),(0,b.jsxs)("tr",{className:"border-b border-border",children:[(0,b.jsx)("td",{className:"py-2 px-2",children:"Diastolic BP"}),(0,b.jsx)("td",{className:"py-2 px-2 text-destructive",children:"<40 or >120"}),(0,b.jsx)("td",{className:"py-2 px-2 text-yellow-600",children:"<60 or >110"}),(0,b.jsx)("td",{className:"py-2 px-2 text-green-600",children:"70-100"})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{className:"py-2 px-2",children:"Temperature (°C)"}),(0,b.jsx)("td",{className:"py-2 px-2 text-destructive",children:"<32 or >40"}),(0,b.jsx)("td",{className:"py-2 px-2 text-yellow-600",children:"<36 or >38.5"}),(0,b.jsx)("td",{className:"py-2 px-2 text-green-600",children:"36.5-37.5"})]})]})]})})})]})]})})}a.s(["default",()=>f],87030)}];

//# sourceMappingURL=_dfbf63d4._.js.map