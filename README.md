# TealVue Real-Time Anomaly Detection Service (Backend)

## Overview

This service connects to the TealVue Mock Market Feed, processes live market ticks, detects anomalies using configurable strategies, stores alerts, and streams live updates to the frontend.

---

## Features

### Feed Ingestion

- Connects to TealVue Socket.IO market feed
- Subscribes to configured symbols
- Handles live market data in real time
- Supports automatic reconnection

### Anomaly Detection

Implemented strategies:

#### Spike / Drop Detection

Generates an alert when price changes more than a configured percentage within a configured time window.

#### Moving Average Deviation

Generates an alert when the current price deviates from the rolling average by a configured percentage.

### Alert System

Each alert contains:

- alertRef
- symbol
- timestamp
- reason

Example:

```json
{
  "alertRef": "TV-JPCRI",
  "symbol": "TCS",
  "timestamp": "2026-06-22 10:51:00+05:30",
  "reason": "Price deviated -0.00% from moving average"
}
```

### Real-Time Streaming

The backend broadcasts:

- Live price updates
- Generated alerts

to connected frontend clients using Socket.IO.

---

## API

### Get Recent Alerts

```http
GET /api/alerts
```

Headers:

```http
x-api-key: TV_8Hk92LqP1ZmR4
```

Response:

```json
[
{
  "alertRef": "TV-JPCRI",
  "symbol": "TCS",
  "timestamp": "2026-06-22 10:51:00+05:30",
  "reason": "Price deviated -0.00% from moving average"
},
{
    "alertRef": "TV-FPM12",
  "symbol": "RELIANCE",
  "timestamp": "2026-06-22 11:50:00+05:30",
  "reason": "Price moved -0.02% within 30 seconds"
  },

 {
  "alertRef": "TV-87WWL",
  "symbol": "RELIANCE",
  "timestamp": "2026-06-22 14:02:00+05:30",
  "reason": "Price moved 0.11% within 30 seconds"
}
]
```

Returns the latest 10 generated alerts.

---

## Security

The alerts endpoint is protected using:

- API Key Authentication
- Rate Limiting

This prevents unauthorized access and excessive requests.

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

TEALVUE_SOCKET_URL=https://mock-data.tealvue.in

API_KEY=TV_8Hk92LqP1ZmR4
```

---

## Sample Configuration

```json
{
  "RELIANCE": {
    "strategy": "spike",
    "thresholdPercent": 3,
    "windowSec": 30
  },
  "TCS": {
    "strategy": "movingAverage",
    "deviationPercent": 5,
    "sampleSize": 10
  }

  
}
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Notes

- Alerts are stored in memory.
- Latest 100 alerts are retained.
- Alert references are generated with the required `TV-` prefix.
- Detection logic uses market timestamps from the feed.
