from pydantic import BaseModel
from typing import Optional, List

class PatientProfile(BaseModel):
    age: Optional[int]
    gender: Optional[str]
    allergies: Optional[List[str]]
    medications: Optional[List[str]]
    medical_history: Optional[List[str]]