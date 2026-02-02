import { useSelector } from "react-redux";
import EditUserProfile from "./EditUserProfile";

const UserProfile = () => {
    const user = useSelector((state) => state.user);
    if (!user) return;
    return (
        <div>
            <EditUserProfile user={user}/>
        </div>
    )
}
export default UserProfile;