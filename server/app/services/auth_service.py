from app.repository.user_repository import get_user_by_email_role, create_user
from app.core.hashing import hash_password, verify_password
from app.core.jwt_handler import create_access_token
from fastapi import HTTPException


async def register_user(data):

    existing_user = await get_user_by_email_role(data.email, data.role)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail=f"{data.role} already registered with this email"
        )

    user = {
        "email": data.email,
        "password": hash_password(data.password),
        "role": data.role
    }

    user_id = await create_user(user)

    return {
        "message": f"{data.role} account created",
        "user_id": user_id
    }
async def login_user(data):

    user = await get_user_by_email_role(data.email, data.role)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": str(user["_id"]), "role": user["role"]})

    return {"access_token": token, "token_type": "bearer"}
