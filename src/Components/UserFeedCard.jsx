import axios from "axios";
import { removeFeedInfo } from "../assets/FeedSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { BASE_URL } from "../utils/config";

const UserFeedCard = ({ feedStore }) => {
    const dispatch = useDispatch();

    const IngIntConnectionButton = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/connect/request/" + status + "/" + _id, {}, { withCredentials: true })
            console.log(res);
            dispatch(removeFeedInfo(_id));
        } catch (err) {
            console.log(err)
        }
    };

    if (!feedStore || feedStore.length === 0) {
        return <h1 className="text-3xl font-bold text-center mt-10">No Feed Available</h1>;
    }

    const feed = feedStore[0];
    const { _id, fname, lname, age, bio, skills, photoURL, gender, developerType } = feed;

    return (
        <div className="flex justify-center items-centerw-full">
            <div className="card w-96 bg-base-100 shadow-xl border border-base-200">
                <figure className="relative h-64 w-full overflow-hidden">
                    <img
                        src={photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <h2 className="absolute bottom-4 left-4 text-white text-3xl font-bold drop-shadow-md">{fname} {lname}, {age}</h2>
                </figure>

                <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="badge badge-primary badge-outline">{developerType || "Developer"}</span>
                    </div>

                    <p className="text-base-content/80 line-clamp-3">{bio}</p>

                    <div className="divider my-2"></div>

                    <div>
                        <h3 className="font-semibold text-sm text-base-content/60 mb-2 uppercase tracking-wider">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills && skills.split(',').slice(0, 5).map((skill, index) => (
                                <span key={index} className="badge badge-secondary badge-sm">{skill.trim()}</span>
                            ))}
                        </div>
                    </div>

                    <div className="card-actions justify-center mt-6 gap-6">
                        <button
                            onClick={() => IngIntConnectionButton("ignored", _id)}
                            className="btn btn-circle btn-lg btn-outline btn-error hover:scale-110 transition-transform"
                            title="Ignore"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/profile/${_id}`);
                                toast.success("Profile link copied!");
                            }}
                            className="btn btn-circle btn-ghost text-info"
                            title="Share"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                        </button>

                        <button
                            onClick={() => IngIntConnectionButton("interested", _id)}
                            className="btn btn-circle btn-lg btn-outline btn-success hover:scale-110 transition-transform"
                            title="Interested"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserFeedCard;