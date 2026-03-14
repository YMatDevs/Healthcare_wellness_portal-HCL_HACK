from app.database import db

async def create_log(data: dict):
    result = await db.goal_logs.insert_one(data)
    return str(result.inserted_id)


async def get_logs(user_id: str):
    logs = []
    cursor = db.goal_logs.find({"user_id": user_id})

    async for log in cursor:
        log["_id"] = str(log["_id"])
        logs.append(log)

    return logs