import { Container, Card, CardContent, Typography, Grid, Box, Button, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import TripForm from "../components/TripForm";
import { Link as RouterLink } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MapIcon from '@mui/icons-material/Map';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Home = () => {
  return (
    <Box sx={{
      minHeight: "calc(100vh - 80px)",
      background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
      py: 6,
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                background: "white",
                height: '100%'
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  p: 3,
                  color: "white",
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <DirectionsCarIcon sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                      Trip Planner
                    </Typography>
                    <Typography sx={{ opacity: 0.95, fontSize: "0.9rem" }}>
                      Plan routes and view daily ELD logs
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <TripForm />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, color: "#111827" }}>
                    How it works
                  </Typography>
                  <List dense disablePadding>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ScheduleIcon sx={{ fontSize: 18, color: "white" }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary="Enter locations"
                        secondary="Current, pickup and dropoff locations"
                        primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9375rem" }}
                        secondaryTypographyProps={{ fontSize: "0.8125rem" }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MapIcon sx={{ fontSize: 18, color: "white" }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary="View route on map"
                        secondary="We compute and visualize the optimal route"
                        primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9375rem" }}
                        secondaryTypographyProps={{ fontSize: "0.8125rem" }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircleIcon sx={{ fontSize: 18, color: "white" }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary="Auto-generated logs"
                        secondary="Daily ELD logs created automatically"
                        primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9375rem" }}
                        secondaryTypographyProps={{ fontSize: "0.8125rem" }}
                      />
                    </ListItem>
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.8125rem", lineHeight: 1.6 }}>
                      <strong>Assumptions:</strong> 70hrs/8days cycle, 1 hour pickup/dropoff, fueling every 1000 miles
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#111827" }}>
                    Quick Links
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/trips"
                    variant="contained"
                    fullWidth
                    sx={{
                      mb: 1.5,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                    }}
                  >
                    View My Trips
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/trip/"
                    variant="outlined"
                    disabled
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                    }}
                  >
                    View Example Trip (coming soon)
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

