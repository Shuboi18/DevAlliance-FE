// Use dynamic origin if in production (served by backend), or localhost for dev
// If we are in development mode, we might be on localhost OR on a remote server IP (e.g. EC2)
// So we use window.location.hostname to determine the IP, and assume backend is on port 3000
const hostname = window.location.hostname;
export const BASE_URL = `http://${hostname}:3000`;

export const getProfileImageUrl = (url) => {
    if (!url) return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

    // If the URL is a local localhost URL but we are not on localhost (e.g. EC2),
    // replace localhost:3000 with the dynamic BASE_URL.
    if (url.includes("localhost:3000") && hostname !== "localhost") {
        return url.replace("http://localhost:3000", BASE_URL);
    }
    return url;
};
