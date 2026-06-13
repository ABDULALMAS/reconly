# Reconly

Understand a company in minutes before deciding whether it is worth your time.

## Problem

Researching companies is fragmented and time-consuming.

Users often spend 30–60+ minutes trying to understand:

* What a company does
* Who it serves
* How it is positioned
* Who its competitors are
* Whether it is worth pursuing

## Solution

Reconly analyzes a company using:

* Website data
* External research
* AI-powered analysis

and generates a structured company intelligence report.

## Features

* Company Summary
* Target Audience Analysis
* Value Proposition Analysis
* Competitive Positioning
* Competitor Discovery
* Recent Company Signals
* Opportunities & Risks
* Final Assessment

## Architecture

```text
User
↓
Next.js Frontend
↓
Express API
↓
Firecrawl + Tavily
↓
Gemini
↓
Structured Report
```

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express
* TypeScript

### Research

* Firecrawl
* Tavily

### AI

* Gemini

## Project Structure

```text
reconly/
├── docs/
├── frontend/
├── backend/
└── README.md
```

## MVP Scope

Current focus:

* URL → Company Intelligence Report
* Fast analysis
* Useful insights

Out of scope:

* Authentication
* Billing
* Saved Reports
* Team Workspaces
* Notifications

## Future Roadmap

* Founder Intelligence
* Hiring Signals
* Funding Intelligence
* Market Intelligence
* Opportunity Scoring

## Why I Built This

I was spending significant time researching startups before deciding whether they were worth pursuing.

Reconly was built to turn scattered information into a structured decision-making framework and reduce company research from hours to minutes.
