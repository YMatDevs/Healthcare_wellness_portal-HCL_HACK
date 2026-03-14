# Healthcare_wellness_portal-HCL_HACK
🏥 Healthcare Wellness Portal – Backend
Backend service for the Healthcare Wellness Portal, developed for the HCL Hackathon.
The backend provides secure APIs for authentication, patient wellness tracking, provider monitoring, and public health information.

The system is built using FastAPI with MongoDB Atlas, implementing JWT authentication, cookie-based sessions, and role-based access control.

📌 Features
🔐 Authentication & Security
User registration and login

Password hashing using bcrypt

JWT-based authentication

HTTPOnly cookie session management

Role-based authorization

Cross-Origin support using CORS middleware

👤 Patient Features
Patients can:

Register and login

Maintain health profile

Track wellness goals

Log daily wellness activities

View personalized dashboard

Receive health tips

👨‍⚕️ Provider Features
Providers can:

View assigned patients

Monitor patient wellness progress

Access patient health summaries

📊 Dashboard
The dashboard API provides:

Goal tracking

Health activity logs

Wellness progress summary

📚 Public Health Information
Public APIs provide educational health resources such as:

COVID‑19 information

Lifestyle advice

Preventive health guidelines

🛠 Tech Stack
Backend Framework
FastAPI

Database
MongoDB Atlas

Motor (Async MongoDB driver)

Authentication
JWT (python-jose)

Passlib (bcrypt hashing)

Other Libraries
Pydantic

Uvicorn

Python-dotenv

FastAPI CORS Middleware

🏗 Project Structure
server/
│
├── app/
│   ├── core/
│   │   ├── hashing.py
│   │   ├── jwt_handler.py
│   │   ├── auth_middleware.py
│   │   └── role_guard.py
│   │
│   ├── repository/
│   │   ├── user_repository.py
│   │   ├── patient_repository.py
│   │   ├── goal_repository.py
│   │   ├── goal_log_repository.py
│   │   ├── article_repository.py
│   │   └── reminder_repository.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── dashboard_service.py
│   │   ├── health_tip_service.py
│   │   └── article_service.py
│   │
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── patient_routes.py
│   │   ├── dashboard_routes.py
│   │   ├── goal_log_routes.py
│   │   ├── health_tip_routes.py
│   │   ├── provider_routes.py
│   │   └── public_routes.py
│   │
│   ├── schemas/
│   │
│   ├── database.py
│   └── config.py
│
└── main.py
🔐 Authentication Flow
User Login
      ↓
JWT Token Generated
      ↓
Token stored in HTTPOnly Cookie
      ↓
Browser sends cookie automatically
      ↓
Auth Middleware verifies token
      ↓
User authorized to access protected APIs
🧑‍💻 API Endpoints
Authentication
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/verify
Patient APIs
GET  /patients/me
PUT  /patients/me
Wellness Goals
POST /goals
GET  /goals
Goal Logs
POST /logs
GET  /logs
Dashboard
GET /dashboard
Health Tips
GET /health-tip
Provider APIs
GET /provider/patients
GET /provider/patient/{id}
Public APIs
GET /public/topics
GET /public/articles/{topic}
GET /public/privacy-policy
🗄 Database Collections
The system uses the following MongoDB collections:

users
patients
goals
goal_logs
health_tips
health_articles
reminders
Example user document:

{
  "email": "user@gmail.com",
  "password": "hashed_password",
  "role": "patient"
}
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone <repo-url>
cd server
2️⃣ Install Dependencies
pip install -r requirements.txt
3️⃣ Create Environment Variables
Create a .env file:

MONGO_URI=your_mongodb_atlas_connection_string
DATABASE_NAME=healthcare_db
JWT_SECRET=your_secret_key
4️⃣ Run the Server
uvicorn app.main:app --reload
Backend will run on:

http://localhost:8000
Swagger documentation:

http://localhost:8000/docs
🌐 CORS Configuration
CORS is configured to allow frontend access:

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
