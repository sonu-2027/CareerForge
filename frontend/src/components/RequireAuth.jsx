import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

// Wrap a page in <RequireAuth> to make it login-only. After login the user is
// sent back to where they were headed (including ?query params).
function RequireAuth({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return children;
}

export default RequireAuth;
