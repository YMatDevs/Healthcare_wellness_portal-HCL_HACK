from fastapi import Request, HTTPException
from jose import jwt, JWTError
from app.config import settings

async def get_current_user(request: Request):

    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:

        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])

        user_id = payload.get("user_id")
        role = payload.get("role")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {
            "user_id": user_id,
            "role": role
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
