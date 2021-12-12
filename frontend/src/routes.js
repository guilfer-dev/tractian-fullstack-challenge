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

// componentes
import AdminPass from "./components/Modals/AdminPass"

// styles
import './global.css';

const App = () => {

    //authentication
    const [masterAuth, setMasterAuth] = useState(false);
    const [auth, setAuth] = useState(false);

    // modals and views
    const [pwModal, setPWModal] = useState(false);

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
    
    function MasterRoute({ children }) {

        useEffect(() => {
            setPWModal(true);
        })

        return masterAuth ? children : <AdminPass states={{ setMasterAuth, pwModal }} />
    }

    return (
        // admin requires password on every step
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                    <MasterRoute>
                        <Admin />
                    </MasterRoute>
                } />
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