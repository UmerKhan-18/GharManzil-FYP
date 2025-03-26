import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true, // Ensures the JWT token is sent with the request
});

export default apiRequest;
