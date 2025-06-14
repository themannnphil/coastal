# backend/main.py the fast api code
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from pydantic import BaseModel

from models import Metric as MetricModel
from database import get_db
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

# -----------------------------
# Pydantic Schemas
# -----------------------------

class MetricValue(BaseModel):
    value: float
    previous: float
    change: float
    status: str
    unit: str
    chartData: List[dict]  # List of dicts with "time" and "value" fields
    
    class Config:
        orm_mode = True

class MetricResponse(BaseModel):
    id: int
    wave_height: MetricValue
    water_height: MetricValue
    temperature: MetricValue
    humidity: MetricValue
    air_pressure: MetricValue
    wind_speed: MetricValue
    timestamp: datetime

    class Config:
        orm_mode = True


class SensorData(BaseModel):
    wave_height: float
    water_height: float
    temperature: float
    humidity: float
    air_pressure: float
    wind_speed: float
    timestamp: datetime




    class Config:
        orm_mode = True
    # class Config:
    #     from_attributes = True  # Updated from 'orm_mode = True'

# -----------------------------
# POST: /api/ingest
# -----------------------------
@app.post("/api/ingest")
async def ingest_data(sensor_data: SensorData, db: Session = Depends(get_db)):
    metric = MetricModel(**sensor_data.dict())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    print(f"Inserted Metric: {metric}")
    return {"message": "Data ingested successfully", "data": metric}


# -----------------------------
# GET: /api/metrics?timeframe=
# -----------------------------
# Helper function to calculate status
def get_status(value: float, thresholds: dict) -> str:
    if value < thresholds["normal"]:
        return "normal"
    elif value < thresholds["warning"]:
        return "warning"
    else:
        return "critical"
    
@app.get("/api/metrics", response_model=List[MetricResponse])
async def get_metrics(timeframe: Optional[str] = "7d", db: Session = Depends(get_db)):
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
    if not metrics:
         raise HTTPException(status_code=404, detail="No data found for the given timeframe")

    print(f"Queried Metrics: {metrics}")
    # Example thresholds for status logic
    thresholds = {
        "water_height": {"normal": 1.0, "warning": 2.0},
        "temperature": {"normal": 20.0, "warning": 30.0},
        "humidity": {"normal": 60.0, "warning": 80.0},  
        "air_pressure": {"normal": 1013.25, "warning": 1020.0},
        "wind_speed": {"normal": 10.0, "warning": 20.0},
        "wave_height": {"normal": 1.0, "warning": 3.0},
    }

    transformed_metrics = []

    for metric in metrics:
        transformed_metric = {
            "id": metric.id,
            "wave_height": MetricValue(
                value=metric.wave_height,
                previous=0,  # You'll calculate previous later
                change=0,  # You'll calculate change later
                status=get_status(metric.wave_height, thresholds["wave_height"]),
                unit="m",
                chartData=[{"time": metric.timestamp.isoformat(), "value": metric.wave_height}]
            ),
            "water_height": MetricValue(
                value=metric.water_height,
                previous=0,
                change=0,
                status=get_status(metric.water_height, thresholds["water_height"]),
                unit="m",
                chartData=[{"time": metric.timestamp.isoformat(), "value": metric.water_height}]
            ),
            "temperature": MetricValue(
                value=metric.temperature,
                previous=0,
                change=0,
                status=get_status(metric.temperature, thresholds["temperature"]),
                unit="°C",
                chartData=[{"time": metric.timestamp.isoformat(), "value": metric.temperature}]
            ),
            "humidity": MetricValue(
                value=metric.humidity,
                previous=0,
                change=0,
                status=get_status(metric.humidity, thresholds["humidity"]),
                unit="%",
                chartData=[{"time": metric.timestamp.isoformat(), "value": metric.humidity}]
            ),
            "air_pressure": MetricValue(
                value=metric.air_pressure,
                previous=0,
                change=0,
                status=get_status(metric.air_pressure, thresholds["air_pressure"]),
                unit="hPa",
                chartData=[{"time": metric.timestamp.isoformat(), "value": metric.air_pressure}]
            ),
            "wind_speed": MetricValue(
                value=metric.wind_speed,
                previous=0,
                change=0,
                status=get_status(metric.wind_speed, thresholds["wind_speed"]),
                unit="m/s",
                chartData=[{"time": metric.timestamp.isoformat(), "value": metric.wind_speed}]
            ),
            "timestamp": metric.timestamp
        }

        # Now calculate the previous value and change for each metric
        for metric_name in ["wave_height", "water_height", "temperature", "humidity", "air_pressure", "wind_speed"]:
            value = getattr(metric, metric_name)
            previous_metric = db.query(MetricModel).filter(MetricModel.timestamp < metric.timestamp).order_by(MetricModel.timestamp.desc()).first()
            previous_value = getattr(previous_metric, metric_name) if previous_metric else 0
            change = value - previous_value

            # Update the metric with the correct previous value and change
            transformed_metric[metric_name].previous = previous_value
            transformed_metric[metric_name].change = change

        transformed_metrics.append(transformed_metric)
    # print(f"GOT Metric: {transformed_metrics}")
    if not transformed_metrics:
        return {"message": "No metrics available for the specified timeframe", "data": []}

    return transformed_metrics
    


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
# Add this *after* creating your FastAPI app instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)