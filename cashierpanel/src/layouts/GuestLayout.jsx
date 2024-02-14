import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Guest({ children }) {
    const location = useLocation();
    return (
        <>
            <div className="w-full h-screen">
                {location.pathname !== "/" ? <Navbar></Navbar> : ""}
                {children}
                {location.pathname !== "/" ? <Footer></Footer> : ""}
            </div>
        </>
    );
}
