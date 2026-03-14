from app.database import db

async def generate_health_tip(user_id: str):

    goals = await db.wellness_goals.find_one({"user_id": user_id})
    log = await db.goal_logs.find_one({"user_id": user_id}, sort=[("_id", -1)])

    if not goals or not log:
        return {"tip": "Start tracking your activity to receive health tips."}

    tips = []

    if log.get("water_intake", 0) < goals.get("water_goal", 0):
        tips.append("Drink more water to stay hydrated.")

    if log.get("sleep_hours", 0) < goals.get("sleep_goal", 0):
        tips.append("Try to get at least 7–8 hours of sleep.")

    if log.get("steps", 0) < goals.get("steps_goal", 0):
        tips.append("A short walk today can help you reach your step goal.")

    if log.get("active_minutes", 0) < goals.get("active_minutes_goal", 0):
        tips.append("Try adding a short workout to increase activity.")

    if not tips:
        tips.append("Great job! You're meeting your wellness goals.")

    return {"tips": tips}