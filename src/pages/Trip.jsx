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
    <Box sx={{
      minHeight: "calc(100vh - 80px)",
      background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
      py: 4,
    }}>
      <Container maxWidth="lg">
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
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, color: "#111827" }}>
              My Trips
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280" }}>
              Manage and view all your trip plans
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/")}
            size="large"
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
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
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, #2563eb 0%, #8b5cf6 100%)",
                    },
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "#2563eb",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Route Header */}
                    <Box sx={{ mb: 2.5 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#111827",
                          lineHeight: 1.3,
                        }}
                      >
                        {trip.pickup_location || "Pickup"} → {trip.drop_location || "Dropoff"}
                      </Typography>
                      <Chip
                        label={`ID: ${trip.id.substring(0, 8)}...`}
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
                          color: "#7c3aed",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          border: "none",
                        }}
                      />
                    </Box>

                    {/* Trip Stats */}
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 1.5,
                          borderRadius: 2,
                          background: "#f9fafb",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500 }}>
                          Distance:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                          {trip.total_distance_miles
                            ? `${trip.total_distance_miles.toFixed(1)} mi`
                            : "N/A"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 1.5,
                          borderRadius: 2,
                          background: "#f9fafb",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500 }}>
                          Duration:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                          {trip.total_duration_hours
                            ? `${trip.total_duration_hours.toFixed(1)} hrs`
                            : "N/A"}
                        </Typography>
                      </Box>
                      {trip.cycle_used_hours && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 1.5,
                            borderRadius: 2,
                            background: "#f9fafb",
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500 }}>
                            Cycle Used:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                            {trip.cycle_used_hours.toFixed(1)} hrs
                          </Typography>
                        </Box>
                      )}
                      {trip.created_at && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 1.5,
                            borderRadius: 2,
                            background: "#f9fafb",
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500 }}>
                            Created:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                            {new Date(trip.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>

                  {/* Action Button */}
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/trip/${trip.id}`)}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                        },
                      }}
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
    </Box>
  );
};

export default Trip;

