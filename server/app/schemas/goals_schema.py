from pydantic import BaseModel
from typing import Optional

class WellnessGoal(BaseModel):
    steps_goal: Optional[int] = 0
    water_goal: Optional[int] = 0
    sleep_goal: Optional[int] = 0
    active_minutes_goal: Optional[int] = 0
#goals schema
