import { Card } from "@mui/material";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { decodePolyline } from "../utils/polylineDecoder";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapView = ({ route, stops }) => {
  // Decode polyline string if route is a string
  const polyline = typeof route === "string" ? decodePolyline(route) : route;

  if (!polyline || polyline.length === 0) {
    return <Card sx={{ height: 400 }} />;
  }

  const center = polyline[0];

  return (
    <Card sx={{ height: 400 }}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route line */}
        <Polyline positions={polyline} color="blue" />

        {/* Stops */}
        {stops.map((s, i) => (
          s.lat && s.lng && (
            <Marker key={i} position={[s.lat, s.lng]}>
              <Popup>
                <b>{s.type}</b><br />
                Day {s.day_number}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </Card>
  );
};

export default MapView;
