from app.repository.reminder_repository import create_reminder, get_reminders

async def add_reminder(user_id, data):

    reminder = data.dict()
    reminder["user_id"] = user_id

    await create_reminder(reminder)

    return {"message": "Reminder added"}

async def fetch_reminders(user_id):

    reminders = await get_reminders(user_id)

    return {"reminders": reminders}