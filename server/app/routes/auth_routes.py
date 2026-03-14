from fastapi import APIRouter, Response
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
        secure=False,  # True in production
        samesite="lax",
        max_age=3600 * 12
    )

    return {"message": "Login successful"}
