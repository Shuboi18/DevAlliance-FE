import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, CheckCircle, Mail } from "lucide-react";
import { BASE_URL } from "../utils/config";

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSendOTP = async () => {
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            await axios.post(BASE_URL + "/user/forgotPassword", { email });
            toast.success("OTP sent! Check your email (or server console).");
            setStep(2);
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            // Using the updated endpoint logic: email + otp + newPassword
            await axios.post(BASE_URL + "/user/resetPassword", { email, otp, newPassword });
            toast.success("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="card w-full max-w-md bg-base-100/80 backdrop-blur-xl shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="card-body gap-6 relative z-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {step === 1 ? "Forgot Password?" : "Reset Password"}
                        </h2>
                        <p className="text-base-content/60 mt-2">
                            {step === 1 ? "Enter your email to receive an OTP code" : "Enter the code sent to your email"}
                        </p>
                    </div>

                    {step === 1 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Email Address</span></label>
                                <label className="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all">
                                    <Mail className="w-4 h-4 opacity-70" />
                                    <input value={email} type="email" className="grow" placeholder="user@example.com" onChange={(e) => setEmail(e.target.value)} autoFocus />
                                </label>
                            </div>

                            <button
                                onClick={handleSendOTP}
                                className={`btn btn-primary w-full mt-6 text-white shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? "Sending OTP..." : <>Send OTP <ArrowRight size={18} /></>}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">OTP Code</span></label>
                                <input
                                    value={otp}
                                    type="text"
                                    className="input input-bordered input-primary tracking-widest text-center text-lg font-bold"
                                    placeholder="• • • • • •"
                                    maxLength={6}
                                    onChange={(e) => setOtp(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">New Password</span></label>
                                <label className="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all relative">
                                    <input
                                        value={newPassword}
                                        type={showPassword ? "text" : "password"}
                                        className="grow"
                                        placeholder="New Password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 text-base-content/50 hover:text-primary transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </label>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Confirm New Password</span></label>
                                <input
                                    value={confirmPassword}
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered focus-within:input-primary transition-all"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleResetPassword}
                                className={`btn btn-primary w-full mt-2 text-white shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : <>Reset Password <CheckCircle size={18} /></>}
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="btn btn-ghost btn-xs w-full mt-2 text-base-content/60"
                                disabled={loading}
                            >
                                Change Email
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
