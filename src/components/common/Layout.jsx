import { Outlet } from 'react-router-dom';
import HeaderForm from '../../containers/HeaderForm';

const Layout = () => {
    return (
        <>
            <HeaderForm/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;