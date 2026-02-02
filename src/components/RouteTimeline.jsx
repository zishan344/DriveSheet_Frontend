import { Card, CardContent, Typography } from "@mui/material";

const RouteTimeline = ({ stops }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Route Timeline</Typography>
        {stops.map((s, i) => (
          <Typography key={i}>
            Day {s.day_number}: {s.type} ({s.start_minute} - {s.end_minute})
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default RouteTimeline;
