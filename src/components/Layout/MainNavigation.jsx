import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useToast } from "../store/toast-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { addToast } = useToast();
  const isLoggedIn = authCtx.isLoggedIn;

  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    addToast("logout successfull !!", "info");
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
