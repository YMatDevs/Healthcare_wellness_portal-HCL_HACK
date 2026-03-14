from fastapi import APIRouter, Depends
from app.schemas.patient_schema import PatientProfile
from app.services.patient_service import fetch_patient_profile, save_patient_profile
from app.core.auth_dependency import get_current_user

router = APIRouter(prefix="/patients", tags=["Patients"])


@router.get("/me")
async def get_my_profile(current_user = Depends(get_current_user)):

    user_id = current_user["user_id"]

    profile = await fetch_patient_profile(user_id)

    return {"profile": profile}


@router.put("/me")
async def update_my_profile(
    data: PatientProfile,
    current_user = Depends(get_current_user)
):

    user_id = current_user["user_id"]

    return await save_patient_profile(user_id, data)