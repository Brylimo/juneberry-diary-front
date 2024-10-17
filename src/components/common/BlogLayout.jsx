import { Outlet } from 'react-router-dom';
import HeaderForm from '../../containers/HeaderForm';
import Footer from './Footer';

const BlogLayout = () => {
    return (
        <div>
            <HeaderForm/>
            <main>
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
}

export default BlogLayout;