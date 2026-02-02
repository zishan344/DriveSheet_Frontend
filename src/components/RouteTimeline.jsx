import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const RouteTimeline = ({ stops }) => {
  const getTypeColor = (type) => {
    const colors = {
      PICKUP: "#4caf50",
      DRIVING: "#2196f3",
      BREAK: "#ff9800",
      ON_DUTY: "#ff9800",
      OFF_DUTY: "#9e9e9e",
      SLEEPER: "#9c27b0",
      DROPOFF: "#f44336",
    };
    return colors[type] || "#666";
  };

  const formatTime = (minutes) => {
    if (!minutes) return "-";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (!stops || stops.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="caption" color="textSecondary">
            No stops data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "flex-start",
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "2px",
            },
          }}
        >
          {stops.map((s, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.75,
                minWidth: "90px",
                flexShrink: 0,
              }}
            >
              {/* Step dot */}
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: getTypeColor(s.type),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    transform: "scale(1.1)",
                  },
                }}
              >
                {i + 1}
              </Box>

              {/* Type label */}
              <Chip
                label={s.type}
                size="small"
                sx={{
                  height: 22,
                  backgroundColor: getTypeColor(s.type),
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  maxWidth: "85px",
                }}
              />

              {/* Day */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, fontSize: "0.7rem", color: "#666", justifyContent: "center" }}>
                <AccessTimeIcon sx={{ fontSize: "0.75rem" }} />
                <span>D{s.day_number}</span>
              </Box>

              {/* Duration */}
              {s.duration_minutes && (
                <Typography variant="caption" sx={{ color: "#999", fontSize: "0.65rem", textAlign: "center" }}>
                  {formatTime(s.duration_minutes)}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteTimeline;
