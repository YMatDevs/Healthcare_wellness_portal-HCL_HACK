from fastapi import APIRouter, Response, Depends
from app.core.auth_middleware import get_current_user
from app.schemas.auth_schema import LoginSchema, RegisterSchema
from app.services.auth_service import login_user, register_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
async def register(data: RegisterSchema):
    return await register_user(data)

@router.post("/login")
async def login(data: LoginSchema, response: Response):

    result = await login_user(data)

    token = result["access_token"]

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,        # True in production (HTTPS)
        samesite="none",     # IMPORTANT for cross-origin
        max_age=60*60*12
    )

    return {"message": "Login successful"}
@router.post("/logout")
async def logout(response: Response):

    response.delete_cookie("access_token")

    return {"message": "Logged out"}
@router.get("/verify")
async def verify_token(current_user = Depends(get_current_user)):

    return {
        "valid": True,
        "user_id": current_user["user_id"],
        "role": current_user["role"]
    }
