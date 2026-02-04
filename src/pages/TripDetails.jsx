import { Grid, Container, Card, CardContent, Typography, CircularProgress, Box, Stack, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrip, getRouteStops, getLogs } from "../services/api";
import MapView from "../components/MapView";
import RouteTimeline from "../components/RouteTimeline";
import DailyLogGrid from "../components/DailyLogGrid";
import PublicIcon from "@mui/icons-material/Public";
import TimelineIcon from "@mui/icons-material/Timeline";
import DescriptionIcon from "@mui/icons-material/Description";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [logs, setLogs] = useState([]);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting to fetch trip details for ID:", id);

        const tripRes = await getTrip(id);
        console.log("Trip fetched:", tripRes.data);
        setTrip(tripRes.data);
        setRoute(tripRes.data.geometry);

        const stopsRes = await getRouteStops(id);
        console.log("Stops fetched:", stopsRes.data);
        setStops(stopsRes.data.route_stops || []);
        if (stopsRes.data.geometry) {
          setRoute(stopsRes.data.geometry);
        }

        const logsRes = await getLogs(id);
        console.log("Logs fetched:", logsRes.data);
        setLogs(logsRes.data.daily_logs || []);

        console.log("All data loaded successfully");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        console.error("Error message:", err.message);
        console.error("Error response:", err.response?.data);
        setError(err.response?.data?.detail || err.message || "Failed to load trip details");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "500px",
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="textSecondary">
            Loading trip details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Alert severity="error">
          <strong>Error loading trip:</strong> {error}
        </Alert>
      </Container>
    );
  }

  if (!trip) {
    return (
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Alert severity="warning">Trip not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      {/* Trip Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Trip Details
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              From
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {trip.pickup_location}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ alignSelf: "flex-end", color: "primary.main" }}>
            →
          </Typography>
          <Box>
            <Typography variant="caption" color="textSecondary">
              To
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {trip.drop_location}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Map Section */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <PublicIcon sx={{ color: "primary.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Route Map
              </Typography>
            </Box>
            <CardContent sx={{ p: 0 }}>
              <MapView route={route} stops={stops} />
            </CardContent>
          </Card>
        </Grid>

        {/* Timeline Section */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.3s ease",
              height: "100%",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <TimelineIcon sx={{ color: "success.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Route Timeline
              </Typography>
            </Box>
            <CardContent>
              <RouteTimeline stops={stops} />
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Logs Section */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <DescriptionIcon sx={{ color: "info.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Daily Logs
              </Typography>
            </Box>
            <CardContent>
              {logs.length === 0 ? (
                <Typography color="textSecondary">No daily logs available</Typography>
              ) : (
                <DailyLogGrid logs={logs} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TripDetails;
