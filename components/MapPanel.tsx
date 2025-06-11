import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Dummy buoy data
const buoyLocations = [
  {
    id: 1,
    name: "Buoy Accra",
    lat: 5.6037,    // Latitude for Accra, Ghana
    lng: -0.1870,   // Longitude for Accra, Ghana
    status: "normal",
  },
  {
    id: 2,
    name: "Buoy Cape Coast",
    lat: 5.1051,    // Latitude for Cape Coast, Ghana
    lng: -1.2470,   // Longitude for Cape Coast, Ghana
    status: "critical",
  },
  {
    id: 3,
    name: "Buoy Keta",
    lat: 5.9667,    // Latitude for Keta, Ghana
    lng: 1.0131,    // 
    status: "warning",
  },
];

const MapPanel = () => {
  return (
    <div className="rounded-md overflow-hidden shadow border h-[400px]">
      <MapContainer
        center={[5.6037, -0.1870]} // Center on Accra, Ghana
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {buoyLocations.map((buoy) => {
          const customIcon = L.icon({
            iconUrl: '/leaflet/marker-icon.png',  // Custom marker icon path
            iconRetinaUrl: '/leaflet/marker-icon-2x.png',  // Custom retina marker icon
            shadowUrl: '/leaflet/marker-shadow.png',  // Custom shadow image
            iconSize: [25, 41],  // Icon size
            iconAnchor: [12, 41],  // Anchor point of the icon
            popupAnchor: [0, -41],  // Adjust the popup position
            shadowSize: [41, 41],  // Shadow size
          });

          return (
            <Marker key={buoy.id} position={[buoy.lat, buoy.lng]} icon={customIcon}>
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
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapPanel;
