from dotenv import load_dotenv
from sqlmodel import create_engine, Session, SQLModel, select
import os

load_dotenv()

DATABASE_URL = os.getenv("TURSO_URL")
DATABASE_AUTH_TOKEN = os.getenv("TURSO_TOKEN")

engine = create_engine(DATABASE_URL+"/?authToken="+DATABASE_AUTH_TOKEN)

SQLModel.metadata.create_all(engine)

def get_db():
    with Session(engine) as session:
        yield session



