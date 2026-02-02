import { Box, CircularProgress, Typography } from "@mui/material";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { decodePolyline } from "../utils/polylineDecoder";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create marker icon factory by type
const createTypeIcon = (type) => {
  const colors = {
    PICKUP: "#4caf50",      // green
    DRIVING: "#2196f3",     // blue
    BREAK: "#ff9800",       // orange
    ON_DUTY: "#ff9800",     // orange
    OFF_DUTY: "#9e9e9e",    // gray
    SLEEPER: "#9c27b0",     // purple
    DROPOFF: "#f44336",     // red
  };
  
  const color = colors[type] || "#666";
  
  return L.icon({
    iconUrl: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(color)}'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/></svg>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// FitBounds component
const FitBoundsComponent = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions && positions.length > 1) {
      try {
        map.fitBounds(positions, { padding: [50, 50] });
      } catch (e) {
        console.warn("Could not fit bounds:", e);
      }
    }
  }, [map, positions]);
  return null;
};

const MapView = ({ route, stops = [] }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const polyline = typeof route === "string" ? decodePolyline(route) : route || [];

  useEffect(() => {
    setIsLoading(false);
  }, [polyline]);

  if (!polyline || polyline.length === 0) {
    return (
      <Box
        sx={{
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
        }}
      >
        <Typography color="textSecondary">No route available</Typography>
      </Box>
    );
  }

  const center = polyline[Math.floor(polyline.length / 2)];

  // Build marker positions with icons based on TYPE (not position)
  const markerData = stops.length > 0
    ? stops.map((s, i) => {
        let position = [s.lat || 0, s.lng || 0];
        if (!s.lat || !s.lng) {
          const idx = Math.floor((i / Math.max(1, stops.length - 1)) * (polyline.length - 1));
          position = polyline[Math.max(0, Math.min(polyline.length - 1, idx))];
        }
        return {
          position,
          type: s.type,
          dayNumber: s.day_number,
          index: i,
          icon: createTypeIcon(s.type),  // Color by TYPE, not position
        };
      })
    : [];

  return (
    <Box sx={{ height: 400, borderRadius: 1, overflow: "hidden", position: "relative" }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            zIndex: 1000,
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}
      <MapContainer center={center} zoom={6} style={{ height: "100%", width: "100%", borderRadius: "4px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBoundsComponent positions={polyline} />

        {/* Route polyline */}
        <Polyline positions={polyline} color="#1976d2" weight={4} opacity={0.8} lineCap="round" lineJoin="round" />

        {/* Stop markers */}
        {markerData.map((marker) => (
          <Marker key={marker.index} position={marker.position} icon={marker.icon}>
            <Popup>
              <Box sx={{ p: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Stop {marker.index + 1}
                </Typography>
                <Typography variant="caption">{marker.type}</Typography>
                <Typography variant="caption" display="block">
                  Day {marker.dayNumber}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;
