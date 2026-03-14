from app.database import db

async def get_patient_profile(user_id: str):
    return await db.patient_profiles.find_one({"user_id": user_id})


async def create_patient_profile(profile_data: dict):
    result = await db.patient_profiles.insert_one(profile_data)
    return str(result.inserted_id)


async def update_patient_profile(user_id: str, data: dict):
    await db.patient_profiles.update_one(
        {"user_id": user_id},
        {"$set": data}
    )