from pydantic import BaseModel
from typing import Optional

class GoalLog(BaseModel):
    steps: Optional[int] = 0
    water_intake: Optional[int] = 0
    sleep_hours: Optional[int] = 0
    active_minutes: Optional[int] = 0