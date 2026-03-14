from fastapi import APIRouter, Depends
from app.schemas.goals_schema import WellnessGoal
from app.services.goals_service import fetch_goals, save_goals
from app.core.auth_dependency import get_current_user
#goal routes
router = APIRouter(prefix="/goals", tags=["Wellness Goals"])


@router.get("/")
async def get_my_goals(current_user = Depends(get_current_user)):

    user_id = current_user["user_id"]

    goals = await fetch_goals(user_id)

    return {"goals": goals}


@router.post("/")
async def create_or_update_goals(
    data: WellnessGoal,
    current_user = Depends(get_current_user)
):

    user_id = current_user["user_id"]

    return await save_goals(user_id, data)
