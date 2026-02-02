import {Container,Card,CardContent,Typography,Grid,Box,Button,Divider,List,ListItem,ListItemText} from "@mui/material";
import TripForm from "../components/TripForm";
import { Link as RouterLink } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MapIcon from '@mui/icons-material/Map';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <DirectionsCarIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Trip Planner</Typography>
                  <Typography color="textSecondary">Plan routes, view daily ELD logs, and inspect trip details.</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <TripForm />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Card elevation={1} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>How it works</Typography>
                <List dense>
                  <ListItem>
                    <ScheduleIcon sx={{ mr: 1 }} />
                    <ListItemText primary="Enter current, pickup and dropoff locations" />
                  </ListItem>
                  <ListItem>
                    <MapIcon sx={{ mr: 1 }} />
                    <ListItemText primary="We compute a route and draw it on the map" />
                  </ListItem>
                  <ListItem>
                    <DirectionsCarIcon sx={{ mr: 1 }} />
                    <ListItemText primary="Daily ELD logs are auto-generated for the trip" />
                  </ListItem>
                </List>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="textSecondary">Assumptions: 70hrs/8days cycle, 1 hour pickup/dropoff, fueling every 1000 miles.</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Quick Links</Typography>
                <Button component={RouterLink} to="/trips" variant="outlined" fullWidth sx={{ mb: 1 }}>View My Trips</Button>
                <Button component={RouterLink} to="/trip/" variant="text" disabled fullWidth>View Example Trip (coming)</Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
