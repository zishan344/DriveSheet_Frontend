import { Card, CardContent, Typography, Box } from "@mui/material";

const colors = {
  DRIVING: "#1976d2",
  ON_DUTY: "#ed6c02",
  OFF: "#9e9e9e",
  SLEEPER: "#9c27b0",
};

const DailyLogCard = ({ day }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          Day {day.day_number} – {day.date}
        </Typography>

        <Box sx={{ position: "relative", height: 40, bgcolor: "#eee" }}>
          {day.log_segments.map((seg, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                left: `${(seg.start_minute / 1440) * 100}%`,
                width: `${((seg.end_minute - seg.start_minute) / 1440) * 100}%`,
                height: "100%",
                bgcolor: colors[seg.status],
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DailyLogCard;
