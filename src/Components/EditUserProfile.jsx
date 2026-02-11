import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL, getProfileImageUrl } from "../utils/config";

const EditUserProfile = ({ user }) => {
    const [fname, seteditFname] = useState(user.fname);
    const [lname, seteditLname] = useState(user.lname);
    const [bio, seteditBio] = useState(user.bio);
    const [skills, seteditSkills] = useState(user.skills);
    const [photo, setPhoto] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(getProfileImageUrl(user.photoURL));
    const [gender, seteditGender] = useState(user.gender);
    const [developerType, setDeveloperType] = useState(user.developerType || "Developer");
    const [saving, setSaving] = useState(false);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewPhoto(URL.createObjectURL(file));
        }
    };

    const editProfileButton = async () => {
        if (!fname || !lname || !bio || !skills) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (bio.trim().split(/\s+/).length > 150) {
            toast.error("Bio must be 150 words or less.");
            return;
        }

        setSaving(true);
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("gender", gender);
        formData.append("developerType", developerType);
        formData.append("bio", bio);
        formData.append("skills", skills);
        if (photo) {
            formData.append("photo", photo);
        }

        try {
            await axios.patch(BASE_URL + "/profile/editProfile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            toast.success("Profile updated successfully!");
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 lg:p-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]"></div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold font-outfit mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent z-10 text-center">
                Craft Your Persona
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl z-10">
                {/* Edit Form Section */}
                <div className="flex-1 card bg-base-100/70 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="card-body p-8 lg:p-10">
                        <h2 className="text-2xl font-bold mb-6 text-base-content/80 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Edit Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label mb-2"><span className="label-text font-semibold">First Name</span></label>
                                <input value={fname} type="text" className="input input-bordered input-primary bg-base-200/50 focus:bg-base-100 transition-all font-medium" onChange={(e) => seteditFname(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label mb-2"><span className="label-text font-semibold">Last Name</span></label>
                                <input value={lname} type="text" className="input input-bordered input-primary bg-base-200/50 focus:bg-base-100 transition-all font-medium" onChange={(e) => seteditLname(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-control mt-4">
                            <label className="label mr-4"><span className="label-text font-semibold">Gender</span></label>
                            <select value={gender} className="select select-bordered select-primary bg-base-200/50 focus:bg-base-100 transition-all font-medium" onChange={(e) => seteditGender(e.target.value)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className="form-control mt-4">
                            <label className="label mr-4"><span className="label-text font-semibold">Developer Type</span></label>
                            <select value={developerType} className="select select-bordered select-primary bg-base-200/50 focus:bg-base-100 transition-all font-medium" onChange={(e) => setDeveloperType(e.target.value)}>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Mobile Developer">Mobile Developer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text font-semibold">Bio</span></label>
                            <textarea value={bio} className="textarea textarea-bordered textarea-primary h-32 bg-base-200/50 focus:bg-base-100 transition-all font-medium resize-none leading-relaxed" placeholder="Tell us about yourself..." onChange={(e) => seteditBio(e.target.value)}></textarea>
                            <label className="label"><span className="label-text-alt text-base-content/50">{bio?.trim().split(/\s+/).filter(w => w.length > 0).length || 0}/150 words</span></label>
                        </div>

                        <div className="form-control mt-2">
                            <label className="label mb-2"><span className="label-text font-semibold">Skills (comma separated)</span></label>
                            <input value={skills} type="text" className="input input-bordered input-primary bg-base-200/50 focus:bg-base-100 transition-all font-medium" placeholder="React, Node.js, Python..." onChange={(e) => seteditSkills(e.target.value)} />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label mb-2"><span className="label-text font-semibold">Profile Photo</span></label>
                            <input type="file" className="file-input file-input-bordered file-input-primary w-full bg-base-200/50" onChange={handlePhotoChange} />
                        </div>

                        <div className="card-actions justify-end mt-10">
                            <button
                                className={`btn btn-primary btn-lg rounded-xl shadow-lg hover:shadow-primary/40 transition-all ${saving ? 'loading' : 'hover:-translate-y-1'}`}
                                onClick={editProfileButton}
                                disabled={saving}
                            >
                                {saving ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Preview Section */}
                <div className="flex-1 flex flex-col items-center lg:items-start space-y-4">
                    <div className="badge badge-accent badge-outline uppercase tracking-widest font-bold p-3 self-center lg:self-center mb-4">Live Preview</div>

                    <div className="card bg-base-100 shadow-2xl w-full max-w-md border border-base-200 sticky top-10 overflow-hidden self-center hover:shadow-2xl transition-shadow duration-500">
                        <figure className="relative h-72 w-full">
                            <img src={previewPhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-6">
                                <h2 className="text-3xl font-black drop-shadow-md text-base-content">
                                    {fname} {lname}
                                </h2>
                                <p className="font-medium text-primary uppercase tracking-wide drop-shadow-sm">{developerType || "Developer"}</p>
                            </div>
                        </figure>

                        <div className="card-body p-6">
                            <div className="prose prose-sm max-w-none mb-6">
                                <p className="italic text-base-content/70 leading-relaxed">
                                    "{bio || "Your bio will appear here... write something amazing!"}"
                                </p>
                            </div>

                            <div className="divider my-2">SKILLS</div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {skills && skills.split(',').filter(s => s.trim()).map((skill, index) => (
                                    <span key={index} className="badge badge-secondary badge-lg shadow-sm">
                                        {skill.trim()}
                                    </span>
                                ))}
                                {(!skills || !skills.trim()) && <span className="text-sm text-base-content/40 italic">Add some skills to showcase your talent</span>}
                            </div>

                            <div className="mt-8 flex justify-center gap-4">
                                <button className="btn btn-outline btn-sm rounded-full">Ignore</button>
                                <button className="btn btn-primary btn-sm rounded-full px-6">Interested</button>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-base-content/40 w-full mt-4">This is how other users will see your profile.</p>
                </div>
            </div>
        </div>
    )
}
export default EditUserProfile;