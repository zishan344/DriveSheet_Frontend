import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips } from "../services/api";
import AddIcon from "@mui/icons-material/Add";

const Trip = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        // Handle both array and object responses
        const tripData = Array.isArray(response.data)
          ? response.data
          : response.data.results || response.data.trips || [];
        setTrips(tripData);
        setError(null);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to load trips. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          My Trips
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/")}
          size="large"
        >
          Create New Trip
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {trips.length === 0 ? (
        <Card sx={{ textAlign: "center", p: 4 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              No trips found
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Start by creating a new trip to plan your route and track your logs.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/")}
            >
              Create Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Route Header */}
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {trip.pickup_location || "Pickup"} →{" "}
                    {trip.drop_location || "Dropoff"}
                  </Typography>

                  {/* Trip Stats */}
                  <Stack spacing={1.5} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="textSecondary">
                        Distance:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {trip.total_distance_miles
                          ? `${trip.total_distance_miles.toFixed(1)} mi`
                          : "N/A"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="textSecondary">
                        Duration:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {trip.total_duration_hours
                          ? `${trip.total_duration_hours.toFixed(1)} hrs`
                          : "N/A"}
                      </Typography>
                    </Box>
                    {trip.cycle_used_hours && (
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="textSecondary">
                          Cycle Used:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {trip.cycle_used_hours.toFixed(1)} hrs
                        </Typography>
                      </Box>
                    )}
                    {trip.created_at && (
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="textSecondary">
                          Created:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {new Date(trip.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    )}
                  </Stack>

                  {/* Trip ID Badge */}
                  <Chip
                    label={`ID: ${trip.id.substring(0, 8)}...`}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </CardContent>

                {/* Action Button */}
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/trip/${trip.id}`)}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Trip Count Footer */}
      {trips.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Showing {trips.length} trip{trips.length !== 1 ? "s" : ""}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Trip;
