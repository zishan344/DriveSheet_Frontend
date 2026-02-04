import axios from "axios";

const API = axios.create({
  baseURL: "https://drivesheet.vercel.app/api/",
});

// Add request interceptor for debugging
API.interceptors.request.use((config) => {
  console.log("API Request:", config.method?.toUpperCase(), config.url);
  return config;
});

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.message, error.config?.url);
    return Promise.reject(error);
  }
);

export const createTrip = (data) => API.post("/trips/", data);
export const getTrip = (id) => API.get(`/trips/${id}/`);
export const getTrips = () => API.get("/trips/");
export const getRouteStops = (id) => API.get(`/trips/${id}/map/`);
export const getLogs = (id) => API.get(`/trips/${id}/logs/`);
