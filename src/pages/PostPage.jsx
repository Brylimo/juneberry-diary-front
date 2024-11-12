import { Helmet } from "react-helmet-async";
import PostForm from "../containers/post/PostForm";

const PostPage = () => {
    return (
        <>
            <Helmet>
                <title>포스트</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%', marginBottom: '7rem' }}>
                <PostForm />
            </div>
        </>
    )
}

export default PostPage;