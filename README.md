# 🌊 Smart Coastal Flood Monitoring System – Team TideWatch

**Project Title:** TideWatch – Real-Time Coastal Flood Monitoring & Early Warning System
**Competition:** Gaiathon Africa 2025
**Team:** Team TideWatch
**Team Lead:** \[Prince Philips Adorboe]
**Members:** \[Nkansah Tabi], \[Thelma Akuffo], \[Luqman]

---

## 🧠 Overview

TideWatch is a low-cost, solar-powered, smart buoy system designed to monitor critical coastal environmental conditions and provide real-time alerts for potential flooding. It is engineered to serve vulnerable coastal communities in Africa with limited access to high-tech flood detection infrastructure.

The system collects data via sensors on a buoy, transmits it via LoRa or GSM, processes it through a FastAPI backend, stores it in Firebase, and visualizes it through a modern, mobile-responsive dashboard built in Next.js.

---

## 💡 Problem Statement

Coastal communities in Ghana and across Africa face increasing threats from rising sea levels, storm surges, and unpredictable flooding. Most regions lack localized, real-time monitoring tools to issue early warnings and prevent loss of life and property.

---

## 🚀 Features

* Real-time environmental monitoring via smart buoy sensors
* Data metrics: Wave height, water level, wind speed & direction, temperature, humidity, air pressure, rainfall
* Secure data transmission over LoRa or GSM
* Backend API with JWT authentication
* Data storage using Firebase Realtime Database
* Interactive web dashboard with charts, status indicators, and logs
* Timeframe toggle (24h, 7d, 30d) with % change analytics
* Mobile responsive and dark mode ready

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, TypeScript, TailwindCSS, Recharts, Zustand, React Query
* **Backend:** FastAPI, Python, Firebase Admin SDK
* **Data Flow:** MQTT, LoRa/GSM modules, JSON APIs
* **Auth:** JWT-based secured API routes
* **Database:** Firebase Realtime DB
* **Hardware:** ESP32, waterproof pressure transducer, DHT11, LoRa module, solar panel

---

## 📂 Folder Structure

```
├── frontend/                  # Next.js client app
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   └── public/
├── backend/                  # FastAPI backend
│   ├── main.py
│   ├── auth.py
│   ├── routes/
│   ├── firebase_config.py
│   └── requirements.txt
```

---

## ⚙️ How to Run Locally

### 🔹 Prerequisites

* Node.js v18+
* Python 3.9+
* Firebase account & credentials

### 🔹 Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🔹 Setup Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create `.env` files in both `frontend/` and `backend/` using the `.env.example` templates.

---

## 📈 Example API Endpoints

```http
POST /api/ingest         # Store sensor data
GET  /api/metrics?timeframe=24h   # Get metric history
GET  /api/logs           # Recent threshold breach logs
POST /api/auth/login     # Get JWT token
```

---

## 📊 Sample Metrics Schema

```json
{
  "name": "Wave Height",
  "unit": "cm",
  "value": 142,
  "status": "warning",
  "change": 9.8,
  "history": [
    { "timestamp": "2024-05-28T12:00:00Z", "value": 130 },
    { "timestamp": "2024-05-28T13:00:00Z", "value": 140 },
    { "timestamp": "2024-05-28T14:00:00Z", "value": 142 }
  ]
}
```

---

## 🔐 Environment Variables

```bash
# frontend/.env.local
NEXT_PUBLIC_API_KEY=your_public_token

# backend/.env
JWT_SECRET_KEY=your_secret_key
FIREBASE_PROJECT_ID=project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=email@project.iam.gserviceaccount.com
```

---

## 🌍 Impact

* Provides real-time flood warnings for vulnerable coastal populations
* Can be locally assembled using low-cost materials
* Adaptable for disaster response, climate research, education

---

## 🎯 Future Plans

* Add real-time MQTT → WebSocket pipeline
* Integrate machine learning for flood prediction
* Scale deployments to additional West African countries
* Offline-first mobile app for remote field access

---

## 🤝 Acknowledgements

* Gaiathon Africa Competitions
* Open source libraries and community contributors & pROJECT sUPERVISORS
* Ghana’s coastal communities for inspiring this project

---

## 📸 Screenshot of the Web App

![web dashboard](https://github.com/user-attachments/assets/cf652aae-03d4-485d-b7f8-c168e8836885)




**Team Lead:** \[Prince Phil] – \[princephil403@gmail.com]
GitHub Repo: (https://github.com/themannnphil/coastal)

> “We’re building the low-cost, real-time early warning system Africa needs to stay ahead of the tide.” 🌊
