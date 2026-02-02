import { Grid, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrip, getRouteStops, getLogs } from "../services/api";
import MapView from "../components/MapView";
import RouteTimeline from "../components/RouteTimeline";
import DailyLogGrid from "../components/DailyLogGrid";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [stops, setStops] = useState([]);
  const [logs, setLogs] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    getTrip(id).then(res => {
      setTrip(res.data);
      setRoute(res.data.geometry); // Decode if needed or pass to MapView
    });
    getRouteStops(id).then(res => {
      setStops(res.data.route_stops);
      // If geometry is in map endpoint, use it
      if (res.data.geometry) {
        setRoute(res.data.geometry);
      }
    });
    getLogs(id).then(res => setLogs(res.data.daily_logs));
  }, [id]);

  if (!trip) return null;

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <MapView route={route} stops={stops} />
        </Grid>

        <Grid item xs={12} md={5}>
          <RouteTimeline stops={stops} />
        </Grid>

        <Grid item xs={12}>
          <DailyLogGrid logs={logs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TripDetails;
