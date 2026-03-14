# 🏥 Healthcare Wellness Portal — Backend

> Backend service for the **Healthcare Wellness Portal**, developed for the **HCL Hackathon**.

The backend provides secure APIs for authentication, patient wellness tracking, provider monitoring, and public health information. Built with **FastAPI** and **MongoDB Atlas**, it implements JWT authentication, cookie-based sessions, and role-based access control.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [API Endpoints](#-api-endpoints)
- [Database Collections](#-database-collections)
- [Setup Instructions](#-setup-instructions)
- [CORS Configuration](#-cors-configuration)

---

## ✨ Features

### 🔐 Authentication & Security
- User registration and login
- Password hashing using **bcrypt**
- **JWT**-based authentication
- **HTTPOnly** cookie session management
- Role-based authorization
- Cross-Origin support via **CORS** middleware

### 👤 Patient Features
Patients can:
- Register and login
- Maintain a health profile
- Track wellness goals
- Log daily wellness activities
- View a personalized dashboard
- Receive health tips

### 👨‍⚕️ Provider Features
Providers can:
- View assigned patients
- Monitor patient wellness progress
- Access patient health summaries

### 📊 Dashboard
The dashboard API provides:
- Goal tracking
- Health activity logs
- Wellness progress summary

### 📚 Public Health Information
Public APIs provide educational health resources including:
- COVID-19 information
- Lifestyle advice
- Preventive health guidelines

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Backend Framework** | FastAPI |
| **Database** | MongoDB Atlas |
| **Async DB Driver** | Motor |
| **Authentication** | JWT (`python-jose`), Passlib (bcrypt) |
| **Validation** | Pydantic |
| **Server** | Uvicorn |
| **Config** | Python-dotenv |
| **Middleware** | FastAPI CORS Middleware |

---

## 🏗 Project Structure
```
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
│   ├── database.py
│   └── config.py
│
└── main.py
```

---

## 🔐 Authentication Flow
```
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
```

---

## 🧑‍💻 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT cookie |
| `POST` | `/auth/logout` | Logout and clear session |
| `GET` | `/auth/verify` | Verify current session |

### Patient APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/patients/me` | Get current patient profile |
| `PUT` | `/patients/me` | Update patient profile |

### Wellness Goals
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/goals` | Create a new wellness goal |
| `GET` | `/goals` | List all wellness goals |

### Goal Logs
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/logs` | Log a wellness activity |
| `GET` | `/logs` | Retrieve activity logs |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dashboard` | Get personalized dashboard summary |

### Health Tips
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health-tip` | Get a personalized health tip |

### Provider APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/provider/patients` | List all assigned patients |
| `GET` | `/provider/patient/{id}` | Get a specific patient's details |

### Public APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/public/topics` | List available health topics |
| `GET` | `/public/articles/{topic}` | Get articles for a topic |
| `GET` | `/public/privacy-policy` | View privacy policy |

---

## 🗄 Database Collections

The system uses the following MongoDB collections:

- `users`
- `patients`
- `goals`
- `goal_logs`
- `health_tips`
- `health_articles`
- `reminders`

**Example user document:**
```json
{
  "email": "user@gmail.com",
  "password": "hashed_password",
  "role": "patient"
}
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd server
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_atlas_connection_string
DATABASE_NAME=healthcare_db
JWT_SECRET=your_secret_key
```

### 4. Run the Server
```bash
uvicorn app.main:app --reload
```

The backend will be available at:

- **API Base URL:** `http://localhost:8000`
- **Swagger Docs:** `http://localhost:8000/docs`

---

## 🌐 CORS Configuration

CORS is configured to allow frontend access:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📄 License

This project was developed for the **HCL Hackathon**. All rights reserved.
