"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue with Leaflet + Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

// Dummy buoy data
const buoyLocations = [
  {
    id: 1,
    name: "Buoy A",
    lat: 37.7749,
    lng: -122.4194,
    status: "normal",
  },
  {
    id: 2,
    name: "Buoy B",
    lat: 37.8044,
    lng: -122.2712,
    status: "critical",
  },
  {
    id: 3,
    name: "Buoy C",
    lat: 37.6879,
    lng: -122.4702,
    status: "warning",
  },
];

const MapPanel = () => {
  return (
    <div className="rounded-md overflow-hidden shadow border h-[400px]">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {buoyLocations.map((buoy) => (
          <Marker key={buoy.id} position={[buoy.lat, buoy.lng]}>
            <Popup>
              <div>
                <strong>{buoy.name}</strong>
                <br />
                Status:{" "}
                <span
                  className={`font-bold ${
                    buoy.status === "normal"
                      ? "text-green-600"
                      : buoy.status === "warning"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {buoy.status.toUpperCase()}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPanel;
