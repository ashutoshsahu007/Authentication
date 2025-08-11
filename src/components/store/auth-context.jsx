import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");
  const navigate = useNavigate();

  // If the token is expired even before app loads
  if (loginTime && Date.now() - loginTime > 5 * 60 * 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    navigate("/auth");
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", Date.now());
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
  };

  // Auto logout after 5 minutes
  useEffect(() => {
    if (token) {
      const remainingTime =
        5 * 60 * 1000 - (Date.now() - localStorage.getItem("loginTime"));
      const timer = setTimeout(logoutHandler, remainingTime);
      return () => clearTimeout(timer); // cleanup on unmount or re-login
    }
  }, [token]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
