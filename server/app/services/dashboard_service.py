from app.database import db

async def get_dashboard(user_id: str):

    goals = await db.wellness_goals.find_one({"user_id": user_id})
    log = await db.goal_logs.find_one({"user_id": user_id}, sort=[("_id", -1)])

    dashboard = {}

    if goals and log:

        dashboard = {
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

    return dashboard