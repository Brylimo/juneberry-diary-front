import EditorForm from "../containers/post/EditorForm";
import { Helmet } from "react-helmet-async";

const PublishPage = () => {

    return (
        <>
            <Helmet>
                <title>포스트 등록</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <EditorForm />
            </div>
        </>
    );
}

export default PublishPage;