import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import ErrorPage from "./pages/errorpage";

function App() {
  const token = useSelector((state: RootState) => state.userToken.token);

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  function ProtectedRoute({
    children,
    redirectTo = "/login",
    isAuthentication,
  }: {
    children: React.ReactNode;
    redirectTo?: string;
    isAuthentication: boolean;
  }) {
    useEffect(() => {
      if (!isAuthentication) {
        return navigate(redirectTo);
      }
    }, [isAuthentication, navigate, redirectTo]);

    return children;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {token !== null && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthentication={token ? true : false}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
