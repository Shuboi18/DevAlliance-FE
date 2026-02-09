import { createHashRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App.jsx";
import Login from "./Login";

// Lazy loading components
const Signup = lazy(() => import("./Signup"));
// Body is now just a wrapper for Layout, might not need lazy loading if used immediately, 
// but sticking to lazy for all non-critical initial routes if desired.
// However, since Body is the layout for "/" it might be better to import it directly or use Layout directly.
// The original code used Body as a specific element in comments, but not active.
// Let's lazy load the heavy interaction pages.
const UserProfile = lazy(() => import("./UserProfile.jsx"));
const UserFeed = lazy(() => import("./UserFeed.jsx"));
const MyConnections = lazy(() => import("./MyConnections.jsx"));
const PendingConnections = lazy(() => import("./PendingConnections.jsx"));
const Chat = lazy(() => import("./Chat.jsx"));
const LandingPage = lazy(() => import("./LandingPage.jsx"));
const ForgotPassword = lazy(() => import("./ForgotPassword.jsx"));

// Loading fallback
const Loading = () => (
    <div className="flex h-screen w-full items-center justify-center bg-base-100">
        <span className="loading loading-infinity loading-lg text-primary"></span>
    </div>
);

const router = createHashRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <LandingPage />
        },
        {
            path: "/signup",
            element: (
                <Suspense fallback={<Loading />}>
                    <Signup />
                </Suspense>
            )
        },
        // Login is usually critical, keeping it eager or lazy is fine. 
        // Keeping eager for faster perceived initial interaction if landing on login.
        { path: "/login", element: <Login /> },
        {
            path: "/forgot-password",
            element: (
                <Suspense fallback={<Loading />}>
                    <ForgotPassword />
                </Suspense>
            )
        },

        {
            path: "/profiledashboard",
            element: (
                <Suspense fallback={<Loading />}>
                    <UserProfile />
                </Suspense>
            )
        },
        {
            path: "/getUserFeed",
            element: (
                <Suspense fallback={<Loading />}>
                    <UserFeed />
                </Suspense>
            )
        },
        {
            path: "/UserConnectionList",
            element: (
                <Suspense fallback={<Loading />}>
                    <MyConnections />
                </Suspense>
            )
        },
        {
            path: "/PendingConnectionList",
            element: (
                <Suspense fallback={<Loading />}>
                    <PendingConnections />
                </Suspense>
            )
        },
        {
            path: "/chat",
            element: (
                <Suspense fallback={<Loading />}>
                    <Chat />
                </Suspense>
            )
        }
    ]
}])

export default router;