import { Helmet } from "react-helmet-async";

const PostPage = () => {
    return (
        <>
            <Helmet>
                <title>포스트</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                hi
            </div>
        </>
    );
}

export default PostPage;