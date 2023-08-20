import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const roles = useSelector(
    (state) => state.users.userInfo?.roles,
    shallowEqual
  );

  if (!roles) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const hasAllowedRole = roles.some((role) => allowedRoles.includes(role));

  if (hasAllowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
}

export default React.memo(RequireAuth);
