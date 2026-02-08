// Use dynamic origin if in production (served by backend), or localhost for dev
export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";
