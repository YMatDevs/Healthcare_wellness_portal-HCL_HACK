from pydantic import BaseModel
from datetime import date

class Reminder(BaseModel):
    title: str
    reminder_date: date