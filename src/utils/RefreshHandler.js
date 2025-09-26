import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RefreshHandler = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If logged in, prevent visiting login/signup
    if (
      isAuthenticated &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/create", { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  return null;
};

export default RefreshHandler;
