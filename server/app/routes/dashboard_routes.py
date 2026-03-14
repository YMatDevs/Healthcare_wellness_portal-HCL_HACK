from fastapi import APIRouter, Depends
from app.core.auth_middleware import get_current_user
from app.services.dashboard_service import get_dashboard

router = APIRouter(prefix="/dashboard")


@router.get("/")
async def dashboard(current_user = Depends(get_current_user)):

    user_id = current_user["user_id"]

    return await get_dashboard(user_id)
