import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", boxShadow: 2 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1, px: 0 }}>
          {/* Logo / Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={() => navigate("/")}
          >
            <DirectionsCarIcon sx={{ fontSize: "2rem" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              SpotterAI
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              sx={{
                fontSize: "0.95rem",
                fontWeight: isActive("/") ? 700 : 500,
                borderBottom: isActive("/") ? "2px solid white" : "none",
                borderRadius: 0,
                pb: 0.5,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              onClick={() => navigate("/trips")}
              sx={{
                fontSize: "0.95rem",
                fontWeight: isActive("/trips") ? 700 : 500,
                borderBottom: isActive("/trips") ? "2px solid white" : "none",
                borderRadius: 0,
                pb: 0.5,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              My Trips
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
