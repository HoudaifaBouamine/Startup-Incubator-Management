import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading, isRoleAllowed } = useAuthContext();
  console.log("[ProtectedRoute] state:", { user, isAuthenticated, loading, allowedRoles });

  if (loading) {
    console.log("  ↳ Loading auth, showing loader");
    return <div>Loading authentication…</div>;
  }

  if (!isAuthenticated) {
    console.log("  ↳ Not authenticated → /login");
    return <Navigate to="/login" replace />;
  }

  if (!user || !isRoleAllowed(allowedRoles)) {
    console.log(`  ↳ Role check failed (user.role=${user?.role}) → /dashboard`);
    return <Navigate to="/progress" replace />;
  }

  console.log("  ↳ Access granted");
  return <Outlet />;
};
export default ProtectedRoute;