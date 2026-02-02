import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const createTrip = (data) => API.post("/trips/", data);
export const getTrip = (id) => API.get(`/trips/${id}/`);
export const getTrips = () => API.get("/trips/");
export const getRouteStops = (id) => API.get(`/trips/${id}/map/`);
export const getLogs = (id) => API.get(`/trips/${id}/logs/`);
