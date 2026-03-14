from fastapi import APIRouter, Depends
from app.schemas.goal_log_schema import GoalLog
from app.services.goal_log_service import log_daily_activity, fetch_logs
from app.core.auth_dependency import get_current_user

router = APIRouter(prefix="/logs", tags=["Goal Logs"])


@router.post("/")
async def create_log(data: GoalLog, current_user = Depends(get_current_user)):

    user_id = current_user["user_id"]

    return await log_daily_activity(user_id, data)


@router.get("/")
async def get_my_logs(current_user = Depends(get_current_user)):

    user_id = current_user["user_id"]

    return await fetch_logs(user_id)