import { Helmet } from "react-helmet-async";
import ProfileForm from "../containers/user/ProfileForm";

const ProfilePage = () => {
    return (
        <>
            <Helmet>
                <title>프로필</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <ProfileForm />  
            </div>
        </>
    );
}

export default ProfilePage;