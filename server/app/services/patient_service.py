from app.repository.patient_repository import (
    get_patient_profile,
    create_patient_profile,
    update_patient_profile
)

async def fetch_patient_profile(user_id):

    profile = await get_patient_profile(user_id)

    if profile:
        profile["_id"] = str(profile["_id"])

    return profile


async def save_patient_profile(user_id, data):

    existing = await get_patient_profile(user_id)

    profile_data = data.dict()
    profile_data["user_id"] = user_id

    if existing:
        await update_patient_profile(user_id, profile_data)
        return {"message": "Profile updated"}

    await create_patient_profile(profile_data)

    return {"message": "Profile created"}