import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnectionReq, removeConnectionReq } from "../assets/ConnectionRequestSlice";
import { BASE_URL } from "../utils/config";

const PendingConnections = () => {
    const dispatch = useDispatch();
    const myPendingConnections = useSelector((store) => store.requests)
    const callingMyPendingConnections = async () => {
        try {

            const pendingConnectionsList = await axios.get(BASE_URL + "/connect/pendingConnections", { withCredentials: true });
            console.log(pendingConnectionsList.data)
            dispatch(addConnectionReq(pendingConnectionsList.data));

        }
        catch (err) {
            console.log(err);
        }
    }

    const AccRejReqButton = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/connect/response/" + status + "/" + _id, {}, { withCredentials: true })
            console.log(res);
            dispatch(removeConnectionReq(_id));
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callingMyPendingConnections();
    }, []);

    if (!myPendingConnections) return;
    if (myPendingConnections.length === 0) {
        return (
            <div><h1>No Pending Connection Requests</h1></div>
        )
    }
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-3xl text-white">Connection Requests</h1>
            {myPendingConnections.map((req) => {
                const { fname, lname, bio, skills, age, gender, photoURL } = req.fromUserID;
                return (
                    <div className="justify-between items-center m-4 mx-auto p-4 bg-base-300 flex w-2/3">
                        <div>
                            <img className="w-20 h-20 rounded-lg" src={photoURL} alt="User Profile Pic" />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl" key={req._id}>
                                {fname + " " + lname}
                            </h2>
                            {age && gender && <p>{age + "," + gender}</p>}
                            <p>{bio}</p>
                            <p>{skills}</p>
                        </div>
                        <div>
                            <button onClick={() => AccRejReqButton("accepted", req._id)} className="mx-2 btn btn-primary">Accept</button>
                            <button onClick={() => AccRejReqButton("rejected", req._id)} className="mx-2 btn btn-secondary">Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}

export default PendingConnections