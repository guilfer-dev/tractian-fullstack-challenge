// libraries
import { useState, useEffect } from "react";
import {
    useLocation,
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

// services
import api from "./services/api"
// pages
import Login from "./pages/Login"
import Main from "./pages/Main"
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound"

// styles
import './global.css';

const App = () => {

    const [auth, setAuth] = useState(false);

    // verify if user is logged, then redirects accordingly
    function PrivateRoute({ children }) {

        const location = useLocation();

        useEffect(() => {
            (async () => {
                try {
                    await api.get("/me");
                    setAuth(true);
                }
                catch (err) {
                    setAuth(false);
                }
            })();
        })

        return auth ? children : <Navigate to="/login" state={{ from: location }} />;
    }

    return (
        // admin requires password on every step
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <Main />
                    </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;