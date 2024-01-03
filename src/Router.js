import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    MapPage,
    PublishPage,
    CalendarPage,
    LoginPage,
    RegisterPage,
    NotFoundPage
} from './pages'
import { ProtectedRoute } from "./containers/route/ProtectedRoute";
import { AuthRoute } from "./containers/route/AuthRoute";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthRoute />}>
                    <Route path="login" element={<LoginPage/>} />
                    <Route path="register" element={<RegisterPage/>} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/geo/*">
                        <Route path="map" element={<MapPage/>} />
                    </Route>
                    <Route path="/cal/*">
                        <Route path="calendar" element={<CalendarPage/>} />
                    </Route>
                    <Route path="/post/*">
                        <Route path="publish" element={<PublishPage/>} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;