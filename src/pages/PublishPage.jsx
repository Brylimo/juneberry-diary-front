import { Helmet } from "react-helmet-async";
import PublishRendererForm from "../containers/post/PublishRendererFrom";

const PublishPage = () => {

    return (
        <>
            <Helmet>
                <title>포스트 등록</title>
            </Helmet>
            <PublishRendererForm />
        </>
    );
}

export default PublishPage;