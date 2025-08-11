import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import AuthContext from "./components/store/auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={
            !authCtx.isLoggedIn ? <AuthPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/profile"
          element={
            authCtx.isLoggedIn ? (
              <UserProfile />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
