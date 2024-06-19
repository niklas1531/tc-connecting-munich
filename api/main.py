from datetime import datetime, time, timedelta
from typing import Annotated, Union
from uuid import UUID

from fastapi import Body, FastAPI, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None
    start_datetime: Annotated[datetime, Body()]


@app.get("/", status_code= status.HTTP_201_CREATED)
def read_root():
    return {"Hello": "World"}


@app.get("/proposals")


@app.get("/glossaries")

@app.post("/uploadfile")
async def create_upload_file(file: Union[UploadFile, None] = None):
    reader = PdfReader(file)
    number_of_pages = len(reader.pages)
    page = reader.pages[0]
    text = page.extract_text()
    print(text)
    if not file:
        return {"message": "No upload file sent"}
    else:
        return {"filename": file.filename}