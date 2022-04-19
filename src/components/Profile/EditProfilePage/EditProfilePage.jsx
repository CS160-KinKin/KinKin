import ProfileInfoBox from "../ProfileInfoBox";
import CurrentProfile from "./CurrentProfile";

function EditProfilePage() {
    return (
        <div className="contain">
        <div className="left-container"><CurrentProfile/></div>
        <div className="right-container"><ProfileInfoBox/></div>
        </div>
    )
}

export default EditProfilePage;