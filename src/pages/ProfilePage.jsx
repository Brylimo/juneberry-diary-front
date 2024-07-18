import { Helmet } from "react-helmet-async";
import Profile from "../components/user/Profile";

const ProfilePage = () => {
    return (
        <>
            <Helmet>
                <title>juneberrydiary - profile</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <Profile />  
            </div>
        </>
    );
}

export default ProfilePage;