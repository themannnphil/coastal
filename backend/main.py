from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from pydantic import BaseModel

from .models import Metric as MetricModel
from .database import get_db

app = FastAPI()

# -----------------------------
# Pydantic Schemas
# -----------------------------
class SensorData(BaseModel):
    wave_height: float
    water_height: float
    temperature: float
    humidity: float
    air_pressure: float
    wind_speed: float
    timestamp: datetime

class MetricResponse(BaseModel):
    id: int
    wave_height: float
    temperature: float
    wind_speed: float
    timestamp: datetime

    class Config:
        orm_mode = True

# -----------------------------
# POST: /api/ingest
# -----------------------------
@app.post("/api/ingest")
async def ingest_data(sensor_data: SensorData, db: Session = Depends(get_db)):
    metric = MetricModel(**sensor_data.dict())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return {"message": "Data ingested successfully", "data": metric}

# -----------------------------
# GET: /api/metrics?timeframe=
# -----------------------------
@app.get("/api/metrics", response_model=List[MetricResponse])
async def get_metrics(timeframe: Optional[str] = "24h", db: Session = Depends(get_db)):
    now = datetime.utcnow()

    if timeframe == "24h":
        since = now - timedelta(hours=24)
    elif timeframe == "7d":
        since = now - timedelta(days=7)
    elif timeframe == "30d":
        since = now - timedelta(days=30)
    else:
        raise HTTPException(status_code=400, detail="Invalid timeframe")

    metrics = db.query(MetricModel).filter(MetricModel.timestamp >= since).all()
    return metrics

# -----------------------------
# GET: /api/logs
# -----------------------------
@app.get("/api/logs")
async def get_logs():
    logs = [{"timestamp": "2025-06-04T10:00:00Z", "message": "High wind speed detected!"}]
    return {"logs": logs}

# -----------------------------
# GET: /api/location
# -----------------------------
@app.get("/api/location")
async def get_location():
    location = {"latitude": 5.6506, "longitude": 0.0166}  # Example: Keta, Ghana
    return {"location": location}
# -----------------------------