# EcoPassport Full Integrated

React frontend + Java Spring Boot backend + MySQL database + AI sustainability scoring.

## Run database
In MySQL Workbench:
CREATE DATABASE ecopassport;

If your MySQL password is NOT `root`, edit backend/src/main/resources/application.properties.

## Backend
Requirements: Java 17 and Maven.
cd backend
mvn spring-boot:run
Backend: http://localhost:8080

## Frontend
Open a second terminal:
cd frontend
npm install
npm run dev
Frontend: http://localhost:5173

## Main API
POST /api/auth/register
POST /api/auth/login
GET /api/products
POST /api/products
GET /api/products/{id}
POST /api/products/{id}/ai-analysis
GET /api/products/{id}/lifecycle
POST /api/products/{id}/lifecycle

The AI component is intentionally a transparent scoring service for the college demo. It can later be replaced by a Scikit-Learn model/API.
