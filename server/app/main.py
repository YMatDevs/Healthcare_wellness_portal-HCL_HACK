from fastapi import FastAPI
from app.routes import health_routes, auth_routes, patient_routes, user_routes,goal_log_routes,dashboard_routes
from app.routes import health_tip_routes
from app.routes import provider_routes
from app.routes import reminder_routes
from app.routes import public_routes
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="Healthcare Portal API")
# serve static
app.mount("/assets",StaticFiles(directory="../../client/dist/assets"), name="assets")
origins = ["http://10.110.177.69:5173"]
# origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app = FastAPI(title="Healthcare Portal API")

app.include_router(health_routes.router)
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(patient_routes.router)
app.include_router(goal_log_routes.router)
app.include_router(dashboard_routes.router)
app.include_router(health_tip_routes.router)
app.include_router(provider_routes.router)
app.include_router(reminder_routes.router)
app.include_router(public_routes.router)

app.get("/")
def serve_react():
    return FileResponse("../../client/dist/index.html")
