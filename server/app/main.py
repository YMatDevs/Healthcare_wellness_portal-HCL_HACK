from fastapi import FastAPI
from app.routes import health_routes, auth_routes

app = FastAPI(title="Healthcare Portal API")

app.include_router(health_routes.router)
app.include_router(auth_routes.router)