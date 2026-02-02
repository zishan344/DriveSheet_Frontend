import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { createTrip } from "../services/api";
import { useNavigate } from "react-router-dom";

const TripForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    drop_location: "",
    cycle_used_hours: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await createTrip(form);
    navigate(`/trip/${res.data.trip_id}`);
  };

  return (
    <Stack spacing={2}>
      <TextField label="Current Location" name="current_location" onChange={handleChange} />
      <TextField label="Pickup Location" name="pickup_location" onChange={handleChange} />
      <TextField label="Dropoff Location" name="drop_location" onChange={handleChange} />
      <TextField
        label="Cycle Used Hours"
        name="cycle_used_hours"
        helperText="Driving + On-Duty hours already used in last 8 days"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Plan Trip
      </Button>
    </Stack>
  );
};

export default TripForm;
