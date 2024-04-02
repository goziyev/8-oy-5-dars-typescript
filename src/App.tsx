import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Register from "./pages/register";
import ErrorPage from "./pages/errorpage";

interface ProtectedRouteProps {
  redirectTo?: string;
  isAuthentication: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
  isAuthentication,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication) {
      navigate(redirectTo);
    }
  }, [isAuthentication, navigate, redirectTo]);

  return <>{children}</>;
};

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.userToken.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {token !== null && (
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthentication={token !== null}>
                <HomePage />
              </ProtectedRoute>
            }
          />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
