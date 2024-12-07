import { Outlet } from 'react-router-dom';
import HeaderForm from '../../containers/HeaderForm';
import BlogHeaderForm from '../../containers/BlogHeaderForm';
import Footer from '../common/Footer';

const BlogLayout = () => {
    return (
        <>
            <HeaderForm/>
            <main style={{minHeight: 'calc(100vh - 8rem)'}}>
                <Outlet/>
            </main>
            <Footer />
        </>
    );
}

export default BlogLayout;