from pydantic import BaseModel, EmailStr

class RegisterSchema(BaseModel):
    email: EmailStr
    password: str
    role: str   # patient or provider


class LoginSchema(BaseModel):
    email: EmailStr
    password: str