from app.repository.goal_log_repository import create_log, get_logs

async def log_daily_activity(user_id, data):

    log_data = data.dict()
    log_data["user_id"] = user_id

    await create_log(log_data)

    return {"message": "Daily activity logged"}


async def fetch_logs(user_id):

    logs = await get_logs(user_id)

    return {"logs": logs}