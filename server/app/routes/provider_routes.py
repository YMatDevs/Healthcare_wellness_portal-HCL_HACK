from fastapi import APIRouter, Depends
from app.core.auth_dependency import get_current_user
from app.services.provider_service import (
    get_provider_patients,
    get_patient_progress
)

router = APIRouter(prefix="/provider", tags=["Provider Dashboard"])


@router.get("/patients")
async def list_patients(current_user = Depends(get_current_user)):

    provider_id = current_user["user_id"]

    patients = await get_provider_patients(provider_id)

    return {"patients": patients}


@router.get("/patient/{patient_id}")
async def patient_progress(patient_id: str, current_user = Depends(get_current_user)):

    progress = await get_patient_progress(patient_id)

    return {"progress": progress}