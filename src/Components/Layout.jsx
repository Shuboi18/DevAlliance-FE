import { Outlet, useNavigate, useLocation } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { addUserInfo } from "../assets/userSlice"
import { useEffect } from "react"

import { Toaster } from "react-hot-toast"

import { BASE_URL } from "../utils/config"

// Layout Component acting as Auth Wrapper and Main Layout
const Layout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const location = useLocation();

    const fetchUser = async () => {
        // If user is already set, we might still want to check redirection if they navigate to login
        // But the useEffect below handles [user] changes.
        if (user) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/getProfile", { withCredentials: true })
            dispatch(addUserInfo(res?.data))
        }
        catch (err) {
            // Only redirect if explicitly unauthorized for protected routes.
            if (err.response?.status === 401) {
                // Check if we are already on a public route to avoid loop
                const publicRoutes = ["/login", "/signup", "/", "/forgot-password", "/reset-password"];
                if (!publicRoutes.includes(location.pathname) && location.pathname !== "/") {
                    // Note: location.pathname might be compared loosely or strictly.
                    navigate("/login");
                }
            }
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    // Redirect logged-in users away from auth pages
    useEffect(() => {
        if (user) {
            const authPages = ["/login", "/signup", "/forgot-password", "/reset-password"];
            if (authPages.includes(location.pathname)) {
                navigate("/getUserFeed");
            }
        }
    }, [user, location.pathname, navigate]);

    return (
        <div className="flex flex-col min-h-screen w-full font-inter">
            <Toaster />
            <NavBar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default Layout
