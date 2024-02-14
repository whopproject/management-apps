import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AdminRoute = ({ children }) => {
    if (Cookies.get("token") === undefined) {
        return <Navigate to={"/"} />;
    } else if (Cookies.get("token") !== undefined) {
        return children;
    }
};
