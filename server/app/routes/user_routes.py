from fastapi import APIRouter, Depends
from app.core.auth_dependency import get_current_user
from app.services.user_service import get_user_profile

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me")
async def get_my_profile(current_user = Depends(get_current_user)):

    user = await get_user_profile(current_user["user_id"])

    return {
        "message": "User profile fetched",
        "user": user
    }