import { Link } from "react-router-dom"
import UpdatePicture from "../../Components/Profile/UpdatePicture/UpdatePicture"
import ProfileForm from "../../Components/Profile/ProfileForm/ProfileForm"
import { BsArrowLeft } from "react-icons/bs"
import "./ProfileScreen.css"

export default function ProfileScreen() {
    return (
        <div className="profile-container">
            <Link to="/home" className="profile-back-btn">
                <BsArrowLeft size={22} />
            </Link>

            <UpdatePicture />
            <ProfileForm />
        </div>
    )
}