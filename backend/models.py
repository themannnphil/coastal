from sqlalchemy import create_engine, Column, Integer, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Define the PostgreSQL connection string (replace with your own credentials)
DATABASE_URL = "postgresql://postgres:admin1234@localhost/coastal_db"

# Create the SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define the base class for declarative models
Base = declarative_base()

# Define the Metric model (database table)
class Metric(Base):
    __tablename__ = 'metrics'

    id = Column(Integer, primary_key=True, index=True)
    water_height = Column(Float, nullable=False)
    wave_height = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    air_pressure = Column(Float, nullable=False)
    wind_speed = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)

# Create the table in the database
Base.metadata.create_all(bind=engine)
