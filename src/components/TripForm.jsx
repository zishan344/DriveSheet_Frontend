import { TextField, Button, Stack, CircularProgress, Box, Alert } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validation
      if (!form.current_location || !form.pickup_location || !form.drop_location) {
        setError("Please fill in all location fields");
        setLoading(false);
        return;
      }

      console.log("📤 Submitting trip form:", form);
      const res = await createTrip(form);
      console.log("✅ Trip created:", res.data);

      setLoading(false);
      navigate(`/trip/${res.data.trip_id}`);
    } catch (err) {
      console.error("❌ Error creating trip:", err);
      setError(err.response?.data?.detail || err.message || "Failed to create trip. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        label="Current Location"
        name="current_location"
        value={form.current_location}
        onChange={handleChange}
        disabled={loading}
        placeholder="e.g., New York"
      />
      <TextField
        label="Pickup Location"
        name="pickup_location"
        value={form.pickup_location}
        onChange={handleChange}
        disabled={loading}
        placeholder="e.g., Chicago"
      />
      <TextField
        label="Dropoff Location"
        name="drop_location"
        value={form.drop_location}
        onChange={handleChange}
        disabled={loading}
        placeholder="e.g., Los Angeles"
      />
      <TextField
        label="Cycle Used Hours"
        name="cycle_used_hours"
        value={form.cycle_used_hours}
        onChange={handleChange}
        disabled={loading}
        type="number"
        inputProps={{ step: "0.5" }}
        helperText="Driving + On-Duty hours already used in last 8 days"
        placeholder="e.g., 20"
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          position: "relative",
          py: 1.2,
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            <span>Planning Trip...</span>
          </Box>
        ) : (
          "Plan Trip"
        )}
      </Button>
    </Stack>
  );
};

export default TripForm;
