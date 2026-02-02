import { Card, CardContent, Typography, Box, Stack, Tooltip } from "@mui/material";

const colors = {
  DRIVING: "#1976d2",
  ON_DUTY: "#ed6c02",
  OFF: "#9e9e9e",
  OFF_DUTY: "#9e9e9e",
  SLEEPER: "#9c27b0",
  BREAK: "#ed6c02",
};

const statusLabels = {
  DRIVING: "Driving",
  ON_DUTY: "On Duty",
  OFF: "Off Duty",
  OFF_DUTY: "Off Duty",
  SLEEPER: "Sleeping",
  BREAK: "Break",
};

const statusDescriptions = {
  DRIVING: "Vehicle is in motion - driver is actively driving",
  ON_DUTY: "Driver is on duty but not driving (paperwork, inspection, etc)",
  OFF: "Off duty - driver is not working",
  OFF_DUTY: "Off duty - driver is not working",
  SLEEPER: "Driver is in sleeper berth - sleeping",
  BREAK: "Driver is on a required break",
};

const DailyLogCard = ({ day }) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  const getTotalTime = (status) => {
    const total = day.log_segments
      .filter((seg) => seg.status === status)
      .reduce((sum, seg) => sum + (seg.end_minute - seg.start_minute), 0);
    
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 1, borderRadius: 1.5 }}>
      <CardContent>
        {/* Header */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Day {day.day_number} – {day.date}
        </Typography>

        {/* Bar Chart */}
        <Box
          sx={{
            position: "relative",
            height: 60,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            mb: 2,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        >
          {day.log_segments.map((seg, i) => (
            <Tooltip
              key={i}
              title={`${statusLabels[seg.status]} - ${formatTime(seg.start_minute)} to ${formatTime(seg.end_minute)}`}
              arrow
            >
              <Box
                sx={{
                  position: "absolute",
                  left: `${(seg.start_minute / 1440) * 100}%`,
                  width: `${((seg.end_minute - seg.start_minute) / 1440) * 100}%`,
                  height: "100%",
                  bgcolor: colors[seg.status],
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  "&:hover": {
                    opacity: 0.8,
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "white",
                  minWidth: "50px",
                }}
              >
                {((seg.end_minute - seg.start_minute) / 1440) * 100 > 8 && statusLabels[seg.status]}
              </Box>
            </Tooltip>
          ))}
        </Box>

        {/* Legend / Summary */}
        <Stack spacing={0.75}>
          {Object.keys(colors).map((status) => {
            const segments = day.log_segments.filter((seg) => seg.status === status);
            if (segments.length === 0) return null;

            return (
              <Box
                key={status}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 0.75,
                  backgroundColor: "#fafafa",
                  borderRadius: 0.75,
                  border: `1px solid ${colors[status]}40`,
                }}
              >
                {/* Color dot */}
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: colors[status],
                    flexShrink: 0,
                  }}
                />

                {/* Label and description */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                    {statusLabels[status]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666", fontSize: "0.7rem" }}>
                    {statusDescriptions[status]}
                  </Typography>
                </Box>

                {/* Total time */}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    minWidth: "60px",
                    textAlign: "right",
                  }}
                >
                  {getTotalTime(status)}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DailyLogCard;
