from app.database import db

async def get_user_profile(user_id: str):

    user = await db.users.find_one({"_id": user_id})

    if user:
        user["_id"] = str(user["_id"])

    return user