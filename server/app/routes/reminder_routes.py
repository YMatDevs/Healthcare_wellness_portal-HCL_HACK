from fastapi import APIRouter, Depends
from app.schemas.reminder_schema import Reminder
from app.services.reminder_service import add_reminder, fetch_reminders
from app.core.auth_dependency import get_current_user

router = APIRouter(prefix="/reminders", tags=["Reminders"])

@router.post("/")
async def create(data: Reminder, current_user = Depends(get_current_user)):
    return await add_reminder(current_user["user_id"], data)

@router.get("/")
async def get(current_user = Depends(get_current_user)):
    return await fetch_reminders(current_user["user_id"])