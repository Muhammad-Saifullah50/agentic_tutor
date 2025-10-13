from typing import Optional
from pydantic import AnyUrl, BaseModel

class Place(BaseModel):
    id: int
    title: str
    description: str
    price: str | int
    thumbnail: Optional[AnyUrl] = None  
