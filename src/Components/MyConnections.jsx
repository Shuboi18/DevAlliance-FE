import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { addConnections } from "../assets/ConnectionSlice";
import { Briefcase, MapPin, MessageCircle, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/config";

const MyConnections = () => {
    const dispatch = useDispatch();
    const myConnections = useSelector((store) => store.connections)

    const callingMyConnections = async () => {
        try {
            const myConnectionsList = await axios.get(BASE_URL + "/connect/myConnections", { withCredentials: true });
            dispatch(addConnections(myConnectionsList.data.data));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callingMyConnections();
    }, []);

    if (!myConnections) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (myConnections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="bg-base-200/50 p-6 rounded-full mb-4">
                    <UserCheck className="w-16 h-16 text-base-content/30" />
                </div>
                <h1 className="text-2xl font-bold mb-2">No Connections Yet</h1>
                <p className="text-base-content/60 max-w-md">Start connecting with other developers to build your network!</p>
            </div>
        )
    }


    const handleShareProfile = (profileId) => {
        // Assuming there isn't actually a public profile page yet, using a dummy or just copying ID/Name or local host link.
        // User asked to "refer profile to friend". Copying link is best.
        const url = `${window.location.origin}/profile/${profileId}`;
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Profile link copied to clipboard!");
        });
    };

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-3xl font-bold font-outfit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
                    My Connections
                </h1>
                <p className="text-base-content/60 mt-1">
                    You have <span className="font-bold text-primary">{myConnections.length}</span> active connections
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myConnections.map((req) => {
                    const { fname, lname, bio, skills, age, gender, photoURL, _id } = req;
                    return (
                        <div key={_id} className="card bg-base-100/60 backdrop-blur-md shadow-xl border border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                            <figure className="px-6 pt-6 relative">
                                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/20 to-secondary/20 z-0"></div>
                                <div className="avatar z-10">
                                    <div className="w-24 rounded-full ring-4 ring-base-100 shadow-lg">
                                        <img src={photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={`${fname} ${lname}`} />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body p-6 items-center text-center -mt-2">
                                <h2 className="card-title text-xl font-bold text-base-content">
                                    {fname} {lname}
                                </h2>
                                <div className="text-xs font-medium px-3 py-1 bg-base-200 rounded-full text-base-content/70 mb-2">
                                    {age ? `${age} years` : 'Developer'} • {gender || 'Human'}
                                </div>

                                <p className="text-sm text-base-content/60 line-clamp-2 h-10 mb-2">
                                    {bio || "Passionate developer building cool things."}
                                </p>

                                <div className="w-full flex flex-wrap justify-center gap-1 mb-4 h-16 overflow-hidden content-start">
                                    {skills && skills.split(',').slice(0, 4).map((skill, index) => (
                                        <span key={index} className="badge badge-primary badge-outline badge-sm">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                    {skills && skills.split(',').length > 4 && (
                                        <span className="badge badge-ghost badge-sm">+{skills.split(',').length - 4}</span>
                                    )}
                                </div>

                                <div className="card-actions w-full mt-auto pt-4 border-t border-base-content/10">
                                    <Link
                                        to="/chat"
                                        state={{ selectedUser: req }}
                                        className="btn btn-primary btn-sm flex-1 gap-2 rounded-full"
                                    >
                                        <MessageCircle size={16} /> Message
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MyConnections