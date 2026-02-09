import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeUserInfo } from "../assets/UserSlice";
import axios from "axios";
import { LogOut, User, Users, Bell, Code2, Moon, Sun, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { BASE_URL, getProfileImageUrl } from "../utils/config";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const buttonLogout = async () => {
        try {
            await axios.post(BASE_URL + "/user/logout", {}, { withCredentials: true });
            dispatch(removeUserInfo());
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    return (
        <div className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-xl border-b border-base-content/5 shadow-sm supports-[backdrop-filter]:bg-base-100/60 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <Code2 className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            DevAlliance
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {user && (
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/UserConnectionList" className="flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors group">
                                <Users size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Connections</span>
                            </Link>
                            <Link to="/PendingConnectionList" className="flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors group">
                                <Bell size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Requests</span>
                            </Link>
                            <Link to="/chat" className="flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors group">
                                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Chat</span>
                            </Link>
                        </div>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-primary transition-colors">
                            <input type="checkbox" className="theme-controller" value="dark" />
                            <Sun className="swap-off h-5 w-5" />
                            <Moon className="swap-on h-5 w-5" />
                        </label>

                        {user ? (
                            <div className="flex items-center gap-3">
                                {/* Profile Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 hover:ring-primary transition-all">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="User Avatar"
                                                src={getProfileImageUrl(user.photoURL)}
                                                onError={(e) => { e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }}
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow-2xl border border-base-content/5">
                                        <li className="px-4 py-3 bg-base-200/50 rounded-t-lg border-b border-base-content/5 mb-2">
                                            <p className="font-bold text-base">{user.fname} {user.lname}</p>
                                            <p className="text-xs text-base-content/60 truncate">{user.email || "Developer"}</p>
                                        </li>
                                        <li>
                                            <Link to="/profiledashboard" className="py-3 font-medium hover:bg-base-200 rounded-lg">
                                                <User size={16} /> Profile
                                            </Link>
                                        </li>
                                        <div className="divider my-1"></div>
                                        <li>
                                            <button onClick={buttonLogout} className="text-error hover:bg-error/10 hover:text-error py-3 font-medium rounded-lg">
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {/* Mobile Menu Button */}
                                <button className="btn btn-ghost btn-circle md:hidden text-base-content/70" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="btn btn-ghost btn-sm font-medium hover:bg-base-200">Login</Link>
                                <Link to="/signup" className="btn btn-primary btn-sm rounded-full px-6 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && user && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-base-100/95 backdrop-blur-xl border-b border-base-content/5 shadow-xl animate-in slide-in-from-top-2 z-40">
                    <div className="flex flex-col p-4 space-y-2">
                        <Link to="/UserConnectionList" className="btn btn-ghost justify-start w-full text-left" onClick={() => setIsMobileMenuOpen(false)}>
                            <Users size={20} className="mr-2" /> My Connections
                        </Link>
                        <Link to="/PendingConnectionList" className="btn btn-ghost justify-start w-full text-left" onClick={() => setIsMobileMenuOpen(false)}>
                            <Bell size={20} className="mr-2" /> Pending Requests
                        </Link>
                        <Link to="/chat" className="btn btn-ghost justify-start w-full text-left" onClick={() => setIsMobileMenuOpen(false)}>
                            <MessageCircle size={20} className="mr-2" /> Chat
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar