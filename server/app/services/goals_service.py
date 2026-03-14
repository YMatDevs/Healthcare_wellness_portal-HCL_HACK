from app.repositories.goals_repository import (
    get_goals,
    create_goals,
    update_goals
)

async def fetch_goals(user_id):

    goals = await get_goals(user_id)

    if goals:
        goals["_id"] = str(goals["_id"])

    return goals


async def save_goals(user_id, data):

    existing = await get_goals(user_id)

    goal_data = data.dict()
    goal_data["user_id"] = user_id

    if existing:
        await update_goals(user_id, goal_data)
        return {"message": "Goals updated"}

    await create_goals(goal_data)

    return {"message": "Goals created"}