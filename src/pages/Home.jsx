import { Container, Card, CardContent, Typography } from "@mui/material";
import TripForm from "../components/TripForm";

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Trip Planner
          </Typography>
          <TripForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
