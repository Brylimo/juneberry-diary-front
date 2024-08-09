import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    MapPage,
    PublishPage,
    BlogPage,
    BlogJoinPage,
    CalendarPage,
    LoginPage,
    RegisterPage,
    NotFoundPage,
    ProfilePage
} from './pages'
import { ProtectedRoute } from "./containers/route/ProtectedRoute";
import { PostRoute } from "./containers/route/PostRoute";
import Layout from "./components/common/Layout";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>} />
                <Route element={<PostRoute />}>
                    <Route path="blog" element={<Layout />} >
                        <Route path=":blogname" element={<BlogPage />}/>
                    </Route>
                </Route>
                
                <Route element={<ProtectedRoute />}>
                    <Route path="/geo/*" element={<Layout />}>
                        <Route path="map" element={<MapPage/>} />
                    </Route>
                    <Route path="/cal/*" element={<Layout />}>
                        <Route path="calendar" element={<CalendarPage/>} />
                    </Route>
                    <Route path="/post/*" element={<Layout />}>
                        <Route path="publish" element={<PublishPage/>} />
                    </Route>
                    <Route path="/user/*" element={<Layout />}>
                        <Route path="profile" element={<ProfilePage/>} />
                    </Route>
                    <Route path="member/join" element={<BlogJoinPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;