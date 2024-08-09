import { Helmet } from "react-helmet-async";

const BlogPage = () => {
    return (
        <>
            <Helmet>
                <title>블로그</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                hi
            </div>
        </>
    );
}

export default BlogPage;