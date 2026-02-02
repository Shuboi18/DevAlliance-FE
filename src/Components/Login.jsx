import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../assets/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { BASE_URL } from "../utils/config";

const Login = () => {
    const [email, setemailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/user/login", {
                email,
                password
            }, { withCredentials: true });

            if (res.status === 200) {
                dispatch(addUserInfo(res?.data?.data));
                navigate("/getUserFeed");
            } else {
                console.log("Login failed");
            }
        } catch (err) {
            setErrorMessage(err?.response?.data || "Something went wrong");
            console.error(err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="card w-full max-w-md bg-base-100/80 backdrop-blur-xl shadow-2xl border border-white/20">
                <div className="card-body gap-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome Back</h2>
                        <p className="text-base-content/60 mt-2">Sign in to DevAlliance to continue</p>
                    </div>

                    <div className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-medium">Email Address</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input value={email} type="text" className="grow" placeholder="user@example.com" onChange={(event) => { setemailId(event.target.value) }} />
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-medium">Password</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input
                                value={password}
                                type={showPassword ? "text" : "password"}
                                className="grow"
                                placeholder="••••••••"
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </label>
                        <div className="label">
                            <Link to="/forgot-password" className="label-text-alt link link-hover text-primary">Forgot password?</Link>
                        </div>
                    </div>

                    {errorMessage && (
                        <div role="alert" className="alert alert-error text-sm py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div className="card-actions mt-4">
                        <button onClick={handleLogin} className="btn btn-primary w-full text-white shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform">
                            Sign In
                        </button>
                    </div>

                    <div className="divider my-0 text-xs text-base-content/40">OR</div>

                    <div className="text-center text-sm">
                        Don't have an account? <Link to="/signup" className="link link-primary font-bold">Create account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;