import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const roles = useSelector((state) => state.users.userInfo?.roles);
  console.log(roles);
  let content;
  if (!roles) {
    content = <Navigate to="/auth" state={{ from: location }} replace />;
    return content;
  }
  content = roles.some((role) =>
    allowedRoles.includes(role) ? (
      <Outlet />
    ) : (
      <Navigate to="/auth" state={{ from: location }} replace />
    )
  );
  return content;
}

export default RequireAuth;
