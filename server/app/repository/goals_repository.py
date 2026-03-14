from app.database import db
#goals repository
async def get_goals(user_id: str):
    return await db.wellness_goals.find_one({"user_id": user_id})


async def create_goals(data: dict):
    result = await db.wellness_goals.insert_one(data)
    return str(result.inserted_id)


async def update_goals(user_id: str, data: dict):
    await db.wellness_goals.update_one(
        {"user_id": user_id},
        {"$set": data}
    )