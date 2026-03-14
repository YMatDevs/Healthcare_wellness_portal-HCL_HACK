from app.database import db

async def get_provider_patients(provider_id: str):

    mappings = db.patient_provider_map.find({"provider_id": provider_id})

    patients = []

    async for m in mappings:

        patient = await db.patient_profiles.find_one({"user_id": m["patient_id"]})

        if patient:
            patient["_id"] = str(patient["_id"])
            patients.append(patient)

    return patients


async def get_patient_progress(patient_id: str):

    goals = await db.wellness_goals.find_one({"user_id": patient_id})
    log = await db.goal_logs.find_one({"user_id": patient_id}, sort=[("_id", -1)])

    if not goals or not log:
        return {"message": "No activity data"}

    return {
        "steps": {
            "current": log.get("steps", 0),
            "target": goals.get("steps_goal", 0)
        },
        "water": {
            "current": log.get("water_intake", 0),
            "target": goals.get("water_goal", 0)
        },
        "sleep": {
            "current": log.get("sleep_hours", 0),
            "target": goals.get("sleep_goal", 0)
        },
        "active_minutes": {
            "current": log.get("active_minutes", 0),
            "target": goals.get("active_minutes_goal", 0)
        }
    }