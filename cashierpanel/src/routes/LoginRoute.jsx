import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginRoute = ({ children }) => {
    if (Cookies.get("token") !== undefined) {
        return <Navigate to={"/home"} />;
    } else if (Cookies.get("token") === undefined) {
        return children;
    }
};
