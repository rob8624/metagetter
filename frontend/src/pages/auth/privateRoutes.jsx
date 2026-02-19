import { Navigate, Outlet } from "react-router-dom";
import { UseLoggedIn } from "../../context/userContext";

export function PrivateRoutes() {
  const { loggedIn, loading } = UseLoggedIn();

  // 🚫 Do not render anything until auth state is resolved
  if (loading) {
    return null; // or spinner
  }

  return loggedIn
    ? <Outlet />
    : <Navigate to="/signin" replace />;
}