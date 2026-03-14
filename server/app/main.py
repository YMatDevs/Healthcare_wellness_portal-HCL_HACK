from fastapi import FastAPI
from app.routes import health_routes, auth_routes, patient_routes, user_routes,goal_log_routes,dashboard_routes
from app.routes import health_tip_routes
app = FastAPI(title="Healthcare Portal API")

app.include_router(health_routes.router)
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(patient_routes.router)
app.include_router(goal_log_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(health_tip_routes.router)