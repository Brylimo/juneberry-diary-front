import { Helmet } from "react-helmet-async";
import BlogHomeForm from "../containers/blog/BlogHomeForm";

const BlogHomePage = () => {
    return (
        <>
            <Helmet>
                <title>블로그</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <BlogHomeForm />
            </div>
        </>
    );
}

export default BlogHomePage;