import { Helmet } from "react-helmet-async";
import Profile from "../components/user/Profile";

const ProfilePage = () => {
    return (
        <>
            <Helmet>
                <title>프로필</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <Profile />  
            </div>
        </>
    );
}

export default ProfilePage;