import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { BASE_URL } from "../utils/config";

const Signup = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState(null);
    const [skills, setSkills] = useState("");
    const [developerType, setDeveloperType] = useState("");

    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("developerType", developerType);
        formData.append("bio", bio);
        formData.append("skills", skills);
        if (photo) {
            formData.append("photo", photo);
        }

        try {
            const res = await axios.post(BASE_URL + "/user/signup", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(res);
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 py-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="card w-full max-w-4xl bg-base-100/70 backdrop-blur-xl shadow-2xl border border-white/10 z-10">
                <div className="card-body p-8 lg:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Join DevAlliance
                        </h1>
                        <p className="text-base-content/60 mt-2">Create your developer profile and connect with the best.</p>
                    </div>

                    {error && (
                        <div role="alert" className="alert alert-error mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Info Column */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b border-base-content/10 pb-2">Personal Info</h3>

                            <div className="flex gap-4">
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text font-medium">First Name</span></label>
                                    <input value={fname} type="text" className="input input-bordered input-primary bg-base-200/50" onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text font-medium">Last Name</span></label>
                                    <input value={lname} type="text" className="input input-bordered input-primary bg-base-200/50" onChange={(e) => setLname(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Email</span></label>
                                <input value={email} type="email" className="input input-bordered input-primary bg-base-200/50" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Password</span></label>
                                <div className="relative">
                                    <input
                                        value={password}
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered input-primary w-full bg-base-200/50 pr-10"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="form-control w-1/3">
                                    <label className="label"><span className="label-text font-medium">Age</span></label>
                                    <input value={age} type="number" className="input input-bordered input-primary bg-base-200/50" onChange={(e) => setAge(e.target.value)} />
                                </div>
                                <div className="form-control w-2/3">
                                    <label className="label"><span className="label-text font-medium">Gender</span></label>
                                    <select className="select select-bordered select-primary bg-base-200/50 w-full" onChange={(e) => setGender(e.target.value)}>
                                        <option disabled selected>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Developer Type</span></label>
                                <select className="select select-bordered select-primary bg-base-200/50 w-full" onChange={(e) => setDeveloperType(e.target.value)}>
                                    <option disabled selected>Select Developer Type</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Mobile Developer">Mobile Developer</option>
                                    <option value="DevOps Engineer">DevOps Engineer</option>
                                    <option value="Data Scientist">Data Scientist</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Professional Info Column */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b border-base-content/10 pb-2">Professional Profile</h3>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Bio</span></label>
                                <textarea value={bio} className="textarea textarea-bordered textarea-primary h-24 bg-base-200/50" placeholder="Tell us about yourself..." onChange={(e) => setBio(e.target.value)}></textarea>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Skills</span></label>
                                <input value={skills} type="text" className="input input-bordered input-primary bg-base-200/50" placeholder="React, Node.js, Python..." onChange={(e) => setSkills(e.target.value)} />
                                <label className="label"><span className="label-text-alt opacity-60">Comma separated skills</span></label>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium">Profile Photo</span></label>
                                <input type="file" className="file-input file-input-bordered file-input-primary w-full bg-base-200/50" onChange={(e) => setPhoto(e.target.files[0])} />
                            </div>
                        </div>
                    </div>

                    <div className="card-actions mt-10">
                        <button
                            onClick={handleSignup}
                            className={`btn btn-primary w-full btn-lg rounded-xl shadow-lg hover:shadow-primary/40 transition-all ${loading ? 'loading' : 'hover:-translate-y-1'}`}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>

                    <div className="text-center mt-6 text-sm">
                        Already have an account? <Link to="/login" className="link link-primary font-bold">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;