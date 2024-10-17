import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    MapPage,
    PublishPage,
    BlogHomePage,
    BlogJoinPage,
    BlogRepositoryPage,
    CalendarPage,
    LoginPage,
    RegisterPage,
    NotFoundPage,
    ProfilePage,
    DiaryMainPage,
    SettingPage,
    PostPage
} from './pages'
import { ProtectedBlogRoute } from "./containers/route/ProtectedBlogRoute";
import { ProtectedRoute } from "./containers/route/ProtectedRoute";
import { BlogRoute } from "./containers/route/BlogRoute";
import Layout from "./components/common/Layout";
import BlogLayout from "./components/common/BlogLayout";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>} />
                
                <Route element={<ProtectedRoute />}>
                    <Route path="/geo/*" element={<Layout />}>
                        <Route path="map" element={<MapPage/>} />
                    </Route>
                    <Route path="/cal/*" element={<Layout />}>
                        <Route path="calendar" element={<CalendarPage/>} />
                    </Route>
                    <Route path="/diary/*" element={<Layout />}>
                        <Route path="main" element={<DiaryMainPage/>} />
                    </Route>
                    <Route path="/user/*" element={<Layout />}>
                        <Route path="profile" element={<ProfilePage/>} />
                    </Route>
                    <Route path="/blogs/join" element={<BlogJoinPage />} />
                    <Route path="/blogs/*" element={<BlogLayout />}>
                        <Route path="repositories" element={<BlogRepositoryPage />} />
                    </Route>
                    <Route element={<ProtectedBlogRoute/>}>
                        <Route path="/blog/*" element={<Layout />}>
                            <Route path=":id/publish" element={<PublishPage/>} />
                        </Route>
                    </Route>
                    <Route path="/setting" element={<Layout />}>
                        <Route path="" element={<SettingPage />}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                <Route element={<BlogRoute />}>
                    <Route path="blog" element={<BlogLayout />} >
                        <Route path=":id" element={<BlogHomePage />}/>
                        <Route path=":id/:pid" element={<PostPage />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;