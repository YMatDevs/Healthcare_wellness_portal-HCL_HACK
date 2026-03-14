from fastapi import APIRouter, Depends
from app.core.auth_dependency import get_current_user
from app.services.health_tip_service import generate_health_tip

router = APIRouter(prefix="/health-tip", tags=["Health Tips"])


@router.get("/")
async def get_health_tip(current_user = Depends(get_current_user)):

    user_id = current_user["user_id"]

    return await generate_health_tip(user_id)