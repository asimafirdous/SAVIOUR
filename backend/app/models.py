from sqlalchemy import Column, Integer, String

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    google_id = Column(String, unique=True, nullable=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True)

    profile_picture = Column(String, nullable=True)