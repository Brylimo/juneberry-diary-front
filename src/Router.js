import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
    MapPage,
    PublishPage,
    CalendarPage,
    LoginPage,
    RegisterPage,
    NotFoundPage
} from './pages'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>} />
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
            </Routes>
        </BrowserRouter>
    );
}

export default Router;