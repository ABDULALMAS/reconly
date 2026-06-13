# Reconly Architecture

## High-Level Flow

User
↓
Next.js Frontend
↓
Express API
↓
Data Collection Layer
├── Firecrawl
└── Tavily
↓
Gemini Analysis Layer
↓
Structured Report
↓
Frontend Display

---

## Components

### Frontend

* URL Input
* Loading State
* Report Display

### Backend

* Validation
* Data Collection
* AI Analysis
* Response Formatting

### Research Layer

* Company Website Analysis
* External Research

### AI Layer

* Company Intelligence Generation

---

## MVP Principles

* Keep architecture simple
* No database
* No authentication
* No background jobs
* No microservices
