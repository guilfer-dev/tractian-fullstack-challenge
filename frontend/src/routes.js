// libraries
import { useState } from "react";
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
import NotFound from "./pages/NotFound"

// styles
import './global.css';

const App = () => {

    const [auth, setAuth] = useState(false);

    function PrivateRoute({ children }) {

        const location = useLocation();

        (async () => {
            try {
                await api.get("/me");
                setAuth(true);
            }
            catch (err) {
                setAuth(false);
            }
        })();

        return auth ? children : <Navigate to="/login" state={{ from: location }} />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
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