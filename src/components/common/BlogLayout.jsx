import { Outlet } from 'react-router-dom';
import HeaderForm from '../../containers/HeaderForm';
import BlogHeaderForm from '../../containers/BlogHeaderForm';
import Footer from './Footer';

const BlogLayout = () => {
    return (
        <>
            <HeaderForm/>
            <main style={{minHeight: '100vh'}}>
                <Outlet/>
            </main>
            <Footer />
        </>
    );
}

export default BlogLayout;