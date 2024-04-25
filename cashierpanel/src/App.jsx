import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Welcome from "./Pages/Welcome";
import Login from "./pages/auth/Login";
import { LoginRoute } from "./routes/LoginRoute";
import { Home } from "./pages/panels/Home";
import { AdminRoute } from "./routes/AdminRoute";
import { Kasir } from "./pages/panels/Kasir";
import { MainProvider } from "./context/MainContext";
import { Kategori } from "./pages/panels/Kategori";
import { Produk } from "./pages/panels/Produk";
import { Pembelian } from "./pages/panels/Pembelian";
import { Dashboard } from "./pages/panels/Dashboard";
import { Diskon } from "./pages/panels/Diskon";
import {} from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
        </>
    );
};

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
                    {/* <Route
                        path="/home"
                        element={
                            <AdminRoute>
                                <Home></Home>
                            </AdminRoute>
                        }
                    ></Route> */}
                    <Route
                        path="/panel/dashboard"
                        element={
                            <AdminRoute>
                                <Dashboard></Dashboard>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/panel/kasir"
                        element={
                            <AdminRoute>
                                <Kasir></Kasir>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/panel/kategoriproduk"
                        element={
                            <AdminRoute>
                                <Kategori></Kategori>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/panel/produk"
                        element={
                            <AdminRoute>
                                <Produk></Produk>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/panel/pembelian"
                        element={
                            <AdminRoute>
                                <Pembelian></Pembelian>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/panel/diskon"
                        element={
                            <AdminRoute>
                                <Diskon></Diskon>
                            </AdminRoute>
                        }
                    ></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Routes>
                {/* </MainProvider> */}
            </BrowserRouter>
        </>
    );
}

export default App;
