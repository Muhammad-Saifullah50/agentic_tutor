
from pydantic import BaseModel
from typing import  Optional

class DailyForecast(BaseModel):
    date: str
    condition: Optional[str]
    max_temp_c: Optional[float]
    min_temp_c: Optional[float]
    chance_of_rain_pct: Optional[int]
    avg_humidity: Optional[int]
    sunrise: Optional[str]
    sunset: Optional[str]
    location: Optional[str]


