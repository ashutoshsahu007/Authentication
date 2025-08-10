import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import { AuthContextProvider } from "./components/store/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
