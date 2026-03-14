from jose import jwt
from datetime import datetime, timedelta
from app.config import settings

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 12

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)

    to_encode.update({"exp": expire})

    token = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=ALGORITHM)

    return token
