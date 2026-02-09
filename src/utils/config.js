// Use dynamic origin if in production (served by backend), or localhost for dev
// If we are in development mode, we might be on localhost OR on a remote server IP (e.g. EC2)
// So we use window.location.hostname to determine the IP, and assume backend is on port 3000
const hostname = window.location.hostname;
export const BASE_URL = `http://${hostname}:3000`;
