import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Welcome from "./Pages/Welcome";
import Login from "./pages/auth/Login";
import { LoginRoute } from "./routes/LoginRoute";
import { Home } from "./pages/panels/Home";
import { AdminRoute } from "./routes/AdminRoute";
import Panel from "./pages/panels/Panel";
import { MainProvider } from "./context/MainContext";
// import Edit from "./Pages/Profile/Edit";

function App() {
    return (
        <>
            <BrowserRouter>
                {/* <MainProvider> */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginRoute>
                                <Login></Login>
                            </LoginRoute>
                        }
                    ></Route>
                    <Route
                        path="/home"
                        element={
                            <AdminRoute>
                                <Home></Home>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/panel"
                        element={
                            <AdminRoute>
                                <Panel></Panel>
                            </AdminRoute>
                        }
                    ></Route>
                </Routes>
                {/* </MainProvider> */}
            </BrowserRouter>
        </>
    );
}

export default App;
