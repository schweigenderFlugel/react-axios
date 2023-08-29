import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";

const RequireLogin = ({ allowedRoles }) => {
    const { login } = useLogin();
    const location = useLocation();

    return (
        login?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : login?.email 
                ? <Navigate to='/unathorized' state={{ from: location }} replace/>
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireLogin;