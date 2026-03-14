from app.database import db

async def create_reminder(data: dict):
    result = await db.reminders.insert_one(data)
    return str(result.inserted_id)

async def get_reminders(user_id: str):
    reminders = []
    cursor = db.reminders.find({"user_id": user_id})

    async for r in cursor:
        r["_id"] = str(r["_id"])
        reminders.append(r)

    return reminders