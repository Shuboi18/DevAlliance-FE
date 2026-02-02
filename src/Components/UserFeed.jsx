import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeedInfo } from "../assets/FeedSlice";
import { useEffect } from "react";
import UserFeedCard from "./UserFeedCard";

import { BASE_URL } from "../utils/config";

const UserFeed = () => {
    const dispatch = useDispatch();
    const feedStore = useSelector((store) => store.Feed);
    //const user = useSelector((store) => store.user);
    const getFeed = async () => {

        try {
            const res = await axios.get(BASE_URL + "/user/getUserFeed", { withCredentials: true });
            let data = res?.data;
            console.log(data)
            dispatch(addFeedInfo(data));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    if (!feedStore) return;
    //if (!user) return;

    return (
        <div className="flex justify-center my-10"><UserFeedCard feedStore={feedStore} /></div>
    )
}
export default UserFeed;