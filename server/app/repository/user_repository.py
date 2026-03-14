from app.database import db

async def get_user_by_email_role(email: str, role: str):
    return await db.users.find_one({
        "email": email,
        "role": role
    })

async def create_user(user_data: dict):
    result = await db.users.insert_one(user_data)
    return str(result.inserted_id)
