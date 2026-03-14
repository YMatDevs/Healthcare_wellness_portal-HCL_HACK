from app.database import db

async def get_user_by_email(email: str):
    return await db.users.find_one({"email": email})


async def create_user(user_data: dict):

    print('email: ', user_data['email'])

    exist = await db.users.find_one({"email": user_data['email']})
    print('exist: ', exist)

    if exist is None:
        result = await db.users.insert_one(user_data)
        print(result.inserted_id)
        return str(result.inserted_id)

    if exist["role"] == user_data["role"]:
        print('Already registered as a', exist["role"])
        return exist["role"]
    else:
        print("Creating for different role")
        result = await db.users.insert_one(user_data)
        print(result.inserted_id)
        return str(result.inserted_id)