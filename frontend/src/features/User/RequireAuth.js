import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const { roles } = useAuth();

  if (!roles) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const hasAllowedRole = roles.some((role) => allowedRoles.includes(role));

  if (hasAllowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default RequireAuth;
